import Handlebars from 'handlebars';
// view templates
import IndexPage from './pages/IndexPage.js'
import AuthPage from './pages/AuthPage.js';
import SignUpPage from './pages/SignUpPage.js';
import ProfilePage from './pages/ProfilePage.js';
import Error404Page from './pages/Error404Page.js';
import Error500Page from './pages/Error500Page.js';
// default dataset. TODO fetch me from API
import data from '../data.js';
import user from '../user.js';


// base view class
class View {
    constructor(public viewName: string, public viewTemplate: string, public viewContext: object = {}, protected readonly id: number = Math.floor(Math.random() * 10000)) { }
    renderView(template = this.viewTemplate): string {
        // debug
        //console.log(this.isAuthorised)
        //
        const compiled = Handlebars.compile(template);
        return compiled(this.viewContext);
    }
}

class IndexViewClass extends View {
    public activeChatId: string = window.localStorage.getItem('active_chat_id');
    public getActiveChatId = (): void => { this.activeChatId = window.localStorage.getItem('active_chat_id') }
    public getActiveChat = (data): object => {
        // let's update activeChatId to make a proper ID of chat that we wanna get
        this.getActiveChatId();
        for (const conversation of data) {
            if (conversation.chat_id == this.activeChatId) {
                return conversation;
            }
        }
    }
    // 
    public getViewContext = (): void => {
        this.viewContext = {
            conversationsList: data,
            activeChat: this.getActiveChat(data),
            active_chat_id: this.activeChatId
        }
    }
    public activeChat: object = this.getActiveChat(data);
    //
    public renderView = (): string => {
        this.getViewContext();
        const compiled = Handlebars.compile(this.viewTemplate);
        return compiled(this.viewContext);
    }

}

class LogoutViewClass extends View {
    public renderView = (): string => {
        window.localStorage.removeItem('isAuthorized');
        const compiled = Handlebars.compile(this.viewTemplate);
        return compiled(this.viewContext);
    }
}

// main Router class
class Router {
    // all possible views
    public views: object = {
        'IndexView': new IndexViewClass("IndexPage", IndexPage),
        'AuthView': new View('AuthPage', AuthPage),
        'LogoutView': new LogoutViewClass('AuthPage', AuthPage),
        'SignUpView': new View('SignUpPage', SignUpPage),
        'ProfileView': new View('ProfilePage', ProfilePage, { profile: user, mode: 'view' }),
        'ProfileEditView': new View('ProfileEdit', ProfilePage, { profile: user, mode: 'edit' }),
        'ProfilePasswordView': new View('ProfileChangePassword', ProfilePage, { profile: user, mode: 'change-password' }),
        'Error404View': new View('Error404View', Error404Page),
        'Error500View': new View('Error500View', Error500Page),
    }

    // all possible routes
    public routes: object[] = [
        { path: '/', view: this.views.IndexView, },
        { path: '/auth', view: this.views.AuthView, },
        { path: '/logout', view: this.views.LogoutView, },
        { path: '/signup', view: this.views.SignUpView, },
        { path: '/profile', view: this.views.ProfileView, },
        { path: '/profile-edit', view: this.views.ProfileEditView, },
        { path: '/profile-change-password', view: this.views.ProfilePasswordView, },
        { path: '/error404', view: this.views.Error404View, },
        { path: '/error500', view: this.views.Error500View, },
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
        // render the page &&
        // inject compiled HTML to DOM
        document.getElementById('root').innerHTML = page.view.renderView();

        // aside conversations list item click event handler
        [...document.querySelectorAll('.b-conversation')].forEach((conversation) => {
            conversation.addEventListener('click', (e) => {
                e.preventDefault();
                // set an active chat
                window.localStorage.setItem('active_chat_id', conversation.getAttribute('chat_id'));
                window.dispatchEvent(new HashChangeEvent("hashchange"));
            });
        });

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
