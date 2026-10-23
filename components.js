class LevataHeader extends HTMLElement {
  connectedCallback() {
    const active = this.getAttribute('active') || '';
    const item = (key, href, label) => `<a class="${active === key ? 'active-nav' : ''}" href="${href}">${label}</a>`;
    this.innerHTML = `
      <div class="announcement">
        <span>Opening January 2027 · Lehi, Utah</span>
        <a class="text-link" href="events.html">Visit the grand opening</a>
      </div>
      <header class="site-header">
        <a class="brand" href="index.html" aria-label="Levata home"><img src="assets/logo-dark.png" alt="Levata" /></a>
        <nav class="nav" aria-label="Primary navigation">
          ${item('postpartum', 'postpartum.html', 'Postpartum')}
          ${item('surgical', 'surgical-recovery.html', 'Surgical recovery')}
          ${item('events', 'events.html', 'Events')}
          ${item('resources', 'resources.html', 'Resources')}
        </nav>
        <div class="header-actions">
          <a class="text-link ${active === 'concierge' ? 'active-nav' : ''}" href="concierge.html">Book a call</a>
          <a class="button button-dark ${active === 'pricing' ? 'active-nav' : ''}" href="pricing.html">Reserve your stay</a>
        </div>
        <button class="menu-button" aria-label="Toggle menu" aria-expanded="false"><span></span><span></span><span></span></button>
      </header>`;
  }
}

class LevataFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer>
        <div><a class="brand brand-footer" href="index.html"><img src="assets/logo-footer.png" alt="Levata" /></a><p>Care for the season you’re in.</p></div>
        <div><h4>Stay</h4><a href="postpartum.html">Postpartum</a><a href="surgical-recovery.html">Surgical recovery</a><a href="pricing.html">Pricing</a></div>
        <div><h4>Explore</h4><a href="events.html">Events</a><a href="resources.html">Resources</a><a href="contact.html">Press</a></div>
        <div><h4>Connect</h4><a href="contact.html">Contact</a><a href="concierge.html">Book a call</a><a href="events.html#host">Teach at Levata</a></div>
        <p class="copyright">© 2027 Levata Retreat · Lehi, Utah</p>
      </footer>`;
  }
}

customElements.define('levata-header', LevataHeader);
customElements.define('levata-footer', LevataFooter);
