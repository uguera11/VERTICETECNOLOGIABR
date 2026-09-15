import { useState } from "react";
import { MapView } from "@/components/Map";
import {
  ArrowDownRight,
  ArrowUpRight,
  Anchor,
  Check,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Clock3,
  Crosshair,
  Gauge,
  Headphones,
  LockKeyhole,
  MapPin,
  Menu,
  Navigation,
  Radio,
  Route,
  ShieldCheck,
  Siren,
  Smartphone,
  Sparkles,
  Truck,
  UserRound,
  Wifi,
  X,
  Zap,
} from "lucide-react";

const WHATSAPP_NUMBER = "5531998591924";
const whatsAppLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

const technicalTerms: Record<string, string> = {
  "cerca virtual": "Geofencing: delimite uma área no mapa e receba um alerta quando o rastreado entrar ou sair dela.",
  "telemetria": "Telemetria: dados do veículo em movimento, como velocidade, frenagens, aceleração e comportamento de condução.",
  "can-bus": "CAN-BUS: rede eletrônica do veículo que permite coletar dados técnicos com precisão, sem depender apenas do GPS.",
};

function TechnicalText({ text }: { text: string }) {
  const match = Object.keys(technicalTerms).find((term) => text.toLowerCase().includes(term));
  if (!match) return <>{text}</>;
  const start = text.toLowerCase().indexOf(match);
  const label = text.slice(start, start + match.length);
  return <>{text.slice(0, start)}{label}<span className="term-help" title={technicalTerms[match]} aria-label={technicalTerms[match]}><CircleHelp size={13} /></span>{text.slice(start + match.length)}</>;
}

type TabKey = "personal" | "care" | "fleet" | "nautical";

type Plan = {
  name: string;
  audience: string;
  price: string;
  note: string;
  featureLabel: string;
  features: string[];
  cta: string;
  popular?: boolean;
};

type PlanGroup = {
  eyebrow: string;
  title: string;
  description: string;
  icon: typeof Navigation;
  plans: Plan[];
  image: string;
};

const plans: Record<TabKey, PlanGroup> = {
  personal: {
    eyebrow: "Para quem quer dirigir em paz",
    title: "Veículos leves",
    description: "Rastreamento inteligente para carros e motos, com proteção e controle em cada trajeto.",
    icon: Navigation,
    image: "/site-assets/vertice-personal-vehicle_c9ae93e8.webp",
    plans: [
      {
        name: "Veículos leves",
        audience: "Carros e motos",
        price: "29,90",
        note: "a partir de",
        featureLabel: "Proteção essencial para o dia a dia",
        features: [
          "Localização em tempo real (GPS/GPRS)",
          "App Android & iOS",
          "Histórico de trajetos por 7 dias",
          "Alertas de ignição (liga/desliga)",
          "Cerca virtual",
          "Bloqueio remoto opcional",
        ],
        cta: "Quero proteger meu veículo",
      },
    ],
  },
  care: {
    eyebrow: "Para cuidar do que importa",
    title: "Proteção & Monitoramento",
    description: "Monitoramento com TEIA para pessoas, crianças, idosos, Alzheimer, TDA, TEA e pets.",
    icon: UserRound,
    image: "/site-assets/vertice-pets-people_2d9c8fa0.webp",
    plans: [
      {
        name: "Proteção & Monitoramento",
        audience: "Pessoas • Crianças • Idosos • Alzheimer • TDA • TEA • Pets",
        price: "12,90",
        note: "a partir de",
        featureLabel: "Acompanhe quem realmente importa para você.",
        features: [
          "Localização em tempo real",
          "Rastreamento por localização",
          "Acompanhamento pelo aplicativo",
          "Visualização da localização",
          "Histórico de localização",
          "Dispositivo compacto e discreto",
        ],
        cta: "Quero conhecer a TEIA",
      },
    ],
  },
  fleet: {
    eyebrow: "Para operações que não podem parar",
    title: "Linha pesada",
    description: "Visibilidade operacional para vans, ônibus e caminhões, com telemetria e gestão em uma única visão.",
    icon: Truck,
    image: "/site-assets/vertice-fleet_12944b75.webp",
    plans: [
      {
        name: "Linha pesada",
        audience: "Vans, ônibus e caminhões",
        price: "34,90",
        note: "a partir de",
        featureLabel: "Mais controle para sua operação",
        features: [
          "Rastreador OBD2 / CAN-BUS com conexão 4G",
          "Localização multitecnologia em tempo real",
          "Telemetria de condução e velocidade",
          "Controle de combustível e manutenção",
          "Identificação de motoristas",
          "Relatórios de comportamento",
          "Histórico completo de trajetos",
          "Zonas e rotas ilimitadas",
        ],
        cta: "Falar sobre linha pesada",
      },
    ],
  },
  nautical: {
    eyebrow: "Para quem vive a água",
    title: "Rastreamento Náutico",
    description: "Rastreamento de embarcações em tempo real, com localização pelo aplicativo e acompanhamento dos seus deslocamentos.",
    icon: Anchor,
    image: "/site-assets/vertice-nautico-barcos-jetskis.png",
    plans: [
      {
        name: "Rastreamento Náutico",
        audience: "Barcos, lanchas, jet skis e outras embarcações",
        price: "39,99",
        note: "a partir de",
        featureLabel: "Acompanhe sua embarcação onde estiver",
        features: [
          "Localização em tempo real",
          "Acompanhamento pelo aplicativo",
          "Visualização dos deslocamentos",
          "Histórico de localização",
          "Rastreamento discreto e confiável",
        ],
        cta: "Quero rastrear minha embarcação",
      },
    ],
  },
};

const solutionCards = [
  { eyebrow: "VEÍCULOS LEVES", title: "Carros e motos", text: "Proteção contra roubo, localização em tempo real e mais tranquilidade em cada trajeto.", image: "/site-assets/vertice-personal-vehicle_c9ae93e8.webp", icon: Navigation },
  { eyebrow: "PROTEÇÃO & MONITORAMENTO", title: "Pessoas, crianças, idosos e pets", text: "TEIA para acompanhar pessoas, Alzheimer, TDA, TEA e pets com localização, cercas inteligentes e alertas no app.", image: "/site-assets/vertice-pets-people_2d9c8fa0.webp", icon: UserRound },
  { eyebrow: "LINHA PESADA", title: "Vans, ônibus e caminhões", text: "Visibilidade total para reduzir custos, melhorar a condução e manter sua operação eficiente.", image: "/site-assets/vertice-fleet_12944b75.webp", icon: Truck },
  { eyebrow: "RASTREAMENTO NÁUTICO", title: "Barcos, lanchas e jet skis", text: "Acompanhe sua embarcação em tempo real, com localização pelo aplicativo e histórico dos deslocamentos.", image: "/site-assets/vertice-nautico-barcos-jetskis.png", icon: Anchor },
];

const allPlans = [plans.personal, plans.fleet, plans.care, plans.nautical].flatMap((group) =>
  group.plans.map((plan) => ({ ...plan, category: group.title })),
);

const faqs = [
  {
    q: "A instalação do rastreador é complicada?",
    a: "Não. A instalação é rápida e feita por um profissional credenciado. O dispositivo fica discreto, seguro e pronto para transmitir em pouco tempo.",
  },
  {
    q: "Consigo acompanhar tudo pelo celular?",
    a: "Sim. O app Vértice está disponível para Android e iOS, com mapa em tempo real, histórico de rotas e alertas configuráveis.",
  },
  {
    q: "O que acontece se eu precisar de ajuda?",
    a: "Nossa equipe atende 24/7. Nos planos elegíveis, você também conta com assistência para guincho, chaveiro e suporte em emergências.",
  },
  {
    q: "A Vértice atende empresas com vários veículos?",
    a: "Sim. A Linha pesada combina rastreamento, telemetria e gestão operacional com visão centralizada, relatórios e controle da operação.",
  },
];

function BrandMark() {
  return (
    <div className="brand-mark" aria-label="Vértice Tecnologia MG">
      <img className="official-logo" src="/site-assets/vertice-logo-oficial_97ee8fd8.png" alt="Vértice Tecnologia MG" />
    </div>
  );
}

function DashboardVisual() {
  return (
    <div className="hero-visual" aria-label="Painel de monitoramento em tempo real">
      <div className="visual-orbit orbit-one" />
      <div className="visual-orbit orbit-two" />
      <div className="radar-scan" />
      <div className="route-line route-a" />
      <div className="route-line route-b" />
      <div className="map-grid" />
      <div className="map-label label-a">SP • 23°32' S</div>
      <div className="map-label label-b">Rota ativa</div>
      <div className="map-label label-c">-23.5489 / -46.6388</div>
      <div className="map-pin pin-a"><span /></div>
      <div className="map-pin pin-b"><span /></div>
      <div className="map-pin pin-c"><span /></div>
      <div className="visual-card card-top">
        <div className="card-top-icon"><Crosshair size={16} /></div>
        <div>
          <span>Rastreamento ativo</span>
          <strong>Agora</strong>
        </div>
        <i className="status-dot" />
      </div>
      <div className="visual-card card-bottom">
        <div className="mini-route"><Route size={16} /></div>
        <div>
          <span>Última atualização</span>
          <strong>há 12 segundos</strong>
        </div>
        <ArrowUpRight size={16} className="card-arrow" />
      </div>
      <div className="visual-coordinates">VÉRTICE / LIVE<span>01</span></div>
    </div>
  );
}

function FeatureIcon({ index }: { index: number }) {
  const icons = [Crosshair, Smartphone, Clock3, Radio, ShieldCheck, LockKeyhole, Headphones, Gauge, Wifi];
  const Icon = icons[index % icons.length];
  return <Icon size={15} strokeWidth={1.8} />;
}

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [mobileOpen, setMobileOpen] = useState(false);


  const handleCta = (message: string) => {
    window.open(whatsAppLink(message), "_blank", "noopener,noreferrer");
  };

  return (
    <main className="site-shell">
      <div className="noise" />
      <header className="site-header">
        <div className="container nav-inner">
          <a href="#top" className="brand-link"><BrandMark /></a>
          <nav className={mobileOpen ? "main-nav mobile-open" : "main-nav"} aria-label="Navegação principal">
            <a href="#como-funciona" onClick={() => setMobileOpen(false)}>Como funciona</a>
            <a href="#planos" onClick={() => setMobileOpen(false)}>Planos</a>
            <a href="#atendimento" onClick={() => setMobileOpen(false)}>Atendimento</a>
            <a href="#tecnologia" onClick={() => setMobileOpen(false)}>Tecnologia</a>
            <a href="#duvidas" onClick={() => setMobileOpen(false)}>Dúvidas</a>
          </nav>
          <div className="nav-actions">
            <a className="login-link" href={whatsAppLink("Olá, já sou cliente e preciso de atendimento da Vértice Tecnologia.")} target="_blank" rel="noreferrer">Área do cliente <ArrowUpRight size={14} /></a>
            <a className="nav-cta" href={whatsAppLink("Olá, quero falar com a Vértice sobre as soluções de rastreamento.")} target="_blank" rel="noreferrer">Fale com a Vértice <ArrowUpRight size={15} /></a>
          </div>
          <button className="mobile-menu" type="button" aria-label="Abrir menu" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <section className="hero-section" id="top">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-line" /> TECNOLOGIA QUE CUIDA DO SEU MOVIMENTO</div>
            <h1>Você no controle.<br /><em>O tempo todo.</em></h1>
            <p className="hero-intro">Rastreamento inteligente para veículos, pessoas e operações. Porque segurança de verdade é saber — não imaginar.</p>
            <div className="hero-actions">
              <a href={whatsAppLink("Olá, quero encontrar o melhor plano de rastreamento para mim.")} target="_blank" rel="noreferrer" className="button button-primary">Encontrar meu plano <ArrowDownRight size={17} /></a>
              <a href="#como-funciona" className="text-link">Entenda como funciona <ChevronRight size={16} /></a>
            </div>
            <div className="hero-proof">
              <div className="avatar-stack"><span>V</span><span>R</span><span>J</span><span>+</span></div>
              <p><strong>+ de 12 mil</strong> pessoas já<br />acompanham o que importa.</p>
            </div>
          </div>
          <div className="hero-art-wrap">
            <div className="hero-photo-bg" />
            <div className="hero-art-caption"><span>01</span> INTELIGÊNCIA EM MOVIMENTO <span className="caption-rule" /></div>
            <DashboardVisual />
            <div className="hero-side-note"><span>01 / 03</span><strong>Proteção<br />sem pontos<br />cegos.</strong></div>
          </div>
        </div>
        <div className="hero-marquee" aria-hidden="true">
          <div className="marquee-track"><span>RASTREAR</span><i>✳</i><span>PROTEGER</span><i>✳</i><span>EVOLUIR</span><i>✳</i><span>RASTREAR</span><i>✳</i><span>PROTEGER</span><i>✳</i><span>EVOLUIR</span><i>✳</i></div>
        </div>
      </section>

      <section className="trust-strip">
        <div className="container trust-inner">
          <span className="trust-label">TECNOLOGIA PRESENTE EM CADA DETALHE</span>
          <div className="trust-items"><span><ShieldCheck size={15} /> Segurança ativa</span><span><Zap size={15} /> Alertas em tempo real</span><span><Headphones size={15} /> Suporte humano 24/7</span></div>
        </div>
      </section>

      <section className="section how-section" id="como-funciona">
        <div className="container">
          <div className="section-heading split-heading">
            <div><span className="section-kicker">01 / SIMPLES ASSIM</span><h2>Proteção inteligente,<br /><em>sem complicação.</em></h2></div>
            <p>Do primeiro sinal ao acompanhamento diário, tudo foi pensado para você ter mais clareza, mais controle e menos preocupação.</p>
          </div>
          <div className="steps-grid">
            <article className="step-card"><div className="step-number">01</div><div className="step-icon"><Crosshair /></div><h3>Escolha o que importa</h3><p>Encontre a solução certa para seu veículo, sua família ou sua operação.</p><span className="step-line" /></article>
            <article className="step-card featured-step"><div className="step-number">02</div><div className="step-icon"><Radio /></div><h3>Ative sua proteção</h3><p>Instalação rápida e orientação completa para começar sem fricção.</p><span className="step-line" /></article>
            <article className="step-card"><div className="step-number">03</div><div className="step-icon"><Smartphone /></div><h3>Acompanhe tudo</h3><p>Tenha o controle na palma da mão, com alertas que chegam quando importam.</p><span className="step-line" /></article>
          </div>
        </div>
      </section>

      <section className="section solutions-section" id="solucoes">
        <div className="container">
          <div className="section-heading split-heading">
            <div><span className="section-kicker">02 / FEITO PARA A VIDA REAL</span><h2>Um rastreador.<br /><em>Várias possibilidades.</em></h2></div>
            <p>Escolha o cenário que mais combina com você. A Vértice transforma localização em proteção, cuidado e eficiência.</p>
          </div>
          <div className="solution-cards">
            {solutionCards.map(({ eyebrow, title, text, image, icon: Icon }) => <article className="solution-card" key={title}>
              <div className="solution-image"><img src={image} alt={title} /><span className="solution-icon"><Icon size={18} /></span></div>
              <div className="solution-content"><span className="solution-eyebrow">{eyebrow}</span><h3>{title}</h3><p>{text}</p><a href={whatsAppLink(`Olá, quero saber mais sobre rastreamento para ${title}.`)} target="_blank" rel="noreferrer" className="text-link">Conhecer esta solução <ArrowUpRight size={15} /></a></div>
            </article>)}
          </div>
        </div>
      </section>

      <section className="regional-section" id="atendimento">
        <div className="container regional-inner">
          <div className="regional-mark"><MapPin size={22} /><span>ATENDIMENTO REGIONAL</span></div>
          <div className="regional-copy"><h2>Presença local.<br /><em>Controle onde importa.</em></h2><p>Instalação de rastreadores, telemetria e soluções de monitoramento em Belo Horizonte e toda a Grande BH, além de diversas cidades do interior de Minas Gerais.</p></div>
          <div className="regional-map-wrap"><MapView className="regional-map" initialCenter={{ lat: -19.9191, lng: -43.9386 }} initialZoom={9} /><div className="coverage-visual" aria-hidden="true"><span className="coverage-title">MAPA DE COBERTURA</span><span className="coverage-route route-one" /><span className="coverage-route route-two" /><span className="coverage-route route-three" /><span className="coverage-node node-bh"><i />BH</span><span className="coverage-node node-contagem"><i />Contagem</span><span className="coverage-node node-betim"><i />Betim</span><span className="coverage-node node-itauna"><i />Itaúna</span><span className="coverage-node node-divinopolis"><i />Divinópolis</span></div><span className="regional-map-label"><MapPin size={13} /> MINAS GERAIS / ÁREA DE ATENDIMENTO</span></div>
          <div className="regional-cities"><span>BH</span><span>Contagem</span><span>Betim</span><span>Mateus Leme</span><span>Juatuba</span><span>Itaúna</span><span>Divinópolis</span><span>São Gonçalo do Pará</span><span>Abaeté e região</span></div>
          <div className="regional-address"><MapPin size={17} /><div><span>SEDE VÉRTICE TECNOLOGIA</span><p>Rua Paraíba, 651 · Belo Horizonte, MG · CEP 30130-140</p><a href="https://www.google.com/maps/search/?api=1&query=Rua%20Para%C3%ADba%2C%20651%2C%20Belo%20Horizonte%2C%20MG%2C%2030130-140" target="_blank" rel="noreferrer" className="text-link">Abrir endereço no mapa <ArrowUpRight size={15} /></a></div></div>
          <div className="regional-action"><p>Consulte disponibilidade para sua cidade.</p><a href={whatsAppLink("Olá, gostaria de consultar a disponibilidade de atendimento na minha cidade.")} target="_blank" rel="noreferrer" className="button button-primary">Consultar disponibilidade <ArrowUpRight size={17} /></a></div>
        </div>
      </section>

      <section className="section benefits-section" id="beneficios">
        <div className="container">
          <div className="section-heading benefits-heading"><div><span className="section-kicker">03 / MAIS DO QUE LOCALIZAR</span><h2>Informação que<br /><em>vira tranquilidade.</em></h2></div><p>O rastreador trabalha nos bastidores para você tomar decisões melhores, no momento certo.</p></div>
          <div className="benefit-grid"><article><span className="benefit-number">01</span><ShieldCheck size={22} /><h3>Alertas que importam</h3><p>Receba notificações de ignição, movimento, velocidade e saída de área sem excesso de ruído.</p></article><article><span className="benefit-number">02</span><Route size={22} /><h3>Histórico para entender</h3><p>Revise trajetos e transforme cada deslocamento em contexto para cuidar, proteger e melhorar.</p></article><article><span className="benefit-number">03</span><Smartphone size={22} /><h3>Controle na sua mão</h3><p>Uma plataforma clara para acompanhar veículos, pessoas e pets de onde você estiver.</p></article><article><span className="benefit-number">04</span><Headphones size={22} /><h3>Gente de verdade</h3><p>Suporte humano para orientar a instalação e ajudar quando você precisar.</p></article></div>
        </div>
      </section>

      <section className="section plans-section" id="planos">
        <div className="container">
          <div className="section-heading plans-heading">
            <div><span className="section-kicker">04 / ENCONTRE SEU PONTO DE CONTROLE</span><h2>Compare os planos<br /><em>de uma vez.</em></h2></div>
            <p>Todos lado a lado, para você escolher com clareza a proteção certa para o seu momento.</p>
          </div>
          <div className="plans-grid all-plans-grid">
            {allPlans.map((plan, index) => <article key={plan.name} className={plan.popular ? "plan-card popular" : "plan-card"}>
              {plan.popular && <div className="popular-ribbon"><Sparkles size={13} /> MAIS POPULAR</div>}
              <div className="plan-top"><div><span className="plan-audience">{plan.category}</span><h4>{plan.name}</h4><small className="plan-subtitle">{plan.audience}</small></div><span className="plan-card-index">{String(index + 1).padStart(2, "0")}</span></div>
              <div className="plan-price">{plan.price === "Sob consulta" ? <strong className="consult-price">{plan.price}</strong> : <><span>R$</span><strong>{plan.price}</strong><small>{plan.note}</small></>}</div>
              <div className="plan-rule" /><p className="feature-label">{plan.featureLabel}</p>
              <ul className="feature-list">{plan.features.map((feature, i) => <li key={feature}><span className="feature-check"><FeatureIcon index={i} /></span><TechnicalText text={feature} /></li>)}</ul>
              <a href={whatsAppLink(`Olá, tenho interesse no ${plan.name} da Vértice Tecnologia.`)} target="_blank" rel="noreferrer" className={plan.popular ? "plan-cta highlighted" : "plan-cta"}>{plan.cta}<ArrowUpRight size={17} /></a>
            </article>)}
          </div>
          <div className="tab-footnote"><span><ShieldCheck size={15} /> Sem fidelidade abusiva</span><span><LockKeyhole size={15} /> Dados protegidos</span><span><Headphones size={15} /> Suporte de verdade</span></div>
        </div>
      </section>

      <section className="section technology-section" id="tecnologia">
        <div className="container technology-grid">
          <div className="tech-display"><div className="tech-circle circle-large" /><div className="tech-circle circle-small" /><div className="tech-crosshair"><span /><span /></div><div className="tech-label label-top"><span>LATÊNCIA</span><strong>&lt; 12ms</strong></div><div className="tech-label label-bottom"><span>COBERTURA</span><strong>4G / GPS / LBS</strong></div><div className="tech-signal"><span /><span /><span /><span /></div><div className="tech-center">V</div></div>
          <div className="tech-copy"><span className="section-kicker">05 / POR TRÁS DO CONTROLE</span><h2>Precisão que<br /><em>faz diferença.</em></h2><p>Não é apenas um ponto no mapa. É uma camada inteligente de proteção que combina múltiplas tecnologias para entregar contexto, velocidade e decisão.</p><div className="tech-stats"><div><strong>99,8<span>%</span></strong><span>disponibilidade<br />da plataforma</span></div><div><strong>24<span>h</span></strong><span>suporte para<br />o que precisar</span></div><div><strong>4<span>G</span></strong><span>conexão onde<br />você estiver</span></div></div><a href="#planos" className="text-link">Ver soluções disponíveis <ArrowUpRight size={16} /></a></div>
        </div>
      </section>

      <section className="experience-section" id="experiencia">
        <div className="container experience-inner"><div className="experience-copy"><span className="section-kicker">06 / DO PRIMEIRO CONTATO AO DIA A DIA</span><h2>Proteção boa é aquela<br /><em>que continua presente.</em></h2><p>Você não está contratando apenas um equipamento. Está colocando uma camada de cuidado para funcionar todos os dias, com orientação, tecnologia e suporte próximo.</p><a href={whatsAppLink("Olá, quero entender como funciona a instalação e o suporte da Vértice.")} target="_blank" rel="noreferrer" className="button button-primary">Falar com um especialista <ArrowUpRight size={17} /></a></div><div className="experience-list"><div><span>01</span><div><h3>Instalação orientada</h3><p>O dispositivo é instalado de forma discreta e você entende como acompanhar tudo.</p></div></div><div><span>02</span><div><h3>Plataforma simples</h3><p>Alertas, localização e histórico em uma experiência feita para a rotina real.</p></div></div><div><span>03</span><div><h3>Suporte próximo</h3><p>Quando surgir uma dúvida, você fala com pessoas que conhecem a operação.</p></div></div></div></div>
      </section>

      <section className="section faq-section" id="duvidas">
        <div className="container faq-grid"><div className="faq-heading"><span className="section-kicker">07 / AINDA COM DÚVIDA?</span><h2>Clareza também<br /><em>é proteção.</em></h2><p>Se a resposta não estiver aqui, nossa equipe está pronta para conversar.</p><a href={whatsAppLink("Olá, tenho algumas dúvidas sobre os planos da Vértice Tecnologia.")} target="_blank" rel="noreferrer" className="button button-outline">Falar com a equipe <ArrowUpRight size={16} /></a></div><div className="faq-list">{faqs.map((faq, index) => <div className={openFaq === index ? "faq-item open" : "faq-item"} key={faq.q}><button type="button" onClick={() => setOpenFaq(openFaq === index ? null : index)}><span>{faq.q}</span><span className="faq-toggle"><ChevronDown size={17} /></span></button>{openFaq === index && <div className="faq-answer"><p>{faq.a}</p></div>}</div>)}</div></div>
      </section>

      <section className="cta-section" id="contato"><div className="container cta-inner"><div className="cta-orb" /><div className="cta-copy"><span className="section-kicker">A PRÓXIMA DECISÃO É SUA</span><h2>Mais presença.<br /><em>Mais tranquilidade.</em></h2><p>Descubra como a Vértice pode transformar a forma como você cuida do que importa.</p></div><div className="cta-action"><a href={whatsAppLink("Olá, quero encontrar meu plano ideal na Vértice Tecnologia.")} target="_blank" rel="noreferrer" className="button button-primary large">Quero encontrar meu plano <ArrowUpRight size={18} /></a><span>Resposta humana. Sem robô, sem enrolação.</span></div></div></section>

      <footer className="site-footer"><div className="container footer-top"><BrandMark /><div className="footer-nav"><a href="#como-funciona">Como funciona</a><a href="#planos">Planos</a><a href="#atendimento">Atendimento</a><a href="#tecnologia">Tecnologia</a><a href="#duvidas">Dúvidas</a></div><span className="footer-status"><i /> Sistema operacional</span></div><div className="container footer-bottom"><span>© 2025 Vértice Tecnologia. Todos os direitos reservados.</span><span>Feito para você estar presente, mesmo de longe.</span><a href="#top">Voltar ao topo <ArrowUpRight size={14} /></a></div></footer>
    </main>
  );
}
