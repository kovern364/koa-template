const { APP_PORT } = require("./config/config.default");
const app = require("./app/index");
// 时间格式化
require('./utils/date')

app.listen(APP_PORT, () => {
  console.log(`server is running on http://localhost:${APP_PORT}`);
});
