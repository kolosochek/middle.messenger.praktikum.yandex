const InputComponentTemplate = `    
    <div {{#if nowrap}}{{else}}class="{{styles.b-input-wrapper}}{{#if class}} {{class}}{{/if}}"{{/if}}>
        {{#if label}}<label class="{{styles.b-label}}" for="{{name}}">{{label}}</label>{{/if}}  
        <input 
        class="{{styles.b-input}}" 
        name="{{name}}" type="{{type}}" 
        {{#if placeholder}}placeholder="{{placeholder}}"{{/if}}  
        {{#if value}}value="{{value}}"{{/if}} 
        {{#if pattern}}pattern="{{pattern}}"{{/if}}
        {{#if defaultErrorMessage}}defaulterrormessage="{{defaultErrorMessage}}"{{/if}}
        {{#if isRequired}}required{{/if}}
        {{#if isDisabled}}disabled{{/if}}  />
        {{#if errorMessage}}
            <p class="{{styles.b-input-error}}">*{{errorMessage}}</p>
        {{/if}}
    </div>
`

export default InputComponentTemplate;
