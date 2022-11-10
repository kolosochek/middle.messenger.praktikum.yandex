const ImageComponent = `
    {{#if image_url}}
        <img src="{{image_url}}" class="b-image{{#if class}} {{class}}{{/if}}" {{#if height}}height="{{height}}"{{/if}} {{#if width}}width="{{width}}"{{/if}}/>
    {{else}}
        <img src="no_image.png" class="b-image{{#if class}} {{class}}{{/if}}" {{#if height}}height="{{height}}"{{/if}} {{#if width}}width="{{width}}"{{/if}}/>
    {{/if}}
`
export default ImageComponent;