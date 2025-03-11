import { FirstController } from './First/FirstController'
import { DemoFlowController } from './Demo/DemoFlowController'

export function LoadPublicControllers (router: any) {
  // FirstController(router);
  DemoFlowController(router)
}

export function LoadControllers (router: any) {}

export function LoadAdminControllers (router: any) {}
