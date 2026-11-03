const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

// Add the two live Cloudbeds Booking Engine URLs here when Levata's
// property inventory is published. Until then, each choice falls back to
// its room overview so guests never land on an incomplete booking screen.
const CLOUDBEDS_BOOKING_URLS = {
  postpartum: '',
  surgical: ''
};

$$('[data-cloudbeds-stay]').forEach(link => {
  const bookingUrl = CLOUDBEDS_BOOKING_URLS[link.dataset.cloudbedsStay];
  if (bookingUrl) link.href = bookingUrl;
});

const header = $('.site-header');
const menuButton = $('.menu-button');
if (header && menuButton) {
  menuButton.addEventListener('click', () => {
    const open = header.classList.toggle('menu-open');
    menuButton.setAttribute('aria-expanded', String(open));
  });
  $$('.nav a').forEach(link => link.addEventListener('click', () => header.classList.remove('menu-open')));
}

const stayPicker = $('#stay-picker-modal');
if (stayPicker) {
  $$('.stay-picker-trigger').forEach(button => button.addEventListener('click', () => {
    header?.classList.remove('menu-open');
    menuButton?.setAttribute('aria-expanded', 'false');
    stayPicker.showModal();
  }));
  $('.stay-picker-close', stayPicker)?.addEventListener('click', () => stayPicker.close());
  stayPicker.addEventListener('click', event => { if (event.target === stayPicker) stayPicker.close(); });
  stayPicker.addEventListener('keydown', event => { if (event.key === 'Escape') stayPicker.close(); });
}

const modal = $('#rsvp-modal');
if (modal) {
  $$('[data-modal-open]').forEach(button => button.addEventListener('click', () => modal.showModal()));
  $$('[data-modal-close]').forEach(button => button.addEventListener('click', () => modal.close()));
  modal.addEventListener('click', event => { if (event.target === modal) modal.close(); });
}

const toast = $('.toast');
let toastTimer;
function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
}
$$('[data-toast]').forEach(button => button.addEventListener('click', () => showToast(button.dataset.toast)));

$('#rsvp-form')?.addEventListener('submit', event => {
  event.preventDefault();
  modal.close();
  event.currentTarget.reset();
  showToast('You’re on the RSVP list. We’ll be in touch soon.');
});

const drawer = $('.booking-drawer');
const scrim = $('.scrim');
function setDrawer(open) {
  if (!drawer || !scrim) return;
  drawer.classList.toggle('open', open);
  scrim.classList.toggle('open', open);
  drawer.setAttribute('aria-hidden', String(!open));
  document.body.style.overflow = open ? 'hidden' : '';
}
$$('.booking-trigger').forEach(button => button.addEventListener('click', () => setDrawer(true)));
$('.drawer-close')?.addEventListener('click', () => setDrawer(false));
scrim?.addEventListener('click', () => setDrawer(false));

const bookingForm = $('#booking-form');
$$('[data-choice]').forEach(button => button.addEventListener('click', () => {
  $$('[data-choice]').forEach(choice => choice.classList.remove('selected'));
  button.classList.add('selected');
  bookingForm.elements.stay.value = button.dataset.choice;
  $('button[type="submit"]', bookingForm).disabled = false;
}));
bookingForm?.addEventListener('submit', event => {
  event.preventDefault();
  const choice = bookingForm.elements.stay.value;
  setDrawer(false);
  bookingForm.reset();
  $$('[data-choice]').forEach(button => button.classList.remove('selected'));
  $('button[type="submit"]', bookingForm).disabled = true;
  showToast(`${choice} request received. We’ll follow up shortly.`);
});

$$('.js-demo-form').forEach(form => form.addEventListener('submit', event => {
  event.preventDefault();
  form.reset();
  showToast('Thank you. We’ll be in touch shortly.');
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } });
}, { threshold: 0.12 });
$$('.reveal').forEach(element => observer.observe(element));

const resourceFilters = $$('.filter-pills a[href^="#"]');
if (resourceFilters.length) {
  resourceFilters.forEach(link => link.addEventListener('click', () => {
    resourceFilters.forEach(filter => filter.classList.remove('is-pressed'));
    link.classList.add('is-pressed');
    setTimeout(() => link.classList.remove('is-pressed'), 420);
  }));
}
