"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetch = void 0;
const fetchAdapter_1 = __importDefault(require("./fetchAdapter"));
const axios_1 = __importDefault(require("axios"));
// Next.js middleware does not support axios
const fetch = async (url, options) => {
    const headers = options.headers;
    // Node.js has a bug that transfer encoding = chunked to not work with PostHog
    // Setting content length let us avoid that.
    if (options.body != null) {
        headers['Content-Length'] = options.body.length.toString();
    }
    const res = await axios_1.default.request({
        url,
        headers: options.headers,
        method: options.method.toLowerCase(),
        data: options.body,
        signal: options.signal,
        // fetch only throws on network errors, not on HTTP errors
        validateStatus: () => true,
        // using fetchAdapter since axios is not supported in next.js middleware
        adapter: fetchAdapter_1.default
    });
    return {
        status: res.status,
        text: async () => res.data,
        json: async () => res.data
    };
};
exports.fetch = fetch;
