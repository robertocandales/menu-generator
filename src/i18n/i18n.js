import { createContext, useState, useRef, useEffect } from 'react';
import rosetta from 'rosetta';
// import rosetta from 'rosetta/debug';

const i18n = rosetta();

export const defaultLanguage = 'es';
export const languages = ['es', 'en'];
export const contentLanguageMap = { de: 'es-ES', en: 'en-US' };

export const I18nContext = createContext();

// default language
i18n.locale(defaultLanguage);

export default function I18n({ children, locale, lngDict }) {
  const activeLocaleRef = useRef(locale || defaultLanguage);
  const [, setTick] = useState(0);
  const firstRender = useRef(true);

  const i18nWrapper = {
    activeLocale: activeLocaleRef.current,
    t: (...lngKey) => {
      return i18n.t(lngKey);
    },
    locale: (l, dict) => {
      i18n.locale(l);
      activeLocaleRef.current = l;
      if (dict) {
        i18n.set(l, dict);
      }
      // force rerender to update view
      setTick((tick) => tick + 1);
    },
  };

  // for initial SSR render
  if (locale && firstRender.current === true) {
    firstRender.current = false;
    i18nWrapper.locale(locale, lngDict);
  }

  // when locale is updated
  useEffect(() => {
    if (locale) {
      i18nWrapper.locale(locale, lngDict);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lngDict, locale]);

  return <I18nContext.Provider value={i18nWrapper}>{children}</I18nContext.Provider>;
}

//import i18n from 'i18next';
//import Backend from 'i18next-http-backend';
//import LanguageDetector from 'i18next-browser-languagedetector';
//import { initReactI18next } from 'react-i18next';

//i18n
//  .use(Backend)
//  .use(LanguageDetector)
//  .use(initReactI18next)
//  .init({
//    fallbackLng: 'en',
//    debug: true,
//    detection: {
//      order: ['queryString', 'cookie'],
//      cache: ['cookie'],
//    },
//    interpolation: {
//      escapeValue: false,
//    },
//  });

//export default i18n;
