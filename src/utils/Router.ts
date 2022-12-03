import Block from './Block';
import { IndexView } from '../views/IndexView';
import { AuthView } from '../views/AuthView';
import { ProfileView } from '../views/ProfileView';
import { ErrorView } from '../views/ErrorView';

export class Router {
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
                    page = new ErrorView({ mode: 'Error404' });
                    break;
                }
                case '/error500': {
                    page = new ErrorView({ mode: 'Error500' });
                    break;
                }
                default: {
                    page = new ErrorView({ mode: 'Error404' });
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
                    page = new AuthView({ mode: 'signup' });
                    break;
                }
                default: {
                    page = new ErrorView({ mode: 'Error404' });
                    break;
                }
            }
        }

        const root = document.getElementById('root');
        if (root !== null) {
            root.innerHTML = '';
            // render the page && inject compiled HTML to DOM
            root.appendChild(page.getContent());
            page.dispatchComponentDidMount();
        } else {
            throw new Error("There is no #root");
        }
    };
}
