import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import aeiLogo from './assets/client-logos/aei.png';
import lazovskiyLogo from './assets/client-logos/lazovskiy.png';
import promplanLogo from './assets/client-logos/promplan.svg';
import prixKnightSvg from './assets/prix-knight.svg?raw';
import russianIndustrialistLogo from './assets/client-logos/russian-industrialist.png';
import sdelanoKhvLogo from './assets/client-logos/sdelano-khv.svg';
import tamashiLogo from './assets/client-logos/tamashi.svg';
import vbiLogo from './assets/client-logos/vbi.svg';
import './App.css';

type CaseLogo = {
  image?: string;
  alt: string;
  label: string;
  variant: string;
};

const stats = [
  { value: '8', label: 'лет в коммуникациях' },
  { value: '100+', label: 'проектов в разных нишах' },
  { value: '3', label: 'страны присутствия' },
  { value: '100M+', label: 'охватов каждый месяц' },
];

const certificates = [
  { label: 'Роспром', caseIndex: 0 },
  { label: 'АЭИ', caseIndex: 1 },
  { label: 'Промплан', caseIndex: 2 },
];

const portfolio = [
  {
    company: 'Официальный медиа партнер форума “Российский промышленник”',
    type: 'Промышленность / репутация',
    logo: {
      image: russianIndustrialistLogo,
      alt: 'Логотип форума Российский промышленник',
      label: 'РП',
      variant: 'russian-industrialist',
    },
    publications: [
      'Комплексное освещение мероприятий под ключ',
      'Формирование федеральной информационной повестки',
      'Медиасопровождение первых лиц и ключевых спикеров',
    ],
  },
  {
    company: 'АЭИ',
    type: 'Ассоциации / BRICS',
    logo: {
      image: aeiLogo,
      alt: 'Логотип АЭИ',
      label: 'АЭИ',
      variant: 'aei',
    },
    publications: [
      'Ежемесячный охват — более 40 млн человек',
      'Эфиры на Первом канале и телеканале «Россия 1»',
      'Более 1000 упоминаний в ведущих СМИ страны',
    ],
  },
  {
    company: 'Промплан',
    type: 'B2B / медиа-сопровождение',
    logo: {
      image: promplanLogo,
      alt: 'Логотип Промплан',
      label: 'Промплан',
      variant: 'promplan',
    },
    publications: [
      'Публикации в топ-СМИ уже с первого месяца',
      'Системное формирование экспертного позиционирования',
      'Укрепление деловой репутации через федеральную повестку',
    ],
  },
  {
    company: 'Андрей Коган',
    type: 'Топ-менеджер / импорт из Китая / экспертные колонки',
    logo: {
      alt: 'Андрей Коган',
      label: 'АК',
      variant: 'andrey-kogan',
    },
    publications: [
      'Статус федерального эксперта по импорту из Китая за два месяца',
      'Публикации в топ-СМИ в первую неделю сотрудничества',
      'Лидер федеральной повестки по логистике из Китая',
      'Регулярные выходы в РГ, Lenta.ru, «Известиях» и «Комсомольской правде»',
    ],
  },
  {
    company: 'Tamashi',
    type: 'Автомобильный бренд / федеральные СМИ',
    logo: {
      image: tamashiLogo,
      alt: 'Логотип Tamashi',
      label: 'Tamashi',
      variant: 'tamashi',
    },
    publications: [
      '70+ публикаций и 1000+ упоминаний',
      '35+ млн охвата за март 2026',
      'Экспертная линия и автоспорт в федеральной повестке',
    ],
  },
  {
    company: 'Сделано в Хабаровском крае',
    type: 'GR / открытие флагманского центра',
    logo: {
      image: sdelanoKhvLogo,
      alt: 'Логотип Сделано в Хабаровском крае',
      label: 'ХК',
      variant: 'sdelano-khv',
    },
    publications: [
      'Прогрев и федеральное освещение открытия',
      'Коммуникация с ТАСС, РИА Новости и АиФ',
      'Акцент на регионе, культуре и пространстве',
    ],
  },
];

const partners = [
  {
    name: 'Дом Лазовского',
    href: 'https://lazovskiy.ru/',
    logo: lazovskiyLogo,
    alt: 'Логотип Дом Лазовского',
  },
  {
    name: 'Цифровое маркетинговое агентство VBI',
    href: 'https://vbi.ru/',
    logo: vbiLogo,
    alt: 'Логотип VBI',
  },
  {
    name: 'Ассоциация экспортёров и импортёров',
    href: 'https://exporterimporter.ru/',
    logo: aeiLogo,
    alt: 'Логотип Ассоциации экспортёров и импортёров',
  },
];

function splitStatValue(value: string) {
  const match = value.match(/^(\d+)(.*)$/);

  if (!match) {
    return { target: 0, suffix: value };
  }

  return {
    target: Number(match[1]),
    suffix: match[2],
  };
}

function AnimatedStatCard({ value, label }: { value: string; label: string }) {
  const cardRef = useRef<HTMLElement | null>(null);
  const [hasEntered, setHasEntered] = useState(false);
  const [displayValue, setDisplayValue] = useState(0);
  const { target, suffix } = splitStatValue(value);

  useEffect(() => {
    const card = cardRef.current;

    if (!card) {
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const runCounter = () => {
      setHasEntered(true);

      if (prefersReducedMotion) {
        setDisplayValue(target);
        return;
      }

      const duration = 1100;
      const startedAt = performance.now();

      const tick = (now: number) => {
        const progress = Math.min((now - startedAt) / duration, 1);
        const eased = 1 - (1 - progress) ** 3;
        setDisplayValue(Math.round(target * eased));

        if (progress < 1) {
          window.requestAnimationFrame(tick);
        }
      };

      window.requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          runCounter();
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(card);

    return () => observer.disconnect();
  }, [target]);

  return (
    <article ref={cardRef} className={hasEntered ? 'is-visible' : ''}>
      <strong>
        {displayValue}
        {suffix}
      </strong>
      <span>{label}</span>
    </article>
  );
}

function CaseLogoMark({ logo }: { logo: CaseLogo }) {
  return (
    <div
      className={`case-logo-mark case-logo-mark-${logo.variant} ${
        logo.image ? 'case-logo-mark-image' : 'case-logo-mark-text'
      }`}
    >
      {logo.image ? <img src={logo.image} alt={logo.alt} loading="lazy" /> : <span>{logo.label}</span>}
    </div>
  );
}

function ThreeKnightScene() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) {
      return undefined;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 0.08, 9.8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const textures: THREE.Texture[] = [];
    const materials: THREE.Material[] = [];
    const logoGroup = new THREE.Group();
    const logoWidth = 4.35;
    const logoHeight = logoWidth * (398 / 314);
    const logoGeometry = new THREE.PlaneGeometry(logoWidth, logoHeight, 1, 1);
    const textureLoader = new THREE.TextureLoader();
    const toDataUrl = (svg: string) => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
    const padSvgViewBox = (svg: string) =>
      svg.replace(
        /<svg width="314" height="398" viewBox="0 0 314 398"/,
        '<svg width="374" height="468" viewBox="-30 -35 374 468"',
      );
    const buildGradientSvg = () =>
      padSvgViewBox(prixKnightSvg)
        .replace(
          /<svg([^>]*)>/,
          `<svg$1><defs><linearGradient id="prixMetal" x1="34" y1="22" x2="284" y2="386" gradientUnits="userSpaceOnUse"><stop stop-color="#ffffff"/><stop offset="0.22" stop-color="#a7abb1"/><stop offset="0.5" stop-color="#151515"/><stop offset="0.78" stop-color="#5c626a"/><stop offset="1" stop-color="#f2f4f5"/></linearGradient></defs>`,
        )
        .replace(/fill="white"/g, 'fill="url(#prixMetal)"');
    const buildSolidSvg = (fill: string) =>
      padSvgViewBox(prixKnightSvg).replace(/fill="white"/g, `fill="${fill}"`);
    const loadSvgTexture = (svg: string) => {
      const texture = textureLoader.load(toDataUrl(svg));
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = 8;
      textures.push(texture);
      return texture;
    };

    const depthTexture = loadSvgTexture(buildSolidSvg('#5d3715'));
    const frontTexture = loadSvgTexture(buildGradientSvg());

    for (let index = 8; index >= 1; index -= 1) {
      const material = new THREE.MeshBasicMaterial({
        map: depthTexture,
        transparent: true,
        color: '#1f2024',
        opacity: 0.82,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      materials.push(material);
      const layer = new THREE.Mesh(logoGeometry, material);
      layer.position.set(index * 0.028, -index * 0.018, -index * 0.05);
      layer.renderOrder = index;
      logoGroup.add(layer);
    }

    const frontMaterial = new THREE.MeshBasicMaterial({
      map: frontTexture,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    materials.push(frontMaterial);
    const frontLogo = new THREE.Mesh(logoGeometry, frontMaterial);
    frontLogo.renderOrder = 20;
    logoGroup.add(frontLogo);

    logoGroup.rotation.y = -0.24;
    logoGroup.rotation.x = 0.02;
    group.add(logoGroup);

    const ambient = new THREE.AmbientLight('#fff3d1', 1.2);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight('#fff2bf', 2.8);
    keyLight.position.set(-3.2, 4.4, 4.8);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const rimLight = new THREE.PointLight('#f6f1e6', 2.1, 9);
    rimLight.position.set(2.6, -0.4, 2.6);
    scene.add(rimLight);

    const pointer = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      target.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      target.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    const resize = () => {
      const width = mount.clientWidth || 320;
      const height = mount.clientHeight || 320;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    resize();
    mount.addEventListener('pointermove', handlePointerMove);

    let frame = 0;
    let animationId = 0;
    const animate = () => {
      frame += 0.018;
      pointer.x += (target.x - pointer.x) * 0.06;
      pointer.y += (target.y - pointer.y) * 0.06;
      group.rotation.y = -0.2 + pointer.x * 0.22 + Math.sin(frame) * 0.04;
      group.rotation.x = pointer.y * 0.1 + Math.sin(frame * 0.8) * 0.025;
      group.position.y = Math.sin(frame * 1.3) * 0.05;
      renderer.render(scene, camera);
      animationId = window.requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.cancelAnimationFrame(animationId);
      mount.removeEventListener('pointermove', handlePointerMove);
      resizeObserver.disconnect();
      mount.removeChild(renderer.domElement);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
        }
      });
      textures.forEach((texture) => texture.dispose());
      materials.forEach((material) => material.dispose());
      renderer.dispose();
    };
  }, []);

  return <div className="three-knight" ref={mountRef} aria-hidden="true" />;
}

const prhubServices = [
  {
    title: 'Работа с лидерами мнений',
    text: 'Подбираем релевантных экспертов и инфлюенсеров, которые усиливают доверие к бренду и помогают говорить с нужной аудиторией.',
  },
  {
    title: 'Креативная поддержка',
    text: 'Разрабатываем идеи, форматы и спецпроекты, которые органично встраиваются в медиаповестку и вызывают интерес редакций.',
  },
  {
    title: 'Подкасты и конференции',
    text: 'Помогаем экспертам попадать в отраслевые события, подкасты, дискуссии, круглые столы и публичные форматы.',
  },
  {
    title: 'Репутация C-level',
    text: 'Упаковываем публичный образ руководителей: интервью, колонки, комментарии, экспертные позиции и личный бренд.',
  },
  {
    title: 'Работа со СМИ',
    orbitLabel: 'SMM',
    text: 'Выстраиваем отношения с редакциями, питчим темы, готовим комментарии, статьи и новости под интересы аудитории.',
  },
  {
    title: 'PR-стратегия',
    text: 'Формируем дорожную карту продвижения: медиалист, ключевые темы, форматы, KPI и ритм коммуникаций.',
  },
];

const prhubApproach = [
  ['01', 'Стартовая сессия', 'Фиксируем задачу, рынок, аудитории и роль PR в росте проекта.'],
  ['02', 'Индивидуальная стратегия', 'Анализируем медиаполе, конкурентов, форматы и точки входа в СМИ.'],
  ['03', 'Глубинные интервью', 'Проводим интервью с руководителями и выделяем сильные экспертные темы.'],
  ['04', 'PR-план и медиакарта', 'Собираем PR-план, список СМИ, инфоповоды и ритм коммуникаций.'],
  ['05', 'Регулярный pitching', 'Питчим СМИ, создаём темы и поддерживаем интерес к экспертизе компании.'],
  ['06', 'Ежемесячный отчёт', 'Показываем публикации, охваты, статус задач и следующие действия.'],
];

const prhubMedia = ['РБК', 'Forbes', 'Ведомости', 'Коммерсантъ', 'BRICS Today', 'VC.ru'];

const prhubTestimonials = [
  {
    label: '01 / отзыв клиента',
    quote:
      'Отличная работа: быстро погрузились в проект и помогли выстроить понятную PR-стратегию.',
    source: 'Ассоциация экспортеров и импортеров',
  },
  {
    label: '02 / отзыв клиента',
    quote:
      'Сильная команда, которая умеет превращать экспертизу компании в заметное медиаприсутствие.',
    source: 'Промплан',
  },
  {
    label: '03 / отзыв клиента',
    quote:
      'Понравился системный подход: от запуска коммуникаций до долгосрочной работы с репутацией.',
    source: 'Денис Астафьев',
  },
  {
    label: '04 / отзыв клиента',
    quote:
      'Профессионально выстроили работу со СМИ, предложили сильные темы и понятный план действий.',
    source: 'Tamashi',
  },
  {
    label: '05 / отзыв клиента',
    quote:
      'Команда помогла упаковать нашу экспертизу и запустить регулярное присутствие в медиа.',
    source: 'MAIN Divisiom',
  },
  {
    label: '06 / отзыв клиента',
    quote:
      'Очень довольны сотрудничеством: всё было чётко, спокойно, профессионально и с результатом.',
    source: 'Дом Лазовского',
  },
];

function PrhubInspiredSite() {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [caseDirection, setCaseDirection] = useState<'next' | 'prev'>('next');
  const [caseAutoDelay, setCaseAutoDelay] = useState(5000);
  const testimonialScrollerRef = useRef<HTMLDivElement | null>(null);
  const activeCase = portfolio[activeCaseIndex];
  const secondaryCases = portfolio.filter((_, index) => index !== activeCaseIndex);
  const selectCase = (index: number) => {
    setCaseDirection(index > activeCaseIndex ? 'next' : 'prev');
    setCaseAutoDelay(10000);
    setActiveCaseIndex(index);
  };
  const openAwardCase = (index: number) => {
    selectCase(index);
    document.getElementById('prhub-cases')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  const scrollTestimonials = (direction: -1 | 1) => {
    const scroller = testimonialScrollerRef.current;

    if (!scroller) {
      return;
    }

    const slide = scroller.querySelector<HTMLElement>('.testimonial-slide');
    const distance = slide ? slide.offsetWidth + 16 : scroller.clientWidth * 0.86;

    scroller.scrollBy({
      left: direction * distance,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setCaseDirection('next');
      setCaseAutoDelay(5000);
      setActiveCaseIndex((currentIndex) => (currentIndex + 1) % portfolio.length);
    }, caseAutoDelay);

    return () => window.clearTimeout(timeoutId);
  }, [activeCaseIndex, caseAutoDelay]);

  return (
    <main className="prhub-page">
      <header className="prhub-header" aria-label="Навигация PRIX CLUB">
        <a className="prhub-logo" href="#prhub-top" aria-label="PRIX CLUB">
          PRIX CLUB
        </a>
        <nav>
          <a href="#prhub-services">services</a>
          <a href="#prhub-cases">cases</a>
          <a href="#prhub-partners">partners</a>
        </nav>
        <a className="prhub-discuss" href="#prhub-contact">discuss project</a>
      </header>

      <section className="prhub-hero" id="prhub-top" aria-labelledby="prhub-title">
        <div className="prhub-hero-copy">
          <p className="prhub-tag">PRIX CLUB / медиа-присутствие и репутация</p>
          <h1 id="prhub-title">Создаем доверие через медиа.</h1>
          <div className="prhub-direct">
            <a href="https://t.me/polinakonder" target="_blank" rel="noreferrer">@polinakonder</a>
            <a href="#prhub-contact">MAX: Полина</a>
            <a href="mailto:info@prixclub.ru">Почта</a>
          </div>
        </div>

        <div className="prhub-hero-card">
          <ThreeKnightScene />
          <div>
            <span>PRIX CLUB</span>
            <p>PR-агентство полного цикла с фокусом на экономику бизнеса</p>
          </div>
        </div>

        <p className="prhub-intro">
          8 лет создаем репутацию и повышаем продажи для бизнеса и персон в России, СНГ и странах БРИКС
        </p>
      </section>

      <section className="prhub-marquee" aria-label="Медиа и направления">
        <div>
          {prhubMedia.concat(prhubMedia).map((item, index) => (
            <span key={`${item}-${index}`}>{item}</span>
          ))}
        </div>
      </section>

      <section className="prhub-about" aria-labelledby="prhub-about-title">
        <h2 id="prhub-about-title">
          PRIX CLUB — агентство с локальной точностью и международным подходом.
        </h2>
        <div className="prhub-stat-row">
          {stats.map((item) => (
            <AnimatedStatCard key={item.label} value={item.value} label={item.label} />
          ))}
        </div>
      </section>

      <section className="prhub-services" id="prhub-services" aria-labelledby="prhub-services-title">
        <div className="prhub-section-title">
          <p>Our services</p>
          <h2 id="prhub-services-title">Что мы делаем</h2>
        </div>

        <div className="service-studio">
          <div className="service-orbit" aria-hidden="true">
            <span className="orbit-core">PR</span>
            {prhubServices.slice(0, 5).map((service, index) => (
              <span className={`orbit-track orbit-track-${index + 1}`} key={service.title}>
                <span className="orbit-chip">{service.orbitLabel ?? service.title.split(' ')[0]}</span>
              </span>
            ))}
          </div>

          <div className="service-manifest">
            {prhubServices.map((service, index) => (
              <article key={service.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="prhub-cases" id="prhub-cases" aria-labelledby="prhub-cases-title">
        <div className="prhub-section-title">
          <p>Favourite cases</p>
          <h2 id="prhub-cases-title">Публикации, события и репутационные поводы.</h2>
        </div>

        <div className="case-editorial">
          <article className={`case-feature case-feature-${caseDirection}`} key={activeCase.company}>
            <div className="case-feature-topline">
              <CaseLogoMark logo={activeCase.logo} />
              <span className="case-feature-badge">Featured media room</span>
            </div>
            <h3>{activeCase.company}</h3>
            <p>{activeCase.type}</p>
            <ul>
              {activeCase.publications.map((publication) => (
                <li key={publication}>{publication}</li>
              ))}
            </ul>
          </article>

          <div className="case-strips">
            {secondaryCases.map((item) => {
              const originalIndex = portfolio.findIndex((caseItem) => caseItem.company === item.company);

              return (
                <button
                  className="case-strip-button"
                  key={item.company}
                  type="button"
                  onClick={() => selectCase(originalIndex)}
                >
                  <div className="case-strip-heading">
                    <CaseLogoMark logo={item.logo} />
                    <div className="case-strip-title">
                      <span>{String(originalIndex + 1).padStart(2, '0')}</span>
                      <h3>{item.company}</h3>
                    </div>
                  </div>
                  <p>{item.type}</p>
                  <small>{item.publications[0]}</small>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="prhub-testimonials" aria-labelledby="prhub-testimonials-title">
        <div className="prhub-section-title">
          <p>Client voices</p>
          <h2 id="prhub-testimonials-title">Отзывы клиентов</h2>
        </div>

        <div className="testimonial-board">
          <div className="testimonial-actions" aria-label="Навигация по отзывам">
            <button type="button" onClick={() => scrollTestimonials(-1)} aria-label="Предыдущий отзыв">
              ←
            </button>
            <button type="button" onClick={() => scrollTestimonials(1)} aria-label="Следующий отзыв">
              →
            </button>
            <a href="mailto:info@prixclub.ru?subject=Отзыв%20о%20PRIX%20CLUB">оставить отзыв</a>
          </div>

          <div className="testimonial-rail" ref={testimonialScrollerRef}>
            {prhubTestimonials.map((testimonial, index) => (
              <blockquote className="testimonial-slide" key={testimonial.label}>
                <span>{testimonial.label}</span>
                <p>{testimonial.quote}</p>
                <footer>
                  <strong>{String(index + 1).padStart(2, '0')}</strong>
                  {testimonial.source}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="prhub-approach" aria-labelledby="prhub-approach-title">
        <div className="prhub-section-title">
          <p>Our approach</p>
          <h2 id="prhub-approach-title">Процесс, который превращает экспертизу в медийное присутствие.</h2>
        </div>

        <div className="route-map" lang="ru">
          {prhubApproach.map(([num, title, text]) => (
            <article key={num}>
              <span>{num}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="prhub-partners" id="prhub-partners" aria-labelledby="prhub-partners-title">
        <div className="prhub-section-title">
          <p>Partners</p>
          <h2 id="prhub-partners-title">Партнеры</h2>
        </div>

        <div className="partner-grid">
          {partners.map((partner) => (
            <a href={partner.href} key={partner.name} target="_blank" rel="noreferrer">
              <span className="partner-logo">
                <img src={partner.logo} alt={partner.alt} loading="lazy" />
              </span>
              <strong>{partner.name}</strong>
              <small>{partner.href.replace(/^https?:\/\//, '').replace(/\/$/, '')}</small>
            </a>
          ))}
        </div>
      </section>

      <section className="prhub-awards" aria-labelledby="prhub-awards-title">
        <h2 id="prhub-awards-title">Наши проекты получают благодарственные письма, сертификаты и отраслевое признание.</h2>
        <div className="document-stack">
          {certificates.map((item) => (
            <button key={item.label} type="button" onClick={() => openAwardCase(item.caseIndex)}>
              {item.label}
            </button>
          ))}
        </div>
      </section>

      <section className="prhub-contact" id="prhub-contact" aria-labelledby="prhub-contact-title">
        <p>Ready to fill the brief?</p>
        <h2 id="prhub-contact-title">Мы здесь, чтобы сделать ваш бренд узнаваемым</h2>
        <div>
          <a href="mailto:info@prixclub.ru">info@prixclub.ru</a>
          <a href="https://t.me/polinakonder" target="_blank" rel="noreferrer">@polinakonder</a>
          <a href="#prhub-top">MAX: Полина</a>
        </div>
      </section>

      <footer className="prhub-footer">
        <span>© PRIX CLUB</span>
        <a href="#prhub-cases">Cases</a>
        <a href="#prhub-partners">Partners</a>
        <a href="#prhub-services">Services</a>
        <a href="#prhub-contact">Privacy Policy</a>
      </footer>
    </main>
  );
}

function App() {
  return <PrhubInspiredSite />;
}

export default App;
