//choose whether to use localhost or remote service for the entire app
const useLocalhost = true;

const ServiceUtils = Object.freeze({
  baseUrl: useLocalhost ? 'http://localhost:8080' : ''
});

export default ServiceUtils;