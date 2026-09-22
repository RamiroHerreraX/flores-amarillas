import React, { useState, useEffect, useMemo } from 'react';
import './App.css';

// --- Traducciones ---
const translations = {
  es: {
    title: "Flores amarillas para el amor de mi vida.",
    p1: "Hoy te regalo flores amarillas, pero no son solo flores:\nson pedacitos de sol para decirte que tú eres mi primavera.",
    p2: "Si pudiera elegir un lugar seguro, sería a tu lado:\nel único sitio donde hasta el invierno florece.",
    p3: "Te amo.",
    counterText: "Mi amor por ti comenzó hace",
    days: "amaneceres,",
    hours: "horas de luz,",
    minutes: "minutos de cielo",
    seconds: "segundos en los que mi vida aprendió tu nombre.",
    loveYou: "— ¡Te Amo! —",
    signature: "mi invierno florece contigo."
  },
  en: {
    title: "Yellow flowers for the love of my life.",
    p1: "Today I give you yellow flowers, but they are not just flowers:\nthey are little pieces of sun to tell you that you are my spring.",
    p2: "If I could choose a safe place, it would be by your side:\nthe only place where even winter blooms.",
    p3: "I love you.",
    counterText: "My love for you started",
    days: "sunrises,",
    hours: "hours of light,",
    minutes: "minutes of sky and",
    seconds: "seconds in which my life learned your name.",
    loveYou: "— I Love You! —",
    signature: "my winter blooms with you."
  },
  fr: {
    title: "Fleurs jaunes pour l'amour de ma vie.",
    p1: "Aujourd'hui je t'offre des fleurs jaunes, mais ce ne sont pas que des fleurs :\nce sont des petits morceaux de soleil pour te dire que tu es mon printemps.",
    p2: "Si je pouvais choisir un endroit sûr, ce serait à tes côtés :\nle seul endroit où même l'hiver fleurit.",
    p3: "Je t'aime.",
    counterText: "Mon amour pour toi a commencé il y a",
    days: "levers de soleil,",
    hours: "heures de lumière,",
    minutes: "minutes de ciel et",
    seconds: "secondes où ma vie a appris ton nom.",
    loveYou: "— Je t'aime ! —",
    signature: "mon hiver fleurit avec toi."
  }
};

// --- ¡AQUÍ ESTÁ LA MAGIA! ---
// Obtenemos la ruta base configurada en vite.config.js
const BASE = import.meta.env.BASE_URL; 

// --- Componente de Flor Cayendo ---
const FallingFlower = ({ style, imageSrc }) => (
  <img 
    src={imageSrc} 
    alt="Flor Amarilla" 
    className="falling-flower" 
    style={style} 
  />
);

// --- Generador de Lluvia de Flores ---
const generateFallingFlowers = (numFlowers) => {
  // Usamos BASE para construir las rutas correctas
  const flowerImages = [
    `${BASE}FlorAmarilla.png`, 
    `${BASE}FlorAmarilla2.png`, 
    `${BASE}FlorAmarilla3.png`
  ];

  return Array.from({ length: numFlowers }).map((_, i) => {
    const size = Math.random() * 40 + 30;
    const left = Math.random() * 100;
    const duration = Math.random() * 8 + 8;
    const delay = Math.random() * 10;
    const randomImage = flowerImages[Math.floor(Math.random() * flowerImages.length)];

    return {
      id: i,
      imageSrc: randomImage,
      style: {
        left: `${left}vw`,
        width: `${size}px`,
        height: `${size}px`,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
      }
    };
  });
};

// --- Generador de Estrellas de Fondo ---
const generateStars = (numStars) => {
  return Array.from({ length: numStars }).map((_, i) => ({
    id: i,
    style: {
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 3 + 2}s`,
      animationDelay: `${Math.random() * 5}s`,
      width: `${Math.random() * 2 + 1}px`,
      height: `${Math.random() * 2 + 1}px`,
    }
  }));
};

function App() {
  const [lang, setLang] = useState('es');
  const t = translations[lang];

  // --- Lógica del Contador ---
  // Fecha de inicio: 11 de Mayo de 2018 (Formato: AAAA, MM-1, DD)
  const startDate = new Date(2018, 4, 11); 

  const [timeElapsed, setTimeElapsed] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });

  // Generamos 30 flores cayendo
  const fallingFlowers = useMemo(() => generateFallingFlowers(30), []);
  
  // Generamos 50 estrellas de fondo
  const stars = useMemo(() => generateStars(50), []);

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const diff = now - startDate;

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeElapsed({ days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [startDate]);

  return (
    <>
      {/* Fondo Mágico */}
      <div className="magic-bg">
        {stars.map(star => <div key={star.id} className="twinkling-star" style={star.style} />)}
        <div className="bg-orb orb-1"></div>
        <div className="bg-orb orb-2"></div>
        <div className="bg-orb orb-3"></div>
      </div>

      {/* Estrellas Fugaces */}
      <div className="shooting-stars">
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
      </div>

      {/* Lluvia de Flores */}
      {fallingFlowers.map((flower) => (
        <FallingFlower key={flower.id} style={flower.style} imageSrc={flower.imageSrc} />
      ))}
      
      {/* Tarjeta Principal */}
      <div className="card">
        
        {/* Botones de Idioma */}
        <div className="language-switcher">
          <button className={`lang-btn ${lang === 'es' ? 'active' : ''}`} onClick={() => setLang('es')}>ES</button>
          <button className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>EN</button>
          <button className={`lang-btn ${lang === 'fr' ? 'active' : ''}`} onClick={() => setLang('fr')}>FR</button>
        </div>

        {/* Sección de Texto */}
        <div className="text-section">
          <h1>{t.title}</h1>
          <p>{t.p1}</p>
          <p>{t.p2}</p>
          <p className="love-text">{t.p3}</p>

          <div className="counter-section">
            <p>{t.counterText}</p>
            <div className="counter-timer">
              {timeElapsed.days} {t.days} <br/>
              {String(timeElapsed.hours).padStart(2, '0')} {t.hours} <br/>
              {String(timeElapsed.minutes).padStart(2, '0')} {t.minutes} <br/>
              {lang === 'en' ? 'and ' : lang === 'fr' ? 'et ' : 'y '}{String(timeElapsed.seconds).padStart(2, '0')} {t.seconds}
            </div>
          </div>

          <p className="love-you">{t.loveYou}</p>
          <p className="signature">{t.signature}</p>
        </div>

        {/* Sección del Ramo Completo */}
        <div className="bouquet-section">
          <div className="bouquet-container">
            {/* Usamos BASE también aquí */}
            <img 
              src={`${BASE}FlorAmarillaRamoCompleto.png`} 
              alt="Ramo de Flores Amarillas Completo" 
              className="bouquet-image" 
            />
          </div>
        </div>

      </div>
    </>
  );
}

export default App;