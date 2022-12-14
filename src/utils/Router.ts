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
    | '/user'

interface Route {
    path: pathType,
    view: typeof IndexView | typeof AuthView | typeof ProfileView | typeof ErrorView,
    options?: object | object[],
    isAuthorizationRequired: boolean,
    _instance?: IndexView | AuthView | ProfileView | ErrorView | undefined,
}

export class Router {
    private static _instance: Router;
    public routesArray: Route[] = [];
    public currentRoute: Route;
    public currentView: Route['view'];
    public currentPath: Route['path'] | false;
    public currentViewParams: Record<string, string>
    public isExternalRoute: boolean;


    constructor() {
        if (Router._instance) {
          return Router._instance;
        }
    
        Router._instance = this;
      }

    public _parseLocation = ():pathType => {
        const path = window.location.pathname.toLowerCase() as pathType || '/'
        const onlyNumbers = new RegExp(/(\d+)/)
        const usersDynamicalParams = new RegExp(/^\/users\/(\d)*/g);
        if (usersDynamicalParams.test(path) && path.match(onlyNumbers)){
            this.currentViewParams = {
                userId: path.match(onlyNumbers)![0]
            }
            return '/user'
        }
        return path;
    }

    public goBack(): void {
        window.history.back();
    }

    public goFoward(): void {
        window.history.forward();
    }

    public useRoute(route: Route): void {        
        this.routesArray.push(route);
    }

    public go(path: Route['path']): void {
        this.isExternalRoute = true;
        this.currentRoute = this.getRouteByPath(path);
        this.currentPath = path;
        window.history.pushState({}, '', path);
        this.renderRoute()
    }

    public getRouteByPath(path: Route['path']): Route {
        const isAuthorized: boolean = AuthView.getIsAuthorized();
        this.currentRoute = {
            path: '/',
            view: ErrorView,
            options: { mode: "error500" },
            isAuthorizationRequired: false,
        }
        this.currentView = this.currentRoute.view;

        if (isAuthorized) {
            let isErrorView = true;
            this.routesArray.forEach((route) => {
                if (route.path == path) {
                    this.currentRoute = route;
                    this.currentView = route.view;
                    isErrorView = false;
                }
            });
            if (isErrorView) {
                this.currentRoute = {
                    path: '/',
                    view: ErrorView,
                    options: { mode: 'error404' },
                    isAuthorizationRequired: false
                }
                this.currentView = this.currentRoute.view;
            }
        } else {
            // prepare routes for unauthorized users
            const unauthorizedRoutes: Route[] = [];
            this.routesArray.forEach((route) => {
                if (!route.isAuthorizationRequired) {
                    unauthorizedRoutes.push(route);
                }
            });
            // iterate trough it and get the proper route
            let isPageNotFound = true;
            unauthorizedRoutes.forEach((route) => {
                if (route.path == path) {
                    this.currentRoute = route;
                    this.currentView = route.view;
                    isPageNotFound = false;
                } 
            });
            if (isPageNotFound) {
                // return error404 view if path is unavaliable
                const route: Route = {
                    path: '/',
                    view: ErrorView,
                    options: { mode: "error404" },
                    isAuthorizationRequired: false,
                }
                this.currentRoute = route;
                this.currentView = route.view
            }
        }
        return this.currentRoute;
    }

    public registerRoutes(router:Router): void {
        // auth
        router.useRoute({ path: '/', view: AuthView, options: { mode: 'auth', router: router }, isAuthorizationRequired: false });
        router.useRoute({ path: '/sign-up', view: AuthView, options: { mode: 'signup', router: router }, isAuthorizationRequired: false });
        router.useRoute({ path: '/logout', view: AuthView, options: { mode: 'logout', router: router }, isAuthorizationRequired: false });
        // messenger(chat)
        router.useRoute({ path: '/messenger', view: IndexView, options: { router: router }, isAuthorizationRequired: true });
        // settings(profile)
        router.useRoute({ path: '/settings', view: ProfileView, options: { mode: 'view', router: router }, isAuthorizationRequired: true });
        router.useRoute({ path: '/settings-edit', view: ProfileView, options: { mode: 'edit', router: router }, isAuthorizationRequired: true });
        router.useRoute({ path: '/settings-change-password', view: ProfileView, options: { mode: 'change-password', router: router }, isAuthorizationRequired: true });
        // user
        router.useRoute({ path: '/user', view: ProfileView, options: { mode: 'view', router: router, isCanChangeProfile: false}, isAuthorizationRequired: true });
        // error
        router.useRoute({ path: '/error404', view: ErrorView, options: { mode: 'error404', router: router }, isAuthorizationRequired: true });
        router.useRoute({ path: '/error500', view: ErrorView, options: { mode: 'error500', router: router } ,isAuthorizationRequired: true }); 
    }

    public renderRoute(): void {
        const path: pathType = this.currentPath || this._parseLocation();
        if (this.isExternalRoute) {
            this.isExternalRoute = false;
            this.currentPath = false;
        } else {
            if(AuthView.getIsAuthorized() && path == '/') {
                this.go('/messenger')
            } else {
                this.currentRoute = this.getRouteByPath(path);
                this.currentView = this.currentRoute.view;
            }
        }
        const root = document.getElementById('root') as HTMLDivElement;
        if (root !== null) {
            root.innerHTML = '';
            let view = new this.currentRoute.view(this.currentRoute.options);
            if (this.currentViewParams){
                view = new this.currentRoute.view(Object.assign(this.currentRoute.options, this.currentViewParams))
            } 
            root.appendChild(view.getContent()!);
            view.dispatchComponentDidMount();
        } else {
            throw new Error("There is no #root");
        }
    }
}
