export const truncate = (text, number = 50, suffix = "...") => {
  const truncatedText = text.substr(0, number);
  return truncatedText + suffix;
};

export const formatDate = (date) => {
  const day = toTwoDigits(date.getDate());
  const month = toTwoDigits(date.getMonth() + 1);
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

const toTwoDigits = (number) => {
  return number < 10 ? "0" + number : number;
};
