function errorLogger(error, req, res, next) {
  if (error.type == 'redirect') {
    res.redirect('/error');
  } else if (error.type == 'time-out') {
    res.status(408).send(error);
  } else {
    next(error);
  }
}
