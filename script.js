
const cancelButton = document.querySelector('#cancelButton');
const saveButton = document.querySelector('#saveButton');
const printButton = document.querySelector('#printButton');
const editBar = document.querySelector('#editBar');
const toast = document.querySelector('#toast');
const editableItems = document.querySelectorAll('[data-editable]');
const storageKey = 'naturasuc-note';

function notify(message) {
  toast.textContent = message;
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 2400);
}

function setEditing(enabled) {
  editableItems.forEach((item) => { item.contentEditable = enabled; });
  editBar.classList.toggle('is-visible', enabled);
  editBar.setAttribute('aria-hidden', String(!enabled));
  if (enabled) editableItems[0].focus();
}

function loadSavedNote() {
  const saved = localStorage.getItem(storageKey);
  if (!saved) return;
  try {
    const content = JSON.parse(saved);
    editableItems.forEach((item, index) => { if (content[index]) item.innerHTML = content[index]; });
  } catch {
    localStorage.removeItem(storageKey);
  }
}

editButton.addEventListener('click', () => setEditing(true));
cancelButton.addEventListener('click', () => { loadSavedNote(); setEditing(false); notify('Alterações descartadas'); });
saveButton.addEventListener('click', () => {
  localStorage.setItem(storageKey, JSON.stringify([...editableItems].map((item) => item.innerHTML)));
  document.querySelector('#updatedDisplay').textContent = 'agora mesmo';
  setEditing(false);
  notify('Nota salva neste dispositivo');
});
printButton.addEventListener('click', () => window.print());
loadSavedNote();
