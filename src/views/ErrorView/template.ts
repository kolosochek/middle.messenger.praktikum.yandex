import Handlebars from 'handlebars';


Handlebars.registerHelper('if_eq', function(a, b, opts) {
    if (a == b) {
        return opts.fn(this);
    } else {
        return opts.inverse(this);
    }
});
// debug
Handlebars.registerHelper('log', (value) => { console.log(value) });


const ErrorTemplate = `
<main id="viewport" class="{{styles.b-page-wrapper}}">
    <div class="{{styles.b-page}}">
        <section class="{{styles.b-error-wrapper}}">
            <div class="{{styles.b-error}}">
            {{#if_eq mode "error404"}}
                <h1 class="{{styles.b-error-title}}">404</h1>
                <p class="{{styles.b-error-message}}">Page not found. That's so sad ;(</p>
                <a href="/#/" class="{{styles.b-link}}"><- go back to the chat</a>               
            {{/if_eq}}
            {{#if_eq mode "error500"}}
                <h1 class="{{styles.b-error-title}}">500</h1>
                <p class="{{styles.b-error-message}}">Oops, something went wrong.</p>
                <a href="/#/" class="{{styles.b-link}}"><- go back to the chat</a>   
            {{/if_eq}}
            </div>
        </section> 
    </div>
</main>
`
export default ErrorTemplate;
