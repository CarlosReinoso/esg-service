function excludedEndpoints(req) {
  const route = req.path;
  console.log("🚀 ~ excludedEndpoints ~ route:", route);
  const excludedRoutesList = ["/stripe/oxxo-webhook"];
  console.log(
    "🚀 ~ excludedEndpoints ~ excludedRoutesList.includes(route):",
    excludedRoutesList.includes(route)
  );
  return excludedRoutesList.includes(route);
}

module.exports = excludedEndpoints;
