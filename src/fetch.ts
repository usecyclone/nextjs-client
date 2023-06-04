import { PostHogFetchOptions, PostHogFetchResponse } from 'posthog-node/lib/posthog-core/src'
import fetchAdapter from './axios_adapter'
import axios from 'axios'

// Next.js middleware does not support axios
export const fetch = async (url: string, options: PostHogFetchOptions): Promise<PostHogFetchResponse> => {
    const res = await axios.request({
        url,
        headers: options.headers,
        method: options.method.toLowerCase(),
        data: options.body,
        signal: options.signal,
        // fetch only throws on network errors, not on HTTP errors
        validateStatus: () => true,
        adapter: fetchAdapter,
    })

    return {
        status: res.status,
        text: async () => res.data,
        json: async () => res.data,
    }
}