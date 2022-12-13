# ModemWebchat app https://modemwebchat.netlify.app/

![I mean theeese times, you know.](/github/slow_file_copy.gif)
#### So slow. So nasty.

### Hold on, we're starting
This is a MVP of simple webchat web application. 
Simple demostration below:
![Sign in and signup, simple demonstration](/github/signup_and_add_users.gif)
![Change user profile, avatar](/github/change_user_profile_and_avatar.gif)
![Create, delete chat](/github/create_delete_chat.gif)

Key features:
- TypeScript. No JS or CSS frameworks has been used. Some transitions also included. I can do some HTML5+TS+CSS3+LESS karate, bruh :vulcan_salute:. 
- Used BEM(block-element-modificator) methodology in HTML\CSS namespaces. 
- ESLint, Stylelint passage. Hate it but have to. 
- Custom routing system, simple but powerful. Works like a charm. *Update* routes can be dynamical now, so you can pass some vars into views.
- Full Yandex.API integration.
- Messages are sent\recieved with power of WebSocket. One socket per chat.
- You can create, delete(if you have proper chat role) chat.
- You can add, remove any existing user(excluding youself, ofc) into existing chat.
- You can view, edit any accessable profile fields, including avatar, login and password.
- You can access another user profiles by navigating '/users/userId'
- Simple user auth system, you can't reach some routes if you are unauthorized, bruh.
- Own MVC(Model-View-Controller) realisation. All entities are Classes, so there is OOP power.
- All views are composed from components. Views are composed from components or partials. Any props, events can be passed trough. 
- You can still use Handlebars partials for 'dumb' components, which don't so any logic inside. 
- Nested components feature. Components can include another components, even inside the other components. 
- Parcel bundler. Handlebars template processor. Aint like dat but used to.

All possible routes:
```
https://modemwebchat.netlify.app/
https://modemwebchat.netlify.app/#/auth
https://modemwebchat.netlify.app/#/logout
https://modemwebchat.netlify.app/#/signup
https://modemwebchat.netlify.app/#/profile
https://modemwebchat.netlify.app/#/profile-edit
https://modemwebchat.netlify.app/#/profile-change-password
https://modemwebchat.netlify.app/#/error404
https://modemwebchat.netlify.app/#/error500
https://modemwebchat.netlify.app/#/users/\d
```

You will also recieve a 404 error page if you'll try to reach something outside theese routes. 
```
https://modemwebchat.netlify.app/#/funny-cat-videos
```

```
npm run build - build the project
npm run start - build and start a development server
```

Make love, not war and have fun. See you, space cowboy :metal:!
