/**
 * Intercepts requests to change the api:// and others
 * protocols to our environment http server.
 */
class ApiHttpInterceptor {
  request(config) {
    config.url = config.url.replace("api://", process.env.API_URL);
    return config;
  }
}

export default ApiHttpInterceptor;
