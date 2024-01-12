function addMessage(res, message) {
  return res.status(200).send(message);
}
function resJSON(res, body) {
  return res.status(200).json(body);
}

module.exports = {
  addMessage,
  resJSON
};
