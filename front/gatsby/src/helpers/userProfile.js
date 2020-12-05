export function getUserProfile (backendEndpoint) {
  return fetch(`${backendEndpoint}/profile`, {
      method: 'GET',
      credentials: 'include',
      cors: true
    }
  ).then(res => res.json())
}
