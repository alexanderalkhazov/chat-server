import bodyParser = require("koa-bodyparser");
import { ApplicationConfigurationService } from "./SettingsService";

export const SettingsController = (router: any) => {
  router.get("/api/settings/countryCodes", bodyParser(), getCountryCodes);
};

export const getCountryCodes = async (ctx: any) => {
  try {
    const { success, msg, data } = await new ApplicationConfigurationService().getCountryCodes();
    if (success) {
      ctx.body = JSON.stringify({ success, msg, data });
      ctx.status = 200;
    } else {
      ctx.body = JSON.stringify({ success, msg });
      ctx.status = 500;
    }
  } catch (ex) {
    ctx.body = JSON.stringify({ success: false, msg: "server error" });
    ctx.status = 500;
  }
};