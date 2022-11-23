import Block from './utils/Block';
import { IndexView } from './views/IndexView';
import { AuthView } from './views/AuthView';
import { SignUpView } from './views/SignUpView';
import { ProfileView } from './views/ProfileView';
import { Error404View } from './views/Error404View';
import { Error500View } from './views/Error500View';

// main Router class
class Router {
    private parseLocation = () => {
        return location.hash.slice(1).toLowerCase() || '/';
    }

    public route = () => {
        const isAuthorized = AuthView.getIsAuthorized();
        let page: Block;

        if (isAuthorized) {
            switch (this.parseLocation()) {
                case '/': {
                    page = new IndexView({});
                    break;
                }
                case '/auth': {
                    page = new AuthView({ mode: 'auth' });
                    break;
                }
                case '/signup': {
                    page = new SignUpView({ mode: 'signup' });
                    break;
                }
                case '/logout': {
                    page = new AuthView({ mode: 'logout' });
                    break;
                }
                case '/profile': {
                    page = new ProfileView({ mode: 'view' });
                    break;
                }
                case '/error404': {
                    page = new Error404View({});
                    break;
                }
                case '/error500': {
                    page = new Error500View({});
                    break;
                }
                default: {
                    page = new Error404View({});
                    break;
                }
            }
        } else {
            switch (this.parseLocation()) {
                case '/': {
                    page = new AuthView({ mode: 'auth' });
                    break;
                }
                case '/auth': {
                    page = new AuthView({ mode: 'auth' });
                    break;
                }
                case '/signup': {
                    page = new SignUpView({ mode: 'signup'});
                    break;
                }
                default: {
                    page = new Error404View({});
                    break;
                }
            }
        }

        const root = document.getElementById('root');
        if (root) {
            root.innerHTML = '';
            // render the page && inject compiled HTML to DOM
            root.appendChild(page.getContent());
            page.componentDidMount();

        }

        // auth form submit event handler
        //const authForm = document.querySelector('.b-auth-page form');
        //if (authForm) {
        //    authForm.addEventListener('submit', (e) => {
        //        e.preventDefault();
        //        window.localStorage.setItem('isAuthorized', 'true');
        //        window.location.hash = '/';
        //        window.dispatchEvent(new HashChangeEvent("hashchange"));
        //    });
        //}

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
