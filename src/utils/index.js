export const getLangDir = (lang) => {
  return isRTLLang(lang) ? 'rtl' : 'ltr';
};

export const isRTLLang = (lang) => {
  // List exported from the following link: https://lingohub.com/academy/best-practices/rtl-language-list
  return [
    'ar',
    'ar-AE',
    'ar-BH',
    'ar-DZ',
    'ar-EG',
    'ar-IQ',
    'ar-JO',
    'ar-KW',
    'ar-LB',
    'ar-LY',
    'ar-MA',
    'ar-OM',
    'ar-QA',
    'ar-SA',
    'ar-SY',
    'ar-TN',
    'ar-YE',
    'arc',
    'dv',
    'fa',
    'ha',
    'he',
    'khw',
    'ks',
    'ku',
    'ps',
    'ur',
    'yi',
  ].includes(lang)
    ? true
    : false;
};

export const HeaderTagResolver = (headingTag, def = 'p') => {
  return headingTag?.value || def;
};
