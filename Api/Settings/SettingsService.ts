import { countryCodes } from "../../assets/countryCodes";

export class ApplicationConfigurationService {
  async getCountryCodes(): Promise<{
    success: boolean;
    msg: string;
    data?: any;
  }> {
    try {
      return { success: true, msg: "getCountryCodes service OK.", data: { countryCodes }};
    } catch (error) {
        return { success: false, msg: "Exception: " + error.message }
    }
  }
}