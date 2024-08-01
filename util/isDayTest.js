function isDayTest() {
  //isFirstFridayOfMonth
  const today = new Date();
  console.log("🚀 ~ isDayTest ~ today:", today)
  const dayOfWeek = today.getDay();
  console.log("🚀 ~ isDayTest ~ dayOfWeek:", dayOfWeek)
  const dateOfMonth = today.getDate();
  console.log("🚀 ~ isDayTest ~ dateOfMonth:", dateOfMonth)
  
  if (dayOfWeek === 5 && dateOfMonth <= 7) {
    return true;
  }
  return false;
}

console.log("🚀 ~ isDayTest ~ isDayTest():", isDayTest())

module.exports = isDayTest;
