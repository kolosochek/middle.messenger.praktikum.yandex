import Handlebars from 'handlebars';
import IndexPage from './pages/IndexPage.js'
import AuthPage from './pages/AuthPage.js';
import SignUpPage from './pages/SignUpPage.js';
import ProfilePage from './pages/ProfilePage.js';
import Error404Page from './pages/Error404Page.js';
import Error500Page from './pages/Error500Page.js';
// import default dataset. TODO fetch me from API
import data from '../data.js';
import user from '../user.js';


// base view component
class View {
    constructor(public viewName:string, public viewTemplate: string, public viewContext:object = {}, protected id: number = Math.floor(Math.random() * 10000)){}
    // render da view
    public renderView = ():string => {
        const compiled = Handlebars.compile(this.viewTemplate);
        return compiled(this.viewContext);
    }
}

// index page view
class IndexViewClass extends View {
    // get chat by id
    // @return Conversation object
    public activeChatId:string = window.localStorage.getItem('active_chat_id');
    public getActiveChatId = ():void => { this.activeChatId = window.localStorage.getItem('active_chat_id'); }
    public getActiveChat = (data):object => {
        // let's update activeChatId to make a proper ID of that that we wanna get
        this.getActiveChatId();
        for (const conversation of data) {
            if (conversation.chat_id == this.activeChatId) {
                return conversation;
            }
        }
    } 
    // 
    public getViewContext = ():void => {
        this.viewContext = { 
            conversationsList: data, 
            activeChat: this.getActiveChat(data), 
            active_chat_id: this.activeChatId 
        }
    }
    public activeChat:object = this.getActiveChat(data);
    //
    public renderView = ():string => {
        this.getViewContext();  
        const compiled = Handlebars.compile(this.viewTemplate);
        return compiled(this.viewContext);
    }

}

class LogoutViewClass extends View {
    public renderView = ():string => {
        window.localStorage.removeItem('isAuthorized');
        const compiled = Handlebars.compile(this.viewTemplate);
        return compiled(this.viewContext);
    }
}

// index page view
const IndexView = new IndexViewClass(viewName="IndexPage", viewTemplate=IndexPage); 

// auth page view
const AuthView = new View(viewName='AuthPage', viewTemplate=AuthPage);

// logout page view
const LogoutView = new LogoutViewClass(viewName='AuthPage', viewTemplate=AuthPage);

// signup page view
const SignUpView = new View(viewName='SignUpPage', viewTemplate=SignUpPage);

// profile page view
const ProfileView = new View(viewName='ProfilePage', viewTemplate=ProfilePage ,viewContext={profile: user, mode: 'view'});

// profile edit view
const ProfileEditView = new View(viewName='ProfileEdit', viewTemplate=ProfilePage ,viewContext={profile: user, mode: 'edit'});

// profile password-change view
const ProfilePasswordView = new View(viewName='ProfileChangePassword', viewTemplate=ProfilePage ,viewContext={profile: user, mode: 'change-password'});

// error 4** page view
const Error404View = new View(viewName='Error404View', viewTemplate=Error404Page);

// error 5** page view
const Error500View = new View(viewName='Error500View', viewTemplate=Error500Page);

// all possible routes
const routes = [
    { path: '/', view: IndexView, },
    { path: '/auth', view: AuthView, },
    { path: '/logout', view: LogoutView, },
    { path: '/signup', view: SignUpView, },
    { path: '/profile', view: ProfileView, },
    { path: '/profile-edit', view: ProfileEditView, },
    { path: '/profile-change-password', view: ProfilePasswordView, },
    { path: '/error404', view: Error404View, },
    { path: '/error500', view: Error500View, },
];

// routes taht user can get only without authorization
const unauthorizedRoutes = [
    { path: '/', view: AuthView, },
    { path: '/auth', view: AuthView, },
    { path: '/signup', view: SignUpView, },

]

const parseLocation = () => {
    return location.hash.slice(1).toLowerCase() || '/';
}

const findViewByPath = (path:string, routes:object[]) => {
    return routes.find(route => route.path.match(new RegExp(`^\\${path}$`, 'gm'))) || undefined;
}

const router = () => {
    const isAuthorized = window.localStorage.getItem('isAuthorized'); 
    const path = parseLocation();
    const page = isAuthorized ? findViewByPath(path, routes) || { view: Error404View } : findViewByPath(path, unauthorizedRoutes) || { view: Error404View };
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

// router event listeners
window.addEventListener('load', router);
window.addEventListener('hashchange', router);
