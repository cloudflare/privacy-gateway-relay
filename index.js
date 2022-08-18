// Note: change this URL to point to the OHTTP target.
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Handle relayed requests.
 * @param {Request} request
 */
async function handleRequest(request) {
  const url = new URL(request.url);

  // Check to see if metadata should be returned
  if (url.pathname.startsWith("/metadata")) {
    const data = request.cf !== undefined ?
        request.cf :
        { error: "Metadata unavailable" }
    return new Response(JSON.stringify(data, null, 2), {
      headers: {
        "content-type": "application/json;charset=UTF-8"
      }
    })
  }

  // Handle all other requests as relay requests
  return handleRelayRequest(request)
}

async function handleRelayRequest(request) {
  // Check method type and Content-Type header
  if (request.method != 'POST') {
    return new Response('Invalid request', { status: 400 })
  }
  const { headers } = request
  const contentType = headers.get("content-type") || ""
  if (!contentType.includes("message/ohttp-req")) {
    return new Response('Invalid request', { status: 400 })
  }

  // Forward the request
  const response = await fetch(TARGET, {
    method: 'POST',
    headers: {
      "content-type": "message/ohttp-req",
    },
    body: request.body,
  })

  return response
}
