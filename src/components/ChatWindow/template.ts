import Handlebars from "handlebars";
import ImageComponent from "../../partials/ImageComponent";


Handlebars.registerPartial('ImageComponent', ImageComponent);
Handlebars.registerHelper('if_eq', (a, b, opts) => a == b ? opts.fn(this) : opts.inverse(this) );
// debug
Handlebars.registerHelper('log', (value) => { console.log(value) });

const ChatWindowTemplate = `
<section class="b-chat-window-wrapper">
        {{#if this.activeChat}}
            {{#with this.activeChat}}
            <div class="b-chat-window">
                {{{../chatSettings}}}
                <section class="b-chat-wrapper">
                <div class="b-chat">
                    {{#each this.messages}}
                    <div class="b-chat-message-wrapper{{#if_eq this.message.author 'Me'}} state__mine{{/if_eq}}">
                        <p class="b-chat-message">
                        <span class="b-message-time">{{this.message.time}}</span><span class="b-message-author">{{this.message.author}}: </span>
                            <span class="b-message-text">{{this.message.text}}</span>
                        </p>
                    </div>                        
                    {{/each}}
                </section>
                {{{../chatReply}}}
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

export default ChatWindowTemplate;
