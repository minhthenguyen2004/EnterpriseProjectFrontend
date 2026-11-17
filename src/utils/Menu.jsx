export const menuGroups = [
  {
    id: 'automation',
    title: {
      vi: 'QUẢN LÝ TỰ ĐỘNG HÓA',
      en: 'AUTOMATION MANAGEMENT',
      zh: '自动化管理',
    },
    items: [
      {
        name: { vi: 'QUẢN LÝ TỰ ĐỘNG HÓA', en: 'AUTOMATION MANAGEMENT', zh: '自动化产线管理' },
        path: '/autoline-management',
        icon: (
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        ),
      },
      {
        name: { vi: 'TRẠNG THÁI MÁY', en: 'MACHINE STATUS', zh: '机台状态' },
        path: '/machine-status',
        icon: (
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        ),
      },
    ],
  },
  {
    id: 'config',
    title: {
      vi: 'CẤU HÌNH',
      en: 'CONFIG',
      zh: '系统配置',
    },
    items: [
      {
        id: 'rack',
        name: { vi: 'RACK', en: 'RACK', zh: '机架' },
        icon: (
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M5 4h14a2 2 0 012 2v3a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2zm0 9h14a2 2 0 012 2v3a2 2 0 01-2 2H5a2 2 0 01-2-2v-3a2 2 0 012-2zM6 7.5h.01M6 16.5h.01M9 7.5h.01M9 16.5h.01" />
          </svg>
        ),
        children: [
          {
            name: { vi: 'CẤU HÌNH RACK', en: 'RACK CONFIG', zh: '机架配置' },
            path: '/config/rack',
          },
          {
            name: { vi: 'CẤU HÌNH TỔNG QUAN RACK', en: 'RACK OVERVIEW CONFIG', zh: '机架概览配置' },
            path: '/config/rack-overview',
          },
        ],
      },
      {
        name: { vi: 'CẤU HÌNH KHAY', en: 'CARRIER CONFIG', zh: '载具配置' },
        path: '/config/carrier',
        icon: (
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        ),
      },
      {
        name: { vi: 'CẤU HÌNH MÁY', en: 'MACHINE CONFIG', zh: '机台配置' },
        path: '/config/machine',
        icon: (
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 3v2m6-2v2M9 19v2m6-2v2M3 9h2m-2 6h2m14-6h2m-2 6h2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
        ),
      },
      {
        name: { vi: 'ĐIỀU KHIỂN DÂY CHUYỀN TỰ ĐỘNG', en: 'AUTOMATION LINE CONTROL', zh: '产线自动化控制' },
        path: '/config/automation-line',
        icon: (
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        ),
      },
      {
        name: { vi: 'ĐIỀU KHIỂN BỐ CỤC TRẠM', en: 'STATION LAYOUT CONTROL', zh: '工位布局控制' },
        path: '/config/station-layout',
        icon: (
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
          </svg>
        ),
      },
      {
        name: { vi: 'GIẢI KHÓA KHAY', en: 'UNLOCK CARRIER', zh: '解除运营商锁定' },
        path: '/config/unlock-carrier',
        icon: (
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
          </svg>
        ),
      },
      {
        name: { vi: 'ĐIỀU KHIỂN HOẠT ĐỘNG TỰ ĐỘNG', en: 'AUTOLINE OPERATIONS', zh: '自动化线操作' },
        path: '/config/autoline-operations',
        icon: (
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        ),
      },
      {
        id: 'products',
        name: { vi: 'SẢN PHẨM', en: 'PRODUCT', zh: '产品配置' },
        icon: (
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M5 4h14a2 2 0 012 2v3a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2zm0 9h14a2 2 0 012 2v3a2 2 0 01-2 2H5a2 2 0 01-2-2v-3a2 2 0 012-2zM6 7.5h.01M6 16.5h.01M9 7.5h.01M9 16.5h.01" />
          </svg>
        ),
        children: [
          {
            name: { vi: 'NVIDIA', en: 'NVIDIA', zh: 'NVIDIA' },
            path: '/config/product/nvidia',
          }
        ],
      },
    ],
  },
  {
    id: 'mes_error',
    title: {
      vi: 'LỖI MES',
      en: 'MES ERROR',
      zh: 'MES 错误',
    },
    items: [
      {
        name: { vi: 'DANH SÁCH MÃ LỖI MES', en: 'MES ERROR CODE LIST', zh: 'MES 错误代码列表' },
        path: '/config/mes-error-code',
        icon: (
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        ),
      },
    ],
  },
  {
    id: 'api_request',
    title: {
      vi: 'QUẢN LÝ API',
      en: 'API MANAGEMENT',
      zh: 'API 管理',
    },
    items: [
      {
        id: 'api_request_log',
        name: { vi: 'NHẬT KÝ YÊU CẦU API', en: 'API REQUEST LOG', zh: 'API 请求日志' },
        path: '/api/request-log',
        icon: (
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
        ),
      },
    ],
  },
];


export default menuGroups;