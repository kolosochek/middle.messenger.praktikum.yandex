const FieldProfileComponent = `
<div class="b-profile-field-wrapper">
    <div class="b-profile-field">
        <span class="b-profile-field-label">{{#if this.label}}{{this.label}}{{/if}}</span>
        {{#if mode}}
            <input class="b-profile-field-value b-input" type='{{#if this.type}}{{this.type}}{{else}}text{{/if}}' placeholder='{{this.value}}' />
        {{else}}
            <p class="b-profile-field-value">{{#if this.value}}{{this.value}}{{/if}}</p>
        {{/if}}
    </div>
</div>
`
export default FieldProfileComponent;
