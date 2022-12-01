import { Router } from "./utils/Router";

const router = new Router();

// router event listeners
window.addEventListener('DOMContentLoaded', router.route);
window.addEventListener('hashchange', router.route);
