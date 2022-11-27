import Handlebars from "handlebars"
import AvatarComponent from "../AvatarComponent.js";

Handlebars.registerPartial('AvatarComponent', AvatarComponent);
Handlebars.registerHelper('log', (value) => { console.log(value)});

const addUserTemplate = `<form action=# class=b-modal-window-content><h3 class=b-modal-window-title>Add user</h3><input class=b-input type=text /><button class=b-submit>Add</button></form>`
const removeUserTemplate = `<form action=# class=b-modal-window-content><h3 class=b-modal-window-title>Remove user</h3><input class=b-input type=text /><button class=b-submit>Remove</button></form>`



const ChatSettingsTemplate = `
<div class="b-chat-info-wrapper">
    <div class="b-chat-info">
        {{#with this.activeChat}}
            {{> AvatarComponent image_url=this.avatar_url}}
        {{/with}}
        <span class="b-profile-title b-link">{{this.activeChat.name}}</span>
        <div class="b-chat-settings">
            <a class="b-link b-chat-settings-link">Settings</a>
        </div>
    </div>
    <div class="b-chat-settings-wrapper">
        <div class="b-chat-settings">
            <a class="b-link b-user-add" onclick="showModal('${addUserTemplate}', 'b-chat-page')"> + Add user</a>
            <a class="b-link b-user-remove" onclick="showModal('${removeUserTemplate}', 'b-chat-page')"> &#215; Remove user</a>
        </div>
    </div>
</div>
`

export default ChatSettingsTemplate;
