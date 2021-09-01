const errorHandler = (err: any, req: any, res: any, next: any) => {
  try {
    if (err.name === 'ValidationError')
      return (err = handleValidationError(err, res));
    if (err.code && err.code == 11000)
      return (err = handleDuplicateKeyError(err, res));
    else res.status(500).send('An unknown error occurred');
  } catch (error) {
    res.status(500).send('An unknown error occurred');
  }
};
const handleDuplicateKeyError = (err: any, res: any) => {
  const field = Object.keys(err.keyValue);
  const code = 409;

  const error = `An account with that ${field} already exists.`;
  res.status(code).send({ messages: error, fields: field });
};
const handleValidationError = (err: any, res: any) => {
  let errors = Object.values(err.errors).map((el: any) => el.message);

  let fields = Object.values(err.errors).map((el: any) => el.path);

  let code = 400;

  if (errors.length > 1) {
    const formattedErrors = errors.join(' ');
    res.status(code).send({ messages: formattedErrors, fields });
  } else {
    res.status(code).send({ messages: errors, fields });
  }
};

export { errorHandler };
