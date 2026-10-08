/* FULL CAPS HAIR — Interações. Dados comerciais ficam em config.js. */
(() => {
  'use strict';
  const config = window.FULLCAPS || {};
  const byId = (id) => document.getElementById(id);
  const setText = (id, value) => { const el = byId(id); if (el && value) el.textContent = value; };
  const safeExternalUrl = (value) => {
    try { const url = new URL(value); return ['https:', 'http:'].includes(url.protocol) ? url.href : ''; }
    catch { return ''; }
  };

  setText('announcement', config.announcement);
  setText('year', String(config.copyrightYear || new Date().getFullYear()));
  setText('dosage', config.dosage);
  setText('faq-dosage', config.dosage);
  if (config.price) setText('price', config.price);

  /* "Consultar disponibilidade" leva à página interna de ofertas (checkout é configurado em config.js > offers). */
  const buyButton = byId('buy-button');
  buyButton.href = 'ofertas/';
  setText('faq-buy', 'Clique em “Consultar disponibilidade” nesta página para ver os kits disponíveis.');

  const whatsapp = String(config.whatsapp || '').replace(/\D/g, '');
  const whatsappUrl = whatsapp ? `https://wa.me/${whatsapp}` : '';
  const nutritionUrl = safeExternalUrl(config.nutritionUrl);
  if (nutritionUrl) { byId('nutrition-link').href = nutritionUrl; byId('nutrition-link').hidden = false; }

  let hasContact = false;
  if (whatsappUrl) { const el = byId('whatsapp-link'); el.href = whatsappUrl; el.hidden = false; hasContact = true; }
  const instagram = safeExternalUrl(config.instagram);
  if (instagram) { const el = byId('instagram-link'); el.href = instagram; el.hidden = false; hasContact = true; }
  if (config.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.email)) {
    const el = byId('email-link'); el.href = `mailto:${config.email}`; el.hidden = false; hasContact = true;
  }
  if (hasContact) byId('contact-placeholder').hidden = true;

  const toggle = byId('menu-toggle');
  const mobileNav = byId('mobile-nav');
  const closeMenu = () => { mobileNav.hidden = true; toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Abrir menu'); };
  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    mobileNav.hidden = isOpen;
    toggle.setAttribute('aria-expanded', String(!isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Abrir menu' : 'Fechar menu');
  });
  mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
})();
