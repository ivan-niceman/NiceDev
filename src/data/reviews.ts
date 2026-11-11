import type { ImageMetadata } from 'astro';

import goritturLogo from '../assets/images/reviews/gorittur.png';
import checkInLogo from '../assets/images/reviews/check-in-travel.svg';
import merytourLogo from '../assets/images/reviews/merytour.png';
import miraTurLogo from '../assets/images/reviews/mira-tur.svg';
import rozatourLogo from '../assets/images/reviews/rozatour.svg';
import mobistravelLogo from '../assets/images/reviews/mobistravel.svg';

export interface ClientReview {
  name: string;
  website: string;
  websiteUrl: string;
  logo: ImageMetadata | string;
  date: string;
  dateTime: string;
  link: string;
  rating: number;
  description: string;
}

export const clientReviews: ClientReview[] = [
  {
    name: 'Игорь',
    website: 'gorittur.ru',
    websiteUrl: 'https://gorittur.ru',
    logo: goritturLogo,
    date: '10.06.2026',
    dateTime: '2026-06-10',
    link: 'https://vk.com/reviews-225101044',
    rating: 5,
    description: 'Заказывали сайт Горячая Путевочка под ключ — результатом абсолютно довольны! Ребята не просто сделали «шаблонку», а проработали структуру так, как мы сами даже не додумались. Очень понравился дизайн: современный, не перегруженный, аккуратно обыграли нашу фирменную цветовую гамму. Отдельное спасибо за скорость и связь: все правки вносили оперативно, а сложные моменты объясняли простым языком.',
  },
  {
    name: 'Кристина',
    website: 'check-in-travel.ru',
    websiteUrl: 'https://check-in-travel.ru',
    logo: checkInLogo,
    date: '05.03.2025',
    dateTime: '2025-03-05',
    link: 'https://vk.com/reviews-225101044',
    rating: 5,
    description: 'Заказывала у ребят разработку сайта для своего туристического агентства: Наталья и Иван учли все пожелания, оперативно реагировали на все просьбы, уложились строго в обозначенные сроки, сайт получился очень стильным, легким и информативным! Однозначно рекомендую web-студию для разработки индивидуального сайта!',
  },
  {
    name: 'Ольга',
    website: 'merytour.ru',
    websiteUrl: 'https://merytour.ru',
    logo: merytourLogo,
    date: '02.04.2024',
    dateTime: '2024-04-02',
    link: 'https://vk.com/nicedevwebstudio?z=photo-225101044_457239057%2Falbum-225101044_00%2Frev',
    rating: 5,
    description: '1. Каковы были ваши общие впечатления от сотрудничества с нашей веб-студией? — Только положительные!\n2. Какой сайт вы получили в итоге? — Работающий, и отвечающий всем моим желаниям.\n3. Как бы вы оценили качество работы наших специалистов? — Очень высоко! Всегда на связи!',
  },
  {
    name: 'Снежана',
    website: 'mira-tur.ru',
    websiteUrl: 'https://mira-tur.ru',
    logo: miraTurLogo,
    date: '28.03.2024',
    dateTime: '2024-03-28',
    link: 'https://vk.com/nicedevwebstudio?z=photo-225101044_457239052%2Falbum-225101044_00%2Frev',
    rating: 5,
    description: '1. Каковы были ваши общие впечатления от сотрудничества с нашей веб-студией? — Очень приятные впечатления. Терпеливо объясняли, рассказывали, отвечали на вопросы.',
  },
  {
    name: 'Инна',
    website: 'roza-tour.ru',
    websiteUrl: 'https://roza-tour.ru',
    logo: rozatourLogo,
    date: '26.03.2024',
    dateTime: '2024-03-26',
    link: 'https://vk.com/wall-225101044_13?z=photo-225101044_457239050%2Falbum-225101044_00%2Frev',
    rating: 5,
    description: '1. Каковы были ваши общие впечатления от сотрудничества с нашей веб-студией? — Всё на очень высоком уровне: от момента запроса до окончания работы всегда на связи. При создании сайта все пожелания учтены. Впечатления от сотрудничества только положительные.',
  },
  {
    name: 'Мария',
    website: 'mobistravel.ru',
    websiteUrl: 'https://mobistravel.ru',
    logo: mobistravelLogo,
    date: '22.03.2024',
    dateTime: '2024-03-22',
    link: 'https://vk.com/nicedevwebstudio?w=wall-225101044_9%2Fall',
    rating: 5,
    description: '1. Каковы были ваши общие впечатления от сотрудничества с нашей веб-студией? — Все чудесно. Быстро, легко.\n2. Какой сайт вы получили в итоге? — Полностью отвечающий всем поставленным задачам.\n3. Как бы вы оценили качество работы наших специалистов? — На 10 из 5ти.',
  },
];
