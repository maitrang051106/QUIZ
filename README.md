# 🏗️ Technical Documentation - Quiz System Architecture

## 📋 Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Project Structure](#project-structure)
3. [Technology Stack](#technology-stack)
4. [Core Modules](#core-modules)
5. [Data Format Specification](#data-format-specification)
6. [API Reference](#api-reference)
7. [Event Flow](#event-flow)
8. [Extension Guide](#extension-guide)
9. [Development Setup](#development-setup)

---

## 🏗️ Architecture Overview

### System Design
```
┌─────────────────────────────────────────────────────┐
│                    Browser (Client-Side)             │
├─────────────────────────────────────────────────────┤
│                                                       │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────┐ │
│  │  index.html  │  │ styles.css   │  │ script.js  │ │
│  │              │  │              │  │            │ │
│  │ - DOM        │  │ - Layout     │  │ - Logic    │ │
│  │ - Structure  │  │ - Styling    │  │ - Events   │ │
│  │ - UI         │  │ - Animation  │  │ - Fetch    │ │
│  └──────────────┘  └──────────────┘  └────────────┘ │
│         ▲                                    │        │
│         └────────────────────────────────────┘        │
└─────────────────────────────────────────────────────┘
         │
         │ fetch() → Static Files
         │
┌─────────────────────────────────────────────────────┐
│              Static File Server                       │
├─────────────────────────────────────────────────────┤
│                                                       │
│  ┌─────────────────┐  ┌──────────────────────────┐  │
│  │  quiz/ folder   │  │  lythuyet/ folder        │  │
│  │  ├─ chuong1.txt │  │  ├─ lythuyet1.txt        │  │
│  │  ├─ chuong2.txt │  │  ├─ lythuyet2.txt        │  │
│  │  ├─ chuong3.txt │  │  ├─ lythuyet3.txt        │  │
│  │  ├─ chuong4.txt │  │  ├─ lythuyet4.txt        │  │
│  │  └─ chuong5.txt │  │  └─ lythuyet5.txt        │  │
│  └─────────────────┘  └──────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

### Data Flow
```
User clicks Chapter Button
        ↓
loadChapter(num, title) called
        ↓
├─→ fetch(lythuyet/lythuyet{num}.txt)
│   ↓
│   formatTheoryContent(text) → Parse & HTML generation
│   ↓
│   Render to #theory-content
│
└─→ fetch(quiz/chuong{num}.txt)
    ↓
    parseFlashcards(text) → Parse & HTML generation
    ↓
    Render to #flashcard-list
    ↓
    MathJax.typesetPromise() → Render Math formulas
```

---

## 📁 Project Structure

```
QUIZ/
│
├── 📄 index.html              ⭐ Entry Point
│   ├─ HTML5 semantic structure
│   ├─ MathJax config (inline & display math)
│   ├─ Menu container (chapter buttons)
│   ├─ Split-view container (theory + flashcard)
│   └─ Input for file upload (future feature)
│
├── 🎨 styles.css              ⭐ Styling Layer
│   ├─ CSS custom properties (colors, spacing)
│   ├─ Grid layout (responsive)
│   ├─ Split-panel styling
│   ├─ Flashcard animations
│   ├─ Highlight styling (.text-highlight)
│   └─ Button & text formatting
│
├── ⚙️ script.js                ⭐ Application Logic
│   ├─ loadChapter()           → Load theory + quiz for chapter
│   ├─ formatTheoryContent()   → Parse lý thuyết file
│   ├─ parseFlashcards()       → Parse quiz file
│   ├─ goBack()                → Return to menu
│   ├─ Text Highlight Logic    → mouseup event listener
│   └─ Utility functions       → Error/validation helpers
│
├── 📚 quiz/                   ⭐ Quiz Data
│   ├─ chuong1.txt
│   ├─ chuong2.txt
│   ├─ chuong3.txt
│   ├─ chuong4.txt
│   └─ chuong5.txt
│   Format: "Câu N: Question -> Answer" or "Câu N: Question | Answer"
│
├── 📖 lythuyet/               ⭐ Theory Data
│   ├─ lythuyet1.txt
│   ├─ lythuyet2.txt
│   ├─ lythuyet3.txt
│   ├─ lythuyet4.txt
│   └─ lythuyet5.txt
│   Format: Plain text with structured sections
│
├── 📋 README.md               ⭐ This file
└── .gitignore
```

---

## 🔧 Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Markup** | HTML5 | Semantic document structure |
| **Styling** | CSS3 | Layout, responsive design, animations |
| **Logic** | Vanilla JavaScript (ES6+) | No frameworks - pure DOM API |
| **Math Rendering** | MathJax 3 (CDN) | LaTeX formula support |
| **Async** | Fetch API | Load data files asynchronously |
| **Storage** | Static .txt files | Simple, version-control friendly |
| **Server** | HTTP (any static server) | Local development (python, node, etc) |

### Why This Stack?
- ✅ **Zero Dependencies**: No npm, no build tools, no framework bloat
- ✅ **Fast Loading**: Single HTML + CSS + JS file
- ✅ **Easy Maintenance**: Plain text data files
- ✅ **Cross-Platform**: Works on any OS, any browser
- ✅ **Version Control**: Git-friendly format

---

## ⚡ Core Modules

### 1. **Module: `loadChapter(chapterNum, title)`**

**Location**: `script.js` lines 20-72

**Purpose**: Orchestrates loading theory & quiz data for a chapter

**Parameters**:
- `chapterNum` (number): 1-5, chapter identifier
- `title` (string): Display title shown in header

**Flow**:
```javascript
loadChapter(2, "Chương 2: Quản lý tiến trình")
  ↓
1. Hide menu, show split-view
2. Set chapter title
3. Show loading placeholders
4. try/catch: fetch(lythuyet/lythuyet2.txt)
   ├─ formatTheoryContent() 
   └─ render to #theory-content
5. try/catch: fetch(quiz/chuong2.txt)
   ├─ parseFlashcards()
   └─ render to #flashcard-list
6. MathJax.typesetPromise() → render math
7. Scroll both panels to top
```

**Error Handling**: 
- Each fetch wrapped in try/catch
- User-friendly error messages displayed
- Console logging for debugging

---

### 2. **Module: `formatTheoryContent(text)`**

**Location**: `script.js` lines 75-95

**Purpose**: Parse theory file → HTML with semantic tags

**Input Format**:
```
PHẦN 1: TIÊU ĐỀ PHẦN
1. Subtitle
   Paragraph content...

PHẦN 2: PHẦN KHÁC
2. Another subtitle
   More content...
```

**Logic**:
```javascript
Split by newline
├─ Line starts with "PHẦN" → <h2>
├─ Line matches /^\d+\./ → <h3>
├─ Line starts with -, *, or (Name): → <li> → wrap in <ul>
└─ Otherwise → <p>

Post-process: Wrap consecutive <li> in single <ul>
```

**Output**: HTML string ready for DOM insertion

**Edge Cases**:
- Empty lines → skipped
- Whitespace trimmed
- Multiple <ul> collapsed into one

---

### 3. **Module: `parseFlashcards(text)`**

**Location**: `script.js` lines 98-148

**Purpose**: Parse quiz file → Array of card HTML elements

**Input Format**:
```
Câu 1: Question here? -> Answer here
Câu 2: Another question | Also works this way
```

**Separators Supported**:
- `->` (primary)
- `|` (alternative)

**Parsing Algorithm**:
```javascript
lines = text.split('\n')
for each line:
  ├─ Skip if empty
  ├─ Check if contains '->' or '|'
  ├─ Split on separator
  ├─ parts[0] = question
  └─ parts[1:] = answer
  
  Regex: /^Câu\s+\d+\s*[:.\-]?\s*/
  └─ Remove prefix "Câu N:" from question
  
  Create HTML:
  <div class="flashcard" onclick="...toggle('active')">
    <div class="question">Câu {count}: {question}</div>
    <div class="answer">{answer}</div>
  </div>
```

**Validation**:
- Both question & answer must be non-empty
- Line must contain separator
- Skip invalid lines silently

**Output**: Complete HTML string

---

### 4. **Module: Text Highlight (mouseup event)**

**Location**: `script.js` lines 151-209

**Purpose**: Allow user to highlight text with toggle on/off

**Trigger**: `mouseup` event anywhere in document

**Logic**:
```javascript
mouseup event
  ├─ Check if target is in #theory-content or #flashcard-list
  ├─ Get window.getSelection()
  ├─ Skip if selection is empty
  ├─ Get Range from selection
  │
  ├─ Search up DOM tree for .text-highlight ancestor
  │  ├─ If found: UNHIGHLIGHT (toggle off)
  │  │  └─ Extract textContent → replaceWith(textNode)
  │  │     (Preserves zero spacing changes)
  │  │
  │  └─ If not found: HIGHLIGHT (toggle on)
  │     └─ Create <span class="text-highlight">
  │     └─ range.surroundContents(span) or extractContents+insertNode
  │
  └─ selection.removeAllRanges()
```

**Key Features**:
- **Toggle**: Select again to unhighlight
- **Space Preservation**: No padding/margin added (CSS `.text-highlight`)
- **DOM Safety**: Try/catch for complex selections
- **Scope**: Only in theory & flashcard containers

**CSS** (styles.css):
```css
.text-highlight {
    background-color: #ffff00;
    /* No padding to preserve exact spacing */
}
```

---

### 5. **Module: `goBack()`**

**Location**: `script.js` lines 212-216

**Purpose**: Return from chapter view to main menu

**Logic**:
```javascript
goBack()
  ├─ Remove 'hidden' class from #menu
  └─ Add 'hidden' class to #split-view
```

---

## 📊 Data Format Specification

### Quiz File Format (quiz/chuongN.txt)

**Structure**:
```
Câu 1: Sự khác biệt cơ bản giữa tiến trình và chương trình là gì? -> Tiến trình là một thực thể chủ động..., còn chương trình là thực thể thụ động...
Câu 2: Vùng nhớ nào thay đổi theo thời gian? | Vùng dynamic data (Heap/Stack)
```

**Rules**:
- One question-answer pair per line
- Separator: `->` or `|` (not both in same line)
- Prefix "Câu N:" auto-removed during parsing
- Answer can span multiple lines? **NO** - single line only
- Special chars allowed in both parts
- Empty lines ignored

**Example Valid Line**:
```
Câu 3: What is X (with special chars: 中文, λ, ∑)? -> Answer with **bold**, [link], etc
```

**Example Invalid Line**:
```
Câu X: Missing separator
Both arrows->and|pipes  (inconsistent)
```

### Theory File Format (lythuyet/lythuyet.txt)

**Structure**:
```
PHẦN 1: KHÁI NIỆM CƠ BẢN

1. Subprocess title
   Paragraph text...
   
2. Another subprocess
   More text...

PHẦN 2: ADVANCED CONCEPTS

1. Title
   Content continues...
```

**Rules**:
- Lines starting with "PHẦN" → section header (h2)
- Lines matching `/^\d+\.` → subsection (h3)
- Lines starting with `-`, `*` → list items (becomes `<li>`)
- Other lines → paragraphs
- Empty lines = paragraph breaks
- No special syntax for bold/italic currently
- Line-by-line processing (no multi-line blocks)

**Example Valid Content**:
```
PHẦN 1: TIẾN TRÌNH
1. Định nghĩa
Tiến trình là một chương trình đang thực hiện.

- RAM chứa mã lệnh
- CPU xử lý lệnh
- Thanh ghi lưu giá trị
```

---

## 🎯 API Reference

### Public Functions

#### `loadChapter(chapterNum, title)`
- **Type**: `async function`
- **Params**: 
  - `chapterNum: number` (1-5)
  - `title: string` (display text)
- **Side effects**: 
  - DOM manipulation (#menu, #split-view, etc)
  - Network requests (2x fetch)
  - Potential MathJax render
- **Return**: `Promise<void>`
- **Throws**: Caught & displayed to user

#### `formatTheoryContent(text)`
- **Type**: Pure function
- **Param**: `text: string` (raw file content)
- **Return**: `string` (HTML)
- **Impure**: No side effects

#### `parseFlashcards(text)`
- **Type**: Pure function
- **Param**: `text: string` (raw file content)
- **Return**: `string` (HTML)
- **Impure**: No side effects

#### `goBack()`
- **Type**: Function
- **Params**: None
- **Side effects**: DOM class toggling
- **Return**: `void`

---

---

## 🔄 Event Flow Diagram

### Chapter Loading Flow
```
User clicks "Chương 2" button
  ↓ [onclick="loadChapter(2, '...')"]
  ↓
JavaScript: loadChapter(2, "Chương 2: Quản lý tiến trình")
  ↓
[Sync] Hide menu, show split-view
  ↓
[Async] fetch('lythuyet/lythuyet2.txt')
  ├─ Success → formatTheoryContent()
  │   ↓
  │   Render HTML to #theory-content
  │   ↓
  │   User can read
  │
  └─ Error → Show error message
  ↓
[Async] fetch('quiz/chuong2.txt')
  ├─ Success → parseFlashcards()
  │   ↓
  │   Render HTML to #flashcard-list
  │   ↓
  │   Attach click handlers (inline onclick)
  │   ↓
  │   User can click cards
  │
  └─ Error → Show error message
  ↓
[Async] MathJax.typesetPromise()
  └─ Render all $...$ and $$...$$ math formulas
```

### Flashcard Interaction Flow
```
User clicks on flashcard card
  ↓ [onclick="this.classList.toggle('active')"]
  ↓
CSS class="active" toggled on/off
  ↓
CSS selector: .flashcard.active .answer
  ├─ max-height: 0 → max-height: 200px (reveal)
  └─ Animation: 0.3s ease-in-out
  ↓
Answer visible/hidden
```

### Text Highlight Flow
```
User selects text in theory/quiz section
  ↓
mouseup event fires
  ↓
JavaScript checks:
  ├─ target in #theory-content? OR target in #flashcard-list?
  ├─ selection.toString().length > 0?
  └─ If both true, continue; else return
  ↓
Check if selected text already in <span class="text-highlight">
  ├─ YES: textNode = createTextNode(span.textContent)
  │       span.replaceWith(textNode)
  │       → UNHIGHLIGHTED
  │
  └─ NO: span = createElement('span')
         span.className = 'text-highlight'
         range.surroundContents(span)
         OR extractContents + appendChild + insertNode
         → HIGHLIGHTED
  ↓
selection.removeAllRanges()
  ↓
Visual: #ffff00 background appears/disappears
```

---

## 🛠️ Extension Guide

### Adding a New Chapter

**Step 1: Create data files**
```bash
# Create quiz file
echo "Câu 1: Question? -> Answer" > quiz/chuong6.txt
echo "Câu 2: Q2? | A2" >> quiz/chuong6.txt

# Create theory file
echo "PHẦN 1: TOPIC" > lythuyet/lythuyet6.txt
echo "1. Subtitle" >> lythuyet/lythuyet6.txt
echo "Content..." >> lythuyet/lythuyet6.txt
```

**Step 2: Update HTML button**
```html
<!-- In index.html -->
<button class="btn-chuong" onclick="loadChapter(6, 'Chương 6: New Chapter')">
    Chương 6: New Chapter
</button>
```

That's it! No code changes needed.

---

### Modifying Theory Format Parser

**Current patterns** (in `formatTheoryContent()`):
```javascript
if (trimmed.startsWith("PHẦN")) html += `<h2>${trimmed}</h2>`;
else if (/^\d+\./.test(trimmed)) html += `<h3>${trimmed}</h3>`;
else if (trimmed.startsWith("-") || trimmed.startsWith("*") || ...) 
    // becomes <li>
else html += `<p>${trimmed}</p>`;
```

**To add bold support** (e.g., `**text**`):
```javascript
let formatted = trimmed.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
html += `<p>${formatted}</p>`;
```

**To add italic support** (e.g., `_text_` or `*text*`):
```javascript
let formatted = trimmed.replace(/_(.+?)_/g, '<em>$1</em>');
```

**To add links** (e.g., `[text](url)`):
```javascript
let formatted = trimmed.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');
```

---

### Adding Custom CSS Styling

**Location**: `styles.css`

**Current structure**:
```css
:root {
    --primary-color: #3498db;
    --secondary-color: #2c3e50;
    --success-color: #27ae60;
    --danger-color: #c0392b;
    --light-bg: #ecf0f1;
    --border-color: #bdc3c7;
}

/* Reusable classes */
.hidden { display: none; }
.text-highlight { background-color: #ffff00; }

/* Major components */
.menu-container { ... }
.split-container { ... }
.flashcard { ... }
.flashcard.active .answer { ... }
```

**To customize colors**: Modify `:root` variables

**To change layout**: Modify `.split-container` grid properties

**To add animations**: Follow `.flashcard.active` pattern (transition + max-height)

---

### Implementing New Features

#### Feature: Dark Mode
```javascript
// Add toggle in HTML
<button onclick="toggleDarkMode()">🌙 Dark Mode</button>

// Add to script.js
function toggleDarkMode() {
    document.documentElement.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', 
        document.documentElement.classList.contains('dark-mode'));
}

// Load preference on startup
if (localStorage.getItem('darkMode') === 'true') {
    document.documentElement.classList.add('dark-mode');
}
```

#### Feature: Quiz Statistics
```javascript
const stats = {
    totalCards: 0,
    viewed: new Set(),
    
    trackView(cardIndex) {
        this.viewed.add(cardIndex);
        this.updateUI();
    },
    
    getProgress() {
        return Math.round((this.viewed.size / this.totalCards) * 100);
    },
    
    updateUI() {
        const progress = this.getProgress();
        document.getElementById('progress-bar').style.width = progress + '%';
    }
};
```

#### Feature: Search/Filter
```javascript
function filterFlashcards(keyword) {
    const cards = document.querySelectorAll('.flashcard');
    cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(keyword.toLowerCase()) 
            ? 'block' 
            : 'none';
    });
}
```

---

## 🚀 Development Setup

### Local Testing

#### Option 1: Python (Built-in)
```bash
# Python 3
cd /path/to/QUIZ
python -m http.server 5500

# Then open: http://localhost:5500
```

#### Option 2: Node.js
```bash
npm install -g http-server
http-server . -p 5500
```

#### Option 3: PHP
```bash
cd /path/to/QUIZ
php -S localhost:5500
```

#### Option 4: VS Code Live Server Extension
- Install "Live Server" extension
- Right-click `index.html`
- Select "Open with Live Server"
- Auto-opens in default browser + auto-reloads on changes

### Debugging

#### Enable Console Logging
```javascript
// In script.js, add:
console.log('Loading chapter:', chapterNum);
console.log('Theory loaded:', text.length, 'chars');
console.log('Flashcards parsed:', cardCount, 'cards');
```

#### Check Network Requests
- Open DevTools (F12)
- Network tab
- Reload page
- Check if .txt files load (200 status)
- Check MathJax CDN loads

#### Inspect DOM
- DevTools → Elements tab
- Click "Select element" tool
- Click any UI element
- View generated HTML structure

---

## 📈 Performance Considerations

### Current Bottlenecks
1. **MathJax CDN latency** (~1-2s first load)
   - Solution: Cache via service worker
2. **Large theory files** (multiple KB)
   - Solution: Split into sections, lazy-load
3. **No pagination** for flashcards
   - Solution: Implement virtual scrolling

### Optimization Tips
```javascript
// Memoize expensive operations
const cache = {};
function getTheory(chapterNum) {
    if (cache[chapterNum]) return cache[chapterNum];
    // ... fetch & parse
    cache[chapterNum] = result;
    return result;
}

// Debounce frequent events
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

// Use event delegation instead of multiple listeners
document.addEventListener('click', (e) => {
    if (e.target.matches('.flashcard')) {
        e.target.classList.toggle('active');
    }
});
```

---

## 🐛 Known Issues & Solutions

| Issue | Root Cause | Solution |
|-------|-----------|----------|
| Flashcard doesn't toggle | CSS `max-height` wrong value | Increase max-height in `.flashcard.active .answer` |
| Text highlight not working | Event listener on wrong element | Check container IDs match |
| Theory content blank | File fetch failed | Check file path, file encoding (UTF-8) |
| Math formulas not rendered | MathJax CDN timeout | Wait for CDN, or use local MathJax |
| CORS error when loading files | Server misconfiguration | Use proper HTTP server, not file:// protocol |

---

## 📝 Code Quality

### Current Standards
- ✅ No minification (readable)
- ✅ Consistent naming: camelCase functions, kebab-case classes
- ✅ Try/catch for error handling
- ✅ Comments on complex logic
- ✅ Semantic HTML5
- ✅ Mobile-responsive CSS

### Improvement Ideas
- Add JSDoc comments
- Implement linting (ESLint)
- Add unit tests (Jest)
- Create TypeScript definitions
- Setup pre-commit hooks

---

## 🔗 Related Resources

- **MathJax Docs**: https://docs.mathjax.org/
- **Fetch API**: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
- **Responsive Design**: https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design
- **Browser DevTools**: https://developer.chrome.com/docs/devtools/

---

## 📋 Checklist for Future Maintainers

- [ ] Keep data files (quiz/, lythuyet/) synchronized
- [ ] Test all 5 chapters on Chrome, Firefox, Safari
- [ ] Verify MathJax formulas render correctly
- [ ] Check highlight feature on all browsers
- [ ] Monitor CSS for responsive on mobile (<500px width)
- [ ] Update README when adding features
- [ ] Keep folder structure organized
- [ ] Validate .txt files for encoding (UTF-8)

---

**Last Updated**: 2026-03-19  
**Version**: 1.0  
**Maintainer**: [Your Name]
