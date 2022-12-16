const eventHandler = (event: HTMLElementEventMap['touchmove']) => {
  if (event.cancelable) {
    event.preventDefault();
  }
};

export const disableTouchScroll = () => {
  document.body.addEventListener('touchmove', eventHandler, {
    passive: false,
  });
};

export const enableTouchScroll = () => {
  document.body.removeEventListener('touchmove', eventHandler);
};
