const catchAsync = (theFunc: any) => {
  return (req: any, res: any, next: any) => {
    theFunc(req, res, next).catch(next);
  };
};

export { catchAsync };
