import { type PostHogFetchOptions, type PostHogFetchResponse } from 'posthog-node/lib/posthog-core/src';
export declare const fetch: (url: string, options: PostHogFetchOptions) => Promise<PostHogFetchResponse>;
