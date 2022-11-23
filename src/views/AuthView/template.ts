const AuthViewTemplate = `
<main id="viewport" class="b-page-wrapper">
    <div class="b-page">
        <section class="b-auth-page-wrapper">
            <div class="b-auth-page">
                <form class="b-form">
                    <h2 class="b-page-title">Sign In</h2>
                    {{{loginInputComponent}}}
                    {{{passwordInputComponent}}}
                    <div class="b-submit-wrapper">
                        <button class="b-submit" type="submit">Authorize</button>
                    </div>
                    <div class="b-sign-in-wrapper">
                        <a class="b-link" href="/#/signup">Sign Up</a>
                    </div>
                </form>
            </div>
        </section>
    </div>
</main>
`

export default AuthViewTemplate;
