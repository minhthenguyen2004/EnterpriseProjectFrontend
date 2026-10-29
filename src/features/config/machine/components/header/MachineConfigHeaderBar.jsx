import PageHeaderBar from '../../../../../components/common/PageHeaderBar';

export default function MachineConfigHeaderBar() {
  return (
    <PageHeaderBar
      breadcrumbs={[
        { label: 'CONFIG', isCurrent: false },
        { label: 'MACHINE CONFIGURATION', isCurrent: true }
      ]}
      title="CẤU HÌNH THIẾT BỊ MÁY MÓC"
      badge="MASTER CONFIG"
      badgeType="brand"
      description="Quản trị danh mục trạm máy tự động hóa toàn nhà máy Foxconn & NVIDIA. Đồng bộ tham số IP, Hostname, liên kết chuyền sản xuất, mã công đoạn và quy trình kiểm soát chất lượng."
      showFullscreen={true}
    />
  );
}
