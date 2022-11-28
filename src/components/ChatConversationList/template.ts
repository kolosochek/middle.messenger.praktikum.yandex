import Handlebars from "handlebars";
import AvatarComponent from "../../partials/AvatarComponent";

Handlebars.registerPartial('AvatarComponent', AvatarComponent);
Handlebars.registerHelper('log', value => console.log(value));
Handlebars.registerHelper('if_eq', function(a, b, opts){
    a == b ? opts.fn(this) : opts.inverse(this)
});
Handlebars.registerHelper('log', (value) => { console.log(value)})

const ConversationListTemplate = `
<section class="{{styles.b-conversations-list-wrapper}}">
    <div class="{{styles.b-conversations-list}}">
            {{#each conversationList}}
            <div class="{{../styles.b-conversation-wrapper}}{{#if_eq ../activeChatId this.chat_id}} {{../styles.state__active}}{{/if_eq}}">
                <div class="{{../styles.b-conversation}}" chat_id="{{this.chat_id}}">
                    {{> AvatarComponent image_url=this.avatar_url styles=../styles}}
                    <div class="{{../styles.b-message-wrapper}}">
                        <div class="{{../styles.b-message}}">
                            <p class="{{../styles.b-profile-title}}">{{this.name}}</p>
                            <p class="{{../styles.b-conversation-last-message}}">
                            {{#each this.messages}}
                                {{#if @last}}
                                    {{this.message.text}}
                                {{/if}}
                            {{/each}}
                            </p>
                        </div>
                    </div>
                    <div class="{{../styles.b-message-info}}">
                        {{#each this.messages}}
                            {{#if @last}}
                                <p class="{{../styles.b-time}}">{{this.message.time}}</p>
                            {{/if}}
                        {{/each}}
                        {{#if this.unreadMessages}}
                            <p class="{{../styles.b-link}} {{../styles.b-unread-messages}}">{{this.unreadMessages}}</p>
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

export default ConversationListTemplate;
