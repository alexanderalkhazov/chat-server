import { FirstController } from "./First/FirstController";

export function LoadPublicControllers(router: any) {
  FirstController(router);
}

export function LoadControllers(router: any) {}

export function LoadAdminControllers(router: any) {}
