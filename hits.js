/* QUAD Academy visit counting (hits.sh: no cookies, no personal data). Stats: /stats.html */
(function () {
  var HITS = 'https://hits.sh/quadacademy.org/';
  function hit(n) { try { var i = new Image(); i.src = HITS + n + '.svg?r=' + Date.now(); } catch (e) {} }
  function once(n) {
    try { if (sessionStorage.getItem('quad-h-' + n)) return; sessionStorage.setItem('quad-h-' + n, '1'); } catch (e) {}
    hit(n);
  }
  function clean(s) { return String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40); }
  window.QUADHit = hit;

  var page = location.pathname.replace(/^\/|\.html$/g, '').replace(/\/$/, '').replace(/\//g, '-') || 'index';
  var p = new URLSearchParams(location.search), ref = document.referrer || '';
  var src = clean(p.get('utm_source') || p.get('src'));

  /* Where the visitor came from: tagged links first, then the referrer */
  var from = '';
  if (p.get('gclid') || p.get('gbraid') || p.get('wbraid') || p.get('gad_source') || /googleads|doubleclick|googlesyndication/.test(ref)) from = 'ad';
  else if (/^(wa|whatsapp)/.test(src) || /whatsapp|wa\.me/.test(ref)) from = 'whatsapp';
  else if (/^(yt|youtube)/.test(src) || /youtube\.com|youtu\.be/.test(ref)) from = 'youtube';
  else if (/^(ig|instagram)/.test(src) || /instagram\.com/.test(ref)) from = 'instagram';
  else if (/^(fb|facebook)/.test(src) || /facebook\.com|fb\.com/.test(ref)) from = 'facebook';
  else if (/^(tg|telegram)/.test(src) || /t\.me|telegram/.test(ref)) from = 'telegram';
  else if (/google\.|bing\.|duckduckgo|yahoo\./.test(ref)) from = 'search';
  else if (/chatgpt|openai|perplexity|gemini\.google|claude\.ai|copilot/.test(ref)) from = 'ai';
  else if (src) from = 'other';
  else if (ref && ref.indexOf(location.host) < 0) from = 'other';
  else if (!ref) from = 'direct';

  once('visits');
  once('page-' + page);
  if (from) once('from-' + from);
  if (p.get('utm_campaign')) once('camp-' + clean(p.get('utm_campaign')));
  try { if (!localStorage.getItem('quad-seen')) { localStorage.setItem('quad-seen', '1'); once('new-visitors'); } else once('returning-visitors'); } catch (e) {}

  /* What they clicked */
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    var h = a.href;
    if (/wa\.me\//.test(h)) {
      hit('enquiry-clicks');
      if (/masterclass/i.test(decodeURIComponent(h))) hit('enquiry-masterclass');
      else if (/board(%20|\s)?boost/i.test(decodeURIComponent(h))) hit('enquiry-boardboost');
    }
    else if (/whatsapp\.com\/channel/.test(h)) hit('wa-follow-clicks');
    else if (/youtube\.com|youtu\.be/.test(h)) hit('yt-clicks');
    else if (/drive\.google\.com|docs\.google\.com/.test(h)) hit('pdf-clicks');
    else if (/rzp\.io|razorpay/.test(h)) hit('pay-clicks');
  }, true);
})();
