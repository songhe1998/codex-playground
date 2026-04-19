const button = document.querySelector('#toggle');
const message = document.querySelector('#message');

button.addEventListener('click', () => {
  const active = button.dataset.active === 'true';

  button.dataset.active = String(!active);
  button.textContent = active ? 'Press me' : 'Pressed';
  message.textContent = active
    ? 'This is a tiny Vite app with plain JavaScript and one simple button.'
    : 'The button works: the text changed, and that is the whole interaction.';
});
