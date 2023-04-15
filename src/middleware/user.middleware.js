const { userFormatError } = require("../constant/err.type");

const validatorUserInfo = async (ctx, next) => {
  console.log(ctx.request.body);
  try {
    ctx.verifyParams({
      name: { type: "string", required: true },
      cellphoneNumber: { type: "number", required: true },
      companyName: { type: "string", required: true },
      applicationIntention: {
        type: "enum",
        values: [
          "openingTrial",
          "applyShow",
          "moduleIntroduction",
          "purchaseConsultation",
        ],
      },
      remark: { type: "string", required: true },
    });
  } catch (err) {
    console.error(err);
    userFormatError.data = err;
    ctx.app.emit("error", userFormatError, ctx);
    return;
  }
  await next();
};
module.exports = {
  validatorUserInfo,
};
