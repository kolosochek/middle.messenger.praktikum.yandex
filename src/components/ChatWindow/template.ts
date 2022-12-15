import Handlebars from "handlebars";
import { Store } from "../../model/Store";
import ImageComponent from "../../partials/ImageComponent";
import { FormatDate } from "../../utils/FormatDate";

Handlebars.registerPartial('ImageComponent', ImageComponent);
Handlebars.registerHelper('if_eq', (a, b, opts) => a == b ? opts.fn(this) : opts.inverse(this) );
Handlebars.registerHelper('getHoursAndMinutes', function(rawDate){
    const dateObject = new Date(rawDate);
    return `${FormatDate.addZero(dateObject.getHours())}:${FormatDate.addZero(dateObject.getMinutes())}`
});
Handlebars.registerHelper('getLoginById', function(id){
    const chatUserList = Store.getItem('chatUsers');
    for(const chatUser of chatUserList){
        if(chatUser.id == id) {
            return chatUser.login
        }
    }
    return ;
});
// debug
Handlebars.registerHelper('log', (value) => { console.log(value) });

const ChatWindowTemplate = `
<section class="{{styles.b-chat-window-wrapper}}">
        {{#if this.chatUsers}}
            <div class="{{styles.b-chat-window}}">
                {{{chatSettings}}}
                <section class="{{styles.b-chat-wrapper}}">
                <div class="{{styles.b-chat}}">
                {{#each this.chatMessages}}
                    <div class="{{../styles.b-chat-message-wrapper}}{{#if_eq this.user_id ../this.userId}} {{../styles.state__mine}}{{/if_eq}}">
                        <p class="{{../styles.b-chat-message}}">
                        <span class="{{../styles.b-message-time}}">{{getHoursAndMinutes this.time}}</span><span class="{{../styles.b-message-author}}">{{#if_eq this.user_id ../this.userId}}Me{{else}}{{getLoginById this.user_id}}{{/if_eq}}: </span>
                            <span class="{{../styles.b-message-text}}">{{this.content}}</span>
                        </p>
                    </div>     
                {{/each}}
                </section>
                {{{chatReply}}}
                </section>
            </div>
        {{else}}
        <div class="{{styles.b-chat-window-empty-wrapper}}">
            <p class="{{styles.b-chat-window-empty}}"><= Choose a conversation to send a message.</p>
        </div>
        {{/if}}
</section>
`

export default ChatWindowTemplate;
