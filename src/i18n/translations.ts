export type SupportedLanguage = 'ru' | 'en';

export interface LanguageOption {
  code: SupportedLanguage;
  label: string;
  nativeName: string;
  shortLabel: string;
}

export const AVAILABLE_LANGUAGES: LanguageOption[] = [
  {
    code: 'ru',
    label: 'Русский',
    nativeName: 'Русский',
    shortLabel: 'RU',
  },
  {
    code: 'en',
    label: 'English',
    nativeName: 'English',
    shortLabel: 'EN',
  },
];

export const translations = {
  ru: {
    nav: {
      services: 'Услуги',
      templates: 'Шаблоны',
      geoSpeed: 'Скорость и SEO',
      portfolio: 'Портфолио',
      reviews: 'Отзывы',
      calculator: 'Калькулятор',
      faq: 'FAQ',
      contact: 'Контакты',
      discussProject: 'Обсудить проект',
      selectLanguage: 'Выбрать язык',
      menu: 'Меню',
    },
    hero: {
      tag: '',
      titleLine1: 'Создаём качественные',
      titleAccent: 'сайты и приложения для бизнеса',
      description:
        'Разрабатываем скоростные лендинги, масштабные корпоративные экосистемы, интернет-магазины и сервисы с интуитивным дизайном и максимальной скоростью загрузки.',
      orderDev: 'Заказать разработку',
      viewPortfolio: 'Смотреть портфолио',
      stat1Value: 'Быстро',
      stat1Unit: '',
      stat1Label: 'Легкий и чистый код',
      stat2Value: 'Плавно',
      stat2Unit: '',
      stat2Label: 'Открытие страниц без задержек',
      stat3Value: '50',
      stat3Unit: '+',
      stat3Label: 'Созданных проектов',
      islandCoreSpeed: 'Быстрая работа и отклик',
      islandCoreSub: 'Удобно для пользователей',
      islandLuxury: 'Современный и стильный дизайн',
      islandLuxurySub: 'Аккуратный внешний вид',
      islandHighLoad: 'Надежность и защита данных',
    },
    services: {
      subtitle: '',
      title: 'Услуги студии',
      description:
        'Создаем сайты, которые привлекают клиентов, просто и понятно рассказывают о ваших услугах и удобно работают на смартфонах и компьютерах.',
      orderService: 'Заказать услугу',
      crmNote: '* с возможностью интеграции и синхронизации с вашей CRM-системой (Bitrix24, amoCRM и др.)',
      items: [
        {
          id: 'corporate-sites',
          title: 'Корпоративные сайты и порталы',
          description:
            'Солидные сайты для компаний. Понятная структура, удобные разделы о бизнесе, контакты и форма заявки.',
          features: [
            'Понятная структура страниц',
            'Подготовка для поисковых систем',
            'Подключение заявок в вашу CRM',
          ],
          tags: ['Надежность', 'Удобно читать', 'Понятная структура', 'Адаптивность'],
        },
        {
          id: 'mobile-apps',
          title: 'Мобильные и веб-приложения',
          description:
            'Удобные сервисы для клиентов, которыми комфортно пользоваться прямо с экрана телефона или планшета.',
          features: [
            'Быстро работает на смартфонах',
            'Интуитивно понятный дизайн',
            'Удобство для пользователя',
          ],
          tags: ['Для смартфонов', 'Быстрый отклик', 'Удобный интерфейс'],
        },
        {
          id: 'ecommerce',
          title: 'Интернет-магазины и каталоги',
          description:
            'Онлайн-магазины с понятным каталогом, удобным поиском товаров, корзиной и безопасной оплатой банковскими картами.',
          features: [
            'Удобный каталог и фильтры',
            'Прием оплаты картами и через СБП',
            'Личный кабинет и история заказов',
          ],
          tags: ['Онлайн-оплата', 'Каталог товаров', 'Удобный заказ'],
        },
        {
          id: 'ux-ui-design',
          title: 'Дизайн сайтов и интерфейсов',
          description:
            'Создание красивого и удобного внешнего вида сайта с учетом стиля компании и предпочтений ваших клиентов.',
          features: [
            'Анализ удобства для пользователей',
            'Макеты страниц перед версткой',
            'Красивые и плавные анимации',
          ],
          tags: ['Индивидуальный стиль', 'Удобство', 'Современный вид'],
        },
        {
          id: 'ai-bots',
          title: 'Умные чат-боты и ассистенты',
          description:
            'Автоматические помощники в Telegram, WhatsApp* или на сайте, которые отвечают клиентам на частые вопросы 24/7.',
          features: [
            'Ответы по вашим прайсам и услугам',
            'Помощь менеджерам с заявками',
            'Синхронизация с вашей CRM-системой',
          ],
          tags: ['Чат-боты', 'Telegram', 'WhatsApp*', 'Помощь клиентам'],
        },
        {
          id: 'tech-support',
          title: 'Техническая поддержка и забота',
          description:
            'Следим за тем, чтобы сайт работал стабильно, вовремя продлеваем домен и защищаем страницы от сбоев.',
          features: [
            'Постоянный контроль работы сайта',
            'Регулярные резервные копии',
            'Помощь и консультации',
          ],
          tags: ['Защита данных', 'Стабильность', 'Поддержка'],
        },
      ],
    },
    templates: {
      subtitle: 'Готовые решения для бизнеса',
      title: 'Шаблоны сайтов под ключ',
      description:
        'Каталог готовых отраслевых шаблонов сайтов под ключ от 15 000 рублей. Вы можете заказать готовый шаблон для своего бизнеса: адаптируем его под ваш бренд, фирменный стиль и подключим необходимые модули в сжатые сроки.',
      whyHeading: 'Почему стоит заказать готовый шаблон в NiceDev?',
      whyParagraph1:
        'NiceDev создаёт профессиональные шаблоны сайтов с вниманием к деталям на уровне индивидуальной разработки. Каждый шаблон спроектирован с упором на современную визуальную эстетику, удобный путь клиента и высокую конверсию.',
      whyParagraph2:
        'В готовые шаблоны уже заложена безупречная адаптивность для мобильных телефонов и планшетов, максимальная скорость загрузки и бесшовная интеграция модулей бронирования.',
      whyParagraph3:
        'Закажите готовый шаблон для себя — мы персонализируем его под ваши услуги, наполним вашими материалами и запустим полностью рабочий сайт за считанные дни!',
      cards: [
        {
          id: 'audience-needs',
          title: 'Шаблоны для туризма, отелей и услуг',
          description:
            'Специализированные шаблоны с продуманным пользовательским сценарием, учитывающие реальное поведение и желания клиентов.',
          badge: 'Отраслевые шаблоны',
        },
        {
          id: 'booking-module',
          title: 'Шаблоны с модулями бронирования',
          description:
            'Готовые решения с интеграцией поисковых модулей, онлайн-бронирования, туров, номеров и платежных систем.',
          badge: 'Прямые продажи',
        },
        {
          id: 'templates',
          title: 'Готовые шаблоны сайтов от 15 000 рублей',
          description:
            'Вы можете заказать готовый сайт-шаблон под ключ всего за 15 000 рублей: авторский дизайн и премиальный уровень без переплат.',
          badge: 'Быстрый старт',
        },
      ],
      btnPortfolio: 'Смотреть портфолио',
      btnOrder: 'Заказать шаблон',
      calculateTourPlatform: 'Рассчитать стоимость проекта',
    },
    geo: {
      subtitle: 'Видимость в поиске и нейросетях',
      title: 'GEO — Чтобы сайт находили в поисковиках и умных сервисах',
      description:
        'Люди все чаще ищут услуги через умные поисковики и голосовые помощники. Мы оформляем сайт так, чтобы поисковые системы и нейросети легко понимали, чем занимается ваша компания, и рекомендовали вас клиентам.',
      card1Badge: 'Легкость и скорость',
      card1Title: 'Быстрое открытие страниц',
      card1Desc:
        'Сайт создается на легком и современном коде без лишней нагрузки. Страницы открываются плавно и комфортно для посетителей с любых телефонов и компьютеров.',
      card1Points: [
        'Удобно читать со смартфона',
        'Быстрая реакция на клики',
        'Без тяжелых зависающих скриптов',
        'Комфортно для посетителей',
      ],
      card2Badge: 'Рекомендации в поиске',
      card2Title: 'Понятная структура для систем поиска',
      card2Desc:
        'Умные поисковые алгоритмы рекомендуют сайты с четкой и логичной структурой. Мы делаем информацию прозрачной и доступной.',
      card2Points: [
        'Понятное описание услуг и цен',
        'Правильные заголовки и тексты',
        'Быстрое чтение страниц поисковыми роботами',
        'Готовность к ответам умных ассистентов',
      ],
      card3Badge: 'Понятный формат',
      card3Title: 'Электронная визитка для роботов',
      card3Desc:
        'Добавляем на сайт специальную разметку-шпаргалку: роботы сразу видят телефон, почту, список услуг и график работы без путаницы.',
      card3Points: [
        'Точные контакты и способы связи',
        'Понятный каталог предложений',
        'Правильное отображение в результатах поиска',
        'Доверие со стороны поисковых систем',
      ],
    },
    portfolio: {
      subtitle: 'Примеры работ',
      title: 'Наши проекты',
      description:
        'Каждый сайт сочетает стильный дизайн, аккуратную подачу информации и удобство для посетителей.',
      ctaBadge: 'Ваш проект',
      ctaTitle: 'Хотите сайт такого же уровня для вашего бизнеса?',
      ctaDesc:
        'Разработаем стильный дизайн, адаптируем под любые экраны и настроим высокую скорость загрузки. Рассчитайте стоимость за пару минут или напишите нам для консультации.',
      ctaDiscuss: 'Обсудить проект',
      ctaEstimate: 'Рассчитать смету',
    },
    reviews: {
      subtitle: 'Реальный опыт',
      title: 'Отзывы наших клиентов',
      description:
        'Честные впечатления владельцев туристических агентств и бизнеса о качестве разработки, соблюдении сроков и поддержке после запуска.',
      badgeVerified: 'Проверенный отзыв',
      viewOriginal: 'Смотреть оригинал ВКонтакте',
      visitSite: 'Перейти на сайт',
      leaveReview: 'Оставить отзыв в ВК',
    },
    calculator: {
      subtitle: 'Предварительный расчет',
      title: 'Калькулятор проекта',
      description:
        'Оцените примерную стоимость и сроки создания сайта. Выберите подходящий тип проекта и нужные опции.',
      step1: '1. Выберите тип сайта:',
      step2: '2. Дополнительные возможности:',
      budgetEst: 'Примерный бюджет:',
      currency: '₽',
      deadline: 'Срок разработки: ~',
      workDays: 'рабочих дней',
      submitBtn: 'Отправить расчет',
      projectTypes: [
        { id: 'landing', name: 'Одностраничный сайт (лендинг)', basePrice: 30000, days: 10 },
        { id: 'corporate', name: 'Многостраничный сайт компании', basePrice: 50000, days: 21 },
        { id: 'templates', name: 'Сайт для туризма или отеля', basePrice: 30000, days: 10 },
        { id: 'ecommerce', name: 'Интернет-магазин с каталогом', basePrice: 75000, days: 30 },
        { id: 'ai-custom', name: 'Чат-боты для бизнеса', basePrice: 30000, days: 7 },
      ],
      addons: [
        { id: '3d', name: 'Плавные анимации и интерактивные элементы', price: 10000, days: 3 },
        { id: 'ai-bot', name: 'Умный помощник в Telegram для консультаций', price: 40000, days: 5 },
        { id: 'multi-lang', name: 'Несколько языков на сайте (RU / EN)', price: 40000, days: 5 },
        { id: 'seo-pro', name: 'Подготовка сайта для поиска и карт', price: 30000, days: 5 },
        { id: 'booking', name: 'Модуль бронирования и оплаты на сайте', price: 50000, days: 14 },
      ],
    },
    faq: {
      subtitle: 'Ответы на вопросы',
      title: 'Часто задаваемые вопросы',
      description:
        'Собрали понятные и честные ответы на ключевые вопросы о создании сайта, этапах работы, гарантиях и оплате.',
      items: [
        {
          id: 'faq-1',
          question: 'Что входит в создание сайта?',
          answer:
            'В создание сайта под ключ входит полный комплекс: маркетинговый анализ вашей ниши и конкурентов, разработка понятной структуры и удобного пути клиента, индивидуальный авторский дизайн всех страниц под мобильные и компьютеры, чистая и скоростная разработка без перегрузки лишними надстройками, базовая поисковая оптимизация и тщательное тестирование на всех типах устройств.',
        },
        {
          id: 'faq-2',
          question: 'Что, если мне не понравится дизайн?',
          answer:
            'Дизайн создается поэтапно и согласуется с вами на каждом шаге. Перед началом работы мы собираем ваши предпочтения и референсы, затем презентуем интерактивную концепцию главной страницы. Все ваши пожелания и правки вносятся до полного утверждения макета, и только после вашего одобрения мы приступаем к коду и верстке.',
        },
        {
          id: 'faq-3',
          question: 'Какие условия оплаты?',
          answer:
            'Стандартный формат сотрудничества — поэтапный: 50% предоплата перед стартом проектирования и дизайна, и оставшиеся 50% — после завершения верстки, полного тестирования и вашей финальной приемки готового проекта. Заключаем официальный договор, предоставляем акты и чеки, принимаем безналичный расчет для ИП и юрлиц, а также банковские карты.',
        },
        {
          id: 'faq-4',
          question: 'Чем сайты и шаблоны NiceDev отличаются от обычных конструкторов?',
          answer:
            'Сайты на стандартных конструкторах перегружены сторонними скриптами, долго открываются на смартфонах и привязаны к ежемесячной абонентской плате сервисов. Все решения NiceDev — и авторские проекты, и готовые шаблоны — создаются на чистом и легковесном коде. Страницы открываются моментально на любых смартфонах, код полностью принадлежит вам, а структура выстроена для максимального доверия клиентов и высоких конверсий.',
        },
        {
          id: 'faq-5',
          question: 'Какие будут у меня дополнительные расходы помимо разработки?',
          answer:
            'Обязательные технические расходы — это только аренда доменного имени (адрес сайта, обычно от 200 до 900 ₽ в год) и оплата хостинга/сервера (от 250 до 800 ₽ в месяц в зависимости от нагрузки). Мы не взимаем никаких скрытых абонентских плат за разработанный код. Дополнительные затраты (например, рекламный бюджет Яндекс.Директ или платная телефония) подключаются исключительно по вашему решению.',
        },
        {
          id: 'faq-6',
          question: 'Какие гарантии вы предоставляете на готовый сайт?',
          answer:
            'Мы предоставляем официальную гарантию 3 месяца на весь разработанный функционал. Если в течение этого срока обнаружится какая-либо техническая ошибка, неточность отображения или сбой в работе форм, мы устраняем их вне очереди и абсолютно бесплатно.',
        },
        {
          id: 'faq-7',
          question: 'Кому будут принадлежать права на сайт и исходный код?',
          answer:
            'Все права на сайт, исходный программный код, графические материалы и утвержденные дизайн-макеты на 100% переходят в вашу собственность сразу после финального расчета. Мы не привязываем вас к закрытым конструкторам: ваш сайт полностью автономен, его можно свободно переносить на любой хостинг или передавать специалистам.',
        },
        {
          id: 'faq-8',
          question: 'Поможете ли вы с настройкой домена и корпоративной почты?',
          answer:
            'Да, мы полностью берем на себя техническую часть: привяжем домен к серверу, подключим бесплатный SSL-сертификат безопасности (HTTPS) и настроим корпоративную почту на вашем домене (например, info@вашсайт.ru).',
        },
      ],
      moreQuestionTitle: 'Остались вопросы по проекту?',
      moreQuestionDesc:
        'Напишите нам или закажите экспресс-консультацию.',
      askBtn: 'Задать вопрос',
    },
    contact: {
      subtitle: 'Прямая консультация',
      title: 'Давайте создадим ваш цифровой проект',
      description:
        'Оставьте заявку на бесплатный экспресс-аудит текущего сайта, расчет подробной сметы или разработку нового проекта с нуля.',
      phoneLabel: 'Телефон и мессенджеры:',
      emailLabel: 'E-mail',
      locationsLabel: 'Формат работы:',
      locationsValue: '100% Online • Работаем с клиентами по всему миру',
      formTitle: 'Заполните форму для связи',
      directPhone: 'WhatsApp',
      formName: 'Ваше имя *',
      formNamePlaceholder: 'Константин',
      nameLabel: 'Ваше имя *',
      namePlaceholder: 'Константин',
      formPhone: 'Номер телефона *',
      formPhonePlaceholder: '+7 (999) 000-00-00',
      phoneInputLabel: 'Номер телефона *',
      phonePlaceholder: '+7 (999) 000-00-00',
      formEmail: 'E-mail *',
      formEmailPlaceholder: 'name@company.ru',
      emailInputLabel: 'E-mail *',
      serviceLabel: 'Тип проекта',
      serviceOptions: [
        { value: 'Корпоративный сайт', label: 'Корпоративный сайт или портал' },
        { value: 'Туризм и Отели', label: 'Сайт для туризма, отеля или глэмпинга' },
        { value: 'E-Commerce', label: 'Интернет-магазин или бутик' },
        { value: 'AI Решение', label: 'Искусственный интеллект или чат-бот' },
        { value: 'UX/UI Редизайн', label: 'UX/UI редизайн и ускорение сайта' },
      ],
      formMessage: 'Сообщение',
      formMessagePlaceholder: 'Опишите ваши цели, пожелания по дизайну или желаемые сроки...',
      messageLabel: 'Сообщение',
      messagePlaceholder: 'Опишите ваши цели, пожелания по дизайну или желаемые сроки...',
      formSubmit: 'Обсудить проект',
      submitBtn: 'Обсудить проект',
      successTitle: 'Спасибо за обращение!',
      successDesc:
        'Мы скоро с вами свяжемся.',
      successClose: 'Понятно',
      sendAnother: 'Отправить еще одну заявку',
      validation: {
        nameRequired: 'Укажите ваше имя (не менее 2 символов)',
        phoneRequired: 'Введите корректный номер телефона (только цифры, +, -)',
        emailInvalid: 'Введите корректный адрес электронной почты (например, name@company.ru)',
        agreementRequired: 'Необходимо дать согласие на обработку персональных данных',
      },
    },
    footer: {
      brandDesc:
        'Студия веб-разработки. Создаем скоростные цифровые проекты на стыке современных технологий, безупречного дизайна и высокой коммерческой конверсии.',
      badgeAstro: 'Высокая скорость',
      badgeTs: 'Безопасность',
      badgeCss: 'Премиум UI',
      navHeading: 'Навигация',
      servicesHeading: 'Экспертиза',
      geoHeading: 'Контакты',
      linkServices: 'Услуги студии',
      linkTourism: 'Шаблоны сайтов',
      linkSpeed: 'Скорость и Core Web Vitals',
      linkPortfolio: 'Портфолио проектов',
      linkCalc: 'Калькулятор бюджета',
      expCorporate: 'Корпоративные порталы',
      expTravel: 'Туристические платформы',
      expEcommerce: 'Интернет-магазины',
      expAI: 'Чат-боты и AI-агенты',
      expGEO: 'Региональное SEO-продвижение',
      locMoscow: 'Консультации и бриф: Telegram / WhatsApp / Zoom',
      locSpb: 'Электронный договор и безопасная онлайн-оплата',
      locAll: 'Работаем с клиентами по всей России, СНГ и миру',
      rights: 'Все права защищены.',
      areaServed: '100% Online • Вся Россия, СНГ и мир',
      backToTop: 'Наверх',
      privacyPolicy: 'Политика конфиденциальности',
      personalDataConsent: 'Согласие на обработку персональных данных',
      cookieSettings: 'Настройки Cookie',
      legalHeading: 'Правовая информация',
      whatsappDisclaimer: '* WhatsApp принадлежит компании Meta Platforms Inc., деятельность которой признана экстремистской и запрещена на территории РФ.',
    },
    notFound: {
      subtitle: 'Код ответа 404',
      title: 'Страница не найдена',
      description:
        'Запрашиваемая страница была перемещена, удалена или вы указали неверный адрес в строке браузера.',
      homeBtn: 'На главную страницу',
      calcBtn: 'Рассчитать стоимость проекта',
      contactBtn: 'Связаться со студией',
      popularHeading: 'Популярные разделы сайта:',
      linkServices: 'Премиальные услуги',
      linkTourism: 'Шаблоны сайтов',
      linkPortfolio: 'Портфолио проектов',
      linkContact: 'Контакты',
    },
    legal: {
      effectiveDate: 'Редакция от 15 сентября 2026 г.',
      jurisdiction:
        'Действует в соответствии с Федеральным законом № 152-ФЗ «О персональных данных» и международными регламентами',
      backToHome: 'Вернуться на главную',
    },
    cookie: {
      bannerText:
        'Мы используем файлы cookie и аналитические инструменты для улучшения работы сайта, оптимизации скорости и персонализации. Вы можете принять все файлы, отказаться от необязательных или настроить категории.',
      acceptAll: 'Принять все',
      rejectNonEssential: 'Отказаться',
      customize: 'Настроить',
      modalTitle: 'Управление файлами Cookie',
      modalDesc:
        'В соответствии с законодательством об обработке персональных данных вы вправе решить, какие категории cookie-файлов разрешить для сбора.',
      savePreferences: 'Сохранить выбор',
      close: 'Закрыть',
      categories: {
        essentialTitle: 'Необходимые (Технические)',
        essentialDesc:
          'Критически важны для функционирования сайта, маршрутизации, безопасности и сохранения темы оформления. Не могут быть отключены.',
        analyticsTitle: 'Аналитические и эксплуатационные',
        analyticsDesc:
          'Помогают оценивать производительность страниц, отклик CDN и показатели Core Web Vitals в обезличенном виде.',
        marketingTitle: 'Маркетинговые и гео-настройки',
        marketingDesc:
          'Используются для сохранения выбранного региона, релевантных региональных предложений и оценки эффективности рекламы.',
      },
    },
    theme: {
      toggleDark: 'Переключить на темную тему',
      toggleLight: 'Переключить на светлую тему',
    },
  },
  en: {
    nav: {
      services: 'Services',
      templates: 'Templates',
      geoSpeed: 'Speed & GEO',
      portfolio: 'Portfolio',
      reviews: 'Reviews',
      calculator: 'Calculator',
      faq: 'FAQ',
      contact: 'Contacts',
      discussProject: 'Discuss Project',
      selectLanguage: 'Select language',
      menu: 'Menu',
    },
    hero: {
      tag: '',
      titleLine1: 'We Build High-Quality',
      titleAccent: 'Websites & Apps for Business',
      description:
        'We develop ultra-fast landing pages, scalable corporate platforms, e-commerce stores, and digital services with intuitive design and instant loading speeds.',
      orderDev: 'Request Development',
      viewPortfolio: 'Explore Portfolio',
      stat1Value: 'Fast',
      stat1Unit: '',
      stat1Label: 'Clean & lightweight code',
      stat2Value: 'Smooth',
      stat2Unit: '',
      stat2Label: 'Zero-delay page loads',
      stat3Value: '50',
      stat3Unit: '+',
      stat3Label: 'Completed projects',
      islandCoreSpeed: 'Fast Performance & Response',
      islandCoreSub: 'Convenient for Users',
      islandLuxury: 'Modern & Stylish Design',
      islandLuxurySub: 'Clean & neat appearance',
      islandHighLoad: 'Reliability & Data Protection',
    },
    services: {
      subtitle: '',
      title: 'Studio Services',
      description:
        'We build websites that attract clients, clearly communicate your services, and work seamlessly on smartphones and computers.',
      orderService: 'Order Service',
      crmNote: '* with seamless integration and real-time CRM synchronization (Bitrix24, amoCRM, HubSpot, etc.)',
      items: [
        {
          id: 'corporate-sites',
          title: 'Corporate Platforms',
          description:
            'Expansive portals and presentation platforms for businesses. Clear architecture, dedicated company sections, and high conversion.',
          features: [
            'Deep content architecture',
            'Schema.org & GEO structured data',
            'Direct CRM & 1C lead synchronization',
          ],
          tags: ['High Reliability', 'Fast Response', 'SEO Optimized', 'Responsive'],
        },
        {
          id: 'mobile-apps',
          title: 'Mobile & Web Applications',
          description:
            'Convenient services and applications tailored for effortless access directly from smartphones and tablets.',
          features: [
            'Fast performance on smartphones',
            'Intuitive user interface',
            'Frictionless user experience',
          ],
          tags: ['Web & Mobile', 'Fast Response', 'User-Friendly'],
        },
        {
          id: 'ecommerce',
          title: 'E-Commerce Boutiques',
          description:
            'High-converting online stores with organized catalogs, smart search, shopping cart, and secure online payments.',
          features: [
            'Instant catalog filtering',
            'Multi-currency checkout & SBP',
            'Customer accounts & order history',
          ],
          tags: ['High-Load', 'Stripe/Cards', 'Smart Search'],
        },
        {
          id: 'ux-ui-design',
          title: 'UX/UI Website Design',
          description:
            'Crafting modern and intuitive visual identities aligned with your brand DNA and tailored to your customers.',
          features: [
            'In-depth usability research',
            'High-fidelity interactive mockups',
            'Fluid animations and transitions',
          ],
          tags: ['Bespoke Style', 'Usability', 'Modern Look'],
        },
        {
          id: 'ai-bots',
          title: 'Smart Chatbots & Assistants',
          description:
            'Automated 24/7 assistants across Telegram, WhatsApp*, and web answering inquiries and processing requests.',
          features: [
            'Answers tailored to your services & price lists',
            'Automated lead qualification for sales',
            'Direct CRM synchronization',
          ],
          tags: ['AI Models', 'Telegram API', 'WhatsApp*', 'Smart Assistants'],
        },
        {
          id: 'tech-support',
          title: '24/7 Technical Support',
          description:
            'Continuous uptime monitoring, domain management, encrypted backups, and security protection.',
          features: [
            'Continuous website health monitoring',
            'Regular encrypted backups',
            'Dedicated technical support',
          ],
          tags: ['Data Protection', 'High Uptime', 'Dedicated Support'],
        },
      ],
    },
    templates: {
      subtitle: 'Ready Solutions for Business',
      title: 'Turnkey Website Templates',
      description:
        'Curated catalog of turnkey website templates starting from 15 000 ₽. Choose a ready-to-launch template for your business: tailored to your brand, typography, and integrated with booking modules in record time.',
      whyHeading: 'Why choose website templates from NiceDev?',
      whyParagraph1:
        'NiceDev designs bespoke website templates engineered with the polish and attention to detail of custom enterprise development. Every layout is crafted for modern digital aesthetics and maximum conversion.',
      whyParagraph2:
        'All templates include flawless mobile responsiveness, lightning-fast load times, and seamless readiness for direct booking engines.',
      whyParagraph3:
        'Order a turnkey template for your business — we will customize it with your branding, populate your content, and launch your live website in days!',
      cards: [
        {
          id: 'audience-needs',
          title: 'Templates for Travel, Hospitality & Services',
          description:
            'Industry-specific templates built around customer psychology, search intent, and intuitive navigation.',
          badge: 'Industry Templates',
        },
        {
          id: 'booking-module',
          title: 'Templates with Direct Booking Engines',
          description:
            'Ready solutions featuring seamless integration with booking engines, tour searches, room reservations, and payments.',
          badge: 'Direct Sales',
        },
        {
          id: 'templates',
          title: 'Turnkey Website Templates from 15 000 ₽',
          description:
            'Order a complete turnkey template starting from 15 000 ₽: bespoke aesthetics and smooth usability without long agency turnaround times.',
          badge: 'Quick Launch',
        },
      ],
      btnPortfolio: 'Explore Portfolio',
      btnOrder: 'Order Template',
      calculateTourPlatform: 'Calculate Project Cost',
    },
    geo: {
      subtitle: 'Search & AI Visibility',
      title: 'GEO — Helping Your Website Get Found and Recommended',
      description:
        'Customers increasingly discover services through smart search and digital assistants. We structure your website clearly so search engines and modern platforms instantly understand your business and suggest it to potential clients.',
      card1Badge: 'Speed & Simplicity',
      card1Title: 'Fast and Smooth Experience',
      card1Desc:
        'Built with clean, lightweight code without unnecessary bloat. Pages open effortlessly and comfortably on any phone or desktop.',
      card1Points: [
        'Comfortable mobile browsing',
        'Quick response on every click',
        'No heavy, lagging scripts',
        'Frictionless user experience',
      ],
      card2Badge: 'Search Visibility',
      card2Title: 'Clear Structure for Search Engines',
      card2Desc:
        'Modern search algorithms favor websites with well-organized content. We present your information clearly so it is easy to find.',
      card2Points: [
        'Clear service and pricing overview',
        'Well-formatted headings and copy',
        'Easy indexing by search crawlers',
        'Ready for voice & AI assistant answers',
      ],
      card3Badge: 'Clear Data Format',
      card3Title: 'Digital Business Card for Web Bots',
      card3Desc:
        'We include structured business data behind the scenes so search engines immediately see your phone, email, services, and working hours without confusion.',
      card3Points: [
        'Accurate contact details',
        'Organized services catalog',
        'Prominent presentation in search results',
        'High trust from search platforms',
      ],
    },
    portfolio: {
      subtitle: 'Portfolio Cases',
      title: 'Our Projects',
      description:
        'Every website combines stylish design, clear content presentation, and effortless usability for visitors.',
      ctaBadge: 'Your Website',
      ctaTitle: 'Want a Website of This Caliber for Your Business?',
      ctaDesc:
        'We craft bespoke web experiences optimized for speed, mobile responsiveness, and high conversion. Calculate an estimate or reach out directly.',
      ctaDiscuss: 'Discuss Your Project',
      ctaEstimate: 'Calculate Estimate',
    },
    reviews: {
      subtitle: 'Client Experience',
      title: 'Client Reviews & Testimonials',
      description:
        'Authentic feedback from travel agency owners and businesses on code quality, deadlines, and ongoing support.',
      badgeVerified: 'Verified Review',
      viewOriginal: 'View Original on VK',
      visitSite: 'Visit Website',
      leaveReview: 'Leave a Review on VK',
    },
    calculator: {
      subtitle: 'Project Estimate',
      title: 'Project Calculator',
      description:
        'Estimate the budget and delivery timeline for your website. Choose your preferred project type and add-on options.',
      step1: '1. Select Website Type:',
      step2: '2. Additional Features:',
      budgetEst: 'Estimated Budget:',
      currency: '$',
      deadline: 'Delivery timeline: ~',
      workDays: 'business days',
      submitBtn: 'Send calculation',
      projectTypes: [
        { id: 'landing', name: 'One-page Website (Landing Page)', basePrice: 370, days: 10 },
        { id: 'corporate', name: 'Multi-page Corporate Website', basePrice: 620, days: 21 },
        { id: 'templates', name: 'Website for Tourism or Hotel', basePrice: 370, days: 10 },
        { id: 'ecommerce', name: 'Online Store with Catalog', basePrice: 900, days: 30 },
        { id: 'ai-custom', name: 'Chatbots for business', basePrice: 380, days: 7 },
      ],
      addons: [
        { id: '3d', name: 'Smooth Animations & Interactive Elements', price: 125, days: 3 },
        { id: 'ai-bot', name: 'Smart Telegram Assistant for Consultations', price: 500, days: 5 },
        { id: 'multi-lang', name: 'Multi-Language Support (RU / EN)', price: 500, days: 5 },
        { id: 'seo-pro', name: 'Search Engine & Maps Optimization', price: 370, days: 5 },
        { id: 'booking', name: 'Online Booking & Payment Module', price: 620, days: 14 },
      ],
    },
    faq: {
      subtitle: 'Clear Answers',
      title: 'Frequently Asked Questions',
      description:
        'Transparent and honest answers to essential questions regarding web development, timelines, guarantees, and pricing terms.',
      items: [
        {
          id: 'faq-1',
          question: 'What is included in custom website development?',
          answer:
            'Turnkey development includes a comprehensive full-cycle process: competitor and market research, intuitive user flow planning, bespoke UI design for mobile and desktop, clean high-speed coding without bloated dependencies, foundational search optimization, and rigorous cross-device testing.',
        },
        {
          id: 'faq-2',
          question: 'What if I do not like the initial design concept?',
          answer:
            'Design is created iteratively and approved step by step. We first align on style references and requirements, then present the interactive design layout. All revisions and adjustments are incorporated until you are completely satisfied before implementation begins.',
        },
        {
          id: 'faq-3',
          question: 'What are the payment terms and milestones?',
          answer:
            'We operate on a transparent milestone structure: 50% deposit prior to UX prototyping and design kick-off, and the remaining 50% upon final testing, preview approval, and handover to your production server. Official contracts, company invoices, and international payment options are fully supported.',
        },
        {
          id: 'faq-4',
          question: 'How do NiceDev websites and templates differ from generic site builders?',
          answer:
            'Websites built on standard builders are weighed down with heavy third-party plugins, load slowly on smartphones, and lock you into recurring monthly platform fees. All NiceDev solutions — both bespoke projects and ready templates — are built on clean, ultra-fast code. Pages open instantaneously on any mobile device, the code is 100% yours, and the structure is crafted for maximum customer trust and high conversion rates.',
        },
        {
          id: 'faq-5',
          question: 'What additional expenses should I anticipate besides development?',
          answer:
            'Mandatory technical overhead is strictly limited to domain name registration (~$15–$30/year) and cloud hosting infrastructure (~$5–$25/month depending on traffic). We never charge hidden recurring licensing fees for our code. Paid ad budgets or external CRM subscriptions remain entirely discretionary.',
        },
        {
          id: 'faq-6',
          question: 'What guarantees and post-launch support do you provide?',
          answer:
            'We provide a 3-month official technical warranty covering all delivered features. Should any bug, layout anomaly, or form submission issue occur during this period, we remediate it promptly and free of charge.',
        },
        {
          id: 'faq-7',
          question: 'Who will own the intellectual property and source code?',
          answer:
            'Upon final settlement, 100% of all intellectual property rights — clean source code, database architecture, domain configuration, and all design assets — are transferred to you. Zero vendor lock-in or proprietary restrictions: you retain complete ownership and operational freedom.',
        },
        {
          id: 'faq-8',
          question: 'Do you assist with domain configuration and corporate email setup?',
          answer:
            'Yes, we take care of all launch logistics: DNS server configuration, HTTPS SSL security certificates, and custom domain-branded email inboxes (e.g. info@yourcompany.com).',
        },
      ],
      moreQuestionTitle: 'Still have questions about your project?',
      moreQuestionDesc:
        'Contact us or request an express consultation.',
      askBtn: 'Ask a Question',
    },
    contact: {
      subtitle: 'Direct Consultation',
      title: "Let's Build Your Digital Masterpiece",
      description:
        'Request a free express audit of your current website, a detailed project estimate, or start building from scratch.',
      phoneLabel: 'Phone & WhatsApp:',
      emailLabel: 'E-mail',
      locationsLabel: 'Working Format:',
      locationsValue: '100% Online • Serving clients worldwide',
      formTitle: 'Request a Consultation',
      directPhone: 'WhatsApp',
      formName: 'Your Name *',
      formNamePlaceholder: 'Alexander',
      nameLabel: 'Your Name *',
      namePlaceholder: 'Alexander',
      formPhone: 'Phone Number *',
      formPhonePlaceholder: '+1 (555) 000-0000',
      phoneInputLabel: 'Phone Number *',
      phonePlaceholder: '+1 (555) 000-0000',
      formEmail: 'E-mail *',
      formEmailPlaceholder: 'name@company.com',
      emailInputLabel: 'E-mail *',
      serviceLabel: 'Project Type',
      serviceOptions: [
        { value: 'Corporate Platform', label: 'Corporate Portal / Enterprise Site' },
        { value: 'Tourism and Hotels', label: 'Travel / Hotel / Booking Platform' },
        { value: 'E-Commerce', label: 'E-Commerce Boutique / Online Store' },
        { value: 'AI Solution', label: 'AI Agent / Bot / LLM Integration' },
        { value: 'UX/UI Redesign', label: 'UX/UI Redesign & Performance Optimization' },
      ],
      formMessage: 'Message',
      formMessagePlaceholder: 'Describe your vision, references, or timeline...',
      messageLabel: 'Message',
      messagePlaceholder: 'Describe your vision, references, or timeline...',
      formSubmit: 'Discuss Project',
      submitBtn: 'Discuss Project',
      successTitle: 'Thank you for reaching out!',
      successDesc:
        'We will contact you shortly.',
      successClose: 'Got it',
      sendAnother: 'Submit another inquiry',
      validation: {
        nameRequired: 'Enter your name (at least 2 characters)',
        phoneRequired: 'Enter a valid phone number (digits, +, - only)',
        emailInvalid: 'Enter a valid email address (e.g. name@company.com)',
        agreementRequired: 'Consent to personal data processing is required',
      },
    },
    footer: {
      brandDesc:
        'High-end digital web studio. Crafting digital masterpieces at the intersection of modern engineering, pristine UX/UI, and maximum conversion rates.',
      badgeAstro: 'High Speed',
      badgeTs: 'Security',
      badgeCss: 'Digital Luxury UI',
      navHeading: 'Navigation',
      servicesHeading: 'Expertise',
      geoHeading: 'Contacts',
      linkServices: 'Studio Services',
      linkTourism: 'Website Templates',
      linkSpeed: 'Speed & Core Web Vitals',
      linkPortfolio: 'Case Studies Portfolio',
      linkCalc: 'Budget Calculator',
      expCorporate: 'Corporate Platforms',
      expTravel: 'Travel & Hotel Ecosystems',
      expEcommerce: 'E-Commerce Boutiques',
      expAI: 'Telegram & AI Agents',
      expGEO: 'GEO & SEO Optimization',
      locMoscow: 'Consultation & Briefing: Telegram / WhatsApp / Zoom',
      locSpb: 'Digital Agreements & Secure Online Payments',
      locAll: 'Serving clients across Russia, CIS, and Internationally',
      rights: 'All rights reserved.',
      areaServed: '100% Online • Russia, CIS & Worldwide',
      backToTop: 'Back to top',
      privacyPolicy: 'Privacy Policy',
      personalDataConsent: 'Personal Data Processing Consent',
      cookieSettings: 'Cookie Preferences',
      legalHeading: 'Legal Information',
      whatsappDisclaimer: '* WhatsApp is owned by Meta Platforms Inc., whose activities are recognized as extremist and banned in the Russian Federation.',
    },
    notFound: {
      subtitle: 'HTTP Error 404',
      title: 'Page Not Found',
      description:
        'The requested page has been relocated, removed, or the address URL was entered incorrectly.',
      homeBtn: 'Back to Homepage',
      calcBtn: 'Calculate Project Budget',
      contactBtn: 'Contact Studio',
      popularHeading: 'Explore Essential Sections:',
      linkServices: 'Studio Services',
      linkTourism: 'Website Templates',
      linkPortfolio: 'Featured Portfolio',
      linkContact: 'Contact Us',
    },
    legal: {
      effectiveDate: 'Effective as of September 15, 2026',
      jurisdiction:
        'Complies with Federal Law No. 152-FZ and International Data Protection Regulations (GDPR)',
      backToHome: 'Back to Home',
    },
    cookie: {
      bannerText:
        'We use cookies and analytical instruments to optimize website performance, improve speed, and personalize content. You can accept all, reject non-essential cookies, or configure your preferences.',
      acceptAll: 'Accept All',
      rejectNonEssential: 'Decline',
      customize: 'Preferences',
      modalTitle: 'Cookie Settings & Consent',
      modalDesc:
        'Under data protection regulations, you retain full control over which categories of cookies and telemetry are allowed.',
      savePreferences: 'Save Preferences',
      close: 'Close',
      categories: {
        essentialTitle: 'Essential (Technical)',
        essentialDesc:
          'Strictly necessary for security, routing, responsive design, and theme persistence. Cannot be disabled.',
        analyticsTitle: 'Analytics & Performance',
        analyticsDesc:
          'Aggregates anonymous telemetry, CDN latency checks, and Core Web Vitals to improve web speed.',
        marketingTitle: 'Marketing & Geo Localization',
        marketingDesc:
          'Remembers selected region preferences and provides relevant regional service insights.',
      },
    },
    theme: {
      toggleDark: 'Switch to Dark Mode',
      toggleLight: 'Switch to Light Mode',
    },
  },
};
