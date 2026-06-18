EOS MONITOR v2 + METEO E NOTIZIE AUTOMATICHE

Questa versione mantiene il layout grafico della EOS Monitor v2 originale.
Sono stati aggiunti:
- meteo automatico tramite Open-Meteo
- notizie automatiche tramite feed RSS ANSA

COME APRIRE
1. Apri index.html con Google Chrome.
2. Premi F11 per schermo intero.
3. Per le Smart TV LG, carica la cartella online e apri il link dal Browser Web della TV.

IMPORTANTE
Meteo e notizie automatiche funzionano solo se il monitor/TV ha Internet.
Se Internet non funziona, il progetto mostra i valori manuali presenti in config.js.

FILE DA MODIFICARE
Modifica solo config.js.

CAMBIARE CITTA METEO
Nel file config.js modifica:

citta: "L'Aquila"

meteoCoordinate: {
  latitudine: 42.3498,
  longitudine: 13.3995,
  timezone: "Europe/Rome"
}

Esempio per Lovere (BG):

citta: "Lovere"
meteoCoordinate: {
  latitudine: 45.8119,
  longitudine: 10.0698,
  timezone: "Europe/Rome"
}

DISATTIVARE METEO AUTOMATICO
meteoAutomatico: false

DISATTIVARE NOTIZIE AUTOMATICHE
notizieAutomatiche: false

CAMBIARE FOTO
Metti la nuova foto nella cartella assets/foto e aggiorna il nome nel file config.js.

Esempio:
{ file: "assets/foto/nuova-foto.jpg", titolo: "Titolo", sottotitolo: "Descrizione", posizione: "center center", zoom: "contain" }

ZOOM FOTO
zoom: "cover"   = riempie tutto lo spazio ma può tagliare i bordi.
zoom: "contain" = mostra tutta la foto, senza tagli.

POSIZIONE FOTO
posizione: "center center"
posizione: "left center"
posizione: "right center"
posizione: "center top"
posizione: "center bottom"

CAMBIARE TEMPO SLIDE
durataSlideSecondi: 7

CAMBIARE VELOCITA BARRA SCORREVOLE
durataTickerSecondi: 38
