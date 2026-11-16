# KẾ HOẠCH TRIỂN KHAI TRANG MES ERROR CODE LIST (`/config/mes-error-code`)

> **Tài liệu tham chiếu:** Plan đặc tả kiến trúc, thiết kế giao diện, luồng tương tác ngữ cảnh và cơ chế phân quyền (RBAC) cho màn hình **Danh Mục & Quản Lý Mã Lỗi MES (MES Error Code List & Knowledge Base)**.  
> **Áp dụng cho route:** `/config/mes-error-code` (thuộc nhóm menu **MES ERROR -> MES ERROR CODE LIST**).  
> **Component đích:** `src/features/config/mes_error_code/MesErrorCodeListPage.jsx`.  
> **Thư mục chức năng:** `src/features/config/mes_error_code/`.  
> **Ngày khởi tạo:** 13/11/2026.  
> **Vị trí tài liệu:** `src/md/MES_ERROR_CODE_LIST_PLAN.md` (đồng bộ tại `md/MES_ERROR_CODE_LIST_PLAN.md`).

---

## 1. TỔNG QUAN VÀ MỤC TIÊU NGHIỆP VỤ

Trong các nhà máy sản xuất tự động hóa máy chủ thông minh AI (Foxconn FII hợp tác sản xuất cho NVIDIA), hệ thống điều hành sản xuất **MES (Manufacturing Execution System)** giám sát và thu thập liên tục dữ liệu từ hàng trăm công đoạn (SMT, AOI, X-Ray, Pressfit, Screw Tự Động, Functional Test, Burn-in, Packing). Khi xảy ra sự cố kỹ thuật hoặc phế phẩm, các trạm máy tự động kích hoạt mã lỗi (**Error Code**) để lập tức khóa khay chứa (**Interlock Carrier/Jig**) và cảnh báo cho công nhân hoặc kỹ sư chuyên trách.

Trang **MES ERROR CODE LIST (`/config/mes-error-code`)** đóng vai trò là **Từ điển mã lỗi & Sổ tay hướng dẫn khắc phục chuẩn (Error Catalog & Troubleshooting SOP)**:

1. **Tra cứu & Tìm kiếm nhanh trên Top Bar**: Cho phép tìm kiếm tức thời theo cả **Mã lỗi (Error Code)** và **Nội dung thông báo (Message/Content)** giúp kỹ sư hiện trường tra cứu nguyên nhân chỉ trong vài giây.
2. **Nút Thêm mã lỗi mới (Add Error Code)**: Cho phép mở modal khai báo mã lỗi mới vào cơ sở dữ liệu hệ thống MES.
3. **Bảng dữ liệu chuẩn hóa 4 trường**:
   - `#`: Số thứ tự bản ghi (tính theo phân trang hiện tại).
   - `Error Code`: Mã lỗi MES (ví dụ: `ERR_SFC_CARRIER_LOCKED`, `ERR_AOI_SOLDER_BRIDGE`...).
   - `Owner`: Bộ phận phụ trách kỹ thuật (PE, TE, ME, QA, MES/IT).
   - `Message (EN)`: Thông báo lỗi bằng tiếng Anh chuẩn hóa quốc tế.
4. **Xem chi tiết mã lỗi tương tác (Error Detail Modal)**: Khi người dùng nhấp chuột vào mã lỗi, hệ thống mở cửa sổ chi tiết hiển thị đầy đủ:
   - Bộ phận phụ trách (Owner / Department).
   - Thông báo tiếng Anh (Message EN).
   - Thông báo tiếng Việt (Message VI - phục vụ kỹ sư và công nhân vận hành Việt Nam).
   - Hướng dẫn xử lý / Khắc phục (Troubleshooting SOP / Remediation Steps).
5. **Thực đơn ngữ cảnh chuột phải (Custom Right-Click Context Menu)**:
   - Khi nhấp chuột phải (`contextmenu`) vào bất kỳ dòng mã lỗi nào trong bảng, một dropdown menu ngữ cảnh nổi lên ngay tại tọa độ trỏ chuột với 2 tùy chọn: **Sửa (Edit)** và **Xóa (Delete)**.
6. **Kiểm soát phân quyền chặt chẽ (Role-Based Access Control - RBAC)**:
   - **Chỉ người dùng có quyền `admin` hoặc `manager`** mới có quyền thực hiện các thao tác: **Thêm mới**, **Sửa**, **Xóa**.
   - **Người dùng không có 2 quyền này** (ví dụ: `operator`, `technician`, `guest`...):
     - Nút **Thêm mới** trên Top Bar bị **Disable** (hiển thị mờ, con trỏ `not-allowed`, tooltip cảnh báo quyền hạn).
     - Trong Context Menu chuột phải: Cả 2 mục **Sửa** và **Xóa** đều bị **Disable** (xám mờ, không thể click, kèm icon khóa hoặc tooltip phân quyền).
7. **Tích hợp phân trang dùng chung (`Pagination.jsx`)**: Tái sử dụng thành phần phân trang chuẩn hóa toàn dự án từ `src/components/common/Pagination.jsx` hỗ trợ đầy đủ nhận diện thương hiệu kép (**Foxconn Navy / NVIDIA Neon Green**).

---

## 2. BỐ CỤC KHÔNG GIAN VÀ SƠ ĐỒ GIAO DIỆN

### 2.1. Sơ đồ Luồng Hoạt Động (Architecture Flowchart)

```mermaid
flowchart TD
    PageHeader["PageHeaderBar: MES ERROR CODE LIST (/config/mes-error-code)"] --> TopBar["Thanh Công Cụ Tìm Kiếm & Thao Tác (Top Bar)"]

    subgraph TopBar["Thanh Công Cụ Trên Cùng (Top Bar)"]
        SearchInput["🔍 Ô nhập: Tìm kiếm theo mã lỗi hoặc nội dung..."]
        BtnSearch["🔎 Nút Tìm kiếm"]
        BtnAdd["➕ Nút: Thêm mã lỗi mới (Add Error Code)"]
    end

    TopBar --> RBACCheckTop{"Kiểm tra quyền: Admin / Manager?"}
    RBACCheckTop -->|Có quyền| BtnAddActive["Nút Thêm kích hoạt bình thường"]
    RBACCheckTop -->|Không có quyền| BtnAddDisabled["Nút Thêm bị DISABLE (Opacity mờ, cấm click, Tooltip)"]

    TopBar --> TableContainer["Bảng Dữ Liệu Mã Lỗi MES (4 Cột)"]

    subgraph TableContainer["Bảng Danh Mục Mã Lỗi (MesErrorCodeTable)"]
        ColIndex["# (STT)"]
        ColErrorCode["Error Code [Clickable Link/Badge]"]
        ColOwner["Owner [Badge Bộ Phận]"]
        ColMessageEn["Message (EN) [Nội dung tiếng Anh]"]
    end

    ColErrorCode -->|Click chuột trái vào Error Code| DetailModal["Modal: Xem Chi Tiết Mã Lỗi (Detail Modal)"]
    subgraph DetailModal["Khung Chi Tiết Mã Lỗi"]
        DetailOwner["Bộ phận phụ trách: PE / TE / ME / QA / MES"]
        DetailMsgEN["Thông báo tiếng Anh (Message EN)"]
        DetailMsgVI["Thông báo tiếng Việt (Message VI)"]
        DetailSOP["Hướng dẫn xử lý & Khắc phục (Troubleshooting SOP)"]
    end

    TableContainer -->|Chuột phải vào 1 dòng lỗi (onContextMenu)| ContextMenu["Menu Ngữ Cảnh Chuột Phải (Custom Context Menu)"]

    subgraph ContextMenu["Menu Ngữ Cảnh Nổi Tại Con Trỏ Chuột"]
        MenuEdit["✏️ Sửa (Edit Error Code)"]
        MenuDelete["🗑️ Xóa (Delete Error Code)"]
    end

    ContextMenu --> RBACCheckContext{"Kiểm tra quyền: Admin / Manager?"}
    RBACCheckContext -->|Có quyền| MenuActionsActive["Cho phép click Sửa / Xóa -> Mở Modal tương ứng"]
    RBACCheckContext -->|Không có quyền| MenuActionsDisabled["DISABLE cả Sửa & Xóa (Chữ xám, cấm click, Tooltip phân quyền)"]

    MenuActionsActive -->|Chọn Sửa| EditModal["Modal: Cập Nhật Mã Lỗi MES"]
    MenuActionsActive -->|Chọn Xóa| DeleteModal["Modal: Xác Nhận Xóa Mã Lỗi"]
    BtnAddActive -->|Click Thêm| AddModal["Modal: Thêm Mới Mã Lỗi MES"]

    TableContainer --> SharedPagination["Thành Phần Phân Trang Dùng Chung (src/components/common/Pagination.jsx)"]
```

---

### 2.2. Bản Vẽ Giao Diện Chi Tiết (ASCII Wireframe)

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ CONFIG / MES ERROR CODE LIST                                                                          [⛶ Fullscreen]   │
│ MES ERROR CODE MASTER CATALOG                                                            [Badge: SHOPFLOOR DICTIONARY] │
│ Quản lý danh mục mã lỗi MES, phân loại bộ phận phụ trách, thông báo song ngữ và quy trình khắc phục sự cố tiêu chuẩn   │
├────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ [THANH CÔNG CỤ TÌM KIẾM & NÚT THÊM MỚI]                                                                                │
│ ┌───────────────────────────────────────────────────────────────────────────┬──────────────┐  ┌──────────────────────┐ │
│ │ 🔍 Nhập mã lỗi (ERR_...) hoặc nội dung thông báo tiếng Anh, tiếng Việt...  │ [🔎 Tìm kiếm]│  │ [➕ Thêm mã lỗi]     │ │
│ └───────────────────────────────────────────────────────────────────────────┴──────────────┘  └──────────────────────┘ │
│                                                                                               (Disabled nếu !Admin)    │
│ [BẢNG DỮ LIỆU MÃ LỖI MES: 4 CỘT CHUẨN HÓA]                                                                            │
│ ┌──────┬───────────────────────────────┬────────────────────────────┬────────────────────────────────────────────────┐ │
│ │  #   │ ERROR CODE                    │ OWNER                      │ MESSAGE (EN)                                   │ │
│ ├──────┼───────────────────────────────┼────────────────────────────┼────────────────────────────────────────────────┤ │
│ │  1   │ [ERR_SFC_CARRIER_LOCKED] 🔍   │ [PE / Process Eng]         │ Carrier is locked due to inspection expiry     │ │
│ │  2   │ [ERR_AOI_SOLDER_BRIDGE]  🔍   │ [TE / Test Eng]            │ Solder bridge detected across BGA pins         │ │
│ │  3   │ [ERR_TORQUE_OVER_LIMIT]  🔍   │ [ME / Automation]          │ Spindle torque exceeded maximum safety limit   │ │
│ │  4   │ [ERR_BARCODE_2D_MISMATCH]🔍   │ [IT / MES Team]            │ 2D Matrix code does not match work order SN    │ │
│ │  5   │ [ERR_TEST_VOLTAGE_DROP]  🔍   │ [QA / Quality]   ┌─────────┴────────────────────┐                           │ │
│ │      │                               │                  │ 🖱️ MENU CHUỘT PHẢI (CONTEXT)   │                           │ │
│ │      │                               │                  │ ┌──────────────────────────┐ │                           │ │
│ │      │                               │                  │ │ ✏️ Sửa mã lỗi            │ │ (Disabled nếu !Admin)      │ │
│ │      │                               │                  │ │ 🗑️ Xóa mã lỗi            │ │ (Disabled nếu !Admin)      │ │
│ │      │                               │                  │ └──────────────────────────┘ │                           │ │
│ └──────┴───────────────────────────────┴──────────────────┴──────────────────────────────┴───────────────────────────┘ │
│                                                                                                                        │
│ [PHÂN TRANG DÙNG CHUNG: src/components/common/Pagination.jsx]                                                          │
│ ┌────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐ │
│ │ Hiển thị 1 - 10 trong tổng số 45 bản ghi  | Số dòng: [10 ▾]             ⏮ Đầu  ◀ Trước  [1] 2 3 ... 5  Sau ▶  Cuối ⏭ │ │
│ └────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ [MODAL: CHI TIẾT MÃ LỖI - MES ERROR CODE DETAIL]                                                                   [✕] │
├────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ MÃ LỖI: ERR_AOI_SOLDER_BRIDGE                          MỨC ĐỘ: CRITICAL              TRẠNG THÁI: ACTIVE                │
│                                                                                                                        │
│ 🏢 BỘ PHẬN PHỤ TRÁCH (OWNER):                                                                                         │
│    TE / Test Engineering - Dây chuyền SMT Line 3 (PIC: Nguyen Van A - Ext: 8124)                                       │
│                                                                                                                        │
│ 🌐 THÔNG BÁO TIẾNG ANH (MESSAGE EN):                                                                                   │
│    "Solder bridge defect detected across adjacent pins on U12 BGA package. Interlock signal sent to conveyor."         │
│                                                                                                                        │
│ 🇻🇳 THÔNG BÁO TIẾNG VIỆT (MESSAGE VI):                                                                                  │
│    "Phát hiện lỗi cầu chì thiếc dính chập giữa các chân linh kiện chip BGA U12. Hệ thống đã kích hoạt khóa chuyền."     │
│                                                                                                                        │
│ 🛠️ HƯỚNG DẪN XỬ LÝ & KHẮC PHỤC (TROUBLESHOOTING SOP):                                                                  │
│    1. Chuyển bo mạch sang kính hiển vi quang học trạm sửa chữa (Rework Station).                                      │
│    2. Sử dụng mỏ hàn nhiệt độ 350°C kết hợp dây hút thiếc chuyên dụng loại bỏ hoàn toàn bavia chì dính.                │
│    3. Làm sạch bề mặt bằng dung môi cồn Isopropyl Alcohol (IPA 99%).                                                   │
│    4. Quét lại kiểm tra trên kính phóng đại 20x và bấm xác nhận giải phóng mã lỗi trên giao diện trạm.                 │
│                                                                                                                        │
│ ℹ️ THÔNG TIN BỔ SUNG:                                                                                                  │
│    Trạm áp dụng: AOI_01, AOI_02 | Ngày tạo: 10/11/2026 | Người cập nhật gần nhất: admin_mes                           │
│                                                                                                                        │
│                                                                                                          [ Đóng ]      │
└────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. ĐẶC TẢ CHI TIẾT TỪNG THÀNH PHẦN GIAO DIỆN

### 3.1. Thanh công cụ trên cùng (`MesErrorFilterBar.jsx`)
- **Vị trí**: Nằm ngay bên dưới `PageHeaderBar`, trên đầu bảng danh sách.
- **Thành phần**:
  1. **Ô nhập tìm kiếm tích hợp**:
     - Cho phép tìm kiếm song song: **Mã lỗi** (`errorCode`) hoặc **Nội dung thông báo** (`messageEn`, `messageVi`).
     - Placeholder: `"Tìm kiếm theo mã lỗi (ERR_...), nội dung tiếng Anh hoặc tiếng Việt..."`.
     - Phím tắt / Sự kiện: Tìm kiếm theo thời gian thực (debounce 250ms) hoặc khi nhấn nút **Tìm kiếm** / bấm phím **Enter**.
     - Nút xóa nhanh nội dung tìm kiếm (✕) khi ô có ký tự.
  2. **Nút Tìm kiếm (`Search Button`)**: Nút nhấn bổ trợ cạnh ô tìm kiếm.
  3. **Nút Thêm mã lỗi (`+ Thêm mới / Add Error Code`)**:
     - **Khi có quyền Admin / Manager**: Nút ở trạng thái kích hoạt, màu sắc theo brand (Foxconn Navy Blue / NVIDIA Neon Green), click mở modal `AddEditMesErrorModal`.
     - **Khi KHÔNG có quyền**: 
       - Thêm thuộc tính `disabled={!hasPermission}`.
       - Áp dụng class: `opacity-40 cursor-not-allowed pointer-events-auto bg-slate-300 dark:bg-zinc-800 text-slate-500`.
       - Hiển thị Tooltip khi hover: `"Tính năng chỉ dành cho quản trị viên (Admin) hoặc Trưởng bộ phận (Manager)"`.

### 3.2. Bảng dữ liệu mã lỗi (`MesErrorCodeTable.jsx`)
- **Các cột dữ liệu hiển thị**:
  1. **`#` (STT)**: Số thứ tự tăng dần theo trang (`(currentPage - 1) * pageSize + index + 1`).
  2. **`Error Code` (Mã lỗi)**:
     - Hiển thị font chữ monospace đậm (`font-mono font-bold`).
     - Trình bày dạng liên kết tương tác kèm icon phóng to / kính lúp 🔍.
     - Khi rê chuột (hover): Đổi màu, gạch chân nhẹ.
     - **Khi click chuột trái**: Mở modal xem chi tiết `MesErrorDetailModal` của mã lỗi đó.
  3. **`Owner` (Bộ phận phụ trách)**:
     - Hiển thị dạng Badge màu phân loại theo phòng ban:
       - `PE` (Process Engineering): Xanh da trời (Blue).
       - `TE` (Test Engineering): Tím (Purple / Indigo).
       - `ME` (Mechanical / Automation): Hổ phách / Cam (Amber / Orange).
       - `QA` (Quality Assurance): Xanh ngọc lục bảo (Emerald / Green).
       - `MES / IT`: Đỏ hồng (Rose / Red).
  4. **`Message (EN)` (Thông báo tiếng Anh)**:
     - Nội dung thông báo lỗi bằng tiếng Anh chuẩn hệ thống MES.
     - Tự động cắt gọn nếu quá dài (`line-clamp-2` hoặc `truncate`) kèm tooltip toàn văn khi hover.
- **Tương tác dòng (Row Interactivity)**:
  - Hiệu ứng hover nổi bật từng dòng.
  - Sự kiện click chuột trái vào dòng: Có thể làm nổi bật dòng (active highlight).
  - **Sự kiện click chuột phải (`onContextMenu`)**:
    - Ngăn chặn menu mặc định của trình duyệt (`e.preventDefault()`).
    - Lấy tọa độ trỏ chuột `e.clientX`, `e.clientY`.
    - Đặt mã lỗi hiện tại vào state `selectedRowForContext`.
    - Mở menu ngữ cảnh `MesErrorContextMenu`.

### 3.3. Menu ngữ cảnh chuột phải (`MesErrorContextMenu.jsx`)
- **Cơ chế hiển thị**:
  - Render nổi trên toàn bộ giao diện thông qua React Portal (`document.body`) hoặc absolute positioning với `z-index: 9999`.
  - Tự động phát hiện va chạm mép màn hình (**Viewport Collision Detection**): Nếu click quá gần cạnh dưới hoặc cạnh phải màn hình, menu tự động nảy lên trên hoặc dịch sang trái để không bị tràn màn hình.
- **Các mục tùy chọn (Options)**:
  1. ✏️ **Sửa (Edit Error Code)**:
     - Icon: Bút chì hoặc Edit icon.
     - Hành động: Mở modal cập nhật mã lỗi `AddEditMesErrorModal` với mode `'edit'`.
     - Phân quyền: Nếu không phải Admin/Manager -> Disabled (màu xám nhạt, cursor `not-allowed`, tooltip cảnh báo quyền hạn).
  2. 🗑️ **Xóa (Delete Error Code)**:
     - Icon: Thùng rác hoặc Delete icon màu đỏ/hồng.
     - Hành động: Mở modal xác nhận xóa an toàn `DeleteMesErrorConfirmModal`.
     - Phân quyền: Nếu không phải Admin/Manager -> Disabled (màu xám nhạt, cursor `not-allowed`, tooltip cảnh báo quyền hạn).
- **Hành vi đóng menu**:
  - Đóng khi người dùng click chuột trái vào bất cứ đâu bên ngoài.
  - Đóng khi người dùng cuộn chuột (scroll).
  - Đóng khi người dùng nhấn phím `Escape`.
  - Đóng sau khi người dùng bấm chọn một tác vụ được phép.

### 3.4. Modal Xem Chi Tiết Mã Lỗi (`MesErrorDetailModal.jsx`)
- Kích hoạt khi: Nhấp chuột trái vào cột `Error Code`.
- **Nội dung hiển thị chi tiết**:
  - **Header**: Tiêu đề `"CHI TIẾT MÃ LỖI MES"`, mã lỗi nổi bật kèm badge độ nghiêm trọng (Critical / Major / Minor / Warning).
  - **Khối 1: Bộ phận phụ trách (`Owner`)**: Tên phòng ban, tên kỹ sư đầu mối (PIC) và số máy nhánh.
  - **Khối 2: Thông báo tiếng Anh (`Message EN`)**: Văn bản tiếng Anh chuẩn hóa từ máy kiểm tra.
  - **Khối 3: Thông báo tiếng Việt (`Message VI`)**: Dịch nghĩa rõ ràng sang tiếng Việt hỗ trợ công nhân vận hành.
  - **Khối 4: Hướng dẫn xử lý sự cố (`Troubleshooting Guide / Action SOP`)**:
    - Quy trình từng bước (Step 1, Step 2, Step 3...) để kiểm tra và xử lý lỗi.
    - Dụng cụ / thiết bị cần thiết (Dây hút thiếc, kính lúp, cồn IPA, máy cân lực...).
    - Điều kiện để hoàn tất giải phóng lỗi trên chuyền.
  - **Khối 5: Metadata hệ thống**: Trạm áp dụng (SMT, Test, AOI...), thời gian tạo, người sửa đổi gần nhất.
  - **Footer**: Nút "Đóng" (Close) và nút "Sửa lỗi này" (nếu có quyền Admin/Manager).

### 3.5. Modal Thêm Mới / Chỉnh Sửa Mã Lỗi (`AddEditMesErrorModal.jsx`)
- Dùng chung cho cả 2 thao tác: Thêm mới (`mode = 'add'`) và Sửa (`mode = 'edit'`).
- **Các trường nhập liệu**:
  1. `errorCode` (Mã lỗi): Input text in hoa, tự động validate định dạng (ví dụ: `ERR_[PHÂN_HỆ]_[TÊN_LỖI]`). Khóa không cho sửa mã khi ở mode `'edit'`.
  2. `owner` (Bộ phận phụ trách): Select chọn các bộ phận: PE, TE, ME, QA, MES/IT hoặc nhập tùy biến.
  3. `severity` (Mức độ nghiêm trọng): Select Critical / Major / Minor / Warning.
  4. `messageEn` (Thông báo tiếng Anh): Textarea bắt buộc.
  5. `messageVi` (Thông báo tiếng Việt): Textarea bắt buộc.
  6. `troubleshootingGuide` (Hướng dẫn xử lý): Textarea mô tả chi tiết các bước khắc phục sự cố.
  7. `applicableStations` (Trạm áp dụng): Tag list hoặc checkbox chọn các trạm liên quan.
- **Validation**:
  - Mã lỗi không được để trống và không được trùng với mã đã tồn tại.
  - Message EN & VI không được để trống.
  - Hướng dẫn xử lý tối thiểu 10 ký tự.

### 3.6. Modal Xác Nhận Xóa Mã Lỗi (`DeleteMesErrorConfirmModal.jsx`)
- Cảnh báo an toàn: Mã lỗi MES có thể đang được các máy tự động và trạm SFC liên kết kiểm tra.
- Hiển thị tóm tắt mã lỗi sắp xóa: Mã lỗi, Bộ phận phụ trách, Thông báo EN.
- Nút bấm: "Hủy bỏ" (Cancel) và "Xác nhận xóa" (Confirm Delete - màu đỏ báo động).

### 3.7. Thành phần phân trang dùng chung (`Pagination.jsx`)
- Tích hợp trực tiếp component [`src/components/common/Pagination.jsx`](file:///d:/EnterpriseProjectFrontend/enterprise-project-frontend/src/components/common/Pagination.jsx):
  - Hiển thị số bản ghi: `"Hiển thị X - Y trong tổng số Z mã lỗi"`.
  - Bộ chọn số dòng trên trang: `[10, 20, 50, 100]` dòng/trang.
  - Nút chuyển trang có ellipsis thông minh (`...`), nút đầu/cuối trang.
  - Đồng bộ trạng thái khi lọc tìm kiếm (tự động reset về trang 1 khi từ khóa tìm kiếm thay đổi).

---

## 4. CHI TIẾT CƠ CHẾ PHÂN QUYỀN (RBAC SPECIFICATION)

### 4.1. Quy tắc phân quyền nghiệp vụ

| Hành động | Quyền `admin` | Quyền `manager` | Các quyền khác (`operator`, `technician`, `user`, `guest`...) |
|---|:---:|:---:|:---:|
| **Xem danh sách mã lỗi** | ✅ Cho phép | ✅ Cho phép | ✅ Cho phép |
| **Tìm kiếm theo mã & nội dung** | ✅ Cho phép | ✅ Cho phép | ✅ Cho phép |
| **Xem chi tiết mã lỗi (Detail Modal)** | ✅ Cho phép | ✅ Cho phép | ✅ Cho phép |
| **Thêm mã lỗi mới (Nút trên Top Bar)** | ✅ Kích hoạt | ✅ Kích hoạt | 🚫 **DISABLE** (Mờ, cấm click, Tooltip quyền) |
| **Sửa mã lỗi (Menu chuột phải)** | ✅ Kích hoạt | ✅ Kích hoạt | 🚫 **DISABLE** (Mờ, cấm click, Tooltip quyền) |
| **Xóa mã lỗi (Menu chuột phải)** | ✅ Kích hoạt | ✅ Kích hoạt | 🚫 **DISABLE** (Mờ, cấm click, Tooltip quyền) |

### 4.2. Logic Code Kiểm Tra Quyền Hạn
```javascript
// Lấy thông tin user hiện tại từ Redux store hoặc localStorage dự phòng
const auth = useSelector((state) => state.auth);
const savedAuth = (() => {
  try {
    const stored = localStorage.getItem('auth');
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
})();

// Trích xuất danh sách roles
const userRoles = auth?.roles || savedAuth?.roles || (auth?.role ? [auth.role] : []);

// Kiểm tra quyền Admin hoặc Manager (không phân biệt hoa thường)
const canModify = userRoles.some((role) =>
  ['admin', 'manager'].includes(String(role).trim().toLowerCase())
);
```

### 4.3. Thanh Chuyển Đổi Quyền Nhanh Để Kiểm Thử (Dev Role Switcher Bar)
- Để phục vụ đội ngũ phát triển và QA/Tester kiểm tra trực tiếp tính năng disable mà không cần đăng xuất/đăng nhập lại nhiều tài khoản:
  - Bổ sung một thanh chuyển đổi vai trò nhanh trên giao diện (chỉ hiển thị ở chế độ phát triển):
    - Các nút: `[Vai trò: Admin]`, `[Vai trò: Manager]`, `[Vai trò: Operator / Chỉ xem]`.
    - Khi bấm chọn role nào, toàn bộ giao diện (Nút Thêm, Menu chuột phải) tự động phản hồi ngay lập tức để người dùng kiểm thử trực quan.

---

## 5. THIẾT KẾ DỮ LIỆU MẪU (REALISTIC MOCK DATASET)

Danh sách 20 mã lỗi MES thực tế mô phỏng môi trường sản xuất máy chủ AI cao cấp của FII / NVIDIA:

```javascript
export const INITIAL_MES_ERROR_CODES = [
  {
    id: 'ERR-001',
    errorCode: 'ERR_SFC_CARRIER_LOCKED',
    owner: 'PE',
    severity: 'Critical',
    applicableStations: ['ALL_STATIONS', 'SMT_INLET', 'TEST_ROUTER'],
    messageEn: 'Carrier is currently locked in SFC. Routine inspection required before line feeding.',
    messageVi: 'Khay chứa (Carrier) đang bị khóa trên SFC. Yêu cầu kiểm định định kỳ trước khi vào chuyền.',
    troubleshootingGuide: `1. Kiểm tra mã vạch RFID trên thân khay chứa.
2. Mở màn hình Unlock Carrier (/config/unlock-carrier).
3. Thực hiện kiểm định chu kỳ và bấm xác nhận mở khóa khay.
4. Quét lại khay qua cổng đọc trạm nạp liệu.`,
    updatedAt: '2026-11-12 14:30:00',
    updatedBy: 'admin_pe'
  },
  {
    id: 'ERR-002',
    errorCode: 'ERR_AOI_SOLDER_BRIDGE',
    owner: 'TE',
    severity: 'Critical',
    applicableStations: ['AOI_STATION_01', 'AOI_STATION_02'],
    messageEn: 'Solder bridging detected between adjacent pins on GPU high-density connector.',
    messageVi: 'Phát hiện cầu hàn thiếc dính chập giữa các chân pin của cổng kết nối GPU mật độ cao.',
    troubleshootingGuide: `1. Chuyển bo mạch sang trạm sửa chữa thủ công (Rework Station).
2. Dùng kính hiển vi 20x soi xác định vị trí chân pin chập thiếc.
3. Sử dụng mỏ hàn chuyên dụng và dây hút thiếc để loại bỏ bavia hàn thừa.
4. Vệ sinh lại bằng dung dịch cồn IPA 99% và quét chạy lại AOI.`,
    updatedAt: '2026-11-12 15:10:00',
    updatedBy: 'tech_te'
  },
  {
    id: 'ERR-003',
    errorCode: 'ERR_TORQUE_OVER_LIMIT',
    owner: 'ME',
    severity: 'Major',
    applicableStations: ['SCREW_AUTO_01', 'SCREW_AUTO_02'],
    messageEn: 'Electric screwdriver torque exceeded upper safety tolerance limit (Target: 4.5Nm, Measured: 5.8Nm).',
    messageVi: 'Lực siết của tuốc-nơ-vít tự động vượt quá giới hạn an toàn (Mục tiêu: 4.5Nm, Thực tế: 5.8Nm).',
    troubleshootingGuide: `1. Dừng trạm siết vít tự động.
2. Kiểm tra cảm biến tải lực (Load Cell / Torque Transducer).
3. Dùng thiết bị cân lực cầm tay chuẩn hóa lại thông số trục vặn vít.
4. Kiểm tra ren ốc có bị nghiêng hoặc kẹt dị vật hay không.`,
    updatedAt: '2026-11-11 09:25:00',
    updatedBy: 'engineer_me'
  },
  {
    id: 'ERR-004',
    errorCode: 'ERR_BARCODE_2D_MISMATCH',
    owner: 'MES/IT',
    severity: 'Major',
    applicableStations: ['LASER_MARKING', 'LABEL_FEEDER', 'STATION_01'],
    messageEn: '2D Datamatrix barcode scan content does not match SFC production order routing rule.',
    messageVi: 'Nội dung quét mã ma trận 2D không khớp với quy tắc định tuyến của lệnh sản xuất trên SFC.',
    troubleshootingGuide: `1. Kiểm tra máy quét mã vạch 2D Keyence (ống kính có bị mờ hoặc bám bụi không).
2. Đối soát Serial Number trên hệ thống SAP/MES xem phôi có đi sai công đoạn không.
3. Nếu tem mờ, tiến hành dán lại tem phụ theo quy trình bù tem (Alabel).`,
    updatedAt: '2026-11-10 16:40:00',
    updatedBy: 'mes_admin'
  },
  {
    id: 'ERR-005',
    errorCode: 'ERR_PRESSFIT_FORCE_LOW',
    owner: 'ME',
    severity: 'Critical',
    applicableStations: ['PRESSFIT_MACHINE_01'],
    messageEn: 'Press-fit insertion force below minimum threshold. Pin might be bent or hole enlarged.',
    messageVi: 'Lực ép linh kiện Press-fit thấp hơn ngưỡng tối thiểu. Chân cắm có thể bị cong hoặc lỗ PCB bị loãng.',
    troubleshootingGuide: `1. Lấy sản phẩm ra kiểm tra chân connector dưới kính lúp.
2. Đo đường kính lỗ mạ xuyên bo (PTH) bằng dưỡng kiểm tra tiêu chuẩn.
3. Hiệu chuẩn lại đầu ép xi-lanh servo của máy Pressfit.`,
    updatedAt: '2026-11-12 11:15:00',
    updatedBy: 'engineer_me'
  },
  {
    id: 'ERR-006',
    errorCode: 'ERR_QA_VISUAL_SCRATCH',
    owner: 'QA',
    severity: 'Minor',
    applicableStations: ['OQC_INSPECTION', 'PACKING_LINE'],
    messageEn: 'Surface scratch detected on server chassis outer cosmetic cover exceeding A-grade criteria.',
    messageVi: 'Phát hiện vết xước trên bề mặt vỏ máy chủ vượt quá tiêu chuẩn thẩm mỹ cấp độ A.',
    troubleshootingGuide: `1. Đánh giá độ sâu và chiều dài vết xước theo thước đo chuẩn OQC.
2. Phân loại sản phẩm vào khu vực cách ly chờ xử lý sơn tĩnh điện lại hoặc thay vỏ.
3. Ký biên bản phế phẩm chất lượng (NCR).`,
    updatedAt: '2026-11-09 10:00:00',
    updatedBy: 'qa_lead'
  },
  {
    id: 'ERR-007',
    errorCode: 'ERR_TEST_VOLTAGE_DROP',
    owner: 'TE',
    severity: 'Critical',
    applicableStations: ['ICT_TESTER', 'FUNCTIONAL_TEST_01'],
    messageEn: 'Voltage drop across 12V auxiliary power rail exceeds 5% nominal threshold during stress testing.',
    messageVi: 'Sụt áp trên đường nguồn phụ 12V vượt quá 5% ngưỡng danh định trong bài kiểm tra tải nặng.',
    troubleshootingGuide: `1. Kiểm tra cáp nguồn cấp từ bộ nguồn phụ trạm thử nghiệm.
2. Đo điện trở tiếp xúc của fixture chân kim tiếp xúc ICT.
3. Thay thế đầu cắm tiếp xúc nếu xuất hiện muội than hoặc lỏng lẻo.`,
    updatedAt: '2026-11-11 17:30:00',
    updatedBy: 'tech_te'
  },
  {
    id: 'ERR-008',
    errorCode: 'ERR_SFC_KEYPART_DUPLICATE',
    owner: 'MES/IT',
    severity: 'Major',
    applicableStations: ['ASSEMBLY_KEYPART_SCAN'],
    messageEn: 'Scanned keypart serial number has already been bound to another parent assembly unit.',
    messageVi: 'Mã linh kiện trọng yếu (Keypart) vừa quét đã được liên kết với một máy thành phẩm khác.',
    troubleshootingGuide: `1. Kiểm tra lịch sử lắp ráp linh kiện trên màn hình Automation Line Control (Tab SFC).
2. Thực hiện thao tác Undo Link nếu linh kiện bị gán nhầm.
3. Liên hệ giám sát chuyền để xác nhận tính hợp lệ của linh kiện thực tế.`,
    updatedAt: '2026-11-12 08:45:00',
    updatedBy: 'mes_admin'
  }
];
```

---

## 6. THIẾT KẾ THÀNH PHẦN & CẤU TRÚC THƯ MỤC

### 6.1. Cấu Trúc File Đề Xuất
```text
src/
├── features/
│   └── config/
│       └── mes_error_code/
│           ├── MesErrorCodeListPage.jsx               # Màn hình chính
│           ├── components/
│           │   ├── MesErrorFilterBar.jsx              # Thanh tìm kiếm + Nút thêm mới (RBAC check)
│           │   ├── MesErrorCodeTable.jsx              # Bảng dữ liệu 4 cột + Chuột phải ContextMenu
│           │   ├── MesErrorContextMenu.jsx            # Thực đơn nổi ngữ cảnh chuột phải (Sửa, Xóa)
│           │   └── modals/
│           │       ├── MesErrorDetailModal.jsx        # Modal xem chi tiết (Owner, EN, VI, SOP)
│           │       ├── AddEditMesErrorModal.jsx       # Modal thêm mới / sửa mã lỗi
│           │       └── DeleteMesErrorConfirmModal.jsx # Modal xác nhận xóa mã lỗi
│           ├── hooks/
│           │   └── useMesErrorCodeData.js             # Hook quản lý state, search, filter, pagination, context menu, RBAC
│           ├── constants/
│           │   └── mesErrorCodeConstants.js           # Bộ constants: Phòng ban, mức độ nghiêm trọng, badge colors
│           └── mock/
│               └── mesErrorCodeMockData.js            # Dữ liệu 20+ mã lỗi MES mẫu chi tiết
├── components/
│   └── common/
│       └── Pagination.jsx                             # Tái sử dụng Pagination chuẩn của dự án
```

### 6.2. Thiết Kế Hook Quản Lý Dữ Liệu (`useMesErrorCodeData.js`)
Hook này tập trung toàn bộ logic nghiệp vụ:
- **Quản lý danh sách lỗi**: State `errorCodes`, khởi tạo từ `INITIAL_MES_ERROR_CODES`, lưu trữ vào `localStorage` để các thao tác Thêm/Sửa/Xóa tồn tại xuyên suốt phiên làm việc.
- **Tìm kiếm & Lọc**: State `searchTerm`, hàm `handleSearchChange`. Tự động lọc theo cả `errorCode` và `messageEn` / `messageVi`.
- **Phân trang**: State `currentPage`, `pageSize`. Tự động tính toán `paginatedErrorCodes`, `totalRecords`, `totalPages`. Tự động quay về trang 1 khi từ khóa tìm kiếm thay đổi.
- **Quản lý Menu chuột phải (Context Menu)**:
  - State: `contextMenu: { visible: false, x: 0, y: 0, item: null }`.
  - Hàm `handleContextMenu(e, item)`: Ngăn menu mặc định của browser, tính toán tọa độ (x, y), mở menu ngữ cảnh.
  - Hàm `handleCloseContextMenu()`: Đóng menu khi click ngoài hoặc bấm Esc.
- **Quản lý Modal**:
  - `selectedDetailItem`, `isDetailOpen`, `openDetail(item)`, `closeDetail()`.
  - `selectedEditItem`, `isAddEditOpen`, `openAdd()`, `openEdit(item)`, `closeAddEdit()`.
  - `selectedDeleteItem`, `isDeleteOpen`, `openDelete(item)`, `closeDelete()`.
- **Hành động nghiệp vụ (CRUD Actions)**:
  - `handleSaveErrorCode(formData)`: Thêm mới hoặc cập nhật mã lỗi, hiển thị Toast thông báo.
  - `handleConfirmDelete(id)`: Xóa mã lỗi khỏi danh sách, hiển thị Toast thành công.
- **Quản lý phân quyền (RBAC)**:
  - Trích xuất role từ Redux `auth.roles` và localStorage.
  - Cung cấp cờ `canModify` (true nếu là Admin hoặc Manager, false nếu là vai trò khác).
  - Cung cấp `mockRole` và `setMockRole` cho phép QA/Dev test trực tiếp cả 2 trường hợp có quyền và không có quyền.

---

## 7. ĐẶC TẢ GIAO DIỆN NHẬN DIỆN THƯƠNG HIỆU KÉP (DUAL-THEME)

Trang đáp ứng hoàn hảo 2 theme thiết kế của hệ thống:

| Thành phần UI | Chế độ Foxconn (`brand === 'foxconn'`) | Chế độ NVIDIA (`brand === 'nvidia'`) |
|---|---|---|
| **Nền trang chính** | `bg-slate-50 text-slate-800` | `bg-zinc-950 text-zinc-100` |
| **Card / Khung bảng** | `bg-white border-slate-200/90 shadow-sm` | `bg-zinc-900/80 border-zinc-800 shadow-xl backdrop-blur-md` |
| **Header bảng** | `bg-slate-100/90 text-slate-700 border-slate-200` | `bg-zinc-950 text-zinc-300 border-zinc-800` |
| **Hàng dữ liệu (Row hover)** | `hover:bg-blue-50/50 transition-colors` | `hover:bg-zinc-800/60 transition-colors` |
| **Mã lỗi (Error Code link)** | `text-blue-600 hover:text-blue-800 font-mono font-bold` | `text-[#76B900] hover:text-[#95d624] font-mono font-bold drop-shadow-xs` |
| **Nút Thêm mới (Active)** | `bg-blue-600 hover:bg-blue-700 text-white shadow-xs` | `bg-[#76B900] hover:bg-[#85c90d] text-black font-extrabold shadow-sm` |
| **Nút Thêm mới (Disabled)** | `bg-slate-200 text-slate-400 cursor-not-allowed` | `bg-zinc-800 text-zinc-600 cursor-not-allowed border-zinc-700` |
| **Context Menu chuột phải** | `bg-white border-slate-200 shadow-2xl text-slate-700` | `bg-zinc-900 border-zinc-700 shadow-2xl text-zinc-200` |
| **Mục Sửa/Xóa Disabled** | `text-slate-300 hover:bg-transparent cursor-not-allowed` | `text-zinc-600 hover:bg-transparent cursor-not-allowed` |
| **Modal Chi tiết / Form** | `bg-white border-slate-200 text-slate-800` | `bg-zinc-900 border-zinc-800 text-zinc-100` |

---

## 8. KẾ HOẠCH TRIỂN KHAI THEO TỪNG GIAI ĐOẠN

### Giai đoạn 1: Chuẩn bị Dữ liệu & Hằng số (Constants & Mock Data)
- [ ] Tạo file `src/features/config/mes_error_code/constants/mesErrorCodeConstants.js`: Định nghĩa các badge bộ phận (PE, TE, ME, QA, MES/IT), mức độ nghiêm trọng, mẫu lỗi ban đầu.
- [ ] Tạo file `src/features/config/mes_error_code/mock/mesErrorCodeMockData.js`: Tạo 20 bản ghi mã lỗi MES thực tế kèm thông báo tiếng Anh, tiếng Việt và hướng dẫn xử lý chi tiết.

### Giai đoạn 2: Xây dựng Custom Hook Quản Lý State & RBAC
- [ ] Tạo file `src/features/config/mes_error_code/hooks/useMesErrorCodeData.js`:
  - Quản lý state dữ liệu và localStorage persistence.
  - Tìm kiếm thời gian thực theo mã lỗi và nội dung.
  - Điều khiển mở/đóng và định vị con trỏ chuột cho Context Menu.
  - Phân quyền: Đọc roles từ Redux `auth.roles`, tính toán cờ `canModify`, tích hợp bộ giả lập vai trò Dev Role Switcher.

### Giai đoạn 3: Phát Triển Các Component Giao Diện
- [ ] **Thanh công cụ Top Bar (`MesErrorFilterBar.jsx`)**: Ô tìm kiếm mã/nội dung kèm nút tìm kiếm; nút Thêm mới mã lỗi có kiểm tra quyền và hiển thị trạng thái disabled khi không đủ quyền.
- [ ] **Bảng dữ liệu mã lỗi (`MesErrorCodeTable.jsx`)**: Render 4 cột `#`, `Error Code`, `Owner`, `Message (EN)`; bắt sự kiện `onContextMenu` để mở context menu và `onClick` vào Error Code để mở modal chi tiết.
- [ ] **Thực đơn ngữ cảnh chuột phải (`MesErrorContextMenu.jsx`)**: Menu nổi tại tọa độ trỏ chuột, xử lý va chạm mép màn hình, 2 mục Sửa và Xóa có trạng thái disabled nếu không có quyền.
- [ ] **Modal xem chi tiết mã lỗi (`MesErrorDetailModal.jsx`)**: Hiển thị đầy đủ Owner, Message EN, Message VI, và Troubleshooting SOP từng bước.
- [ ] **Modal Thêm mới / Sửa mã lỗi (`AddEditMesErrorModal.jsx`)**: Form nhập liệu song ngữ kèm validation dữ liệu.
- [ ] **Modal Xác nhận xóa mã lỗi (`DeleteMesErrorConfirmModal.jsx`)**: Cảnh báo an toàn trước khi xóa bản ghi khỏi hệ thống.

### Giai đoạn 4: Tích Hợp Phân Trang & Menu Hệ Thống
- [ ] Tích hợp component phân trang dùng chung `<Pagination />` từ `src/components/common/Pagination.jsx`.
- [ ] Cập nhật tệp menu hệ thống `src/utils/Menu.jsx`: Bổ sung menu item **MES ERROR CODE LIST** (`/config/mes-error-code`) vào nhóm **CONFIG**.
- [ ] Cập nhật file định tuyến `src/routes/routesConfig.jsx`: Khai báo lazy loading route `/config/mes-error-code` trỏ tới `MesErrorCodeListPage`.

### Giai đoạn 5: Kiểm Thử Toàn Diện & Đồng Bộ Tài Liệu
- [ ] Kiểm thử tìm kiếm: Tìm theo mã lỗi (ví dụ: `ERR_SFC`), tìm theo từ khóa tiếng Anh (`torque`), tìm theo tiếng Việt (`cầu hàn`, `khay`).
- [ ] Kiểm thử xem chi tiết: Nhấn vào Error Code hiển thị đầy đủ thông tin tiếng Anh, tiếng Việt, SOP.
- [ ] Kiểm thử Context Menu chuột phải: Nhấp chuột phải hiển thị đúng vị trí trỏ chuột, không bị tràn màn hình, đóng khi click ngoài hoặc bấm Escape.
- [ ] Kiểm thử phân quyền RBAC:
  - Khi là `Admin` / `Manager`: Nút Thêm hoạt động, menu chuột phải Sửa & Xóa click được và mở đúng modal.
  - Khi là vai trò khác: Nút Thêm bị disable mờ, menu chuột phải Sửa & Xóa bị disable mờ và không thể click.
- [ ] Đồng bộ tệp kế hoạch giữa `src/md/MES_ERROR_CODE_LIST_PLAN.md` và `md/MES_ERROR_CODE_LIST_PLAN.md`.
- [ ] Chạy lệnh `npm run build` đảm bảo không có lỗi biên dịch.

---

## 9. KẾT LUẬN VÀ BƯỚC TIẾP THEO

Bản kế hoạch trên đã đặc tả chi tiết 100% các yêu cầu từ người dùng:
1. Giao diện trang **MES ERROR CODE LIST** chuẩn mực, hiện đại.
2. Top Bar có ô tìm kiếm theo mã lỗi + nội dung và nút Thêm mới.
3. Bảng dữ liệu 4 cột chuẩn hóa: `#`, `Error Code`, `Owner`, `Message (EN)`.
4. Nhấn vào mã lỗi hiển thị chi tiết: Bộ phận phụ trách, thông báo EN, VI, hướng dẫn xử lý SOP.
5. Menu chuột phải ngữ cảnh nổi ra gồm 2 lựa chọn Sửa và Xóa.
6. Cơ chế phân quyền RBAC: Chỉ `admin` và `manager` mới có quyền Thêm/Sửa/Xóa; các quyền khác bị disabled các tính năng này.
7. Tích hợp phân trang dùng chung `Pagination.jsx` tối ưu.

Sau khi người dùng xem xét và phê duyệt bản kế hoạch này, có thể tiến hành bước thực thi mã nguồn chi tiết theo các giai đoạn đã đề ra.

