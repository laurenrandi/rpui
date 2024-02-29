//choose whether to use localhost or remote service for the entire app
const useLocalhost = false;

const ServiceUtils = Object.freeze({
  baseUrl: useLocalhost ? 'http://localhost:8080' : 'https://sparq-9234b76437c6.herokuapp.com'
});

export default ServiceUtils;