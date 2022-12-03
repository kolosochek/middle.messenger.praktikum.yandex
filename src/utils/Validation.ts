const Rules = {
  "login": /^(?=.*[a-zA-Z])([a-zA-Z0-9-_]){3,20}$/,
  "password": /^(?=.*?([A-Z]))(?=.*?\d)(\w|-|_){8,40}$/,
  "confirm_password": /^(?=.*?([A-Z]))(?=.*?\d)(\w|-|_){8,40}$/,
  "old_password": /^(?=.*?([A-Z]))(?=.*?\d)(\w|-|_){8,40}$/,
  "email": /.+@[^@]+[a-z]+\.[^@]{2,}$/,
  "first_name": /^[А-ЯЁA-Z][А-ЯЁA-Zа-яёa-z-]+$/,
  "second_name": /^[А-ЯЁA-Z][А-ЯЁA-Zа-яёa-z-]+$/,
  "phone": /^[+-d]?\d{10,15}$/,
  "message": /(.|\s)*\S(.|\s)*/,
  "any": /(.*?)/,
}


export class Validation {
  constructor(public fieldType: string,
    public fieldValue: string,
    public fieldRegExp: RegExp) {
  }

  public static validateFieldByType(fieldType: string, fieldValue: string): boolean {
    // debug
    //console.log(`fieldType: ${fieldType}, fieldValue: ${fieldValue}`)
    //
    let validationResult = true;
    Object.entries(Rules).forEach(([key, value]) => {
      if (key === fieldType) {
        this.fieldRegExp = new RegExp(value);
        validationResult = this.fieldRegExp.test(fieldValue);
      }
    });

    return validationResult;
  }

  public static compareFields(value1: string, value2: string): boolean {
    return value1 === value2;
  }

  public static removeFieldIsValid(node: HTMLElement | null, styles: object[], errorMessage?: string): void {
    if (node !== null) {
      const parentNode: ParentNode | null = node.parentNode;
      if (parentNode !== null) {
        node.removeAttribute('isinvalid');
        parentNode.classList.remove(`${styles['state__invalid']}`);
        if (errorMessage) {
          const errorMessageNode = parentNode.querySelector<HTMLParagraphElement>('p');
          const previousErrorMessage = node.getAttribute('defaulterrormessage');
          node.getAttribute('defaulterrormessage') ? errorMessageNode.textContent = previousErrorMessage : errorMessageNode.textContent = errorMessage;
        }
      }

    }
  }

  public static setFieldIsValid(node: HTMLElement | null, styles: object[], errorMessage?: string): void {
    if (node !== null) {
      const parentNode: ParentNode | null = node.parentNode;
      if (parentNode !== null) {
        node.setAttribute('isinvalid', 'true');
        parentNode.classList.add(`${styles['state__invalid']}`);
        if (errorMessage) {
          const errorMessageNode = parentNode.querySelector<HTMLParagraphElement>('p');
          errorMessageNode ? errorMessageNode.textContent = errorMessage : false;
        }
      }
    }
  }
}
