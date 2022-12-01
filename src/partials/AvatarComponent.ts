import Handlebars from 'handlebars'


Handlebars.registerHelper('log', (value) => { console.log(value)});

const AvatarComponent = `
<figure class="{{styles.b-avatar-wrapper}}">
    {{#if this.avatar_url }}
    <image src="{{this.avatar_url}}" width="47" height="47" alt="avatar" class="{{styles.b-avatar}} {{styles.b-image}}" />
    {{else}}
    <image src="no_image.png" width="47" height="47" alt="avatar" class="{{styles.b-image}} {{styles.state__empty}}" />
    {{/if}}
</figure>
`
export default AvatarComponent;
