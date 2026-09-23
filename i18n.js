// Language switch EN / DE / IT.
// The HTML is written in English. Every English text below is looked up and
// replaced with its German or Italian version. To add a new text: copy the
// English exactly as it appears on the page and add the translations.
(function () {
  var T = {
    // nav + footer
    'Dance & Art': { de: 'Tanz & Kunst', it: 'Danza & Arte' },
    'Paintings': { de: 'Bilder', it: 'Dipinti' },
    'Contact': { de: 'Kontakt', it: 'Contatti' },
    'Munich · 2026': { de: 'München · 2026', it: 'Monaco di Baviera · 2026' },

    // home
    'Chiara Laurenza — Chiara Laurenza': { de: 'Chiara Laurenza', it: 'Chiara Laurenza' },
    'Dancer & Painter — Munich': { de: 'Tänzerin & Malerin — München', it: 'Danzatrice & Pittrice — Monaco' },
    'Dance.': { de: 'Tanzen.', it: 'Danza.' },
    'Feel.': { de: 'Fühlen.', it: 'Senti.' },
    'Paint.': { de: 'Malen.', it: 'Dipingi.' },
    'We dance a feeling, pause to listen, and translate what the body holds into colour on canvas.': {
      de: 'Wir tanzen ein Gefühl, halten inne, um hinzuhören, und übersetzen, was der Körper in sich trägt, in Farbe auf Leinwand.',
      it: 'Danziamo un’emozione, ci fermiamo ad ascoltare e traduciamo ciò che il corpo custodisce in colore sulla tela.'
    },
    'See Workshops': { de: 'Workshops ansehen', it: 'Scopri i workshop' },
    'Book a Workshop': { de: 'Workshop buchen', it: 'Prenota un workshop' },
    'What I Offer': { de: 'Was ich anbiete', it: 'Cosa offro' },
    'Workshops — 01': { de: 'Workshops — 01', it: 'Workshop — 01' },
    'Dance & Art Workshops': { de: 'Tanz & Kunst Workshops', it: 'Workshop di Danza & Arte' },
    'Explore →': { de: 'Entdecken →', it: 'Scopri →' },
    'Paintings — 02': { de: 'Bilder — 02', it: 'Dipinti — 02' },
    'Originals & Commissions': { de: 'Originale & Auftragsarbeiten', it: 'Originali & Commissioni' },
    'Notes from the Studio': { de: 'Notizen aus dem Atelier', it: 'Appunti dallo studio' },
    'Read →': { de: 'Lesen →', it: 'Leggi →' },
    'Let’s create': { de: 'Lass uns gemeinsam', it: 'Creiamo' },
    'together.': { de: 'etwas schaffen.', it: 'insieme.' },
    'Questions about workshops, paintings or commissions — I would love to hear from you.': {
      de: 'Fragen zu Workshops, Bildern oder Auftragsarbeiten? Ich freue mich, von dir zu hören.',
      it: 'Domande su workshop, dipinti o commissioni? Sarò felice di sentirti.'
    },
    'Location': { de: 'Ort', it: 'Luogo' },
    'Munich, Bavaria, Germany': { de: 'München, Bayern, Deutschland', it: 'Monaco di Baviera, Germania' },
    'First Name': { de: 'Vorname', it: 'Nome' },
    'Last Name': { de: 'Nachname', it: 'Cognome' },
    'Topic': { de: 'Thema', it: 'Argomento' },
    'Dance & Art — Workshop': { de: 'Tanz & Kunst — Workshop', it: 'Danza & Arte — Workshop' },
    'Dance & Art — Teams & Events': { de: 'Tanz & Kunst — Teams & Events', it: 'Danza & Arte — Team & Eventi' },
    'Painting — Buy or Commission': { de: 'Bild — kaufen oder beauftragen', it: 'Dipinto — acquisto o commissione' },
    'General Enquiry': { de: 'Allgemeine Anfrage', it: 'Richiesta generale' },
    'Message': { de: 'Nachricht', it: 'Messaggio' },
    'Tell me what you have in mind...': { de: 'Erzähl mir, was du vorhast …', it: 'Raccontami cosa hai in mente…' },
    'Send Message': { de: 'Nachricht senden', it: 'Invia messaggio' },
    'Message received — I will be in touch shortly.': { de: 'Nachricht erhalten — ich melde mich bald.', it: 'Messaggio ricevuto — ti risponderò presto.' },

    // booking popup
    'Close ×': { de: 'Schließen ×', it: 'Chiudi ×' },
    'Booking': { de: 'Buchung', it: 'Prenotazione' },
    'Book a Session': { de: 'Termin buchen', it: 'Prenota' },
    'Your name': { de: 'Dein Vorname', it: 'Il tuo nome' },
    'Your surname': { de: 'Dein Nachname', it: 'Il tuo cognome' },
    'Phone (optional)': { de: 'Telefon (optional)', it: 'Telefono (facoltativo)' },
    'Preferred Date': { de: 'Wunschtermin', it: 'Data preferita' },
    'Level': { de: 'Erfahrung', it: 'Livello' },
    'Beginner': { de: 'Anfänger:in', it: 'Principiante' },
    'Some Experience': { de: 'Etwas Erfahrung', it: 'Un po’ di esperienza' },
    'Intermediate': { de: 'Fortgeschritten', it: 'Intermedio' },
    'Advanced': { de: 'Sehr erfahren', it: 'Avanzato' },
    'Tell me about your goals...': { de: 'Was wünschst du dir? …', it: 'Raccontami cosa desideri…' },
    'Send Request': { de: 'Anfrage senden', it: 'Invia richiesta' },
    'Received — I will be in touch shortly.': { de: 'Erhalten — ich melde mich bald.', it: 'Ricevuto — ti risponderò presto.' },
    'Ask About a Painting': { de: 'Anfrage zu einem Bild', it: 'Informazioni su un dipinto' },
    'Taster Workshop': { de: 'Schnupper-Workshop', it: 'Workshop introduttivo' },
    'Four-Evening Series': { de: 'Serie an vier Abenden', it: 'Ciclo di quattro serate' },
    'Teams & Events': { de: 'Teams & Events', it: 'Team & Eventi' },
    'Commission a Piece': { de: 'Bild in Auftrag geben', it: 'Commissiona un’opera' },
    'Book a Dance & Art Workshop': { de: 'Tanz & Kunst Workshop buchen', it: 'Prenota un workshop di Danza & Arte' },
    'Art': { de: 'Kunst', it: 'Arte' },

    // paintings page
    'Art — Chiara Laurenza': { de: 'Bilder — Chiara Laurenza', it: 'Dipinti — Chiara Laurenza' },
    'Discipline — 03': { de: 'Malerei', it: 'Pittura' },
    'Painting': { de: 'Malerei', it: 'Pittura' },
    'Original acrylic paintings — for sale and made on commission.': {
      de: 'Original-Acrylbilder — zum Kaufen und auf Auftrag.',
      it: 'Dipinti originali in acrilico — in vendita e su commissione.'
    },
    'Get in Touch': { de: 'Kontakt aufnehmen', it: 'Scrivimi' },
    'Order a custom painting for your home, studio, or as a considered, deeply personal gift. Each piece is unique and made by hand — on canvas, textile, or any surface you choose.': {
      de: 'Ein Bild nach deinen Wünschen, für dein Zuhause, dein Studio oder als besonders persönliches Geschenk. Jedes Stück ist ein handgemachtes Unikat — auf Leinwand, Stoff oder einer Fläche deiner Wahl.',
      it: 'Un dipinto su misura per la tua casa, il tuo studio o come regalo davvero personale. Ogni pezzo è unico e fatto a mano — su tela, tessuto o qualsiasi superficie tu scelga.'
    },
    'Custom': { de: 'Individuell', it: 'Su misura' },
    'Canvas': { de: 'Leinwand', it: 'Tela' },
    'Textiles': { de: 'Textilien', it: 'Tessuti' },
    'Request Commission': { de: 'Auftrag anfragen', it: 'Richiedi una commissione' },
    'Buy an Original': { de: 'Original kaufen', it: 'Acquista un originale' },
    'Acrylic paintings on canvas, each one unique. Ask for available works, sizes and prices.': {
      de: 'Acrylbilder auf Leinwand, jedes ein Unikat. Frag nach verfügbaren Werken, Größen und Preisen.',
      it: 'Dipinti in acrilico su tela, ognuno unico. Chiedi le opere disponibili, le misure e i prezzi.'
    },
    'Originals': { de: 'Originale', it: 'Originali' },
    'Acrylic': { de: 'Acryl', it: 'Acrilico' },
    'Ask About Works': { de: 'Nach Werken fragen', it: 'Chiedi delle opere' },
    'Surface & Medium': { de: 'Untergrund & Material', it: 'Superficie & Materiale' },
    'The Surface': { de: 'Der Untergrund', it: 'La superficie' },
    'Fabric becomes a living canvas — painting on cloth brings colour into everyday objects, from clothing to home pieces. Each piece absorbs the paint differently, making every result one of a kind.': {
      de: 'Stoff wird zur lebendigen Leinwand — Malerei auf Textil bringt Farbe in Alltagsdinge, von Kleidung bis zu Wohnstücken. Jedes Stück nimmt die Farbe anders auf, deshalb ist jedes Ergebnis einzigartig.',
      it: 'Il tessuto diventa una tela viva — dipingere sulla stoffa porta il colore negli oggetti di ogni giorno, dagli abiti alla casa. Ogni pezzo assorbe il colore in modo diverso, rendendo ogni risultato unico.'
    },
    'Candles': { de: 'Kerzen', it: 'Candele' },
    'The Object': { de: 'Das Objekt', it: 'L’oggetto' },
    'Painting directly onto candles transforms a simple object into something decorative and personal. Delicate brushwork, botanical motifs, and layered colour sit beautifully on wax surfaces.': {
      de: 'Direkt auf Kerzen gemalt, wird ein einfaches Objekt dekorativ und persönlich. Feine Pinselstriche, florale Motive und Farbschichten wirken wunderschön auf Wachs.',
      it: 'Dipingere direttamente sulle candele trasforma un oggetto semplice in qualcosa di decorativo e personale. Pennellate delicate, motivi botanici e strati di colore risaltano sulla cera.'
    },
    'The Classic': { de: 'Der Klassiker', it: 'Il classico' },
    'The canvas is where painting finds its full freedom — colour, composition, and gesture with no constraints. Sessions range from guided studies to open, expressive painting for all levels.': {
      de: 'Auf der Leinwand findet die Malerei ihre ganze Freiheit — Farbe, Komposition und Geste ohne Grenzen.',
      it: 'Sulla tela la pittura trova tutta la sua libertà — colore, composizione e gesto senza vincoli.'
    },

    // dance & art page
    'Dance & Art — Chiara Laurenza': { de: 'Tanz & Kunst — Chiara Laurenza', it: 'Danza & Arte — Chiara Laurenza' },
    'Discipline — 04': { de: 'Workshops', it: 'Workshop' },
    'Dance': { de: 'Tanz', it: 'Danza' },
    'I take a concept into the body, dance it, pause, and translate what the body felt into colour. The painting is not a trace of the movement — it is a translation of the feeling.': {
      de: 'Ich nehme ein Konzept in den Körper, tanze es, halte inne und übersetze, was der Körper gefühlt hat, in Farbe. Das Bild ist keine Spur der Bewegung — es ist eine Übersetzung des Gefühls.',
      it: 'Porto un concetto nel corpo, lo danzo, mi fermo e traduco in colore ciò che il corpo ha sentito. Il dipinto non è una traccia del movimento — è una traduzione dell’emozione.'
    },
    'Book Now': { de: 'Jetzt buchen', it: 'Prenota ora' },
    'The Process': { de: 'Der Ablauf', it: 'Il processo' },
    'Choose': { de: 'Wählen', it: 'Scegliere' },
    'Step 1': { de: 'Schritt 1', it: 'Passo 1' },
    'A concept to explore — a memory, a border, letting go.': { de: 'Ein Konzept zum Erforschen — eine Erinnerung, eine Grenze, das Loslassen.', it: 'Un concetto da esplorare — un ricordo, un confine, il lasciar andare.' },
    'Embody': { de: 'Verkörpern', it: 'Incarnare' },
    'Step 2': { de: 'Schritt 2', it: 'Passo 2' },
    'Dance the concept until the body knows it.': { de: 'Das Konzept tanzen, bis der Körper es kennt.', it: 'Danzare il concetto finché il corpo non lo conosce.' },
    'Pause': { de: 'Innehalten', it: 'Fermarsi' },
    'Step 3': { de: 'Schritt 3', it: 'Passo 3' },
    'Stay still and listen: weight, warmth, tension, space. What is left in the body?': { de: 'Still werden und hinhören: Gewicht, Wärme, Spannung, Raum. Was ist im Körper geblieben?', it: 'Restare immobili e ascoltare: peso, calore, tensione, spazio. Cosa è rimasto nel corpo?' },
    'Translate': { de: 'Übersetzen', it: 'Tradurre' },
    'Step 4': { de: 'Schritt 4', it: 'Passo 4' },
    'Colour, pressure, rhythm and density on canvas — chosen only after the dance, never before.': { de: 'Farbe, Druck, Rhythmus und Dichte auf der Leinwand — erst nach dem Tanz gewählt, nie vorher.', it: 'Colore, pressione, ritmo e densità sulla tela — scelti solo dopo la danza, mai prima.' },
    'Reflect': { de: 'Reflektieren', it: 'Riflettere' },
    'Step 5': { de: 'Schritt 5', it: 'Passo 5' },
    'What came through? What was lost on the way?': { de: 'Was ist angekommen? Was ist unterwegs verloren gegangen?', it: 'Cosa è arrivato? Cosa si è perso lungo la strada?' },
    'Series I–III': { de: 'Serie I–III', it: 'Serie I–III' },
    'What it was': { de: 'Was war', it: 'Ciò che era' },
    'Becoming': { de: 'Werden', it: 'Divenire' },
    'New Identity': { de: 'Neue Identität', it: 'Nuova identità' },
    'In progress — autumn 2026': { de: 'In Arbeit — Herbst 2026', it: 'In corso — autunno 2026' },
    'Three hours to meet the process: one concept, one dance, one canvas to take home. No dance or painting experience needed.': {
      de: 'Drei Stunden, um den Ablauf kennenzulernen: ein Konzept, ein Tanz, eine Leinwand zum Mitnehmen. Keine Tanz- oder Malerfahrung nötig.',
      it: 'Tre ore per conoscere il processo: un concetto, una danza, una tela da portare a casa. Non serve esperienza di danza o pittura.'
    },
    '3 Hours': { de: '3 Stunden', it: '3 ore' },
    'Beginners': { de: 'Einsteiger:innen', it: 'Principianti' },
    'Book Workshop': { de: 'Workshop buchen', it: 'Prenota il workshop' },
    'One concept per evening. Over four weeks you create a small series of your own paintings, grown from movement.': {
      de: 'Ein Konzept pro Abend. In vier Wochen entsteht eine kleine eigene Bilderserie, gewachsen aus Bewegung.',
      it: 'Un concetto per serata. In quattro settimane crei una piccola serie di dipinti tuoi, nati dal movimento.'
    },
    '4 Evenings': { de: '4 Abende', it: '4 serate' },
    'Small Group': { de: 'Kleine Gruppe', it: 'Piccolo gruppo' },
    'Book Series': { de: 'Serie buchen', it: 'Prenota il ciclo' },
    'Out of the head, into the body: a creative session for companies, schools and groups.': {
      de: 'Raus aus dem Kopf, rein in den Körper: eine kreative Session für Firmen, Schulen und Gruppen.',
      it: 'Fuori dalla testa, dentro il corpo: una sessione creativa per aziende, scuole e gruppi.'
    },
    'On Request': { de: 'Auf Anfrage', it: 'Su richiesta' },
    'Groups': { de: 'Gruppen', it: 'Gruppi' },
    'Enquire': { de: 'Anfragen', it: 'Richiedi informazioni' },

    // blog
    'Blog — Chiara Laurenza': { de: 'Blog — Chiara Laurenza', it: 'Blog — Chiara Laurenza' },
    'Journal': { de: 'Tagebuch', it: 'Diario' },
    'Notes from the studio — what I dance, what I paint, and what happens in between.': {
      de: 'Notizen aus dem Atelier — was ich tanze, was ich male und was dazwischen passiert.',
      it: 'Appunti dallo studio — cosa danzo, cosa dipingo e cosa succede nel mezzo.'
    },
    'Subscribe': { de: 'Abonnieren', it: 'Iscriviti' },
    'September 2026': { de: 'September 2026', it: 'Settembre 2026' },
    'New post,': { de: 'Neuer Beitrag,', it: 'Nuovo post,' },
    'straight to you.': { de: 'direkt zu dir.', it: 'direttamente a te.' },
    'One email each time I publish something new — new paintings, workshop dates, thoughts from the studio. No spam, unsubscribe anytime.': {
      de: 'Eine E-Mail, wann immer ich etwas Neues veröffentliche — neue Bilder, Workshop-Termine, Gedanken aus dem Atelier. Kein Spam, jederzeit abbestellbar.',
      it: 'Una email ogni volta che pubblico qualcosa di nuovo — nuovi dipinti, date dei workshop, pensieri dallo studio. Niente spam, disiscrizione in qualsiasi momento.'
    },
    'Email address': { de: 'E-Mail-Adresse', it: 'Indirizzo email' },
    'Coming soon — the newsletter is not connected yet.': { de: 'Bald verfügbar — der Newsletter ist noch nicht verbunden.', it: 'In arrivo — la newsletter non è ancora attiva.' },
    'Blog — September 2026': { de: 'Blog — September 2026', it: 'Blog — Settembre 2026' },
    'Handwritten in my journal.': { de: 'Handgeschrieben in meinem Tagebuch.', it: 'Scritto a mano nel mio diario.' },
    'Photo of page 1': { de: 'Foto von Seite 1', it: 'Foto della pagina 1' },
    'All posts': { de: 'Alle Beiträge', it: 'Tutti i post' },
    'Sending…': { de: 'Wird gesendet …', it: 'Invio in corso…' },
    'Something went wrong — please try again.': { de: 'Etwas ist schiefgelaufen — bitte versuch es noch einmal.', it: 'Qualcosa è andato storto — riprova.' }
  };

  var LANGS = ['en', 'de', 'it'];
  var originals = new WeakMap();
  var attrOriginals = new WeakMap();

  function norm(s) { return s.replace(/\s+/g, ' ').trim(); }

  function tr(en, lang) {
    if (lang === 'en') return en;
    var e = T[en];
    return (e && e[lang]) || en;
  }
  window.t = function (en) { return tr(en, currentLang()); };

  function currentLang() {
    return document.documentElement.getAttribute('data-lang') || 'en';
  }

  function apply(lang) {
    document.documentElement.setAttribute('data-lang', lang);
    document.documentElement.lang = lang;

    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        var p = n.parentNode && n.parentNode.nodeName;
        return (p === 'SCRIPT' || p === 'STYLE') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
      }
    });
    var node;
    while ((node = walker.nextNode())) {
      if (!originals.has(node)) {
        var key = norm(node.nodeValue);
        if (!key || !T[key]) continue;
        originals.set(node, { key: key, raw: node.nodeValue });
      }
      var o = originals.get(node);
      node.nodeValue = lang === 'en' ? o.raw : o.raw.replace(/\S[\s\S]*\S|\S/, tr(o.key, lang));
    }

    document.querySelectorAll('[placeholder],[aria-label]').forEach(function (el) {
      if (!attrOriginals.has(el)) {
        attrOriginals.set(el, { placeholder: el.getAttribute('placeholder'), aria: el.getAttribute('aria-label') });
      }
      var a = attrOriginals.get(el);
      if (a.placeholder) el.setAttribute('placeholder', tr(a.placeholder, lang));
      if (a.aria) el.setAttribute('aria-label', tr(a.aria, lang));
    });

    if (!document.documentElement.hasAttribute('data-title-en')) {
      document.documentElement.setAttribute('data-title-en', norm(document.title));
    }
    document.title = tr(document.documentElement.getAttribute('data-title-en'), lang);

    document.querySelectorAll('.lang-switch button').forEach(function (b) {
      b.classList.toggle('active', b.getAttribute('data-lang') === lang);
      b.setAttribute('aria-pressed', b.getAttribute('data-lang') === lang);
    });
  }

  function saved() {
    try { return localStorage.getItem('lang'); } catch (e) { return null; }
  }
  function save(lang) {
    try { localStorage.setItem('lang', lang); } catch (e) {}
  }

  function initial() {
    var s = saved();
    if (LANGS.indexOf(s) >= 0) return s;
    var b = (navigator.language || 'en').slice(0, 2).toLowerCase();
    return LANGS.indexOf(b) >= 0 ? b : 'en';
  }

  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('.lang-switch button');
    if (!b) return;
    var lang = b.getAttribute('data-lang');
    save(lang);
    apply(lang);
  });

  function start() { apply(initial()); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
