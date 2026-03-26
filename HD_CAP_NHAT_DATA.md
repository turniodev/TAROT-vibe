# Hướng Dẫn Cập Nhật Dữ Liệu Tarot (`js/data.js`)

Để bảo vệ chất xám và cấu trúc dữ liệu của 78 lá bài Tarot (`js/data.js`) khỏi bị người khác lấy cắp dễ dàng thông qua tab Network trên trình duyệt, hệ thống đã được thiết lập một quy trình mã hóa tự động đơn giản.

Từ nay, bạn **KHÔNG THỂ** chỉnh sửa trực tiếp vào file `js/data.js` nữa (giao diện hiện tại của file này là các chuỗi Base64 đảo ngược rất hỗn độn khó đọc). 

Thay vào đó, mỗi khi muốn cập nhật ý nghĩa, hình ảnh hay tên gọi của các lá bài, bạn phải làm theo **Quy trình 2 bước** cực kỳ đơn giản dưới đây:

## Bước 1: Chỉnh sửa trực tiếp trên file nguồn (`js/data_source.js`)
File `js/data_source.js` là nơi lưu trữ toàn bộ dữ liệu gốc **nguyên bản, dễ đọc (JSON format)**. 
- Mở file `e:\TAROT\js\data_source.js`.
- Tìm đến lá bài bạn muốn sửa (viết dưới định dạng JSON).
- Thêm/sửa nội dung (text, image path, keyword, giải nghĩa upright/reversed,...).
- Lưu lại file (`Ctrl + S`).

*Lưu ý quan trọng:* 
1. Đảm bảo bạn không làm sai cú pháp dấu ngoặc nhọn `{ }`, ngoặc vuông `[ ]`, hoặc thiếu dấu phẩy `,` giữa các trường dữ liệu.
2. File `data_source.js` này là bảo vật nội bộ, **TUYỆT ĐỐI KHÔNG UPLOAD** lên Hosting chạy thuật, và file `.gitignore` đã được cấu hình để tránh việc bạn push nhầm nó lên Github Public. Cứ để nó ẩn dật ở máy tính của bạn hoặc lưu trữ ở Drive cá nhân.

## Bước 2: Build lại file bảo mật (`data.js`)
Sau khi đã sửa xong và lưu file `js/data_source.js`, thao tác tiếp theo là đóng gói bản mã hóa:
- Mở **Terminal / CMD / PowerShell** ngay tại thư mục gốc của dự án (`e:\TAROT\`).
- Gõ lệnh sau và nhấn Enter:
  ```bash
  node build_db.js
  ```
- Nếu Terminal hiện dòng chữ: `Hoàn thành! Đã mã hóa nội dung từ data_source.js sang data.js để bảo mật.`, nghĩa là mọi thứ đã thành công 100%.

Lúc này, công cụ `build_db.js` đã tự động hút dữ liệu bạn vừa sửa, tiến hành nén, mã hóa Base64 và ghi đè tự động thành công vào file `js/data.js`. Ứng dụng web Tarot của bạn sẽ lập tức nhận dữ liệu mới bản cập nhật để chạy mà không một ai có thể copy được!

## Xử lý sự cố nếu có lỗi (Troubleshooting)
- **Lỗi "Không tìm thấy file js/data_source.js"**: Hãy chắc chắn rằng bạn không vô tình đổi tên, xóa nhầm file `data_source.js`, và bạn đang chạy lệnh trên tại đúng thư mục `e:\TAROT\`.
- **Lỗi "Cấu trúc JSON trong data_source.js không hợp lệ"**: Khả năng 99% là trong lúc biên dịch ở Bước 1, bạn đã thiếu hoặc thừa một dấu phẩy (`,`), một dấu ngoặc kép (`"`). Hãy rà soát lại cẩn thận định dạng JSON ở vị trí dòng code bạn vừa sửa.

---
**Chúc ứng dụng của Turnio DEV vận hành trơn tru và phát triển mạnh mẽ!**
