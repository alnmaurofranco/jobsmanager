/* eslint-disable no-undef */
// eslint-disable-next-line import/extensions
import Modal from './modal.js';

const modal = Modal({ animateClasses: ['animate-pop', 'back'] });

document.querySelector('.open-modal').addEventListener('click', modal.open);
