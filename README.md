# 💰 Trình Quản Lý Chi Tiêu Cá Nhân

## 🧭 Tổng Quan Dự Án

**Trình Quản Lý Chi Tiêu Cá Nhân** là một ứng dụng web đơn giản, nhẹ và dễ sử dụng giúp người dùng quản lý chi tiêu hàng ngày một cách nhanh chóng và riêng tư. Ứng dụng này hoạt động trực tiếp trên trình duyệt mà **không cần đăng ký tài khoản, không cần kết nối server hay cài đặt**.

Dữ liệu được lưu cục bộ thông qua `localStorage`, với tùy chọn sử dụng Firebase nếu bạn muốn đồng bộ dữ liệu trên nhiều thiết bị.

---

## 🎯 Mục Tiêu Kinh Doanh

Là một Business Analyst, tôi nhận thấy rằng rất nhiều người muốn theo dõi chi tiêu nhưng gặp trở ngại vì:

- Ứng dụng quá phức tạp hoặc nhiều tính năng thừa.
- Yêu cầu đăng nhập, kết nối mạng hoặc thu thập dữ liệu người dùng.
- Bị giới hạn bởi quảng cáo hoặc phí ẩn.

Dự án này hướng tới việc tạo ra một **công cụ đơn giản, nhanh, miễn phí và tôn trọng quyền riêng tư**, giúp bạn dễ dàng theo dõi tài chính cá nhân.

---

## ✅ Mục Tiêu Dự Án

- Theo dõi chi tiêu theo ngày, danh mục, số tiền và ghi chú.
- Tìm kiếm, lọc và hiển thị lịch sử chi tiêu.
- Tóm tắt tổng chi tiêu theo ngày / tuần / tháng.
- Lưu dữ liệu bằng `localStorage` hoặc Firebase (tuỳ chọn).
- Giao diện thân thiện, responsive trên cả điện thoại và máy tính.
- Không thu thập dữ liệu cá nhân mặc định.

---

## 🛠️ Tính Năng Chính

| Tính năng             | Mô tả                                                                 |
|-----------------------|------------------------------------------------------------------------|
| **Thêm chi tiêu**      | Nhập số tiền, danh mục, ghi chú và ngày nhanh chóng.                 |
| **Xem lịch sử**        | Danh sách các khoản chi tiêu đã ghi.                                  |
| **Chỉnh sửa/Xoá**      | Sửa hoặc xoá các mục chi tiêu cũ.                                     |
| **Tìm kiếm & lọc**     | Lọc theo danh mục, khoảng thời gian hoặc từ khóa.                    |
| **Tổng hợp chi tiêu**  | Hiển thị tổng số tiền chi theo thời gian.                            |
| **Lưu cục bộ**         | Dữ liệu lưu bằng `localStorage`, không cần internet.                 |
| **Đồng bộ Firebase**   | Tùy chọn đồng bộ đám mây với Firebase (đang phát triển).             |
| **Hỗ trợ di động**     | Tương thích mọi kích thước màn hình.                                 |
| **Bảo mật dữ liệu**    | Không đăng nhập, không theo dõi, không phân tích người dùng.         |

---

## 👥 Người Dùng Mục Tiêu

- Người muốn ghi chép chi tiêu cá nhân đơn giản.
- Sinh viên, freelancer, người độc lập tài chính.
- Người muốn kiểm soát tài chính mà không cần app phức tạp.

---

## 🗺️ Lộ Trình Phát Triển

| Giai đoạn   | Mô tả                                                                     |
|-------------|---------------------------------------------------------------------------|
| ✅ MVP       | Nhập chi tiêu, xem lịch sử, lưu bằng `localStorage`                      |
| 🔜 v1.1      | Lọc, tìm kiếm, biểu đồ đơn giản, tổng hợp theo tháng                     |
| 🔜 v2.0      | Tích hợp Firebase, đăng nhập, đồng bộ nhiều thiết bị                     |
| 🔜 v3.0      | Giới hạn ngân sách, cảnh báo, xuất CSV, hỗ trợ PWA                        |

---

## ⚙️ Công Nghệ Sử Dụng

- **Frontend**: HTML, CSS, JavaScript (hoặc React)
- **Lưu trữ**: `localStorage`, Firebase Firestore (tuỳ chọn)
- **Triển khai**: GitHub Pages, Netlify hoặc Vercel

---

## 🚀 Cách Chạy Dự Án

```bash
# Tải về repo
git clone https://github.com/ten-cua-ban/quan-ly-chi-tieu.git
cd quan-ly-chi-tieu

# Mở file index.html bằng trình duyệt
open index.html

## 🔐 Chính Sách Dữ Liệu
 - Không yêu cầu đăng ký, không phân tích hành vi người dùng.
 - Không gửi dữ liệu lên server nếu không dùng Firebase.
 - Ưu tiên quyền riêng tư và bảo mật thông tin cá nhân.

## 📄 Giấy Phép
 - Dự án này được phát hành theo giấy phép MIT License.

## 👤 Tác Giả
 - Dự án được lên ý tưởng và thiết kế bởi một Business Analyst, với mong muốn cung cấp một công cụ tài chính đơn giản, hữu ích và thân thiện với người dùng phổ thông.

---

## 🇺🇸 **README in English**

```markdown
# 💰 Personal Expense Tracker

## 🧭 Project Overview

**Personal Expense Tracker** is a lightweight, privacy-first web app that allows users to easily record and manage daily expenses. It runs directly in the browser using `localStorage`, with optional Firebase sync for cross-device access — no signup or installation needed.

---

## 🎯 Business Vision

As a Business Analyst, I observed that many people want to track expenses but avoid using current apps due to:

- Unnecessary complexity or bloated features
- Privacy concerns and required logins
- Subscription walls or ads

This project aims to provide a **free, simple, fast, and private** solution to help users build better financial habits without friction.

---

## ✅ Project Objectives

- Quickly log expenses by category, amount, and date.
- View, filter, and search past transactions.
- Summarize spending by day, week, or month.
- Store data locally or sync to Firebase (optional).
- Fully responsive design for all devices.
- No account or tracking required by default.

---

## 🛠️ Key Features

| Feature               | Description                                                                 |
|----------------------|-----------------------------------------------------------------------------|
| **Add Expense**       | Input amount, category, date, and notes.                                   |
| **Expense History**   | View a list of past expenses with sorting and grouping.                    |
| **Edit/Delete**       | Modify or remove previous entries.                                         |
| **Search & Filter**   | Filter by category, date range, or note content.                           |
| **Summary Dashboard** | Basic totals and optional charts (in progress).                            |
| **Offline Storage**   | All data saved in `localStorage`, no internet required.                    |
| **Firebase Sync**     | Optional cloud sync using Firebase Firestore (planned).                    |
| **Mobile Friendly**   | Fully responsive UI for mobile and desktop.                                |
| **Privacy by Design** | No analytics, ads, or external tracking by default.                        |

---

## 👥 Target Users

- Individuals tracking daily expenses manually.
- Students, freelancers, or anyone budgeting on their own.
- People who want a fast, free, no-login spending tracker.

---

## 🗺️ Development Roadmap

| Phase        | Description                                                                 |
|--------------|-----------------------------------------------------------------------------|
| ✅ MVP        | Add/view/edit/delete expenses using `localStorage`.                         |
| 🔜 v1.1       | Add filtering, summaries, and visualizations.                              |
| 🔜 v2.0       | Firebase login, cloud sync, mobile-first design.                           |
| 🔜 v3.0       | Budget alerts, CSV export/import, and PWA support.                         |

---

## ⚙️ Tech Stack

- **Frontend**: HTML, CSS, JavaScript (or optionally React)
- **Storage**: `localStorage`, Firebase Firestore (optional)
- **Hosting**: GitHub Pages, Netlify, or Vercel

---

## 🚀 Running the App

```bash
# Clone the repository
git clone https://github.com/your-username/personal-expense-tracker.git
cd personal-expense-tracker

# Open in your browser
open index.html

## 🔐 Data Privacy
 - No login required
 - No tracking or analytics tools by default
 - Local data storage only unless using Firebase

## 📄 License
This project is licensed under the MIT License.

## 👤 About the Author
This project was initiated by a Business Analyst who is passionate about user-friendly tools and helping people make better financial decisions with simple, transparent software.
