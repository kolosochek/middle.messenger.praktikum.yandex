import Handlebars from "handlebars";
import AvatarComponent from "./AvatarComponent";
import ImageComponent from "./ImageComponent";

Handlebars.registerPartial('AvatarComponent', AvatarComponent);
Handlebars.registerPartial('ImageComponent', ImageComponent);
Handlebars.registerHelper('if_eq', function(a, b, opts) {
    if (a == b) {
        return opts.fn(this);
    } else {
        return opts.inverse(this);
    }
});


const addUserTemplate = `<form action=# class=b-modal-window-content><h3 class=b-modal-window-title>Add user</h3><input class=b-input type=text /><button class=b-submit>Add</button></form>`
const removeUserTemplate = `<form action=# class=b-modal-window-content><h3 class=b-modal-window-title>Remove user</h3><input class=b-input type=text /><button class=b-submit>Remove</button></form>`


const ChatWindow = `
<section class="b-chat-window-wrapper">
        {{#if this.active_chat_id}}
            {{#with this.activeChat}}
            <div class="b-chat-window">
                <div class="b-chat-info-wrapper">
                    <div class="b-chat-info">
                        {{> AvatarComponent image_url=this.avatar_url}}
                        <span class="b-profile-title b-link">{{this.name}}</span>
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
                <section class="b-chat">
                    {{#each this.messages}}
                    <div class="b-chat-message-wrapper{{#if_eq this.message.author 'Me'}} state__mine{{/if_eq}}">
                        <p class="b-chat-message">
                        <span class="b-message-time">{{this.message.time}}</span><span class="b-message-author">{{this.message.author}}: </span>
                            <span class="b-message-text">{{this.message.text}}</span>
                            
                        </p>
                    </div>                        
                    {{/each}}
                </section>
                <section class="b-chat-reply-wrapper">
                    <form class="b-chat-reply">
                        <figure class="b-attach-file">
                            <a class='b-attach-file-link'>
                                {{> ImageComponent image_url='attach_file_icon.png' width='20' height='20'}}
                            </a>
                        </figure>
                        <input type="text" name="message" class="b-input" />
                        <button type="submit" class="b-submit">></button>
                    </form>
                    <div class="b-chat-reply-attachment-wrapper">
                        <div class="b-chat-reply-attachment">
                            <a class="b-link">
                            <svg width="10" height="10" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M4 1.5H18C19.3807 1.5 20.5 2.61929 20.5 4V14L14.5194 12.4052C13.5108 12.1362 12.4714 12 11.4275 12H10.5725C9.52864 12 8.48921 12.1362 7.48057 12.4052L1.5 14V4C1.5 2.61929 2.61929 1.5 4 1.5ZM0 4C0 1.79086 1.79086 0 4 0H18C20.2091 0 22 1.79086 22 4V18C22 20.2091 20.2091 22 18 22H4C1.79086 22 0 20.2091 0 18V4ZM8 6C8 7.10457 7.10457 8 6 8C4.89543 8 4 7.10457 4 6C4 4.89543 4.89543 4 6 4C7.10457 4 8 4.89543 8 6Z" fill="#6F6"/>
                            </svg> Photo or video</a>
                            <a class="b-link">
                            <svg width="10" height="10" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M4 1.5H18C19.3807 1.5 20.5 2.61929 20.5 4V12H16C13.7909 12 12 13.7909 12 16V20.5H4C2.61929 20.5 1.5 19.3807 1.5 18V4C1.5 2.61929 2.61929 1.5 4 1.5ZM12 22H4C1.79086 22 0 20.2091 0 18V4C0 1.79086 1.79086 0 4 0H18C20.2091 0 22 1.79086 22 4V12V18C22 20.2091 20.2091 22 18 22H12Z" fill="#6F6"/>
                            </svg> File</a>
                            <a class="b-link">
                            <svg width="10" height="10" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M20.5 11C20.5 16.2467 16.2467 20.5 11 20.5C5.75329 20.5 1.5 16.2467 1.5 11C1.5 5.75329 5.75329 1.5 11 1.5C16.2467 1.5 20.5 5.75329 20.5 11ZM22 11C22 17.0751 17.0751 22 11 22C4.92487 22 0 17.0751 0 11C0 4.92487 4.92487 0 11 0C17.0751 0 22 4.92487 22 11ZM11 14C12.6569 14 14 12.6569 14 11C14 9.34315 12.6569 8 11 8C9.34315 8 8 9.34315 8 11C8 12.6569 9.34315 14 11 14Z" fill="#6F6"/>
                            </svg> Location</a>
                        </div>
                    </div>
                </section>
            </div>
            {{/with}}
        {{else}}
        <div class="b-chat-window-empty-wrapper">
            <p class="b-chat-window-empty"><= Choose a conversation to send a message.</p>
        </div>
        {{/if}}
</section>
`

export default ChatWindow;