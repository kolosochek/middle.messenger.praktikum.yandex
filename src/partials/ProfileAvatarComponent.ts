import Handlebars from "handlebars";
import ImageComponent from "./ImageComponent";
Handlebars.registerPartial('ImageComponent', ImageComponent);
// debug
Handlebars.registerHelper('log', (value) => console.log(value));

const profileModalTemplate = `<form class={{styles.b-modal-window-content}}><h3 class={{styles.b-modal-window-title}}>Upload avatar</h3><a class={{styles.b-link}} href=#>choose file</a><input class={{styles.b-input}} type=file name=avatar /><button class={{styles.b-submit}} type=submit>Change file</button></form>`

const ProfileAvatarComponent = `
<figure class="{{styles.b-profile-avatar-wrapper}}">
    {{> ImageComponent image_url=profile.avatar_url width='130' height='130' class=styles.b-profile-avatar}}
    <div class="{{styles.b-profile-avatar-change-wrapper}}">
        <a class="{{styles.b-link}}" onclick="showModal('${profileModalTemplate}', '{{styles.b-profile-page}}')">Change picture</a>
    </div>
</figure>
`

export default ProfileAvatarComponent;
