import { getAssetFromKV, mapRequestToAsset } from '@cloudflare/kv-asset-handler'

/**
 * The DEBUG flag will do two things that help during development:
 * 1. we will skip caching on the edge, which makes it easier to
 *    debug.
 * 2. we will return an error message on exception in your Response rather
 *    than the default 404.html page.
 */
const DEBUG = false

addEventListener('fetch', event => {
  try {
    event.respondWith(handleEvent(event))
  } catch (e) {
    if (DEBUG) {
      return event.respondWith(
        new Response(e.message || e.toString(), {
          status: 500,
        }),
      )
    }
    event.respondWith(new Response('Internal Error', { status: 500 }))
  }
})

async function handleEvent(event) {

  const userAgent = event.request.headers.get('User-Agent');

  // 然后你可以在代码中使用 userAgent 变量
  // 例如，将 User Agent 添加到响应中：
  const isLine = userAgent.includes('Line/');
  if (!isLine) {
    return new Response('This site is under construction.')
  } else {
    const url = new URL(event.request.url)
    let options = {}
  
  
    try {
      if (DEBUG) {
        // customize caching
        options.cacheControl = {
          bypassCache: true,
        }
      }
  
      const page = await getAssetFromKV(event, options);
  
      // allow headers to be altered
      const response = new Response(page.body, page)
  
      response.headers.set('X-XSS-Protection', '1; mode=block')
      response.headers.set('X-Content-Type-Options', 'nosniff')
      response.headers.set('X-Frame-Options', 'DENY')
      response.headers.set('Referrer-Policy', 'unsafe-url')
      response.headers.set('Feature-Policy', 'none')
      response.headers.set("Access-Control-Allow-Origin", "*");
  
      return response
  
    } catch (e) {
      return new Response('Page not found')
    }
  }

  
}
