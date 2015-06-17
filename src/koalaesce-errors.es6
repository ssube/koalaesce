export class BaseError extends Error {
  constructor(message) {
    super();

    if (Error.hasOwnProperty('captureStackTrace')) {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error().stack;
    }

    this.name = this.constructor.name;
    this.message = message;
  }

  toString() {
    return `${this.name}: ${this.message}`;
  }
}

export class MissingLinkError extends BaseError {
  constructor(link) {
    super(`Missing link at ${link}`);
  }
}

export class NullLinkError extends BaseError {
  constructor(link) {
    super(`Encountered a null link at ${link}`);
  }
}

export class NotInvokableError extends BaseError {
  constructor(link) {
    super(`Attempting to invoke non-function at ${link}`);
  }
}
