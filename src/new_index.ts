import { IndexView } from './views/IndexView';

// main Router class
class Router {
    // page views
    public views: any = {
        'IndexView': new IndexView({}),
    }

    // all possible routes
    public routes: object[] = [
        { path: '/', view: this.views.IndexView, },
        
    ];

    // routes taht user can get only without authorization
    private unauthorizedRoutes: object[] = [
        { path: '/', view: this.views.AuthView, },
        { path: '/auth', view: this.views.AuthView, },
        { path: '/signup', view: this.views.SignUpView, },
    ]

    private parseLocation = () => {
        return location.hash.slice(1).toLowerCase() || '/';
    }

    private findViewByPath = (path: string, routes: object[]) => {
        return routes.find(route => route.path.match(new RegExp(`^\\${path}$`, 'gm'))) || undefined;
    }

    public route = () => {
        const isAuthorized = window.localStorage.getItem('isAuthorized');
        const path = this.parseLocation();
        const page = isAuthorized ? this.findViewByPath(path, this.routes) || { view: this.views.Error404View } : this.findViewByPath(path, this.unauthorizedRoutes) || { view: this.views.Error404View };
        // render the page && inject compiled HTML to DOM
        document.getElementById('root')?.appendChild(page.view.getContent());
        // component-did-mount
        page.view.componentDidMount();


        // auth form submit event handler
        const authForm = document.querySelector('.b-auth-page form');
        if (authForm) {
            authForm.addEventListener('submit', (e) => {
                e.preventDefault();
                window.localStorage.setItem('isAuthorized', 'true');
                window.location.hash = '/';
                window.dispatchEvent(new HashChangeEvent("hashchange"));
            });
        }

        // chat page settings click event handler
        const chatSettings = document.querySelector('.b-chat-settings-link');
        if (chatSettings) {
            chatSettings.addEventListener('click', (e) => {
                e.preventDefault();
                document.querySelector('.b-chat-settings-wrapper').classList.toggle('state__visible');
            });
        }
        // chat page file attach click event handler
        const chatFileAttach = document.querySelector('.b-attach-file-link');
        if (chatFileAttach) {
            chatFileAttach.addEventListener('click', (e) => {
                e.preventDefault();
                document.querySelector('.b-chat-reply-attachment-wrapper').classList.toggle('state__visible');
            });
        }
    };
}

const router = new Router();

// router event listeners
window.addEventListener('load', router.route);
window.addEventListener('hashchange', router.route);
