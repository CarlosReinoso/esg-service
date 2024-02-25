function excludedEndpoints(req) {
  const route = req.path;
  const excludedRoutesList = ["/stripe/oxxo-webhook"];
  return excludedRoutesList.includes(route);
}

module.exports = excludedEndpoints;
