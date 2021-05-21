import { EMAIL_REGEX, PHONE_REGEX } from '../config/constants';

// 1 ПДн
const hasNationality = (text: string) => /русский | татарин/.exec(text);
const hasEthnicity = (text: string) =>
  /европеоидная | монголоидная | негроидная/.exec(text);
const hasReligion = (text: string) =>
  /христианство | мусульманство | буддизм | иудаизм/.exec(text);
// const hasPolitics = (text: string) => /a/.exec(text);

// 2 ПДн
const hasBiometric = (text: string) => /лицо | отпечаток/.exec(text);
const hasImages = (text: string) => /.*\.(gif|jpe?g|bmp|png)$/gim.exec(text);

// 3 ПДн
const hasEmail = (text: string) => EMAIL_REGEX.exec(text);
const hasPhone = (text: string) => PHONE_REGEX.exec(text);
const hasSnils = (text: string) => /^\d{3}-\d{3}-\d{3}-\d{2}$/.exec(text);
const hasPassport = (text: string) => /^\d{3}-\d{3}$/.exec(text);
const hasINN = (text: string) => /^[\d+]{10,12}$/.exec(text);
const hasDateOfBirth = (text: string) => /^\d\.\d\.\d$/.exec(text);

const getExtension = (filename: string) => filename.match(/\.[0-9a-z]+$/i);

// parser
const findClassification = (text: string, originalname: string) => {
  let classification = '';

  if (hasNationality(text) || hasEthnicity(text) || hasReligion(text)) {
    classification = '1 - Специальные ПДн';
  } else if (hasBiometric(text) || hasImages(text)) {
    classification = '2 - Биометрические ПДн';
  } else if (
    hasEmail(text) ||
    hasPhone(text) ||
    hasSnils(text) ||
    hasPassport(text) ||
    hasINN(text) ||
    hasDateOfBirth(text)
  ) {
    classification = '3 - Общедоступные ПДн';
  } else classification = '4 - Иные ПДн';

  console.log(`\nФайл:`, originalname);
  console.log(`Категория:`, classification);

  return {
    name: originalname,
    classification,
    extension: getExtension(originalname)![0],
  };
};

export { findClassification };

// 1 группа — специальные категории ПДн, к которым относятся информация о национальной и расовой принадлежности субъекта, о религиозных, философских либо политических убеждениях, информацию о здоровье и интимной жизни субъекта;

// 2 группа — биометрические ПДн, то есть данные, характеризующие биологические или физиологические особенности субъекта, например фотография или отпечатки пальцев;

// 3 группа — общедоступные ПДн, то есть сведения о субъекте, полный и неограниченный доступ к которым предоставлен самим субъектом;

// 4 группа — иные категории ПДн, не представленные в трех предыдущих группах.
