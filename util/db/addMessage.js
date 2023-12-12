function addMessage(res, message) {
  return res.status(200).send(message);
}

module.exports = {
  addMessage,
};
