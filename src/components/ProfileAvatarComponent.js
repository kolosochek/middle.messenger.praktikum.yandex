import Handlebars from "handlebars";
import ImageComponent from "../components/ImageComponent";
Handlebars.registerPartial('ImageComponent', ImageComponent);

const profileModalTemplate = `<form class=b-modal-window-content><h3 class=b-modal-window-title>Upload avatar</h3><a class=b-link href=#>choose file</a><input class=b-input type=file name=avatar_file /><button class=b-submit type=submit>Change file</button></form>`

const ProfileAvatarComponent = `
<figure class="b-profile-avatar-wrapper">
    {{> ImageComponent image_url=this.avatar_url width='130' height='130' class='b-profile-avatar'}}
    <div class="b-profile-avatar-change-wrapper">
        <a class="b-link" onclick="showModal('${profileModalTemplate}', 'b-profile-page')">Change picture</a>
    </div>
</figure>
`

export default ProfileAvatarComponent;