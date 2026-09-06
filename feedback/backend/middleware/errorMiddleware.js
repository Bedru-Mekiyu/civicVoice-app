// Error middleware placeholder
module.exports = {
  errorHandler: (err, req, res, _next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({ message: err.message });
  }
};
