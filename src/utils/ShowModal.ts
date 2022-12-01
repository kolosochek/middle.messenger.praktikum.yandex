export class ShowModal{
    // this function can show modal view(window) by given raw html template string.
    // you can also specify the parent container class by passing @context param
    // @return nothing
    public static showModal(template:string, context = ''):void {
        if (!template) {
            throw new Error('showModal function, no template is given!')
        }
        const htmlTemplate = 
        `<div id='modalwindow' class='b-modal-window-wrapper'>
            <div id='modalcontent' class='b-modal-window ${context}'>${template}</div>
        </div>`

        const modalWindow = document.querySelector('#modalwindow');
        if (modalWindow) {
            // remove existing modal
            modalWindow.remove();
        }
        // append template to <body />
        document.body.insertAdjacentHTML('afterBegin', htmlTemplate);
        const modalWindowNode = document.querySelector('#modalwindow');
        const modalWindowContent = document.querySelector('#modalwindow #modalcontent');
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


        const uploadFileLink = document.querySelector('#modalwindow a');
        const fileInput = document.querySelector('#modalwindow input[type=file]');

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

    public static bindToWindow(){
        window.showModal = ShowModal.showModal; 
    }
}

