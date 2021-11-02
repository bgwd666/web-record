type msgType = 'success' | 'error';
export const hxMessage = (msg: string, type: msgType) => {
  const cont = document.createElement('div');
  cont.className = `hx-message ${type}`;
  cont.textContent = msg;
  document.body.appendChild(cont);
  setTimeout(() => {
    document.body.removeChild(cont);
  }, 3000);
};
