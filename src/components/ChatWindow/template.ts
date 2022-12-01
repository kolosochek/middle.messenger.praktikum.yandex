import Handlebars from "handlebars";
import ImageComponent from "../../partials/ImageComponent";


Handlebars.registerPartial('ImageComponent', ImageComponent);
Handlebars.registerHelper('if_eq', (a, b, opts) => a == b ? opts.fn(this) : opts.inverse(this) );
// debug
Handlebars.registerHelper('log', (value) => { console.log(value) });

const ChatWindowTemplate = `
<section class="{{styles.b-chat-window-wrapper}}">
        {{#if this.activeChat}}
            {{#with this.activeChat}}
            <div class="{{../styles.b-chat-window}}">
                {{{../chatSettings}}}
                <section class="{{../styles.b-chat-wrapper}}">
                <div class="{{../styles.b-chat}}">
                    {{#each this.messages}}
                    <div class="{{../../styles.b-chat-message-wrapper}}{{#if_eq this.message.author 'Me'}} {{../../styles.state__mine}}{{/if_eq}}">
                        <p class="{{../../styles.b-chat-message}}">
                        <span class="{{../../styles.b-message-time}}">{{this.message.time}}</span><span class="{{../../styles.b-message-author}}">{{this.message.author}}: </span>
                            <span class="{{../../styles.b-message-text}}">{{this.message.text}}</span>
                        </p>
                    </div>                        
                    {{/each}}
                </section>
                {{{../chatReply}}}
                </section>
            </div>
            {{/with}}
        {{else}}
        <div class="{{styles.b-chat-window-empty-wrapper}}">
            <p class="{{styles.b-chat-window-empty}}"><= Choose a conversation to send a message.</p>
        </div>
        {{/if}}
</section>
`

export default ChatWindowTemplate;
