const IndexPageTemplate = `
<main id="viewport" class="{{styles.b-page-wrapper}}">
    <div class="{{styles.b-page}}">
        <section class="{{styles.b-chat-viewport-wrapper}}">
            <div class="{{styles.b-chat-viewport}}">
                <aside class="{{styles.b-conversations-wrapper}}">
                    <div class="{{styles.b-conversations}}">
                        <!-- aside profile -->
                        {{{chatAsideProfile}}}
                        <!-- aside search -->
                        {{{chatAsideSearch}}}
                        <!-- conversations list -->
                        {{{chatList}}}
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
