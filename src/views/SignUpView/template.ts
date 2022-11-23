const SignUpViewTemplate = `
<main id="viewport" class="b-page-wrapper">
    <div class="b-page">
        <section class="b-auth-page-wrapper">
            <div class="b-auth-page">
                <form class="b-form">
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
                </form>
            </div>
        </section>
    </div>
</main>
`

export default SignUpViewTemplate;
