import { SettingsController } from "./Settings/SettingsController";

export function LoadPublicControllers(router: any) {
  SettingsController(router);
}

export function LoadControllers(router: any) {}

export function LoadAdminControllers(router: any) {}
