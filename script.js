let current = 0;
const img = document.getElementById('slideImage');
const title = document.getElementById('slideTitle');
const subtitle = document.getElementById('slideSubtitle');
const dots = document.getElementById('dots');

async function init(){
  await loadConfig();
  document.getElementById('claim').innerHTML = CONFIG.claim.replace('sorriso','<span>sorriso</span>').replace('passione','<span>passione</span>');
  document.getElementById('city').textContent = CONFIG.citta;
  setWeatherFallback();
  loadWeather();
  document.getElementById('services').innerHTML = CONFIG.servizi.map(s=>`<div class="service"><div class="serviceIcon">${s.icona}</div><div class="serviceText"><strong>${s.titolo}</strong><p>${s.testo}</p></div></div>`).join('');
  setNews(CONFIG.notizie);
  loadAnsaNews();
  document.getElementById('tickerText').textContent = CONFIG.comunicazioni.join('     |     ');
  document.getElementById('tickerText').style.animationDuration = (CONFIG.durataTickerSecondi || 38) + 's';
  if (CONFIG.comunicazioneBox) {
    const ct = document.getElementById('commBoxTitle');
    const cx = document.getElementById('commBoxText');
    if (ct) ct.textContent = CONFIG.comunicazioneBox.titolo || '';
    if (cx) cx.textContent = CONFIG.comunicazioneBox.testo || '';
  }
  dots.innerHTML = CONFIG.foto.map((_,i)=>`<span class="dot ${i===0?'active':''}"></span>`).join('');
  showSlide(0);
  updateClock(); setInterval(updateClock, 1000);
  setInterval(()=>showSlide((current+1)%CONFIG.foto.length), CONFIG.durataSlideSecondi*1000);
  if (CONFIG.meteoAutomatico) setInterval(loadWeather, 30 * 60 * 1000);
  if (CONFIG.notizieAutomatiche) setInterval(loadAnsaNews, (CONFIG.aggiornaNotizieMinuti || 30) * 60 * 1000);
}

function showSlide(i){
  current=i; const s=CONFIG.foto[i];
  img.style.opacity=0;
  setTimeout(()=>{
    img.src=s.file;
    img.style.objectPosition = s.posizione || 'center center';
    img.style.objectFit = s.zoom || 'cover';
    title.textContent=s.titolo;
    subtitle.textContent=s.sottotitolo;
    img.style.opacity=1;
  },250);
  [...dots.children].forEach((d,idx)=>d.classList.toggle('active',idx===i));
}

function updateClock(){
  const now=new Date();
  document.getElementById('time').textContent=now.toLocaleTimeString('it-IT',{hour:'2-digit',minute:'2-digit'});
  const wd=now.toLocaleDateString('it-IT',{weekday:'long'}).toUpperCase();
  const day=now.toLocaleDateString('it-IT',{day:'2-digit',month:'long',year:'numeric'}).toUpperCase();
  document.getElementById('date').innerHTML=`<span class="dateText">${wd}<br>${day}</span>`;
}

function setWeatherFallback(){
  document.getElementById('temp').textContent = CONFIG.meteoManuale.temperatura;
  document.getElementById('minmax').textContent = CONFIG.meteoManuale.minmax;
  document.getElementById('desc').textContent = CONFIG.meteoManuale.descrizione;
}

async function loadWeather(){
  if (!CONFIG.meteoAutomatico) return;
  try {
    const lat = CONFIG.meteoCoordinate.latitudine;
    const lon = CONFIG.meteoCoordinate.longitudine;
    const tz = encodeURIComponent(CONFIG.meteoCoordinate.timezone || 'Europe/Rome');
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min&timezone=${tz}&forecast_days=1`;
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error('meteo non disponibile');
    const data = await res.json();
    const temp = Math.round(data.current.temperature_2m);
    const max = Math.round(data.daily.temperature_2m_max[0]);
    const min = Math.round(data.daily.temperature_2m_min[0]);
    const code = data.current.weather_code;
    document.getElementById('temp').textContent = `${temp}°C`;
    document.getElementById('minmax').textContent = `${max}°C / ${min}°C`;
    document.getElementById('desc').textContent = weatherDescription(code);
    const icon = document.querySelector('.weatherIcon');
    if (icon) icon.textContent = weatherIcon(code);
  } catch (e) {
    console.warn('Meteo automatico non disponibile, uso fallback manuale.', e);
    setWeatherFallback();
  }
}

function weatherIcon(code){
  if ([0].includes(code)) return '☀️';
  if ([1,2].includes(code)) return '🌤️';
  if ([3].includes(code)) return '☁️';
  if ([45,48].includes(code)) return '🌫️';
  if ([51,53,55,56,57,61,63,65,66,67,80,81,82].includes(code)) return '🌧️';
  if ([71,73,75,77,85,86].includes(code)) return '❄️';
  if ([95,96,99].includes(code)) return '⛈️';
  return '⛅';
}

function weatherDescription(code){
  const map = {
    0:'Sereno', 1:'Prevalentemente sereno', 2:'Parzialmente nuvoloso', 3:'Nuvoloso',
    45:'Nebbia', 48:'Nebbia', 51:'Pioviggine leggera', 53:'Pioviggine', 55:'Pioviggine intensa',
    56:'Pioggia gelata leggera', 57:'Pioggia gelata', 61:'Pioggia leggera', 63:'Pioggia', 65:'Pioggia intensa',
    66:'Pioggia gelata leggera', 67:'Pioggia gelata', 71:'Neve leggera', 73:'Neve', 75:'Neve intensa',
    77:'Nevischio', 80:'Rovesci leggeri', 81:'Rovesci', 82:'Rovesci intensi',
    85:'Nevicate leggere', 86:'Nevicate intense', 95:'Temporale', 96:'Temporale con grandine', 99:'Temporale intenso'
  };
  return map[code] || 'Variabile';
}

function setNews(news){
  document.getElementById('newsItems').innerHTML = news.map(n=>`<div class="newsItem"><span class="ora">${n.ora || ''}</span><strong>${escapeHtml(n.titolo || '')}</strong><span>${escapeHtml(n.testo || '')}</span></div>`).join('');
}

async function loadAnsaNews(){
  if (!CONFIG.notizieAutomatiche) return;
  const feed = encodeURIComponent(CONFIG.ansaFeedUrl || 'https://www.ansa.it/sito/ansait_rss.xml');
  const urls = [
    `https://api.rss2json.com/v1/api.json?rss_url=${feed}`,
    `https://api.allorigins.win/raw?url=${feed}`
  ];
  for (const url of urls){
    try{
      const res = await fetch(url, { cache: 'no-store' });
      if (!res.ok) throw new Error('feed non disponibile');
      const text = await res.text();
      const items = url.includes('rss2json') ? parseRss2Json(text) : parseRssXml(text);
      if (items.length){
        setNews(items.slice(0, CONFIG.numeroNotizie || 3));
        return;
      }
    }catch(e){
      console.warn('Fonte news non disponibile:', url, e);
    }
  }
  setNews(CONFIG.notizie);
}

function parseRss2Json(text){
  const json = JSON.parse(text);
  if (!json.items) return [];
  return json.items.map(item => ({
    ora: formatNewsTime(item.pubDate),
    titolo: cleanText(item.title),
    testo: cleanText(item.description || '')
  }));
}

function parseRssXml(text){
  const doc = new DOMParser().parseFromString(text, 'text/xml');
  return [...doc.querySelectorAll('item')].map(item => ({
    ora: formatNewsTime(item.querySelector('pubDate')?.textContent),
    titolo: cleanText(item.querySelector('title')?.textContent || ''),
    testo: cleanText(item.querySelector('description')?.textContent || '')
  }));
}

function formatNewsTime(dateText){
  if (!dateText) return '';
  const d = new Date(dateText);
  if (isNaN(d)) return '';
  return d.toLocaleTimeString('it-IT', { hour:'2-digit', minute:'2-digit' });
}

function cleanText(str){
  return (str || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 110);
}

function escapeHtml(str){
  return (str || '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
}


async function loadConfig(){
  return CONFIG;
}

window.addEventListener('load',init);
