const AvatarComponent = `
<figure class="b-avatar-wrapper">
    {{#if this.avatar_url }}
    <image src="{{this.avatar_url}}" width="47" height="47" alt="avatar" class="b-avatar b-image" />
    {{else}}
    <image src="no_image.png" width="47" height="47" alt="avatar" class="b-image state__empty" />
    {{/if}}
</figure>
`
export default AvatarComponent;