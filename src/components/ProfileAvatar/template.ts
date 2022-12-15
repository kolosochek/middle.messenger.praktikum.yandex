import Handlebars from "handlebars";
import ImageComponent from "../../partials/ImageComponent";
Handlebars.registerPartial('ImageComponent', ImageComponent);
// debug
Handlebars.registerHelper('log', (value) => console.log(value));

const profileModalTemplate = `<form id=upload_avatar class={{profileStyles.b-modal-window-content}}><h3 class={{profileStyles.b-modal-window-title}}>Upload avatar</h3><a class={{profileStyles.b-link}} href=#>choose file</a><input class={{profileStyles.b-input}} type=file name=avatar accept=image/*/><button class={{profileStyles.b-submit}} type=submit>Change file</button></form>`

const ProfileAvatarTemplate = `
<figure class="{{styles.b-profile-avatar-wrapper}}">
    {{> ImageComponent avatar_url=profile.avatar width='130' height='130' class=styles.b-profile-avatar}}
    {{#if isCanChangeProfile}}
    <div class="{{styles.b-profile-avatar-change-wrapper}}">
        <a class="{{styles.b-link}}" onclick="showModal('${profileModalTemplate}', '{{styles.b-profile-page}}')">Change picture</a>
    </div>
    {{/if}}
</figure>
`

export default ProfileAvatarTemplate;
