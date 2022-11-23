import Handlebars from "handlebars";


Handlebars.registerHelper('if_eq', function (a, b, opts) {
    if (a == b) {
        return opts.fn(this);
    } else {
        return opts.inverse(this);
    }
});
// debug
Handlebars.registerHelper('log', (value) => { console.log(value) });

const AuthViewTemplate = `
<main id="viewport" class="b-page-wrapper">
    <div class="b-page">
        <section class="b-auth-page-wrapper">
            <div class="b-auth-page">
                <form class="b-form" action="/">
                {{#if_eq mode "auth"}}
                    <h2 class="b-page-title">Sign In</h2>
                    {{{loginInputComponent}}}
                    {{{passwordInputComponent}}}
                    <div class="b-submit-wrapper">
                        <button class="b-submit" type="submit">Authorize</button>
                    </div>
                    <div class="b-sign-in-wrapper">
                        <a class="b-link" href="/#/signup">Sign Up</a>
                    </div>
                {{/if_eq}}
                {{#if_eq mode "signup"}}
                    <h2 class="b-page-title">Sign Up</h2>
                    {{{emailInputComponent}}}               
                    {{{firstNameInputComponent}}}            
                    {{{lastNameInputComponent}}}              
                    {{{loginInputComponent}}}                 
                    {{{phoneInputComponent}}}                  
                    {{{passwordInputComponent}}}                 
                    {{{confirmPasswordInputComponent}}}               
                    <div class="b-submit-wrapper">
                        <button class="b-submit" type="submit">SignUp</button>
                    </div>
                    <div class="b-sign-in-wrapper">
                        <a class="b-link" href="/#/auth">Login</a>
                    </div>
                {{/if_eq}}
                </form>
            </div>
        </section>
    </div>
</main>
`

export default AuthViewTemplate;
