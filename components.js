class LevataHeader extends HTMLElement {
  connectedCallback() {
    const active = this.getAttribute('active') || '';
    const item = (key, href, label) => `<a class="${active === key ? 'active-nav' : ''}" href="${href}">${label}</a>`;
    this.innerHTML = `
      <div class="announcement">
        <span>Opening January 2027 · Lehi, Utah</span>
        <a class="text-link" href="grand-opening.html">Visit the grand opening</a>
      </div>
      <header class="site-header">
        <a class="brand" href="index.html" aria-label="Levata home"><img src="assets/logo-dark.png" alt="Levata" /></a>
        <nav class="nav" aria-label="Primary navigation">
          ${item('postpartum', 'postpartum.html', 'Postpartum')}
          ${item('surgical', 'surgical-recovery.html', 'Surgical recovery')}
          ${item('events', 'events.html', 'Events')}
          ${item('resources', 'resources.html', 'Resources')}
          <a class="mobile-nav-action" href="concierge.html">Book a call</a>
          <button class="button button-dark stay-picker-trigger mobile-nav-action" type="button">Reserve your stay</button>
        </nav>
        <div class="header-actions">
          <a class="text-link ${active === 'concierge' ? 'active-nav' : ''}" href="concierge.html">Book a call</a>
          <button class="button button-dark stay-picker-trigger ${active === 'pricing' ? 'active-nav' : ''}" type="button">Reserve your stay</button>
        </div>
        <button class="menu-button" aria-label="Toggle menu" aria-expanded="false"><span></span><span></span><span></span></button>
      </header>
      <dialog class="stay-picker-modal" id="stay-picker-modal" aria-labelledby="stay-picker-title">
        <button class="close stay-picker-close" type="button" aria-label="Close stay options">×</button>
        <p class="eyebrow">Reserve your stay</p>
        <h2 id="stay-picker-title">What kind of stay are you planning?</h2>
        <p>Choose your path to see the rooms designed for your recovery, or talk through the details with our concierge.</p>
        <div class="stay-picker-options">
          <a class="stay-picker-option" href="postpartum.html#postpartum-rooms" data-cloudbeds-stay="postpartum">
            <small>For new mothers</small><strong>Postpartum stay</strong><span>View postpartum rooms →</span>
          </a>
          <a class="stay-picker-option" href="surgical-recovery.html#surgical-rooms" data-cloudbeds-stay="surgical">
            <small>For recovery after surgery</small><strong>Surgical aftercare</strong><span>View recovery rooms →</span>
          </a>
          <a class="stay-picker-option stay-picker-option--concierge" href="concierge.html">
            <small>Not sure where to begin?</small><strong>Talk to a concierge</strong><span>Plan your stay together →</span>
          </a>
        </div>
      </dialog>`;
  }
}

class LevataFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer>
        <div><a class="brand brand-footer" href="index.html"><img src="assets/logo-footer.png" alt="Levata" /></a><p>Care for the season you’re in.</p></div>
        <div><h4>Stay</h4><a href="postpartum.html">Postpartum</a><a href="surgical-recovery.html">Surgical recovery</a><a href="pricing.html">Pricing</a></div>
        <div><h4>Explore</h4><a href="events.html">Events</a><a href="resources.html">Resources</a><a href="press.html">Press</a></div>
        <div><h4>Connect</h4><a href="contact.html">Contact</a><a href="concierge.html">Book a call</a><a href="host.html">Teach at Levata</a></div>
        <p class="copyright">© 2027 Levata Retreat · Lehi, Utah</p>
      </footer><div class="toast" role="status" aria-live="polite"></div>`;
  }
}

customElements.define('levata-header', LevataHeader);
customElements.define('levata-footer', LevataFooter);
