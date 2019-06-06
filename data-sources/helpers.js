const paramsMap = {
  country: 'country',
  locale: 'locale',
  offset: 'offset',
  limit: 'limit',
  market: 'market'
};

const optionsToQueryString = options =>
  Object.keys(options)
    .filter(key => paramsMap[key]) // remove non-filtering options
    .map(key => {
      return `${paramsMap[key]}=${options[key]}`;
    })
    .join('&');

export { optionsToQueryString };
