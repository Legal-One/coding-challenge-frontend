exports.formatDate = (inputDate) => {
  const date = new Date(inputDate);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  return `${day}/${month}/${year} ${hours}:${minutes}`;
};
