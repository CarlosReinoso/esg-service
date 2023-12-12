const isValidCoupon = (couponCode) => {
  const validCoupons = ["besg202275", "90esgbeca", "besg20211125"];
  return validCoupons.includes(couponCode);
};

module.exports = {
  isValidCoupon,
};
