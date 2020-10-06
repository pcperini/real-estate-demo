const baseUrl = (
  process.env.NODE_ENV === 'development' ? 'http://localhost:3001/api' : '/api'
);

function get(path) {
  return call('GET', path);
}

function post(path, body) {
  return call('POST', path, body);
}

function put(path, body) {
  return call('PUT', path, body);
}

function del(path, body) {
  return call('DELETE', path, body);
}

function call(method, path, body) {
  return fetch(`${baseUrl}${path}`, {
    method,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  });
}

export { get, post, put, del, baseUrl };
