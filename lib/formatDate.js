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
const originalDate = "2023-07-16T00:00:00.000Z";

console.log("Original Date:", originalDate);
console.log("Six Months Later:", sixMonthsLater(originalDate));
console.log("Two Weeks Before Expires:", twoWeeksBeforeExpires(originalDate));
console.log("One Week Before Expires:", oneWeekBeforeExpires(originalDate));

function calculateTestDate() {
  // Get today's date
  const today = new Date();

  // Calculate date 5 months ago
  const sixMonthsAgo = new Date(today);
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  // Calculate 2 weeks before the date 5 months ago
  const twoWeeksBefore = new Date(sixMonthsAgo);
  const formatted = twoWeeksBefore.setDate(twoWeeksBefore.getDate() + 14);

  return formatDate(formatted);
}

// Example usage
console.log("Result:", calculateTestDate());

module.exports = {
  formatDate,
  sixMonthsLater,
  oneWeekBeforeExpires,
  twoWeeksBeforeExpires,
};
