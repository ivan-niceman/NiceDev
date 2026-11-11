import { translations, type SupportedLanguage } from './translations';
import { portfolioProjects } from '../data/portfolio';
import { websiteTemplates } from '../data/templates';
import { clientReviews } from '../data/reviews';

// Declare global window functions and state
declare global {
  interface Window {
    setClientLanguage: (lang: SupportedLanguage) => void;
    currentClientLanguage: SupportedLanguage;
  }
}

export function applyClientTranslations(lang: SupportedLanguage) {
  const isRu = lang === 'ru';
  const t = translations[lang];
  window.currentClientLanguage = lang;

  // 1. Root & Storage
  document.documentElement.setAttribute('lang', lang);
  try {
    localStorage.setItem('nicedev-language-preference', lang);
  } catch {}

  // 2. Page Meta & Title
  const path = window.location.pathname;
  const isPortfolioPage = path.includes('/portfolio');
  const isTourismPage = path.includes('/templates') || path.includes('/templates');
  const isPrivacyPage = path.includes('/privacy-policy');
  const isConsentPage = path.includes('/personal-data-consent');

  if (isPrivacyPage) {
    document.title = isRu
      ? 'Политика конфиденциальности | NiceDev Web Studio'
      : 'Privacy Policy | NiceDev Web Studio';
  } else if (isConsentPage) {
    document.title = isRu
      ? 'Согласие на обработку персональных данных | NiceDev Web Studio'
      : 'Personal Data Processing Consent | NiceDev Web Studio';
  } else if (isPortfolioPage) {
    document.title = isRu
      ? 'Портфолио проектов | NiceDev — Примеры сайтов с десктопной и мобильной версией'
      : 'Project Portfolio | NiceDev — Desktop & Mobile Web Showcase';
  } else if (isTourismPage) {
    document.title = isRu
      ? 'Готовые шаблоны сайтов под ключ | NiceDev Web Studio'
      : 'Turnkey Website Templates | NiceDev Web Studio';
  } else {
    document.title = isRu
      ? 'NiceDev — Студия премиальной веб-разработки | Создание сайтов под ключ'
      : 'NiceDev — Bespoke Web Development Studio | Turnkey Websites & Branding';
  }

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    let descContent = '';
    if (isPrivacyPage) {
      descContent = isRu
        ? 'Политика в отношении обработки и защиты персональных данных пользователей студии NiceDev. Требования Федерального закона № 152-ФЗ и международные стандарты защиты информации на 15 сентября 2026 г.'
        : 'Privacy policy regarding the processing and protection of personal data at NiceDev Web Studio in compliance with Federal Law No. 152-FZ and GDPR international standards.';
    } else if (isConsentPage) {
      descContent = isRu
        ? 'Форма и условия предоставления согласия на обработку персональных данных в соответствии с требованиями Федерального закона № 152-ФЗ на 15 сентября 2026 г.'
        : 'Terms and conditions for granting consent to personal data processing with NiceDev Web Studio in compliance with Federal Law No. 152-FZ and GDPR standards.';
    } else if (isPortfolioPage) {
      descContent = isRu
        ? 'Галерея выполненных проектов веб-студии NiceDev: скоростные сайты для туризма, корпоративные порталы, авторские сервисы. Живая демонстрация адаптивности для компьютеров и смартфонов.'
        : 'Explore flagship websites crafted by NiceDev Web Studio: high-speed travel portals, corporate platforms, and boutique e-commerce. Live animated desktop and mobile previews.';
    } else if (isTourismPage) {
      descContent = isRu
        ? 'Каталог готовых шаблонов сайтов под ключ от 15 000 рублей. Уникальный дизайн, высокая скорость загрузки, адаптивность и интеграция модулей бронирования.'
        : 'Curated collection of turnkey website templates starting from 15 000 ₽. Bespoke design, high-speed performance, and mobile optimization.';
    } else {
      descContent = isRu
        ? 'Студия веб-разработки NiceDev: создаем сайты под ключ, разрабатываем авторский дизайн, логотипы и брендбуки. Специализация на скоростных порталах и решениях для туризма. Быстрый расчет сметы!'
        : 'NiceDev Web Studio: custom turnkey website development, high-end branding, logos, and brand books. Specialized in ultra-fast travel platforms and enterprise web solutions.';
    }
    metaDesc.setAttribute('content', descContent);
  }

  // 3. Header & Navigation Links
  const navMap: Record<string, { text: string; href: string }> = {
    services: { text: t.nav.services, href: '/#services' },
    templates: { text: t.nav.templates, href: '/templates' },
    'geo-speed': { text: t.nav.geoSpeed, href: '/#geo-speed' },
    portfolio: { text: t.nav.portfolio, href: '/portfolio' },
    reviews: { text: t.nav.reviews, href: '/#reviews' },
    calculator: { text: t.nav.calculator, href: '/#calculator' },
    faq: { text: t.nav.faq, href: '/#faq' },
    contact: { text: t.nav.contact, href: '/#contact' }
  };

  document.querySelectorAll<HTMLAnchorElement>('[data-nav-id]').forEach((link) => {
    const navId = link.getAttribute('data-nav-id');
    if (navId && navMap[navId]) {
      const item = navMap[navId];
      link.setAttribute('href', item.href);
      const span = link.querySelector('span');
      if (span) {
        span.textContent = item.text;
      } else {
        link.childNodes.forEach((node) => {
          if (node.nodeType === Node.TEXT_NODE && node.nodeValue?.trim()) {
            node.nodeValue = item.text;
          }
        });
      }
    }
  });

  // Update logo brand links across header and drawer
  document.querySelectorAll<HTMLAnchorElement>('.logo, .logo-link, .header__brand-group a:first-child').forEach((logoLink) => {
    logoLink.setAttribute('href', '/');
  });

  const headerCta = document.querySelector('#header-cta-btn span');
  if (headerCta) headerCta.textContent = t.nav.discussProject;

  const drawerCta = document.querySelector('#drawer-cta-btn span');
  if (drawerCta) drawerCta.textContent = t.nav.discussProject;

  const menuToggleText = document.querySelector('.menu-toggle__text');
  if (menuToggleText) menuToggleText.textContent = t.nav.menu;

  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  if (mobileMenuBtn) {
    mobileMenuBtn.setAttribute('title', t.nav.menu);
    mobileMenuBtn.setAttribute('aria-label', isRu ? 'Открыть меню навигации' : 'Open navigation menu');
  }

  // 4. Hero Section
  const heroTag = document.querySelector('.hero__tag span:last-child');
  if (heroTag) heroTag.textContent = t.hero.tag;

  const heroHeading = document.getElementById('hero-heading');
  if (heroHeading) {
  const accentEl = heroHeading.querySelector('.hero__title-accent');
  if (accentEl) {
    accentEl.textContent = t.hero.titleAccent;
    const firstNode = heroHeading.childNodes[0];
    if (firstNode && firstNode.nodeType === Node.TEXT_NODE) {
      firstNode.nodeValue = `${t.hero.titleLine1} `;
    }
  } else {
    heroHeading.innerHTML = `${t.hero.titleLine1} <br /><span class="hero__title-accent">${t.hero.titleAccent}</span>`;
  }
}

  const heroDesc = document.querySelector('.hero__desc');
  if (heroDesc) heroDesc.textContent = t.hero.description;

  const heroPrimaryCta = document.querySelector('#hero-primary-cta span');
  if (heroPrimaryCta) heroPrimaryCta.textContent = t.hero.orderDev;

  const heroSecondaryCta = document.querySelector('#hero-secondary-cta span');
  if (heroSecondaryCta) heroSecondaryCta.textContent = t.hero.viewPortfolio;

  const heroStats = document.querySelectorAll('.hero__stats .stat-item');
  if (heroStats.length >= 3) {
    // Stat 1
    const v1 = heroStats[0].querySelector('.stat-item__value');
    const l1 = heroStats[0].querySelector('.stat-item__label');
    if (v1) v1.innerHTML = `${t.hero.stat1Value}<span class="stat-item__value-accent">${t.hero.stat1Unit}</span>`;
    if (l1) l1.textContent = t.hero.stat1Label;

    // Stat 2
    const v2 = heroStats[1].querySelector('.stat-item__value');
    const l2 = heroStats[1].querySelector('.stat-item__label');
    if (v2) v2.innerHTML = `${t.hero.stat2Value}<span class="stat-item__value-accent">${t.hero.stat2Unit}</span>`;
    if (l2) l2.textContent = t.hero.stat2Label;

    // Stat 3
    const v3 = heroStats[2].querySelector('.stat-item__value');
    const l3 = heroStats[2].querySelector('.stat-item__label');
    if (v3) v3.innerHTML = `${t.hero.stat3Value}<span class="stat-item__value-accent">${t.hero.stat3Unit}</span>`;
    if (l3) l3.textContent = t.hero.stat3Label;
  }

  // Hero 3D Island interactive labels
  const speedTitle = document.getElementById('hero-island-speed-title') || document.querySelector('.speed-title');
  const speedSub = document.getElementById('hero-island-speed-sub') || document.querySelector('.speed-sub');
  const luxuryTitle = document.getElementById('hero-island-luxury-title') || document.querySelector('.luxury-title');
  const luxurySub = document.getElementById('hero-island-luxury-sub') || document.querySelector('.luxury-sub');
  const highloadTitle = document.getElementById('hero-island-highload-title') || document.querySelector('.highload-title');

  if (speedTitle) speedTitle.textContent = t.hero.islandCoreSpeed;
  if (speedSub) speedSub.textContent = t.hero.islandCoreSub;
  if (luxuryTitle) luxuryTitle.textContent = t.hero.islandLuxury;
  if (luxurySub) luxurySub.textContent = t.hero.islandLuxurySub;
  if (highloadTitle) highloadTitle.textContent = t.hero.islandHighLoad;

  // 5. Services Section
  const servicesSec = document.getElementById('services');
  if (servicesSec) {
    const subtitle = servicesSec.querySelector('.section-header__subtitle') as HTMLElement | null;
    const title = servicesSec.querySelector('#services-heading');
    const desc = servicesSec.querySelector('.section-header__desc');
    if (subtitle) {
      subtitle.textContent = t.services.subtitle;
      subtitle.style.display = t.services.subtitle ? '' : 'none';
    }
    if (title) title.textContent = t.services.title;
    if (desc) desc.textContent = t.services.description;

    t.services.items.forEach((item) => {
      const card = document.getElementById(`service-card-${item.id}`);
      if (!card) return;
      const cardTitle = card.querySelector('.service-card__title');
      const cardDesc = card.querySelector('.service-card__desc');
      if (cardTitle) cardTitle.textContent = item.title;
      if (cardDesc) cardDesc.textContent = item.description;

      const featureEls = card.querySelectorAll('.service-card__feature-item span');
      featureEls.forEach((span, idx) => {
        if (item.features[idx]) span.textContent = item.features[idx];
      });

      const tagEls = card.querySelectorAll('.service-card__tags .badge');
      tagEls.forEach((badge, idx) => {
        if (item.tags[idx]) badge.textContent = item.tags[idx];
      });
       // Перевод кнопки и данных модального окна заявки:
      const orderBtn = card.querySelector('.service-card__order-btn');
      if (orderBtn) {
        const btnSpan = orderBtn.querySelector('span');
        if (btnSpan) btnSpan.textContent = t.services.orderService;
        orderBtn.setAttribute('data-modal-title', `${isRu ? 'Заказать' : 'Order'}: ${item.title}`);
        orderBtn.setAttribute('data-modal-service', item.title);
        orderBtn.setAttribute('data-modal-source', `${isRu ? 'Услуга' : 'Service'}: ${item.title}`);
        orderBtn.setAttribute(
          'data-modal-prefill',
          isRu
            ? `Здравствуйте! Интересует услуга: «${item.title}». Хочу получить расчет сметы и обсудить детали.`
            : `Hello! I am interested in the service: "${item.title}". I would like to get an estimate.`
        );
      }
    });
  }

  // 6. Templates Section
  const templatesSec = document.getElementById('templates') || document.getElementById('tourism');
  if (templatesSec) {
    const subtitle = templatesSec.querySelector('.section-header__subtitle');
    const title = templatesSec.querySelector('#templates-heading, #tourism-heading');
    const desc = templatesSec.querySelector('.templates__main-desc, .tourism__main-desc, .section-header__desc');
    if (subtitle) subtitle.textContent = t.templates.subtitle;
    if (title) title.textContent = t.templates.title;
    if (desc) desc.textContent = t.templates.description;

    const storyBadge = templatesSec.querySelector('.templates-story-badge span, .tourism-story-badge span');
    if (storyBadge) storyBadge.textContent = t.templates.whyHeading;

    const storyParagraphs = templatesSec.querySelectorAll('.templates-story-p, .tourism-story-p');
    if (storyParagraphs.length >= 3) {
      storyParagraphs[0].textContent = t.templates.whyParagraph1;
      storyParagraphs[1].textContent = t.templates.whyParagraph2;
      storyParagraphs[2].textContent = t.templates.whyParagraph3;
    }

    t.templates.cards.forEach((card) => {
      const cardEl = document.getElementById(`templates-card-${card.id}`) || document.getElementById(`tourism-card-${card.id}`);
      if (!cardEl) return;
      const cBadge = cardEl.querySelector('.templates-card__badge, .tourism-card__badge');
      const cTitle = cardEl.querySelector('.templates-card__title, .tourism-card__title');
      const cDesc = cardEl.querySelector('.templates-card__desc, .tourism-card__desc');
      const cBtn = cardEl.querySelector('.templates-card__btn span, .tourism-card__btn span');
      const cBtnLink = cardEl.querySelector<HTMLAnchorElement>('.templates-card__btn, .tourism-card__btn');
      if (cBadge) cBadge.textContent = card.badge;
      if (cTitle) cTitle.textContent = card.title;
      if (cDesc) cDesc.textContent = card.description;
      const cardWithBtn = card as { buttonText?: string };
      if (cBtn && cardWithBtn.buttonText) cBtn.textContent = cardWithBtn.buttonText;
      if (cBtnLink) {
        cBtnLink.setAttribute('href', '/#contact');
        if (cardWithBtn.buttonText) cBtnLink.setAttribute('data-modal-title', cardWithBtn.buttonText);
        cBtnLink.setAttribute('data-modal-service', card.title);
        cBtnLink.setAttribute('data-modal-source', `Шаблоны: ${card.title}`);
      }
    });

    const portfolioBtn = document.querySelector('#templates-portfolio-btn span, #tourism-portfolio-btn span');
    if (portfolioBtn) portfolioBtn.textContent = t.templates.btnPortfolio;
    const portfolioBtnLink = (document.getElementById('templates-portfolio-btn') || document.getElementById('tourism-portfolio-btn')) as HTMLAnchorElement | null;
    if (portfolioBtnLink) portfolioBtnLink.setAttribute('href', '/portfolio');

    const contactBtn = document.querySelector('#templates-contact-btn span, #tourism-contact-btn span');
    if (contactBtn) contactBtn.textContent = t.templates.btnOrder;
    const contactBtnLink = (document.getElementById('templates-contact-btn') || document.getElementById('tourism-contact-btn')) as HTMLAnchorElement | null;
    if (contactBtnLink) {
      contactBtnLink.setAttribute('href', '/#contact');
      contactBtnLink.setAttribute('data-modal-title', t.templates.btnOrder);
      contactBtnLink.setAttribute('data-modal-source', isRu ? 'Шаблоны: Заказать шаблон' : 'Templates: Order template');
    }

    // Dedicated Templates page extra elements (if present)
    const travelPortfolioTitle = document.getElementById('travel-portfolio-title');
    if (travelPortfolioTitle) {
      travelPortfolioTitle.textContent = isRu ? 'Каталог готовых шаблонов' : 'Turnkey Templates Catalog';
    }
    const travelPortfolioDesc = document.getElementById('travel-portfolio-desc');
    if (travelPortfolioDesc) {
      travelPortfolioDesc.textContent = isRu
        ? 'Выберите готовый шаблон для вашего бизнеса или закажите индивидуальную доработку под ваш бренд.'
        : 'Select a turnkey template for your business or request custom branding tailored to your vision.';
    }
    const templatesBreadcrumb = document.getElementById('templates-breadcrumb-current');
    if (templatesBreadcrumb) {
      templatesBreadcrumb.textContent = isRu ? 'Шаблоны' : 'Templates';
    }

    // Templates load more button and counter (when > 6 templates exist)
    const templatesLoadMoreBtn = document.getElementById('templates-load-more-btn') as HTMLButtonElement | null;
    const templatesCounterText = document.getElementById('templates-counter-text');
    if (templatesCounterText && templatesLoadMoreBtn) {
      const total = parseInt(templatesLoadMoreBtn.getAttribute('data-total') || '6', 10);
      const hiddenRemaining = document.querySelectorAll('.template-item--hidden').length;
      const visible = total - hiddenRemaining;
      if (visible >= total) {
        templatesCounterText.textContent = isRu
          ? `Все ${total} шаблонов показаны`
          : `All ${total} templates displayed`;
        const btnSpan = templatesLoadMoreBtn.querySelector('span');
        if (btnSpan) btnSpan.textContent = isRu ? 'Все шаблоны открыты' : 'All templates opened';
      } else {
        templatesCounterText.textContent = isRu
          ? `Показано ${visible} из ${total} шаблонов`
          : `Showing ${visible} of ${total} templates`;
        const btnSpan = templatesLoadMoreBtn.querySelector('span');
        if (btnSpan) btnSpan.textContent = isRu ? 'Показать еще шаблоны' : 'Load More Templates';
      }
    }
  }

  // Universal Breadcrumbs (across all sub-pages)
  document.querySelectorAll<HTMLAnchorElement>('.breadcrumb-link').forEach((link) => {
    link.textContent = isRu ? 'Главная' : 'Home';
    link.setAttribute('href', '/');
  });

  // 7. GEO / Speed Section
  const geoSec = document.getElementById('geo-speed');
  if (geoSec) {
    const subtitle = geoSec.querySelector('.section-header__subtitle');
    const title = geoSec.querySelector('#geo-heading');
    const desc = geoSec.querySelector('.section-header__desc');
    if (subtitle) subtitle.textContent = t.geo.subtitle;
    if (title) title.textContent = t.geo.title;
    if (desc) desc.textContent = t.geo.description;

    // Card 1
    const c1 = document.getElementById('geo-speed-scores');
    if (c1) {
      const badge = c1.querySelector('.badge');
      const cTitle = c1.querySelector('.geo-card__title');
      const cDesc = c1.querySelector('.geo-card__desc');
      if (badge) badge.textContent = t.geo.card1Badge;
      if (cTitle) cTitle.textContent = t.geo.card1Title;
      if (cDesc) cDesc.textContent = t.geo.card1Desc;
      c1.querySelectorAll('.geo-points-list span').forEach((s, idx) => {
        if (t.geo.card1Points[idx]) s.textContent = t.geo.card1Points[idx];
      });
    }

    // Card 2
    const c2 = document.getElementById('geo-cdn-coverage');
    if (c2) {
      const badge = c2.querySelector('.badge');
      const cTitle = c2.querySelector('.geo-card__title');
      const cDesc = c2.querySelector('.geo-card__desc');
      if (badge) badge.textContent = t.geo.card2Badge;
      if (cTitle) cTitle.textContent = t.geo.card2Title;
      if (cDesc) cDesc.textContent = t.geo.card2Desc;
      c2.querySelectorAll('.geo-points-list span').forEach((s, idx) => {
        if (t.geo.card2Points[idx]) s.textContent = t.geo.card2Points[idx];
      });
    }

    // Card 3
    const c3 = document.getElementById('geo-seo-structured');
    if (c3) {
      const badge = c3.querySelector('.badge');
      const cTitle = c3.querySelector('.geo-card__title');
      const cDesc = c3.querySelector('.geo-card__desc');
      if (badge) badge.textContent = t.geo.card3Badge;
      if (cTitle) cTitle.textContent = t.geo.card3Title;
      if (cDesc) cDesc.textContent = t.geo.card3Desc;
      c3.querySelectorAll('.geo-points-list span').forEach((s, idx) => {
        if (t.geo.card3Points[idx]) s.textContent = t.geo.card3Points[idx];
      });
    }
  }

  // 8. Portfolio Section (Home + Dedicated Page)
  const portfolioSec = document.getElementById('portfolio');
  if (portfolioSec) {
    const subtitle = portfolioSec.querySelector('.section-header__subtitle');
    const title = portfolioSec.querySelector('#portfolio-heading');
    const desc = portfolioSec.querySelector('.section-header__desc');
    if (subtitle) subtitle.textContent = t.portfolio.subtitle;
    if (title) title.textContent = t.portfolio.title;
    if (desc) {
      desc.textContent = isRu
        ? 'Показываем реальные проекты в действии. В каждой карточке десктопная и мобильная версии непрерывно двигаются — наведите курсор, чтобы приостановить.'
        : 'Live previews of our crafted platforms. Desktop and mobile versions move continuously — hover over any card to pause.';
    }

    const allBtn = portfolioSec.querySelector('.portfolio-all-btn span');
    if (allBtn) {
      allBtn.textContent = isRu
        ? 'Смотреть все проекты в портфолио'
        : 'Explore All Projects in Portfolio';
    }

    const portHint = portfolioSec.querySelector('.portfolio-hint');
    if (portHint) {
      portHint.textContent = isRu
        ? 'Все проекты с живой анимацией доступны на отдельной странице'
        : 'All projects with live scrolling available on dedicated page';
    }
  }

  // Portfolio page specific elements (if present)
  if (isPortfolioPage) {
    const breadcrumbCurr = document.querySelector('.breadcrumb-current');
    if (breadcrumbCurr) breadcrumbCurr.textContent = isRu ? 'Портфолио' : 'Portfolio';

    const badgePill = document.querySelector('.badge-pill span:last-child');
    if (badgePill) badgePill.textContent = isRu ? 'Живая демонстрация проектов' : 'Live Interactive Showcase';

    const pageIntroTitle = document.getElementById('portfolio-page-title');
    if (pageIntroTitle) {
      pageIntroTitle.innerHTML = `${isRu ? 'Наши проекты' : 'Our Projects'}<span class="title-gold-dot">.</span>`;
    }

    const pageIntroDesc = document.querySelector('.page-intro__desc');
    if (pageIntroDesc) {
      pageIntroDesc.textContent = isRu
        ? 'В каждой карточке представлена десктопная версия сайта и мобильный вид со смартфона в непрерывном движении. Наведите курсор на любую карточку, чтобы остановить прокрутку и рассмотреть детали.'
        : 'Every project card features full desktop and mobile views in continuous fluid motion. Hover over any card to pause the preview and inspect design details.';
    }

    const loadMoreBtn = document.getElementById('load-more-btn');
    if (loadMoreBtn) {
      const btnSpan = loadMoreBtn.querySelector('span');
      if (btnSpan) btnSpan.textContent = isRu ? 'Показать еще проекты' : 'Load More Projects';
    }

    const counterText = document.getElementById('items-counter-text');
    if (counterText && loadMoreBtn) {
      const total = parseInt(loadMoreBtn.getAttribute('data-total') || '12', 10);
      const visible = document.querySelectorAll('.portfolio-item-wrapper:not(.portfolio-item--hidden)').length || 6;
      counterText.textContent = isRu
        ? `Показано ${visible} из ${total} проектов`
        : `Showing ${visible} of ${total} projects`;
    }
  }

  // Portfolio & Template Cards (all project cards)
  document.querySelectorAll<HTMLElement>('.project-card').forEach((card) => {
    const projectDomain = card.getAttribute('data-project-domain') || card.getAttribute('data-project-id');
    const project = portfolioProjects.find((p) => p.domain === projectDomain)
      || websiteTemplates.find((t) => t.domain === projectDomain || t.id === projectDomain);

    const pauseStatus = card.querySelector('.status-text');
    if (pauseStatus) {
      pauseStatus.textContent = isRu ? 'Пауза при наведении' : 'Hover to pause';
    }

    const discussBtn = card.querySelector('.btn-discuss-project span');
    if (discussBtn) {
      discussBtn.textContent = isRu ? 'Обсудить проект' : 'Discuss Project';
    }

    const discussBtnAnchor = card.querySelector<HTMLAnchorElement>('.btn-discuss-project');
    if (discussBtnAnchor) {
      discussBtnAnchor.setAttribute('href', '/#contact');
      discussBtnAnchor.setAttribute('data-modal-title', isRu ? 'Обсудить проект' : 'Discuss Project');
      if (project) {
        const pTitle = isRu ? project.title.ru : project.title.en;
        const isTemplate = 'description' in project;
        const labelPrefix = isTemplate ? (isRu ? 'Шаблон' : 'Template') : (isRu ? 'Кейс' : 'Case');
        discussBtnAnchor.setAttribute('data-modal-service', `${labelPrefix}: ${pTitle}`);
        discussBtnAnchor.setAttribute('data-modal-source', `${isTemplate ? (isRu ? 'Шаблоны' : 'Templates') : (isRu ? 'Портфолио' : 'Portfolio')}: ${pTitle}`);
        discussBtnAnchor.setAttribute(
          'data-modal-prefill',
          isRu
            ? `Здравствуйте! Понравился ${isTemplate ? 'шаблон' : 'проект'} «${pTitle}» (${project.domain}). Хочу обсудить ${isTemplate ? 'его внедрение' : 'разработку похожего проекта'}.`
            : `Hello! I liked ${isTemplate ? 'template' : 'project'} "${pTitle}" (${project.domain}). I would like to discuss ${isTemplate ? 'implementation' : 'developing a similar project'}.`
        );
      }
    }

    const mobMockup = card.querySelector('.mockup-mobile');
    if (mobMockup) {
      mobMockup.setAttribute('aria-label', isRu ? 'Мобильная версия сайта' : 'Mobile version of website');
    }

    const spinnerLabels = card.querySelectorAll('.spinner__label');
    spinnerLabels.forEach((sp) => {
      sp.textContent = isRu ? 'Загрузка...' : 'Loading...';
    });

    if (project) {
      const pTitle = isRu ? project.title.ru : project.title.en;
      const isTemplate = 'description' in project;

      // Update card title and description if rendered on card
      const titleEl = card.querySelector('.project-title');
      if (titleEl) {
        titleEl.textContent = pTitle;
      }
      if (isTemplate && project.description) {
        const descEl = card.querySelector('.project-desc');
        if (descEl) {
          descEl.textContent = isRu ? project.description.ru : project.description.en;
        }
      }

      const deskImg = card.querySelector('.mockup-scroll-desktop');
      const mobImg = card.querySelector('.mockup-scroll-mobile');
      if (deskImg) deskImg.setAttribute('alt', `${pTitle} — ${isRu ? 'десктопная версия' : 'desktop version'}`);
      if (mobImg) mobImg.setAttribute('alt', `${pTitle} — ${isRu ? 'мобильная версия' : 'mobile version'}`);

      const siteLink = card.querySelector<HTMLElement>('.project-site-link');
      if (siteLink) {
        if (project.url) {
          siteLink.setAttribute('title', isRu ? `Перейти на сайт ${project.domain || project.url}` : `Visit website ${project.domain || project.url}`);
        } else {
          siteLink.setAttribute('title', isRu ? 'Ссылка появится позже' : 'Link coming soon');
        }
      }
    }
  });

  // Portfolio Bottom CTA Banner
  const portfolioCtaBadge = document.getElementById('portfolio-cta-badge') || document.querySelector('.portfolio-cta-card .cta-badge');
  if (portfolioCtaBadge) {
    portfolioCtaBadge.textContent = t.portfolio.ctaBadge || (isRu ? 'Ваш проект' : 'Your Website');
  }

  const portfolioCtaTitle = document.getElementById('portfolio-cta-title') || document.querySelector('.portfolio-cta-card .cta-title');
  if (portfolioCtaTitle) {
    portfolioCtaTitle.textContent = t.portfolio.ctaTitle || (isRu
      ? 'Хотите сайт такого же уровня для вашего бизнеса?'
      : 'Want a Website of This Caliber for Your Business?');
  }

  const portfolioCtaDesc = document.getElementById('portfolio-cta-desc') || document.querySelector('.portfolio-cta-card .cta-desc');
  if (portfolioCtaDesc) {
    portfolioCtaDesc.textContent = t.portfolio.ctaDesc || (isRu
      ? 'Разработаем стильный дизайн, адаптируем под любые экраны и настроим высокую скорость загрузки. Рассчитайте стоимость за пару минут или напишите нам для консультации.'
      : 'We craft bespoke web experiences optimized for speed, mobile responsiveness, and high conversion. Calculate an estimate or reach out directly.');
  }

  const portfolioCtaBtnContact = document.getElementById('portfolio-cta-btn-contact') || document.querySelector('.portfolio-cta-card .cta-actions .btn--gold');
  if (portfolioCtaBtnContact) {
    const span = portfolioCtaBtnContact.querySelector('span');
    if (span) span.textContent = t.portfolio.ctaDiscuss || (isRu ? 'Обсудить проект' : 'Discuss Your Project');
    portfolioCtaBtnContact.setAttribute('href', '/#contact');
  }

  const portfolioCtaBtnCalc = document.getElementById('portfolio-cta-btn-calc') || document.querySelector('.portfolio-cta-card .cta-actions .btn--glass');
  if (portfolioCtaBtnCalc) {
    const span = portfolioCtaBtnCalc.querySelector('span');
    if (span) span.textContent = t.portfolio.ctaEstimate || (isRu ? 'Рассчитать смету' : 'Calculate Estimate');
    portfolioCtaBtnCalc.setAttribute('href', '/#calculator');
  }

  // 8.5 Reviews Section
  const reviewsSec = document.getElementById('reviews');
  if (reviewsSec && t.reviews) {
    const sub = reviewsSec.querySelector('.section-header__subtitle');
    const title = reviewsSec.querySelector('#reviews-heading');
    const desc = reviewsSec.querySelector('.section-header__desc');
    if (sub) sub.textContent = t.reviews.subtitle;
    if (title) title.textContent = t.reviews.title;
    if (desc) desc.textContent = t.reviews.description;

    clientReviews.forEach((rev, idx) => {
      const cards = reviewsSec.querySelectorAll<HTMLElement>(`[data-review-id="${idx}"]`);
      cards.forEach((card) => {
        const verified = card.querySelector('.review-speech-card__verified');
        if (verified) verified.setAttribute('title', t.reviews.badgeVerified);

        const websiteLink = card.querySelector('.review-speech-card__website');
        if (websiteLink) websiteLink.setAttribute('title', `${t.reviews.visitSite}: ${rev.website}`);

        // Reviews are kept in their original authentic form regardless of selected language
        const textEl = card.querySelector('.review-speech-card__text');
        if (textEl) {
          textEl.textContent = rev.description;
        }
      });
    });

    const leaveBtn = reviewsSec.querySelector<HTMLAnchorElement>('#reviews-leave-btn');
    if (leaveBtn) {
      leaveBtn.setAttribute('title', t.reviews.leaveReview);
      const span = leaveBtn.querySelector('span');
      if (span) span.textContent = t.reviews.leaveReview;
    }

    const prevBtn = reviewsSec.querySelector('#reviews-prev-btn');
    if (prevBtn) prevBtn.setAttribute('aria-label', isRu ? 'Предыдущие отзывы' : 'Previous reviews');

    const nextBtn = reviewsSec.querySelector('#reviews-next-btn');
    if (nextBtn) nextBtn.setAttribute('aria-label', isRu ? 'Следующие отзывы' : 'Next reviews');

    reviewsSec.querySelectorAll('.pagination-dot').forEach((dot, idx) => {
      dot.setAttribute('aria-label', isRu ? `Перейти к отзыву ${idx + 1}` : `Go to review ${idx + 1}`);
    });
  }

  // 9. Calculator Section
  const calcSec = document.getElementById('calculator');
  if (calcSec) {
    const calc = t.calculator;
    calcSec.setAttribute('data-deadline-text', calc.deadline);
    calcSec.setAttribute('data-workdays-text', calc.workDays);
    calcSec.setAttribute('data-currency', calc.currency);
    calcSec.setAttribute('data-lang', lang);

    const sub = calcSec.querySelector('.section-header__subtitle');
    const title = calcSec.querySelector('#calc-heading');
    const desc = calcSec.querySelector('.section-header__desc');
    if (sub) sub.textContent = calc.subtitle;
    if (title) title.textContent = calc.title;
    if (desc) desc.textContent = calc.description;

    const stepLabels = calcSec.querySelectorAll('.calc-step-label');
    if (stepLabels[0]) stepLabels[0].textContent = calc.step1;
    if (stepLabels[1]) stepLabels[1].textContent = calc.step2;

    // Вспомогательная функция для корректного склонения ("4 рабочих дня", а не "4 рабочих дней")
    function formatDaysI18n(count: number, ru: boolean): string {
      if (!ru) {
        return count === 1 ? 'business day' : 'business days';
      }
      const mod10 = count % 10;
      const mod100 = count % 100;
      if (mod100 >= 11 && mod100 <= 19) {
        return 'рабочих дней';
      }
      if (mod10 === 1) {
        return 'рабочий день';
      }
      if (mod10 >= 2 && mod10 <= 4) {
        return 'рабочих дня';
      }
      return 'рабочих дней';
    }

    const typeBtns = calcSec.querySelectorAll<HTMLButtonElement>('.calc-type-btn');
    typeBtns.forEach((btn, idx) => {
      const typeData = calc.projectTypes[idx];
      if (typeData) {
        btn.setAttribute('data-type-name', typeData.name);
        const tTitle = btn.querySelector('.calc-type-btn__title');
        const tDays = btn.querySelector('.calc-type-btn__days');
        const tPrice = btn.querySelector('.calc-type-btn__price');
        if (tTitle) tTitle.textContent = typeData.name;
        if (tDays) tDays.textContent = `~${typeData.days} ${formatDaysI18n(typeData.days, isRu)}`;
        if (tPrice) {
          tPrice.textContent = `${isRu ? 'от' : 'from'} ${typeData.basePrice.toLocaleString(isRu ? 'ru-RU' : 'en-US')} ${calc.currency}`;
        }
      }
    });

    const optBtns = calcSec.querySelectorAll<HTMLButtonElement>('.calc-opt-btn');
    optBtns.forEach((btn, idx) => {
      const optData = calc.addons[idx];
      if (optData) {
        btn.setAttribute('data-opt-name', optData.name);
        const oTitle = btn.querySelector('.calc-opt-btn__title');
        const oDays = btn.querySelector('.calc-opt-btn__days');
        const oPrice = btn.querySelector('.calc-opt-btn__price');
        if (oTitle) oTitle.textContent = optData.name;
        if (oDays) oDays.textContent = `+${optData.days} ${formatDaysI18n(optData.days, isRu)}`;
        if (oPrice) {
          oPrice.textContent = `${isRu ? 'от' : 'from'} ${optData.price.toLocaleString(isRu ? 'ru-RU' : 'en-US')} ${calc.currency}`;
        }
      }
    });

    const budgetTag = calcSec.querySelector('.calc-result-tag');
    if (budgetTag) budgetTag.textContent = calc.budgetEst;

    const currencyEl = calcSec.querySelector('.calc-currency');
    if (currencyEl) currencyEl.textContent = calc.currency;

    const submitBtn = calcSec.querySelector('#calc-submit-cta span');
    if (submitBtn) submitBtn.textContent = calc.submitBtn;

    // Пересчитываем итог калькулятора под новый язык
    const selectedType = calcSec.querySelector('.calc-type-btn.is-selected') as HTMLButtonElement | null;
    if (selectedType) {
      selectedType.click();
    }
  }

  // 9.5 FAQ Section
  const faqSec = document.getElementById('faq');
  if (faqSec && t.faq) {
    const subtitle = faqSec.querySelector('.section-header__subtitle');
    const title = faqSec.querySelector('#faq-heading');
    const desc = faqSec.querySelector('.section-header__desc');
    if (subtitle) subtitle.textContent = t.faq.subtitle;
    if (title) title.textContent = t.faq.title;
    if (desc) desc.textContent = t.faq.description;

    t.faq.items.forEach((item) => {
      const itemEl = document.getElementById(item.id);
      if (!itemEl) return;
      const qEl = itemEl.querySelector('.faq-item__question');
      const aEl = itemEl.querySelector('.faq-item__answer');
      if (qEl) qEl.textContent = item.question;
      if (aEl) aEl.textContent = item.answer;
    });

    const ctaTitle = faqSec.querySelector('.faq__cta-title');
    const ctaDesc = faqSec.querySelector('.faq__cta-desc');
    const ctaBtn = faqSec.querySelector('.faq__cta-btn span');
    const ctaModalBtn = faqSec.querySelector('.faq__cta-btn');
    if (ctaTitle) ctaTitle.textContent = t.faq.moreQuestionTitle;
    if (ctaDesc) ctaDesc.textContent = t.faq.moreQuestionDesc;
    if (ctaBtn) ctaBtn.textContent = t.faq.askBtn;
    if (ctaModalBtn) {
      ctaModalBtn.setAttribute('data-modal-title', isRu ? 'Задать вопрос' : 'Ask a Question');
    }
  }

  // 10. Contact Section
  const contactSec = document.getElementById('contact');
  if (contactSec) {
    const subtitle = contactSec.querySelector('.section-header__subtitle');
    const title = contactSec.querySelector('#contact-heading');
    const desc = contactSec.querySelector('.section-header__desc');
    if (subtitle) subtitle.textContent = t.contact.subtitle;
    if (title) title.textContent = t.contact.title;
    if (desc) desc.textContent = t.contact.description;

    const phoneCardName = contactSec.querySelector('.contact-method-icon--phone')?.parentElement?.querySelector('.contact-method-name');
    if (phoneCardName) phoneCardName.textContent = t.contact.directPhone;

    const nameLabel = contactSec.querySelector('#field-group-name .floating-label');
    if (nameLabel) nameLabel.textContent = t.contact.formName;

    const phoneLabel = contactSec.querySelector('#field-group-phone .floating-label');
    if (phoneLabel) phoneLabel.textContent = t.contact.formPhone;

    const emailLabel = contactSec.querySelector('#field-group-email .floating-label');
    if (emailLabel) emailLabel.textContent = t.contact.formEmail;

    const msgLabel = contactSec.querySelector('#field-group-message .floating-label');
    if (msgLabel) msgLabel.textContent = t.contact.formMessage;

    const submitBtn = contactSec.querySelector('#contact-submit-btn span');
    if (submitBtn) submitBtn.textContent = t.contact.formSubmit;

    const disclaimer = contactSec.querySelector('.form-disclaimer');
    if (disclaimer) {
      const pLink = '/privacy-policy';
      const cLink = '/personal-data-consent';
      disclaimer.innerHTML = isRu
        ? `Отправляя заявку, вы соглашаетесь с <a href="${pLink}" target="_blank" class="legal-link">Политикой конфиденциальности</a> и даете согласие на <a href="${cLink}" target="_blank" class="legal-link">обработку персональных данных</a>`
        : `By submitting, you agree to our <a href="${pLink}" target="_blank" class="legal-link">Privacy Policy</a> and consent to <a href="${cLink}" target="_blank" class="legal-link">personal data processing</a>`;
    }

    const form = document.getElementById('main-contact-form');
    if (form) form.setAttribute('data-lang', lang);

    // Update contact success popup if open or present
    const contactSuccessTitle = document.getElementById('contact-success-title');
    if (contactSuccessTitle) {
      contactSuccessTitle.textContent = isRu ? 'Спасибо за обращение!' : 'Thank you for reaching out!';
    }
    const contactSuccessDesc = document.getElementById('contact-success-desc');
    if (contactSuccessDesc) {
      contactSuccessDesc.textContent = isRu ? 'Мы скоро с вами свяжемся.' : 'We will contact you shortly.';
    }
    const contactSuccessOkLabel = document.getElementById('contact-success-ok-label');
    if (contactSuccessOkLabel) {
      contactSuccessOkLabel.textContent = isRu ? 'Понятно' : 'Got it';
    }
    const contactSuccessClose = document.getElementById('contact-success-close');
    if (contactSuccessClose) {
      contactSuccessClose.setAttribute('aria-label', isRu ? 'Закрыть' : 'Close');
    }

    // Update main contact form error status message if currently active
    const contactStatus = document.getElementById('contact-form-status');
    if (contactStatus) {
      if (contactStatus.querySelector('.form-status-success') || contactStatus.textContent?.includes('Спасибо за обращение') || contactStatus.textContent?.includes('Thank you for reaching out')) {
        contactStatus.innerHTML = '';
      } else if (contactStatus.textContent?.includes('Ошибка сети') || contactStatus.textContent?.includes('Network error')) {
        contactStatus.innerHTML = `<span style="color: #FF5C77; font-weight: 500;">⚠ ${
          isRu 
            ? 'Ошибка сети. Пожалуйста, попробуйте еще раз или напишите: info@nice-dev.ru' 
            : 'Network error. Please try again or write: info@nice-dev.ru'
        }</span>`;
      } else if (contactStatus.textContent?.includes('Ошибка при отправке') || contactStatus.textContent?.includes('Submission error')) {
        contactStatus.innerHTML = `<span style="color: #FF5C77; font-weight: 500;">⚠ ${
          isRu
            ? 'Ошибка при отправке заявки. Пожалуйста, напишите нам: info@nice-dev.ru'
            : 'Submission error. Please write: info@nice-dev.ru'
        }</span>`;
      }
    }

    // Instantly translate any currently visible field warning/error messages
    const contactErrorMappings: Record<string, { ru: string; en: string }> = {
      nameRequired: { ru: 'Укажите ваше имя', en: 'Enter your name' },
      nameShort: { ru: 'Имя должно содержать не менее 2 букв', en: 'Name must be at least 2 letters' },
      nameLong: { ru: 'Имя слишком длинное', en: 'Name is too long' },
      nameChars: { ru: 'Имя может содержать только буквы и дефис', en: 'Name can only contain letters and hyphens' },
      phoneRequired: { ru: 'Укажите номер телефона', en: 'Enter your phone number' },
      phoneShort: { ru: 'Введите полный номер телефона (не менее 10 цифр)', en: 'Enter a complete phone number (at least 10 digits)' },
      phoneModalShort: { ru: 'Введите полный номер телефона (не менее 10 цифр)', en: 'Enter at least 10 digits' },
      phoneLong: { ru: 'Номер телефона слишком длинный', en: 'Phone number is too long' },
      phoneInvalid: { ru: 'Укажите реальный номер телефона', en: 'Enter a valid phone number' },
      emailRequired: { ru: 'Укажите электронную почту', en: 'Enter your email address' },
      emailModalRequired: { ru: 'Укажите email', en: 'Enter your email' },
      emailShort: { ru: 'Email слишком короткий', en: 'Email is too short' },
      emailLong: { ru: 'Email слишком длинный', en: 'Email is too long' },
      emailInvalidRu: { ru: 'Введите корректный email (например, name@company.ru)', en: 'Enter a valid email (e.g. name@company.com)' },
      msgRequired: { ru: 'Опишите вашу задачу или проект', en: 'Describe your project or task' },
      msgModalRequired: { ru: 'Опишите вашу задачу или проект', en: 'Describe your task' },
      msgShort: { ru: 'Опишите задачу подробнее (минимум 6 символов)', en: 'Please add a few more words (at least 6 characters)' },
      msgModalShort: { ru: 'Опишите задачу подробнее (минимум 6 символов)', en: 'At least 6 characters required' },
      msgLong: { ru: 'Сообщение превышает лимит в 2000 символов', en: 'Message exceeds 2000 characters limit' },
    };

    document.querySelectorAll<HTMLElement>('.field-error, .modal-field-error').forEach((el) => {
      const current = el.textContent?.trim();
      if (!current) return;
      for (const pair of Object.values(contactErrorMappings)) {
        if (current === pair.ru && !isRu) {
          el.textContent = pair.en;
          break;
        } else if (current === pair.en && isRu) {
          el.textContent = pair.ru;
          break;
        }
      }
    });

    // Notify form scripts to refresh their internal state if initialized
    const win = window as unknown as { refreshContactFormLanguage?: () => void; refreshLeadModalLanguage?: () => void };
    if (typeof win.refreshContactFormLanguage === 'function') {
      win.refreshContactFormLanguage();
    }
    if (typeof win.refreshLeadModalLanguage === 'function') {
      win.refreshLeadModalLanguage();
    }
  }

  // 10.5 Lead Modal (Interactive Popup)
  const leadModal = document.getElementById('lead-modal-backdrop') || document.getElementById('lead-modal');
  if (leadModal) {
    leadModal.setAttribute('data-lang', lang);
    const mClose = leadModal.querySelector('#lead-modal-close');
    if (mClose) mClose.setAttribute('aria-label', isRu ? 'Закрыть окно' : 'Close modal');

    const mBadge = leadModal.querySelector('.lead-modal-badge');
    if (mBadge) mBadge.textContent = isRu ? 'Экспресс-консультация' : 'Fast Consultation';

    const mTitle = document.getElementById('lead-modal-title');
    if (mTitle) mTitle.textContent = isRu ? 'Заказать разработку' : 'Order Web Development';

    const mSubtitle = document.getElementById('lead-modal-subtitle');
    if (mSubtitle) {
      mSubtitle.textContent = isRu
        ? 'Оставьте контакты — мы скоро с вами свяжемся.'
        : 'Leave your contacts — we will contact you shortly.';
    }

    const mNameLabel = leadModal.querySelector('#modal-group-name .floating-label');
    if (mNameLabel) mNameLabel.textContent = t.contact.formName;

    const mPhoneLabel = leadModal.querySelector('#modal-group-phone .floating-label');
    if (mPhoneLabel) mPhoneLabel.textContent = t.contact.formPhone;

    const mEmailLabel = leadModal.querySelector('#modal-group-email .floating-label');
    if (mEmailLabel) mEmailLabel.textContent = t.contact.formEmail;

    const mMsgLabel = leadModal.querySelector('#modal-group-message .floating-label');
    if (mMsgLabel) mMsgLabel.textContent = t.contact.formMessage;

    const mSubmitBtn = leadModal.querySelector('#modal-submit-btn span');
    if (mSubmitBtn) mSubmitBtn.textContent = t.contact.formSubmit;

    const mDisclaimer = leadModal.querySelector('.lead-modal-disclaimer');
    if (mDisclaimer) {
      const pLink = '/privacy-policy';
      const cLink = '/personal-data-consent';
      mDisclaimer.innerHTML = isRu
        ? `Отправляя заявку, вы соглашаетесь с <a href="${pLink}" target="_blank" class="legal-link">Политикой конфиденциальности</a> и даете согласие на <a href="${cLink}" target="_blank" class="legal-link">обработку персональных данных</a>`
        : `By submitting this form, you agree to the <a href="${pLink}" target="_blank" class="legal-link">Privacy Policy</a> and consent to <a href="${cLink}" target="_blank" class="legal-link">personal data processing</a>`;
    }

    const mSuccessTitle = leadModal.querySelector('.lead-modal-success-title');
    if (mSuccessTitle) mSuccessTitle.textContent = t.contact.successTitle;

    const mSuccessDesc = leadModal.querySelector('.lead-modal-success-desc');
    if (mSuccessDesc) mSuccessDesc.textContent = t.contact.successDesc;

    const mSuccessClose = leadModal.querySelector('#lead-modal-success-close span');
    if (mSuccessClose) mSuccessClose.textContent = isRu ? 'Отлично, закрыть' : 'Great, close';
  }

  // 11. Footer Section
  const brandDesc = document.getElementById('footer-brand-desc');
  if (brandDesc) brandDesc.textContent = t.footer.brandDesc;

  const hNav = document.getElementById('footer-heading-nav');
  const hServices = document.getElementById('footer-heading-services');
  const hGeo = document.getElementById('footer-heading-geo');
  if (hNav) hNav.textContent = t.footer.navHeading;
  if (hServices) hServices.textContent = t.footer.servicesHeading;
  if (hGeo) hGeo.textContent = t.footer.geoHeading;

  const flTourism = document.getElementById('footer-link-templates');
  const flCorp = document.getElementById('footer-link-corporate');
  const flEcom = document.getElementById('footer-link-ecommerce');
  const flSpeed = document.getElementById('footer-link-speed');
  const flCalc = document.getElementById('footer-link-calc');
  if (flTourism) flTourism.textContent = t.footer.linkTourism;
  if (flCorp) flCorp.textContent = t.footer.expCorporate;
  if (flEcom) flEcom.textContent = t.footer.expEcommerce;
  if (flSpeed) flSpeed.textContent = t.footer.linkSpeed;
  if (flCalc) flCalc.textContent = t.footer.linkCalc;

  const areaServed = document.getElementById('footer-area-served');
  if (areaServed) areaServed.textContent = t.footer.areaServed;

  const footerCopy = document.getElementById('footer-copy');
  if (footerCopy) footerCopy.textContent = t.footer.rights;

  const legalPriv = document.getElementById('footer-legal-privacy');
  const legalCons = document.getElementById('footer-legal-consent');
  const legalCookie = document.getElementById('footer-cookie-btn');
  if (legalPriv) legalPriv.textContent = t.footer.privacyPolicy;
  if (legalCons) legalCons.textContent = t.footer.personalDataConsent;
  if (legalCookie) legalCookie.textContent = t.footer.cookieSettings || (isRu ? 'Настройки Cookie' : 'Cookie Settings');
  const footerDisclaimer = document.getElementById('footer-whatsapp-disclaimer') || document.querySelector('.footer__disclaimer p');
  if (footerDisclaimer) {
    footerDisclaimer.textContent = t.footer.whatsappDisclaimer || '';
  }

  // 12. Cookie Consent Banner
  const cookieBanner = document.getElementById('cookie-consent-banner');
  if (cookieBanner) {
    const cTitle = cookieBanner.querySelector('.nd-cookie-card__title');
    if (cTitle) cTitle.textContent = isRu ? 'Файлы Cookie' : 'Cookie Files';

    const cText = cookieBanner.querySelector('.nd-cookie-card__text');
    if (cText) {
      const pLink = '/privacy-policy';
      cText.innerHTML = isRu
        ? `Мы используем cookie для работы сайта и аналитики согласно <a href="${pLink}" class="nd-cookie-card__link">политике конфиденциальности</a>.`
        : `We use cookies for site operation and analytics in accordance with our <a href="${pLink}" class="nd-cookie-card__link">privacy policy</a>.`;
    }

    const btnAccept1 = cookieBanner.querySelector('#btn-cookie-accept-all-1');
    const btnAccept2 = cookieBanner.querySelector('#btn-cookie-accept-all-2');
    const btnReject1 = cookieBanner.querySelector('#btn-cookie-reject-1');
    const btnReject2 = cookieBanner.querySelector('#btn-cookie-reject-2');
    const btnSettings = cookieBanner.querySelector('#btn-cookie-show-settings');
    const btnSave = cookieBanner.querySelector('#btn-cookie-save');
    const btnHide = cookieBanner.querySelector('#btn-cookie-hide-settings');

    const acceptText = isRu ? 'Принять все' : 'Accept all';
    const rejectText = isRu ? 'Отклонить' : 'Decline';
    if (btnAccept1) btnAccept1.textContent = acceptText;
    if (btnAccept2) btnAccept2.textContent = acceptText;
    if (btnReject1) btnReject1.textContent = rejectText;
    if (btnReject2) btnReject2.textContent = rejectText;
    if (btnSettings) btnSettings.textContent = isRu ? 'Настройки' : 'Settings';
    if (btnSave) btnSave.textContent = isRu ? 'Сохранить' : 'Save';
    if (btnHide) btnHide.textContent = isRu ? 'Скрыть' : 'Hide';

    const chkEssentialTitle = cookieBanner.querySelector('.nd-checkbox-row:first-child .nd-checkbox-title');
    const chkEssentialDesc = cookieBanner.querySelector('.nd-checkbox-row:first-child .nd-checkbox-desc');
    if (chkEssentialTitle) chkEssentialTitle.textContent = isRu ? 'Обязательные (Технические)' : 'Essential (Technical)';
    if (chkEssentialDesc) chkEssentialDesc.textContent = isRu ? 'Необходимы для работы сайта, бронирования и безопасности' : 'Required for site functionality, booking and security';

    const chkAnalyticsTitle = cookieBanner.querySelector('label[for="cookie-chk-analytics"] .nd-checkbox-title');
    const chkAnalyticsDesc = cookieBanner.querySelector('label[for="cookie-chk-analytics"] .nd-checkbox-desc');
    if (chkAnalyticsTitle) chkAnalyticsTitle.textContent = isRu ? 'Аналитические' : 'Analytics';
    if (chkAnalyticsDesc) chkAnalyticsDesc.textContent = isRu ? 'Для анализа посещаемости и удобства' : 'To measure performance and user experience';
  }

  // 12.5 Accessibility Skip Link
  const skipLink = document.querySelector('.skip-link');
  if (skipLink) {
    const skipText = isRu ? 'Перейти к содержимому' : 'Skip to content';
    skipLink.textContent = skipText;
    skipLink.setAttribute('aria-label', skipText);
  }

  // 13. Dispatch Custom Event for external listeners
  window.dispatchEvent(new CustomEvent('nice-dev:language-change', { detail: { lang } }));
}

// Expose globally
if (typeof window !== 'undefined') {
  window.setClientLanguage = applyClientTranslations;
}
