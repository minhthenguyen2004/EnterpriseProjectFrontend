import { useMemo } from 'react';

/**
 * JsonCodeViewer
 * Component hiển thị JSON với màu cú pháp (Syntax Highlighting) chuẩn IDE chuyên nghiệp (VS Code Dark+ / Light+):
 * - Key (Thuộc tính): Xanh lam sáng (#9cdcfe) trên nền tối, xanh đậm (#0451a5) trên nền sáng
 * - String (Giá trị chuỗi): Cam/Hổ phách (#ce9178) trên nền tối, đỏ san hô (#a31515) trên nền sáng
 * - Number (Giá trị số): Xanh bạc hà (#b5cea8) trên nền tối, xanh lá cây (#098658) trên nền sáng
 * - Boolean / Null: Xanh dương (#569cd6) trên nền tối, xanh hoàng gia (#0000ff) trên nền sáng
 * - Punctuation ({}, [], :, ,): Màu xám tinh tế
 * 
 * Mặc định: Hiển thị FULL toàn bộ chiều cao (không giới hạn, không thanh cuộn), tự động ngắt dòng thông minh (whitespace-pre-wrap break-words).
 */
export default function JsonCodeViewer({
  data,
  isFoxconn,
  maxHeight = '', // Để trống = Hiện Full 100% không cuộn
  className = '',
}) {
  const highlightedHtml = useMemo(() => {
    let jsonStr = '';
    if (typeof data === 'string') {
      try {
        const parsed = JSON.parse(data);
        jsonStr = JSON.stringify(parsed, null, 2);
      } catch {
        jsonStr = data;
      }
    } else {
      jsonStr = JSON.stringify(data || {}, null, 2);
    }

    if (!jsonStr) return '';

    // An toàn hóa các ký tự HTML đặc biệt
    const safeStr = jsonStr
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Tokenize và gắn class syntax highlighting chuẩn IDE
    return safeStr.replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?|[{}[\],:])/g,
      (match) => {
        if (/^"/.test(match)) {
          if (/:$/.test(match.trim())) {
            // Tên thuộc tính (Key)
            const keyColor = isFoxconn ? 'text-[#0451a5] font-semibold' : 'text-[#9cdcfe] font-semibold';
            return `<span class="${keyColor}">${match}</span>`;
          }
          // Chuỗi giá trị (String Value)
          const strColor = isFoxconn ? 'text-[#a31515]' : 'text-[#ce9178]';
          return `<span class="${strColor}">${match}</span>`;
        }
        if (/^(true|false)$/.test(match)) {
          // Boolean (true/false)
          const boolColor = isFoxconn ? 'text-[#0000ff] font-bold' : 'text-[#569cd6] font-bold';
          return `<span class="${boolColor}">${match}</span>`;
        }
        if (match === 'null') {
          // Null
          const nullColor = isFoxconn ? 'text-[#0000ff] font-bold' : 'text-[#569cd6] font-bold';
          return `<span class="${nullColor}">${match}</span>`;
        }
        if (/^-?\d/.test(match)) {
          // Number
          const numColor = isFoxconn ? 'text-[#098658] font-semibold' : 'text-[#b5cea8] font-semibold';
          return `<span class="${numColor}">${match}</span>`;
        }
        if (/[{}[\],:]/.test(match)) {
          // Dấu câu / ngoặc cấu trúc
          const punctColor = isFoxconn ? 'text-slate-600' : 'text-zinc-400';
          return `<span class="${punctColor}">${match}</span>`;
        }
        return match;
      }
    );
  }, [data, isFoxconn]);

  const scrollClasses = maxHeight
    ? `${maxHeight} overflow-y-auto overflow-x-auto`
    : 'overflow-visible h-auto';

  return (
    <pre
      dangerouslySetInnerHTML={{ __html: highlightedHtml }}
      className={`p-2.5 rounded-lg font-mono text-[11px] leading-relaxed whitespace-pre-wrap wrap-break-word border transition-all select-text ${
        isFoxconn
          ? 'bg-slate-50/90 border-slate-200 text-slate-800'
          : 'bg-[#18181b]/95 border-zinc-800 text-[#d4d4d4]'
      } ${scrollClasses} ${className}`}
    />
  );
}
