const InputComponentTemplate = `
    <div class="{{styles.b-input-wrapper}}">
        {{#if title}}<label class="{{styles.b-label}}" for="{{name}}">{{title}}</label>{{/if}}  
        <input class="{{styles.b-input}}" name="{{name}}" type="{{type}}" 
        {{#if placeholder}}placeholder="{{placeholder}}"{{/if}}  
        {{#if pattern}}pattern="{{pattern}}"{{/if}}
        {{#if required}}required{{/if}}  />
        {{#if isValid}}
        {{else}}
            {{#if errorMessage}}
                <p class="{{styles.b-input-state}}">*{{errorMessage}}</p>
            {{/if}}
        {{/if}}
    </div>
`

export default InputComponentTemplate;
