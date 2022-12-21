// this class can show modal view(window) by given raw html template string.
// you can also specify the parent container class by passing @context param
export class ShowModal{
    public static showModal(template:string, context = ''):void {
        if (!template) {
            throw new Error('showModal function, no template is given!')
        }
        const htmlTemplate = 
        `<div id='modalwindow' class='b-modal-window-wrapper'>
            <div id='modalcontent' class='b-modal-window ${context}'>${template}</div>
        </div>`

        const existingModalWindow = document.querySelector<HTMLDivElement>('#modalwindow');
        if (existingModalWindow !== null) {
            // remove existing modal
            existingModalWindow.remove();
        }
        // append template to <body />
        document.body.insertAdjacentHTML('afterbegin', htmlTemplate);
        const modalWindowNode = document.querySelector<HTMLDivElement>('#modalwindow');
        const modalWindowContent = document.querySelector<HTMLDivElement>('#modalwindow #modalcontent');

        if (modalWindowNode !== null && modalWindowContent !== null){
            // show #modalwinr=dow
            modalWindowNode.classList.toggle('state__visible');
            // prevent modal content click from closing whole modal
            // cancelling event bubbling
            modalWindowContent.addEventListener('click', (e:MouseEvent) => {
                e.stopPropagation();
            });

            // close modal on parent container click
            modalWindowNode.addEventListener('click', () => {
                modalWindowNode.classList.toggle('state__visible');
            });

            const uploadFileLink = document.querySelector<HTMLLinkElement>('#modalwindow a');
            const fileInput = document.querySelector<HTMLInputElement>('#modalwindow input[type=file]');

            if (uploadFileLink !== null && fileInput !== null) {
                uploadFileLink.addEventListener('click', (e:MouseEvent) => {
                    e.preventDefault();
                    fileInput.click();
                });

                fileInput.addEventListener('change', () => {
                    uploadFileLink.textContent = fileInput.value;
                });
            }  
        }
         
    }

    public static bindToWindow(){
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).showModal = ShowModal.showModal;
    }
}
