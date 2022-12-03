import Handlebars from "handlebars"
import AvatarComponent from "../../partials/AvatarComponent";

Handlebars.registerPartial('AvatarComponent', AvatarComponent);
Handlebars.registerHelper('log', (value) => { console.log(value)});


const ProfileFieldTemplate = `
<div class="{{styles.b-profile-field-wrapper}}">
    <div class="{{styles.b-profile-field}}">
        <span class="{{styles.b-profile-field-label}}">{{#if this.label}}{{this.label}}{{/if}}</span>
        {{#if mode}}
            <input class="{{styles.b-profile-field-value}} {{styles.b-input}}" 
            {{#if this.name}}name="{{this.name}}"{{/if}} 
            type='{{#if this.type}}{{this.type}}{{else}}text{{/if}}' 
            placeholder='{{this.value}}' 
            {{#if defaultErrorMessage}}defaulterrormessage='{{defaultErrorMessage}}'{{/if}}
            />
            {{#if errorMessage}}
                <p class="{{styles.b-input-error}}">*{{errorMessage}}</p>
            {{/if}}
        {{else}}
            <p class="{{styles.b-profile-field-value}}">{{#if this.value}}{{this.value}}{{/if}}</p>
        {{/if}}
    </div>
</div>
`
export default ProfileFieldTemplate;
