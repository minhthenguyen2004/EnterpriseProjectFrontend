import MachineFlagsList from './MachineFlagsList';
import MachineFlagsExplanation from './MachineFlagsExplanation';

export default function MachineConfigTab({
  formData = {},
  onChange,
  isFoxconn
}) {
  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar my-4 space-y-4 pr-1 max-h-[calc(92vh-280px)]">
      {/* Cụm 5 nút tick chọn (Machine Flags Checkboxes) */}
      <MachineFlagsList
        formData={formData}
        onChange={onChange}
        isFoxconn={isFoxconn}
      />

      {/* Hộp Thoại Giải Thích Thông Tin (Explanation Callout Box) */}
      <MachineFlagsExplanation isFoxconn={isFoxconn} />
    </div>
  );
}
