import { Router } from "./utils/Router";

const router: Router = new Router();

window.addEventListener('DOMContentLoaded', () => {
    router.registerRoutes(router)
    router.renderRoute()
})
window.addEventListener('popstate', (e) => {
    console.log('gotcha')
    e.preventDefault()
    router.renderRoute()
}, false);
