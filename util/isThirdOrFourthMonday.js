function isThirdOrFourthMonday() {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const dateOfMonth = today.getDate();

  if (
    dayOfWeek === 1 &&
    ((dateOfMonth >= 15 && dateOfMonth <= 21) ||
      (dateOfMonth >= 22 && dateOfMonth <= 28))
  ) {
    return true;
  }
  return false;
}

module.exports = isThirdOrFourthMonday;
