function isSecondOrThirdMonday() {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const dateOfMonth = today.getDate();

  if (dayOfWeek === 1 && ((dateOfMonth >= 8 && dateOfMonth <= 14) || (dateOfMonth >= 15 && dateOfMonth <= 21))) {
    return true;
  }
  return false;
}

module.exports = isSecondOrThirdMonday;
