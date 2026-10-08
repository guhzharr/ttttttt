/* EDITE AQUI: informações comerciais e textos do produto. */
window.FULLCAPS = {
  brand: 'CLESSER',
  product: 'Full Caps Hair',
  price: '', // Ex.: 'R$ 149,90'. Vazio = consultar preço.
  // O botão "Consultar disponibilidade" abre a página interna /ofertas. Os links de checkout ficam em offers (abaixo).
  whatsapp: '', // Apenas números com DDI e DDD. Ex.: '5511999999999'.
  instagram: '', // URL completa do Instagram.
  email: '',
  dosage: 'Ingerir 1.000 mg (2 cápsulas) ao dia, ou conforme recomendação profissional. Não exceder a recomendação diária.',
  nutritionUrl: '', // URL da tabela nutricional oficial, se disponível.
  announcement: 'Cuidado que começa na sua rotina',
  copyrightYear: new Date().getFullYear(),

  /* PÁGINA /ofertas — edite aqui nome, quantidade, preço, imagem, selo e link de checkout de cada kit.
     checkoutUrl: cole o link de pagamento (https://...). Vazio = botão preparado, sem simular compra.
     (Se o WhatsApp estiver preenchido acima, o botão sem checkout abre uma conversa com o kit escolhido.)
     badge: texto do selo de destaque; deixe '' para não destacar. */
  offers: [
    { id: 'kit-1', kicker: 'KIT INDIVIDUAL', name: '1 frasco Full Caps Hair', bottles: 1, price: 129.90,
      image: '../assets/kit-1.webp', imageAlt: 'Um frasco do suplemento Full Caps Hair da CLESSER',
      checkoutUrl: '', badge: '', note: '' },
    { id: 'kit-3', kicker: 'KIT 3 FRASCOS', name: '3 frascos Full Caps Hair', bottles: 3, price: 369.90,
      image: '../assets/kit-3.webp', imageAlt: 'Três frascos do suplemento Full Caps Hair da CLESSER',
      checkoutUrl: '', badge: 'MAIS ESCOLHIDO', note: '' },
    { id: 'kit-6', kicker: 'KIT 6 FRASCOS', name: '6 frascos Full Caps Hair', bottles: 6, price: 699.90,
      image: '../assets/kit-6.webp', imageAlt: 'Seis frascos do suplemento Full Caps Hair da CLESSER',
      checkoutUrl: '', badge: '', note: 'Para quem deseja adquirir uma quantidade maior.' }
  ]
};
