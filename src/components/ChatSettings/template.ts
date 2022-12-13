import Handlebars from "handlebars"
import AvatarComponent from "../../partials/AvatarComponent";

Handlebars.registerPartial('AvatarComponent', AvatarComponent);
Handlebars.registerHelper('if_eq', (a, b, opts) => a == b ? opts.fn(this) : opts.inverse(this) );
Handlebars.registerHelper('log', (value) => { console.log(value)});

const addUserTemplate = `<form action=/messenger id=add_user class={{styles.b-modal-window-content}}><h3 class={{styles.b-modal-window-title}}>Add user</h3><input class={{styles.b-input}} type=text name=login /><div class={{styles.b-form-error}}><p class={{styles.b-form-error-text}}></p></div><button class={{styles.b-submit}}>Add</button></form>`
const removeUserTemplate = `<form action=/messenger id=remove_user class={{styles.b-modal-window-content}}><h3 class={{styles.b-modal-window-title}}>Remove user</h3><input class={{styles.b-input}} type=text name=login /><div class={{styles.b-form-error}}><p class={{styles.b-form-error-text}}></p></div><button class={{styles.b-submit}}>Remove</button></form>`
const deleteChatTemplate = `<form action=/messenger id=delete_chat class={{styles.b-modal-window-content}}><h3 class={{styles.b-modal-window-title}}>Are you sure?</h3><div class={{styles.b-submit-wrapper}}><button type=submit class={{styles.b-submit}}>Yes, delete chat</button><button id=close_modal class={{styles.b-submit}}>No</button></div></form>`


const ChatSettingsTemplate = `
<div class="{{styles.b-chat-info-wrapper}}">
    <div class="{{styles.b-chat-info}}">
        <div class="{{styles.b-chat-users-wrapper}}">
            {{#each this.chatUsers}}
                <div class="{{../styles.b-chat-user}}">
                    {{> AvatarComponent image_url=this.avatar_url styles=../styles}}     
                    <a class="{{../styles.b-link}}" href="{{#if_eq this.id ../userId}}/settings{{else}}/users/{{this.id}}{{/if_eq}}">{{this.login}}{{#if @last}}{{else}},{{/if}}</a>
                </div>
            {{/each}}
        </div>
        <div class="{{styles.b-chat-settings}}">
            <a class="{{styles.b-link}} {{styles.b-chat-settings-link}}">Settings</a>
        </div>
    </div>
    <div class="{{styles.b-chat-settings-wrapper}}">
        <div class="{{styles.b-chat-settings}}">
            <a id="add_user_link" class="{{styles.b-link}} {{styles.b-user-add}}" onclick="showModal('${addUserTemplate}', '{{styles.b-chat-page}}')"> + Add user</a>
            <a id="remove_user_link" class="{{styles.b-link}} {{styles.b-user-remove}}" onclick="showModal('${removeUserTemplate}', '{{styles.b-chat-page}}')"> &#215; Remove user</a>
            <a id="delete_chat_link" class="{{styles.b-link}} {{styles.b-user-remove}}" onclick="showModal('${deleteChatTemplate}', '{{styles.b-chat-page}}')"> ! Delete chat</a>
        </div>
    </div>
</div>
`

export default ChatSettingsTemplate;
