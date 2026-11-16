import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 1. Tiếng Việt (Default)
import viCommon from './vi/common.json';
import viMenu from './vi/menu.json';
import viMesError from './vi/mesError.json';
import viProduct from './vi/product.json';
import viRack from './vi/rack.json';
import viCarrier from './vi/carrier.json';
import viMachine from './vi/machine.json';
import viAutoline from './vi/autoline.json';
import viApi from './vi/api.json';
import viAuth from './vi/auth.json';

// 2. English
import enCommon from './en/common.json';
import enMenu from './en/menu.json';
import enMesError from './en/mesError.json';
import enProduct from './en/product.json';
import enRack from './en/rack.json';
import enCarrier from './en/carrier.json';
import enMachine from './en/machine.json';
import enAutoline from './en/autoline.json';
import enApi from './en/api.json';
import enAuth from './en/auth.json';

// 3. 中文 (Tiếng Trung)
import zhCommon from './zh/common.json';
import zhMenu from './zh/menu.json';
import zhMesError from './zh/mesError.json';
import zhProduct from './zh/product.json';
import zhRack from './zh/rack.json';
import zhCarrier from './zh/carrier.json';
import zhMachine from './zh/machine.json';
import zhAutoline from './zh/autoline.json';
import zhApi from './zh/api.json';
import zhAuth from './zh/auth.json';

const savedLang = (() => {
  try {
    return localStorage.getItem('app_lang') || 'vi';
  } catch {
    return 'vi';
  }
})();

i18n
  .use(initReactI18next)
  .init({
    resources: {
      vi: {
        common: viCommon,
        menu: viMenu,
        mesError: viMesError,
        product: viProduct,
        rack: viRack,
        carrier: viCarrier,
        machine: viMachine,
        autoline: viAutoline,
        api: viApi,
        auth: viAuth,
      },
      en: {
        common: enCommon,
        menu: enMenu,
        mesError: enMesError,
        product: enProduct,
        rack: enRack,
        carrier: enCarrier,
        machine: enMachine,
        autoline: enAutoline,
        api: enApi,
        auth: enAuth,
      },
      zh: {
        common: zhCommon,
        menu: zhMenu,
        mesError: zhMesError,
        product: zhProduct,
        rack: zhRack,
        carrier: zhCarrier,
        machine: zhMachine,
        autoline: zhAutoline,
        api: zhApi,
        auth: zhAuth,
      },
    },
    lng: savedLang,
    fallbackLng: 'vi',
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
