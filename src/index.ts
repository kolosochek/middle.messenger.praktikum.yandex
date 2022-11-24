import Block from './utils/Block';
import { IndexView } from './views/IndexView';
import { AuthView } from './views/AuthView';
import { ProfileView } from './views/ProfileView';
import { Error404View } from './views/Error404View';
import { Error500View } from './views/Error500View';

// main Router class
class Router {
    private _parseLocation = () => {
        return location.hash.slice(1).toLowerCase() || '/';
    }

    public route = () => {
        const isAuthorized = AuthView.getIsAuthorized();
        const path = this._parseLocation();
        let page: Block;

        if (isAuthorized) {
            switch (path) {
                case '/': {
                    page = new IndexView({});
                    break;
                }
                case '/auth': {
                    page = new AuthView({ mode: 'auth' });
                    break;
                }
                case '/signup': {
                    page = new AuthView({ mode: 'signup' });
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
                case '/profile-edit': {
                    page = new ProfileView({ mode: 'edit' });
                    break;
                }
                case '/profile-change-password': {
                    page = new ProfileView({ mode: 'change-password' });
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
            switch (path) {
                case '/': {
                    page = new AuthView({ mode: 'auth' });
                    break;
                }
                case '/auth': {
                    page = new AuthView({ mode: 'auth' });
                    break;
                }
                case '/signup': {
                    page = new AuthView({ mode: 'signup'});
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


        // TODO: refactor all below

        // chat page settings click event handler
        /* 
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
        */
    };
}

const router = new Router();

// router event listeners
window.addEventListener('DOMContentLoaded', router.route);
window.addEventListener('hashchange', router.route);
