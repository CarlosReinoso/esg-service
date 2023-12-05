function formatDate(date) {
  const createdAtDate = new Date(date);
  const year = createdAtDate.getFullYear();
  const month = createdAtDate.getMonth() + 1; // Month is zero-based
  const day = createdAtDate.getDate();

  // Creating a string in the format 'YYYY-MM-DD'
  return `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;
}

module.exports = formatDate;
