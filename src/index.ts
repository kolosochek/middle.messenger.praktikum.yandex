import { Router } from "./utils/Router";

const router: Router = new Router();

window.addEventListener('load', router.registerRoutes(router))
window.addEventListener('popstate', router.renderRoute(router));
