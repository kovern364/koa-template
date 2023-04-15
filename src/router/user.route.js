const Router = require("koa-router");
const router = new Router();
const { sqlconnection } = require("../db/index");
const { validatorUserInfo } = require("../middleware/user.middleware");
const { userCreateError } = require("../constant/err.type");

router.prefix("/users");

router.post("/", validatorUserInfo, async (ctx, next) => {
  // ctx.router available
  console.log(ctx.request.body);
  //   ctx.body = ctx.request.body;
  const { name, cellphoneNumber, companyName, applicationIntention, remark } =
    ctx.request.body;
  try {
    const sqlStr = `insert into trial_user set ?`;

    let res = await sqlconnection(sqlStr, {
      name,
      cellphone_number: cellphoneNumber,
      company_name: companyName,
      application_intention: applicationIntention,
      remark,
      create_time: new Date().format("yyyy-MM-dd hh:mm:ss"),
    });
    console.log(res);
    ctx.body = {
      code: "0",
      msg: "提交成功！",
      data: res.insertId,
    };
  } catch (err) {
    console.log(err);
    ctx.app.emit("error", userCreateError, ctx);
  }
});
module.exports = router;
