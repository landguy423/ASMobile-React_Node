const hosts = {
  local: 'http://localhost',
  web: 'http://kubernetes.baseurl',
  app: 'http://api.actionsportscommunity.com'
};

const routes = {
  auth: {
    apiext: 'v1/identities',
    port: 3100
  },
  user: {
    apiext: 'v1/profiles',
    port: 3000
  },
  comms: {
    apiext: 'v1/email',
    port: 3900
  },
  tags: {
    apiext: 'v1/tags',
    port: 3901
  }
};

const createUrl = (host, port, apiext) => {
  return `${host}${port ? `:${port}/` : '/'}${apiext}`;
};

const createRoutes = api => Object.keys(routes).reduce((obj, key) => {
  const host = (api === 'docker' ? `http://api-${key}` : hosts[api]) || hosts.local;
  const port = api === 'app' ? false : routes[key].port;
  const url = createUrl(host, port, routes[key].apiext);
  return { ...obj, [key]: url };
}, {});

export default createRoutes;
