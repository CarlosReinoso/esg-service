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

function sixMonthsLater(createAtDate) {
  const date = new Date(createAtDate);
  date.setMonth(date.getMonth() + 6);

  return formatDate(date);
}

function oneWeekBeforeExpires(createAtDate) {
  const date = new Date(sixMonthsLater(createAtDate));
  date.setDate(date.getDate() - 7);

  return formatDate(date);
}

function twoWeeksBeforeExpires(createAtDate) {
  const date = new Date(sixMonthsLater(createAtDate));
  date.setDate(date.getDate() - 14);

  return formatDate(date);
}

// Example usage:
// const originalDate = "2023-06-20T00:00:00.000Z";

// console.log("Original Date:", originalDate);
// console.log("Six Months Later:", sixMonthsLater(originalDate));
// console.log("One Two Before Expires:", twoWeeksBeforeExpires(originalDate));
// console.log("One Week Before Expires:", oneWeekBeforeExpires(originalDate));

module.exports = {
  formatDate,
  sixMonthsLater,
  oneWeekBeforeExpires,
  twoWeeksBeforeExpires,
};
