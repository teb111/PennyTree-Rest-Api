// Handle errors
const errorResponse = (res, error = {}, statusCode = 500) => {
  res.status(statusCode).json({
    success: false,
    error: {
      statusCode,
      error: error instanceof Error ? error.message : error,
    },
  });
};

// handle all success
const successResponse = (res, message, statusCode = 200) => {
  res.status(statusCode).json({
    success: true,
    response: {
      statusCode,
      message,
    },
  });
};

module.exports = { errorResponse, successResponse };
