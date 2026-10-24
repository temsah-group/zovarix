/* ============================================================================
 * ZOVARIX — editable site content
 * ----------------------------------------------------------------------------
 * Everything a non-developer is likely to change lives in this one file:
 * studio details, bilingual UI copy, services, principles and projects.
 *
 * Text formatting helpers (handled by <Rich/> in src/components/Rich.jsx):
 *   \n          → line break
 *   *word*      → highlighted (serif / olive) emphasis
 *
 * Every project, name and description below is SAMPLE CONTENT and is meant
 * to be replaced. To add a project, copy one object in `projects` and edit it.
 * ========================================================================== */

export const site = {
  name: 'ZOVARIX',
  email: 'hello@zovarix.studio', // ← replace before publishing
  founded: 2020,
  coordinates: "30° 02' N  31° 14' E",
  // Social links render only when `href` is filled in.
  socials: [
    { label: 'Instagram', href: '' },
    { label: 'Behance', href: '' },
    { label: 'LinkedIn', href: '' },
  ],
};

/* Project categories — used for the Work filters and project badges. */
export const categories = [
  { id: 'web', en: 'Websites', ar: 'مواقع إلكترونية' },
  { id: 'mobile', en: 'Mobile Applications', ar: 'تطبيقات الجوال' },
  { id: 'games', en: 'Games', ar: 'ألعاب' },
];

/* ---------------------------------------------------------------------------
 * Projects (sample content)
 *  - `art` picks one of the CSS-built artworks:
 *      'rasmetak' | 'ghrnata' | 'asl' | 'arabiti' | 'monolith' | 'slowform' | 'dusk'
 *  - `shots: { desktop, mobile }` shows real screenshots in a browser + phone mockup
 *  - `url` (optional) adds a "Visit website" button and a "Live" badge
 *  - `sample: true` marks placeholder projects with a "Sample" badge
 *  - `year` is optional (hidden when empty)
 *  - `nameAr` (optional) is shown instead of `name` on the Arabic site
 *  - set `image: '/work/monolith.webp'` (file in /public/work) to use a real
 *    image instead of the CSS artwork. `imageAlt` is required for real images.
 * ------------------------------------------------------------------------- */
export const projects = [
  /* ----- Live client projects --------------------------------------------
   * `url` adds a "Visit website" button. Review the challenge / approach
   * text below and adjust it to the real project story. */
  {
    id: 'rasmetak',
    name: 'RASMETAK',
    category: 'web',
    year: '',
    url: 'https://rasmetak.com/',
    art: 'rasmetak',
    symbol: '',
    // Real screenshots (files in /public/work). Replace them with fresh captures any time.
    shots: { desktop: '/work/rasmetak-desktop.webp', mobile: '/work/rasmetak-mobile.webp' },
    image: '',
    imageAlt: { en: 'Rasmetak website', ar: 'موقع رسمتك' },
    en: {
      type: 'ART MARKETPLACE · WEBSITE',
      tagline: 'Original art, one click away',
      summary:
        'An online marketplace for original paintings — connecting collectors directly with artists and galleries in Egypt.',
      challenge:
        'Give artists and galleries a simple place to list original work, and give buyers the confidence to discover and buy art online.',
      approach:
        'A calm, gallery-like interface where the artwork leads, with clear artist profiles and a straightforward browse-to-buy journey.',
      deliverables: ['UX & UI design', 'Marketplace development', 'Artist & gallery listings', 'Responsive web'],
      platform: 'Web',
    },
    ar: {
      type: 'منصة فنية · موقع إلكتروني',
      tagline: 'فن أصلي على بُعد نقرة',
      summary: 'سوق إلكتروني للوحات الأصلية — يربط المقتنين مباشرة بالفنانين والمعارض في مصر.',
      challenge: 'منح الفنانين والمعارض مكانًا بسيطًا لعرض أعمالهم الأصلية، ومنح المشترين الثقة لاكتشاف الفن وشرائه عبر الإنترنت.',
      approach: 'واجهة هادئة تشبه المعرض تترك المساحة للعمل الفني، مع ملفات واضحة للفنانين ورحلة شراء مباشرة.',
      deliverables: ['تصميم تجربة وواجهة المستخدم', 'تطوير السوق الإلكتروني', 'صفحات الفنانين والمعارض', 'ويب متجاوب'],
      platform: 'ويب',
    },
  },
  {
    id: 'ghrnata',
    name: 'GHRNATA',
    category: 'web',
    year: '',
    url: 'https://ghrnata.com/',
    art: 'ghrnata',
    symbol: '',
    shots: { desktop: '/work/ghrnata-desktop.webp', mobile: '/work/ghrnata-mobile.webp' },
    image: '',
    imageAlt: { en: 'GHRNATA website', ar: 'موقع غرناطة' },
    en: {
      type: 'COMPANY WEBSITE · MANUFACTURING',
      tagline: 'Aluminium · PVC · Shutters · Wood',
      summary:
        'A company website presenting GHRNATA’s aluminium, PVC, shutter and wood solutions in one clear, product-led experience.',
      challenge: 'Present four product lines clearly so clients can quickly find the right solution and get in touch.',
      approach:
        'A product-led structure, material-focused visuals and a direct enquiry path — built to work just as well on mobile.',
      deliverables: ['Website design', 'Product catalogue', 'Front-end development', 'Responsive web'],
      platform: 'Web',
    },
    ar: {
      type: 'موقع شركة · تصنيع',
      tagline: 'ألوميتال · PVC · شيش حصيرة · خشب',
      summary: 'موقع شركة يعرض حلول غرناطة في الألوميتال وPVC والشيش والخشب ضمن تجربة واضحة تتمحور حول المنتجات.',
      challenge: 'عرض أربعة خطوط منتجات بوضوح ليصل العميل سريعًا إلى الحل المناسب ويتواصل مباشرة.',
      approach: 'بنية تتمحور حول المنتجات، وعناصر بصرية تُبرز الخامات، ومسار تواصل مباشر — يعمل بالكفاءة نفسها على الجوال.',
      deliverables: ['تصميم الموقع', 'كتالوج المنتجات', 'تطوير الواجهات', 'ويب متجاوب'],
      platform: 'ويب',
    },
  },

  {
    id: 'asl',
    name: 'ASL',
    nameAr: 'أصل',
    category: 'mobile',
    year: '2026',
    url: '', // add the App Store / Google Play link here when it is published
    art: 'asl',
    symbol: '',
    // Real app screenshots (files in /public/work): shown as three phones.
    shots: { phones: ['/work/asl-splash.webp', '/work/asl-home.webp', '/work/asl-onboarding.webp'] },
    image: '',
    imageAlt: { en: 'Asl real estate app', ar: 'تطبيق أصل للعقارات' },
    en: {
      type: 'MOBILE APPLICATION · REAL ESTATE',
      tagline: 'Every property has its roots',
      summary:
        'An all-in-one platform for trading real estate assets in Egypt and Saudi Arabia — residential, commercial, industrial and land — with live auctions, listings with photos, video and instalment plans, map-based locations and secure phone or email sign-in.',
      challenge:
        'Build a property marketplace people can trust — verified accounts, listings reviewed before they go live, and uploads that survive weak mobile networks.',
      approach:
        'A Flutter app for iOS and Android with phone/email OTP sign-in and identity verification, duplicate-safe uploads that resume after network drops, a map-based location picker, and Arabic and English that follow the device language.',
      deliverables: [
        'Flutter app (iOS & Android)',
        'Live auctions & listings',
        'Map location picker',
        'OTP sign-in & verification',
        'Arabic / English',
      ],
      platform: 'iOS · Android (Flutter)',
    },
    ar: {
      type: 'تطبيق جوال · عقارات',
      tagline: 'كل عقار له أصل',
      summary:
        'منصة متكاملة لتداول الأصول العقارية في مصر والسعودية — سكني وتجاري وصناعي وأراضٍ — بمزادات مباشرة، وإعلانات بالصور والفيديو وخطط التقسيط، وتحديد المواقع على الخريطة، وتسجيل دخول آمن بالهاتف أو البريد.',
      challenge:
        'بناء سوق عقارات يثق به الناس — حسابات موثقة، وإعلانات تُراجَع قبل نشرها، ورفع ملفات يصمد أمام شبكات الجوال الضعيفة.',
      approach:
        'تطبيق Flutter لـ iOS وAndroid بتسجيل دخول برمز التحقق (OTP) وتوثيق للهوية، ورفع آمن من التكرار يستكمل بعد انقطاع الشبكة، واختيار الموقع على الخريطة، وواجهة عربية وإنجليزية تتبع لغة الجهاز.',
      deliverables: [
        'تطبيق Flutter (iOS وAndroid)',
        'المزادات المباشرة والإعلانات',
        'اختيار الموقع على الخريطة',
        'دخول برمز التحقق وتوثيق الحساب',
        'عربي / إنجليزي',
      ],
      platform: 'iOS · Android (Flutter)',
    },
  },

  {
    id: 'arabiti',
    name: 'ARABITI',
    nameAr: 'عربيتي',
    category: 'mobile',
    year: '',
    url: '', // add the App Store / Google Play link here when it is published
    art: 'arabiti',
    symbol: '',
    // Real app screenshots (files in /public/work). The splash screen is a design
    // made for the site; the account screenshot has the e-mail address hidden.
    shots: { phones: ['/work/arabiti-splash.webp', '/work/arabiti-home.webp', '/work/arabiti-account.webp'] },
    image: '',
    imageAlt: { en: 'Arabiti car parts app', ar: 'تطبيق عربيتي لقطع الغيار' },
    en: {
      type: 'MOBILE APPLICATION · AUTO PARTS',
      tagline: 'Find the part that fits your car',
      summary:
        'A marketplace app for car spare parts: add your car to see only the parts that fit, search by part name or number, filter new, used or imported parts, and buy from trusted sellers — or open your own shop.',
      challenge:
        'Help drivers find the right part for their exact car among thousands of listings from many different sellers.',
      approach:
        'Car-aware search that filters by the user’s saved cars, clear categories (engine, brakes, suspension, electrical), seller shops with reviews, weekly deals, and Arabic and English.',
      deliverables: ['Mobile UX & UI', 'iOS & Android app', 'Car-fit search & filters', 'Seller shops & reviews', 'Arabic / English'],
      platform: 'iOS · Android',
    },
    ar: {
      type: 'تطبيق جوال · قطع غيار',
      tagline: 'القطعة المناسبة لعربيتك',
      summary:
        'سوق إلكتروني لقطع غيار السيارات: أضف عربيتك لتظهر لك القطع المناسبة لها فقط، وابحث باسم القطعة أو رقمها، وفلتر بين الجديد والمستعمل والمستورد، واشترِ من بائعين موثوقين — أو افتح متجرك الخاص.',
      challenge: 'مساعدة السائقين على الوصول للقطعة الصحيحة لعربيتهم بالتحديد وسط آلاف الإعلانات من بائعين كثيرين.',
      approach:
        'بحث يعرف عربيتك ويفلتر حسب السيارات المحفوظة، وأقسام واضحة (المحرك، الفرامل، العفشة، الكهرباء)، ومتاجر للبائعين بتقييمات، وعروض أسبوعية، ودعم للعربية والإنجليزية.',
      deliverables: ['تصميم تجربة وواجهة الجوال', 'تطبيق iOS وAndroid', 'بحث وفلاتر حسب العربية', 'متاجر البائعين والتقييمات', 'عربي / إنجليزي'],
      platform: 'iOS · Android',
    },
  },

  /* ----- Sample projects (placeholders — replace or delete) ------------- */
  {
    id: 'monolith',
    sample: true,
    name: 'MONOLITH',
    category: 'web',
    year: '2025',
    art: 'monolith',
    symbol: 'M',
    image: '',
    imageAlt: { en: '', ar: '' },
    en: {
      type: 'DIGITAL FLAGSHIP · WEBSITE',
      tagline: 'An architecture of stillness',
      summary:
        'A flagship website for an architecture practice — slow, spacious and built around the work itself.',
      challenge:
        'Present a large, image-heavy portfolio without losing the calm, gallery-like feeling of the studio’s buildings.',
      approach:
        'A restrained grid, long-form project stories and a lightweight CMS so the team can publish new work in minutes.',
      deliverables: ['Art direction', 'UX & UI design', 'Front-end development', 'Headless CMS'],
      platform: 'Web · CMS',
    },
    ar: {
      type: 'موقع رئيسي · منصة رقمية',
      tagline: 'عمارة من السكون',
      summary: 'موقع رئيسي لمكتب معماري — هادئ، رحب، ومبني حول الأعمال نفسها.',
      challenge: 'عرض أرشيف كبير غني بالصور دون أن يفقد الموقع إحساس المعرض الهادئ الذي تتميز به مباني المكتب.',
      approach: 'شبكة متزنة، وقصص مشاريع مطوّلة، ونظام إدارة محتوى خفيف يتيح للفريق نشر الأعمال الجديدة في دقائق.',
      deliverables: ['التوجيه الفني', 'تصميم تجربة وواجهة المستخدم', 'تطوير الواجهات', 'نظام إدارة محتوى'],
      platform: 'ويب · نظام إدارة محتوى',
    },
  },
  {
    id: 'slowform',
    sample: true,
    name: 'SLOWFORM',
    category: 'mobile',
    year: '2024',
    art: 'slowform',
    symbol: '◉',
    image: '',
    imageAlt: { en: '', ar: '' },
    en: {
      type: 'MOBILE APPLICATION · WELLNESS',
      tagline: 'A gentler daily rhythm',
      summary: 'A calm wellness companion that replaces streaks and pressure with small, mindful daily moments.',
      challenge: 'Design habit-building that feels encouraging rather than demanding — and keeps people coming back.',
      approach:
        'Soft rituals, offline-first sessions and subtle haptics, shipped natively for iOS and Android from a shared design system.',
      deliverables: ['Product strategy', 'Mobile UX & UI', 'iOS & Android development', 'Design system'],
      platform: 'iOS · Android',
    },
    ar: {
      type: 'تطبيق جوال · عافية',
      tagline: 'إيقاع يومي ألطف',
      summary: 'رفيق هادئ للعافية يستبدل الضغط والأرقام المتتالية بلحظات يومية صغيرة وواعية.',
      challenge: 'تصميم بناء العادات بطريقة مشجعة لا مُرهِقة — تجعل المستخدم يعود من تلقاء نفسه.',
      approach: 'طقوس لطيفة، وجلسات تعمل دون اتصال، واهتزازات دقيقة، بتطبيقين أصليين لـ iOS وAndroid من نظام تصميم موحد.',
      deliverables: ['استراتيجية المنتج', 'تصميم تجربة وواجهة الجوال', 'تطوير iOS وAndroid', 'نظام تصميم'],
      platform: 'iOS · Android',
    },
  },
  {
    id: 'dust-and-dusk',
    sample: true,
    name: 'DUST & DUSK',
    category: 'games',
    year: '2023',
    art: 'dusk',
    symbol: '✳',
    image: '',
    imageAlt: { en: '', ar: '' },
    en: {
      type: 'INTERACTIVE GAME · WORLD-BUILDING',
      tagline: 'A world made of little wonders',
      summary: 'A quiet exploration game set in a desert at dusk, where every dune hides a small discovery.',
      challenge: 'Build an atmospheric world that runs smoothly in the browser and on modest hardware.',
      approach:
        'Hand-tuned lighting, procedural dunes and a soundscape that reacts to the player — optimised for 60 fps on the web.',
      deliverables: ['Game concept', 'World & level design', 'Real-time 3D development', 'Sound direction'],
      platform: 'Web · PC',
    },
    ar: {
      type: 'لعبة تفاعلية · بناء عوالم',
      tagline: 'عالم من العجائب الصغيرة',
      summary: 'لعبة استكشاف هادئة في صحراء عند الغروب، حيث يخفي كل كثيب اكتشافًا صغيرًا.',
      challenge: 'بناء عالم غني بالأجواء يعمل بسلاسة داخل المتصفح وعلى الأجهزة المتوسطة.',
      approach: 'إضاءة مضبوطة يدويًا، وكثبان مولّدة إجرائيًا، ومشهد صوتي يتفاعل مع اللاعب — بأداء ٦٠ إطارًا في الثانية على الويب.',
      deliverables: ['فكرة اللعبة', 'تصميم العالم والمراحل', 'تطوير ثلاثي الأبعاد في الوقت الحقيقي', 'التوجيه الصوتي'],
      platform: 'ويب · حاسوب',
    },
  },
];

/* ---------------------------------------------------------------------------
 * UI copy — one object per language. Keys must match between `en` and `ar`.
 * ------------------------------------------------------------------------- */
export const copy = {
  en: {
    meta: {
      title: 'ZOVARIX® — Digital studio',
      description:
        'ZOVARIX — an independent digital studio crafting websites, mobile applications and games.',
    },
    skip: 'Skip to content',
    nav: { work: 'Work', services: 'Services', studio: 'Studio', contact: 'Contact' },
    cta: 'Start a project',
    menu: { open: 'Open menu', close: 'Close menu', label: 'Main navigation' },
    langSwitch: { label: 'عربي', aria: 'التبديل إلى العربية' },

    hero: {
      eyebrow: 'INDEPENDENT DIGITAL STUDIO · EST. 2020',
      kicker: 'DESIGN · TECHNOLOGY · PLAY',
      title: 'We make\ndigital *matter.*',
      intro: 'A creative studio shaping meaningful digital experiences — from first spark to final pixel.',
      explore: 'Scroll to explore',
      exploreAria: 'Scroll to selected work',
      viewWork: 'View our work',
      sculptureAria: 'Interactive 3D sculpture — move your pointer to tilt it.',
    },

    marquee: ['Websites', 'Mobile Applications', 'Games', 'Digital products', 'Interactive worlds'],

    work: {
      eyebrow: 'SELECTED WORK',
      micro: 'A SHORT SELECTION',
      title: 'A few things\nwe’ve *made.*',
      filterLabel: 'Filter projects by category',
      all: 'All',
      view: 'View project',
      sample: 'Projects marked “Sample” are placeholders ready to replace.',
      sampleTag: 'Sample',
      live: 'Live',
      visit: 'Visit website',
      empty: 'New projects in this category are on the way.',
    },

    project: {
      overview: 'Overview',
      challenge: 'Challenge',
      approach: 'Approach',
      deliverables: 'Deliverables',
      platform: 'Platform',
      year: 'Year',
      category: 'Category',
      close: 'Close',
      next: 'Next project',
      enquire: 'Start a similar project',
      sample: 'Sample case study — replace with the real project story.',
    },

    services: {
      eyebrow: 'WHAT WE DO',
      title: 'Ideas into\n*experiences.*',
      list: [
        {
          n: '01',
          name: 'Websites & digital products',
          detail: 'Websites, platforms & e-commerce',
          items: ['Brand & marketing sites', 'Web platforms', 'E-commerce', 'CMS & integrations'],
        },
        {
          n: '02',
          name: 'Mobile applications',
          detail: 'iOS & Android applications',
          items: ['Product discovery', 'Native & cross-platform', 'Design systems', 'App store launch'],
        },
        {
          n: '03',
          name: 'Games & interactive worlds',
          detail: 'Interactive experiences & play',
          items: ['Browser & PC games', 'Real-time 3D / WebGL', 'Playable campaigns', 'Installations'],
        },
      ],
      processTitle: 'How we work',
      process: [
        ['Discover', 'Questions, research and a clear brief.'],
        ['Design', 'Concepts, prototypes and a visual language.'],
        ['Build', 'Careful engineering, tested on real devices.'],
        ['Launch & grow', 'Release, measure and keep improving.'],
      ],
    },

    studio: {
      eyebrow: 'SMALL STUDIO. BIG PICTURE.',
      title: 'Good work starts\nwith *good questions.*',
      text:
        'We bring strategy, design and technology together to build digital things that feel considered, work beautifully and stay with you.',
      location: 'CAIRO · EVERYWHERE',
      principles: [
        ['Clarity first', 'We simplify before we decorate.'],
        ['Crafted detail', 'Every interaction is designed on purpose.'],
        ['Built to perform', 'Fast, accessible and ready for every screen.'],
      ],
    },

    contact: {
      eyebrow: 'HAVE A GOOD ONE IN MIND?',
      title: 'Let’s make\nit *real.*',
      lead: 'Tell us a little about your idea. We usually reply within two working days.',
      form: {
        name: 'Your name',
        email: 'Email address',
        type: 'Project type',
        types: ['Website', 'Mobile app', 'Game', 'Something else'],
        budget: 'Budget (optional)',
        budgets: ['Not sure yet', 'Under $10k', '$10k – $30k', '$30k – $80k', '$80k +'],
        message: 'About the project',
        messageHint: 'Goals, timeline, links — anything helpful.',
        submit: 'Send enquiry',
        sending: 'Opening your email app…',
        sent: 'Your email app should now be open with the message ready. If not, write to us directly at',
        required: 'Please fill in the highlighted fields.',
      },
      orEmail: 'Or write to us directly',
    },

    footer: {
      tagline: 'INDEPENDENT BY NATURE. INTENTIONAL BY DESIGN.',
      top: 'Back to top ↑',
    },
  },

  ar: {
    meta: {
      title: 'ZOVARIX® — استوديو رقمي',
      description: 'ZOVARIX — استوديو رقمي مستقل يصمم ويطوّر المواقع الإلكترونية وتطبيقات الجوال والألعاب.',
    },
    skip: 'تخطَّ إلى المحتوى',
    nav: { work: 'الأعمال', services: 'الخدمات', studio: 'الاستوديو', contact: 'تواصل' },
    cta: 'ابدأ مشروعًا',
    menu: { open: 'فتح القائمة', close: 'إغلاق القائمة', label: 'التنقل الرئيسي' },
    langSwitch: { label: 'EN', aria: 'Switch to English' },

    hero: {
      eyebrow: 'استوديو رقمي مستقل · منذ ٢٠٢٠',
      kicker: 'استوديو إبداعي متعدد التخصصات',
      title: 'نصنع\nرقميًا *يُلامس.*',
      intro: 'استوديو إبداعي يصمم تجارب رقمية مؤثرة — من أول فكرة إلى آخر تفصيلة.',
      explore: 'اكتشف المزيد',
      exploreAria: 'انتقل إلى الأعمال المختارة',
      viewWork: 'شاهد أعمالنا',
      sculptureAria: 'مجسم ثلاثي الأبعاد تفاعلي — حرّك المؤشر لإمالته.',
    },

    marquee: ['مواقع إلكترونية', 'تطبيقات الجوال', 'ألعاب', 'منتجات رقمية', 'عوالم تفاعلية'],

    work: {
      eyebrow: 'أعمال مختارة',
      micro: 'مختارات من أعمالنا',
      title: 'أفكار\n*أصبحت واقعًا.*',
      filterLabel: 'تصفية المشاريع حسب الفئة',
      all: 'الكل',
      view: 'اكتشف المشروع',
      sample: 'المشاريع المعلَّمة بـ «تجريبي» أمثلة أولية قابلة للاستبدال.',
      sampleTag: 'تجريبي',
      live: 'مباشر',
      visit: 'زيارة الموقع',
      empty: 'مشاريع جديدة في هذه الفئة قريبًا.',
    },

    project: {
      overview: 'نظرة عامة',
      challenge: 'التحدي',
      approach: 'المنهجية',
      deliverables: 'المخرجات',
      platform: 'المنصة',
      year: 'السنة',
      category: 'الفئة',
      close: 'إغلاق',
      next: 'المشروع التالي',
      enquire: 'ابدأ مشروعًا مشابهًا',
      sample: 'دراسة حالة تجريبية — استبدلها بقصة المشروع الحقيقية.',
    },

    services: {
      eyebrow: 'ماذا نقدم',
      title: 'من الفكرة\n*إلى التجربة.*',
      list: [
        {
          n: '٠١',
          name: 'مواقع ومنتجات رقمية',
          detail: 'مواقع ومنصات ومتاجر إلكترونية',
          items: ['مواقع العلامات والتسويق', 'منصات ويب', 'متاجر إلكترونية', 'أنظمة المحتوى والتكامل'],
        },
        {
          n: '٠٢',
          name: 'تطبيقات الجوال',
          detail: 'تطبيقات iOS وAndroid',
          items: ['استكشاف المنتج', 'تطبيقات أصلية ومتعددة المنصات', 'أنظمة التصميم', 'الإطلاق في المتاجر'],
        },
        {
          n: '٠٣',
          name: 'ألعاب وعوالم تفاعلية',
          detail: 'تجارب تفاعلية وألعاب',
          items: ['ألعاب المتصفح والحاسوب', 'رسوميات ثلاثية الأبعاد / WebGL', 'حملات تفاعلية', 'تجارب وتركيبات'],
        },
      ],
      processTitle: 'كيف نعمل',
      process: [
        ['الاكتشاف', 'أسئلة وبحث وموجز واضح.'],
        ['التصميم', 'أفكار ونماذج أولية ولغة بصرية.'],
        ['التطوير', 'هندسة دقيقة مختبرة على أجهزة حقيقية.'],
        ['الإطلاق والنمو', 'إطلاق وقياس وتحسين مستمر.'],
      ],
    },

    studio: {
      eyebrow: 'استوديو صغير. رؤية كبيرة.',
      title: 'العمل المميز\nيبدأ بـ *سؤال جيد.*',
      text: 'نجمع بين الاستراتيجية والتصميم والتقنية لنصنع تجارب رقمية مدروسة، جميلة في الاستخدام، وتبقى في الذاكرة.',
      location: 'القاهرة · وكل مكان',
      principles: [
        ['الوضوح أولًا', 'نُبسّط قبل أن نُزيّن.'],
        ['تفاصيل متقنة', 'كل تفاعل مصمم عن قصد.'],
        ['أداء يُعتمد عليه', 'سريع، متاح للجميع، وجاهز لكل شاشة.'],
      ],
    },

    contact: {
      eyebrow: 'لديك فكرة تستحق الحياة؟',
      title: 'لنصنعها\n*معًا.*',
      lead: 'أخبرنا قليلًا عن فكرتك، وعادةً نرد خلال يومي عمل.',
      form: {
        name: 'الاسم',
        email: 'البريد الإلكتروني',
        type: 'نوع المشروع',
        types: ['موقع إلكتروني', 'تطبيق جوال', 'لعبة', 'شيء آخر'],
        budget: 'الميزانية (اختياري)',
        budgets: ['لم أحدد بعد', 'أقل من ١٠ آلاف دولار', '١٠ – ٣٠ ألف دولار', '٣٠ – ٨٠ ألف دولار', 'أكثر من ٨٠ ألف دولار'],
        message: 'عن المشروع',
        messageHint: 'الأهداف، الجدول الزمني، روابط — أي شيء مفيد.',
        submit: 'أرسل الطلب',
        sending: 'جارٍ فتح تطبيق البريد…',
        sent: 'يُفترض أن تطبيق البريد قد فُتح والرسالة جاهزة. إن لم يحدث ذلك، راسلنا مباشرة على',
        required: 'يُرجى تعبئة الحقول المحددة.',
      },
      orEmail: 'أو راسلنا مباشرة',
    },

    footer: {
      tagline: 'مستقلون بطبعنا. نصمم بقصد.',
      top: 'للأعلى ↑',
    },
  },
};
