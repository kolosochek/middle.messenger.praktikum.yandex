const showModal = (template, context='') => {
    if (template) {
        
    } else {
        throw new Error('showModal function, no template is given!')
    }
    const htmlTemplate =`
    <div id='modal_window' class='b-modal-window-wrapper'>
        <div class='b-modal-window ${context}'>${template}</div>
    </div>
`

    const modal_window = document.querySelector('#modal_window');
    if (modal_window) {
        // remove existing modal
        modal_window.remove();
    } 
        // append template to <body />
        document.body.insertAdjacentHTML('afterBegin', htmlTemplate);
        const modal_window_node = document.querySelector('#modal_window');
        const modal_window_content = document.querySelector('#modal_window .b-modal-window-content');
        modal_window_node.classList.toggle('state__visible');


        // prevent modal content click from closing whole modal
        // cancelling event bubbling
        modal_window_content.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        // close modal on parent container click
        modal_window_node.addEventListener('click', () => {
            modal_window_node.classList.toggle('state__visible');
        });


    const upload_file_link = document.querySelector('#modal_window .b-link');
    const file_input = document.querySelector('#modal_window .b-input');

    if (upload_file_link && file_input) {
        upload_file_link.addEventListener('click', (e) => {
            e.preventDefault();
            file_input.click();
        });

        file_input.addEventListener('change', () => {
            upload_file_link.text = file_input.value;
        });
    }
}