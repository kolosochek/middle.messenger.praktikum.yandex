import { IndexView } from '../views/IndexView';
import { AuthView } from '../views/AuthView';
import { ProfileView } from '../views/ProfileView';
import { ErrorView } from '../views/ErrorView';

export type pathType =
    '/'
    | '/messenger'
    | '/auth'
    | '/sign-up'
    | '/logout'
    | '/settings'
    | '/settings-edit'
    | '/settings-change-password'
    | '/message'
    | '/error404'
    | '/error500'
    | boolean;

interface Route {
    path: pathType,
    view: IndexView | AuthView | ProfileView | ErrorView,
    isAuthorizationRequired: boolean,
    options?: object | object[],
}

export class Router {
    public static routesArray: Route[] = [];
    public static currentRoute: Route;
    public static currentView: Route['view'];
    public static currentPath: Route['path'];
    public static isExternalRoute: boolean;

    private static _parseLocation = (): pathType => {
        return location.hash.slice(1).toLowerCase() as pathType || '/';
    }

    public static goBack(): void {
        window.history.back();
    }

    public static goFoward(): void {
        window.history.forward();
    }

    public static registerRoute(route: Route, actions?:object): void {
        if (actions){

        } else {
            Router.routesArray.push(route);
        }
    }

    public static go(path: Route['path']): void {
        //
        console.log(`path`)
        console.log(path)
        //
        Router.currentRoute = Router.getRouteByPath(path);
        Router.currentPath = path;
        Router.isExternalRoute = true;
        //
        console.log(`Route`)
        console.log(Router.currentRoute)
        //
        window.location.hash = path;
        window.dispatchEvent(new HashChangeEvent("hashchange"));
    }

    public static getRouteByPath(path: Route['path']): Route {
        const isAuthorized: boolean = AuthView.getIsAuthorized();
        Router.currentRoute = {
            path: '/',
            view: new ErrorView({ mode: "error500" }),
            isAuthorizationRequired: false,
        }
        Router.currentView = Router.currentRoute.view;

        if (isAuthorized) {
            let isErrorView = true;
            Router.routesArray.forEach((route) => {
                if (route.path == path) {
                    Router.currentRoute = route;
                    Router.currentView = route.view;
                    isErrorView = false;
                }
            });
            if (isErrorView) {
                Router.currentRoute = {
                    path: '/',
                    view: new ErrorView({ mode: 'error404' }),
                    isAuthorizationRequired: false
                }
                Router.currentView = Router.currentRoute.view;
            }
        } else {
            // prepare routes for unauthorized users
            const unauthorizedRoutes: Route[] = [];
            Router.routesArray.forEach((route) => {
                if (!route.isAuthorizationRequired) {
                    unauthorizedRoutes.push(route);
                }
            });
            // iterate trough it and get the proper route
            let isPageNotFound = true;
            unauthorizedRoutes.forEach((route) => {
                if (route.path == path) {
                    Router.currentRoute = route;
                    Router.currentView = route.view;
                    isPageNotFound = false;
                } 
            });
            if (isPageNotFound) {
                // return error404 view if path is unavaliable
                const route: Route = {
                    path: '/',
                    view: new ErrorView({ mode: "error404" }),
                    isAuthorizationRequired: false,
                }
                Router.currentRoute = route;
                Router.currentView = route.view
            }
        }
        return Router.currentRoute;
    }

    public static registerRoutes(): void {
        // auth
        Router.registerRoute({ path: '/', view: new AuthView({ mode: 'auth' }), isAuthorizationRequired: false });
        Router.registerRoute({ path: '/sign-up', view: new AuthView({ mode: 'signup' }), isAuthorizationRequired: false });
        Router.registerRoute({ path: '/logout', view: new AuthView({ mode: 'auth' }), isAuthorizationRequired: false }, { 'function': '() => { console.log("gotcha")}'});
        // messenger(chat)
        Router.registerRoute({ path: '/messenger', view: new IndexView({}), isAuthorizationRequired: true });
        // settings(profile)
        Router.registerRoute({ path: '/settings', view: new ProfileView({ mode: 'view' }), isAuthorizationRequired: true });
        Router.registerRoute({ path: '/settings-edit', view: new ProfileView({ mode: 'edit' }), isAuthorizationRequired: true });
        Router.registerRoute({ path: '/settings-change-password', view: new ProfileView({ mode: 'change-password' }), isAuthorizationRequired: true });
        // error
        Router.registerRoute({ path: '/error404', view: new ErrorView({ mode: 'error404' }), isAuthorizationRequired: true });
        Router.registerRoute({ path: '/error500', view: new ErrorView({ mode: 'error500' }), isAuthorizationRequired: true }); 
    }

    public static renderRoute(): void {
        const path: pathType = Router.currentPath || Router._parseLocation();
        if (Router.isExternalRoute) {
            Router.isExternalRoute = false;
            Router.currentPath = false;
        } else {
            Router.currentRoute = Router.getRouteByPath(path);
            Router.currentView = Router.currentRoute.view;
        }
        const root = document.getElementById('root') as HTMLDivElement;
        if (root !== null) {
            root.innerHTML = '';
            // render view && inject compiled HTML to DOM
            root.appendChild(Router.currentRoute.view.getContent()!);
            Router.currentRoute.view.dispatchComponentDidMount();
        } else {
            throw new Error("There is no #root");
        }
    }
}
