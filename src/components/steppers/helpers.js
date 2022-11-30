export const getOptions = (farms) => farms.map((el) => ({
  value: el.uuid,
  label: el.title || el.name,
}));

const patterns = {
  name: /[а-яА-ЯеЁa-zA-Z0-9]+(\s)*/gi,
  email: /[^а-яА-ЯеЁ<>,?'"`#№$:;%^&*=+|\\~{}()[\] ][-_]*(\w)*(\d)*@(\d)*(\w)*[-_]*\.[a-z]{2,5}/gi,
  tel: /\+7[(]\d\d\d[)]-\d\d\d-\d\d-\d\d/gi,
  title: /[^?<>,#$:;%^&*=+|\\~{}[\]]/gi,
  address: /[^?<>#$:;%^&*=+|\\~{}[\]]/gi,
};

export const validField = (str, fieldType) => {
  if (str) {
    const match = str.match(patterns[fieldType]);
    return !!(match && str === match.join(""));
  }
  return false;
};

export const contactSteps = [
  {
    label: "Контакты",
    title: "Заполните контактную информацию",
  },
  {
    label: "Выбор типа",
    title: "Выберите тип объекта",
  },
];

export const propertySteps = [
  {
    label: "Выбор типа",
    title: "Выберите тип объекта",
  },
  {
    label: "Параметры",
    title: "Заполните параметры коровника",
  },
  {
    label: "Контакты",
    title: "Заполните контактную информацию",
  },
];
