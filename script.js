function showError(message) {
    const err = document.getElementById('error');
    err.textContent = message;
    err.classList.remove('hidden');
}

function clearError() {
    const err = document.getElementById('error');
    err.textContent = '';
    err.classList.add('hidden');
}

function openLocalFile() {
    document.getElementById('file-input').click();
}
// ==========================================
// LOGIC TẢI DỮ LIỆU ĐỒNG THỜI
// ==========================================

async function loadChapter(chapterNum, title) {
    clearError();
    
    // Hiện giao diện chia đôi, ẩn menu
    document.getElementById('menu').classList.add('hidden');
    document.getElementById('split-view').classList.remove('hidden');
    document.getElementById('chapter-title').innerText = title;

    const theoryBox = document.getElementById('theory-content');
    const flashcardBox = document.getElementById('flashcard-list');
    
    theoryBox.innerHTML = "<p>Đang tải lý thuyết...</p>";
    flashcardBox.innerHTML = "<p>Đang tải Flashcard...</p>";

    // Tải file Lý thuyết
    try {
        let theoryResponse = await fetch(`lythuyet/lythuyet${chapterNum}.txt`);
        if (theoryResponse.ok) {
            let text = await theoryResponse.text();
            theoryBox.innerHTML = formatTheoryContent(text);
        } else {
            theoryBox.innerHTML = `<p style="color:red">Chưa có dữ liệu lý thuyết cho chương này.</p>`;
        }
    } catch (error) {
        console.error("Lỗi tải lý thuyết:", error);
        theoryBox.innerHTML = `<p style="color:red">Lỗi tải lý thuyết: ${error.message}</p>`;
    }
    // Tải file Flashcard (Bài tập)
    try {
        let quizResponse = await fetch(`quiz/chuong${chapterNum}.txt`);
        if (quizResponse.ok) {
            let text = await quizResponse.text();
            let flashcardHtml = parseFlashcards(text);
            flashcardBox.innerHTML = flashcardHtml;
        } else {
            flashcardBox.innerHTML = `<p style="color:red">File bài tập không tồn tại.</p>`;
        }
    } catch (error) {
        console.error("Lỗi tải bài tập:", error);
        flashcardBox.innerHTML = `<p style="color:red">Lỗi: ${error.message}</p>`;
    }

    // Render Toán học (MathJax) nếu có
    try {
        if (window.MathJax) {
            MathJax.typesetPromise().catch((err) => console.log(err.message));
        }
    } catch (error) {
        console.error("Lỗi render MathJax:", error);
    }

    // Cuộn hai khung lên đầu trang
    try {
        document.querySelector('.theory-panel').scrollTo(0, 0);
        document.querySelector('.quiz-panel').scrollTo(0, 0);
    } catch (error) {
        console.error("Lỗi scroll:", error);
    }
}

// ==========================================
// CÁC HÀM FORMAT TEXT THÀNH HTML
// ==========================================

function formatTheoryContent(text) {
    let lines = text.split(/\r?\n/);
    let html = "";
    lines.forEach(line => {
        let trimmed = line.trim();
        if (trimmed === "") return;
        if (trimmed.startsWith("PHẦN")) html += `<h2>${trimmed}</h2>`;
        else if (/^\d+\./.test(trimmed)) html += `<h3>${trimmed}</h3>`;
        else if (trimmed.startsWith("-") || trimmed.startsWith("*") || /^[A-Z][a-z]+ \(.*\):/.test(trimmed)) {
            let formattedLine = trimmed.replace(/^(.*?):/, "<strong>$1:</strong>");
            html += `<li>${formattedLine}</li>`;
        } else {
            html += `<p>${trimmed}</p>`;
        }
    });
    html = html.replace(/(<li>.*<\/li>)/g, "<ul>$1</ul>").replace(/<\/ul>\s*<ul>/g, "");
    return html;
}

function parseFlashcards(text) {
    const lines = text.split('\n');
    let html = '';
    let count = 0;

    for (let line of lines) {
        line = line.trim();
        
        // Bỏ qua dòng trống hoặc dòng không có separator
        if (!line) continue;
        
        let question = '';
        let answer = '';
        
        // Thử split với "->"
        if (line.includes('->')) {
            const parts = line.split('->');
            if (parts.length >= 2) {
                question = parts[0].trim();
                answer = parts.slice(1).join('->').trim();
            }
        }
        // Thử split với "|"
        else if (line.includes('|')) {
            const parts = line.split('|');
            if (parts.length >= 2) {
                question = parts[0].trim();
                answer = parts.slice(1).join('|').trim();
            }
        }
        
        // Bỏ qua nếu không valid
        if (!question || !answer) continue;
        
        // Xóa prefix "Câu N:" nếu có
        question = question.replace(/^Câu\s+\d+\s*[:.\-]?\s*/, '').trim();
        
        if (!question) continue;
        
        count++;
        html += `<div class="flashcard" onclick="this.classList.toggle('active')">
            <div class="question">Câu ${count}: ${question}</div>
            <div class="answer">${answer}</div>
        </div>`;
    }
    
    if (count === 0) {
        return '<p style="color: red;">Không tìm thấy câu hỏi nào trong file.</p>';
    }
    
    return html;
}

// Hàm quay lại
function goBack() {
    document.getElementById('menu').classList.remove('hidden');
    document.getElementById('split-view').classList.add('hidden');
}

// ==========================================
// TÍNH NĂNG BÔI ĐEN (HIGHLIGHT) - ĐƠN GIẢN VÀ HIỆU QUẢ
// Bôi đen lần 1 = thêm highlight
// Bôi đen lần 2 (vùng đã highlight) = hủy highlight
// KHÔNG THAY ĐỔI CÁC KHOẢNG TRẮNG
// ==========================================

document.addEventListener('mouseup', function(e) {
    const theoryContainer = document.getElementById('theory-content');
    const quizContainer = document.getElementById('flashcard-list');
    
    // Chỉ chạy khi click trong lý thuyết hoặc flashcard
    if (!((theoryContainer && theoryContainer.contains(e.target)) || 
        (quizContainer && quizContainer.contains(e.target)))) {
        return;
    }
    
    const selection = window.getSelection();
    if (selection.toString().length === 0) return;
    
    // Lấy range hiện tại
    const range = selection.getRangeAt(0);
    const selectedText = selection.toString();
    
    // Kiểm tra xem đã nằm trong highlight chưa
    let parentHighlight = null;
    let node = range.startContainer;
    while (node) {
        if (node.nodeType === Node.ELEMENT_NODE && node.classList && node.classList.contains('text-highlight')) {
            parentHighlight = node;
            break;
        }
        node = node.parentNode;
    }
    
    if (parentHighlight) {
        // NẾU ĐÃ TRONG HIGHLIGHT -> HỦY (unwrap)
        // Lấy text của span
        const textContent = parentHighlight.textContent;
        // Thay span bằng text node (không thay đổi khoảng trắng)
        const textNode = document.createTextNode(textContent);
        parentHighlight.replaceWith(textNode);
    } else {
        // NẾU CHƯA HIGHLIGHT -> THÊM HIGHLIGHT (wrap)
        // Tạo span
        const span = document.createElement('span');
        span.className = 'text-highlight';
        
        try {
            // Surroundcontents sẽ bao text với span (không thay đổi khoảng trắng)
            range.surroundContents(span);
        } catch (error) {
            // Nếu complex selection thì dùng cách khác
            const fragment = range.extractContents();
            span.appendChild(fragment);
            range.insertNode(span);
        }
    }
    
    // Xóa selection để tránh tình trạng chọn đôi
    selection.removeAllRanges();
});