/* FULL CAPS HAIR — Página de ofertas. As ofertas ficam em config.js (FULLCAPS.offers). */
(() => {
  'use strict';
  const config = window.FULLCAPS || {};
  const byId = (id) => document.getElementById(id);
  const safeExternalUrl = (value) => {
    try { const url = new URL(value); return ['https:', 'http:'].includes(url.protocol) ? url.href : ''; }
    catch { return ''; }
  };
  const brl = (n) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(n);
  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };

  if (config.announcement) byId('announcement').textContent = config.announcement;
  byId('year').textContent = String(config.copyrightYear || new Date().getFullYear());

  /* Contatos do rodapé */
  const whatsapp = String(config.whatsapp || '').replace(/\D/g, '');
  const instagram = safeExternalUrl(config.instagram);
  let hasContact = false;
  if (whatsapp) { const a = byId('whatsapp-link'); a.href = `https://wa.me/${whatsapp}`; a.hidden = false; hasContact = true; }
  if (instagram) { const a = byId('instagram-link'); a.href = instagram; a.hidden = false; hasContact = true; }
  if (config.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.email)) {
    const a = byId('email-link'); a.href = `mailto:${config.email}`; a.hidden = false; hasContact = true;
  }
  if (hasContact) byId('contact-placeholder').hidden = true;

  /* Cards */
  const grid = byId('offers-grid');
  const offers = Array.isArray(config.offers) ? config.offers : [];
  offers.forEach((offer, index) => {
    const featured = Boolean(offer.badge);
    const card = el('article', 'offer-card' + (featured ? ' is-featured' : ''));
    card.style.setProperty('--i', index);
    card.setAttribute('aria-labelledby', `offer-${offer.id}`);

    if (featured) card.appendChild(el('span', 'offer-badge', offer.badge));
    card.appendChild(el('span', 'offer-kicker', offer.kicker || ''));

    const visual = el('div', 'offer-visual');
    const img = el('img');
    img.src = offer.image;
    img.alt = offer.imageAlt || offer.name;
    img.loading = index === 0 ? 'eager' : 'lazy';
    img.decoding = 'async';
    visual.appendChild(img);
    card.appendChild(visual);

    const title = el('h2', 'offer-name');
    title.id = `offer-${offer.id}`;
    title.appendChild(el('span', 'offer-qty', String(offer.bottles)));
    title.appendChild(document.createTextNode(` ${offer.bottles > 1 ? 'frascos' : 'frasco'} ${config.product || 'Full Caps Hair'}`));
    card.appendChild(title);
    card.appendChild(el('p', 'offer-meta', `${offer.bottles * 60} cápsulas no total`));

    const priceBox = el('div', 'offer-price');
    priceBox.appendChild(el('strong', '', brl(offer.price)));
    if (offer.bottles > 1) priceBox.appendChild(el('small', '', `${brl(offer.price / offer.bottles)} por frasco`));
    card.appendChild(priceBox);

    if (offer.note) card.appendChild(el('p', 'offer-note', offer.note));

    /* Botão: checkout configurado → link; senão → aviso (sem simular compra) */
    const checkout = safeExternalUrl(offer.checkoutUrl);
    const status = el('p', 'offer-status');
    status.setAttribute('role', 'status');
    status.hidden = true;
    let action;
    if (checkout) {
      action = el('a', 'button offer-button');
      action.href = checkout;
      action.rel = 'noopener noreferrer';
    } else {
      action = el('button', 'button offer-button');
      action.type = 'button';
      action.addEventListener('click', () => {
        if (whatsapp) {
          const text = `Olá! Tenho interesse no kit de ${offer.bottles} ${offer.bottles > 1 ? 'frascos' : 'frasco'} do Full Caps Hair.`;
          window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
        } else {
          status.textContent = 'A finalização desta compra será disponibilizada em breve.';
          status.hidden = false;
        }
      });
    }
    action.append('Escolher este kit ');
    const arrow = el('span', '', '↗');
    arrow.setAttribute('aria-hidden', 'true');
    action.appendChild(arrow);
    action.setAttribute('aria-label', `Escolher este kit: ${offer.bottles} ${offer.bottles > 1 ? 'frascos' : 'frasco'}, ${brl(offer.price)}`);
    card.appendChild(el('div', 'offer-spacer'));
    card.appendChild(action);
    card.appendChild(status);
    grid.appendChild(card);
  });
  if (!offers.length) grid.appendChild(el('p', 'offers-empty', 'Nenhum kit configurado no momento.'));
})();
