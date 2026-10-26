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
        name: { vi: 'AUTOLINE MANAGEMENT', en: 'AUTOLINE MANAGEMENT', zh: '自动化产线管理' },
        path: '/autoline-management',
        badge: { text: 'Chính', type: 'nvidia' },
        icon: (
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        ),
      },
      {
        name: { vi: 'MACHINE STATUS', en: 'MACHINE STATUS', zh: '机台状态' },
        path: '/machine-status',
        badge: { text: 'Live', type: 'success' },
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
      vi: 'CONFIG',
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
            name: { vi: 'RACK CONFIG', en: 'RACK CONFIG', zh: '机架配置' },
            path: '/config/rack',
          },
          {
            name: { vi: 'RACK OVERVIEW CONFIG', en: 'RACK OVERVIEW CONFIG', zh: '机架概览配置' },
            path: '/config/rack-overview',
          },
        ],
      },
      {
        name: { vi: 'CARRIER CONFIG', en: 'CARRIER CONFIG', zh: '载具配置' },
        path: '/config/carrier',
        icon: (
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        ),
      },
      {
        name: { vi: 'MACHINE CONFIG', en: 'MACHINE CONFIG', zh: '机台配置' },
        path: '/config/machine',
        icon: (
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 3v2m6-2v2M9 19v2m6-2v2M3 9h2m-2 6h2m14-6h2m-2 6h2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
        ),
      },
      {
        name: { vi: 'AUTOMATION LINE CONTROL', en: 'AUTOMATION LINE CONTROL', zh: '产线自动化控制' },
        path: '/config/automation-line',
        icon: (
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        ),
      },
      {
        name: { vi: 'STATION LAYOUT CONTROL', en: 'STATION LAYOUT CONTROL', zh: '工位布局控制' },
        path: '/config/station-layout',
        icon: (
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
          </svg>
        ),
      },
    ],
  },
];

export default menuGroups;