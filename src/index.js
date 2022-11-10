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


// get chat by id
// @return Conversation object
const getActiveChat = (data, active_chat_id=window.localStorage.getItem('active_chat_id')) => {
    for (const conversation of data) {
        if (conversation.chat_id == active_chat_id) {
            return conversation;
        }
    }
}

// show modal window by given content
// @return nothing
const showModal = () => {
    const htmlTemplate = `
    <div id='modal_window' class='b-modal-window-wrapper'>
        <div class='b-modal-window'>
            <h3 class='b-modal-window-title'>Choose file</h3>
        </div>
    </div>
    `
    // append template to <body />
    document.body.append(htmlTemplate);
    // add custom eventListners to handle modal window(modal view)
    const modal_window = document.querySelector('#modal_window');
    if (modal_window) {
        // close modal on container click
        //modal_window.addEventListener('click');
        modal_window.classList.toggle('state__visible');
     }
}


// render given template by context using Handlebars compiler
// @return escaped HTML
const renderTemplate = (template, context = {}) => {
    const compiled = Handlebars.compile(template);
    const html = compiled(context);
    return html;
}

// index page view
const IndexView = () => {
    const template = IndexPage;
    const context = { conversationsList: data, activeChat: getActiveChat(data), active_chat_id: window.localStorage.getItem('active_chat_id') };
    return renderTemplate(template, context);
}

// auth page view
const AuthView = () => {
    const template = AuthPage;
    const context = {}
    return renderTemplate(template, context);
}
// logout page view
const LogoutView = () => {
    window.localStorage.removeItem('isAuthorized');
    const template = AuthPage;
    const context = {}
    return renderTemplate(template, context);
}

// signup page view
const SignupView = () => {
    const template = SignUpPage;
    const context = {}
    return renderTemplate(template, context);
}

// profile page view
const ProfileView = () => {
    const template = ProfilePage;
    const context = { profile: user, mode: 'view' }
    return renderTemplate(template, context);
}

// profile page view
const ProfileEditView = () => {
    const template = ProfilePage;
    const context = { profile: user, mode: 'edit' }
    return renderTemplate(template, context);
}

// profile page view
const ProfilePasswordView = () => {
    const template = ProfilePage;
    const context = { profile: user, mode: 'change-password' }
    return renderTemplate(template, context);
}

// error page view
const Error404View = () => {
    const template = Error404Page;
    const context = {}
    return renderTemplate(template, context);
}

// error page view
const Error500View = () => {
    const template = Error500Page;
    const context = {}
    return renderTemplate(template, context);
}

// all possible routes
const routes = [
    { path: '/', view: IndexView, },
    { path: '/auth', view: AuthView, },
    { path: '/logout', view: LogoutView, },
    { path: '/signup', view: SignupView, },
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
    { path: '/signup', view: SignupView, },

]
const parseLocation = () => {
    return location.hash.slice(1).toLowerCase() || '/';
}
const findViewByPath = (path, routes) => {
    return routes.find(route => route.path.match(new RegExp(`^\\${path}$`, 'gm'))) || undefined;
}

const router = () => {
    const isAuthorized = window.localStorage.getItem('isAuthorized');   
    const path = parseLocation();
    const page = isAuthorized ? findViewByPath(path, routes) || { view: Error404View } : findViewByPath(path, unauthorizedRoutes) || { view: Error404View };
    // inject compiled HTML to DOM
    // "render" the page
    document.getElementById('root').innerHTML = page.view();
    
    // aside conversations list item click event handler
    [...document.querySelectorAll('.b-conversation')].forEach((conversation) => {
        conversation.addEventListener('click', () => {
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