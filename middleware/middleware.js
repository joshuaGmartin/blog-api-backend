//redirect to home if no logged in
export function isAuthCheck(req, res, next) {
  if (!res.locals.isAuth) return res.redirect("/");
  next();
}

export function isNoAuthCheck(req, res, next) {
  if (res.locals.isAuth) return res.redirect("/home");
  next();
}
