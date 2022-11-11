import Handlebars from "handlebars";

Handlebars.registerHelper('if_eq', (a, b, opts) => {
    if (a == b) {
        return opts.fn(this);
    } else {
        return opts.inverse(this);
    }
});

const InputComponent = `
    <div class="b-input-wrapper">
        {{#if title}}<label class="b-label" for="{{name}}">{{title}}</label>{{/if}}  
        <input class="b-input" name="{{name}}" type="{{type}}" 
        {{#if placeholder}}placeholder="{{placeholder}}"{{/if}}  
        {{#if pattern}}pattern="{{pattern}}"{{/if}}
        {{#if required}}required{{/if}}  />
        {{#if errorMessage}}
            <p class="b-input-state">*{{errorMessage}}</p>
        {{/if}}
    </div>
`

export default InputComponent;