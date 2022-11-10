import Handlebars from "handlebars";
import InputComponent from "../components/InputComponent";

// let's register components that we'll use on that page
Handlebars.registerPartial('InputComponent', InputComponent);


const AuthPage = `
<main id="viewport" class="b-page-wrapper">
    <div class="b-page">
        <!-- if (user.isAuthorized) -->
        <section class="b-auth-page-wrapper">
            <div class="b-auth-page">
                <form class="b-form">
                    <h2 class="b-page-title">Sign In</h2>
                    {{> InputComponent title='Login' name='login_input' type='text' required='true' errorMessage='Login is empty'}}
                    {{> InputComponent title='Password' name='password_input' type='password' required='true'}}
                    <div class="b-submit-wrapper">
                        <button class="b-submit" type="submit">Authorize</button>
                    </div>
                    <div class="b-sign-in-wrapper">
                        <a class="b-link" href="/#/signup">Sign Up</a>
                    </div>
                </form>
            </div>
        </section>
        <!-- else -->
        
        <!-- -->
    </div>
</main>
`

export default AuthPage;