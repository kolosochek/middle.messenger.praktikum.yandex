// this function can show modal view(window) by given raw html template string.
// you can also specify the parent container class by passing @context param
// @return nothing
const showModal = (template:string, context = ''):void => {
    if (!template) {
        throw new Error('showModal function, no template is given!')
    }
    const htmlTemplate = 
    `<div id='modal_window' class='b-modal-window-wrapper'>
        <div class='b-modal-window ${context}'>${template}</div>
    </div>`

    const modalWindow = document.querySelector('#modal_window');
    if (modalWindow) {
        // remove existing modal
        modalWindow.remove();
    }
    // append template to <body />
    document.body.insertAdjacentHTML('afterBegin', htmlTemplate);
    const modalWindowNode = document.querySelector('#modal_window');
    const modalWindowContent = document.querySelector('#modal_window .b-modal-window-content');
    modalWindowNode.classList.toggle('state__visible');


    // prevent modal content click from closing whole modal
    // cancelling event bubbling
    modalWindowContent.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // close modal on parent container click
    modalWindowNode.addEventListener('click', () => {
        modalWindowNode.classList.toggle('state__visible');
    });


    const uploadFileLink = document.querySelector('#modal_window .b-link');
    const fileInput = document.querySelector('#modal_window .b-input');

    if (uploadFileLink && fileInput) {
        uploadFileLink.addEventListener('click', (e) => {
            e.preventDefault();
            fileInput.click();
        });

        fileInput.addEventListener('change', () => {
            uploadFileLink.text = fileInput.value;
        });
    }
}
