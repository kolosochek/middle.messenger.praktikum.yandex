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
    let validationResult = true;
    Object.entries(Rules).forEach(([key, value]) => {
      if (key === fieldType) {
        this.fieldRegExp = new RegExp(value);
        validationResult = this.fieldRegExp.test(fieldValue);
      }
    });
    return validationResult;
  }

  public static removeFieldIsInvalid(node: HTMLElement | null, styles: object[], errorMessage?: string): void {
    if (node !== null) {
      const parentNode: ParentNode | null = node.parentNode;
      if (parentNode !== null) {
        node.removeAttribute('isinvalid');
        parentNode.classList.remove(`${styles['state__invalid']}`);
        if (errorMessage) {
          const errorMessageNode = parentNode.querySelector<HTMLParagraphElement>('p');
          if (errorMessageNode !== null) {
            errorMessageNode.textContent = errorMessage;
          }
        } else {
          Validation.setDefaultErrorMessage(node);
        }
      }
    }
  }

  public static setFieldIsInvalid(node: HTMLElement | null, styles: object[], errorMessage?: string): void {
    if (node !== null) {
      const parentNode: ParentNode | null = node.parentNode;
      if (parentNode !== null) {
        if (errorMessage) {
          const errorMessageNode = parentNode.querySelector<HTMLParagraphElement>('p');
          if (errorMessageNode !== null) {
            errorMessageNode.textContent = errorMessage;
          }
        } else {
          Validation.setDefaultErrorMessage(node)
        }
        node.setAttribute('isinvalid', 'true');
        parentNode.classList.add(`${styles['state__invalid']}`);
      }
    }
  }

  public static setDefaultErrorMessage(node: HTMLElement): void {
    if (node !== null && node.parentNode !== null) {
    const errorMessageNode = node.parentNode.querySelector<HTMLParagraphElement>('p');
    const previousErrorMessage = node.getAttribute('defaulterrormessage');
    if (errorMessageNode !== null && previousErrorMessage){
      errorMessageNode.textContent = previousErrorMessage;
    }
    }
  }

  public static comparePasswordFields(password:HTMLInputElement | null, confirm_password:HTMLInputElement | null, styles: object[]): boolean {
    if (password !== null && confirm_password !== null){
        if(password.value === confirm_password.value) {
          Validation.removeFieldIsInvalid(password, styles)
          Validation.removeFieldIsInvalid(confirm_password, styles) 
          return true;
        } else {
          Validation.setFieldIsInvalid(password, styles, "Passwords didn't match");
          Validation.setFieldIsInvalid(confirm_password, styles, "Passwords didn't match");
        }
      } 
      return false;
    }

  public static setFormError(form:HTMLFormElement | null, styles: object[], errorMessage = ''){
    if (form !== null){
      const errorMessageNode = form.querySelector<HTMLParagraphElement>(`p.${styles['b-form-error-text']}`)!;
      errorMessageNode.textContent = errorMessage;
      errorMessageNode.parentNode?.classList.add(`${styles['state__error']}`);
    } else {
      throw new Error(`Given form is empty`);
    }
  }

  public static validateField(element: HTMLInputElement | Event, styles:object[]) {
    if (element instanceof HTMLInputElement) {
      Validation.validateFieldByType(element.name, element.value)
        ? Validation.removeFieldIsInvalid(element, styles)
        : Validation.setFieldIsInvalid(element, styles)
    } else {
      Validation.validateFieldByType(element.target.name, element.target.value)
        ? Validation.removeFieldIsInvalid(element.target, styles)
        : Validation.setFieldIsInvalid(element.target, styles)
    }
  }

  public static escapeHtml(unsafe:string) {
    return unsafe.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');
}

}
