export const errorHandler = async (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  if (err.name === "castError" && err.kind === "ObjectId") {
    statusCode = 404;
    message = "resource not  Found";
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export const serverError = (err, req, res, next) => {
  console.error(err.stack);

  if (res.headersSent) {
    return next(err);
  }

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: err.message,
  });
};

export const handleNotFound = (req, res, next) => {
  //   sendError(res, `not found ${req.originalUrl}`, 404);0
  const error = new Error(`not found - ${req.originalUrl}`);

  res.status(404);
  next(error);
};
