const IndexPageTemplate = `
<main id="viewport" class="b-page-wrapper">
    <div class="b-page">
        <section class="b-chat-viewport-wrapper">
            <div class="b-chat-viewport">
                <aside class="b-conversations-wrapper">
                    <div class="b-conversations">
                        <!-- aside profile -->
                        {{{chatAsideProfile}}}
                        <!-- aside search -->
                        {{{chatAsideSearch}}}
                        <!-- conversations list -->
                        {{{chatConversationList}}}
                    </div>
                </aside>
                <!-- ChatWindow -->
                {{{chatWindow}}}
            </div>
        </section>
    </div>
</main>
`

export default IndexPageTemplate;
