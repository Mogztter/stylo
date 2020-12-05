const askGraphQL = async (endpoint, payload, action = 'fetching from the server') => {
  const response = await fetch(endpoint, {
    method: "POST",
    mode: "cors",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    let res = await response.json()
    if (res) {
      res = res.errors || [{ message: "problem" }]
    }
    if (res) {
      res = res[0].message
    }
    console.log(`${JSON.stringify(res)}. Something wrong happened during: ${action} => {status: ${response.status}, statusText: ${response.statusText}}.`)
    throw new Error(res)
  }

  const json = await response.json()
  if (json.errors) {
    throw new Error(json.errors[0].message)
  }
  return json.data
}

export default askGraphQL
