import Block from './Block';
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
    | '/error500';

export class Routercopy {
    private _parseLocation = ():pathType => {
        return location.hash.slice(1).toLowerCase() as pathType || '/' as pathType;
    }

    public static go(path:pathType):void {
        window.location.hash = path;
        window.dispatchEvent(new HashChangeEvent("hashchange"));
    }

    public static goBack(path:pathType):void {
        window.history.back();
    }

    public route = () => {
        const isAuthorized = AuthView.getIsAuthorized();
        const path = this._parseLocation();
        let view: Block = new ErrorView({ mode: 'error500' });

        if (isAuthorized) {
            switch (path as pathType) {
                case '/messenger': {
                    view = new IndexView({});
                    break;
                }
                case '/': {
                    Router.go('/messenger');
                    break;
                }
                case '/logout': {
                    view = new AuthView({ mode: 'logout' });
                    break;
                }
                case '/settings': {
                    view = new ProfileView({ mode: 'view' });
                    break;
                }
                case '/settings-edit': {
                    view = new ProfileView({ mode: 'edit' });
                    break;
                }
                case '/settings-change-password': {
                    view = new ProfileView({ mode: 'change-password' });
                    break;
                }
                case '/error404': {
                    view = new ErrorView({ mode: 'error404' });
                    break;
                }
                case '/error500': {
                    view = new ErrorView({ mode: 'error500' });
                    break;
                }
                default: {
                    view = new ErrorView({ mode: 'error404' });
                    break;
                }
            }
        } else {
            switch (path as pathType) {
                case '/': {
                    view = new AuthView({ mode: 'auth' });
                    break;
                }
                case '/sign-up': {
                    view = new AuthView({ mode: 'signup' });
                    break;
                }
                case '/logout': {
                    view = new AuthView({ mode: 'logout' });
                    break;
                }
                default: {
                    view = new ErrorView({ mode: 'error404' });
                    break;
                }
            }
        }

        const root = document.getElementById('root') as HTMLDivElement;
        if (root !== null) {
            root.innerHTML = '';
            // render the page && inject compiled HTML to DOM
            root.appendChild(view.getContent());
            view.dispatchComponentDidMount();
        } else {
            throw new Error("There is no #root");
        }
    };
}
