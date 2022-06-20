const HttpStatusCode = {
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER: 500,
  }
  
  class BaseError extends Error {
    constructor(name, code = 400, description, operational = true, user) {
      super(name)
      this.code = code;
      this.user = user;
      this.description = description;
      this.operational = operational;
    }
  }
  
  class NotFound extends BaseError {
    constructor(name = '', description = 'not found', user) {
      super(name, HttpStatusCode.NOT_FOUND, description, user);
    }
  }
  
  class BadRequest extends BaseError {
    constructor(name = '', description = 'bad request', user) {
      super(name, HttpStatusCode.BAD_REQUEST, description, user);
    }
  }
  
  class ServerError extends BaseError {
    constructor(name = '', description = 'server error', user) {
      super(name, HttpStatusCode.INTERNAL_SERVER, description, user);
    }
  }
  
  exports.BadRequest = BadRequest;
  exports.NotFound = NotFound;
  exports.ServerError = ServerError;
  exports.BaseError = BaseError;