var context;

/**
 *
 * @param {HTMLUListElement} ul
 * @param {HTMLButtonElement} button
 * @param {boolean} hasChildren
 */
const expandMenuItem = async (ul, button, hasChildren) => {
  ul.hidden = !ul.hidden;

  if (hasChildren) {
    button.classList.toggle('expanded');
  }
};

/**
 *
 * @param {number} nodeId
 * @param {boolean} checked
 * @param {HTMLLIElement} menuItem
 */
const setEnabled = async (nodeId, checked, menuItem) => {
  await context.setProperty(nodeId, 'enabled', checked);

  menuItem.querySelectorAll('input').forEach(input => {
    input.checked = checked;
  });
};

/**
 * Create a menuItem render it into the given menu and returns
 * the created menuItem(li)
 *
 * @param {number} nodeId
 * @param {HTMLUListElement|HTMLMenuElement} menu - menu | ul
 * @param {number} childrenCount - number of children for the given node
 *
 * @returns {HTMLUListElement}
 */
const createMenuItem = async (nodeId, menu, childrenCount) => {
  const template = document.getElementById('side-menu-item');
  const menuItem = template.content.cloneNode(true).querySelectorAll('li')[0];
  const label = menuItem.querySelector('.label');
  const toggle = menuItem.querySelector('input');
  const ul = menuItem.querySelector('ul');
  const input = menuItem.querySelector('input');
  const text = await context.getProperty(nodeId, 'label');
  let expandButton;

  toggle.onclick = async event => {
    event.stopPropagation();
    await setEnabled(nodeId, event.target.checked, menuItem);
  };

  if (childrenCount) {
    menuItem.querySelector('.leaf').remove();
  } else {
    menuItem.querySelector('.branch').remove();
    ul.remove();
  }

  expandButton = menuItem.querySelector('button');

  expandButton.onclick = async event => {
    event.stopPropagation();
    await expandMenuItem(ul, expandButton, childrenCount);
  };

  input.checked = true;
  ul.hidden = true;
  menuItem.id = nodeId;
  label.textContent = text;

  menu.appendChild(menuItem);

  return menuItem;
};

/**
 * Creates a li that corresponds to th giveb nodeId
 * and renders it to the side menu
 *
 * @param {number} nodeId
 * @param {HTMLMenuElement|HTMLUListElement} menu
 */
const createMenuEntry = async (
  nodeId,
  menu = document.querySelector('#side-menu menu')
) => {
  const children = await context.getProperty(nodeId, 'children');
  const menuItem = await createMenuItem(nodeId, menu, children.length);

  children.forEach(id => {
    createMenuEntry(id, menuItem.querySelector('ul'));
  });
};

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

    createMenuEntry(nodeId);
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

  addModel('urn:x-i3d:examples:x3d:v8');
});
