import { type PostHogFetchOptions, type PostHogFetchResponse } from 'posthog-node/lib/posthog-core/src'
import fetchAdapter from './fetchAdapter'
import axios from 'axios'

// Next.js middleware does not support axios
export const fetch = async (url: string, options: PostHogFetchOptions): Promise<PostHogFetchResponse> => {
  const headers = options.headers

  // Node.js has a bug that transfer encoding = chunked to not work with PostHog
  // Setting content length let us avoid that.
  if (options.body != null) {
    headers['Content-Length'] = options.body.length.toString()
  }

  const res = await axios.request({
    url,
    headers: options.headers,
    method: options.method.toLowerCase(),
    data: options.body,
    signal: options.signal,
    // fetch only throws on network errors, not on HTTP errors
    validateStatus: () => true,
    // using fetchAdapter since axios is not supported in next.js middleware
    adapter: fetchAdapter
  })

  return {
    status: res.status,
    text: async () => res.data,
    json: async () => res.data
  }
}
