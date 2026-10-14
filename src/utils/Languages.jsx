/* eslint-disable react-refresh/only-export-components */
export const Languages = [

  {
    code: 'vi',
    label: 'Tiếng Việt',
    short: 'VIE',
    flag: (
      <svg className="w-5 h-3.5 rounded-xs shadow-xs" viewBox="0 0 30 20">
        <rect width="30" height="20" fill="#da251d" />
        <polygon
          points="15,4 16.5,8.8 21.5,8.8 17.5,11.8 19,16.6 15,13.6 11,16.6 12.5,11.8 8.5,8.8 13.5,8.8"
          fill="#ff0"
        />
      </svg>
    ),
  },

  {
    code: 'zh',
    label: '中文 (Tiếng Trung)',
    short: 'CHN',
    flag: (
      <svg className="w-5 h-3.5 rounded-xs shadow-xs" viewBox="0 0 30 20">
        <rect width="30" height="20" fill="#de2910" />
        <polygon points="5,2 6,5 9,5 6.5,7 7.5,10 5,8 2.5,10 3.5,7 1,5 4,5" fill="#ffde00" />
        <circle cx="10" cy="2" r="0.7" fill="#ffde00" />
        <circle cx="12" cy="4" r="0.7" fill="#ffde00" />
        <circle cx="12" cy="7" r="0.7" fill="#ffde00" />
        <circle cx="10" cy="9" r="0.7" fill="#ffde00" />
      </svg>
    ),
  },
  
  {
    code: 'en',
    label: 'English (Tiếng Anh)',
    short: 'ENG',
    flag: (
      <svg className="w-5 h-3.5 rounded-xs shadow-xs" viewBox="0 0 30 20">
        <rect width="30" height="20" fill="#012169" />
        <path d="M0,0 L30,20 M30,0 L0,20" stroke="#fff" strokeWidth="4" />
        <path d="M0,0 L30,20 M30,0 L0,20" stroke="#c8102e" strokeWidth="2.4" />
        <path d="M15,0 v20 M0,10 h30" stroke="#fff" strokeWidth="6" />
        <path d="M15,0 v20 M0,10 h30" stroke="#c8102e" strokeWidth="3.6" />
      </svg>
    ),
  },
];

export default Languages;
