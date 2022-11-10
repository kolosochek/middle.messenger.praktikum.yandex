import Handlebars from "handlebars";
import InputComponent from "../components/InputComponent";

// let's register components that we'll use on that page
Handlebars.registerPartial('InputComponent', InputComponent);


const SignUpPage = `
<main id="viewport" class="b-page-wrapper">
    <div class="b-page">
        <!-- if (user.isAuthorized) -->
        <section class="b-auth-page-wrapper">
            <div class="b-auth-page">
                <form class="b-form" >
                    <h2 class="b-page-title">Sign Up</h2>
                    {{> InputComponent title='Email' name='email_input' type='email' placeholder='sebastian1337@gmail.com' required='true'}}
                    {{> InputComponent title='First name' name='first_name_input' type='text' placeholder='Sebastian'}}
                    {{> InputComponent title='Last name' name='last_name_input' type='text' placeholder='Pereiro'}}
                    {{> InputComponent title='Login' name='login_input' type='text' placeholder='sebastian1337' required='true'}}
                    {{> InputComponent title='Phone' name='phone_input' type='tel' placeholder='+7 904 889 1488' pattern="[+]{1}[0-9]{7,14}" required='true'}}
                    {{> InputComponent title='Password' name='password_input' type='password' placeholder='123123' required='true'}}
                    {{> InputComponent title='Confirm password' name='confirm_password_input' type='password' placeholder='123123' required='true'}}
                    <div class="b-submit-wrapper">
                        <button class="b-submit" type="submit">SignUp</button>
                    </div>
                    <div class="b-sign-in-wrapper">
                        <a class="b-link" href="/#/auth">Login</a>
                    </div>
                </form>
            </div>
        </section>
        <!-- else -->
        
        <!-- -->
    </div>
</main>
`

export default SignUpPage;