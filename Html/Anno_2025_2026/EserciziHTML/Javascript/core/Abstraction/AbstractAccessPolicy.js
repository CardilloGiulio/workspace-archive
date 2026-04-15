export class AbstractAccessPolicy {
    constructor() {
        if (new.target === AbstractAccessPolicy) {
            throw new Error("AbstractAccessPolicy cannot be instantiated directly.");
        }
    }

    getFrontendOrigin() {
        throw new Error("getFrontendOrigin() must be implemented by subclasses.");
    }

    getBackendOrigin() {
        throw new Error("getBackendOrigin() must be implemented by subclasses.");
    }

    getEndpoint(endpointName) {
        throw new Error("getEndpoint() must be implemented by subclasses.");
    }

    resolveUrl(endpointName) {
        const endpointPath = this.getEndpoint(endpointName);
        return new URL(endpointPath, this.getBackendOrigin()).toString();
    }

    validateEndpoint(endpointName) {
        try {
            return Boolean(this.getEndpoint(endpointName));
        } catch {
            return false;
        }
    }
}
