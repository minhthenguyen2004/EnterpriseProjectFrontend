# KẾ HOẠCH TRIỂN KHAI GIAO DIỆN ĐIỀU KHIỂN CHUYỀN TỰ ĐỘNG (`/config/automation-line` - AUTOLINE CONTROL)

> **Tài liệu tham chiếu:** Thiết kế chi tiết kiến trúc giao diện, luồng dữ liệu và tích hợp giao thức SFC (Shop Floor Control) cho phân hệ **Điều Khiển Chuyền Tự Động** (Automation Line Control).  
> **Áp dụng cho route:** `/config/automation-line` (thuộc nhóm menu **CONFIG**).  
> **Component điều phối chính:** `src/features/config/automation_line_control/AutomationLineControlPage.jsx`.  
> **Mô hình kiến trúc cốt lõi:** **Tái Sử Dụng Giao Diện Đa Năng (Universal Reusable SFC Sender Architecture)** — Thiết kế một component khung dùng chung (`SfcSwitchAdapterSenderContainer.jsx` đặt tại `components/sfc_shared/`) cho cả 2 tab: **SFC Switch Helpers** và **SFC Adapter Helpers**, tham số hóa linh hoạt qua thuộc tính `mode = 'switch' | 'adapter'`. Tích hợp phân hệ **ALABEL_Helper** (thay thế AIOT Helpers) chuyên trách tra cứu tiến trình sản xuất và điều khiển tác vụ dây chuyền.  
> **Hỗ trợ giao diện kép:** Chuẩn công nghiệp Foxconn (Industrial Clean Blue) và Nhà máy AI NVIDIA (High Contrast Pure White / Emerald `#76B900`).  
> **Ngày cập nhật:** 04/11/2026 (Chuẩn hóa tên component thực thi chung `SfcSwitchAdapterSenderContainer.jsx` trong `components/sfc_shared/`; Triển khai hoàn chỉnh phân hệ ALABEL_Helper 7 sub-tabs).  
> **Vị trí tài liệu:** `md/AUTOLINE_CONTROL_PLAN.md` (đồng bộ tại `src/md/AUTOLINE_CONTROL_PLAN.md`).

---

## 1. TỔNG QUAN VÀ MỤC TIÊU KIẾN TRÚC TÁI SỬ DỤNG

Phân hệ **Điều Khiển Chuyền Tự Động (`/config/automation-line`)** đóng vai trò là trạm điều hành kỹ thuật trung tâm (Engineering Dispatch & SFC Control Console) cho dây chuyền sản xuất tự động hóa cao cấp trong nhà máy thông minh Foxconn / NVIDIA.

### 1.1. Mục Tiêu Tái Sử Dụng Giữa Tab Switch Helpers & Tab Adapter Helpers:

Trong quy trình vận hành nhà máy, hai giao thức **SFC Switch** (giao tiếp trực tiếp switch layer) và **SFC Adapter** (giao tiếp qua adapter middleware gateway) có cấu trúc dữ liệu, tiêu chí lọc, danh sách linh kiện và quy trình kiểm thử **hoàn toàn tương đồng 100%**, chỉ khác biệt ở:

1. **Tiền tố của các nút tác vụ điều phối:** `SWITCH_...` đối với Tab Switch Helpers, và `ADAPTER_...` đối với Tab Adapter Helpers.
2. **Nút bổ sung đặc thù của Adapter:** Tab Adapter có thêm nút **`ADAPTER_GetAccessTokenSFC`** ở đầu danh sách tác vụ để lấy mã xác thực (Bearer/Token) từ Adapter Gateway trước khi thực hiện các giao dịch kế tiếp.
3. **Endpoint & Mã lệnh tương ứng:** Các hành động gửi test result và hoàn tác liên kết được ánh xạ thành `Adapter_InsertTestResultSFC` và `ADAPTER_UndoLinkSFC`.

Nhờ kiến trúc **Universal Reusable Container**, toàn bộ giao diện bộ lọc 5 trường, bảng SFC Keyparts 7 cột, khung kiểm thử Pass/Fail, modal xác nhận Undo, và Terminal console giám sát giao dịch đều được **dùng lại 100% (Zero Code Duplication)** giữa 2 tab.

### 1.2. Chuẩn Hóa Cấu Trúc Thư Mục Giao Diện Chung: Tách Riêng `components/sfc_shared/`

- **Vấn đề của cấu trúc cũ (`components/sfc_switch/`):**
  Trước đây, toàn bộ giao diện chung được đặt trong thư mục mang tên `sfc_switch`. Tên gọi này gây hiểu nhầm nghiêm trọng: khi nhìn vào cấu trúc thư mục, lập trình viên dễ lầm tưởng các component này chỉ phục vụ cho riêng Tab 1 (SFC Switch), dẫn đến việc khó tìm kiếm các thành phần của SFC Adapter hoặc có thể code trùng lặp một giao diện Adapter riêng.
- **Giải pháp cấu trúc mới:**
  1. **Tạo phân khu dùng chung rõ ràng `components/sfc_shared/`:** Đổi tên và chuyển toàn bộ component tái sử dụng vào `src/features/config/automation_line_control/components/sfc_shared/`.
  2. **Trách nhiệm rõ ràng:** Thư mục này là nơi duy nhất tạo và đóng gói giao diện tương tác SFC (Thanh lọc, Bảng Keyparts, Cột điều phối tác vụ dọc, Terminal Console và Modal Undo) cho cả 2 tab Switch & Adapter thông qua component thực thi chung mang tên **`SfcSwitchAdapterSenderContainer.jsx`**.
  3. **Phân cấp kiến trúc trực quan:**
     - `components/tabs/`: Nơi điều phối các Tab cấp cao (`AutolineControlTabsNav.jsx`, `AlabelHelperTab.jsx`, `ActionLogsRestoreTab.jsx`).
     - `components/sfc_shared/`: Nơi tạo giao diện chung cho cả Tab Switch và Tab Adapter thông qua `<SfcSwitchAdapterSenderContainer mode="switch" | "adapter" />`.
     - `components/tabs/alabel/`: Nơi chứa các component chuyên biệt của Tab ALABEL Helper.

```mermaid
flowchart TD
    subgraph PageContainer["AutomationLineControlPage.jsx"]
        TabsNav["AutolineControlTabsNav.jsx (4 Tabs: Switch, Adapter, ALABEL Helper, Action Logs)"]

        subgraph UniversalContainer["components/sfc_shared/SfcSwitchAdapterSenderContainer.jsx\n(KHU VỰC GIAO DIỆN CHUNG CHO SWITCH & ADAPTER)"]
            FilterBar["1. SfcFilterBar.jsx (5 Trường: SN/Carrier, Dòng SP, Trạm, Host, IP)"]

            subgraph SplitLayout["2. Bố Cục Chia Tỉ Lệ 2 : 1"]
                subgraph LeftCol["Mục 2 (Tỉ lệ 2/3 - Cột Trái): keyparts_table/"]
                    KeypartsTable["SfcKeypartsTable.jsx\n(7 Cột: Chọn, Key Name, Key Value, Step, Cờ SFC, SFC Precheck, Bắt buộc)"]
                end

                subgraph RightCol["Mục 1 (Tỉ lệ 1/3 - Cột Phải): action_column/"]
                    ActionButtons["SfcActionDispatcherColumn.jsx (Bộ Nút Tác Vụ Dọc theo mode)"]
                    TestFrame["SfcTestResultFrame.jsx (Khung Kiểm Thử Pass / Fail)"]
                    UndoBtn["SfcUndoLinkButton.jsx (Nút Hoàn Tác theo mode)"]
                    Console["SfcTransactionConsole.jsx (Terminal Log Giao Dịch Gần Nhất)"]
                end
            end
        end
    end

    TabsNav -->|"Tab 1: mode='switch'"| UniversalContainer
    TabsNav -->|"Tab 2: mode='adapter'"| UniversalContainer
```

---

## 2. BẢNG SO SÁNH GIAO DIỆN GIỮA TAB SWITCH VÀ TAB ADAPTER

Dưới đây là bảng đối chiếu chi tiết các thành phần giữa 2 tab khi tái sử dụng giao diện chung:

| Thành phần / Tiêu chí             | Tab 1: SFC Switch Helpers (`mode='switch'`)                                        | Tab 2: SFC Adapter Helpers (`mode='adapter'`)                                      | Ghi chú kiến trúc                          |
| :-------------------------------- | :--------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------- | :----------------------------------------- |
| **Tiêu đề Khung chính**           | `SFC SWITCH KEYPART & ACTION SENDER`                                               | `SFC ADAPTER KEYPART & ACTION SENDER`                                              | Đổi nhãn động theo prop `mode`             |
| **Thanh lọc 5 trường ngang**      | Giống nhau 100% _(SN/Carrier, Dòng SP, Trạm, Host, Station IP)_                    | Giống nhau 100% _(SN/Carrier, Dòng SP, Trạm, Host, Station IP)_                    | Dùng chung `SfcFilterBar.jsx`              |
| **Bảng SFC Keyparts (Tỉ lệ 2/3)** | Giống nhau 100% _(7 cột: Chọn, Key Name, Key Value, Step, Cờ, Precheck, Bắt buộc)_ | Giống nhau 100% _(7 cột: Chọn, Key Name, Key Value, Step, Cờ, Precheck, Bắt buộc)_ | Dùng chung `SfcKeypartsTable.jsx`          |
| **Số lượng nút tác vụ dọc**       | **3 nút xếp dọc**                                                                  | **4 nút xếp dọc (Bổ sung nút Token)**                                              | Tự động render theo cấu hình mode          |
| **Nút 1 (Đặc thù)**               | _Không có_                                                                         | **`[🔑 ADAPTER_GetAccessTokenSFC]`**                                               | **Nút mới:** Lấy token xác thực từ Adapter |
| **Nút 2**                         | `[⚡ SWITCH_InsertSerialNumberSFC]`                                                | `[⚡ ADAPTER_InsertSerialNumberSFC]`                                               | Đăng ký SN vào trạm qua Adapter            |
| **Nút 3**                         | `[🔍 SWITCH_CheckSerialNumberSFC]`                                                 | `[🔍 ADAPTER_CheckSerialNumberSFC]`                                                | Kiểm tra Router SN qua Adapter             |
| **Nút 4**                         | `[🧩 SWITCH_CheckKeyPartsSFC(0)]`                                                  | `[🧩 ADAPTER_CheckKeyPartsSFC(0)]`                                                 | Kiểm tra Keyparts BOM qua Adapter          |
| **Khung kiểm thử - Hàng 1**       | Bộ đôi nút: `[Pass]` và `[Fail]`                                                   | Bộ đôi nút: `[Pass]` và `[Fail]`                                                   | Dùng chung `SfcTestResultFrame.jsx`        |
| **Khung kiểm thử - Hàng 2**       | `[Switch_InsertTestResultSFC(PASS/FAIL)]`                                          | `[Adapter_InsertTestResultSFC(PASS/FAIL)]`                                         | Đổi tiền tố `Switch_` thành `Adapter_`     |
| **Nút Hoàn tác liên kết**         | `[↩️ SWITCH_UndoLinkSFC]`                                                          | `[↩️ ADAPTER_UndoLinkSFC]`                                                         | Đổi tiền tố `SWITCH_` thành `ADAPTER_`     |
| **Modal xác nhận Undo**           | Xác nhận hoàn tác SFC Switch Link                                                  | Xác nhận hoàn tác SFC Adapter Link                                                 | Dùng chung `UndoLinkConfirmModal.jsx`      |
| **Khung Log giao dịch**           | Terminal log phản hồi từ SFC Switch                                                | Terminal log phản hồi từ SFC Adapter Gateway                                       | Dùng chung `SfcTransactionConsole.jsx`     |

---

## 3. SƠ ĐỒ BỐ CỤC KHÔNG GIAN GIAO DIỆN (UI WIREFRAME & MOCKUP)

### 3.1. Giao Diện Chung Khi Chọn Tab 1: `SFC Switch Helpers` (`mode='switch'`)

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ CONFIG > AUTOMATION LINE CONTROL                              [Dừng Khẩn Cấp E-STOP]  [Khởi Động Dây Chuyền]  [Full]  │
│ Bảng điều khiển tập trung: SFC Helpers, Bắn lệnh SFC Switch/Adapter, Kiểm thử linh kiện và Giám sát giao dịch         │
├────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│  [★ SFC Switch Helpers]   [  SFC Adapter Helpers  ]   [  ALABEL Helper  ]   [  Action Logs & Restore  ]                 │
├────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ ┌─ KHUNG: SFC SWITCH KEYPART & ACTION SENDER ────────────────────────────────────────────────────────────────────────┐ │
│ │                                                                                                                     │ │
│ │ ── THANH LỌC THÔNG TIN (5 TRƯỜNG NGANG) ────────────────────────────────────────────────────────────────────────── │ │
│ │ ┌───────────────────┐ ┌────────────────────┐ ┌───────────────────┐ ┌───────────────────┐ ┌────────────────────┐   │ │
│ │ │ 🔍 Tìm SN/Carrier │ │ Dòng SP (Model) ▼  │ │ Trạm (Group) ▼    │ │ Host              │ │ Station IP         │   │ │
│ │ │ [SN8839210492...] │ │ [HGX B200 NVL  ]   │ │ [ST03-SMT-A   ]   │ │ [sfc-host-01.fii] │ │ [192.168.10.45 ]   │   │ │
│ │ └───────────────────┘ └────────────────────┘ └───────────────────┘ └───────────────────┘ └────────────────────┘   │ │
│ │                                                                                                                     │ │
│ │ ── BỐ CỤC 2 : 1 ─────────────────────────────────────────────────────────────────────────────────────────────────── │ │
│ │ ┌───────────────────────────────────────────────────────┬─────────────────────────────────────────────────────────┐ │ │
│ │ │ MỤC 2 (TỈ LỆ 2/3): BẢNG SFC KEYPARTS CỦA SN           │ MỤC 1 (TỈ LỆ 1/3): TÁC VỤ GỬI SFC SWITCH                │ │ │
│ │ ├───────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────┤ │ │
│ │ │ [x] Chọn | Key Name   | Key Value | Step | Cờ | Pre | BB  │  ┌───────────────────────────────────────────────────┐  │ │ │
│ │ ├───┼───────────┼───────────┼──────┼────┼─────┼─────┤  │  [⚡ SWITCH_InsertSerialNumberSFC                  ]  │  │ │ │
│ │ │ ☑ │ MOTHERBRD │ MB-994821 │ 010  │ Y  │ PASS│ YES │  ├───────────────────────────────────────────────────┤  │ │ │
│ │ │ ☑ │ GPU_01    │ GPU-NV-01 │ 020  │ Y  │ PASS│ YES │  │  [🔍 SWITCH_CheckSerialNumberSFC                   ]  │  │ │ │
│ │ │ ☑ │ GPU_02    │ GPU-NV-02 │ 020  │ Y  │ PASS│ YES │  ├───────────────────────────────────────────────────┤  │ │ │
│ │ │ ☑ │ HEATSINK  │ HS-BLK-88 │ 030  │ Y  │ PASS│ NO  │  │  [🧩 SWITCH_CheckKeyPartsSFC(0)                    ]  │  │ │ │
│ │ │ ☐ │ MAC_ADDR  │ 00:1B:44..│ 040  │ N  │ PEND│ YES │  └───────────────────────────────────────────────────┘  │ │ │
│ │ │   │           │           │      │    │     │     │                                                         │ │ │
│ │ │   │           │           │      │    │     │     │  ┌─ KHUNG KẾT QUẢ KIỂM THỬ ──────────────────────────┐  │ │ │
│ │ │   │           │           │      │    │     │     │  │  [✅ Pass]                   [❌ Fail]             │  │ │ │
│ │ │   │           │           │      │    │     │     │  │  [🚀 Switch_InsertTestResultSFC(PASS)            ] │  │ │ │
│ │ │   │           │           │      │    │     │     │  └───────────────────────────────────────────────────┘  │ │ │
│ │ │   │           │           │      │    │     │     │                                                         │ │ │
│ │ │   │           │           │      │    │     │     │  [↩️  SWITCH_UndoLinkSFC                              ]  │ │ │
│ │ │   │           │           │      │    │     │     │                                                         │ │ │
│ │ │   │           │           │      │    │     │     │  ┌─ KẾT QUẢ GIAO DỊCH GẦN NHẤT (SFC SWITCH) ─────────┐  │ │ │
│ │ │   │           │           │      │    │     │     │  │  [Status: 200 OK]  ⚡ 38ms  Time: 09:45:12           │  │ │ │
│ │ │   │           │           │      │    │     │     │  │  Action: [SWITCH_CheckKeyPartsSFC(0)]              │  │ │ │
│ │ │   │           │           │      │    │     │     │  └───────────────────────────────────────────────────┘  │ │ │
│ │ └───┴───────────┴───────────┴──────┴────┴─────┴─────┴─────────────────────────────────────────────────────────┘ │ │
│ └─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

### 3.2. Giao Diện Chung Khi Chọn Tab 2: `SFC Adapter Helpers` (`mode='adapter'`)

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ CONFIG > AUTOMATION LINE CONTROL                              [Dừng Khẩn Cấp E-STOP]  [Khởi Động Dây Chuyền]  [Full]  │
│ Bảng điều khiển tập trung: SFC Helpers, Bắn lệnh SFC Switch/Adapter, Kiểm thử linh kiện và Giám sát giao dịch         │
├────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│  [  SFC Switch Helpers  ]   [★ SFC Adapter Helpers]   [  ALABEL Helper  ]   [  Action Logs & Restore  ]              │
├────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ ┌─ KHUNG: SFC ADAPTER KEYPART & ACTION SENDER ───────────────────────────────────────────────────────────────────────┐ │
│ │                                                                                                                     │ │
│ │ ── THANH LỌC THÔNG TIN (5 TRƯỜNG NGANG - DÙNG CHUNG 100%) ───────────────────────────────────────────────────────── │ │
│ │ ┌───────────────────┐ ┌────────────────────┐ ┌───────────────────┐ ┌───────────────────┐ ┌────────────────────┐   │ │
│ │ │ 🔍 Tìm SN/Carrier │ │ Dòng SP (Model) ▼  │ │ Trạm (Group) ▼    │ │ Host              │ │ Station IP         │   │ │
│ │ │ [SN8839210492...] │ │ [HGX B200 NVL  ]   │ │ [ST03-SMT-A   ]   │ │ [adapter-gw.fii ] │ │ [192.168.10.45 ]   │   │ │
│ │ └───────────────────┘ └────────────────────┘ └───────────────────┘ └───────────────────┘ └────────────────────┘   │ │
│ │                                                                                                                     │ │
│ │ ── BỐ CỤC 2 : 1 ─────────────────────────────────────────────────────────────────────────────────────────────────── │ │
│ │ ┌───────────────────────────────────────────────────────┬─────────────────────────────────────────────────────────┐ │ │
│ │ │ MỤC 2 (TỈ LỆ 2/3): BẢNG SFC KEYPARTS (DÙNG CHUNG 100%)│ MỤC 1 (TỈ LỆ 1/3): TÁC VỤ GỬI SFC ADAPTER               │ │ │
│ │ ├───────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────┤ │ │
│ │ │ [x] Chọn | Key Name   | Key Value | Step | Cờ | Pre | BB  │  ┌───────────────────────────────────────────────────┐  │ │ │
│ │ ├───┼───────────┼───────────┼──────┼────┼─────┼─────┤  │  [🔑 ADAPTER_GetAccessTokenSFC (Nút mới)          ]  │  │ │ │
│ │ │ ☑ │ MOTHERBRD │ MB-994821 │ 010  │ Y  │ PASS│ YES │  ├───────────────────────────────────────────────────┤  │ │ │
│ │ │ ☑ │ GPU_01    │ GPU-NV-01 │ 020  │ Y  │ PASS│ YES │  │  [⚡ ADAPTER_InsertSerialNumberSFC                 ]  │  │ │ │
│ │ │ ☑ │ GPU_02    │ GPU-NV-02 │ 020  │ Y  │ PASS│ YES │  ├───────────────────────────────────────────────────┤  │ │ │
│ │ │ ☑ │ HEATSINK  │ HS-BLK-88 │ 030  │ Y  │ PASS│ NO  │  │  [🔍 ADAPTER_CheckSerialNumberSFC                  ]  │  │ │ │
│ │ │ ☐ │ MAC_ADDR  │ 00:1B:44..│ 040  │ N  │ PEND│ YES │  ├───────────────────────────────────────────────────┤  │ │ │
│ │ │   │           │           │      │    │     │     │  │  [🧩 ADAPTER_CheckKeyPartsSFC(0)                   ]  │  │ │ │
│ │ │   │           │           │      │    │     │     │  └───────────────────────────────────────────────────┘  │ │ │
│ │ │   │           │           │      │    │     │     │                                                         │ │ │
│ │ │   │           │           │      │    │     │     │  ┌─ KHUNG KẾT QUẢ KIỂM THỬ (ADAPTER) ─────────────────┐  │ │ │
│ │ │   │           │           │      │    │     │     │  │  [✅ Pass]                   [❌ Fail]             │  │ │ │
│ │ │   │           │           │      │    │     │     │  │  [🚀 Adapter_InsertTestResultSFC(PASS)           ] │  │ │ │
│ │ │   │           │           │      │    │     │     │  └───────────────────────────────────────────────────┘  │ │ │
│ │ │   │           │           │      │    │     │     │                                                         │ │ │
│ │ │   │           │           │      │    │     │     │  [↩️  ADAPTER_UndoLinkSFC                             ]  │ │ │
│ │ │   │           │           │      │    │     │     │                                                         │ │ │
│ │ │   │           │           │      │    │     │     │  ┌─ KẾT QUẢ GIAO DỊCH GẦN NHẤT (SFC ADAPTER) ────────┐  │ │ │
│ │ │   │           │           │      │    │     │     │  │  [Status: 200 OK]  ⚡ 22ms  Time: 09:48:02           │  │ │ │
│ │ │   │           │           │      │    │     │     │  │  Action: [ADAPTER_GetAccessTokenSFC]               │  │ │ │
│ │ │   │           │           │      │    │     │     │  │  Token: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpX... │  │ │ │
│ │ │   │           │           │      │    │     │     │  └───────────────────────────────────────────────────┘  │ │ │
│ │ └───┴───────────┴───────────┴──────┴────┴─────┴─────┴─────────────────────────────────────────────────────────┘ │ │
│ └─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

### 3.3. Giao Diện Khi Chọn Tab 3: `ALABEL Helper` (Bố Cục Tỉ Lệ 1 : 1 & Khối Log Thực Thi Phía Dưới)

Phân hệ **ALABEL_Helper** được thiết kế để thay thế hoàn toàn cho **AIOT Helpers**, tập trung vào chức năng tra cứu tiến trình đa tiêu chí và thực thi 7 nghiệp vụ điều khiển cốt lõi của hệ thống ALABEL:

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ CONFIG > AUTOMATION LINE CONTROL                              [Dừng Khẩn Cấp E-STOP]  [Khởi Động Dây Chuyền]  [Full]  │
│ Bảng điều khiển tập trung: SFC Helpers, Bắn lệnh SFC Switch/Adapter, ALABEL Helper và Giám sát giao dịch               │
├────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│  [  SFC Switch Helpers  ]   [  SFC Adapter Helpers  ]   [★ ALABEL Helper  ]   [  Action Logs & Restore  ]              │
├────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ ┌─ KHUNG CHÍNH: PHÂN HỆ ALABEL HELPER (ĐIỀU HÀNH & TRA CỨU TIẾN TRÌNH DÂY CHUYỀN) ────────────────────────────────────┐ │
│ │                                                                                                                     │ │
│ │ ── PHẦN 1: BỐ CỤC CHIA HAI PHÍA (TỈ LỆ 1 : 1) ───────────────────────────────────────────────────────────────────── │ │
│ │ ┌───────────────────────────────────────────────────────┬─────────────────────────────────────────────────────────┐ │ │
│ │ │ MỤC 1 (PHÍA TRÁI - TỈ LỆ 1/2): TRA CỨU TIẾN TRÌNH     │ MỤC 2 (PHÍA PHẢI - TỈ LỆ 1/2): THAO TÁC ĐIỀU KHIỂN ALABEL│ │ │
│ │ ├───────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────┤ │ │
│ │ │ 🔍 TIÊU CHÍ TRA CỨU (Chọn 1 trong 3):                 │ ⚙️ BẢNG ĐIỀU KHIỂN TÁC VỤ ALABEL                         │ │ │
│ │ │ (•) Serial Number (SN)   ( ) Carrier   ( ) Keypart    │ ┌─────────────────────────────────────────────────────┐ │ │ │
│ │ │ ┌───────────────────────────────────────────────────┐ │ │ [★ Undo/Reset] [Transfer] [Clear Undo] [Bù sn_detail]│ │ │ │
│ │ │ │ Nhập SN / Mã Pallet Carrier / Barcode Keypart... │ │ │ [Đổi Keypart] [SNDetails] [Error Logs]               │ │ │ │
│ │ │ └───────────────────────────────────────────────────┘ │ └─────────────────────────────────────────────────────┘ │ │ │
│ │ │                                                       │                                                         │ │ │
│ │ │ 🏷️ DÒNG SẢN PHẨM (MODEL):                             │ ── KHU VỰC THAO TÁC THEO TAB (ĐANG CHỌN: UNDO / RESET) ── │ │ │
│ │ │ ┌───────────────────────────────────────────────────┐ │ ┌─────────────────────────────────────────────────────┐ │ │ │
│ │ │ │ [Tự động nhận diện từ hệ thống...               ] │ │ │ Dòng 1: Mã Đối Tượng: [★ SN] [ Carrier ] (Tab chuyển)│ │ │ │
│ │ │ └───────────────────────────────────────────────────┘ │ │ ┌─────────────────────────────────────────────────┐ │ │ │ │
│ │ │ ℹ️ Chú thích: Tự động nhận diện nếu để trống          │ │ │ Nhập Serial Number (SN) / Carrier RFID...       │ │ │ │ │
│ │ │ [▶ Mở rộng Dropdown chọn Model từ CSDL (Ẩn mặc định)] │ │ └─────────────────────────────────────────────────┘ │ │ │ │
│ │ │   └─ [HGX B200 NVL ▼] (Được nạp động từ CSDL)         │ │ Dòng 2:                                             │ │ │ │
│ │ │                                                       │ │ • Dòng SP (Model):       • Mã NV (Tự truy xuất):    │ │ │ │
│ │ │ ── KẾT QUẢ TIẾN TRÌNH HIỆN TẠI CỦA ĐỐI TƯỢNG ───────── │ │   [HGX B200 NVL        ▼]  [NV-2026-08819 🔒      ]│ │ │ │
│ │ │ • Đối tượng: SN8839210492 | Loại: SERIAL NUMBER       │ │ ─────────────────────────────────────────────────── │ │ │ │
│ │ │ • Dòng SP: HGX B200 NVL (Tự nhận diện từ DB: OK)      │ │ Chế độ: [★ Hoàn tác]   [ Reset Chu Kỳ ]             │ │ │ │
│ │ │ • Trạm hiện tại: ST03-SMT-A (Step: 030 - PRE-CHECK)   │ │ ┌─────────────────────────────────────────────────┐ │ │ │ │
│ │ │ • Mã Pallet / Carrier: CARRIER-RFID-8819              │ │ │ [Khi chọn Hoàn tác]:                            │ │ │ │ │
│ │ │ • Trạng thái Router: WIP (Đang thực hiện) | Pass: 2/3 │ │ │ • Hoàn tác về step: [Step 020 - SMT_SURFACE   ▼]│ │ │ │ │
│ │ │                                                       │ │ │ • [↩️ Thực thi hoàn tác về Step 020             ]│ │ │ │ │
│ │ │                                                       │ │ │ [Khi chọn Reset chu kỳ]:                        │ │ │ │ │
│ │ │                                                       │ │ │ • [⚡ Thực thi reset chu kỳ về Step 0            ]│ │ │ │ │
│ │ │                                                       │ │ └─────────────────────────────────────────────────┘ │ │ │ │
│ │ │                                                       │ └─────────────────────────────────────────────────────┘ │ │ │
│ │ └───────────────────────────────────────────────────────┴─────────────────────────────────────────────────────────┘ │ │
│ │                                                                                                                     │ │
│ │ ── PHẦN 2: MỤC LOG THỰC THI THAO TÁC ALABEL (FULL WIDTH - PHÍA DƯỚI 2 MỤC TRÊN) ─────────────────────────────────── │ │
│ │ ┌─────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐ │ │
│ │ │ 📋 ALABEL OPERATION EXECUTION LOGS               [Bộ lọc: ALL ▼] [🔍 Tìm log...] [🧹 Xóa Terminal] [📥 Xuất Log]│ │ │
│ │ ├─────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤ │ │
│ │ │ [09:50:12.140] [SUCCESS] [UNDO_RESET] SN: SN8839210492 | Trạm: ST03-SMT-A | Response: Reset Router OK (24ms)   │ │ │
│ │ │ [09:48:45.892] [SUCCESS] [COMPENSATE_DETAIL] SN: SN8839210492 | Bù trường: mac_eth0, vendor_pn | Updated 2 rows│ │ │
│ │ │ [09:47:10.024] [WARNING] [CHANGE_KEYPART] Đổi KP-GPU-01 -> KP-GPU-01-REV2 | Chờ SFC xác nhận đối chiếu (45ms)  │ │ │
│ │ │ [09:45:22.711] [ERROR]   [TRANSFER] SN: SN8839210488 -> ST04-TEST | ErrCode 409: Route sequence mismatch (18ms)│ │ │
│ │ │ [09:42:01.050] [INFO]    [CLEAR_UNDO] Carrier: CARRIER-RFID-8819 | Đã xóa trạng thái khóa Undo của trạm ST02   │ │ │
│ │ └─────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘ │ │
│ └─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### 3.4. Giao Diện Khi Chọn Tab 4: `Action Logs & Restore` (`activeTab === 'action_logs'`)

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ CONFIG > AUTOMATION LINE CONTROL                              [Dừng Khẩn Cấp E-STOP]  [Khởi Động Dây Chuyền]  [Full]  │
│ Bảng điều khiển tập trung: SFC Helpers, Bắn lệnh SFC Switch/Adapter, ALABEL Helper và Kiểm toán nhật ký thao tác       │
├────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│  [  SFC Switch Helpers  ]   [  SFC Adapter Helpers  ]   [  ALABEL Helper  ]   [★ Action Logs & Restore  ]              │
├────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ ┌─ KHUNG BỘ LỌC KIỂM TOÁN HÀNH ĐỘNG (ACTION LOGS FILTER TOOLBAR) ─────────────────────────────────────────────────────┐ │
│ │ ┌───────────────────┬───────────────────┬────────────────────┬────────────────────┬────────────────────────────────┐│ │
│ │ │ 📅 Từ Ngày        │ 📅 Đến Ngày       │ ⚡ Hành Động ▼     │ 🏢 Phân Hệ ▼       │ 🔍 Tìm Kiếm Chi Tiết...        ││ │
│ │ │ [2026-11-01 00:00]│ [2026-11-05 23:59]│ [-- Tất Cả H.Động] │ [-- Tất Cả Phân Hệ]│ [Mã thẻ, SN, Carrier, bảng...] ││ │
│ │ └───────────────────┴───────────────────┴────────────────────┴────────────────────┴────────────────────────────────┘│ │
│ │ [🔍 Thực Thi Lọc Dữ Liệu]   [🧹 Làm Sạch Bộ Lọc]                                   [📥 Xuất Báo Cáo Kiểm Toán (CSV)]│ │
│ └─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                                                         │
│ ┌─ BẢNG NHẬT KÝ THAO TÁC & PHỤC HỒI TRẠNG THÁI (ACTION LOGS & STATE RESTORE TABLE) ───────────────────────────────────┐ │
│ │ Hiển thị số dòng: [25 dòng ▼]                                                    Tổng số bản ghi: 128 bản ghi kiểm toán│ │
│ ├─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤ │
│ │ ID       | Thời Gian | Người Thực Hiện | Hành Động    | Bảng Đích      | Mục Tiêu   | Mô Tả Chi Tiết      | Trạng Thái | Thao Tác                │ │
│ ├──────────┼───────────┼─────────────────┼──────────────┼────────────────┼────────────┼─────────────────────┼────────────┼─────────────────────────┤ │
│ │ ACT-8801 │ 09:48:12  │ NV-2026-08819   │ [UNDO]       │ wip_router_st..│ SN883921049│ Hoàn tác về Step 020│ [SUCCESS]  │ [👁️ Xem] [⚖️ Diff] [⏪ Re]│ │
│ │ ACT-8802 │ 09:35:20  │ NV-2026-08819   │ [TRANSFER]   │ carrier_track..│ SN883921049│ Chuyển khay RFID-992│ [SUCCESS]  │ [👁️ Xem] [⚖️ Diff] [⏪ Re]│ │
│ │ ACT-8803 │ 09:20:05  │ NV-2026-04102   │ [KEYPART]    │ sndetaildatas  │ SN883921049│ Đổi GPU_01 sang rev2│ [SUCCESS]  │ [👁️ Xem] [⚖️ Diff] [⏪ Re]│ │
│ │ ACT-8804 │ 08:55:40  │ NV-2026-08819   │ [RESTORE]    │ wip_router_st..│ SN883921049│ Phục hồi về snapshot│ [RESTORED] │ [👁️ Xem] [⚖️ Diff] [ - ] │ │
│ └─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. ĐẶC TẢ CHI TIẾT CÁC THÀNH PHẦN GIAO DIỆN CHUNG

### 4.1. Thanh Lọc Thông Tin Ngang (5 Trường Lọc Dùng Chung)

Sử dụng chung component `SfcFilterBar.jsx`:

- **Trường 1 (Tìm SN/Carrier):** Text input đa năng hỗ trợ tìm theo cả mã sản phẩm hoặc mã khay chứa Pallet/Carrier RFID.
- **Trường 2 (Dòng sản phẩm):** Dropdown menu lựa chọn model (`HGX B200`, `GB200 NVL72`, `HGX H100`...).
- **Trường 3 (Trạm / Group):** Dropdown menu lựa chọn công đoạn (`SMT_ASSY`, `ICT_TEST`, `PRESSFIT_AUTO`...).
- **Trường 4 (Host):** Trường text cấu hình hostname SFC Server / Gateway.
- **Trường 5 (Station IP):** Trường text địa chỉ IP máy trạm.

### 4.2. Bảng Danh Sách SFC Keyparts Của SN (Tỉ Lệ 2/3 - Cột Trái Dùng Chung)

Sử dụng chung component `SfcKeypartsTable.jsx` hiển thị đầy đủ 7 cột:

1. `Chọn` (Checkbox từng dòng + Select All ở Header).
2. `Key Name` (Tên linh kiện kèm tag phân loại Board, Processor, Mechanical, Network, Memory...).
3. `Key Value` (Giá trị mã vạch định dạng font monospace + nút sao chép nhanh có phản hồi xanh lá).
4. `Step` (Bước quy trình: `010`, `020`, `030`...).
5. `Cờ SFC` (Huy hiệu cờ `Y` / `N`).
6. `SFC Precheck` (Badge trạng thái kiểm tra tiền điều kiện: `PASSED`, `WARNING`, `PENDING`).
7. `Bắt buộc` (Badge nổi bật màu đỏ `BẮT BUỘC` hoặc `TÙY CHỌN`).

---

### 4.3. Cột Tác Vụ Điều Phối (Tỉ Lệ 1/3 - Cột Phải Được Tham Số Hóa)

Sử dụng component `SfcActionDispatcherColumn.jsx` với prop `mode`:

#### 4.3.1. Danh sách các nút thao tác xếp theo hàng dọc:

```mermaid
graph TD
    subgraph SwitchMode["Khi mode = 'switch' (3 Nút Dọc)"]
        SW1["1. [⚡ SWITCH_InsertSerialNumberSFC]"]
        SW2["2. [🔍 SWITCH_CheckSerialNumberSFC]"]
        SW3["3. [🧩 SWITCH_CheckKeyPartsSFC(0)]"]
        SW1 --> SW2 --> SW3
    end

    subgraph AdapterMode["Khi mode = 'adapter' (4 Nút Dọc)"]
        AD0["0. [🔑 ADAPTER_GetAccessTokenSFC] (NÚT MỚI)"]
        AD1["1. [⚡ ADAPTER_InsertSerialNumberSFC]"]
        AD2["2. [🔍 ADAPTER_CheckSerialNumberSFC]"]
        AD3["3. [🧩 ADAPTER_CheckKeyPartsSFC(0)]"]
        AD0 --> AD1 --> AD2 --> AD3
    end
```

1. **Nút mới đặc thù của Adapter: `ADAPTER_GetAccessTokenSFC`**
   - **Chỉ xuất hiện khi:** `mode === 'adapter'`.
   - **Vị trí:** Đặt ở vị trí đầu tiên trên cùng của cụm nút tác vụ.
   - **Chức năng:** Gửi yêu cầu xin cấp Bearer Access Token từ Adapter API Gateway với chứng thực Client ID và Machine Station IP.
   - **Styling:** Nền tím than hoàng gia / Amber Gold (Foxconn: `bg-violet-700 hover:bg-violet-800 text-white`, NVIDIA: `bg-zinc-800 hover:bg-zinc-700 text-white border border-amber-500/40 hover:border-amber-400`), Icon `KeyIcon` / Chìa khóa vàng.
   - **Phản hồi:** Lưu token vào state phiên làm việc và hiển thị token tóm tắt trên màn hình Terminal log.

2. **Nút Insert SN:**
   - Khi `mode === 'switch'`: `SWITCH_InsertSerialNumberSFC`
   - Khi `mode === 'adapter'`: `ADAPTER_InsertSerialNumberSFC`

3. **Nút Check SN:**
   - Khi `mode === 'switch'`: `SWITCH_CheckSerialNumberSFC`
   - Khi `mode === 'adapter'`: `ADAPTER_CheckSerialNumberSFC`

4. **Nút Check Keyparts:**
   - Khi `mode === 'switch'`: `SWITCH_CheckKeyPartsSFC(0)`
   - Khi `mode === 'adapter'`: `ADAPTER_CheckKeyPartsSFC(0)`

#### 4.3.2. Khung Kết Quả Kiểm Thử (Dùng Chung Cấu Trúc):

- Dòng 1: Bộ đôi nút chuyển đổi trạng thái xếp ngang: `Pass` (Xanh lục) và `Fail` (Đỏ rực).
- Dòng 2: Nút thực thi động theo mode:
  - Nếu `mode === 'switch'`: `Switch_InsertTestResultSFC(PASS)` hoặc `Switch_InsertTestResultSFC(FAIL)`
  - Nếu `mode === 'adapter'`: `Adapter_InsertTestResultSFC(PASS)` hoặc `Adapter_InsertTestResultSFC(FAIL)`

#### 4.3.3. Nút Hoàn Tác (Undo Link):

- Nếu `mode === 'switch'`: `SWITCH_UndoLinkSFC`
- Nếu `mode === 'adapter'`: `ADAPTER_UndoLinkSFC`
- Cả 2 đều mở hộp thoại xác nhận `UndoLinkConfirmModal.jsx` với nội dung tương ứng trước khi thực thi.

#### 4.3.4. Khung Hiển Thị Kết Quả Giao Dịch Gần Nhất (Terminal Console):

- Dùng chung `SfcTransactionConsole.jsx`.
- Hiển thị đầy đủ Status Code, Latency, Timestamp, Action Name, Message và Raw JSON.

---

## 5. ĐẶC TẢ CHI TIẾT PHÂN HỆ ALABEL_HELPER (TAB 3 - THAY THẾ AIOT HELPERS)

Phân hệ **ALABEL_Helper** được thiết kế lại toàn diện để thay thế cho tab _AIOT Helpers_ trước đây. Phân hệ đóng vai trò là trạm điều hành dán nhãn, quản lý thẻ RFID/Carrier và can thiệp quy trình router sản xuất trên dây chuyền tự động hóa.

### 5.1. Bố Cục Không Gian Hai Tầng (Split 1:1 Grid & Full-Width Execution Console)

```mermaid
flowchart TD
    subgraph TabAlabel["Tab 3: ALABEL_Helper Console"]
        subgraph TopSection["TẦNG 1: BỐ CỤC CHIA ĐÔI HAI PHÍA (TỈ LỆ 1 : 1)"]
            subgraph LeftCol["Cột Trái (50%): Tra Cứu Tiến Trình (Process Tracking)"]
                SearchType["1. Tìm kiếm theo 3 tiêu chí:\n[SN] | [Carrier] | [Keypart]"]
                ModelDetect["2. Dòng sản phẩm (Model):\n• Tự động nhận diện nếu để trống\n• Dropdown từ CSDL (Ẩn mặc định)"]
                ProcessSummary["3. Thẻ kết quả tiến trình:\n• Trạm hiện tại & Bước Router\n• Trạng thái WIP & Danh mục linh kiện"]
                SearchType --> ModelDetect --> ProcessSummary
            end

            subgraph RightCol["Cột Phải (50%): Thao Tác Điều Khiển ALABEL"]
                NavTabs["Thanh Điều Hướng 7 Sub-Tabs Tác Vụ"]
                subgraph SubTabsGroup["7 Nghiệp Vụ Chuyên Biệt"]
                    ST1["1. Undo / Reset"]
                    ST2["2. Transfer"]
                    ST3["3. Clear Undo"]
                    ST4["4. Bù sn_detail"]
                    ST5["5. Đổi Keypart"]
                    ST6["6. SNDetails"]
                    ST7["7. Error Logs"]
                end
                ActionDispatch["Form Nhập Liệu & Nút Thực Thi Tác Vụ"]
                NavTabs --> SubTabsGroup --> ActionDispatch
            end
        end

        subgraph BottomSection["TẦNG 2: MỤC LOG THỰC THI THAO TÁC ALABEL (FULL WIDTH)"]
            ExecutionLogs["ALABEL Execution Logs Console (Terminal Giám Sát Thời Gian Thực)\n• Thời gian (ms) | Level (Success/Error/Warn) | Tên Action | Target | Response Payload\n• Toolbar: Lọc trạng thái, Tìm kiếm log, Xóa terminal, Xuất báo cáo"]
        end

        TopSection --> BottomSection
    end
```

---

### 5.2. Khối Phía Trái (Tỉ Lệ 1/2): Tra Cứu Tiến Trình (Process Tracking)

Khối này cung cấp công cụ nhận diện và kiểm tra vòng đời sản phẩm, vị trí hiện tại trên dây chuyền và lịch sử qua trạm:

#### 5.2.1. Bộ tìm kiếm linh hoạt 3 chế độ (Multi-mode Identifier Search):

- **3 Tiêu chí tra cứu:**
  1. `Serial Number (SN)`: Tra cứu theo số serial định danh chính của sản phẩm (ví dụ: `SN8839210492`).
  2. `Carrier`: Tra cứu theo mã thẻ RFID hoặc mã định danh khay/Pallet đồ gá mang sản phẩm di chuyển trên băng tải (ví dụ: `CARRIER-RFID-8819`).
  3. `Keypart`: Tra cứu ngược từ mã vạch của bất kỳ linh kiện con nào đã được liên kết vào sản phẩm (ví dụ: mã bo mạch chủ `MB-994821`, mã GPU `GPU-NV-01`).
- **Tương tác:** Cho phép chuyển đổi nhanh bằng bộ Radio Button hoặc Switch Pill `[ (•) SN | ( ) Carrier | ( ) Keypart ]`. Hỗ trợ nhấn phím `Enter` hoặc máy quét barcode gắn cổng USB để tự động kích hoạt tra cứu.

#### 5.2.2. Mục Dòng Sản Phẩm (Model / Product Line):

- **Nguyên tắc nhận diện thông minh:**
  - Trường nhập liệu hiển thị chú thích rõ ràng:
    > ℹ️ **Chú thích:** _Tự động nhận diện nếu để trống (Auto-detected from database if left blank)._
  - Khi người dùng nhập SN, Carrier hoặc Keypart và bấm tra cứu, hệ thống ALABEL sẽ tự động truy vấn CSDL để đối chiếu và tự động điền Model tương ứng (ví dụ: `HGX B200 NVL`, `GB200 NVL72`).
- **Dropdown menu từ CSDL (Trạng thái ẩn đi):**
  - Bên dưới mục Dòng sản phẩm có một **Dropdown menu lấy danh mục Model trực tiếp từ CSDL**.
  - **Cơ chế ẩn/hiện:** Ở trạng thái mặc định, dropdown này được **thu gọn/ẩn đi** (collapsed / hidden) để giao diện tối giản và ưu tiên tính năng tự động nhận diện.
  - **Nút mở rộng:** Cung cấp nút chuyển đổi `[▶ Mở rộng chọn Model từ CSDL]` (hoặc biểu tượng Chevron). Khi kỹ thuật viên bấm vào, dropdown sẽ mở ra cho phép chọn thủ công dòng sản phẩm trong trường hợp cần override cưỡng bức dữ liệu hoặc sản phẩm chưa có trong danh mục nhận diện tự động.

#### 5.2.3. Khung hiển thị thông tin tiến trình đối tượng:

- Hiển thị tóm tắt tình trạng sản xuất dưới dạng các thẻ chỉ số (Badges & Metric Cards):
  - **Đối tượng & Định danh:** SN, Model, Mã khay Carrier RFID đang gán.
  - **Trạm hiện tại (Current Station):** Mã trạm (Group), Tên công đoạn, Mã bước router (ví dụ: `ST03-SMT-A` - `Step 030`).
  - **Trạng thái WIP (Work In Progress):** `IN_PROCESS`, `PASSED`, `REWORK_HOLD`, `FAILED`.
  - **Keyparts liên kết:** Tỉ lệ linh kiện đã quét đủ (ví dụ: `4/5 Keyparts Bound`).

---

### 5.3. Khối Phía Phải (Tỉ Lệ 1/2): Thao Tác Điều Khiển ALABEL & Hệ Thống 7 Sub-Tabs

Nằm ở phía trên bên phải là bảng điều khiển tác vụ ALABEL. Ngay dưới tiêu đề là hệ thống **7 Sub-Tabs** tương ứng với 7 nghiệp vụ điều phối chuyên sâu:

|  STT  | Sub-Tab        | Tên Nghiệp Vụ               | Mục Đích & Phạm Vi Xử Lý                                                                                                                                        | Form Nhập Liệu & Nút Tác Vụ                                                                                                                                                                                                                                                                                                                                                                                              |
| :---: | :------------- | :-------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1** | `undo/reset`   | **Hoàn tác & Reset chu kỳ** | Hỗ trợ 2 chế độ can thiệp: Rollback bước router về step mục tiêu chỉ định hoặc reset toàn bộ chu kỳ sản xuất của sản phẩm về Step 0.                            | • **Dòng 1:** Mã đối tượng (Tab chuyển đổi `[SN]` / `[Carrier]`).<br>• **Dòng 2:** Dropdown Dòng sản phẩm (Model) & Mã nhân viên (Tự truy xuất khi đăng nhập, `Read-only / Disabled`).<br>• **Chế độ nghiệp vụ (2 Tab con):**<br> - _Nếu chọn [Hoàn tác]:_ Dropdown chọn step mục tiêu + Nút `[↩️ Thực thi hoàn tác về Step {targetStep}]`.<br> - _Nếu chọn [Reset chu kỳ]:_ Nút `[⚡ Thực thi reset chu kỳ về Step 0]`. |
| **2** | `transfer`     | **Điều chuyển khay Carrier**| Luân chuyển sản phẩm (SN) từ khay Pallet cũ sang khay mới hoặc điều chuyển công đoạn sang step router chỉ định.                                                  | • **Các trường text:** Mã Serial Number, Mã khay cũ, Mã khay mới.<br>• **Dòng sản phẩm (Model):** Dropdown menu (tự động giải mã).<br>• **Mã nhân viên:** Tự truy xuất sau khi đăng nhập (`Read-only / Disabled 🔒`).<br>• **Step chuyển sang:** Dạng Dropdown menu.<br>• **Nút thực thi:** `[🔀 Thực thi chuyển khay]`. |
| **3** | `clear undo`   | **Giải undo / rework**      | Giải phóng cờ khóa undo hoặc trạng thái rework router của SN/Carrier trên server ALABEL, cho phép sản phẩm tiếp tục đi tiếp trong luồng router dây chuyền.       | • **Mã đối tượng:** Text input kèm tab chuyển đổi `[SN]` / `[Carrier]`.<br>• **Dòng sản phẩm (Model):** Dropdown menu.<br>• **Mã nhân viên:** Tự truy xuất sau khi đăng nhập (`Read-only / Disabled 🔒`).<br>• **Giải undo/rework đến step:** Dropdown menu (tùy chọn).<br>• **Nút thực thi:** `[🧹 Thực thi giải undo/rework]` (`shared_clearundorework`). |
| **4** | `bù sn_detail` | **Nạp bù seri thủ công**    | Nạp bù dữ liệu chi tiết bản ghi SNDetails từ Step 1 đến TargetStep cho sản phẩm bị thiếu dữ liệu trên hệ thống qua Stored Procedure `[AutoLine].[Shared_ManualInsertSn]`. | • **Trường text:** Serial Number và Carrier Code nạp bù.<br>• **Dòng sản phẩm (Model):** Dropdown menu.<br>• **Dây chuyền:** Ô text nhập dây chuyền.<br>• **Target Step:** Ô text nhập router step mục tiêu.<br>• **Mã nhân viên:** Tự truy xuất sau khi đăng nhập (`Read-only / Disabled 🔒`).<br>• **Lưu ý:** Nạp bù SNDetails từ Step 1 đến TargetStep qua SP `[AutoLine].[Shared_ManualInsertSn]`.<br>• **Nút thực thi:** `[📥 Thực thi nạp bù seri thủ công]` (`Shared_ManualInsertSN`). |
| **5** | `đổi keypart`  | **Hoán đổi mã linh kiện**   | Hủy gán linh kiện cũ bị lỗi hoặc cập nhật giá trị linh kiện con mới hợp chuẩn vào bảng dữ liệu chi tiết `sndetaildatas` của SN/Carrier.                         | • **Mã đối tượng:** Ô text có thể nhập theo SN hoặc Carrier.<br>• **Dòng sản phẩm (Model):** Dropdown menu.<br>• **Mã nhân viên:** Tự truy xuất sau khi đăng nhập (`Read-only / Disabled 🔒`).<br>• **Chọn Keypart:** Dropdown menu.<br>• **Giá trị mới:** Ô text nhập barcode linh kiện mới.<br>• **Nút thực thi:** `[🔄 Xác nhận thay đổi giá trị keypart]` (`sndetaildatas`). |
| **6** | `sndetails`    | **Hồ sơ chi tiết SN**       | Truy vấn toàn diện và hiển thị danh sách bản ghi dữ liệu chi tiết của sản phẩm từ bảng `sn_detail` / `sndetaildatas` theo SN hoặc Carrier.                         | • **Mã đối tượng:** Ô text có thể lựa chọn nhập theo SN hoặc Carrier.<br>• **Dòng sản phẩm (Model):** Dropdown menu (tùy chọn).<br>• **Giới hạn bản ghi:** Dropdown menu Top Limit (50, 100, 200, 500, 1000).<br>• **Nút thực thi:** `[🔍 Thực thi tra cứu bảng sndetails]`. |
| **7** | `error logs`   | **Nhật ký lỗi trạm**        | Tra cứu, lọc và phân tích lịch sử bản ghi lỗi phát sinh trên hệ thống ALABEL theo đối tượng SN/Carrier, dòng sản phẩm, trạm và nguồn lỗi.                       | • **Mã đối tượng:** Ô text có thể chuyển đổi qua lại giữa SN và Carrier.<br>• **Bộ lọc Dropdown:** Dòng sản phẩm, Loại sản phẩm, Tên chuyền, Nguồn lỗi, Giai đoạn, Trạm, Giới hạn bản ghi.<br>• **Nút thực thi:** `[⚠️ Thực thi tra cứu bảng ErrorLogs]`. |

#### 5.3.1. Đặc Tả Chi Tiết Sub-Tab 1: `undo/reset` (Hoàn Tác Router & Reset Chu Kỳ Dây Chuyền)

Nghiệp vụ **Undo / Reset** là công cụ can thiệp vận hành trọng yếu, phục vụ kỹ sư khắc phục nhanh các sự cố quét nhầm tem, sai lệch thứ tự bước router hoặc phế phẩm cần chạy lại từ đầu dây chuyền:

1. **Dòng đầu tiên: Nhập mã đối tượng (Target Identifier Input with Switch Tabs):**
   - **Thanh tab chuyển đổi đối tượng:** Đặt ngay trên ô nhập liệu với 2 nút chuyển đổi nhanh:
     - `[★ Serial Number (SN)]`: Dành cho sản phẩm đã được bắn số SN cố định.
     - `[ Carrier RFID ]`: Dành cho khay chứa Pallet hoặc thẻ RFID mang bảng mạch di chuyển trên chuyền tự động.
   - **Ô nhập liệu (Text Input):**
     - Placeholder và tiêu đề thay đổi tương ứng theo tab được chọn (ví dụ: `Nhập Serial Number (SN)...` hoặc `Nhập mã khay Carrier RFID...`).
     - Kế thừa tự động: Tự động điền dữ liệu nếu đối tượng đã được tra cứu thành công ở khung _Tra cứu tiến trình_ bên trái.
     - Hỗ trợ phím tắt và quét tự động từ đầu đọc mã vạch / đầu đọc RFID cổng trạm.

2. **Dòng tiếp theo: Dòng Sản Phẩm & Mã Nhân Viên (Model & Operator ID Row - Lưới 2 Cột):**
   - **Cột 1: Dòng sản phẩm (Model / Product Line):**
     - Hiển thị dưới dạng **Dropdown menu** chọn lựa danh mục dòng sản phẩm (được đồng bộ từ CSDL backend, ví dụ: `HGX B200 NVL`, `GB200 NVL72`, `HGX H100 SXM5`...).
     - Tự động nhận diện và chọn sẵn nếu mã SN/Carrier đã tồn tại trong CSDL, hoặc cho phép kỹ thuật viên chọn thủ công để điều phối đúng router model.
   - **Cột 2: Mã nhân viên (Operator ID / User Code):**
     - **Cơ chế tự truy xuất:** Hệ thống tự động trích xuất mã định danh nhân viên (`Employee ID`, ví dụ `NV-2026-08819`) từ tài khoản đăng nhập hiện tại (`Auth Context / Session`).
     - **Quy tắc bảo mật:** Trường này ở trạng thái **Chỉ đọc (Read-only / Disabled)**, có biểu tượng ổ khóa bảo mật (`🔒`), kỹ thuật viên **hoàn toàn không thể tự ý sửa đổi**.
     - **Ý nghĩa kiểm toán (Audit Trail):** Đảm bảo ghi nhận trung thực và truy vết 100% trách nhiệm của người phát lệnh can thiệp router trên hệ thống điều khiển tự động hóa Foxconn / NVIDIA.

3. **Phân nhánh 2 Chế Độ Nghiệp Vụ (Sub-Mode Navigation Tabs):**
   Phía dưới thông tin đối tượng là bộ đôi tab chuyển đổi chế độ thao tác:
   - **Chế độ 1: Tab `[Hoàn tác (Undo Router)]`**
     - **Dropdown chọn Step mục tiêu (`Hoàn tác về step mục tiêu nào`):**
       - Hiển thị danh mục các bước router hợp lệ trước trạm hiện tại của sản phẩm (ví dụ: `Step 010 - SMT_FEEDER`, `Step 020 - SMT_SURFACE`, `Step 030 - SMT_AOI_INSPECT`...).
       - Kỹ sư chọn bước cần rollback tới để khắc phục công đoạn lỗi.
     - **Nút hành động thực thi:**
       - Nhãn nút: **`[↩️ Thực thi hoàn tác về Step {targetStep}]`** (tự động cập nhật số step theo lựa chọn ở dropdown, ví dụ `Thực thi hoàn tác về Step 020`).
       - Hành vi: Gửi lệnh rollback router về đúng step đã chọn, cập nhật lại trạng thái WIP của sản phẩm và ghi nhận log thực thi.
   - **Chế độ 2: Tab `[Reset chu kỳ (Cycle Reset)]`**
     - Dành riêng cho các trường hợp phế phẩm nặng, board mạch cần tháo dỡ linh kiện hoặc làm sạch để chạy lại từ đầu chu trình sản xuất.
     - **Không yêu cầu chọn Step:** Vì hệ thống mặc định đưa toàn bộ tiến trình về điểm xuất phát.
     - **Nút hành động thực thi:**
       - Nhãn nút: **`[⚡ Thực thi reset chu kỳ về Step 0]`**.
       - Hành vi: Đặt lại toàn bộ lịch sử router của SN/Carrier về `Step 000` (Initial State / Trạm cấp phôi ban đầu), giải phóng các cờ khóa router và cho phép bắt đầu chu kỳ dán nhãn mới.

4. **Tích hợp Console Log thời gian thực:**
   - Mọi thao tác khi nhấn nút thực thi (Hoàn tác hoặc Reset chu kỳ) đều kích hoạt ghi nhận bản ghi tức thì xuống khối `ALABEL Execution Logs Console` ở tầng dưới cùng:
     - Action: `UNDO_TO_TARGET_STEP` hoặc `CYCLE_RESET_STEP_0`.
     - Target: Mã SN hoặc Carrier tương ứng.
     - Operator: Mã nhân viên đã tự động truy xuất từ phiên đăng nhập.
     - Target Step: Mã step hoàn tác hoặc `Step 000`.
     - Response: Trạng thái phản hồi từ ALABEL Engine và độ trễ mili-giây (Latency ms).

#### 5.3.2. Đặc Tả Chi Tiết Sub-Tab 2: `transfer` (Điều Chuyển Khay Carrier & Router Step)

Nghiệp vụ **Transfer (Điều chuyển khay Carrier)** phục vụ kỹ sư khi cần hoán đổi khay chứa sản phẩm (Pallet đồ gá / Carrier RFID) trong dây chuyền tự động—ví dụ khay cũ bị lỗi ăng-ten RFID, bị dơ bẩn hoặc cần chuyển sang khay chuyên dụng của công đoạn kế tiếp—đồng thời điều phối sản phẩm đến bước router công đoạn (Step) chỉ định:

1. **Các trường Text định danh đối tượng & khay chứa:**
   - **Mã Serial Number (SN):**
     + Trường text input nhập mã serial định danh của sản phẩm (ví dụ: `SN8839210492-NV`).
     + Kế thừa tự động: Tự động điền dữ liệu nếu đã tra cứu thành công ở khung *Tra cứu tiến trình* bên trái.
   - **Mã khay cũ (Old Carrier RFID):**
     + Trường text input hiển thị mã khay/Pallet đồ gá hiện tại đang mang sản phẩm (ví dụ: `CARRIER-RFID-8819`).
     + Tự động nhận diện từ kết quả tra cứu tiến trình của SN, hoặc cho phép kỹ thuật viên quét mã vạch / thẻ RFID trực tiếp từ đầu đọc.
   - **Mã khay mới (New Carrier RFID):**
     + Trường text input nhập mã khay Pallet mới cần chuyển sản phẩm sang (ví dụ: `CARRIER-RFID-9920`).
     + Hỗ trợ quét barcode / RFID khay mới tại trạm chuyển khay tự động. Bắt buộc nhập và phải khác với mã khay cũ.

2. **Dòng sản phẩm & Mã nhân viên (Lưới 2 Cột):**
   - **Dòng sản phẩm (Model / Product Line):**
     + Hiển thị dưới dạng **Dropdown menu** liệt kê danh mục dòng sản phẩm (`HGX B200 NVL`, `GB200 NVL72`, `HGX H100 SXM5`...).
     + **Cơ chế tự động giải mã:** Khi người dùng nhập mã Serial Number hoặc mã khay cũ, hệ thống tự động phân tích tiền tố hoặc đối chiếu CSDL để giải mã và chọn sẵn đúng Model. Kỹ thuật viên vẫn có thể mở dropdown để chọn lại thủ công nếu cần.
   - **Mã nhân viên (Operator ID):**
     + **Cơ chế tự truy xuất sau khi đăng nhập:** Hệ thống tự động trích xuất mã thẻ nhân viên (`cardId` hoặc `username`, ví dụ `NV-2026-08819`) từ phiên đăng nhập tài khoản hiện tại (`state.auth`).
     + **Quy tắc bảo mật:** Trường này ở trạng thái **Chỉ đọc (Read-only / Disabled)** kèm biểu tượng ổ khóa (`🔒`), kỹ thuật viên **hoàn toàn không thể tự ý sửa đổi** nhằm đảm bảo tính toàn vẹn kiểm toán (Audit Trail) của nhà máy Foxconn & NVIDIA.

3. **Step chuyển sang & Nút hành động thực thi:**
   - **Step chuyển sang (Destination Station Step):**
     + Hiển thị dưới dạng **Dropdown menu** liệt kê danh mục các bước router công đoạn trên dây chuyền (ví dụ: `Step 010 - ST01-FEEDER`, `Step 020 - ST02-SMT-SURFACE`, `Step 030 - ST03-SMT-A`, `Step 040 - ST04-ICT-TEST`, `Step 050 - ST05-PRESSFIT`...).
     + Giúp xác định chính xác công đoạn tiếp theo mà khay mới sẽ được băng tải tự động điều hướng đến.
   - **Nút hành động thực thi:**
     + Nhãn nút: **`[🔀 Thực thi chuyển khay]`**.
     + Hiệu ứng: Hiển thị loading spinner (`Đang chuyển khay...`) trong suốt quá trình gửi lệnh tới ALABEL Engine.
     + Điều kiện kích hoạt (Validation): Yêu cầu có đầy đủ Serial Number, Mã khay cũ và Mã khay mới hợp lệ (mã khay mới không được trùng mã khay cũ).

4. **Tích hợp Console Log thời gian thực:**
   - Khi bấm nút `[🔀 Thực thi chuyển khay]`, hệ thống đóng gói đầy đủ payload gửi lên server và ghi nhận ngay bản tin vào `ALABEL Execution Logs Console` ở tầng dưới cùng:
     + Action: `TRANSFER_CARRIER`.
     + Target: `{sn} ➔ {newCarrier}`.
     + Operator: Mã nhân viên tự truy xuất từ tài khoản đăng nhập.
     + Message: `[TRANSFER_OK] Đã chuyển thành công SN {sn} từ khay cũ {oldCarrier} sang khay mới {newCarrier} tại Step {targetStep}. Model: {model}. Nhân viên: {operatorId}.`
     + Latency ms và phản hồi từ ALABEL Engine.

#### 5.3.3. Đặc Tả Chi Tiết Sub-Tab 3: `clear undo` (Giải Phóng Cờ Khóa Undo & Rework Router)

Nghiệp vụ **Clear Undo / Rework (`shared_clearundorework`)** là công cụ can thiệp vận hành trọng yếu, phục vụ kỹ sư khi cần giải phóng cờ trạng thái khóa undo hoặc cờ rework hold của đối tượng trên server ALABEL/SFC—giúp board mạch / sản phẩm sau khi đã xử lý lỗi hoặc xác minh xong có thể tiếp tục di chuyển qua các trạm kế tiếp theo luồng router sản xuất:

1. **Trường Text Nhập Mã Đối Tượng & Tab Chuyển Đổi (SN / Carrier):**
   - **Thanh tab chuyển đổi đối tượng:** Đặt ngay trên ô nhập liệu với 2 nút chuyển đổi tiện lợi:
     - `[★ Serial Number (SN)]`: Dành cho đối tượng quản lý theo số Serial cố định của sản phẩm.
     - `[ Carrier RFID / Pallet ]`: Dành cho khay chứa Pallet đồ gá hoặc thẻ RFID di chuyển trên băng tải.
   - **Ô nhập liệu (Text Input):**
     - Placeholder và nhãn thay đổi linh hoạt theo tab được chọn (ví dụ: `Nhập Serial Number (SN)...` hoặc `Nhập mã khay Carrier RFID...`).
     - Kế thừa tự động: Tự động trích xuất và điền mã đối tượng nếu kỹ thuật viên đã tra cứu thành công ở khung *Tra cứu tiến trình* bên trái.
     - Hỗ trợ quét nhanh từ máy đọc mã vạch (Barcode Scanner) hoặc đầu đọc thẻ RFID cố định tại trạm.

2. **Dòng Sản Phẩm & Mã Nhân Viên (Lưới 2 Cột Đồng Bộ):**
   - **Dòng sản phẩm (Model / Product Line):**
     - Hiển thị dưới dạng **Dropdown menu** liệt kê danh mục dòng sản phẩm kích hoạt trong CSDL backend (`HGX B200 NVL`, `GB200 NVL72`, `HGX H100 SXM5`...).
     - Tự động nhận diện và chọn sẵn nếu mã SN/Carrier đã có trong hệ thống, hoặc cho phép kỹ thuật viên chọn thủ công để điều phối đúng router model tương ứng.
   - **Mã nhân viên (Operator ID):**
     - **Cơ chế tự truy xuất sau khi đăng nhập thành công:** Hệ thống tự động trích xuất mã thẻ nhân viên (`cardId` hoặc `username`, ví dụ: `NV-2026-08819`) từ phiên đăng nhập tài khoản hiện tại (`state.auth`).
     - **Quy tắc bảo mật nghiêm ngặt:** Trường này ở trạng thái **Chỉ đọc (Read-only / Disabled)** kèm biểu tượng ổ khóa bảo mật (`🔒`), kỹ thuật viên **hoàn toàn không thể tự ý chỉnh sửa**.
     - **Ý nghĩa kiểm toán (Audit Trail):** Ghi nhận chính xác 100% trách nhiệm của kỹ thuật viên phát lệnh gỡ khóa undo/rework trên hệ thống dây chuyền tự động hóa Foxconn & NVIDIA.

3. **Dropdown Menu Giải Undo/Rework Đến Step (Tùy Chọn - Optional):**
   - Hiển thị danh mục các bước router công đoạn trên dây chuyền (ví dụ: `Step 010 - ST01-FEEDER`, `Step 020 - ST02-SMT-SURFACE`, `Step 030 - ST03-SMT-A`, `Step 040 - ST04-ICT-TEST`, `Step 050 - ST05-PRESSFIT`...).
   - **Tính chất Tùy chọn (Optional):**
     - Giá trị mặc định: `Toàn bộ chu kỳ / Giữ nguyên step hiện tại (Mặc định)`.
     - Cho phép kỹ thuật viên lựa chọn một step router cụ thể nếu muốn sau khi gỡ cờ khóa, sản phẩm sẽ được chuyển hướng tiếp tục từ đúng công đoạn đó.

4. **Nút Hành Động Thực Thi:**
   - **Nhãn nút:** **`[🧹 Thực thi giải undo/rework]`**.
   - **Backend Handler / Action Code:** `shared_clearundorework`.
   - **Hiệu ứng & Kiểm tra hợp lệ:**
     - Hiển thị loading spinner (`Đang giải undo/rework...`) trong suốt quá trình gửi lệnh tới ALABEL Service.
     - Validation: Bắt buộc người dùng phải nhập mã đối tượng (SN hoặc Carrier) và xác nhận Model trước khi phát lệnh.

5. **Tích Hợp Console Log Thời Gian Thực:**
   - Khi bấm nút `[🧹 Thực thi giải undo/rework]`, hệ thống đóng gói payload gửi lên server và lập tức ghi nhận bản tin vào `ALABEL Execution Logs Console` ở tầng dưới cùng:
     - Action: `CLEAR_UNDO_REWORK` (`shared_clearundorework`).
     - Target: `{targetType.toUpperCase()}: {targetCode}`.
     - Operator: Mã nhân viên đã tự động truy xuất từ tài khoản đăng nhập.
     - Target Step: Mã step được chọn (hoặc `Mặc định`).
     - Message: `[CLEAR_UNDO_OK] Đã giải phóng thành công cờ khóa undo/rework cho {targetType} '{targetCode}' (Model: {model}) tại Step: {clearStep || 'CURRENT'}. Nhân viên: {operatorId}.`
     - Response status và Latency ms từ ALABEL Engine.

#### 5.3.4. Đặc Tả Chi Tiết Sub-Tab 4: `bù sn_detail` (Nạp Bù Seri Thủ Công & Dữ Liệu SNDetails Qua Stored Procedure)

Nghiệp vụ **Nạp Bù Seri Thủ Công (Manual Insert SN Details)** phục vụ kỹ sư khắc phục sự cố gián đoạn dữ liệu trên dây chuyền tự động hóa—ví dụ khi đường truyền mạng giữa PLC trạm và máy chủ SFC bị đứt, lỗi timeout hoặc bo mạch đi qua các trạm trước nhưng bảng `sn_detail` chưa được chèn đủ thuộc tính. Nghiệp vụ này kích hoạt Stored Procedure hệ thống `[AutoLine].[Shared_ManualInsertSn]` để khởi tạo và nạp bù dữ liệu chi tiết từ Step 1 đến TargetStep chỉ định:

1. **Hai trường Text nhập mã Serial Number và Carrier Code nạp bù (Lưới 2 Cột):**
   - **Mã Serial Number (SN):**
     * Trường text input nhập mã serial định danh của sản phẩm cần nạp bù (ví dụ: `SN8839210492-NV`).
     * Cơ chế kế thừa: Tự động trích xuất và điền sẵn nếu kỹ thuật viên đã tra cứu thành công ở khung *Tra cứu tiến trình* bên trái.
     * Hỗ trợ quét nhanh từ đầu đọc barcode của trạm. Bắt buộc nhập (`*`).
   - **Mã Carrier Code (Mã khay RFID / Pallet):**
     * Trường text input nhập mã khay Pallet mang sản phẩm cần nạp bù (ví dụ: `CARRIER-RFID-8819`).
     * Tự động đồng bộ từ kết quả tra cứu tiến trình của SN, hoặc cho phép quét mã RFID đồ gá trực tiếp. Bắt buộc nhập (`*`).

2. **Dòng sản phẩm & Dây chuyền sản xuất (Lưới 2 Cột):**
   - **Dòng sản phẩm (Model / Product Line):**
     * Hiển thị dưới dạng **Dropdown menu** liệt kê danh mục dòng sản phẩm kích hoạt trong CSDL backend (`DB_ACTIVE_MODELS`, ví dụ: `HGX B200 NVL`, `GB200 NVL72`, `HGX H100 SXM5`...).
     * Tự động nhận diện và chọn sẵn theo tiền tố của Serial Number/Carrier, hoặc cho phép kỹ thuật viên chọn thủ công từ dropdown.
   - **Dây chuyền (Production Line):**
     * Trường text input cho phép nhập tên/mã dây chuyền sản xuất đang vận hành (ví dụ: `LINE-01-SMT`, `LINE-02-NVL`, `LINE-B200-AUTO`).
     * Xác định phạm vi dây chuyền để Stored Procedure nạp bù cấu hình trạm tương ứng.

3. **Target Step & Mã nhân viên thực thi (Lưới 2 Cột):**
   - **Target Step (Bước Router mục tiêu nạp bù tới):**
     * Trường text input cho phép nhập mã bước router mục tiêu cần nạp bù dữ liệu tới (ví dụ: `030`, `040`, `ST03-SMT-A`).
     * Xác định giới hạn đích của quá trình nạp bù: Stored Procedure sẽ chạy tuần tự từ công đoạn đầu tiên (Step 1) đến đúng TargetStep này.
   - **Mã nhân viên thực thi (Operator ID):**
     * **Cơ chế tự truy xuất sau khi đăng nhập thành công:** Tự động trích xuất mã thẻ nhân viên (`cardId` hoặc `username`, ví dụ: `NV-2026-08819`) từ phiên đăng nhập tài khoản hiện tại (`state.auth`).
     * **Quy tắc bảo mật nghiêm ngặt:** Trường này ở trạng thái **Chỉ đọc (Read-only / Disabled)** kèm biểu tượng ổ khóa (`🔒`), kỹ thuật viên **hoàn toàn không thể tự ý sửa đổi**.
     * **Ý nghĩa kiểm toán (Audit Trail):** Ghi nhận chính xác danh tính người phát lệnh can thiệp nạp bù dữ liệu CSDL của nhà máy Foxconn & NVIDIA.

4. **Khung thông báo lưu ý kỹ thuật (Technical Callout Notice):**
   - Đặt ngay bên dưới các trường nhập liệu với thiết kế khung viền cảnh báo trực quan:
     > ⚠️ **Lưu ý:** Nạp bù dữ liệu SNDetails từ Step 1 đến TargetStep qua Stored Procedure `[AutoLine].[Shared_ManualInsertSn]`.
   - Giúp kỹ sư nhận biết cơ chế hoạt động ngầm của hệ thống: Thủ tục lưu trữ (Stored Procedure) sẽ thẩm tra tính toàn vẹn của Serial Number, kiểm tra đồ gá Carrier và tự động nạp liên hoàn toàn bộ bản ghi dữ liệu công đoạn từ Step 1 cho đến TargetStep trên máy chủ SFC.

5. **Cụm nút hành động thực thi & Làm sạch form:**
   - **Nút hành động chính:** **`[📥 Thực thi nạp bù seri thủ công]`**.
   - **Mã lệnh / Stored Procedure thực thi:** `Shared_ManualInsertSN` (`[AutoLine].[Shared_ManualInsertSn]`).
   - **Nút phụ:** `[Làm Sạch Form]` (Xóa trắng các ô nhập liệu về trạng thái ban đầu).
   - **Hiệu ứng & Kiểm tra hợp lệ (Validation):**
     * Yêu cầu nhập đầy đủ: Serial Number, Carrier Code, Model, Dây chuyền và Target Step.
     * Hiển thị trạng thái xoay loading spinner (`Đang nạp bù dữ liệu qua Stored Procedure...`) khi đang phát lệnh.

6. **Tích hợp Console Log thời gian thực:**
   - Khi bấm nút `[📥 Thực thi nạp bù seri thủ công]`, hệ thống ghi nhận ngay bản tin vào `ALABEL Execution Logs Console` ở tầng dưới cùng:
     * Action: `MANUAL_INSERT_SN` (`Shared_ManualInsertSN`).
     * Target: `{sn} | Carrier: {carrierCode}`.
     * Line: `{line}` | TargetStep: `{targetStep}`.
     * Operator: Mã nhân viên tự động truy xuất từ tài khoản đăng nhập.
     * Message: `[MANUAL_INSERT_OK] Đã nạp bù dữ liệu SNDetails thành công từ Step 1 đến Step {targetStep} qua SP [AutoLine].[Shared_ManualInsertSn] cho SN {sn} (Khay: {carrierCode}, Chuyền: {line}, Model: {model}). Nhân viên: {operatorId}.`
     * Response status, số lượng bản ghi đã chèn (rowsInserted) và độ trễ latency ms.

#### 5.3.5. Đặc Tả Chi Tiết Sub-Tab 5: `đổi keypart` (Hoán Đổi & Cập Nhật Giá Trị Keypart - sndetaildatas)

Nghiệp vụ **Đổi Keypart / Hoán Đổi Giá Trị Linh Kiện** phục vụ kỹ sư trong các tình huống can thiệp sửa chữa (Rework / Repair), thay thế linh kiện con bị lỗi (hỏng chip, chân tiếp xúc lỗi, barcode mờ, v.v.) bằng linh kiện mới đạt chuẩn mà không làm gián đoạn chu trình lắp ráp. Thao tác này kích hoạt cập nhật trực tiếp cấu trúc linh kiện và giá trị barcode mới vào bảng dữ liệu chi tiết `sndetaildatas` trên hệ thống máy chủ ALABEL / SFC:

1. **Trường Text Nhập Mã Đối Tượng & Tab Chuyển Đổi (SN / Carrier):**
   - **Thanh tab chuyển đổi đối tượng:** Đặt ngay trên ô nhập liệu với 2 nút chuyển đổi trực quan:
     - `[★ Serial Number (SN)]`: Dành cho sản phẩm đã được bắn số SN cố định.
     - `[ Carrier RFID / Pallet ]`: Dành cho khay chứa Pallet hoặc thẻ RFID mang sản phẩm di chuyển trên chuyền tự động.
   - **Ô text nhập mã đối tượng (Text Input):**
     - Placeholder và nhãn thay đổi linh hoạt theo tab được chọn (ví dụ: `Nhập Serial Number (SN)...` hoặc `Nhập mã khay Carrier RFID...`).
     - Cơ chế kế thừa: Tự động trích xuất và điền sẵn mã đối tượng nếu kỹ thuật viên đã tra cứu thành công ở khung *Tra cứu tiến trình* bên trái.
     - Hỗ trợ quét barcode/RFID trực tiếp từ máy quét cầm tay hoặc đầu đọc cố định tại trạm.

2. **Dòng Sản Phẩm & Mã Nhân Viên (Lưới 2 Cột Đồng Bộ):**
   - **Dòng sản phẩm (Model / Product Line):**
     - Hiển thị dưới dạng **Dropdown menu** liệt kê danh mục dòng sản phẩm kích hoạt trong CSDL (`HGX B200 NVL`, `GB200 NVL72`, `HGX H100 SXM5`...).
     - Tự động nhận diện và chọn sẵn nếu mã SN/Carrier đã có trong hệ thống, hoặc cho phép kỹ thuật viên chọn thủ công từ dropdown để đảm bảo đúng BOM cấu hình.
   - **Mã nhân viên (Operator ID):**
     - **Cơ chế tự truy xuất sau khi đăng nhập thành công:** Tự động lấy ra mã thẻ nhân viên (`cardId` hoặc `username`, ví dụ: `NV-2026-08819`) từ phiên đăng nhập tài khoản hiện tại (`state.auth`).
     - **Quy tắc bảo mật nghiêm ngặt:** Trường text này ở trạng thái **Chỉ đọc (Read-only / Disabled)** kèm biểu tượng ổ khóa bảo mật (`🔒`), kỹ thuật viên **hoàn toàn không thể tự ý sửa đổi**.
     - **Ý nghĩa kiểm toán (Audit Trail):** Ghi nhận trung thực 100% trách nhiệm của nhân sự phát lệnh can thiệp thay đổi linh kiện trên dây chuyền tự động hóa Foxconn & NVIDIA.

3. **Dropdown Menu Chọn Keypart & Ô Text Nhập Giá Trị Mới (Lưới 2 Cột):**
   - **Chọn Keypart (Keypart / Key Name Dropdown):**
     - Hiển thị dưới dạng **Dropdown menu** danh mục các linh kiện con trong cấu trúc BOM của sản phẩm (ví dụ: `MOTHERBRD`, `GPU_01`, `GPU_02`, `HEATSINK`, `MAC_ADDR`, `CPU_SOCKET`, `RAM_SLOT_01`, `POWER_STAGE`...).
     - Cho phép kỹ sư chọn nhanh loại linh kiện cần can thiệp hoán đổi mã.
   - **Ô text nhập giá trị mới (New Keypart Barcode / Value):**
     - Ô text cho phép nhập mã vạch / serial định danh mới của linh kiện con thay thế (ví dụ: `GPU-NV-01-REV2-9901`).
     - Hỗ trợ quét barcode nhanh từ đầu đọc quang học của trạm sửa chữa. Bắt buộc nhập (`*`).

4. **Nút Hành Động Thực Thi (Action Button) & Lưu Ý Nghiệp Vụ:**
   - **Nút hành động chính:** **`[🔄 Xác nhận thay đổi giá trị keypart]`**.
   - **Tác vụ / Bảng CSDL thao tác:** `sndetaildatas` (Cập nhật bản ghi linh kiện con trong bảng `[AutoLine].[SNDetailDatas]`).
   - **Nút phụ:** `[Làm Sạch Form]` để xóa nhanh các trường nhập về trạng thái ban đầu.
   - **Hiệu ứng & Kiểm tra hợp lệ (Validation):**
     - Hiển thị loading spinner (`Đang cập nhật giá trị keypart trong sndetaildatas...`) trong suốt quá trình phát lệnh.
     - Kiểm tra bắt buộc: Đã nhập mã đối tượng (SN/Carrier), đã xác định dòng sản phẩm, đã chọn keypart từ dropdown và đã nhập giá trị mới.

5. **Tích Hợp Console Log Thời Gian Thực:**
   - Khi bấm nút `[🔄 Xác nhận thay đổi giá trị keypart]`, hệ thống đóng gói đầy đủ payload gửi lên server và lập tức ghi nhận bản tin vào `ALABEL Execution Logs Console` ở tầng dưới cùng:
     - Action: `CHANGE_KEYPART_VALUE` (`sndetaildatas`).
     - Target: `{targetType.toUpperCase()}: {targetCode}` | Key: `{selectedKeypart}`.
     - New Value: `{newKeypartValue}`.
     - Operator: Mã nhân viên tự động truy xuất từ tài khoản đăng nhập.
     - Message: `[CHANGE_KEYPART_OK] Đã xác nhận thay đổi giá trị keypart '{selectedKeypart}' thành '{newKeypartValue}' trong bảng sndetaildatas cho {targetType} '{targetCode}' (Model: {model}). Nhân viên: {operatorId}.`
     - Response status, mã phản hồi SFC và độ trễ latency ms.

#### 5.3.6. Đặc Tả Chi Tiết Sub-Tab 6: `sndetails` (Tra Cứu Bản Ghi Hồ Sơ Dữ Liệu Bảng sndetails)

Nghiệp vụ **Tra Cứu Bảng SNDetails** phục vụ kỹ sư phân tích, kiểm định chất lượng (QA/QC), kiểm toán dữ liệu và truy vết toàn diện lịch sử các thuộc tính, thông số kỹ thuật, tem nhãn mã vạch, các khóa linh kiện liên kết (Keyparts) và trạng thái của sản phẩm được lưu trữ trong bảng CSDL `sn_detail` / `sndetaildatas` trên hệ thống máy chủ ALABEL / SFC:

1. **Trường Text Nhập Mã Đối Tượng & Tab Chuyển Đổi (SN / Carrier):**
   - **Thanh tab chuyển đổi đối tượng:** Đặt ngay trên ô nhập liệu với 2 nút chuyển đổi trực quan:
     - `[★ Serial Number (SN)]`: Tra cứu dữ liệu chi tiết bảng `sndetails` theo số serial định danh chính của sản phẩm.
     - `[ Carrier RFID / Pallet ]`: Tra cứu toàn bộ các bản ghi `sndetails` gắn liền với khay/Pallet đồ gá hoặc thẻ RFID đang lưu hành trên chuyền.
   - **Ô text nhập mã đối tượng (Text Input):**
     - Placeholder và nhãn thay đổi linh hoạt theo tab được chọn (ví dụ: `Nhập Serial Number tra cứu (ví dụ: SN8839210492-NV)...` hoặc `Nhập mã khay Carrier RFID (ví dụ: CARRIER-RFID-8819)...`).
     - Cơ chế kế thừa tự động: Tự động trích xuất và điền sẵn mã đối tượng nếu kỹ thuật viên đã tra cứu thành công ở khung *Tra cứu tiến trình* bên trái.
     - Hỗ trợ phím tắt `Enter`, nút xóa nhanh `✕` và quét barcode/RFID trực tiếp từ đầu đọc.

2. **Dòng Sản Phẩm & Giới Hạn Bản Ghi (Lưới 2 Cột):**
   - **Dòng sản phẩm (Model / Product Line - Tùy chọn):**
     - Hiển thị dưới dạng **Dropdown menu** liệt kê danh mục dòng sản phẩm kích hoạt trong CSDL (`HGX B200 NVL`, `GB200 NVL72`, `HGX H100 SXM5`...).
     - **Tính chất Tùy chọn (Optional):**
       - Lựa chọn mặc định: `Tất Cả Dòng Sản Phẩm (Mặc định)`.
       - Cho phép kỹ sư chọn một Model cụ thể để lọc hẹp phạm vi bản ghi hoặc để hệ thống tự động giải mã theo tiền tố của SN/Carrier.
   - **Giới hạn bản ghi (Top Limit Dropdown Menu):**
     - Dropdown menu cho phép chọn giới hạn số lượng bản ghi trả về từ CSDL:
       - `50 bản ghi` (Truy vấn nhanh).
       - `100 bản ghi` (Khuyến nghị mặc định).
       - `200 bản ghi`.
       - `500 bản ghi`.
       - `1000 bản ghi` (Toàn bộ lịch sử chi tiết tối đa).
     - **Mục đích kỹ thuật:** Tối ưu hóa hiệu năng truy vấn SQL Server, ngăn chặn nghẽn băng thông mạng công nghiệp và tránh giật lag trình duyệt khi sản phẩm trải qua nhiều vòng rework tích lũy lượng lớn dữ liệu.

3. **Cụm Nút Hành Động Thực Thi & Thao Tác Bổ Trợ:**
   - **Nút hành động chính:** **`[🔍 Thực thi tra cứu bảng sndetails]`**.
   - **Nút phụ:**
     - `[Làm Sạch Form]`: Xóa trắng ô tìm kiếm và đặt lại bộ lọc.
     - `[Xuất CSV / JSON]`: Xuất danh sách bản ghi hiển thị thành file phục vụ báo cáo kỹ thuật.
   - **Hiệu ứng & Trạng thái tải:**
     - Hiển thị loading spinner (`Đang truy vấn bảng sndetails...`) trong khi gửi request đến server.
     - Báo lỗi hoặc nhắc nhở nếu chưa nhập mã đối tượng tra cứu.

4. **Bảng Hiển Thị Kết Quả Tra Cứu SNDetails Đa Cột (Data Table):**
   - Hiển thị danh sách các thuộc tính chi tiết với thiết kế tối ưu hiển thị, gồm các cột:
     - `STT / ID`: Số thứ tự bản ghi hoặc ID định danh.
     - `Thuộc Tính (Key Name / Attribute)`: Tên khóa thuộc tính (ví dụ: `bios_uuid`, `mac_eth0`, `mac_eth1`, `vendor_pn`, `board_rev`, `carrier_rfid`...).
     - `Giá Trị (Key Value)`: Dữ liệu thực tế được lưu trữ (kèm nút copy 1 chạm `📋` và hiển thị font monospaced).
     - `Công Đoạn / Trạm (Station / Step)`: Mã trạm đã ghi nhận thuộc tính (ví dụ: `ST01-FEEDER`, `ST02-SMT-SURFACE`, `ST03-SMT-A`...).
     - `Thời Gian Cập Nhật (Updated At)`: Tem thời gian bản ghi được tạo hoặc sửa đổi.
     - `Trạng Thái (Status)`: Huy hiệu trạng thái bản ghi (`ACTIVE`, `COMPENSATED`, `UPDATED`, `HOLD`).
   - Tích hợp thanh tìm kiếm nhanh trong bảng và bộ đếm tổng số bản ghi: `Hiển thị X / Y bản ghi`.

5. **Tích Hợp Console Log Thời Gian Thực:**
   - Khi bấm nút `[🔍 Thực thi tra cứu bảng sndetails]`, hệ thống ghi nhận ngay bản tin vào `ALABEL Execution Logs Console` ở tầng dưới cùng:
     - Action: `SNDETAILS_FETCH`.
     - Target: `{targetType.toUpperCase()}: {targetCode}` | Limit: `{topLimit}`.
     - Message: `[SNDETAILS_OK] Truy vấn thành công bảng sndetails cho {targetType} '{targetCode}' (Model: {model || 'TẤT CẢ'}). Đã tải {recordCount} bản ghi (Top Limit: {topLimit}).`
     - Độ trễ latency ms và trạng thái phản hồi từ server.

#### 5.3.7. Đặc Tả Chi Tiết Sub-Tab 7: `error logs` (Tra Cứu Bản Ghi Lịch Sử Lỗi Bảng ErrorLogs)

Nghiệp vụ **Tra Cứu Bản Ghi Lỗi ErrorLogs** phục vụ kỹ sư bảo trì dây chuyền, kỹ sư chất lượng (QA/QC) và chuyên viên tự động hóa theo dõi, phân tích nguyên nhân gốc rễ (Root Cause Analysis - RCA) các cảnh báo, lỗi quét mã, lỗi lệch Jig, tín hiệu RFID yếu hoặc từ chối điều kiện router SFC phát sinh tại các trạm dán nhãn và công đoạn tự động ALABEL:

1. **Trường Text Nhập Mã Đối Tượng & Tab Chuyển Đổi (SN / Carrier):**
   - **Thanh tab chuyển đổi đối tượng:** Đặt ngay trên ô nhập liệu với 2 nút chuyển đổi linh hoạt:
     - `[★ Serial Number (SN)]`: Tra cứu toàn bộ lịch sử lỗi phát sinh liên quan đến sản phẩm theo số Serial.
     - `[ Carrier RFID / Pallet ]`: Tra cứu các sự cố lỗi gắn với mã khay chứa đồ gá hoặc thẻ RFID lưu thông trên băng chuyền.
   - **Ô text nhập mã đối tượng (Text Input):**
     - Placeholder và nhãn thay đổi linh hoạt theo tab được chọn (ví dụ: `Nhập Serial Number tra cứu lỗi (ví dụ: SN8839210492-NV)...` hoặc `Nhập mã khay Carrier RFID (ví dụ: CARRIER-RFID-8819)...`).
     - Cơ chế kế thừa tự động: Tự động trích xuất và điền sẵn mã đối tượng nếu kỹ thuật viên đã tra cứu thành công ở khung *Tra cứu tiến trình* bên trái.
     - Cho phép để trống nếu kỹ sư muốn tra cứu toàn bộ lỗi của trạm hoặc dây chuyền chỉ định mà không giới hạn riêng theo một mã đối tượng.
     - Tích hợp phím tắt `Enter`, nút xóa nhanh `✕` và quét barcode/RFID trực tiếp.

2. **Hệ Thống Dropdown Menu Bộ Lọc Đa Chiều (Multi-Dropdown Filter System):**
   Được bố trí khoa học dạng lưới đáp ứng (Responsive Grid đa cột) giúp kỹ sư thu hẹp phạm vi tìm kiếm sự cố chính xác:
   - **Dropdown 1: Dòng sản phẩm (Model / Product Line):**
     - Liệt kê danh mục dòng sản phẩm kích hoạt trong CSDL (`HGX B200 NVL`, `GB200 NVL72`, `HGX H100 SXM5`...).
     - Lựa chọn mặc định: `-- Tất Cả Dòng Sản Phẩm --`.
   - **Dropdown 2: Loại sản phẩm (Product Type):**
     - Phân loại phần cứng cấu kiện công nghiệp: `Tất Cả Loại Sản Phẩm`, `GPU Module Board`, `Baseboard Motherboard`, `NVLink Switch Tray`, `Power Supply Unit Tray`, `Compute Blade`.
   - **Dropdown 3: Tên chuyền (Production Line Name):**
     - Danh sách các dây chuyền sản xuất tự động: `Tất Cả Dây Chuyền`, `LINE_01_NVL72`, `LINE_02_B200`, `LINE_03_REWORK`, `LINE_04_QC_HOLD`.
   - **Dropdown 4: Nguồn lỗi (Error Source):**
     - Phân loại nguồn gốc phát sinh lỗi: `Tất Cả Nguồn Lỗi`, `PLC Trạm (Station PLC)`, `Camera AI Scanner`, `Đầu Đọc RFID (RFID Reader)`, `Cổng Giao Tiếp SFC Gateway`, `Cảm Biến Laser / Quang Học (Sensors)`, `Người Thao Tác (Operator)`.
   - **Dropdown 5: Giai đoạn (Process Stage / Phase):**
     - Giai đoạn quy trình sản xuất: `Tất Cả Giai Đoạn`, `SMT Surface Mount`, `Board Assembly`, `ICT Test In-Circuit`, `Pressfit Cơ Khí`, `Rework & Repair`, `QC Kiểm Định`.
   - **Dropdown 6: Trạm (Station / Station Group):**
     - Danh mục các trạm công đoạn trên dây chuyền: `Tất Cả Các Trạm`, `ST01-FEEDER`, `ST02-SMT-SURFACE`, `ST03-SMT-A`, `ST04-ICT-TEST`, `ST05-PRESSFIT`, `ST06-REWORK-LINE`, `ST07-QC-HOLD`.
   - **Dropdown 7: Giới hạn bản ghi (Top Limit):**
     - Dropdown menu chọn số lượng bản ghi trả về tối đa: `50 bản ghi (Nhanh)`, `100 bản ghi (Khuyến nghị mặc định)`, `200 bản ghi`, `500 bản ghi`, `1000 bản ghi (Tối đa)`.

3. **Cụm Nút Hành Động Thực Thi & Thao Tác Bổ Trợ:**
   - **Nút hành động chính:** **`[⚠️ Thực thi tra cứu bảng ErrorLogs]`**.
   - **Nút phụ:**
     - `[Làm Sạch Bộ Lọc]`: Đặt lại các trường tìm kiếm và dropdown về giá trị mặc định ban đầu.
     - `[Xuất Báo Cáo Lỗi CSV / JSON]`: Xuất danh sách sự cố phục vụ họp giao ban sản xuất và cải tiến quy trình.
   - **Hiệu ứng & Kiểm tra hợp lệ:**
     - Hiển thị loading spinner (`Đang truy vấn bảng ErrorLogs...`) trong suốt quá trình gửi truy vấn.

4. **Bảng Hiển Thị Kết Quả ErrorLogs Đa Cột (Error Data Table):**
   - Danh sách bản ghi sự cố được trình bày trực quan với các trường:
     - `Mã Lỗi (Error Code)`: Tên định danh mã lỗi kỹ thuật (ví dụ: `ERR_BARCODE_MISMATCH`, `WARN_RFID_SIGNAL_WEAK`, `ERR_ROUTER_SEQUENCE_CONFLICT`).
     - `Mức Độ (Severity / Level)`: Huy hiệu màu sắc trực quan (`CRITICAL` - Đỏ sẫm, `ERROR` - Đỏ tươi, `WARNING` - Vàng hổ phách, `INFO` - Xanh dương).
     - `Nguồn Lỗi (Source)`: Chỉ báo thiết bị/hệ thống phát sinh lỗi.
     - `Dây Chuyền & Trạm (Line / Station)`: Vị trí cụ thể phát sinh sự cố trên chuyền.
     - `Giai Đoạn (Stage)`: Công đoạn dây chuyền xảy ra lỗi.
     - `Thời Gian (Timestamp)`: Tem thời gian chính xác tới giây.
     - `Mô Tả Chi Tiết (Message)`: Nội dung thông điệp lỗi và nguyên nhân kỹ thuật.
     - `Tài Liệu Xử Lý SOP (SOP Guide)`: Nút liên kết mở tài liệu hướng dẫn xử lý chuẩn cho công nhân/kỹ sư trạm (ví dụ `SOP-SFC-MOD-042`).
   - Tích hợp ô lọc nhanh theo từ khóa nội bộ và bộ đếm tổng số sự cố phát hiện.

5. **Tích Hợp Console Log Thời Gian Thực:**
   - Khi bấm nút `[⚠️ Thực thi tra cứu bảng ErrorLogs]`, hệ thống đóng gói đầy đủ payload gửi lên server và lập tức ghi nhận bản tin vào `ALABEL Execution Logs Console` ở tầng dưới cùng:
     - Action: `ERROR_LOGS_QUERY`.
     - Target: `{targetType.toUpperCase()}: {targetCode || 'TẤT CẢ'}` | Station: `{station || 'TẤT CẢ'}` | Source: `{errorSource || 'TẤT CẢ'}`.
     - Message: `[ERROR_LOGS_OK] Truy vấn thành công bảng ErrorLogs cho {targetType} '{targetCode || 'TẤT CẢ'}' (Trạm: {station || 'ALL'}, Chuyền: {line || 'ALL'}, Nguồn: {errorSource || 'ALL'}). Đã tải {errorCount} bản ghi lỗi (Top Limit: {topLimit}).`
     - Độ trễ latency ms và trạng thái phản hồi từ server.

---

### 5.4. Khối Phía Dưới: Mục Log Thực Thi Thao Tác ALABEL (ALABEL Execution Logs)

Nằm ở phía dưới toàn bộ 2 khối trên (trải dài **Full Width 100%**), đóng vai trò là **Terminal Giám Sát Thời Gian Thực (Audit & Execution Console)**:

1. **Hiển thị thông tin nhật ký chi tiết:**
   - `Timestamp`: Tem thời gian chính xác tới millisecond (ví dụ `[09:50:12.140]`).
   - `Level Badge`: Trạng thái thực thi trực quan:
     - `SUCCESS` (Xanh lục / Emerald `#76B900`): Lệnh thực thi thành công trên ALABEL Service.
     - `ERROR` (Đỏ rực / Crimson `#EF4444`): Lỗi xử lý, sai Router hoặc vi phạm nghiệp vụ.
     - `WARNING` (Vàng hổ phách / Amber `#F59E0B`): Cảnh báo xung đột hoặc cần xác nhận lại.
     - `INFO` (Xanh dương / Sky Blue): Bản tin thông báo trạng thái tra cứu.
   - `Action Type`: Tên thao tác vừa thực hiện (`UNDO_RESET`, `TRANSFER`, `CLEAR_UNDO`, `COMPENSATE_DETAIL`, `CHANGE_KEYPART`, `SNDETAILS_FETCH`, `ERROR_LOGS_QUERY`).
   - `Target Identifier`: Định danh đối tượng (SN / Carrier RFID / Keypart).
   - `Message & Response Code`: Thông điệp phản hồi từ server, mã kết quả HTTP / SFC Status, độ trễ xử lý (Latency tính theo ms).
   - `Raw JSON Details`: Cho phép nhấp vào dòng log để mở rộng xem trọn vẹn Request Payload & Response Body phục vụ gỡ lỗi chuyên sâu.

2. **Thanh công cụ điều khiển Console (Console Toolbar):**
   - **Bộ lọc trạng thái:** Dropdown / segmented chips chuyển đổi lọc theo `TẤT CẢ (ALL)`, `SUCCESS`, `ERROR`, `WARN`, `INFO` (hỗ trợ cuộn ngang mượt mà trên thiết bị di động).
   - **Ô tìm kiếm tức thì:** Tìm kiếm log theo từ khóa SN, mã trạm, mã lỗi hoặc tên action, tích hợp nút xóa nhanh (`✕`).
   - **Nút Xóa Terminal `[🧹 Xóa]`:** Làm sạch màn hình hiển thị log hiện tại (tự động rút gọn nhãn trên màn hình nhỏ).
   - **Nút Xuất File `[📥 Xuất Log]`:** Xuất danh sách nhật ký thực thi thành định dạng `.json`.
   - **Tùy chọn Tự Động Cuộn `[Auto-scroll]`:** Bật/tắt chế độ tự động cuộn xuống dòng mới nhất khi có bản tin mới kèm chỉ báo xung nhịp (pulse dot).

3. **Thiết Kế Tối Ưu Hóa Responsive Đa Độ Phân Giải (Mobile, Tablet, Desktop):**
   - **Chế độ Màn Hình Lớn (`>= md` Desktop & Tablet Ngang):**
     - Hiển thị dạng hàng đơn monospaced tinh gọn chuẩn terminal kỹ thuật.
     - Phân bổ cột tỷ lệ cố định: `Timestamp` (w-24) | `Level Badge` (w-18) | `Action Tag` | `Target Pill` (nền hổ phách) | `Message` (co giãn, truncate) | `Latency ms` | `Nút [▼ JSON]`.
     - Viền trái `border-l-4` đổi màu trực quan theo mức độ (Xanh lục: SUCCESS, Đỏ: ERROR, Vàng: WARN, Xanh lam: INFO).
   - **Chế độ Màn Hình Nhỏ (`< md` Mobile & Tablet Dọc):**
     - Chuyển đổi thông minh sang thẻ Card phân tầng 3 lớp, triệt tiêu hiện tượng ngắt dòng lộn xộn:
       - **Tầng 1 (Meta Header):** Level badge, Action tag, Latency ms (`⚡ 24ms`), Time và nút bấm toggle `▼ JSON`.
       - **Tầng 2 (Target Identifier):** Thẻ định danh nổi bật `Target: {log.target}`.
       - **Tầng 3 (Message Body):** Hiển thị trọn vẹn thông điệp và mô tả lỗi (break-words, không cắt cụt) giúp kỹ sư đọc rõ nguyên nhân sự cố ngay trên điện thoại/máy tính bảng.
   - **Khung Soi Dữ Liệu JSON (JSON Inspector):**
     - Tự động chia lưới 2 cột (`grid-cols-2`) trên màn hình lớn và xếp chồng 1 cột trên điện thoại.
     - Tích hợp nút `Sao chép` một chạm cho từng khối Request Payload và Response Body với phản hồi `✓ Đã chép`.
   - **Thanh Tóm Tắt Chân Trang (Footer Summary):**
     - Hiển thị bộ đếm thời gian thực: `Success: X`, `Errors: Y`, `Warnings: Z`, `Info: W`, trạng thái `Auto-scroll` và `Filter`.

---

## 6. ĐẶC TẢ CHI TIẾT PHÂN HỆ ACTION LOGS & RESTORE (TAB 4 - NHẬT KÝ KIỂM TOÁN & PHỤC HỒI TRẠNG THÁI)

Phân hệ **Action Logs & Restore** (`activeTab === 'action_logs'`) là trung tâm kiểm soát an toàn, ghi vết kiểm toán (audit trail) và hỗ trợ hoàn nguyên dữ liệu (state rollback / disaster recovery) cho toàn bộ dây chuyền tự động hóa. Mọi tác vụ can thiệp vào router, nạp bù linh kiện, chuyển khay hay cấu hình thiết bị đều được lưu vết chi tiết phục vụ điều tra lỗi và đối soát dữ liệu.

### 6.1. Khung Chứa Các Trường Thông Tin Lọc (Action Logs Filter Toolbar)

Khung bộ lọc được bố trí ngang phía trên màn hình, hỗ trợ kỹ sư và trưởng ca tra cứu nhanh lịch sử thao tác theo nhiều chiều nghiệp vụ:

1. **Bộ chọn khoảng thời gian (Date-Time Range Picker):**
   - **Từ ngày (From Date):** Trường chọn ngày giờ bắt đầu (`YYYY-MM-DD HH:mm:ss`), mặc định là 00:00 của ngày làm việc gần nhất.
   - **Đến ngày (To Date):** Trường chọn ngày giờ kết thúc (`YYYY-MM-DD HH:mm:ss`), mặc định là thời điểm hiện tại (`now`).
   - Có cơ chế kiểm tra tính hợp lệ: `From Date <= To Date`.

2. **Bộ lọc Hành động (Action Type Filter Dropdown):**
   - Dropdown đơn chọn với đầy đủ 9 nhóm nghiệp vụ can thiệp:
     - `Tất cả hành động (ALL)` (Mặc định).
     - `undo`: Hoàn tác bước router của sản phẩm về step trước.
     - `reset`: Reset chu kỳ sản phẩm hoặc trạm về Step 0.
     - `transfer`: Chuyển máy / điều chuyển trạm hoặc khay đồ gá Carrier RFID.
     - `rework`: Đưa sản phẩm vào luồng sửa chữa / làm lại.
     - `giải undo/rework`: Gỡ cờ khóa lỗi, giải phóng sản phẩm bị chặn undo/rework (`shared_clearundorework`).
     - `sửa keypart`: Sửa đổi, hoán đổi mã vạch linh kiện trong bảng `sndetaildatas`.
     - `bù dữ liệu thủ công`: Nạp bù thông tin SN và linh kiện qua Stored Procedure `[AutoLine].[Shared_ManualInsertSn]`.
     - `restore`: Tác vụ hoàn nguyên snapshot dữ liệu về trạng thái trước đó.

3. **Bộ lọc Phân hệ (Subsystem Filter Dropdown):**
   - Phân loại rõ nguồn gốc phát sinh thao tác:
     - `Tất cả phân hệ (ALL)` (Mặc định).
     - `ALabel Helpers`: Can thiệp nghiệp vụ dán nhãn, RFID Carrier, Router và Keyparts.
     - `Machine Config`: Can thiệp cấu hình máy, PLC Gateway, Station IP, Recipe.
     - `General`: Tác vụ chung hệ thống, SFC Switch/Adapter và phân quyền tài khoản.

4. **Trường Text Tìm Kiếm Nhanh (Search Keyword Input):**
   - Placeholder hiển thị rõ ràng: `Mã thẻ, SN, Carrier, bảng đích...`.
   - Cơ chế tìm kiếm đa mục tiêu: Tìm khớp theo mã thẻ nhân viên (`operatorId`), số serial sản phẩm (`sn`), mã pallet (`carrierCode`), tên bảng dữ liệu CSDL (`tableName`) hoặc từ khóa trong phần mô tả chi tiết.
   - Hỗ trợ phím tắt `Enter` để kích hoạt tìm kiếm và nút `✕` xóa nhanh từ khóa.

5. **Bộ Nút Hành Động Điều Khiển:**
   - **Nút `[🔍 Thực Thi Lọc Dữ Liệu]`:** Gửi query truy vấn CSDL với các tham số đã chọn.
   - **Nút `[🧹 Làm Sạch Bộ Lọc]`:** Reset toàn bộ bộ lọc về trạng thái mặc định (hôm nay, tất cả hành động, tất cả phân hệ).
   - **Nút `[📥 Xuất Báo Cáo Kiểm Toán]`:** Xuất danh sách nhật ký kiểm toán đang xem ra file định dạng Excel / CSV.

---

### 6.2. Bảng Dữ Liệu Nhật Ký Tác Vụ & Điều Khiển Phân Trang (Action Logs Table & Row Limit)

Bảng nhật ký kiểm toán hiển thị danh sách các bản ghi can thiệp hệ thống với đầy đủ thông số pháp lý và kỹ thuật:

1. **Bộ Điều Khiển Phân Trang & Lọc Theo Số Dòng (Page Size / Rows Per Page):**
   - Đặt ở phía trên góc trái bảng: Dropdown `Lọc theo số dòng` với các mức: `10 dòng / trang`, `25 dòng / trang` (Mặc định), `50 dòng / trang`, `100 dòng / trang`.
   - Hiển thị tóm tắt: `Hiển thị 1 - 25 trong tổng số 128 bản ghi kiểm toán`.
   - Điều hướng trang: `[⏮ Đầu] [◀ Trước] [Trang X / Y] [Sau ▶] [Cuối ⏭]`.

2. **Cấu Trúc Các Cột Dữ Liệu Chuẩn Kiểm Toán (10 Cột):**
   - **Cột 1: `ID` (Action ID):** Mã định danh duy nhất của lượt thao tác (ví dụ: `ACT-2026-008819`), font chữ monospaced, hỗ trợ nút sao chép nhanh.
   - **Cột 2: `Thời Gian` (Timestamp):** Ngày giờ thực hiện chính xác đến giây (`YYYY-MM-DD HH:mm:ss`).
   - **Cột 3: `Người Thực Hiện` (Operator / Performed By):** Mã nhân viên thực thi (ví dụ: `NV-2026-08819` kèm huy hiệu bảo mật 🔒 trích xuất từ phiên đăng nhập hợp lệ).
   - **Cột 4: `Hành Động` (Action Type):** Badge màu sắc trực quan:
     - `UNDO` / `RESET`: Màu Tím (Indigo/Purple).
     - `TRANSFER`: Màu Xanh Ngọc (Cyan/Teal).
     - `REWORK` / `GIẢI UNDO/REWORK`: Màu Hổ Phách (Amber).
     - `SỬA KEYPART`: Màu Cam (Orange).
     - `BÙ DỮ LIỆU`: Màu Xanh Lam (Blue).
     - `RESTORE`: Màu Đỏ Hồng (Rose/Crimson).
   - **Cột 5: `Bảng Đích` (Target Table):** Tên bảng CSDL bị can thiệp (ví dụ: `sndetails`, `sndetaildatas`, `wip_router_station`, `carrier_tracking`, `ErrorLogs`). Font monospace kèm tag biểu tượng database.
   - **Cột 6: `Mục Tiêu` (Target Subject):** Mã đối tượng bị tác động (`SN` hoặc `Carrier RFID`), hiển thị tag nhận diện `[SN]` hoặc `[CARRIER]`.
   - **Cột 7: `Mô Tả Chi Tiết` (Description):** Tóm tắt nội dung thay đổi (ví dụ: `Hoàn tác từ Step 030 về Step 020`, `Đổi Keypart GPU_01 từ GPU-NV-01 sang GPU-NV-02`...).
   - **Cột 8: `Trạng Thái` (Status):** Badge kết quả:
     - `SUCCESS` (Xanh lục / Emerald `#76B900`): Thực thi thành công.
     - `FAILED` (Đỏ rực / Crimson `#EF4444`): Lỗi khi thực thi.
     - `WARNING` (Hổ phách / Amber `#F59E0B`): Thành công có cảnh báo.
     - `RESTORED` (Xám Slate / Tím): Đã được hoàn nguyên phục hồi về trạng thái cũ.
   - **Cột 9: `Thao Tác` (Operations):** Nhóm 3 nút hành động chuyên sâu:
     1. **`[👁️ Xem Chi Tiết]`:** Mở modal xem toàn bộ thông tin chi tiết: Client IP, Hostname, Session ID, Chi tiết Stored Procedure / SQL Query đã chạy, Input Payload và Response Data.
     2. **`[⚖️ Đối Soát Diff Old/New]`:** Mở modal so sánh trực quan dữ liệu trước và sau khi thay đổi (Before vs After Visual Diff).
     3. **`[⏪ Restore]`:** Nút phục hồi dữ liệu về trạng thái trước đó. Tự động vô hiệu hóa (`disabled`) nếu bản ghi đã bị phục hồi trước đó hoặc là bản ghi chỉ đọc.

---

### 6.3. Khung / Modal Đối Soát Diff Old/New Trực Quan (Visual Diff Inspector Modal)

Modal hiển thị khi người dùng bấm vào nút `[⚖️ Đối Soát Diff Old/New]` trên bất kỳ dòng log nào:

1. **Bố cục so sánh song song hai cột (Side-by-Side Diff Layout):**
   - **Cột Trái (Dữ Liệu Trước Khi Thực Hiện - Old / Before State):**
     - Nền đỏ nhạt (`bg-rose-500/10 border-rose-500/20`), tiêu đề `🔴 Trạng Thái Cũ (Trước Khi Tác Vụ)`.
     - Hiển thị snapshot trạng thái của bản ghi trước khi bị thay đổi (ví dụ: `step_id: 030`, `carrier_id: RFID-8819`, `keypart_val: GPU-NV-01`).
   - **Cột Phải (Dữ Liệu Sau Khi Thực Hiện - New / After State):**
     - Nền xanh lục nhạt (`bg-emerald-500/10 border-emerald-500/20`), tiêu đề `🟢 Trạng Thái Mới (Sau Khi Tác Vụ)`.
     - Hiển thị dữ liệu thực tế sau khi câu lệnh thực thi hoàn tất (ví dụ: `step_id: 020`, `carrier_id: RFID-9940`, `keypart_val: GPU-NV-02`).

2. **Tính năng phân tích và làm nổi bật (Diff Highlighting):**
   - Đánh dấu màu nền (highlight) riêng cho các trường giá trị có sự biến động (Field Changed Tag).
   - Hỗ trợ chuyển đổi giữa 2 chế độ xem:
     - `Dạng Bảng So Sánh Thuộc Tính (Key-Value Diff Table)`: Dễ đọc cho kỹ sư vận hành.
     - `Dạng JSON Cấu Trúc (Raw JSON Diff)`: Phục vụ kỹ sư phần mềm / DBA truy vết chuyên sâu.
   - Nút `Sao chép JSON Diff` và `Đóng hộp thoại`.

---

### 6.4. Quy Trình & Modal Xác Nhận Phục Hồi An Toàn (Safe Restore Workflow Modal)

Modal hiển thị khi người dùng bấm vào nút `[⏪ Restore]`:

1. **Cơ Chế Cảnh Báo An Toàn Cấp Độ Cao (High-Risk Operation Warning):**
   - Hộp thoại cảnh báo màu vàng hổ phách / đỏ:
     > ⚠️ **CẢNH BÁO BẢO VỆ DÂY CHUYỀN:** Thao tác Phục hồi (Restore) sẽ ghi đè lại trạng thái CSDL của đối tượng về thời điểm trước khi thực hiện hành động này. Thao tác này có thể ảnh hưởng đến thứ tự Router trạm hiện tại trên SFC.
   - Hiển thị tóm tắt thông tin hoàn nguyên:
     - **Mục tiêu hoàn nguyên:** `SN: SN8839210492` | `Carrier: CARRIER-RFID-8819`.
     - **Bảng CSDL đích:** `sndetaildatas`.
     - **Biến động dự kiến:** Hoàn trả `GPU-NV-02` trở lại thành `GPU-NV-01`.

2. **Kiểm Soát Quyền Hạn & Nhập Lý Do Bắt Buộc:**
   - **Mã nhân viên phục hồi (Operator ID):** Tự động điền từ phiên đăng nhập hiện tại (`state.auth.user.empNo`), khóa `read-only` 🔒 để bảo đảm tính pháp lý kiểm toán.
   - **Lý do phục hồi (Restore Reason):** Ô văn bản bắt buộc nhập (tối thiểu 10 ký tự), ví dụ: `Sửa nhầm mã linh kiện GPU trong ca sáng`.
   - **Hộp kiểm xác nhận trách nhiệm:** `☑ Tôi đã kiểm tra hiện trường và chịu trách nhiệm về việc hoàn nguyên trạng thái này.`

3. **Thực Thi Phục Hồi & Ghi Nhận Nhật Ký Mới:**
   - Khi bấm `[⚠️ Xác Nhận Phục Hồi Trạng Thái]`:
     - Gửi yêu cầu tới `/api/v1/action-logs/restore/:id`.
     - Tạo một bản ghi mới trong bảng Action Logs với Action Type là `RESTORE`, lưu vết mã hành động gốc (`sourceActionId`), người thực hiện và lý do.
     - Cập nhật trạng thái của bản ghi gốc thành `RESTORED` và vô hiệu hóa nút Restore tiếp theo để tránh xung đột dữ liệu.
     - Hiển thị thông báo Toast thành công và tự động tải lại bảng nhật ký.

---

## 7. THIẾT KẾ CẤU TRÚC PROPS CỦA COMPONENT DÙNG CHUNG, ALABEL HELPER & ACTION LOGS RESTORE

### 7.1. Component `SfcSwitchAdapterSenderContainer.jsx` (Dùng Chung Switch & Adapter - Đặt tại `components/sfc_shared/`)

```javascript
/**
 * @typedef {'switch' | 'adapter'} SfcMode
 *
 * Props của SfcSwitchAdapterSenderContainer:
 * @param {SfcMode} mode - Chế độ giao diện ('switch' hoặc 'adapter')
 * @param {Object} filters - State bộ lọc 5 trường
 * @param {Function} onFilterChange - Hàm cập nhật trường lọc
 * @param {Function} onResetFilters - Hàm đặt lại bộ lọc
 * @param {Array} keyparts - Danh sách SFC Keyparts
 * @param {Function} onToggleKeypartSelect - Chọn/bỏ chọn 1 keypart
 * @param {Function} onSelectAllKeyparts - Chọn/bỏ chọn tất cả keyparts
 * @param {string} testResultStatus - 'PASS' | 'FAIL'
 * @param {Function} onSelectResultStatus - Hàm chọn kết quả test
 * @param {Object} latestTransaction - Dữ liệu giao dịch gần nhất
 * @param {Function} onClearConsole - Xóa terminal
 * @param {string|null} isExecutingAction - Tên action đang loading
 * @param {Function} executeGetAccessToken - Hàm lấy token (chỉ cho adapter)
 * @param {Function} executeInsertSerialNumber - Hàm chèn SN
 * @param {Function} executeCheckSerialNumber - Hàm kiểm tra SN
 * @param {Function} executeCheckKeyParts - Hàm kiểm tra Keyparts
 * @param {Function} executeInsertTestResult - Hàm gửi kết quả test
 * @param {Function} executeUndoLink - Hàm hoàn tác liên kết
 * @param {boolean} isUndoModalOpen - Trạng thái modal confirm
 * @param {Function} setIsUndoModalOpen - Đóng/mở modal confirm
 */
```

### 7.2. Component `SfcActionDispatcherColumn.jsx`

```javascript
/**
 * Props của SfcActionDispatcherColumn:
 * @param {SfcMode} mode - 'switch' | 'adapter'
 * @param {string} accessToken - Token xác thực hiện tại (dành cho adapter)
 * @param {Function} onExecuteGetAccessToken - Handler nút ADAPTER_GetAccessTokenSFC
 * @param {Function} onExecuteInsertSN - Handler nút Insert SN
 * @param {Function} onExecuteCheckSN - Handler nút Check SN
 * @param {Function} onExecuteCheckKeyparts - Handler nút Check Keyparts
 * @param {string} testResultStatus - 'PASS' | 'FAIL'
 * @param {Function} onSelectResultStatus - Chọn PASS / FAIL
 * @param {Function} onExecuteInsertTestResult - Gửi kết quả test
 * @param {Function} onOpenUndoModal - Mở modal Undo
 * @param {Object} latestTransaction - Giao dịch gần nhất
 * @param {Function} onClearConsole - Xóa log
 * @param {string|null} isExecutingAction - Action đang thực thi
 */
```

### 7.3. Component `AlabelHelperTab.jsx` (Điều Phối Tab ALABEL)

```javascript
/**
 * Props của AlabelHelperTab:
 * @param {Object} filters - State bộ lọc chung (model, stationGroup, host...)
 * @param {Object} alabelState - Toàn bộ state phân hệ ALABEL từ useAlabelHelperData
 * @param {Function} onLookupProcess - Hàm thực hiện tra cứu tiến trình (SN/Carrier/Keypart)
 * @param {Function} onExecuteSubTabAction - Hàm kích hoạt tác vụ của 7 sub-tabs
 * @param {Function} onClearExecutionLogs - Hàm làm sạch console log
 * @param {Function} onExportExecutionLogs - Hàm xuất báo cáo log
 */
```

### 7.4. Component `AlabelProcessLookup.jsx` (Cột Trái 50% - Tra Cứu Tiến Trình)

```javascript
/**
 * Props của AlabelProcessLookup:
 * @param {'sn' | 'carrier' | 'keypart'} searchType - Tiêu chí tìm kiếm đang chọn
 * @param {Function} setSearchType - Thay đổi tiêu chí tìm kiếm
 * @param {string} searchValue - Giá trị tìm kiếm nhập vào
 * @param {Function} setSearchValue - Cập nhật giá trị tìm kiếm
 * @param {string} detectedModel - Model tự động nhận diện từ DB
 * @param {string} manualModel - Model chọn thủ công từ dropdown CSDL
 * @param {Function} setManualModel - Cập nhật model thủ công
 * @param {boolean} isModelDropdownExpanded - Trạng thái ẩn/hiện dropdown CSDL
 * @param {Function} toggleModelDropdown - Hàm đóng/mở dropdown CSDL
 * @param {Array<string>} dbModelList - Danh mục Model lấy từ CSDL
 * @param {Object|null} processResult - Dữ liệu tiến trình sau khi tra cứu thành công
 * @param {boolean} isSearching - Trạng thái đang tải kết quả tra cứu
 * @param {Function} onExecuteSearch - Kích hoạt hành động tra cứu
 */
```

### 7.5. Component `AlabelActionControl.jsx` (Cột Phải 50% - 7 Sub-Tabs Điều Khiển)

```javascript
/**
 * @typedef {'undo_reset' | 'transfer' | 'clear_undo' | 'compensate_detail' | 'change_keypart' | 'sndetails' | 'error_logs'} AlabelSubTabId
 *
 * Props của AlabelActionControl:
 * @param {AlabelSubTabId} activeSubTab - Sub-tab đang kích hoạt
 * @param {Function} setActiveSubTab - Thay đổi sub-tab
 * @param {Object} targetItem - Dữ liệu SN/Carrier kế thừa từ cột tra cứu
 * @param {boolean} isExecuting - Trạng thái đang gửi lệnh
 * @param {Function} onExecuteAction - Dispatcher gửi payload theo từng sub-tab
 */
```

#### 7.5.1. Component `UndoResetSubTab.jsx` (Sub-Tab 1 - Hoàn Tác & Reset Chu Kỳ)

```javascript
/**
 * @typedef {'sn' | 'carrier'} TargetType
 * @typedef {'undo' | 'cycle_reset'} UndoSubMode
 *
 * Props & Form State của UndoResetSubTab:
 * @param {Object} form - State dữ liệu form
 * @param {TargetType} form.targetType - Loại đối tượng ('sn' hoặc 'carrier')
 * @param {string} form.targetCode - Mã đối tượng nhập vào (SN hoặc Carrier RFID)
 * @param {string} form.model - Dòng sản phẩm (chọn từ dropdown hoặc tự nhận diện)
 * @param {string} form.operatorId - Mã nhân viên (Read-only, tự trích xuất từ tài khoản đăng nhập)
 * @param {UndoSubMode} form.subMode - Chế độ nghiệp vụ ('undo' hoặc 'cycle_reset')
 * @param {string} form.targetStep - Step mục tiêu hoàn tác (khi subMode = 'undo')
 * @param {Function} setForm - Hàm cập nhật state form
 * @param {boolean} isExecuting - Trạng thái loading khi đang gửi lệnh
 * @param {Function} onExecute - Handler gửi lệnh thực thi ('undo_reset')
 */
```

#### 7.5.2. Component `TransferSubTab.jsx` (Sub-Tab 2 - Điều Chuyển Khay Carrier)

```javascript
/**
 * Props & Form State của TransferSubTab:
 * @param {Object} form - State form dữ liệu transfer
 * @param {string} form.sn - Mã Serial Number sản phẩm
 * @param {string} form.oldCarrier - Mã khay cũ (Pallet / Carrier RFID hiện tại)
 * @param {string} form.newCarrier - Mã khay mới (Pallet / Carrier RFID đích)
 * @param {string} form.model - Dòng sản phẩm (Dropdown menu tự động giải mã từ CSDL/SN)
 * @param {string} form.operatorId - Mã nhân viên (Read-only, tự truy xuất khi đăng nhập)
 * @param {string} form.targetStep - Step chuyển sang (Dropdown menu router step)
 * @param {Function} setForm - Hàm cập nhật state form
 * @param {boolean} isExecuting - Trạng thái loading khi đang gửi lệnh
 * @param {Function} onExecute - Handler gửi lệnh thực thi chuyển khay ('transfer')
 */
```

#### 7.5.3. Component `ClearUndoSubTab.jsx` (Sub-Tab 3 - Giải Undo / Rework)

```javascript
/**
 * Props & Form State của ClearUndoSubTab:
 * @param {Object} form - State form dữ liệu clear undo / rework
 * @param {string} form.targetType - Loại đối tượng ('sn' | 'carrier')
 * @param {string} form.targetCode - Mã SN hoặc Carrier RFID
 * @param {string} form.model - Dòng sản phẩm (Dropdown menu chọn model từ CSDL)
 * @param {string} form.operatorId - Mã nhân viên (Read-only 🔒, tự truy xuất khi đăng nhập)
 * @param {string} [form.clearStep] - Bước router cần giải undo/rework tới (Dropdown menu tùy chọn)
 * @param {Function} setForm - Hàm cập nhật state form
 * @param {boolean} isExecuting - Trạng thái loading khi đang gửi lệnh
 * @param {Function} onExecute - Handler gửi lệnh thực thi giải undo/rework ('shared_clearundorework')
 */
```

#### 7.5.4. Component `CompensateSnDetailSubTab.jsx` (Sub-Tab 4 - Nạp Bù Seri Thủ Công & SNDetails)

```javascript
/**
 * Props & Form State của CompensateSnDetailSubTab:
 * @param {Object} form - State form dữ liệu nạp bù seri thủ công
 * @param {string} form.sn - Mã Serial Number sản phẩm nạp bù
 * @param {string} form.carrierCode - Mã Carrier Code (khay RFID/Pallet đồ gá)
 * @param {string} form.model - Dòng sản phẩm (Dropdown menu chọn model từ CSDL)
 * @param {string} form.line - Dây chuyền sản xuất (Text input)
 * @param {string} form.targetStep - Bước router mục tiêu nạp bù tới (Text input)
 * @param {string} form.operatorId - Mã nhân viên (Read-only 🔒, tự truy xuất khi đăng nhập)
 * @param {Function} setForm - Hàm cập nhật state form
 * @param {boolean} isExecuting - Trạng thái loading khi đang gửi lệnh
 * @param {Function} onExecute - Handler gửi lệnh thực thi nạp bù ('compensate_detail' / Shared_ManualInsertSN)
 */
```

#### 7.5.5. Component `ChangeKeypartSubTab.jsx` (Sub-Tab 5 - Đổi / Hoán Đổi Keypart)

```javascript
/**
 * Props & Form State của ChangeKeypartSubTab:
 * @param {Object} form - State form dữ liệu đổi keypart
 * @param {'sn' | 'carrier'} form.targetType - Loại đối tượng ('sn' | 'carrier')
 * @param {string} form.targetCode - Mã SN hoặc Carrier RFID
 * @param {string} form.model - Dòng sản phẩm (Dropdown menu chọn từ CSDL)
 * @param {string} form.operatorId - Mã nhân viên (Read-only 🔒, tự truy xuất khi đăng nhập)
 * @param {string} form.selectedKeypart - Keypart cần thay đổi (Dropdown menu)
 * @param {string} form.newKeypartValue - Giá trị keypart mới (Text input)
 * @param {Function} setForm - Hàm cập nhật state form
 * @param {boolean} isExecuting - Trạng thái loading khi đang gửi lệnh
 * @param {Function} onExecute - Handler gửi lệnh thực thi đổi keypart ('change_keypart')
 */
```

#### 7.5.6. Component `SnDetailsSubTab.jsx` (Sub-Tab 6 - Tra Cứu Bảng SNDetails)

```javascript
/**
 * Props & Form State của SnDetailsSubTab:
 * @param {Object} form - State form tra cứu sndetails
 * @param {'sn' | 'carrier'} form.targetType - Loại đối tượng ('sn' | 'carrier')
 * @param {string} form.targetCode - Mã SN hoặc Carrier RFID
 * @param {string} form.model - Dòng sản phẩm (Dropdown menu tùy chọn)
 * @param {number} form.topLimit - Giới hạn số bản ghi (50, 100, 200, 500)
 * @param {Function} setForm - Hàm cập nhật state form
 * @param {boolean} isExecuting - Trạng thái loading khi đang tra cứu
 * @param {Array<Object>} queryResults - Danh sách kết quả tra cứu bảng sndetails
 * @param {Function} onExecute - Handler thực thi tra cứu ('query_sndetails')
 */
```

#### 7.5.7. Component `ErrorLogsSubTab.jsx` (Sub-Tab 7 - Tra Cứu Nhật Ký Lỗi ErrorLogs)

```javascript
/**
 * Props & Form State của ErrorLogsSubTab:
 * @param {Object} form - State form tra cứu ErrorLogs
 * @param {'sn' | 'carrier'} form.targetType - Loại đối tượng ('sn' | 'carrier')
 * @param {string} form.targetCode - Mã SN hoặc Carrier RFID
 * @param {string} form.model - Dòng sản phẩm (Dropdown menu)
 * @param {string} form.productType - Loại sản phẩm (Dropdown menu)
 * @param {string} form.line - Tên dây chuyền (Dropdown menu)
 * @param {string} form.errorSource - Nguồn lỗi (Dropdown menu)
 * @param {string} form.stage - Giai đoạn sản xuất (Dropdown menu)
 * @param {string} form.station - Trạm máy (Dropdown menu)
 * @param {number} form.topLimit - Giới hạn bản ghi (Top limit)
 * @param {Function} setForm - Hàm cập nhật state form
 * @param {boolean} isExecuting - Trạng thái loading khi đang tra cứu
 * @param {Array<Object>} queryResults - Danh sách kết quả lỗi tra cứu từ bảng ErrorLogs
 * @param {Function} onExecute - Handler thực thi tra cứu ('query_error_logs')
 */
```

### 7.6. Component `AlabelExecutionLogs.jsx` (Khối Phía Dưới - Full Width)

```javascript
/**
 * Props của AlabelExecutionLogs:
 * @param {Array<Object>} logs - Danh sách nhật ký thực thi ALABEL
 * @param {string} filterLevel - Bộ lọc cấp độ ('ALL' | 'SUCCESS' | 'ERROR' | 'WARNING')
 * @param {Function} setFilterLevel - Cập nhật bộ lọc
 * @param {string} keyword - Từ khóa tìm kiếm trong log
 * @param {Function} setKeyword - Cập nhật từ khóa
 * @param {Function} onClearLogs - Hàm xóa console
 * @param {Function} onExportLogs - Hàm xuất log file
 * @param {boolean} autoScroll - Tùy chọn tự động cuộn
 * @param {Function} setAutoScroll - Đổi trạng thái tự động cuộn
 */
```

### 7.7. Component `ActionLogsRestoreTab.jsx` và Các Sub-Components (Tab 4 - Đặt tại `components/tabs/action_logs/`)

#### 7.7.1. Component `ActionLogsFilterBar.jsx` (Khung Lọc 5 Tiêu Chí)

```javascript
/**
 * Props của ActionLogsFilterBar:
 * @param {Object} filters - State bộ lọc kiểm toán
 * @param {string} filters.fromDate - Từ ngày (YYYY-MM-DDTHH:mm)
 * @param {string} filters.toDate - Đến ngày (YYYY-MM-DDTHH:mm)
 * @param {string} filters.actionType - Mã hành động ('ALL' | 'undo' | 'reset' | 'transfer' | 'rework' | 'clear_undo_rework' | 'change_keypart' | 'manual_insert_sn' | 'restore')
 * @param {string} filters.subsystem - Phân hệ ('ALL' | 'alabel' | 'machine' | 'general')
 * @param {string} filters.keyword - Từ khóa tìm kiếm (Mã thẻ, SN, Carrier, bảng đích...)
 * @param {Function} onFilterChange - Hàm cập nhật từng trường lọc
 * @param {Function} onExecuteFilter - Kích hoạt lọc dữ liệu
 * @param {Function} onResetFilter - Làm sạch bộ lọc về mặc định
 * @param {Function} onExportReport - Xuất báo cáo kiểm toán (CSV / Excel)
 * @param {boolean} isLoading - Trạng thái đang tải dữ liệu
 */
```

#### 7.7.2. Component `ActionLogsTable.jsx` (Bảng Nhật Ký Kiểm Toán & Phân Trang)

```javascript
/**
 * Props của ActionLogsTable:
 * @param {Array<Object>} logs - Danh sách các bản ghi nhật ký kiểm toán
 * @param {number} pageSize - Số dòng trên mỗi trang (10, 25, 50, 100)
 * @param {Function} onPageSizeChange - Thay đổi số dòng trên trang
 * @param {number} currentPage - Trang hiện tại
 * @param {number} totalRecords - Tổng số bản ghi
 * @param {Function} onPageChange - Chuyển trang
 * @param {Function} onViewDetail - Handler mở modal xem chi tiết
 * @param {Function} onViewDiff - Handler mở modal so sánh Diff Old/New
 * @param {Function} onOpenRestore - Handler mở modal xác nhận phục hồi
 * @param {boolean} isLoading - Trạng thái đang tải
 */
```

#### 7.7.3. Component `ActionLogDiffModal.jsx` (Modal So Sánh Diff Old/New Trực Quan)

```javascript
/**
 * Props của ActionLogDiffModal:
 * @param {boolean} isOpen - Trạng thái mở modal
 * @param {Function} onClose - Hàm đóng modal
 * @param {Object|null} selectedLog - Bản ghi nhật ký đang chọn đối soát
 * @param {Object|null} diffData - Dữ liệu chi tiết { beforeState: Object, afterState: Object, changedFields: Array<string> }
 */
```

#### 7.7.4. Component `ActionLogRestoreModal.jsx` (Modal Xác Nhận Phục Hồi An Toàn)

```javascript
/**
 * Props của ActionLogRestoreModal:
 * @param {boolean} isOpen - Trạng thái mở modal
 * @param {Function} onClose - Hàm đóng modal
 * @param {Object|null} selectedLog - Bản ghi nhật ký cần phục hồi
 * @param {string} operatorId - Mã nhân viên phục hồi (Read-only 🔒 từ tài khoản đăng nhập)
 * @param {Function} onConfirmRestore - Hàm thực hiện phục hồi ({ logId, reason, operatorId })
 * @param {boolean} isRestoring - Trạng thái đang gửi lệnh phục hồi
 */
```

---

## 8. ĐẶC TẢ GIAO THỨC & API SPECIFICATION

### 8.1. Bảng Đối Chiếu API Endpoints Giữa SFC Switch & SFC Adapter:

| Thao Tác                  | Method | SFC Switch Protocol (`mode='switch'`)                       | SFC Adapter Protocol (`mode='adapter'`)                                                    | Mục Đích Nghiệp Vụ                                          |
| :------------------------ | :----: | :---------------------------------------------------------- | :----------------------------------------------------------------------------------------- | :---------------------------------------------------------- |
| **0. Get Access Token**   | `POST` | _Không áp dụng (Internal Switch Auth)_                      | **`ADAPTER_GetAccessTokenSFC(clientId, stationIp)`**<br>`POST /api/v1/adapter/oauth/token` | Lấy Token xác thực Bearer trước khi gửi các bản tin kế tiếp |
| **1. Insert SN**          | `POST` | `SWITCH_InsertSerialNumberSFC(SN, Model, Group, StationIP)` | `ADAPTER_InsertSerialNumberSFC(SN, Model, Group, StationIP)`                               | Đăng ký Serial Number vào công đoạn trạm                    |
| **2. Check SN**           | `POST` | `SWITCH_CheckSerialNumberSFC(SN, Group)`                    | `ADAPTER_CheckSerialNumberSFC(SN, Group)`                                                  | Thẩm tra tính hợp lệ và luồng Router của SN                 |
| **3. Check Keyparts**     | `POST` | `SWITCH_CheckKeyPartsSFC(mode=0, KeypartList)`              | `ADAPTER_CheckKeyPartsSFC(mode=0, KeypartList)`                                            | Thẩm định khớp linh kiện với bảng BOM chuẩn                 |
| **4. Insert Test Result** | `POST` | `Switch_InsertTestResultSFC(result, ErrorCode)`             | `Adapter_InsertTestResultSFC(result, ErrorCode)`                                           | Ghi nhận kết quả kiểm thử PASS hoặc FAIL lên SFC            |
| **5. Undo Link**          | `POST` | `SWITCH_UndoLinkSFC(SN, Group, Reason)`                     | `ADAPTER_UndoLinkSFC(SN, Group, Reason)`                                                   | Hủy gán toàn bộ liên kết Keyparts của SN                    |

### 8.2. Danh Mục Endpoints & Giao Thức ALABEL Helper (7 Nghiệp Vụ Điều Khiển):

| Nghiệp Vụ ALABEL        | Method | Endpoint                                     | Request Payload Tối Thiểu                                                                                                                  | Kết Quả Phản Hồi Kỳ Vọng                                                             |
| :---------------------- | :----: | :------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------- |
| **Tra Cứu Tiến Trình**  | `POST` | `/api/v1/alabel/process/lookup`              | `{ type: "sn"\|"carrier"\|"keypart", query: string, model?: string }`                                                                      | Thông tin trạm hiện tại, WIP status, Carrier link, Model tự nhận diện từ DB          |
| **Danh Mục Model CSDL** | `GET`  | `/api/v1/alabel/models/active`               | _None_                                                                                                                                     | Danh sách các dòng sản phẩm đang kích hoạt trên dây chuyền                           |
| **1. Undo / Reset**     | `POST` | `/api/v1/alabel/action/undo-reset`           | `{ targetType: "sn"\|"carrier", targetCode: string, model: string, operatorId: string, mode: "undo"\|"cycle_reset", targetStep?: string }` | `{ status: "SUCCESS", newStep: string, rollbackStation: string, latencyMs: number }` |
| **2. Transfer**         | `POST` | `/api/v1/alabel/action/transfer-carrier`     | `{ sn: string, oldCarrier: string, newCarrier: string, model: string, operatorId: string, targetStep: string }`                            | `{ status: "SUCCESS", sn: string, newCarrier: string, targetStep: string, latencyMs: number }` |
| **3. Clear Undo**       | `POST` | `/api/v1/alabel/action/clear-undo-rework`    | `{ targetType: "sn"\|"carrier", targetCode: string, model: string, operatorId: string, clearStep?: string, action: "shared_clearundorework" }` | `{ status: "SUCCESS", unlocked: true, targetCode: string, action: "shared_clearundorework", latencyMs: number }` |
| **4. Bù sn_detail**     | `POST` | `/api/v1/alabel/action/manual-insert-sn`     | `{ sn: string, carrierCode: string, model: string, line: string, targetStep: string, operatorId: string, spName: "[AutoLine].[Shared_ManualInsertSn]" }` | `{ status: "SUCCESS", sn: string, targetStep: string, sp: "Shared_ManualInsertSN", rowsInserted: number, latencyMs: number }` |
| **5. Đổi Keypart**      | `POST` | `/api/v1/alabel/action/change-keypart`       | `{ targetType: "sn"\|"carrier", targetCode: string, model: string, operatorId: string, selectedKeypart: string, newKeypartValue: string, tableName: "sndetaildatas" }` | `{ status: "SUCCESS", table: "sndetaildatas", keypart: string, newValue: string, updatedRows: number }` |
| **6. SNDetails**        | `GET`  | `/api/v1/alabel/query/sn-details`            | Query param: `?targetType={type}&targetCode={code}&model={model}&limit={topLimit}`                                                         | Danh sách bản ghi thuộc tính chi tiết từ bảng `sn_detail` / `sndetaildatas`           |
| **7. Error Logs**       | `GET`  | `/api/v1/alabel/query/error-logs`            | Query param: `?targetType={type}&targetCode={code}&model={model}&productType={productType}&line={line}&errorSource={source}&stage={stage}&station={station}&limit={topLimit}` | Danh sách bản ghi lỗi chi tiết từ bảng `ErrorLogs` của hệ thống ALABEL               |

### 8.3. Danh Mục Endpoints & Giao Thức Action Logs & Restore (Tab 4):

| Nghiệp Vụ Kiểm Toán         | Method | Endpoint                              | Request Payload / Query Params                                                                                                      | Kết Quả Phản Hồi Kỳ Vọng                                                                             |
| :-------------------------- | :----: | :------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------- |
| **Tra Cứu Action Logs**     | `GET`  | `/api/v1/action-logs/query`           | `?fromDate={from}&toDate={to}&action={action}&subsystem={sys}&keyword={kw}&page={page}&pageSize={limit}`                             | `{ status: "SUCCESS", total: number, page: number, pageSize: number, logs: Array<ActionLogItem> }`   |
| **Lấy Dữ Liệu So Sánh Diff** | `GET`  | `/api/v1/action-logs/diff/:id`        | Path param `:id` (Mã hành động kiểm toán duy nhất)                                                                                  | `{ status: "SUCCESS", logId: string, beforeState: Object, afterState: Object, changedFields: Array }` |
| **Thực Thi Phục Hồi State** | `POST` | `/api/v1/action-logs/restore/:id`     | `{ sourceLogId: string, operatorId: string, restoreReason: string, confirmRisk: boolean }`                                          | `{ status: "SUCCESS", restoreActionId: string, targetCode: string, restoredTable: string, restoredAt: string }` |
| **Xuất Báo Cáo Kiểm Toán**  | `POST` | `/api/v1/action-logs/export`          | `{ fromDate: string, toDate: string, action?: string, subsystem?: string, format: "csv"\|"xlsx" }`                                  | File Binary Stream (Tải xuống file báo cáo kiểm toán `.csv` / `.xlsx`)                               |

---

## 9. CẤU TRÚC THƯ MỤC SOURCE CODE DỰ KIẾN SAU KHI TÍCH HỢP TOÀN DIỆN

```text
src/features/config/automation_line_control/
├── AutomationLineControlPage.jsx                     # Điều phối 4 Tab (Tab 1 Switch, Tab 2 Adapter, Tab 3 ALABEL, Tab 4 Logs)
├── components/
│   ├── AutolineControlTabsNav.jsx                    # Thanh chuyển đổi 4 Tab trên cùng
│   │
│   ├── alabel/                                       # Tab 3: Phân hệ ALABEL Helper (THAY THẾ AIOT HELPERS)
│   │   ├── AlabelHelperTab.jsx                       # Container chính điều phối Tab ALABEL
│   │   ├── AlabelProcessLookup.jsx                   # Phía Trái (50%): Tra cứu tiến trình (SN/Carrier/Keypart, Model ẩn/tự nhận)
│   │   ├── AlabelActionControl.jsx                   # Phía Phải (50%): Thao tác điều khiển ALABEL (Quản lý 7 Sub-tabs)
│   │   ├── AlabelExecutionLogs.jsx                   # Phía Dưới: Console log thực thi thao tác ALABEL (Full width)
│   │   ├── CriteriaBasedSearchInput.jsx              # Ô nhập tìm kiếm theo tiêu chí
│   │   ├── ProcedureResult.jsx                       # Thẻ tóm tắt kết quả tiến trình
│   │   ├── ProductTypeDropdownMenu.jsx               # Dropdown chọn dòng sản phẩm từ CSDL
│   │   ├── SearchCriteria.jsx                        # Bộ chọn 3 tiêu chí SN / Carrier / Keypart
│   │   └── subtabs/                                  # Hệ thống 7 Sub-Tabs chuyên biệt
│   │       ├── undo_reset/                           # Sub-tab 1: Undo / Reset Router
│   │       │   ├── UndoResetFunction.jsx
│   │       │   ├── UndoResetSubTab.jsx
│   │       │   ├── SnCarrierBasedInput.jsx
│   │       │   ├── ProductTypeEmployeeCodeInputs.jsx
│   │       │   └── tab/ (Undo.jsx, Reset.jsx)
│   │       ├── transfer/                             # Sub-tab 2: Điều chuyển trạm & khay Carrier
│   │       │   ├── TransferSubTab.jsx
│   │       │   ├── IdentifyingInput.jsx
│   │       │   ├── ProductTypeEmpCode.jsx
│   │       │   ├── StepChoice.jsx
│   │       │   └── ImplementingButton.jsx
│   │       ├── clear_undo/                           # Sub-tab 3: Giải undo/rework (shared_clearundorework)
│   │       │   ├── ClearUndoSubTab.jsx
│   │       │   ├── SnCarrierTextInput.jsx
│   │       │   ├── ProductTypeEmpNo.jsx
│   │       │   ├── UndoReworkDropdownMenu.jsx
│   │       │   └── ImplementingButton.jsx
│   │       ├── sn_compensation/                      # Sub-tab 4: Nạp bù seri thủ công & SNDetails
│   │       │   ├── CompensateSnDetailSubTab.jsx
│   │       │   ├── SnCarrierCodeInput.jsx
│   │       │   ├── ProductTypeLineInput.jsx
│   │       │   ├── TargetStepEmpNo.jsx
│   │       │   ├── TechnicalNote.jsx
│   │       │   └── ImplementingButton.jsx
│   │       ├── change_keypart/                       # Sub-tab 5: Đổi / hoán đổi Keypart (sndetaildatas)
│   │       │   ├── ChangeKeypartSubTab.jsx
│   │       │   ├── SnCarrierTextInput.jsx
│   │       │   ├── ProductTypeEmpNo.jsx
│   │       │   ├── KeypartValueInput.jsx
│   │       │   └── ImplementingButton.jsx
│   │       ├── sndetails/                            # Sub-tab 6: Xem hồ sơ dữ liệu SN (sndetails table)
│   │       │   ├── SnDetailsSubTab.jsx
│   │       │   ├── SnCarrierTextInput.jsx
│   │       │   ├── ModelTopLimitSelect.jsx
│   │       │   ├── SnDetailsTable.jsx
│   │       │   └── ImplementingButton.jsx
│   │       └── error_logs/                           # Sub-tab 7: Nhật ký lỗi trạm ALABEL (ErrorLogs table)
│   │           ├── ErrorLogsSubTab.jsx
│   │           ├── SnCarrierTextInput.jsx
│   │           ├── ErrorFilterDropdowns.jsx
│   │           ├── ErrorLogsTable.jsx
│   │           └── ImplementingButton.jsx
│   │
│   ├── action_logs/                                  # Tab 4: Phân hệ Action Logs & Phục hồi trạng thái
│   │   ├── ActionLogsRestoreTab.jsx                  # Container chính điều phối Tab Action Logs
│   │   ├── ActionLogsFilterBar.jsx                   # Khung 5 trường lọc (Từ ngày, Đến ngày, Action, Phân hệ, Keyword)
│   │   ├── ActionLogsTable.jsx                       # Bảng nhật ký kiểm toán, lọc số dòng & phân trang
│   │   ├── ActionLogDetailModal.jsx                  # Modal xem toàn bộ Metadata, SQL query & Payload
│   │   ├── ActionLogDiffModal.jsx                    # Modal đối soát Diff Old/New song song trực quan
│   │   ├── ActionLogRestoreModal.jsx                 # Modal xác nhận phục hồi an toàn 2 bước
│   │   └── index.js                                  # Barrel exports
│   │
│   ├── sfc_shared/                                   # KHU VỰC GIAO DIỆN CHUNG CHO SWITCH & ADAPTER (ĐỔI TỪ sfc_switch)
│   │   │                                             # Phân khu tập trung duy nhất đóng gói UI tương tác SFC
│   │   ├── SfcSwitchAdapterSenderContainer.jsx       # Container chính thực thi cả Switch & Adapter (nhận prop mode="switch" | "adapter")
│   │   ├── SfcFilterBar.jsx                          # Thanh lọc 5 trường ngang dùng chung
│   │   │
│   │   ├── keyparts_table/                           # Phân khu Bảng SFC Keyparts 7 cột
│   │   │   ├── SfcKeypartsTable.jsx                  # Bảng 7 cột SFC Keyparts của SN
│   │   │   ├── SfcKeypartsTableHeader.jsx            # Header bảng kèm Select All
│   │   │   └── SfcKeypartRow.jsx                     # Từng dòng linh kiện
│   │   │
│   │   ├── action_column/                            # Phân khu Cột tác vụ điều phối
│   │   │   ├── SfcActionDispatcherColumn.jsx         # Cột tác vụ (render nút theo mode, bao gồm GetAccessToken)
│   │   │   ├── SfcTestResultFrame.jsx                # Khung kết quả Pass/Fail + InsertTestResult
│   │   │   ├── SfcUndoLinkButton.jsx                 # Nút Undo Link kèm modal
│   │   │   └── SfcTransactionConsole.jsx             # Terminal hiển thị giao dịch gần nhất
│   │   │
│   │   └── modals/                                   # Hộp thoại xác nhận an toàn SFC
│   │       ├── UndoLinkConfirmModal.jsx              # Hộp thoại cảnh báo Undo Link động theo mode
│   │       └── AlabelConfirmActionModal.jsx          # Hộp thoại xác nhận an toàn cho tác vụ ALABEL (Undo/Clear)
│
├── hooks/
│   ├── useAutolineControlData.js                     # Hook quản lý state lọc, Keyparts và các action Switch/Adapter
│   ├── useAlabelHelperData.js                        # Hook chuyên trách tra cứu tiến trình, quản lý 7 sub-tabs và log ALABEL
│   └── useActionLogsRestoreData.js                   # Hook quản lý query nhật ký, bộ lọc 5 tiêu chí, xem Diff và Restore
│
├── constants/
│   ├── sfcControlConstants.js                        # Danh mục Model, Trạm, Mock Keyparts & Transaction responses
│   ├── alabelConstants.js                            # Mock dữ liệu Router, 7 sub-tabs config, lý do Undo & mã lỗi ALABEL
│   └── actionLogsConstants.js                        # Danh mục hành động (undo/reset/transfer/rework/clear/keypart/compensate/restore), mock logs & diff
│
└── utils/
    ├── sfcPayloadBuilder.js                          # Tiện ích đóng gói Payload theo chuẩn Switch / Adapter
    ├── alabelPayloadBuilder.js                       # Tiện ích đóng gói Payload cho 7 tác vụ điều khiển ALABEL
    └── actionLogsPayloadBuilder.js                   # Tiện ích đóng gói Payload cho truy vấn log và yêu cầu rollback
```

---

## 10. KẾ HOẠCH TRIỂN KHAI VÀ THỰC THI (ACTION ITEMS & VERIFICATION)

- [x] **Bước 1**: Cập nhật tài liệu đặc tả `src/md/AUTOLINE_CONTROL_PLAN.md` và `md/AUTOLINE_CONTROL_PLAN.md`:
  - Định nghĩa kiến trúc giao diện dùng chung giữa Tab Switch & Tab Adapter.
  - Chuẩn hóa cấu trúc thư mục giao diện chung thành `components/sfc_shared/` (thay vì `sfc_switch`), giải quyết triệt để việc nhầm lẫn và khó tìm kiếm.
  - Thiết kế hoàn chỉnh phân hệ **ALABEL_Helper** (thay thế AIOT Helpers): Bố cục chia đôi 1:1 (Tra cứu tiến trình vs Thao tác điều khiển ALABEL), hệ thống 7 sub-tabs, cơ chế Model tự nhận diện/Dropdown ẩn từ CSDL, và khung nhật ký thực thi phía dưới.
  - Đặc tả toàn diện phân hệ **Action Logs & Restore** (Tab 4): Khung bộ lọc 5 tiêu chí, bảng nhật ký 10 cột, điều khiển phân trang & chọn số dòng (10, 25, 50, 100), modal xem chi tiết, modal so sánh Diff Old/New và quy trình Safe Restore an toàn.
- [x] **Bước 2**: Tái cấu trúc thư mục giao diện chung SFC:
  - Đổi tên thư mục `src/features/config/automation_line_control/components/sfc_switch/` thành `src/features/config/automation_line_control/components/sfc_shared/`.
  - Cập nhật đường dẫn import trong `AutomationLineControlPage.jsx` (`import SfcSenderContainer from './components/sfc_shared/SfcSenderContainer';`).
- [ ] **Bước 3**: Nâng cấp Custom Hook `useAutolineControlData.js`:
  - Thêm state `accessToken` cho Adapter.
  - Bổ sung hàm `executeGetAccessToken()`.
  - Hỗ trợ các action tương ứng khi gọi từ tab Switch hoặc tab Adapter.
- [ ] **Bước 4**: Cập nhật `SfcActionDispatcherColumn.jsx` và `SfcSenderContainer.jsx` (trong `sfc_shared/`):
  - Tiếp nhận prop `mode` (`'switch'` hoặc `'adapter'`).
  - Khi `mode === 'adapter'`: hiển thị thêm nút `ADAPTER_GetAccessTokenSFC` trên cùng, các nút đổi tiền tố sang `ADAPTER_...` và `Adapter_InsertTestResultSFC`.
  - Khi `mode === 'switch'`: giữ nguyên 3 nút chuẩn `SWITCH_...` và `Switch_InsertTestResultSFC`.
- [x] **Bước 5**: Triển khai phân hệ **ALABEL_Helper** (Tab 3):
  - Xây dựng component `AlabelHelperTab.jsx` và custom hook `useAlabelHelperData.js`.
  - Xây dựng component Cột trái `AlabelProcessLookup.jsx` (hỗ trợ tìm kiếm SN/Carrier/Keypart, trường Model tự nhận diện kèm Dropdown ẩn danh mục từ CSDL).
  - Xây dựng component Cột phải `AlabelActionControl.jsx` cùng 7 component Sub-tabs: `UndoResetSubTab.jsx`, `TransferSubTab.jsx`, `ClearUndoSubTab.jsx`, `CompensateSnDetailSubTab.jsx`, `ChangeKeypartSubTab.jsx`, `SnDetailsSubTab.jsx`, `ErrorLogsSubTab.jsx`.
  - Xây dựng component Cột dưới `AlabelExecutionLogs.jsx` với các tính năng lọc trạng thái, tìm kiếm log, xóa console và xuất log.
- [x] **Bước 6**: Cập nhật `AutomationLineControlPage.jsx` và `AutolineControlTabsNav.jsx`:
  - Kết nối `activeTab === 'a_label_helpers'` render component `AlabelHelperTab`.
  - Đồng bộ nhãn hiển thị và icon chuẩn cho ALABEL Helper.
- [x] **Bước 7**: Kiểm thử đóng gói `npm run build` và kiểm tra tính nhất quán 2 Theme Foxconn & NVIDIA trên toàn bộ các tab.
- [x] **Bước 8**: Triển khai phân hệ **Action Logs & Restore** (Tab 4):
  - Xây dựng khung lọc 5 tiêu chí `ActionLogsFilterBar.jsx` (Từ ngày, Đến ngày, Hành động [undo, reset, transfer, rework, giải undo/rework, sửa keypart, bù dữ liệu thủ công, restore], Phân hệ [ALabel Helpers, Machine Config, General], ô tìm kiếm chi tiết).
  - Xây dựng bảng nhật ký kiểm toán `ActionLogsTable.jsx` hỗ trợ chọn số dòng hiển thị (10, 25, 50, 100), phân trang và các badge trạng thái/hành động.
  - Xây dựng modal đối soát `ActionLogDiffModal.jsx` hiển thị so sánh Old vs New state trực quan 2 cột và highlight trường thay đổi.
  - Xây dựng modal phục hồi `ActionLogRestoreModal.jsx` xác nhận an toàn, khóa `operatorId` 🔒 theo phiên đăng nhập, bắt buộc nhập lý do rollback.
  - Xây dựng custom hook `useActionLogsRestoreData.js` và hằng số `actionLogsConstants.js` mô phỏng đầy đủ dữ liệu kiểm toán và snapshot diff.
