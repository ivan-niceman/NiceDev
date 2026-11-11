import type { ImageMetadata } from 'astro';

// Template image assets from src/assets/images/templates/
import templateD1 from '../assets/images/templates/template-d-1.webp';
import templateM1 from '../assets/images/templates/template-m-1.webp';
import templateD2 from '../assets/images/templates/template-d-2.webp';
import templateM2 from '../assets/images/templates/template-m-2.webp';
import templateD3 from '../assets/images/templates/template-d-3.webp';
import templateM3 from '../assets/images/templates/template-m-3.webp';
import templateD4 from '../assets/images/templates/template-d-4.webp';
import templateM4 from '../assets/images/templates/template-m-4.webp';

export interface WebsiteTemplate {
  id: string;
  domain: string;
  url?: string;
  desktopImg: ImageMetadata | string;
  mobileImg: ImageMetadata | string;
  title: {
    ru: string;
    en: string;
  };
  description?: {
    ru: string;
    en: string;
  };
}

export const websiteTemplates: WebsiteTemplate[] = [
  {
    id: 'template-1',
    domain: 'template-1',
    url: 'https://template-1-nine-eta.vercel.app/',
    desktopImg: templateD1,
    mobileImg: templateM1,
    title: {
      ru: '1. Яркий',
      en: '1. Vibrant'
    },
    description: {
      ru: 'Сочный, интересный дизайн, понятная структура. Этот сайт отличается дружелюбным, слегка неформальным текстовым оформлением. Идеально подойдет тем, чьи туристы - молодежь или просто веселые люди!',
      en: 'Vibrant, engaging design with an intuitive layout. Features friendly, approachable copywriting. Ideal for agencies targeting youth, active travelers, or vibrant adventures!'
    }
  },
  {
    id: 'template-2',
    domain: 'template-2',
    url: 'https://template-2-lac.vercel.app/',
    desktopImg: templateD2,
    mobileImg: templateM2,
    title: {
      ru: '2. Спокойный',
      en: '2. Serene'
    },
    description: {
      ru: 'Если вы предпочитаете спокойный визуал сайта, чтобы акцентом было текстовое наполнение - этот вариант для Вас! Подходит абсолютно для всех туристов.',
      en: 'If you prefer understated visual elegance with a strong focus on meaningful copy and tour details — this option is for you! Perfectly versatile for all tourist demographics.'
    }
  },
  {
    id: 'template-3',
    domain: 'template-3',
    url: 'https://template-3-inky.vercel.app/',
    desktopImg: templateD3,
    mobileImg: templateM3,
    title: {
      ru: '3. Премиум',
      en: '3. Premium'
    },
    description: {
      ru: 'Сайт, отражающий всю глубину VIP-туризма. Зайдя на сайт, ваши туристы сразу поймут уровень сервиса, оказываемый в агентстве. А вы, при этом, не потратите большие бюджеты на его разработку.',
      en: 'A luxury digital showcase capturing the essence of VIP travel. Visitors instantly recognize top-tier service, while you avoid costly custom development budgets.'
    }
  },
  {
    id: 'template-4',
    domain: 'template-4',
    url: '', // Ссылки пока нет, будет добавлена позже
    desktopImg: templateD4,
    mobileImg: templateM4,
    title: {
      ru: '4. Темный',
      en: '4. Dark'
    },
    description: {
      ru: 'Готовое решение для бизнеса в сфере туризма (турагентства, круизы, авторские туры). Сайт разработан на современных технологиях, что обеспечивает мгновенную загрузку страниц и отличную индексацию поисковиками.',
      en: 'A turnkey digital platform for travel businesses (agencies, cruises, bespoke tours). Engineered with modern web tech for instantaneous loading and premier search indexing.'
    }
  }
];
