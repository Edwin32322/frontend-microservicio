export const textWriter = (element: HTMLElement, text: string, i = 0): void => {
  if (!element) return;
  element.textContent += text[i];

  if (i < text.length - 1) {
    setTimeout(() => textWriter(element, text, i + 1), 30);
  }
};
