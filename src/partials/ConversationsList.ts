import Handlebars from "handlebars";
import AvatarComponent from "./AvatarComponent";

Handlebars.registerPartial('AvatarComponent', AvatarComponent);
Handlebars.registerHelper('log', value => console.log(value));
Handlebars.registerHelper('if_eq', (a, b, opts) => a == b ? opts.fn(this) : opts.inverse(this));

const ConversationsList = `
<section class="b-conversations-list-wrapper">
    <div class="b-conversations-list">
            {{#each conversationsList}}
            <div class="b-conversation-wrapper{{#if_eq ../activeChatId this.chat_id}} state__active{{/if_eq}}">
                <div class="b-conversation" chat_id="{{this.chat_id}}">
                    {{> AvatarComponent image_url="this.avatar_url"}}
                    <div class="b-message-wrapper">
                        <div class="b-message">
                            <p class="b-profile-title">{{this.name}}</p>
                            <p class="b-conversation-last-message">
                            {{#each this.messages}}
                                {{#if @last}}
                                    {{this.message.text}}
                                {{/if}}
                            {{/each}}
                            </p>
                        </div>
                    </div>
                    <div class="b-message-info">
                        {{#each this.messages}}
                            {{#if @last}}
                                <p class="b-time">{{this.message.time}}</p>
                            {{/if}}
                        {{/each}}
                        {{#if this.unreadMessages}}
                            <p class="b-link b-unread-messages">{{this.unreadMessages}}</p>
                        {{/if}}
                    </div>
                </div>
            </div>
            {{/each}}
    </div>
</section>
<script type="module">
</script>
`

export default ConversationsList;
