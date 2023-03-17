var context;

/**
 * add Event handlers for given domNodes
 */
const initEventListeners = () => {
  document.querySelector('form').addEventListener('submit', submitModel);
  document
    .querySelector('webvis-viewer')
    .addEventListener('click', removeSelectedNodes);
};

/**
 * sets the 'hidden' attribute of the addModelModal
 *
 * @param {boolean} hidden
 *
 */
const setModalHiddem = hidden => {
  document.getElementById('add-model-dialog').hidden = hidden;
};

/**
 * the main of this application
 * but runs after the document is ready.
 */
window.addEventListener('DOMContentLoaded', async () => {
  context = webvis.getContext();

  initEventListeners();

  addModel('urn:x-i3d:examples:x3d:v8');
});
