const jsonData = require('./mockData.json');
const EMAIL_REGEX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

const fetchData = async () => {
  return Promise.resolve(jsonData);
};

interface MockData {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface ProcessedData {
  id: number;
  name: string;
  classification?: string;
  category?: string;
}

const findClassification = (el: MockData) => {
  let result = '';

  const hasEmail = EMAIL_REGEX.exec(el.body);
  if (hasEmail) result = 'Confidential';
  
  const isSecret = /voluptatem/.exec(el.body);
  if (isSecret) result = 'Secret';

  const isPhone = /voluptatem/.exec(el.body);
  if (isPhone) result = 'Confidential';

  if (hasEmail && isSecret && isPhone) result = 'Top Secret';

  return result;
};

const findCategory = (el: MockData) => {
  const isTax = /voluptatem/.exec(el.body);
  if (isTax) {
    return 'tax';
  }

  const isTopSecret = /voluptatem/.exec(el.body);
  if (isTopSecret) {
    return 'isTopSecret';
  }
};

const processData = (data: MockData[]): ProcessedData[] => {
  return data.map((el) => {
    return {
      id: el.id,
      name: el.title,
      classification: findClassification(el),
      category: findCategory(el),
    };
  });
};

export const loadData = async () => {
  const data = await fetchData();

  const processedData = processData(data);
  console.log(`processedData`, processedData);

  return processedData;
};
