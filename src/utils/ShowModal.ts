// this class can show modal view(window) by given raw html template string.
// you can also specify the parent container class by passing @context param
export class ShowModal{
    public static showModal(template:string, context= ''):void {
        if (!template) {
            throw new Error('showModal function, no template is given!')
        }
        const htmlTemplate = 
        `<div id='modalwindow' class='b-modal-window-wrapper'>
            <div id='modalcontent' class='b-modal-window ${context}'>${template}</div>
        </div>`

        const modalWindow = document.querySelector<HTMLDivElement>('#modalwindow');
        if (modalWindow !== null) {
            // remove existing modal
            modalWindow.remove();
        } else {
            // append template to <body />
            document.body.insertAdjacentHTML('afterBegin', htmlTemplate);

            const modalWindowNode = document.querySelector<HTMLDivElement>('#modalwindow');
            const modalWindowContent = document.querySelector<HTMLDivElement>('#modalwindow #modalcontent');

            if(modalWindowNode !== null && modalWindowContent !== null)
            {
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


            const uploadFileLink = document.querySelector<HTMLDivElement>('#modalwindow a');
            const fileInput = document.querySelector<HTMLDivElement>('#modalwindow input[type=file]');

            if (uploadFileLink !== null && fileInput !== null) {
                uploadFileLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    fileInput.click();
                });

                fileInput.addEventListener('change', () => {
                    uploadFileLink.text = fileInput.value;
                });
            }  
            } 
        }
        
    }

    public static bindToWindow(){
        window.showModal = ShowModal.showModal; 
    }
}

