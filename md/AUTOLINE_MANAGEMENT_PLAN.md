# KẾ HOẠCH TRIỂN KHAI GIAO DIỆN QUẢN LÝ CHUYỀN TỰ ĐỘNG (`/autoline-management`)

> **Tài liệu tham chiếu:** Plan thiết kế và kiến trúc giao diện cho màn hình điều hành dây chuyền sản xuất tự động thông minh (Smart Factory Automation Line Management).  
> **Áp dụng cho route:** `/autoline-management` (thuộc nhóm menu **QUẢN LÝ TỰ ĐỘNG HÓA**).  
> **Component đích:** `src/features/automation_line_management/AutomationLineManagement.jsx`.  
> **Đặc tả kiến trúc:** Thiết kế theo mô hình **Module Hóa Tối Đa (Component-Driven Architecture)** — Tách từng máy thành file JSX độc lập (`MachineCard.jsx`), module hóa thẻ KPI, từng widget đồ thị, drawer bộ lọc và custom hook dữ liệu riêng biệt.  
> **Ngày cập nhật:** 26/10/2026.  
> **Vị trí tài liệu:** `md/AUTOLINE_MANAGEMENT_PLAN.md` (đồng bộ tại `src/md/AUTOLINE_MANAGEMENT_PLAN.md`).

---

## 1. TỔNG QUAN VÀ MỤC TIÊU DỰ ÁN

Giao diện **Quản lý Chuyền Tự Động (`/autoline-management`)** là trung tâm giám sát & điều hành (Operation Central Cockpit) cho các dây chuyền sản xuất tự động hóa cao cấp trong nhà máy Foxconn / NVIDIA. Màn hình được thiết kế hướng tới khả năng **mở rộng cao, tái sử dụng, tối ưu hóa không gian hiển thị tối đa, tự động cuộn chữ thông minh và trải nghiệm thị giác vượt trội**:

### Bố cục không gian 4 phân đoạn chính:
1. **Nút Dài Hẹp Mép Trái & Drawer Bộ Lọc Đa Tiêu Chí (`LeftFilterTabHandle.jsx` & `AutolineFilterDrawer.jsx`):**
   - Một **nút dài hẹp bo góc tinh tế gắn sát ở mép bên trái màn hình** (Left Edge Handle) với chữ xoay dọc `BỘ LỌC` và badge đếm số lượng bộ lọc đang chọn.
   - Khi nhấp vào, trượt ra **Drawer Bộ Lọc Thông Minh (Filter Drawer)** cho phép lọc toàn bộ dữ liệu trên trang theo 4 tiêu chí cốt lõi:
     - **Ngày & Giờ (Date & Time):** Tích chọn checkbox linh hoạt để kích hoạt lọc ngày giờ (`Từ ngày/giờ -> Đến ngày/giờ`), đã **lược bỏ phần chọn nhanh theo ca** để tập trung lọc chuẩn xác theo khoảng thời gian tùy chọn của người dùng (`DateTimeFilterGroup.jsx`).
     - **Tên sản phẩm (Product Name):** **Nhập trực tiếp dạng text** (`<input type="text" ... />`) hỗ trợ tìm kiếm mọi model, kèm danh sách thẻ gợi ý nhanh (NVIDIA HGX H100, HGX B200, GB200 NVL72, NVLink Switch...).
     - **Loại sản phẩm (Product Type):** Lựa chọn loại sản phẩm (*AI Server Motherboard, GPU Accelerator Module, High-Power Shelf, NVLink Switch...*).
     - **Tên chuyền (Line Name):** Lựa chọn dây chuyền (*Line 01 - High-Speed SMT, Line 02 - GPU Board Assembly, Line 03 - Server Rack System...*).
   - Sau khi áp dụng bộ lọc, **tất cả các thông số và đồ thị ở Phần Top, Phần Giữa và Phần Bottom sẽ được cập nhật đồng bộ**.

2. **Phần Top (Hàng ngang 1 - Top KPI Metrics Bar - Siêu gọn & Cách đều nhau):** Bố trí dàn trải hàng ngang 6 chỉ số vận hành cốt lõi qua component dùng chung `KpiMetricCard.jsx`:
   - **Input** (Sản lượng đầu vào)
   - **Output** (Sản lượng đạt chuẩn đầu ra)
   - **Yield Rate** (Tỷ lệ đạt chuẩn / First Pass Yield %)
   - **UPH** (Units Per Hour - Tốc độ sản xuất trên giờ)
   - **Cycle Time** (Thời gian chu kỳ nhịp chuyền thực tế)
   - **Performance** (Hiệu suất vận hành dây chuyền %)
   - **Tối ưu hóa tinh gọn:** **Không cần hiện target (mục tiêu) và hiệu suất vận hành (progress bar & subtext)**. Các ô KPI được tinh gọn chiều cao (`p-3`), cách nhau đều đặn (`gap-3.5`), làm nổi bật con số giá trị chính và đơn vị.

3. **Phần Giữa (Hàng ngang 2 - Chuỗi Trạm Máy Nối Tiếp - Tự Động Cuộn & Căn Giữa Linh Hoạt):** Bố trí các máy móc trong dây chuyền sắp xếp tuần tự theo hàng ngang mô phỏng luồng sản xuất liên tục từ đầu chuyền đến cuối chuyền (Conveyor Process Flow).  
   - **Mỗi máy được tách riêng thành 1 file JSX độc lập (`MachineCard.jsx`)** để dễ dàng cấu hình, thêm/bớt máy động từ API/Mock Data.
   - **Tự động cuộn chữ khi tên quá dài (`AutoScrollText.jsx`):** Khi tên máy, model hoặc thông báo lỗi dài vượt quá khung thẻ, chữ sẽ tự động cuộn ngang mượt mà (marquee animation), tạm dừng khi rê chuột vào để người dùng dễ đọc trọn vẹn thông tin.
   - **Căn giữa linh hoạt khi số lượng máy ít:**
     - Tự động căn giữa (`justify-center`) khi số lượng trạm máy ít (`<= 4` máy), giúp giao diện cân đối, không bị lệch hẳn về bên trái.
     - Tích hợp nút **"Căn Giữa"** trên thanh công cụ để người dùng có thể chủ động bật/tắt căn giữa bất kỳ lúc nào.
   - **Tự động cuộn khi chuỗi máy dài (Auto-Scroll Conveyor):**
     - Tích hợp nút **"Auto Cuộn"** trên header trạm máy, giúp chuỗi máy tự động trượt mượt mà sang phải và quay đầu khi hết chuyền.
     - Tự động tạm dừng cuộn khi người dùng rê chuột vào bất kỳ máy nào để thao tác hoặc xem chi tiết.
   - **Bố cục thông số máy xếp dọc (`MachineMetricsBlock.jsx`):**
     - **Phần Input vs Output xếp theo hàng dọc** (Input hàng trên, Output hàng dưới).
     - **Phần NG vs Yield cũng xếp theo hàng dọc** (NG hàng trên, Yield hàng dưới).
     - **Đã bỏ phần Takt time và nút Chi tiết** trên thẻ máy để tiết kiệm tối đa không gian chiều cao và chiều rộng thẻ máy.
     - **Kích thước thẻ máy siêu gọn:** Thu hẹp xuống **`w-44`** (khoảng 176px), padding `p-2.5`, khoảng cách các máy `gap-5` thoáng đẹp.
     - Click vào thẻ máy sẽ mở modal xem thông số cảm biến chi tiết (`MachineDetailModal.jsx`).

4. **Phần Bottom (Hàng ngang 3 - Bottom Analytics & Diagnostics Row):** Bố trí dàn theo hàng ngang 3 khối đồ thị & phân tích chuyên sâu (mỗi khối là 1 file JSX widget độc lập):
   - **Top Error Code (`TopErrorCodeWidget.jsx`):** Bảng / Bar chart tổng hợp các mã lỗi phát sinh nhiều nhất trong ca, số lần và máy bị lỗi.
   - **Yield Rate & Output (`YieldOutputTrendWidget.jsx`):** Biểu đồ kết hợp Recharts (Combo Bar + Line Chart) phản ánh sản lượng ra và tỷ lệ đạt theo từng khung giờ trong ca.
   - **Machine Runtime Breakdown (`MachineRuntimeWidget.jsx`):** Biểu đồ phân bổ thời gian vận hành tổng hợp theo 4 trạng thái (`RUN`, `IDLE`, `STOP`, `ERROR`) của tất cả các máy trong chuyền.

5. **Tối ưu hiển thị giao diện NVIDIA (High Contrast Pure White Text):**
   - Khi chuyển sang giao diện NVIDIA (`brand === 'nvidia'`), **toàn bộ văn bản (tiêu đề trang, tên máy, nhãn thông số, giá trị KPI, trục đồ thị Recharts, bảng danh sách lỗi) được chuyển sang màu trắng tinh (`text-white`)**.
   - Tạo độ tương phản tối đa với nền tối công nghiệp `bg-zinc-950`, giúp kỹ sư và quản lý dây chuyền đọc số liệu rõ ràng, dễ quan sát từ xa trong môi trường phòng điều hành (Command Center).
   - `ThemeProvider.jsx` tự động đồng bộ gán class `dark` trên thẻ `<html>` khi chọn brand NVIDIA.

---

## 2. NGUYÊN TẮC MODULE HÓA (MODULARIZATION ARCHITECTURE)

Hệ thống tuân thủ nghiêm ngặt nguyên tắc **Single Responsibility Principle (SRP)** và **Atomic Design**:

```mermaid
graph TD
    subgraph Container chính
        MainPage["AutomationLineManagement.jsx (Orchestrator)"]
    end

    subgraph Tầng Quản Lý State & Logic (Hooks)
        Hook["useAutolineData.js (Custom Hook)"]
        Mock["autolineMockData.js (Dữ liệu mô phỏng)"]
        Const["autolineConstants.js (Enum & Config)"]
    end

    subgraph Module Bộ Lọc Mép Trái (filter/)
        Tab["LeftFilterTabHandle.jsx (Nút dẹt hẹp mép trái)"]
        Drawer["AutolineFilterDrawer.jsx (Drawer trượt, tên SP nhập text)"]
        DateTime["DateTimeFilterGroup.jsx (Lọc ngày & giờ có checkbox, bỏ chọn theo ca)"]
        Chips["ActiveFilterChipsBar.jsx (Dải thẻ lọc đang chọn)"]
    end

    subgraph Module Top KPI (top_kpi/)
        TopRow["TopKpiRow.jsx (Container hàng ngang cách đều nhau)"]
        KpiCard["KpiMetricCard.jsx (Thẻ KPI siêu gọn, bỏ Target & Progress, chữ trắng)"]
    end

    subgraph Module Trạm Máy Giữa (machine_flow/)
        FlowRow["MachineFlowRow.jsx (Dãy máy căn giữa linh hoạt, auto-cuộn khi dài)"]
        MachineCard["MachineCard.jsx (Thẻ máy siêu gọn w-44, bỏ Takt & Chi tiết)"]
        AutoScroll["AutoScrollText.jsx (Tự động cuộn chữ khi tên quá dài)"]
        Badge["MachineStatusBadge.jsx (Đèn LED & Huy hiệu trạng thái)"]
        Metrics["MachineMetricsBlock.jsx (Khối In/Out xếp dọc, NG/Yield xếp dọc)"]
        Modal["MachineDetailModal.jsx (Modal chi tiết cảm biến trạm)"]
    end

    subgraph Module Đồ Thị Bottom (bottom_analytics/)
        BotRow["BottomAnalyticsRow.jsx (Container 3 widget ngang)"]
        ErrWidget["TopErrorCodeWidget.jsx (Khối Top mã lỗi)"]
        TrendWidget["YieldOutputTrendWidget.jsx (Biểu đồ Recharts Yield & Output trục trắng)"]
        RuntimeWidget["MachineRuntimeWidget.jsx (Biểu đồ phân bổ thời gian máy)"]
    end

    MainPage --> Hook
    Hook --> Mock
    Hook --> Const

    MainPage --> Tab
    MainPage --> Drawer
    Drawer --> DateTime
    MainPage --> Chips

    MainPage --> TopRow
    TopRow --> KpiCard

    MainPage --> FlowRow
    FlowRow --> MachineCard
    MachineCard --> AutoScroll
    MachineCard --> Badge
    MachineCard --> Metrics
    MainPage --> Modal

    MainPage --> BotRow
    BotRow --> ErrWidget
    BotRow --> TrendWidget
    BotRow --> RuntimeWidget
```

---

## 3. THIẾT KẾ CHI TIẾT TỪNG PHÂN ĐOẠN GIAO DIỆN

### 3.1. Nút Dài Hẹp Mép Trái & Drawer Bộ Lọc Đa Tiêu Chí (Module `filter/`)

#### 3.1.1. Component `LeftFilterTabHandle.jsx` (Nút dài hẹp mép trái):
- **Vị trí hiển thị:** Cố định sát mép bên trái khu vực nội dung trang (`fixed left-0 top-1/2 -translate-y-1/2 z-30`).
- **Hình dáng & Kích thước:**
  - Thiết kế dạng tab dọc dài thanh mảnh (chiều rộng hẹp khoảng `32px`, chiều dài khoảng `120px`).
  - Bo tròn viền góc ngoài bên phải (`rounded-r-2xl`), phẳng ở mép trái áp sát màn hình.
  - Chữ hiển thị xoay dọc: `BỘ LỌC` kèm biểu tượng phễu lọc phát sáng.
  - Huy hiệu số lượng bộ lọc đang kích hoạt (Active filter badge count: ví dụ `[3]`).
- **Hiệu ứng trực quan:** Hover trượt nhẹ ra ngoài 4px, phát sáng màu chủ đạo (**Foxconn Blue `#002766`** hoặc **NVIDIA Neon Green `#76B900`**).

#### 3.1.2. Component `AutolineFilterDrawer.jsx` (Drawer lọc trượt):
- Chiều rộng: `384px (w-96)`, trượt mượt mà từ mép trái với hiệu ứng slide-over kèm backdrop mờ.
- Chứa 4 nhóm điều kiện lọc:
  1. **Ngày & Giờ (`DateTimeFilterGroup.jsx`):** Checkbox tích chọn kích hoạt lọc ngày giờ, 2 ô `datetime-local` (`Từ ngày/giờ` -> `Đến ngày/giờ`). **Đã bỏ toàn bộ các nút ca làm việc** để giao diện tập trung lọc mốc thời gian tùy biến chính xác.
  2. **Tên Sản Phẩm (Product Name):** **Ô nhập văn bản dạng text (`<input type="text" ... />`)**, người dùng có thể gõ bất kỳ chuỗi tên/mã sản phẩm. Có sẵn danh sách thẻ gợi ý nhanh (NVIDIA HGX H100, B200, GB200, NVLink Switch, Titanium Power Shelf).
  3. **Tên Chuyền (Line Name):** Danh sách chọn: *Line 01 - High-Speed SMT, Line 02 - GPU Board, Line 03 - Server Rack...*
  4. **Loại Sản Phẩm (Product Type):** *AI Server Motherboard, GPU Accelerator Module, Power Shelf, NVLink Switch...*

#### 3.1.3. Component `ActiveFilterChipsBar.jsx` (Thanh thẻ lọc đang áp dụng):
- Hiển thị ngay dưới Header các chip tag nhỏ gọn (ví dụ: `[Chuyền: Line 01 ✕] [SP: H100 ✕] [24/10 08:00 - 16:00 ✕]`).
- Hỗ trợ click `✕` để xóa từng điều kiện hoặc nút `Xóa tất cả lọc`.

---

### 3.2. Phần Top: 6 Thẻ Chỉ Số Vận Hành Hàng Ngang (Module `top_kpi/`)

#### 3.2.1. Component `TopKpiRow.jsx`:
- Container bố trí Grid 6 cột cân đối trên Desktop (hoặc 3 cột trên Tablet, 2 cột trên Mobile) với khoảng cách phân tách rõ ràng (`gap-3 lg:gap-3.5`).
- Bỏ hoàn toàn việc tính toán và truyền props `target`, `progress`, `subText` ("hiệu suất vận hành").

#### 3.2.2. Component `KpiMetricCard.jsx` (Thẻ KPI siêu gọn):
- **Cấu trúc tinh giản tối đa:**
  - Viền màu trạng thái nhẹ nhàng kèm đường accent màu phía trên.
  - Hàng trên: Tên chỉ số (Input, Output, Yield Rate, UPH, Cycle Time, Performance) + Biểu tượng SVG chuyên biệt.
  - Hàng dưới: Con số giá trị kích thước lớn đậm nét (`text-xl xl:text-2xl font-black font-mono`) kèm đơn vị (`unit`) và nhãn delta tăng/giảm (`diff`).
  - **Đã lược bỏ:** Toàn bộ thanh tiến độ (Progress bar) và chân thẻ hiển thị Target/Hiệu suất vận hành để thẻ đạt độ cao tối thiểu, gọn gàng và tinh tế.
- Hỗ trợ 2 phong cách giao diện:
  - **Foxconn:** Nền thẻ trắng sáng, viền xanh nhạt, chữ đen/xanh navy chuẩn doanh nghiệp.
  - **NVIDIA:** Nền thẻ tối công nghiệp `bg-zinc-900/90`, viền `zinc-800`, **chữ màu trắng tinh (`text-white`)**, điểm nhấn xanh neon `#76B900`.

---

### 3.3. Phần Giữa: Chuỗi Máy Xếp Hàng Ngang (Module `machine_flow/`)

Dây chuyền tự động hóa được module hóa thành các component độc lập:

#### 3.3.1. Component `AutoScrollText.jsx` (Tự Động Cuộn Chữ Thông Minh):
- Đo đạc chính xác `scrollWidth` so với `clientWidth`.
- Nếu chữ dài vượt quá độ rộng của thẻ, tự động kích hoạt hiệu ứng cuộn ngang liên tục (`marqueeScroll`), tạm dừng 1s ở đầu và cuối để người dùng đọc dễ dàng.
- Tự động tạm dừng animation khi người dùng rê chuột vào (`hover:[animation-play-state:paused]`).

#### 3.3.2. Component `MachineCard.jsx` (Thẻ Máy Siêu Gọn):
- **Trách nhiệm duy nhất:** Nhận dữ liệu của 1 trạm máy cụ thể (`machine` object) và render giao diện máy.
- **Tối ưu diện tích:**
  - Thu hẹp kích thước thành **`w-44`** (khoảng 176px), padding `p-2.5`.
  - **Đã loại bỏ phần Takt time và nút Chi tiết** ở footer thẻ máy để giảm đáng kể chiều cao thẻ.
  - Click vào thẻ máy sẽ trực tiếp mở modal xem chi tiết cảm biến trạm (`MachineDetailModal.jsx`).
  - Ở giao diện NVIDIA, **toàn bộ chữ tên máy, model, mã trạm đều hiển thị màu trắng (`text-white`)**.
- **Cấu trúc bên trong `MachineCard.jsx`:**
  - Header: Huy hiệu trạng thái với đèn LED nhấp nháy (`MachineStatusBadge.jsx`) + Mã trạm (`#01 OP-10`).
  - Title: Tên máy và Model bọc trong `AutoScrollText.jsx` tự động cuộn khi chữ dài.
  - Body: Khối thông số vận hành xếp theo hàng dọc (`MachineMetricsBlock.jsx`).

#### 3.3.3. Sub-component `MachineStatusBadge.jsx`:
- Render nhãn trạng thái và đèn LED xung ánh sáng theo 4 mã màu chuẩn:
  - `RUN`: Đèn LED xanh ngọc nhấp nháy (`animate-ping`), chữ `RUNNING`.
  - `IDLE`: Đèn LED vàng hổ phách, chữ `IDLE / WAITING`.
  - `STOP`: Đèn xám kim loại, chữ `STOPPED`.
  - `ERROR`: Đèn đỏ ruby phát sáng mạnh, viền rung nhẹ, chữ `ERROR / ALARM`.

#### 3.3.4. Sub-component `MachineMetricsBlock.jsx` (Xếp theo hàng dọc):
- **Phần Input vs Output xếp theo hàng dọc:**
  - Hàng 1: `INPUT` + Số lượng đầu vào (ví dụ: `1,420`).
  - Hàng 2: `OUTPUT` + Số lượng đạt chuẩn đầu ra (ví dụ: `1,390`).
- **Phần NG vs Yield cũng xếp theo hàng dọc:**
  - Hàng 3: `NG:` + Số phế phẩm (ví dụ: `30 pcs`).
  - Hàng 4: `Yield:` + Tỷ lệ đạt chuẩn (ví dụ: `97.9%`).
- Toàn bộ chữ nhãn và giá trị hiển thị màu trắng (`text-white`) trên giao diện NVIDIA.

#### 3.3.5. Component `MachineFlowRow.jsx` (Căn Giữa & Auto-Scroll):
- **Căn giữa linh hoạt:** Tự động căn giữa (`justify-center`) khi số lượng trạm máy ít (`<= 4` máy). Có nút bật/tắt căn giữa trên toolbar.
- **Auto Cuộn Băng Chuyền:** Nút "Auto Cuộn" tự động trượt mượt mà sang phải và quay đầu khi hết chuyền, tự động tạm dừng khi rê chuột vào.
- Hỗ trợ nút cuộn trái/phải thủ công (`←` / `→`) và thanh cuộn ngang mượt mà (`overflow-x-auto`).
- Khoảng cách các máy rộng rãi `gap-5`.

#### 3.3.6. Component `MachineDetailModal.jsx`:
- Hộp thoại bật lên (Modal) khi click vào một máy bất kỳ.
- Hiển thị telemetry chi tiết: Địa chỉ IP kết nối, giao thức (SECS/GEM, OPC-UA), nhiệt độ buồng, áp suất khí nén (bar), takt time, lịch sử cảnh báo gần nhất của máy với định dạng chữ trắng độ nét cao.

---

### 3.4. Phần Bottom: 3 Khối Thông Tin Dàn Theo Hàng Ngang (Module `bottom_analytics/`)

#### 3.4.1. Component `BottomAnalyticsRow.jsx`:
- Container bố trí dàn đều 3 khối phân tích theo hàng ngang (Grid 3 cột tỉ lệ `1fr : 1.3fr : 1fr` trên màn hình lớn).

#### 3.4.2. Component `TopErrorCodeWidget.jsx` (Khối 1):
- Quản lý danh sách Top 5 mã lỗi trong ca.
- Tiêu đề, tên lỗi, tên máy phát sinh lỗi và số liệu thống kê được hiển thị bằng chữ màu trắng (`text-white`) trên theme NVIDIA.

#### 3.4.3. Component `YieldOutputTrendWidget.jsx` (Khối 2):
- Tích hợp biểu đồ Recharts kết hợp (Dual-Axis Combo Chart) tự động thích ứng chữ rõ nét theo brand:
  - Cột Bar: Sản lượng Output hoàn thành theo từng giờ (`#002766` Foxconn Navy hoặc `#0284c7` Cyber Sky Blue).
  - Đường Line: Tỷ lệ Yield Rate (%) theo giờ với các điểm dot tròn nổi bật (`#059669` Foxconn Green hoặc `#76B900` NVIDIA Neon Green).
  - Trục X: Khung giờ hiển thị chữ đậm sắc nét (`#0f172a` Foxconn hoặc `#ffffff` NVIDIA).
  - Trục Y trái: Output ticks hiển thị đậm nét (`#002766` Foxconn hoặc `#ffffff` NVIDIA) với `width={38}` chống cắt chữ.
  - Trục Y phải: Yield % ticks hiển thị đậm nét (`#047857` Foxconn hoặc `#76B900` NVIDIA) với `width={44}` rõ ràng cả ký tự `%`.
  - Cơ chế `key={`trend-chart-${brand}`}` kích hoạt re-render SVG tức thì khi chuyển đổi giao diện giữa Foxconn và NVIDIA.
  - Tooltip tùy biến độ tương phản cao: Nền kính mờ `backdrop-blur-md`, tiêu đề khung giờ, Output và Yield Rate rõ ràng, phân biệt theo từng theme.
  - Đường Reference Line ngang thể hiện Target Yield `98.5%` với nhãn chữ tương phản cao (`#991b1b` Foxconn hoặc `#ff85a0` NVIDIA).

#### 3.4.4. Component `MachineRuntimeWidget.jsx` (Khối 3):
- Quản lý phân tích thời gian vận hành tổng hợp:
  - Thanh Stacked Progress Bar tổng quát: Tỷ lệ % của toàn chuyền theo `RUN`, `IDLE`, `STOP`, `ERROR`.
  - Bảng danh sách thanh tích lũy thời gian của từng máy trong dây chuyền với chữ trắng rõ nét.

---

## 4. BẢNG MÃ MÀU VÀ ĐỒNG BỘ THIẾT KẾ THEO BRAND (FOXCONN & NVIDIA)

Màn hình được thiết kế chuẩn Enterprise, tự động thích ứng với Brand được chọn trong `useTheme()`:

| Phần tử UI | Foxconn Brand (`foxconn`) | NVIDIA Brand (`nvidia`) |
| :--- | :--- | :--- |
| **Màu nền trang** | `bg-slate-50` / `bg-white` | `bg-zinc-950` / `bg-black` |
| **Nút dài hẹp mép trái** | `bg-[#002766] text-white shadow-blue-900/30` | `bg-zinc-900 border-[#76B900] text-[#76B900] shadow-[#76B900]/20` |
| **Drawer Bộ lọc** | `bg-white border-slate-200 shadow-2xl` | `bg-zinc-900/95 border-zinc-800 backdrop-blur-xl shadow-2xl text-white` |
| **Thẻ Máy (`MachineCard`)** | `w-44 bg-white border-slate-200 shadow-sm hover:border-blue-400` | `w-44 bg-zinc-900/90 border-zinc-800 text-white hover:border-[#76B900]/60` |
| **Cuộn chữ khi text dài** | Auto-scroll marquee mượt mà | Auto-scroll marquee mượt mà |
| **Căn giữa chuỗi máy ít** | Căn giữa `justify-center` linh hoạt | Căn giữa `justify-center` linh hoạt |
| **Auto cuộn băng chuyền** | Bật/tắt cuộn tự động khi chuỗi dài | Bật/tắt cuộn tự động khi chuỗi dài |
| **Bố cục Input/Output** | Xếp theo hàng dọc (dọc) | Xếp theo hàng dọc (dọc, chữ trắng) |
| **Bố cục NG/Yield** | Xếp theo hàng dọc (dọc) | Xếp theo hàng dọc (dọc, chữ trắng) |
| **Thẻ Top KPI** | Siêu gọn, không hiện target & hiệu suất | Siêu gọn, không hiện target & hiệu suất (chữ trắng) |
| **Khoảng cách giữa các máy** | `gap-5` (Rộng rãi, thoáng đẹp) | `gap-5` (Rộng rãi, thoáng đẹp) |
| **Khoảng cách giữa các thẻ KPI** | `gap-3 lg:gap-3.5` (Cách nhau đều đặn) | `gap-3 lg:gap-3.5` (Cách nhau đều đặn) |
| **Màu chữ chính (Tiêu đề, Tên máy, KPI)** | `text-slate-900` / `text-slate-800` | **`text-white` (Trắng sáng rõ nét 100%)** |
| **Màu chữ phụ (Nhãn, Mô tả, Đơn vị)** | `text-slate-500` / `text-slate-600` | **`text-white` / `text-zinc-200` (Dễ đọc trên nền tối)** |
| **Chữ đồ thị Yield/Output Trend** | Trục X `#0f172a`, Y trái `#002766`, Y phải `#047857` | **Trục X `#ffffff`, Y trái `#ffffff`, Y phải `#76B900` (Rõ nét 100%)** |
| **Màu điểm nhấn (Accent)** | Xanh dương Foxconn (`#002766`, `#003893`) | Xanh neon NVIDIA (`#76B900`, `#86D400`) |
| **Trạng thái RUN** | `bg-emerald-50 border-emerald-300 text-emerald-700` | `bg-emerald-950/40 border-emerald-500/50 text-emerald-400` |
| **Trạng thái IDLE** | `bg-amber-50 border-amber-300 text-amber-700` | `bg-amber-950/40 border-amber-500/50 text-amber-400` |
| **Trạng thái STOP** | `bg-slate-100 border-slate-300 text-slate-700` | `bg-zinc-800 border-zinc-700 text-white` |
| **Trạng thái ERROR** | `bg-rose-50 border-rose-300 text-rose-700` | `bg-rose-950/40 border-rose-500/50 text-rose-400 animate-pulse` |

---

## 5. CẤU TRÚC THƯ MỤC SOURCE CODE MODULE HÓA CHI TIẾT

Toàn bộ các file JSX và logic phụ trợ được phân rã thành các module chuyên biệt:

```text
src/features/automation_line_management/
├── AutomationLineManagement.jsx              # [Orchestrator] Trang chính kết nối state, hook và các module con
├── hooks/
│   └── useAutolineData.js                    # [Logic Hook] Quản lý state bộ lọc, fetch data, auto-refresh interval
├── constants/
│   └── autolineConstants.js                  # [Hằng số] Định nghĩa Enum trạng thái máy, màu sắc theme, ngưỡng KPI
├── data/
│   └── autolineMockData.js                   # [Dữ liệu mẫu] Mock chuyền, sản phẩm, máy móc, mã lỗi, biểu đồ theo bộ lọc
└── components/
    ├── header/
    │   └── AutolineHeaderBar.jsx             # Thanh tiêu đề, chỉ báo LIVE LINE, thời gian cập nhật, nút Fullscreen, Refresh
    ├── filter/
    │   ├── LeftFilterTabHandle.jsx           # [JSX] Nút dẹt dài hẹp gắn cố định mép trái màn hình (chữ dọc BỘ LỌC)
    │   ├── AutolineFilterDrawer.jsx          # [JSX] Drawer trượt mép trái chứa 4 tiêu chí lọc (Tên SP nhập text)
    │   ├── DateTimeFilterGroup.jsx           # [JSX] Khối lọc Ngày & Giờ (checkbox kích hoạt, datetime inputs, bỏ ca)
    │   └── ActiveFilterChipsBar.jsx          # [JSX] Dải thẻ hiển thị các điều kiện lọc đang kích hoạt kèm nút xóa
    ├── top_kpi/
    │   ├── TopKpiRow.jsx                     # [JSX] Container bố trí 6 thẻ KPI dàn hàng ngang cách nhau đều đặn
    │   └── KpiMetricCard.jsx                 # [JSX] Thẻ KPI đơn lẻ siêu gọn (Input, Output, Yield, UPH, CT, Perf - Bỏ Target/Progress)
    ├── machine_flow/
    │   ├── MachineFlowRow.jsx                # [JSX] Container dãy máy căn giữa linh hoạt khi ít, auto-cuộn khi dài, gap-5
    │   ├── MachineCard.jsx                   # [JSX] THẺ MÁY ĐỘC LẬP siêu gọn w-44 (Bỏ Takt & Chi tiết - Chữ trắng)
    │   ├── AutoScrollText.jsx                # [JSX] Component tự động cuộn chữ mượt mà khi text dài quá khung
    │   ├── MachineStatusBadge.jsx            # [JSX] Đèn LED xung ánh sáng và nhãn trạng thái (Run/Idle/Stop/Error)
    │   ├── MachineMetricsBlock.jsx           # [JSX] Khối thông số: In/Out xếp theo hàng dọc, NG/Yield xếp theo hàng dọc
    │   └── MachineDetailModal.jsx            # [JSX] Modal hiển thị thông số cảm biến chi tiết khi click vào máy
    └── bottom_analytics/
        ├── BottomAnalyticsRow.jsx            # [JSX] Container dàn đều 3 khối phân tích hàng ngang
        ├── TopErrorCodeWidget.jsx            # [JSX] Widget hiển thị Top mã lỗi phổ biến trong ca (Chữ trắng)
        ├── YieldOutputTrendWidget.jsx        # [JSX] Widget biểu đồ kết hợp Recharts (Output Bar + Yield Line - Trục & Text trắng)
        └── MachineRuntimeWidget.jsx          # [JSX] Widget phân bổ thời gian vận hành (Run, Idle, Stop, Error - Chữ trắng)
```

---

## 6. KẾ HOẠCH TRIỂN KHAI VÀ THỰC THI (IMPLEMENTATION PHASES)

### Giai đoạn 1: Chuẩn bị Dữ liệu, Constants & Logic Hook
- [x] Xây dựng file [autolineConstants.js](file:///d:/EnterpriseProjectFrontend/enterprise-project-frontend/src/features/automation_line_management/constants/autolineConstants.js) định nghĩa các trạng thái (`MACHINE_STATUS.RUN`, `IDLE`, `STOP`, `ERROR`) và màu sắc tương ứng.
- [x] Xây dựng file [autolineMockData.js](file:///d:/EnterpriseProjectFrontend/enterprise-project-frontend/src/features/automation_line_management/data/autolineMockData.js) chứa dữ liệu mô phỏng hỗ trợ lọc theo Chuyền, Sản phẩm, Loại sản phẩm, Ngày/Giờ.
- [x] Xây dựng custom hook [useAutolineData.js](file:///d:/EnterpriseProjectFrontend/enterprise-project-frontend/src/features/automation_line_management/hooks/useAutolineData.js) quản lý state bộ lọc (hỗ trợ text search sản phẩm), timer tự động cập nhật và tính toán chỉ số.

### Giai đoạn 2: Xây dựng Module Bộ Lọc Mép Trái (`components/filter/`)
- [x] Xây dựng [LeftFilterTabHandle.jsx](file:///d:/EnterpriseProjectFrontend/enterprise-project-frontend/src/features/automation_line_management/components/filter/LeftFilterTabHandle.jsx): Nút dẹt hẹp mép trái với chữ xoay dọc `BỘ LỌC`, badge đếm và hiệu ứng hover.
- [x] Xây dựng [DateTimeFilterGroup.jsx](file:///d:/EnterpriseProjectFrontend/enterprise-project-frontend/src/features/automation_line_management/components/filter/DateTimeFilterGroup.jsx): Checkbox bật/tắt lọc thời gian, input `datetime-local`, đã loại bỏ hoàn toàn các nút chọn nhanh theo ca làm việc.
- [x] Xây dựng [AutolineFilterDrawer.jsx](file:///d:/EnterpriseProjectFrontend/enterprise-project-frontend/src/features/automation_line_management/components/filter/AutolineFilterDrawer.jsx): Drawer trượt chứa 4 tiêu chí lọc với ô nhập văn bản dạng text cho Tên Sản Phẩm và gợi ý nhanh.
- [x] Xây dựng [ActiveFilterChipsBar.jsx](file:///d:/EnterpriseProjectFrontend/enterprise-project-frontend/src/features/automation_line_management/components/filter/ActiveFilterChipsBar.jsx): Dải thẻ tag hiển thị điều kiện đang lọc và nút xóa.

### Giai đoạn 3: Xây dựng Module Header & Top KPI (`components/top_kpi/`)
- [x] Xây dựng [AutolineHeaderBar.jsx](file:///d:/EnterpriseProjectFrontend/enterprise-project-frontend/src/features/automation_line_management/components/header/AutolineHeaderBar.jsx): Thanh điều khiển trung tâm với chữ trắng độ nét cao trên theme NVIDIA.
- [x] Cập nhật **[KpiMetricCard.jsx](file:///d:/EnterpriseProjectFrontend/enterprise-project-frontend/src/features/automation_line_management/components/top_kpi/KpiMetricCard.jsx)**: Bỏ hoàn toàn việc hiển thị target và hiệu suất vận hành (progress bar & subtext), kích thước siêu gọn gàng.
- [x] Cập nhật **[TopKpiRow.jsx](file:///d:/EnterpriseProjectFrontend/enterprise-project-frontend/src/features/automation_line_management/components/top_kpi/TopKpiRow.jsx)**: Dàn đều 6 thẻ hàng ngang cách nhau đều đặn (`gap-3.5`).

### Giai đoạn 4: Xây dựng Module Chuỗi Máy Giữa (`components/machine_flow/`)
- [x] Xây dựng **[AutoScrollText.jsx](file:///d:/EnterpriseProjectFrontend/enterprise-project-frontend/src/features/automation_line_management/components/machine_flow/AutoScrollText.jsx)**: Tự động cuộn chữ khi tên máy, model, thông báo lỗi quá dài.
- [x] Xây dựng [MachineStatusBadge.jsx](file:///d:/EnterpriseProjectFrontend/enterprise-project-frontend/src/features/automation_line_management/components/machine_flow/MachineStatusBadge.jsx): Đèn LED và nhãn trạng thái máy.
- [x] Cập nhật **[MachineMetricsBlock.jsx](file:///d:/EnterpriseProjectFrontend/enterprise-project-frontend/src/features/automation_line_management/components/machine_flow/MachineMetricsBlock.jsx)**: **Input vs Output xếp theo hàng dọc**, **NG vs Yield cũng xếp theo hàng dọc**.
- [x] Cập nhật **[MachineCard.jsx](file:///d:/EnterpriseProjectFrontend/enterprise-project-frontend/src/features/automation_line_management/components/machine_flow/MachineCard.jsx)**: **Bỏ hoàn toàn phần Takt time và nút Chi tiết**, thu gọn chiều rộng thành **`w-44`**, chữ màu trắng khi chọn NVIDIA, tích hợp `AutoScrollText`.
- [x] Cập nhật **[MachineFlowRow.jsx](file:///d:/EnterpriseProjectFrontend/enterprise-project-frontend/src/features/automation_line_management/components/machine_flow/MachineFlowRow.jsx)**:
  - Tự động căn giữa (`justify-center`) khi số lượng máy ít (`<= 4`).
  - Nút chuyển đổi căn giữa chủ động trên toolbar.
  - Chế độ Auto Cuộn mượt mà khi chuỗi máy dài, tạm dừng khi rê chuột.
  - Khoảng cách máy `gap-5`.
- [x] Xây dựng [MachineDetailModal.jsx](file:///d:/EnterpriseProjectFrontend/enterprise-project-frontend/src/features/automation_line_management/components/machine_flow/MachineDetailModal.jsx): Hộp thoại xem chi tiết cảm biến khi click vào máy.

### Giai đoạn 5: Xây dựng Module Đồ Thị Bottom (`components/bottom_analytics/`)
- [x] Xây dựng [TopErrorCodeWidget.jsx](file:///d:/EnterpriseProjectFrontend/enterprise-project-frontend/src/features/automation_line_management/components/bottom_analytics/TopErrorCodeWidget.jsx): Widget danh sách Top mã lỗi trong ca với chữ màu trắng.
- [x] Xây dựng [YieldOutputTrendWidget.jsx](file:///d:/EnterpriseProjectFrontend/enterprise-project-frontend/src/features/automation_line_management/components/bottom_analytics/YieldOutputTrendWidget.jsx): Biểu đồ Recharts kết hợp sản lượng Output và tỷ lệ Yield Rate theo giờ với các trục tọa độ màu trắng tinh (`#ffffff`).
- [x] Xây dựng [MachineRuntimeWidget.jsx](file:///d:/EnterpriseProjectFrontend/enterprise-project-frontend/src/features/automation_line_management/components/bottom_analytics/MachineRuntimeWidget.jsx): Biểu đồ phân bổ thời gian vận hành của tất cả các máy với chữ trắng dễ đọc.
- [x] Xây dựng [BottomAnalyticsRow.jsx](file:///d:/EnterpriseProjectFrontend/enterprise-project-frontend/src/features/automation_line_management/components/bottom_analytics/BottomAnalyticsRow.jsx): Ghép 3 widget dàn hàng ngang.

### Giai đoạn 6: Tối Ưu Theme NVIDIA & Kiểm Thử Toàn Diện
- [x] Tích hợp toàn bộ các module vào [AutomationLineManagement.jsx](file:///d:/EnterpriseProjectFrontend/enterprise-project-frontend/src/features/automation_line_management/AutomationLineManagement.jsx).
- [x] Cập nhật [ThemeProvider.jsx](file:///d:/EnterpriseProjectFrontend/enterprise-project-frontend/src/context/ThemeProvider.jsx) để tự động thêm/bỏ class `dark` trên thẻ `<html>` khi chuyển sang `brand === 'nvidia'`.
- [x] Kiểm thử chuyển đổi mượt mà giữa Foxconn và NVIDIA, xác nhận 100% chữ đổi sang màu trắng dễ đọc.
- [x] Kiểm tra cấu trúc module hóa độc lập, không có lỗi runtime.

---

## 7. TIÊU CHUẨN HOÀN THÀNH (ACCEPTANCE CRITERIA)

1. **Chuỗi trạm máy nối tiếp thông minh & linh hoạt:**
   - **Tự động cuộn chữ:** Chữ dài quá khung tự động cuộn ngang (marquee) mượt mà ([AutoScrollText.jsx](file:///d:/EnterpriseProjectFrontend/enterprise-project-frontend/src/features/automation_line_management/components/machine_flow/AutoScrollText.jsx)).
   - **Căn giữa khi số lượng máy ít:** Tự động căn giữa khi có ít hơn hoặc bằng 4 máy, kèm nút chỉnh "Căn Giữa" chủ động.
   - **Auto Cuộn khi chuỗi dài:** Chế độ tự động cuộn băng chuyền thông minh, tự động tạm dừng khi rê chuột vào trạm máy.
   - **Bố cục nén khoa học:** Input vs Output xếp theo hàng dọc, NG vs Yield xếp theo hàng dọc, bỏ phần Takt và nút Chi tiết, thẻ máy `w-44` khoảng cách `gap-5`.
2. **Thẻ Top KPI tinh gọn & cách đều nhau:**
   - 6 chỉ số: `Input`, `Output`, `Yield Rate`, `UPH`, `Cycle Time`, `Performance` dàn hàng ngang.
   - **Không hiển thị target (mục tiêu) và hiệu suất vận hành (progress bar & subtext)**.
   - Các ô KPI có chiều cao siêu gọn, cách đều nhau bằng khoảng cách chuẩn `gap-3.5`.
3. **Module hóa triệt để:**
   - Thẻ máy được tạo bằng file JSX riêng biệt ([MachineCard.jsx](file:///d:/EnterpriseProjectFrontend/enterprise-project-frontend/src/features/automation_line_management/components/machine_flow/MachineCard.jsx)), kèm các sub-components độc lập ([MachineStatusBadge.jsx](file:///d:/EnterpriseProjectFrontend/enterprise-project-frontend/src/features/automation_line_management/components/machine_flow/MachineStatusBadge.jsx), [MachineMetricsBlock.jsx](file:///d:/EnterpriseProjectFrontend/enterprise-project-frontend/src/features/automation_line_management/components/machine_flow/MachineMetricsBlock.jsx), [AutoScrollText.jsx](file:///d:/EnterpriseProjectFrontend/enterprise-project-frontend/src/features/automation_line_management/components/machine_flow/AutoScrollText.jsx)).
   - Các thẻ KPI, từng widget phân tích đồ thị, bộ lọc đều là các file JSX tách rời, mã nguồn gọn gàng, tái sử dụng cao.
4. **Bộ lọc thông minh mép trái hoàn hảo:**
   - Nút dài hẹp mép trái mở Drawer trượt êm ái.
   - Lọc ngày giờ có checkbox tích chọn, nhập datetime tùy biến, không có nút chọn theo ca.
   - Tên sản phẩm hỗ trợ nhập text trực tiếp kèm gợi ý nhanh.
   - Cập nhật đồng bộ toàn bộ 3 phân đoạn trên trang khi bấm "Áp Dụng Bộ Lọc".
5. **Độ tương phản và tính dễ đọc cao trên giao diện NVIDIA:**
   - Khi chuyển sang giao diện NVIDIA, **toàn bộ văn bản chuyển sang màu trắng (`text-white`)**, dễ đọc, sắc nét và nổi bật trên nền đen/zinc tối.
   - Đồng bộ class `dark` trên `<html>` từ `ThemeProvider.jsx`.
6. **Thẩm mỹ xuất sắc:** Thiết kế giao diện hiện đại chuẩn Enterprise Smart Factory Control Center.
