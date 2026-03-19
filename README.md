# 📚 Ôn Tập Hệ Điều Hành - Tổng Hợp Ôn Tập Thông Minh

> Công cụ học tập tương tác dành cho sinh viên ôn tập **Hệ Điều Hành (Operating Systems)** 
> Kết hợp lý thuyết chi tiết + flashcard bài tập cho mỗi chương

---

## 🎯 Mục Đích

Hệ thống này cung cấp một giải pháp học tập toàn diện giúp sinh viên:
- 📖 Đọc lý thuyết chi tiết, có cấu trúc rõ ràng
- ❓ Luyện tập qua flashcard Q&A tương ứng
- ✏️ Đánh dấu (highlight) phần quan trọng để ôn luyện
- 🔄 Học tập linh hoạt với giao diện chia đôi

---

## 📖 Nội Dung Học Tập

### **Chương 1: Tổng Quan về Hệ Điều Hành**
- Khái niệm và chức năng cơ bản của HĐH
- Vị trí HĐH trong hệ thống máy tính
- Lịch sử phát triển từ ENIAC (1946) đến Cloud Computing (2020s)
- Phân loại HĐH: xử lý lô, chia sẻ thời gian, thời gian thực, song song, phân tán
- Thành phần chính: quản lý tiến trình, bộ nhớ, I/O, file, mạng, bảo vệ
- Đặc tính cốt lõi: độ tin cậy, an toàn, hiệu quả, tính kế thừa, thuận tiện

**Từ khóa:** OS kernel, shell, system calls, tiến trình, luồng, tài nguyên hệ thống

---

### **Chương 2: Quản Lý Tiến Trình & Luồng**
- **Tiến trình vs Chương trình**: Chương trình là thực thể thụ động, tiến trình là trạng thái động
- **Vòng đời tiến trình**: 5 trạng thái (New → Ready → Running → Waiting → Terminated)
- **PCB (Process Control Block)**: Cấu trúc dữ liệu đại diện tiến trình
  - Bộ đếm lệnh (PC)
  - Giá trị các thanh ghi
  - Trạng thái & thông tin điều phối
  - Giới hạn bộ nhớ & danh sách file mở

- **Context Switch**: Hoán đổi CPU giữa các tiến trình (overhead)
- **Hàng đợi & Lập lịch**:
  - Long-term Scheduler: Đưa tiến trình từ đĩa → RAM
  - Short-term Scheduler: Phân phối CPU (10-100ms/lần)
  - Medium-term Scheduler: Hoán chuyển bộ nhớ (Swapping)

- **Truyền thông liên tiến trình (IPC)**:
  - Shared Memory: Dùng chung bộ nhớ (nhanh)
  - Message Passing: Gửi/nhận messages (an toàn)

- **Luồng (Thread)**: Đơn vị sử dụng CPU cơ bản bên trong tiến trình

**Từ khóa:** Process states, scheduling, PCB, context switch, IPC, threads, process tree

---

### **Chương 3: Quản Lý Bộ Nhớ**
- **Địa chỉ Logic vs Vật lý**: CPU sinh ra địa chỉ logic → MMU chuyển đổi sang vật lý
- **Các cấu trúc tổ chức chương trình**:
  - **Tuyến tính (Linear)**: Nạp toàn bộ → nhanh nhưng lãng phí
  - **Nạp động (Dynamic Loading)**: Nạp module khi cần → tiết kiệm RAM
  - **Liên kết động (DLL)**: Liên kết thư viện tại runtime
  - **Overlays**: Chia chương trình thành các mức → chạy chương trình > RAM

- **Cấp phát bộ nhớ liên tục**:
  - **Phân chương cố định**: Chia RAM thành các phần cố định
    - Vấn đề: Internal fragmentation
  - **Phân chương động**: Tạo chương theo nhu cầu
    - Vấn đề: External fragmentation

- **Paging & Virtual Memory**: Chia bộ nhớ thành các trang (pages)
- **Segmentation**: Chia bộ nhớ thành các phân đoạn logic

**Từ khóa:** MMU, logical/physical address, fragmentation, virtual memory, paging, segmentation, dynamic loading

---

### **Chương 4: Quản Lý Tập Tin & Thư Mục**
- **File (Tập tin)**: Đơn vị lưu trữ logic trên bộ nhớ ngoài
  - Thuộc tính: Tên, ID, Kiểu, Vị trí, Kích thước, Quyền bảo vệ, Thời gian
  - Thao tác: Create, Delete, Read, Write, Truncate, Open, Close

- **Cấu trúc Thư mục**:
  - **Một mức**: Tất cả file chung (dễ trùng tên)
  - **Hai mức**: Mỗi người dùng một thư mục riêng
  - **Cây (Tree)**: Phổ biến nhất (DOS, Windows) - Root, path tuyệt đối/tương đối
  - **Đồ thị có hướng**: Cho phép tạo link tới file của người khác

- **Phương pháp Phân phối Vùng Lưu Trữ** *(hay thi)*:
  - **Liên tục (Continuous)**: File nằm các khối liên tiếp → nhanh, nhưng external fragmentation
  - **Danh sách liên kết (Linked)**: Khối chứa con trỏ tới khối kế tiếp → linh hoạt, nhưng chậm
  - **Indexed**: Sử dụng inode → tốc độ tốt, quản lý dễ

**Từ khóa:** File control block, directory, file allocation, fragmentation, inode, path

---

### **Chương 5: Quản Lý Hệ Thống Vào/Ra**
- **Phân loại Thiết bị Ngoại vi**:
  - **Block devices**: Đĩa từ, băng từ (có địa chỉ, định vị được)
  - **Character devices**: Máy in, bàn phím (luồng ký tự, không định vị)

- **Cấu trúc Giao tiếp**:
  - **Device Controller**: Khối phần cứng trung gian làm việc với CPU
  - **Device Driver**: Phần mềm giao tiếp với phần cứng
  - **Cổng I/O (I/O Ports)**: Thanh ghi điều khiển TBNV

- **Phương pháp Giao tiếp HĐH-TBNV**:
  - **Ngắt (Interrupts)**: TBNV báo cho CPU khi hoàn thành
  - **Thăm dò (Polling)**: CPU kiểm tra liên tục (lãng phí CPU)

- **Vùng Đệm (Buffer)**:
  - Giải quyết chênh lệch tốc độ giữa TBNV (chậm) ↔ CPU (nhanh)
  - Buffer gắn thiết bị vs Buffer gắn hệ thống

- **Kỹ thuật SPOOL**: Mô phỏng thiết bị vật lý → thiết bị ảo dùng chung
  - Ứng dụng: Máy in ảo → tránh tắc nghẽn

- **Điều phối Đĩa Từ** *(trọng tâm)*: 
  - Sắp xếp hàng đợi truy xuất đĩa → giảm seek time
  - Thuật toán: FCFS, SSTF, SCAN, CSCAN, LOOK

**Từ khóa:** Device controller, device driver, interrupts, polling, buffer, SPOOL, disk scheduling

---

## 🎮 Cách Sử Dụng

### **1. Mở Ứng Dụng**
- Mở file `index.html` trong trình duyệt (cần web server cho file:// nếu không hỗ trợ)
- Hoặc khởi động server địa phương: `python -m http.server 5500`

### **2. Học Tập**
```
Menu chính
  ↓
Chọn Chương (1-5)
  ↓
Giao diện Chia Đôi:
  ├─ Trái: Lý thuyết (Có thể Highlight)
  └─ Phải: Flashcard Bài tập (Click card để xem đáp án)
```

### **3. Tính Năng Highlight**
- **Chọn đoạn chữ** → Tô màu vàng (Highlight lần 1)
- **Chọn lại đoạn vừa highlight** → Bỏ highlight (Toggle)
- ✅ **Giữ nguyên khoảng trắng** - không thay đổi định dạng
- Sử dụng để đánh dấu kiến thức quan trọng cần nhớ

### **4. Sử Dụng Flashcard**
- Click card để xem đáp án
- Click lại để ẩn đáp án
- Đọc kỹ giải thích + so sánh với lý thuyết bên trái

---

## 📁 Cấu Trúc Thư Mục

```
QUIZ/
├── index.html              # Trang chủ + giao diện chính
├── script.js               # Logic tải dữ liệu + highlight + flashcard
├── styles.css              # Toàn bộ styling
├── README.md               # File này
│
├── quiz/                   # Dữ liệu bài tập
│   ├── chuong1.txt
│   ├── chuong2.txt
│   ├── chuong3.txt
│   ├── chuong4.txt
│   └── chuong5.txt
│
└── lythuyet/               # Dữ liệu lý thuyết
    ├── lythuyet1.txt
    ├── lythuyet2.txt
    ├── lythuyet3.txt
    ├── lythuyet4.txt
    └── lythuyet5.txt
```

---

## 🛠️ Định Dạng Dữ Liệu

### **Flashcard (file quiz/chuongN.txt)**
```
Câu 1: Câu hỏi? -> Câu trả lời
Câu 2: Khác biệt giữa A và B là gì? | Giải thích...
```
- Separator: `->` hoặc `|`
- Mỗi dòng = 1 flashcard
- Prefix "Câu N:" tự động được loại bỏ

### **Lý Thuyết (file lythuyet/lythuyet.txt)**
```
PHẦN 1: TÊN PHẦN
1. Tiêu đề chủ đề
Nội dung lý thuyết
Có thể chứa **từ in đậm** và liên kết

2. Tiêu đề chủ đề khác
Nội dung tiếp tục...
```

---

## ✨ Tính Năng Nổi Bật

| Tính Năng | Chi Tiết |
|-----------|----------|
| 📖 Lý Thuyết Có Cấu Trúc | Được tổ chức theo phần, tiêu đề, danh sách |
| ❓ Flashcard Động | Load từ file, hỗ trợ 2 format separator |
| 🎯 Highlight Thông Minh | Toggle on/off, giữ nguyên khoảng trắng |
| 📱 Responsive Design | Giao diện thích ứng desktop và tablet |
| ⚡ Tải Nhanh | HTML+CSS+JS gọn nhẹ, không cần backend |
| 🔄 Chia Đôi | Đọc lý thuyết + làm bài tập cực tiện |

---

## 🎓 Lợi Ích Học Tập

✅ **Tổng quan toàn diện**: 5 chương bao quát core OS concepts  
✅ **Học tập chủ động**: Tự chọn chương, nội dung, tốc độ  
✅ **Kiểm tra hiểu biết**: Flashcard giúp tự kiểm tra kiến thức  
✅ **Ôn tập hiệu quả**: Highlight + review nhiều lần không mất thời gian  
✅ **Chuẩn bị thi tốt**: Bao gồm cả lý thuyết lẫn bài tập  

---

## 💻 Yêu Cầu Hệ Thống

- **Trình duyệt hiện đại**: Chrome, Firefox, Edge, Safari
- **JavaScript**: Bật JS (không dùng thư viện ngoài)
- **Web Server** *(tùy chọn)*: Cần với file:// nếu trình duyệt không hỗ trợ

### **Chạy Cục Bộ (Local)**
```bash
# Option 1: Python
python -m http.server 5500

# Option 2: Node.js
npx http-server -p 5500

# Option 3: Live Server (VS Code Extension)
# Right-click index.html → Open with Live Server
```

Sau đó mở: `http://localhost:5500/index.html`

---

## 📝 Ghi Chú Ôn Tập

### **Kiến Thức Trọng Tâm (Hay Thi)**
1. **Chương 2**: Process states, PCB, Context switch, Scheduler
2. **Chương 3**: Memory fragmentation, Virtual memory, Paging
3. **Chương 4**: File allocation methods (Continuous, Linked, Indexed)
4. **Chương 5**: Disk scheduling algorithms (FCFS, SSTF, SCAN)

### **Tips Học Hiệu Quả**
- 📖 **Đọc lý thuyết** → Highlight kiến thức quan trọng
- ❓ **Làm flashcard** → Coi đáp án để kiểm tra
- 🔁 **Review lại** → Phần highlight để nhớ lâu
- ✍️ **Ghi chú bổ sung** → Viết tay phần khó
- 🎯 **Thảo luận nhóm** → Giải thích cho bạn

---

## 🐛 Troubleshooting

| Vấn Đề | Giải Pháp |
|--------|-----------|
| Flashcard không load | Kiểm tra file `quiz/chuongN.txt` tồn tại + định dạng đúng |
| Lý thuyết không hiển thị | Kiểm tra file `lythuyet/lythuyet.txt` & format |
| Highlight không hoạt động | Reload page (F5) + thử chọn text rõ ràng |
| Giao diện lệch | Xóa cache (Ctrl+Shift+Delete) rồi reload |

---

## 📞 Hỗ Trợ

Nếu gặp lỗi:
1. **Mở DevTools (F12)** → Kiểm tra Console
2. **Kiểm tra Network** → Đảm bảo file load đúng
3. **Xem file source** → Xác minh định dạng dữ liệu

---

## 📜 License & Lời Cảm Ơn

Tài liệu này được biên soạn để **mục đích học tập** trong khóa học **Hệ Điều Hành**.

Dựa trên kiến thức từ:
- Tanenbaum & Bos: "Modern Operating Systems"
- Silberschatz, Galvin, Gagne: "Operating System Concepts"
- Các giáo trình ĐH & tài liệu Việt Nam

---

## 🚀 Phiên Bản & Cập Nhật

**v1.0** (2026-03-19)
- ✅ 5 chương hoàn chỉnh
- ✅ Lý thuyết + Flashcard
- ✅ Tính năng Highlight
- ✅ Giao diện Chia Đôi

**Tính năng sắp tới**:
- 📊 Thống kê ôn tập
- 🎯 Quiz Mode với điểm
- 📌 Bookmark câu hỏi khó
- 🌙 Dark Mode

---

## 🎉 Chúc Bạn Học Tập Hiệu Quả!

> *"Ôn lý thuyết, luyện bài tập, hiểu rõ OS!"*

**Hãy bắt đầu từ Chương 1 ngay hôm nay!** 📚✨
