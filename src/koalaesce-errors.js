export class MissingLinkError extends Error {
    constructor(link) {
        super("Missing link at " + link);
    }
}

export class NullLinkError extends Error {
    constructor(link) {
        super("Encountered a null link at " + link);
    }
}

export class NotInvokableError extends Error {
    constructor(link) {
        super("Attempting to invoke non-function at " + link);
    }
}
