import { AbstractAccessPolicy } from "../Abstraction/AbstractAccessPolicy.js";

export class LocalhostAccessPolicy extends AbstractAccessPolicy {
    constructor({ frontendOrigin = window.location.origin, backendOrigin = "http://localhost:3001" } = {}) {
        super();
        this._frontendOrigin = frontendOrigin;
        this._backendOrigin = backendOrigin;
        this._endpoints = Object.freeze({
            health: "/api/health"
        });
    }

    getFrontendOrigin() {
        return this._frontendOrigin;
    }

    getBackendOrigin() {
        return this._backendOrigin;
    }

    getEndpoint(endpointName) {
        const endpointPath = this._endpoints[endpointName];

        if (!endpointPath) {
            throw new Error(`Unknown endpoint: ${endpointName}`);
        }

        return endpointPath;
    }
}
