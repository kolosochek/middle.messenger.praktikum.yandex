import Handlebars from "handlebars";
import ProfileAvatarComponent from "../../partials/ProfileAvatarComponent";

Handlebars.registerPartial('ProfileAvatarComponent', ProfileAvatarComponent);
Handlebars.registerHelper('if_eq', function(a, b, opts) {
    if (a == b) {
        return opts.fn(this);
    } else {
        return opts.inverse(this);
    }
});
// debug
Handlebars.registerHelper('log', (value) => console.log(value));


const ProfilePageTemplate = `
<main id="viewport" class="{{styles.b-page-wrapper}}">
    <div class="{{styles.b-page}}">
        <section class="{{styles.b-profile-page-wrapper}}">
            <div class="{{styles.b-profile-page}}">
                <div class="{{styles.b-profile-goback-wrapper}}">
                    <a href="/#/" class="{{styles.b-profile-goback}} b-link">Back</a>
                </div>
                <div class="{{styles.b-profile-wrapper}}">
                    <div class="{{styles.b-profile}}">
                        {{> ProfileAvatarComponent profile=profile styles=styles}}
                        <div class="{{styles.b-profile-name-wrapper}}">
                            <h2 class="{{styles.b-profile-name}}">{{profile.first_name}}</h2>
                        </div>
                        {{#if_eq this.mode "view"}}
                            {{{profileFieldEmail}}}
                            {{{profileFieldFirstName}}}
                            {{{profileFieldSecondName}}}
                            {{{profileFieldLogin}}}
                            {{{profileFieldDisplayName}}}
                            {{{profileFieldPhone}}}                        
                            <div class='{{styles.b-profile-contol-wrapper}} {{styles.first}}'>
                                <div class='{{styles.b-profile-control}}'>
                                    <a class='{{styles.b-link}}' href="/#/profile-edit">Edit profile info</a>
                                </div>
                            </div>
                            <div class='{{styles.b-profile-contol-wrapper}}'>
                                <div class='{{styles.b-profile-control}}'>
                                    <a class='{{styles.b-link}}' href="/#/profile-change-password">Change password</a>
                                </div>
                            </div>
                            <div class='{{styles.b-profile-contol-wrapper}}'>
                                <div class='{{styles.b-profile-control}}'>
                                    <a class='{{styles.b-link}}' href="/#/logout">Logout</a>
                                </div>
                            </div>
                        {{/if_eq}}
                        {{#if_eq this.mode "edit"}}
                            <form class="{{styles.b-profile-form}}">
                            {{{profileFieldEmail}}}
                            {{{profileFieldFirstName}}}
                            {{{profileFieldSecondName}}}
                            {{{profileFieldLogin}}}
                            {{{profileFieldDisplayName}}}
                            {{{profileFieldPhone}}}
                            <div class='{{styles.b-profile-contol-wrapper}} {{styles.first}}'>
                                <div class='{{styles.b-profile-control}}'>
                                    <button type='submit' class='{{styles.b-submit}}'>Save changes</button>
                                </div>
                            </div>
                            </form>
                        {{/if_eq}} 
                        {{#if_eq this.mode "change-password"}}
                            {{{profileFieldOldPassword}}}
                            {{{profileFieldNewPassword}}}
                            {{{profileFieldConfirmPassword}}}
                            <div class='{{styles.b-profile-contol-wrapper}} {{styles.first}}'>
                                <div class='{{styles.b-profile-control}}'>
                                    <button type='submit' class='{{styles.b-submit}}'>Save changes</button>
                                </div>
                            </div>
                        {{/if_eq}} 
                    </div>
                </div>
            </div>
        </section> 
    </div>
</main>
`

export default ProfilePageTemplate;
