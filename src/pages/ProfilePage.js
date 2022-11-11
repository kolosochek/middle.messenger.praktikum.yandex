import Handlebars from "handlebars";
import FieldProfileComponent from "../components/FieldProfileComponent";
import ProfileAvatarComponent from "../components/ProfileAvatarComponent";

Handlebars.registerPartial('ProfileAvatarComponent', ProfileAvatarComponent);
Handlebars.registerPartial('FieldProfileComponent', FieldProfileComponent);
Handlebars.registerHelper('log', (value) => console.log(value));
Handlebars.registerHelper('if_eq', function(a, b, opts) {
    if (a == b) {
        return opts.fn(this);
    } else {
        return opts.inverse(this);
    }
});


const ProfilePage = `
<main id="viewport" class="b-page-wrapper">
    <div class="b-page">
    <!-- if mode == 'view' -->
    {{#if_eq this.mode "view"}}
        {{#with profile}}
        <section class="b-profile-page-wrapper">
            <div class="b-profile-page">
                <div class="b-profile-goback-wrapper">
                    <a href="/" class="b-profile-goback b-link">Back</a>
                </div>
                <div class="b-profile-wrapper">
                    <div class="b-profile">
                        {{> ProfileAvatarComponent}}
                        <div class="b-profile-name-wrapper">
                            <h2 class="b-profile-name">{{this.first_name}}</h2>
                        </div>
                        {{> FieldProfileComponent label='Email:' value=this.email}}
                        {{> FieldProfileComponent label='Login:' value=this.login}}
                        {{> FieldProfileComponent label='First name:' value=this.first_name}}
                        {{> FieldProfileComponent label='Last name:' value=this.last_name}}
                        {{> FieldProfileComponent label='Login:' value=this.login}}
                        {{> FieldProfileComponent label='Phone:' value=this.phone}}
                        <div class='b-profile-contol-wrapper first'>
                            <div class='b-profile-control'>
                                <a class='b-link' href="/#/profile-edit">Edit profile info</a>
                            </div>
                        </div>
                        <div class='b-profile-contol-wrapper'>
                            <div class='b-profile-control'>
                                <a class='b-link' href="/#/profile-change-password">Change password</a>
                            </div>
                        </div>
                        <div class='b-profile-contol-wrapper'>
                            <div class='b-profile-control'>
                                <a class='b-link' href="/#/logout">Logout</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section> 
        {{/with}}
    {{/if_eq}}

    <!-- if mode == 'edit' -->
    {{#if_eq this.mode "edit"}}
        {{#with profile}}
        <section class="b-profile-page-wrapper">
            <div class="b-profile-page">
                <div class="b-profile-goback-wrapper">
                    <a href="/" class="b-profile-goback b-link">Back</a>
                </div>
                <div class="b-profile-wrapper">
                    <div class="b-profile">
                        {{> ProfileAvatarComponent}}
                        <div class="b-profile-name-wrapper">
                            <h2 class="b-profile-name">{{this.first_name}}</h2>
                        </div>
                        {{> FieldProfileComponent label='Email:' value=this.email mode='edit'}}
                        {{> FieldProfileComponent label='Login:' value=this.login mode='edit'}}
                        {{> FieldProfileComponent label='First name:' value=this.first_name mode='edit'}}
                        {{> FieldProfileComponent label='Last name:' value=this.last_name mode='edit'}}
                        {{> FieldProfileComponent label='Login:' value=this.login mode='edit'}}
                        {{> FieldProfileComponent label='Phone:' value=this.phone mode='edit'}}
                        <div class='b-profile-contol-wrapper first'>
                            <div class='b-profile-control'>
                                <a class='b-link' href="/#/profile">Save changes</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section> 
        {{/with}}
    {{/if_eq}}

    <!-- if mode == 'change-password' -->
    {{#if_eq this.mode "change-password"}}
        {{#with profile}}
        <section class="b-profile-page-wrapper">
            <div class="b-profile-page">
                <div class="b-profile-goback-wrapper">
                    <a href="/" class="b-profile-goback b-link">Back</a>
                </div>
                <div class="b-profile-wrapper">
                    <div class="b-profile">
                        {{> ProfileAvatarComponent}}
                        <div class="b-profile-name-wrapper">
                            <h2 class="b-profile-name">{{this.first_name}}</h2>
                        </div>
                        {{> FieldProfileComponent label='Old password:' value='*****' mode='edit' type='password'}}
                        {{> FieldProfileComponent label='New password:' value='*****' mode='edit' type='password'}}
                        {{> FieldProfileComponent label='Confirm new password:' value='*****' mode='edit' type='password'}}
                        <div class='b-profile-contol-wrapper first'>
                            <div class='b-profile-control'>
                                <a class='b-link' href="/#/profile">Save changes</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section> 
        {{/with}}
    {{/if_eq}}
    </div>
</main>
`

export default ProfilePage;