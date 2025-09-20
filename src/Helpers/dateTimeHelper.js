String.prototype.toArabicDigits = function () {
  var id = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return this.replace(/[0-9]/g, function (w) {
    return id[+w];
  });
};

export const dateFormat = (inputDate, lang = 'en', isLong = true) => {
  const date = new Date(inputDate); // Ensure date is consistently interpreted
  let result;

  if (lang === 'en') {
    result = englishDateFormat(date, isLong);
  } else {
    result = arabicDateFormat(date);
  }

  return {
    ...result,
    'd m': `${result.day} ${result.month}`,
    'm d': `${result.month} ${result.day}`,
    'm y': `${result.month} ${result.year}`,
    'd m y': `<span>${result.day}  </span><span>${result.month} </span><span>${result.year}</span>`,
    'm d y': `<span>${result.month}</span><span>${result.day}</span><span>${result.year}</span>`,
    'm d, y': `<span>${result.month} ${result.day},</span><span> ${result.year}</span>`,
    'y m d': `${result.year} ${result.month} ${result.day}`,
  };
};

const arabicDateFormat = (date) => {
  const monthNames = [
    'يناير',
    'فبراير',
    'مارس',
    'أبريل',
    'مايو',
    'يونيو',
    'يوليو',
    'أغسطس',
    'سبتمبر',
    'أكتوبر',
    'نوفمبر',
    'ديسمبر',
  ];

  const day = date.getUTCDate().toString(); // Use getUTCDate for consistency
  const month = monthNames[date.getUTCMonth()];
  const year = date.getUTCFullYear().toString();

  return {
    day,
    month,
    year,
    monthNumber: (date.getUTCMonth() + 1).toString().toArabicDigits(),
  };
};

const englishDateFormat = (date, isLong) => {
  const monthShortNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const monthFullNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const day = date.getUTCDate(); // Use getUTCDate for consistency
  const month = !isLong ? monthShortNames[date.getUTCMonth()] : monthFullNames[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  return {
    day,
    month,
    year,
    monthNumber: date.getUTCMonth() + 1,
  };
};
export const renderDate = (currentDate, lang, format) => {
  let date = new Date(currentDate);
  let transformedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(date);

  let newDate = dateFormat(transformedDate, lang);
  return newDate[format];
};

var monthLongEn = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
var monthShortEn = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
var monthsAr = [
  'يناير',
  'فبراير',
  'مارس',
  'إبريل',
  'مايو',
  'يونيو',
  'يوليو',
  'أغسطس',
  'سبتمبر',
  'أكتوبر',
  'نوفمبر',
  'ديسمبر',
];

export const getDateName = (monthNumber, lang, type) => {
  let arrMonthes = [];

  if (lang === 'en') {
    if (type === 'short') {
      arrMonthes = monthShortEn;
    } else if (type === 'long') {
      arrMonthes = monthLongEn;
    }
  } else {
    arrMonthes = monthsAr;
  }
  return arrMonthes[monthNumber];
};

const lastday = (y, m) => {
  return new Date(y, m + 1, 0).getDate();
};
export const dateItemFormatting = (dateStart, dateEnd, lang, format, txt_yearOf) => {
  var lastDayInMonthOfProvidedDate = lastday(
    new Date(dateEnd)?.getFullYear(),
    new Date(dateEnd)?.getMonth()
  ); //convert utc to local date and get the last date of this month

  if (dateStart?.startsWith('0001') && dateEnd?.startsWith('0001')) {
    // or No Validity Start + No Validity End= Year of 2022 ==> current year
    return txt_yearOf.replace(`{0}`, new Date().getFullYear());
  }

  if (dateEnd?.startsWith('0001')) {
    // or No Validity End= Year of 2022 ==> current year
    return txt_yearOf.replace(`{0}`, new Date().getFullYear());
  }
  if (
    lastDayInMonthOfProvidedDate === new Date(dateEnd)?.getDate() &&
    new Date(dateEnd)?.getDate() !== 31 &&
    new Date(dateEnd)?.getMonth() !== 11
  ) {
    //if last day of the month is same as the provided date and its not 31 December
    return renderDate(dateEnd, lang, 'm y');
  }

  if (
    lastDayInMonthOfProvidedDate === new Date(dateEnd)?.getDate() &&
    new Date(dateEnd)?.getDate() === 31 &&
    new Date(dateEnd)?.getMonth() === 11
  ) {
    return txt_yearOf.replace(`{0}`, new Date(dateEnd)?.getFullYear());
  }

  if (lastDayInMonthOfProvidedDate === new Date(dateEnd)?.getDate()) {
    return renderDate(dateEnd, lang, 'm y');
  } else {
    return renderDate(dateEnd, lang, format);
  }
};
