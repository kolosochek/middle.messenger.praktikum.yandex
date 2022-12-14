import Handlebars from "handlebars";

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
                    {{{goBackLink}}}
                </div>
                <div class="{{styles.b-profile-wrapper}}">
                    <div class="{{styles.b-profile}}">
                        {{{profileAvatar}}}
                        <div class="{{styles.b-profile-name-wrapper}}">
                            <h2 class="{{styles.b-profile-name}}">{{profile.display_name}}</h2>
                        </div>
                        {{#if_eq this.mode "view"}}
                            {{{profileFieldEmail}}}
                            {{{profileFieldFirstName}}}
                            {{{profileFieldSecondName}}}
                            {{{profileFieldLogin}}}
                            {{{profileFieldDisplayName}}}
                            {{{profileFieldPhone}}}   
                            {{#if isCanChangeProfile}}                     
                                <div class='{{styles.b-profile-contol-wrapper}} {{styles.first}}'>
                                    <div class='{{styles.b-profile-control}}'>
                                        {{{editProfileLink}}}
                                    </div>
                                </div>
                                <div class='{{styles.b-profile-contol-wrapper}}'>
                                    <div class='{{styles.b-profile-control}}'>
                                        {{{changePasswordLink}}}
                                    </div>
                                </div>
                                <div class='{{styles.b-profile-contol-wrapper}}'>
                                    <div class='{{styles.b-profile-control}}'>
                                        {{{logoutLink}}}
                                    </div>
                                </div>
                            {{/if}}
                        {{/if_eq}}
                        {{#if_eq this.mode "edit"}}
                            <form class="{{styles.b-profile-form}}">
                            {{{profileFieldEmail}}}
                            {{{profileFieldFirstName}}}
                            {{{profileFieldSecondName}}}
                            {{{profileFieldLogin}}}
                            {{{profileFieldDisplayName}}}
                            {{{profileFieldPhone}}}
                            <div class="{{styles.b-form-error}}">
                                <p class="{{styles.b-form-error-text}}"></p>
                            </div>
                            <div class='{{styles.b-profile-contol-wrapper}} {{styles.first}}'>
                                <div class='{{styles.b-profile-control}}'>
                                    <button type='submit' class='{{styles.b-submit}}'>Save changes</button>
                                </div>
                            </div>
                            </form>
                        {{/if_eq}} 
                        {{#if_eq this.mode "change-password"}}
                        <form class="{{styles.b-profile-form}}">
                            {{{profileFieldOldPassword}}}
                            {{{profileFieldNewPassword}}}
                            {{{profileFieldConfirmPassword}}}
                            <div class="{{styles.b-form-error}}">
                                <p class="{{styles.b-form-error-text}}"></p>
                            </div>
                            <div class='{{styles.b-profile-contol-wrapper}} {{styles.first}}'>
                                <div class='{{styles.b-profile-control}}'>
                                    <button type='submit' class='{{styles.b-submit}}'>Save changes</button>
                                </div>
                            </div>
                        </form>
                        {{/if_eq}} 
                    </div>
                </div>
            </div>
        </section> 
    </div>
</main>
`

export default ProfilePageTemplate;
