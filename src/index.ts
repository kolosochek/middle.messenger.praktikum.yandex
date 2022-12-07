import { Router } from "./utils/Router";

const router: Router = new Router();

window.addEventListener('load', router.route)
window.addEventListener('hashchange', router.route);
