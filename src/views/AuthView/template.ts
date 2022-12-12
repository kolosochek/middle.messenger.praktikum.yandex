import Handlebars from "handlebars";


Handlebars.registerHelper('if_eq', function(a, b, opts) {
    if (a == b) {
        return opts.fn(this);
    } else {
        return opts.inverse(this);
    }
});
// debug
Handlebars.registerHelper('log', (value) => { console.log(value) });


const AuthViewTemplate = `
<main id="viewport" class="{{styles.b-page-wrapper}}">
    <div class="{{styles.b-page}}">
        <section class="{{styles.b-auth-page-wrapper}}">
            <div class="{{styles.b-auth-page}}">
                <form class="{{styles.b-form}}" action="/">
                {{#if_eq mode "auth"}}
                <h2 class="{{styles.b-page-title}}">Sign In</h2>
                    {{{loginInputComponent}}}
                    {{{passwordInputComponent}}}                    
                    <div class="{{styles.b-form-error}}">
                        <p class="{{styles.b-form-error-text}}"></p>
                    </div>  
                    <div class="{{styles.b-submit-wrapper}}">
                        <button class="{{styles.b-submit}}" type="submit">Authorize</button>
                    </div>
                    <div class="{{styles.b-sign-in-wrapper}}">
                        <a class="{{styles.b-link}}" href="/sign-up">Sign Up</a>
                    </div>
                {{/if_eq}}
                {{#if_eq mode "signup"}}
                    <h2 class="{{styles.b-page-title}}">Sign Up</h2>
                    {{{emailInputComponent}}}               
                    {{{firstNameInputComponent}}}            
                    {{{lastNameInputComponent}}}              
                    {{{loginInputComponent}}}                 
                    {{{phoneInputComponent}}}                  
                    {{{passwordInputComponent}}}                 
                    {{{confirmPasswordInputComponent}}} 
                    <div class="{{styles.b-form-error}}">
                        <p class="{{styles.b-form-error-text}}"></p>
                    </div>              
                    <div class="{{styles.b-submit-wrapper}}">
                        <button class="{{styles.b-submit}}" type="submit">SignUp</button>
                    </div>
                    <div class="{{styles.b-sign-in-wrapper}}">
                        <a class="{{styles.b-link}}" href="/">Login</a>
                    </div>
                {{/if_eq}}
                </form>
            </div>
        </section>
    </div>
</main>
`

export default AuthViewTemplate;
