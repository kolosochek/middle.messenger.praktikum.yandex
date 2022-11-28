import Handlebars from "handlebars"
import AvatarComponent from "../../partials/AvatarComponent";

Handlebars.registerPartial('AvatarComponent', AvatarComponent);
Handlebars.registerHelper('log', (value) => { console.log(value)});

const addUserTemplate = `<form action=# class={{styles.b-modal-window-content}}><h3 class={{styles.b-modal-window-title}}>Add user</h3><input class={{styles.b-input}} type=text /><button class={{styles.b-submit}}>Add</button></form>`
const removeUserTemplate = `<form action=# class={{styles.b-modal-window-content}}><h3 class={{styles.b-modal-window-title}}>Remove user</h3><input class={{styles.b-input}} type=text /><button class={{styles.b-submit}}>Remove</button></form>`



const ChatSettingsTemplate = `
<div class="{{styles.b-chat-info-wrapper}}">
    <div class="{{styles.b-chat-info}}">
        {{#with this.activeChat}}
            {{> AvatarComponent image_url=this.avatar_url styles=../styles}}
        {{/with}}
        <span class="{{styles.b-profile-title}} {{styles.b-link}}">{{this.activeChat.name}}</span>
        <div class="{{styles.b-chat-settings}}">
            <a class="{{styles.b-link}} {{styles.b-chat-settings-link}}">Settings</a>
        </div>
    </div>
    <div class="{{styles.b-chat-settings-wrapper}}">
        <div class="{{styles.b-chat-settings}}">
            <a class="{{styles.b-link}} {{styles.b-user-add}}" onclick="showModal('${addUserTemplate}', '{{styles.b-chat-page}}')"> + Add user</a>
            <a class="{{styles.b-link}} {{styles.b-user-remove}}" onclick="showModal('${removeUserTemplate}', '{{styles.b-chat-page}}')"> &#215; Remove user</a>
        </div>
    </div>
</div>
`

export default ChatSettingsTemplate;
