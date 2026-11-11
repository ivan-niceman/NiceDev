import type { ImageMetadata } from 'astro';

// Portfolio Image Assets from src/assets/images/portfolio/
import dibtoursDesk from '../assets/images/portfolio/dibtours.webp';
import dibtoursMob from '../assets/images/portfolio/dibtours-m.webp';
import tourfabrikaDesk from '../assets/images/portfolio/tourfabrika.webp';
import tourfabrikaMob from '../assets/images/portfolio/tourfabrika-m.webp';
import exploraluxuryDesk from '../assets/images/portfolio/exploraluxury.webp';
import exploraluxuryMob from '../assets/images/portfolio/exploraluxury-m.webp';
import weareislandsDesk from '../assets/images/portfolio/weareislands.webp';
import weareislandsMob from '../assets/images/portfolio/weareislands-m.webp';
import goritturDesk from '../assets/images/portfolio/gorittur.ru.webp';
import goritturMob from '../assets/images/portfolio/gorittur.ru-m.webp';
import checkInTravelDesk from '../assets/images/portfolio/check-in-travel.ru.webp';
import checkInTravelMob from '../assets/images/portfolio/check-in-travel.ru-m.jpg';
import mobistravelDesk from '../assets/images/portfolio/mobistravel.webp';
import mobistravelMob from '../assets/images/portfolio/mobistravel-m.webp';
import solturDesk from '../assets/images/portfolio/soltur.webp';
import solturMob from '../assets/images/portfolio/soltur-m.webp';
import miraTurDesk from '../assets/images/portfolio/mira-tur.webp';
import miraTurMob from '../assets/images/portfolio/mira-tur-m.webp';
import rozaTourDesk from '../assets/images/portfolio/roza-tour.webp';
import rozaTourMob from '../assets/images/portfolio/roza-tour-m.webp';
import marytourDesk from '../assets/images/portfolio/marytour.webp';
import marytourMob from '../assets/images/portfolio/marytour-m.webp';
import staliDesk from '../assets/images/portfolio/stali.webp';
import staliMob from '../assets/images/portfolio/stali-m.webp';

export interface PortfolioProject {
  domain: string;
  url?: string;
  desktopImg: ImageMetadata | string;
  mobileImg: ImageMetadata | string;
  title: {
    ru: string;
    en: string;
  };
}

export const portfolioProjects: PortfolioProject[] = [
  {
    domain: 'dibtours.ru',
    url: 'https://dibtours.ru',
    desktopImg: dibtoursDesk,
    mobileImg: dibtoursMob,
    title: {
      ru: 'DIB Tours — Международный туризм',
      en: 'DIB Tours — Global Travel Portal'
    }
  },
  {
    domain: 'tourfabrika.ru',
    url: 'https://tourfabrika.ru',
    desktopImg: tourfabrikaDesk,
    mobileImg: tourfabrikaMob,
    title: {
      ru: 'ТурФабрика — Авторские путешествия',
      en: 'TourFabrika — Bespoke Expeditions'
    }
  },
  {
    domain: 'exploraluxury.com',
    desktopImg: exploraluxuryDesk,
    mobileImg: exploraluxuryMob,
    title: {
      ru: 'Explora Luxury — Премиальный тревел-клуб',
      en: 'Explora Luxury — Elite Travel Club'
    }
  },
  {
    domain: 'weareislands.com',
    url: 'https://weareislands.com',
    desktopImg: weareislandsDesk,
    mobileImg: weareislandsMob,
    title: {
      ru: 'We Are Islands — Островной отдых и виллы',
      en: 'We Are Islands — Island Resorts & Villas'
    }
  },
  {
    domain: 'gorittur.ru',
    url: 'https://gorittur.ru',
    desktopImg: goritturDesk,
    mobileImg: goritturMob,
    title: {
      ru: 'ГоритТур — Сервис горящих предложений',
      en: 'GoritTur — Last-Minute Travel Deals'
    }
  },
  {
    domain: 'check-in-travel.ru',
    url: 'https://check-in-travel.ru',
    desktopImg: checkInTravelDesk,
    mobileImg: checkInTravelMob,
    title: {
      ru: 'Check-In Travel — Индивидуальные туры',
      en: 'Check-In Travel — Tailored Itineraries'
    }
  },
  {
    domain: 'mobistravel.com',
    desktopImg: mobistravelDesk,
    mobileImg: mobistravelMob,
    title: {
      ru: 'Mobis Travel — Мобильная система бронирования',
      en: 'Mobis Travel — Smart Booking System'
    }
  },
  {
    domain: 'soltur.ru',
    desktopImg: solturDesk,
    mobileImg: solturMob,
    title: {
      ru: 'СолТур — Семейный и пляжный отдых',
      en: 'SolTur — Family & Beach Vacations'
    }
  },
  {
    domain: 'mira-tur.ru',
    url: 'https://mira-tur.ru',
    desktopImg: miraTurDesk,
    mobileImg: miraTurMob,
    title: {
      ru: 'Мира-Тур — Экскурсии и круизы',
      en: 'Mira-Tur — Excursions & Cruises'
    }
  },
  {
    domain: 'roza-tour.ru',
    url: 'https://roza-tour.ru',
    desktopImg: rozaTourDesk,
    mobileImg: rozaTourMob,
    title: {
      ru: 'Роза-Тур — Горные туры и глэмпинги',
      en: 'Roza-Tour — Mountain & Eco Escapes'
    }
  },
  {
    domain: 'marytour.ru',
    desktopImg: marytourDesk,
    mobileImg: marytourMob,
    title: {
      ru: 'MaryTour — Бутик индивидуальных туров',
      en: 'MaryTour — Boutique Travel Concierge'
    }
  },
  {
    domain: 'stali.ru',
    url: 'https://stali.ru',
    desktopImg: staliDesk,
    mobileImg: staliMob,
    title: {
      ru: 'Stali — Корпоративный портал и сервисы',
      en: 'Stali — Enterprise Digital Platform'
    }
  }
];
