var context;

/**
 * add the given model to the view
 *
 * @param {string} dataURI - the URN | URL
 */
const addModel = async dataURI => {
  try {
    const nodeId = context.add({
      dataURI,
      initialProperties: {
        enabled: true,
      },
    });

    setModalHiddem(true);
  } catch (error) {
    alert(error);
  }
};

/**
 *
 * @param {SubmitEvent} event
 */
const submitModel = event => {
  event.preventDefault();

  const urn = event.target.querySelector('input').value;

  if (urn) {
    addModel(urn);
    setModalHiddem(true);
  } else {
    alert('urn is empty');
  }
};

/**
 * add Event handlers for given domNodes
 */
const initEventListeners = () => {
  document.querySelector('form').addEventListener('submit', submitModel);
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

  // addModel('urn:x-i3d:examples:x3d:v8');
});
