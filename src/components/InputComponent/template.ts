const InputComponentTemplate = `
    <div class="b-input-wrapper">
        {{#if title}}<label class="b-label" for="{{name}}">{{title}}</label>{{/if}}  
        <input class="b-input" name="{{name}}" type="{{type}}" 
        {{#if placeholder}}placeholder="{{placeholder}}"{{/if}}  
        {{#if pattern}}pattern="{{pattern}}"{{/if}}
        {{#if required}}required{{/if}}  />
        {{#if isValid}}
        {{else}}
            {{#if errorMessage}}
                <p class="b-input-state">*{{errorMessage}}</p>
            {{/if}}
        {{/if}}
    </div>
`

export default InputComponentTemplate;
