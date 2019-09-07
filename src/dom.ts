export function createButton(value: string, onClick?: EventListener): HTMLInputElement {
  let btn = document.createElement('input');
  btn.setAttribute('type', 'button');
  btn.setAttribute('value', value);
  if(onClick) {
    btn.addEventListener('click', onClick);
  }
  return btn;
}

export function createText(value: string) {
  return document.createTextNode(value);
}