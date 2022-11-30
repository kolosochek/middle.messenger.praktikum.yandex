import Handlebars from 'handlebars';
Handlebars.registerHelper('log', (value) => { console.log(value)});


const InputComponentTemplate = `    
    <div {{#if nowrap}}{{else}}class="{{styles.b-input-wrapper}}"{{/if}}>
        {{#if title}}<label class="{{styles.b-label}}" for="{{name}}">{{title}}</label>{{/if}}  
        <input class="{{styles.b-input}}" name="{{name}}" type="{{type}}" 
        {{#if placeholder}}placeholder="{{placeholder}}"{{/if}}  
        {{#if value}}value="{{value}}"{{/if}} 
        {{#if pattern}}pattern="{{pattern}}"{{/if}}
        {{#if defaultErrorMessage}}defaulterrormessage="{{defaultErrorMessage}}"{{/if}}
        {{#if required}}required{{/if}}  />
        {{#if errorMessage}}
            <p class="{{styles.b-input-error}}">*{{errorMessage}}</p>
        {{/if}}
    </div>
`

export default InputComponentTemplate;
