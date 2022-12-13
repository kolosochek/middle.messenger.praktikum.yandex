const InputComponentTemplate = `    
    <div class="{{styles.b-input-wrapper}}{{#if class}} {{class}}{{/if}}">
        {{#if label}}<label class="{{styles.b-label}}" for="{{name}}">{{label}}</label>{{/if}}  
        <input 
        class="{{styles.b-input}}" 
        name="{{name}}" {{#if type}}type="{{type}}"{{else}}type="text"{{/if}} 
        {{#if placeholder}}placeholder="{{placeholder}}"{{/if}}  
        {{#if value}}value="{{value}}"{{/if}} 
        {{#if pattern}}pattern="{{pattern}}"{{/if}}
        {{#if defaultErrorMessage}}defaulterrormessage="{{defaultErrorMessage}}"{{/if}}
        {{#if tabindex}}tabindex="{{tabindex}}"{{/if}}
        {{#if isRequired}}required{{/if}}
        {{#if isDisabled}}disabled{{/if}}  />
        {{#if errorMessage}}
            <p class="{{styles.b-input-error}}">*{{errorMessage}}</p>
        {{/if}}
    </div>
`

export default InputComponentTemplate;
