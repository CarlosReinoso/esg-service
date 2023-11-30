const removeUTCFromRow = (str) => {
  const dateWithUTC = new Date(str);
  const dateWithoutUTC = new Date(
    dateWithUTC.getUTCFullYear(),
    dateWithUTC.getUTCMonth(),
    dateWithUTC.getUTCDate(),
    dateWithUTC.getUTCHours(),
    dateWithUTC.getUTCMinutes(),
    dateWithUTC.getUTCSeconds()
  );

  // Format the date as 'YYYY-MM-DD'
  const formattedDate = dateWithoutUTC.toISOString().split("T")[0];
  return formattedDate;
};

module.exports = removeUTCFromRow