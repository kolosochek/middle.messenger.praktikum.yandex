import Handlebars from "handlebars";
import AsideProfile from "../components/AsideProfile";
import AsideSearch from "../components/AsideSearch";
import ChatWindow from "../components/ChatWindow";
import ConversationsList from "../components/ConversationsList";
// data, TODO fetch me from API
import data from "../../data";

// let's register components that we'll use on that page
Handlebars.registerPartial('ConversationsList', ConversationsList);
Handlebars.registerPartial('AsideProfile', AsideProfile);
Handlebars.registerPartial('AsideSearch', AsideSearch);
Handlebars.registerPartial('ChatWindow', ChatWindow);


const IndexPage = `
<main id="viewport" class="b-page-wrapper">
    <div class="b-page">
        <!-- if (user.isAuthorized) -->
        <section class="b-chat-viewport-wrapper">
            <div class="b-chat-viewport">
                <aside class="b-conversations-wrapper">
                    <div class="b-conversations">
                        <!-- aside profile -->
                        {{> AsideProfile}}
                        <!-- aside search -->
                        {{> AsideSearch}}
                        <!-- conversations list -->
                        {{> ConversationsList}}
                    </div>
                </aside>
                <!-- ChatWindow -->
                {{> ChatWindow}} 
            </div>
        </section>
        <!-- else -->
        
        <!-- -->
    </div>
</main>
`

export default IndexPage;