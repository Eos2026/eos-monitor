// CONFIGURAZIONE EOS MONITOR v2 + meteo e notizie automatiche
// Per modificare contenuti: cambia solo questo file.

const CONFIG = {
  citta: "Camaiore",
  studio: "EOS Odontoiatria Medicina Estetica",
  claim: "Il tuo sorriso, la nostra passione.",

  // METEO AUTOMATICO
  // Per cambiare città: inserisci latitudine/longitudine corrette e il nome città.
  // Esempio Lovere (BG): latitudine 45.8119, longitudine 10.0698
  meteoAutomatico: true,
  meteoCoordinate: {
    latitudine: 43.9427,
    longitudine: 110.2978,
    timezone: "Europe/Rome"
  },

  // Se Internet non funziona o il meteo automatico non risponde, resta questo fallback.
  meteoManuale: {
    temperatura: "18°C",
    minmax: "21°C / 13°C",
    descrizione: "Parzialmente nuvoloso"
  },

  // NOTIZIE AUTOMATICHE ANSA
  // Se non vuoi le notizie automatiche, metti: notizieAutomatiche: false
  notizieAutomatiche: true,
  ansaFeedUrl: "https://www.ansa.it/sito/ansait_rss.xml",
  numeroNotizie: 3,
  aggiornaNotizieMinuti: 30,

  foto: [
    { file: "assets/foto/desk-sala-attesa.jpg", titolo: "Benvenuti in EOS", sottotitolo: "Accoglienza, cura e attenzione per ogni paziente", posizione: "left center", zoom: "contain" },
    { file: "assets/foto/zona-bimbi.jpg", titolo: "Zona bimbi", sottotitolo: "Uno spazio pensato per i più piccoli", posizione: "center center", zoom: "contain" },
    { file: "assets/foto/giardino-ingresso.jpg", titolo: "Ingresso e giardino", sottotitolo: "Un ambiente sereno fin dal primo passo", posizione: "center center", zoom: "cover" },
    { file: "assets/foto/stanza-bimbi-1.jpg", titolo: "Odontoiatria pediatrica", sottotitolo: "Cure dedicate ai bambini in un ambiente colorato", posizione: "center center", zoom: "contain" },
    { file: "assets/foto/stanza-bimbi-2.jpg", titolo: "Tecnologia e comfort", sottotitolo: "Ambienti moderni per trattamenti su misura", posizione: "center center", zoom: "contain" },
    { file: "assets/foto/sterilizzazione.jpg", titolo: "Sterilizzazione", sottotitolo: "Sicurezza, igiene e protocolli controllati", posizione: "center center", zoom: "contain" }
  ],

  servizi: [
    { titolo: "Odontoiatria", testo: "Tecnologia e competenza per la tua salute orale", icona: "🦷" },
    { titolo: "Medicina estetica", testo: "Armonia e benessere per valorizzare la tua bellezza", icona: "✨" },
    { titolo: "Prenditi cura di te", testo: "Ascolto, attenzione e percorsi su misura", icona: "♡" }
  ],

  // Notizie di riserva: compaiono se ANSA non è raggiungibile.
  notizie: [
    { ora: "", titolo: "Igiene orale", testo: "3 consigli utili per la tua routine quotidiana" },
    { ora: "", titolo: "Prevenzione", testo: "Controlli regolari per un sorriso sano tutto l'anno" },
    { ora: "", titolo: "Salute orale", testo: "Piccoli gesti quotidiani, grandi benefici" }
  ],

  comunicazioni: [
    "Prenota online: chiedi informazioni allo staff.",
    "La prevenzione è il nostro impegno quotidiano.",
    "Ci prendiamo cura del tuo sorriso, ogni giorno."
  ],

  durataSlideSecondi: 7,

  // Velocità barra comunicazioni: più alto = più lento
  durataTickerSecondi: 38
};
