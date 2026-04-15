export class HttpCommunicationService {
    constructor(accessPolicy) {
        if (!accessPolicy) {
            throw new Error("An access policy is required.");
        }

        this._accessPolicy = accessPolicy;
    }

    async get(endpointName, options = {}) {
        return this._request(endpointName, {
            method: "GET",
            ...options
        });
    }

    async _request(endpointName, options) {
        if (!this._accessPolicy.validateEndpoint(endpointName)) {
            throw new Error(`Endpoint not allowed by policy: ${endpointName}`);
        }

        const url = this._accessPolicy.resolveUrl(endpointName);
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        const contentType = response.headers.get("content-type") || "";

        if (contentType.includes("application/json")) {
            return response.json();
        }

        return response.text();
    }
}
