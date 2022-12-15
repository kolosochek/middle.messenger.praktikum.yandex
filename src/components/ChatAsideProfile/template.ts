const createChatTemplate = `<form id=create_chat_form class={{styles.b-modal-window-content}}><h3 class={{styles.b-modal-window-title}}>New chat title</h3><input class={{styles.b-input}} type=text /><button class={{styles.b-submit}}>Create</button></form>`

const ChatAsideProfileTemplate = `
<section class="{{styles.b-profile-navigation-wrapper}}">
    <div class="{{styles.b-profile-navigation}}">
        <a id="create_chat" class="{{styles.b-link}} {{styles.b-logout}}" href="#" onclick="showModal('${createChatTemplate}', '{{styles.b-chat-page}}')">Create chat</a>
        {{{myProfileLink}}}
    </div>
</section>
`

export default ChatAsideProfileTemplate;
