import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import prixKnightSvg from './assets/prix-knight.svg?raw';
import './App.css';

const stats = [
  { value: '8', label: 'лет в коммуникациях' },
  { value: '100+', label: 'проектов в разных нишах' },
  { value: '3', label: 'страны присутствия' },
  { value: '100M+', label: 'охватов каждый месяц' },
];

const certificates = ['Роспром', 'АЭИ', 'Промплан'];

const portfolio = [
  {
    company: 'Роспром',
    type: 'Промышленность / репутация',
    publications: [
      'Комментарий эксперта для деловой повестки',
      'Интервью о развитии отраслевых инициатив',
      'Анонс стратегической сессии для профессионального сообщества',
    ],
  },
  {
    company: 'АЭИ',
    type: 'Ассоциации / BRICS',
    publications: [
      'Публикация по итогам круглого стола',
      'Новостной выход о международной повестке',
      'Материал о партнерствах и деловых коммуникациях',
    ],
  },
  {
    company: 'Промплан',
    type: 'B2B / медиа-сопровождение',
    publications: [
      'Экспертная колонка о рынке и управлении',
      'Серия публикаций для усиления доверия',
      'Пресс-подход к запуску нового направления',
    ],
  },
];

const testimonials = [
  {
    quote:
      'PRIX CLUB умеет переводить сложную деловую экспертизу на язык медиа. После запуска кампании нас стали чаще приглашать в отраслевые обсуждения.',
    author: 'Директор по развитию',
    company: 'B2B-проект',
  },
  {
    quote:
      'Команда взяла на себя стратегию, тексты, работу с площадками и контроль публикаций. Мы получили понятную систему репутационного присутствия.',
    author: 'Основатель',
    company: 'Технологическая компания',
  },
  {
    quote:
      'Сильная сторона агентства - аккуратная работа с смыслами. Они не делают шум ради шума, а собирают доверие вокруг компании.',
    author: 'PR-куратор',
    company: 'Отраслевое объединение',
  },
  {
    quote:
      'Нам помогли выстроить коммуникации для руководителя: от позиционирования до публикаций и выступлений. Все было спокойно, точно и в срок.',
    author: 'Исполнительный директор',
    company: 'Сервисная группа',
  },
];

const team = [
  { name: 'Полина', role: 'CEO', initials: 'П' },
  { name: 'Владимир', role: 'PR-директор, управляет IT-отделом', initials: 'В' },
  { name: 'Георгий', role: 'Операционный директор, GR-эксперт', initials: 'Г' },
  { name: 'Мария', role: 'SMM, делает бренд заметным в соцсетях', initials: 'М' },
];

const news = [
  {
    title: 'Круглый стол ассоциации',
    text: 'Собираем экспертов, модерируем повестку и превращаем событие в медийный повод.',
  },
  {
    title: 'Новости компании',
    text: 'Упаковываем внутренние изменения в понятные инфоповоды для рынка и партнеров.',
  },
  {
    title: 'Выходы в СМИ',
    text: 'Готовим комментарии, интервью и экспертные материалы для нужных аудиторий.',
  },
];

function KnightMark() {
  return (
    <svg className="knight-mark" viewBox="0 0 320 360" role="img" aria-label="3D logo PRIX CLUB">
      <defs>
        <linearGradient id="goldFace" x1="72" y1="40" x2="245" y2="302" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff2bd" />
          <stop offset="0.34" stopColor="#d7a64e" />
          <stop offset="0.68" stopColor="#7c4b20" />
          <stop offset="1" stopColor="#f6d88b" />
        </linearGradient>
        <linearGradient id="goldEdge" x1="65" y1="62" x2="277" y2="246" gradientUnits="userSpaceOnUse">
          <stop stopColor="#5a2f15" />
          <stop offset="0.48" stopColor="#f6d88b" />
          <stop offset="1" stopColor="#2b160c" />
        </linearGradient>
        <radialGradient id="shine" cx="0" cy="0" r="1" gradientTransform="matrix(118 118 -118 118 130 78)" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" stopOpacity="0.86" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <filter id="softShadow" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="22" stdDeviation="18" floodColor="#000000" floodOpacity="0.55" />
        </filter>
      </defs>

      <ellipse cx="162" cy="312" rx="118" ry="30" fill="#000" opacity="0.28" />
      <g filter="url(#softShadow)">
        <path
          d="M92 298h154c13 0 24-11 24-24v-15c0-12-9-22-21-24l-27-4c-4-34-15-64-33-91l31-12c9-4 14-14 10-23l-9-24c-4-10-15-15-25-10l-18 8c-18-22-41-35-70-38-11-1-20 8-20 19v21l-23 21c-8 8-11 20-7 31l15 39-25 24c-7 7-8 18-1 26l33 37-10 25c-4 15 6 29 21 29Z"
          fill="url(#goldFace)"
        />
        <path
          d="M118 82c46 9 78 42 96 99 8 25 12 50 12 76M92 298h154c13 0 24-11 24-24v-15c0-12-9-22-21-24l-47-7M91 117l60 14M74 194l88 15M177 79l-35 56"
          fill="none"
          stroke="url(#goldEdge)"
          strokeLinecap="round"
          strokeWidth="12"
          opacity="0.7"
        />
        <path
          d="M116 99c23 2 43 13 61 33l-29 10c-17-7-35-9-55-5l-8-20c8-10 18-16 31-18Z"
          fill="#211008"
          opacity="0.55"
        />
        <circle cx="151" cy="111" r="8" fill="#170c08" />
        <path
          d="M83 296h184c14 0 26 11 26 25v11H57v-10c0-15 11-26 26-26Z"
          fill="url(#goldEdge)"
        />
        <path
          d="M95 302h142c13 0 24 10 24 23v4H70v-4c0-13 11-23 25-23Z"
          fill="url(#goldFace)"
          opacity="0.85"
        />
        <path
          d="M85 80c40-38 95-48 139-12 18 15 27 31 33 50"
          fill="none"
          stroke="url(#shine)"
          strokeLinecap="round"
          strokeWidth="26"
          opacity="0.55"
        />
      </g>
    </svg>
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

type DesignVariant = 'cinematic' | 'prhub';

function CinematicPrixSite() {
  return (
    <main className="prix-site">
      <header className="site-header" aria-label="Основная навигация">
        <a className="brand" href="#top" aria-label="PRIX CLUB">
          <span className="brand-emblem" aria-hidden="true">P</span>
          <span>PRIX CLUB</span>
        </a>

        <nav>
          <a href="#agency">Агентство</a>
          <a href="#portfolio">Портфолио</a>
          <a href="#reviews">Отзывы</a>
          <a href="#team">Команда</a>
        </nav>

        <a className="nav-cta" href="#contact">Обсудить задачу</a>
      </header>

      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="cinema-lines" aria-hidden="true" />
        <div className="hero-content">
          <p className="eyebrow">Коммуникационное бутик-агентство полного цикла</p>
          <h1 id="hero-title">Создаем доверие через медиа-присутствие</h1>
          <p className="hero-lede">
            Формируем и управляем репутацией компаний и персон в медиаполе России
            и стран БРИКС. Стратегия, PR, публикации, события и сопровождение под ключ.
          </p>

          <div className="hero-actions">
            <a className="button button-primary" href="#contact">Рассказать о задаче</a>
            <a className="button button-ghost" href="#portfolio">Смотреть кейсы</a>
          </div>

          <div className="contact-pills" aria-label="Быстрые контакты">
            <span>Связаться:</span>
            <a href="#contact">MAX</a>
            <a href="https://t.me/" target="_blank" rel="noreferrer">Telegram</a>
            <a href="mailto:hello@prix.club">Почта</a>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="knight-stage">
            <KnightMark />
          </div>
          <div className="signal-card">
            <span>Медиа-охват</span>
            <strong>100M+</strong>
            <p>ежемесячно через публикации, события и экспертное присутствие</p>
          </div>
        </div>

        <div className="hero-ticker" aria-hidden="true">
          <span>PR strategy</span>
          <span>Media relations</span>
          <span>GR communications</span>
          <span>BRICS markets</span>
          <span>Reputation management</span>
        </div>
      </section>

      <section className="stats-section" id="agency" aria-label="Агентство в цифрах">
        {stats.map((item) => (
          <div className="stat-card" key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </section>

      <section className="trust-section" aria-labelledby="trust-title">
        <div className="section-copy">
          <p className="section-kicker">Доверие</p>
          <h2 id="trust-title">Благодарственные письма, сертификаты и подтвержденная экспертиза.</h2>
        </div>
        <div className="certificate-grid">
          {certificates.map((item) => (
            <article className="certificate-card" key={item}>
              <span>Letter</span>
              <strong>{item}</strong>
              <p>Подтверждение сотрудничества, профессионального вклада и результата.</p>
            </article>
          ))}
        </div>
      </section>

      <section className="portfolio-section" id="portfolio" aria-labelledby="portfolio-title">
        <div className="section-copy wide">
          <p className="section-kicker">Портфолио</p>
          <h2 id="portfolio-title">Публикации и медийные выходы, собранные вокруг репутационной задачи.</h2>
        </div>

        <div className="portfolio-grid">
          {portfolio.map((item, index) => (
            <article className={index === 0 ? 'case-card featured-case' : 'case-card'} key={item.company}>
              <div className="case-logo">{item.company.slice(0, 2)}</div>
              <div>
                <p>{item.type}</p>
                <h3>{item.company}</h3>
              </div>
              <ul>
                {item.publications.map((publication) => (
                  <li key={publication}>{publication}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="reviews-section" id="reviews" aria-labelledby="reviews-title">
        <div className="reviews-sticky">
          <p className="section-kicker">Отзывы</p>
          <h2 id="reviews-title">Залипательный виджет доверия.</h2>
          <p>
            Отзывы раскрывают не только результат, но и стиль работы: спокойная
            коммуникация, точная упаковка смыслов и контроль медиаполя.
          </p>
        </div>

        <div className="review-stack">
          {testimonials.map((item, index) => (
            <blockquote className="review-card" key={item.quote}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{item.quote}</p>
              <footer>
                <strong>{item.author}</strong>
                <small>{item.company}</small>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="team-section" id="team" aria-labelledby="team-title">
        <div className="section-copy wide">
          <p className="section-kicker">Ядро компании</p>
          <h2 id="team-title">Команда, которая соединяет PR, GR, SMM и операционное управление.</h2>
        </div>

        <div className="team-grid">
          {team.map((member) => (
            <article className="team-card" key={member.name}>
              <div className="portrait" aria-hidden="true">
                <span>{member.initials}</span>
              </div>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="news-section" aria-labelledby="news-title">
        <div className="section-copy">
          <p className="section-kicker">Новости о нас</p>
          <h2 id="news-title">События, медиа и поводы, которые продолжают работать после публикации.</h2>
        </div>

        <div className="news-grid">
          {news.map((item) => (
            <article className="news-card" key={item.title}>
              <span>News</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="contact-section" id="contact" aria-labelledby="contact-title">
        <div>
          <p className="section-kicker">Обратная связь</p>
          <h2 id="contact-title">Расскажите о вашей задаче. Мы предложим репутационный маршрут.</h2>
          <p>
            Можно написать в MAX, Telegram, на почту или оставить заявку в форме.
            Мы свяжемся и уточним цель, аудитории, сроки и желаемый медийный результат.
          </p>
        </div>

        <form className="contact-form">
          <label>
            Имя
            <input type="text" name="name" placeholder="Как к вам обращаться" />
          </label>
          <label>
            Контакт
            <input type="text" name="contact" placeholder="Телефон, Telegram или email" />
          </label>
          <label>
            Задача
            <textarea name="task" placeholder="Что нужно усилить: компанию, персону, событие, запуск" />
          </label>
          <button className="button button-primary" type="submit">Отправить заявку</button>
        </form>
      </section>

      <footer className="footer">
        <div>
          <strong>PRIX CLUB</strong>
          <p>Формирование и управление репутацией в медиаполе.</p>
        </div>
        <nav aria-label="Документы">
          <a href="mailto:hello@prix.club">hello@prix.club</a>
          <a href="#contact">Адрес и контакты</a>
          <a href="#contact">Пользовательское соглашение</a>
          <a href="#contact">Cookies</a>
        </nav>
      </footer>
    </main>
  );
}

const prhubServices = [
  {
    title: 'Influencers collaborations',
    text: 'Подбираем лидеров мнений, которые совпадают с ценностями бренда и усиливают доверие.',
  },
  {
    title: 'Creative support',
    text: 'Создаем офлайн- и онлайн-идеи, которые медиа хотят обсуждать и цитировать.',
  },
  {
    title: 'Podcasts & conferences',
    text: 'Помогаем попасть в экспертные панели, подкасты, круглые столы и отраслевые события.',
  },
  {
    title: 'C-level reputation',
    text: 'Упаковываем личные бренды, интервью, колонки и публичные позиции руководителей.',
  },
  {
    title: 'Media relations',
    text: 'Питчим релевантные СМИ, готовим комментарии, статьи и новости под нужные аудитории.',
  },
  {
    title: 'PR strategy',
    text: 'Собираем понятную дорожную карту запуска, медиалист, форматы и KPI коммуникаций.',
  },
];

const prhubApproach = [
  ['01', 'Discovery call', 'Фиксируем задачу, рынок, аудитории и роль PR в росте проекта.'],
  ['02', 'Personalized proposal', 'Готовим анализ медиаполя, конкурентов, форматов и точек входа.'],
  ['03', 'Deep-dive interviews', 'Проводим интервью с руководителями и выделяем экспертные темы.'],
  ['04', 'PR plan & media list', 'Собираем PR-план, список площадок, инфоповоды и ритм коммуникаций.'],
  ['05', 'Ongoing pitching', 'Регулярно питчим СМИ и создаем темы, если готовых новостей нет.'],
  ['06', 'Monthly reporting', 'Показываем размещения, охваты, статус задач и следующие действия.'],
];

const prhubMedia = ['РБК', 'Forbes', 'Ведомости', 'Коммерсантъ', 'BRICS Today', 'VC.ru'];

function PrhubInspiredSite() {
  return (
    <main className="prhub-page">
      <header className="prhub-header" aria-label="Навигация PRIX CLUB">
        <a className="prhub-logo" href="#prhub-top" aria-label="PRIX CLUB">
          PRIX CLUB
        </a>
        <nav>
          <a href="#prhub-services">services</a>
          <a href="#prhub-cases">cases</a>
          <a href="#prhub-team">our team</a>
        </nav>
        <a className="prhub-discuss" href="#prhub-contact">discuss project</a>
      </header>

      <section className="prhub-hero" id="prhub-top" aria-labelledby="prhub-title">
        <div className="prhub-hero-copy">
          <p className="prhub-tag">PRIX CLUB / медиа-присутствие и репутация</p>
          <h1 id="prhub-title">Создаем доверие через медиа.</h1>
          <div className="prhub-direct">
            <a href="https://t.me/" target="_blank" rel="noreferrer">Telegram</a>
            <a href="#prhub-contact">MAX</a>
            <a href="mailto:hello@prix.club">Почта</a>
          </div>
        </div>

        <div className="prhub-hero-card">
          <ThreeKnightScene />
          <div>
            <span>PRIX CLUB</span>
            <p>Бутик-агентство полного цикла</p>
          </div>
        </div>

        <p className="prhub-intro">
          8 лет продвигаем компании и персон в России и странах БРИКС:
          PR-стратегия, публикации, события и работа с репутацией.
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
            <article key={item.label}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="prhub-services" id="prhub-services" aria-labelledby="prhub-services-title">
        <div className="prhub-section-title">
          <p>Our services</p>
          <h2 id="prhub-services-title">Что мы делаем</h2>
        </div>

        <div className="prhub-services-list">
          {prhubServices.map((service) => (
            <article key={service.title}>
              <p>{service.text}</p>
              <h3>{service.title}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="prhub-cases" id="prhub-cases" aria-labelledby="prhub-cases-title">
        <div className="prhub-section-title">
          <p>Favourite cases</p>
          <h2 id="prhub-cases-title">Публикации, события и репутационные поводы.</h2>
        </div>

        <div className="prhub-case-board">
          {portfolio.map((item) => (
            <article key={item.company}>
              <div className="prhub-case-logo">{item.company}</div>
              <p>{item.type}</p>
              <ul>
                {item.publications.slice(0, 2).map((publication) => (
                  <li key={publication}>{publication}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="prhub-approach" aria-labelledby="prhub-approach-title">
        <div className="prhub-section-title">
          <p>Our approach</p>
          <h2 id="prhub-approach-title">Процесс, который превращает экспертизу в медийное присутствие.</h2>
        </div>

        <div className="prhub-approach-grid">
          {prhubApproach.map(([num, title, text]) => (
            <article key={num}>
              <span>{num}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="prhub-team" id="prhub-team" aria-labelledby="prhub-team-title">
        <div>
          <p className="prhub-mini">We care about people, the process, and the result</p>
          <h2 id="prhub-team-title">Ядро компании</h2>
        </div>
        <div className="prhub-team-strip">
          {team.map((member) => (
            <article key={member.name}>
              <div className="prhub-person-photo">{member.initials}</div>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="prhub-awards" aria-labelledby="prhub-awards-title">
        <h2 id="prhub-awards-title">Наши проекты получают благодарственные письма, сертификаты и отраслевое признание.</h2>
        <div>
          {certificates.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>

      <section className="prhub-contact" id="prhub-contact" aria-labelledby="prhub-contact-title">
        <p>Ready to fill the brief?</p>
        <h2 id="prhub-contact-title">Мы здесь, чтобы помочь.</h2>
        <div>
          <a href="mailto:hello@prix.club">hello@prix.club</a>
          <a href="https://t.me/" target="_blank" rel="noreferrer">Telegram</a>
          <a href="#prhub-top">MAX</a>
        </div>
      </section>

      <footer className="prhub-footer">
        <span>© PRIX CLUB</span>
        <a href="#prhub-team">Our team</a>
        <a href="#prhub-cases">Cases</a>
        <a href="#prhub-services">Services</a>
        <a href="#prhub-contact">Privacy Policy</a>
      </footer>
    </main>
  );
}

function VariantSwitcher({
  variant,
  setVariant,
}: {
  variant: DesignVariant;
  setVariant: (variant: DesignVariant) => void;
}) {
  return (
    <div className="variant-switcher" aria-label="Переключение вариантов дизайна">
      <button
        className={variant === 'cinematic' ? 'is-active' : ''}
        type="button"
        onClick={() => setVariant('cinematic')}
      >
        Вариант 1
      </button>
      <button
        className={variant === 'prhub' ? 'is-active' : ''}
        type="button"
        onClick={() => setVariant('prhub')}
      >
        Вариант 2 PRHub
      </button>
    </div>
  );
}

function App() {
  const [variant, setVariant] = useState<DesignVariant>('prhub');

  return (
    <>
      <VariantSwitcher variant={variant} setVariant={setVariant} />
      {variant === 'cinematic' ? <CinematicPrixSite /> : <PrhubInspiredSite />}
    </>
  );
}

export default App;
