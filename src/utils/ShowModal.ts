// this class can show modal view(window) by given raw html template string.
// you can also specify the parent container class by passing @context param
export class ShowModal {
    public static showModal(template: string, context = ''): void {
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
        document.body.insertAdjacentHTML('afterBegin', htmlTemplate);
        const modalWindowNode = document.querySelector<HTMLDivElement>('#modalwindow');

            // show #modalwinr=dow
            modalWindowNode.classList.toggle('state__visible');
            // prevent modal content click from closing whole modal
            // cancelling event bubbling
    }

    public static bindToWindow() {
        window.showModal = ShowModal.showModal;
    }
}

