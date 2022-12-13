import Handlebars from "handlebars";
import AvatarComponent from "../../partials/AvatarComponent";
import { FormatDate } from '../../utils/FormatDate';

Handlebars.registerPartial('AvatarComponent', AvatarComponent);
Handlebars.registerHelper('log', value => console.log(value));
Handlebars.registerHelper('if_eq', function(a, b, opts){
    a == b ? opts.fn(this) : opts.inverse(this)
});
Handlebars.registerHelper('getHoursAndMinutes', function(rawDate){
    const dateObject = new Date(rawDate);
    return `${FormatDate.addZero(dateObject.getHours())}:${FormatDate.addZero(dateObject.getMinutes())}`
});
Handlebars.registerHelper('log', (value) => { console.log(value)})

const ChatListTemplate = `
<section class="{{styles.b-conversations-list-wrapper}}">
    <div class="{{styles.b-conversations-list}}">
            {{#each chatList}}
            <div class="{{../styles.b-conversation-wrapper}}{{#if_eq ../activeChatId this.id}} {{../styles.state__active}}{{/if_eq}}">
                <div class="{{../styles.b-conversation}}" chat_id="{{this.id}}">
                    {{> AvatarComponent avatar_url=this.last_message.user.avatar styles=../styles}}
                    <div class="{{../styles.b-message-wrapper}}">
                        <div class="{{../styles.b-message}}">
                            <p class="{{../styles.b-profile-title}}">{{this.title}}</p>
                            <p class="{{../styles.b-conversation-last-message}}">{{this.last_message.content}}</p>
                        </div>
                    </div>
                    <div class="{{../styles.b-message-info}}">                        
                        <p class="{{../styles.b-time}}">{{getHoursAndMinutes this.last_message.time}}</p>
                        {{#if this.unread_count}}
                            <p class="{{../styles.b-link}} {{../styles.b-unread-messages}}">{{this.unread_count}}</p>
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

export default ChatListTemplate;
