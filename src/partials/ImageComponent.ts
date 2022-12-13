const ImageComponent = `
    {{#if image_url}}
        <img src="{{image_url}}" class="b-image{{#if class}} {{class}}{{/if}}" {{#if height}}height="{{height}}"{{/if}} {{#if width}}width="{{width}}"{{/if}}/>
    {{else if avatar_url}}
        <img src="https://ya-praktikum.tech/api/v2/resources/{{avatar_url}}" class="b-image{{#if class}} {{class}}{{/if}}" {{#if height}}height="{{height}}"{{/if}} {{#if width}}width="{{width}}"{{/if}}/>
    {{else}}
        <img src="no_image.png" class="b-image{{#if class}} {{class}}{{/if}}" {{#if height}}height="{{height}}"{{/if}} {{#if width}}width="{{width}}"{{/if}}/>
    {{/if}}
`

export default ImageComponent;
