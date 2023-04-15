module.exports = (err, ctx) => {
  let status = 500;
  switch (err.code) {
    case "10001":
      status = 400;
      break;
    default:
      status = 500;
  }
  console.log("status", status);
  ctx.status = status;
  ctx.body = err;
};
