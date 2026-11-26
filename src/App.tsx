import { useMemo, useState } from "react";
import {
  Bell,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleUserRound,
  Clock3,
  CreditCard,
  Eye,
  EyeOff,
  FileClock,
  FlaskConical,
  HeartPulse,
  HelpCircle,
  Home,
  Info,
  LocateFixed,
  LockKeyhole,
  Mail,
  MapPin,
  Menu,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Star,
  UserRound,
  WalletCards,
  X,
} from "lucide-react";

type Screen = "login" | "dashboard" | "search" | "details" | "booking" | "confirmation";

type Exam = {
  id: string;
  name: string;
  aliases: string[];
  category: string;
  description: string;
  preparation: string[];
  duration: string;
  resultTime: string;
  basePrice: number;
};

const standardBloodPreparation = [
  "Jejum recomendado de 8 horas, salvo orientação médica diferente.",
  "Água pode ser consumida normalmente.",
  "Leve um documento com foto e o pedido médico, se houver.",
  "Informe medicamentos em uso à equipe responsável.",
];

const noFastingPreparation = [
  "Não é necessário jejum, salvo orientação médica diferente.",
  "Mantenha sua rotina habitual antes da coleta.",
  "Leve um documento com foto e o pedido médico, se houver.",
  "Informe medicamentos em uso à equipe responsável.",
];

const exams: Exam[] = [
  {
    id: "hemograma-completo",
    name: "Hemograma completo",
    aliases: ["hemograma"],
    category: "Exames de sangue",
    description:
      "Analisa glóbulos vermelhos, glóbulos brancos e plaquetas, auxiliando na avaliação geral da saúde.",
    preparation: standardBloodPreparation,
    duration: "15 minutos",
    resultTime: "Em até 24 horas",
    basePrice: 68,
  },
  {
    id: "glicemia",
    name: "Glicemia",
    aliases: ["glicose", "glicemia em jejum"],
    category: "Exames metabólicos",
    description:
      "Mede a concentração de glicose no sangue e auxilia no acompanhamento do metabolismo glicêmico.",
    preparation: standardBloodPreparation,
    duration: "10 minutos",
    resultTime: "No mesmo dia",
    basePrice: 24,
  },
  {
    id: "colesterol-total",
    name: "Colesterol total",
    aliases: ["colesterol"],
    category: "Perfil lipídico",
    description:
      "Mede a quantidade total de colesterol circulante e compõe a avaliação do perfil lipídico.",
    preparation: standardBloodPreparation,
    duration: "10 minutos",
    resultTime: "No mesmo dia",
    basePrice: 31,
  },
  {
    id: "ultrassonografia-abdominal",
    name: "Ultrassonografia abdominal",
    aliases: ["ultrassom abdominal", "ultrassom"],
    category: "Diagnóstico por imagem",
    description:
      "Produz imagens dos órgãos do abdômen para apoiar a avaliação clínica de estruturas internas.",
    preparation: [
      "Jejum recomendado de 6 horas, conforme orientação da unidade.",
      "Beba água antes do exame se houver orientação para manter a bexiga cheia.",
      "Leve exames anteriores relacionados, se disponíveis.",
      "Leve um documento com foto e o pedido médico, se houver.",
    ],
    duration: "30 minutos",
    resultTime: "Em até 48 horas",
    basePrice: 96,
  },
  {
    id: "hemoglobina",
    name: "Hemoglobina",
    aliases: ["dosagem de hemoglobina"],
    category: "Exames de sangue",
    description:
      "Quantifica a hemoglobina presente nas hemácias e auxilia na investigação de alterações como anemia.",
    preparation: noFastingPreparation,
    duration: "10 minutos",
    resultTime: "Em até 24 horas",
    basePrice: 22,
  },
  {
    id: "hematocrito",
    name: "Hematócrito",
    aliases: ["ht", "volume globular"],
    category: "Exames de sangue",
    description: "Avalia a proporção de glóbulos vermelhos no volume total do sangue.",
    preparation: noFastingPreparation,
    duration: "10 minutos",
    resultTime: "Em até 24 horas",
    basePrice: 22,
  },
  {
    id: "ferritina",
    name: "Ferritina",
    aliases: ["ferritina serica"],
    category: "Exames de sangue",
    description:
      "Avalia os estoques de ferro do organismo por meio da dosagem de ferritina no sangue.",
    preparation: standardBloodPreparation,
    duration: "10 minutos",
    resultTime: "Em até 48 horas",
    basePrice: 47,
  },
  {
    id: "ferro-serico",
    name: "Ferro sérico",
    aliases: ["ferro no sangue"],
    category: "Exames de sangue",
    description:
      "Mede a quantidade de ferro circulante e contribui para a avaliação do metabolismo desse mineral.",
    preparation: standardBloodPreparation,
    duration: "10 minutos",
    resultTime: "Em até 24 horas",
    basePrice: 29,
  },
  {
    id: "vitamina-b12",
    name: "Vitamina B12",
    aliases: ["b12", "cobalamina"],
    category: "Vitaminas e minerais",
    description:
      "Mede os níveis de vitamina B12, importante para células sanguíneas e funcionamento neurológico.",
    preparation: standardBloodPreparation,
    duration: "10 minutos",
    resultTime: "Em até 3 dias",
    basePrice: 61,
  },
  {
    id: "vitamina-d",
    name: "Vitamina D",
    aliases: ["25 oh vitamina d", "25-oh vitamina d"],
    category: "Vitaminas e minerais",
    description:
      "Avalia a concentração de vitamina D, relacionada à saúde óssea e ao metabolismo do cálcio.",
    preparation: noFastingPreparation,
    duration: "10 minutos",
    resultTime: "Em até 3 dias",
    basePrice: 72,
  },
  {
    id: "tsh",
    name: "TSH",
    aliases: ["tireoestimulante", "hormonio tireoestimulante"],
    category: "Exames hormonais",
    description:
      "Mede o hormônio estimulante da tireoide e auxilia na avaliação da função tireoidiana.",
    preparation: noFastingPreparation,
    duration: "10 minutos",
    resultTime: "Em até 48 horas",
    basePrice: 43,
  },
  {
    id: "t3",
    name: "T3",
    aliases: ["triiodotironina", "t3 total"],
    category: "Exames hormonais",
    description:
      "Quantifica a triiodotironina e complementa a investigação da atividade da tireoide.",
    preparation: noFastingPreparation,
    duration: "10 minutos",
    resultTime: "Em até 48 horas",
    basePrice: 44,
  },
  {
    id: "t4",
    name: "T4",
    aliases: ["tiroxina", "t4 livre", "t4 total"],
    category: "Exames hormonais",
    description: "Mede a tiroxina circulante e auxilia na análise do funcionamento da tireoide.",
    preparation: noFastingPreparation,
    duration: "10 minutos",
    resultTime: "Em até 48 horas",
    basePrice: 45,
  },
  {
    id: "hemoglobina-glicada",
    name: "Hemoglobina glicada (HbA1c)",
    aliases: ["hba1c", "hemoglobina glicada", "a1c"],
    category: "Exames metabólicos",
    description:
      "Estima a média da glicose no sangue nos últimos meses e apoia o acompanhamento glicêmico.",
    preparation: noFastingPreparation,
    duration: "10 minutos",
    resultTime: "Em até 24 horas",
    basePrice: 42,
  },
  {
    id: "ureia",
    name: "Ureia",
    aliases: ["ureia serica"],
    category: "Exames metabólicos",
    description:
      "Mede a ureia no sangue e contribui para a avaliação do metabolismo e da função renal.",
    preparation: standardBloodPreparation,
    duration: "10 minutos",
    resultTime: "No mesmo dia",
    basePrice: 23,
  },
  {
    id: "creatinina",
    name: "Creatinina",
    aliases: ["creatinina serica"],
    category: "Exames metabólicos",
    description:
      "Avalia a concentração de creatinina, um dos marcadores utilizados para acompanhar a função renal.",
    preparation: noFastingPreparation,
    duration: "10 minutos",
    resultTime: "No mesmo dia",
    basePrice: 24,
  },
  {
    id: "acido-urico",
    name: "Ácido úrico",
    aliases: ["uricemia"],
    category: "Exames metabólicos",
    description:
      "Mede o ácido úrico circulante e auxilia na investigação de alterações do seu metabolismo.",
    preparation: standardBloodPreparation,
    duration: "10 minutos",
    resultTime: "No mesmo dia",
    basePrice: 25,
  },
  {
    id: "hdl",
    name: "HDL",
    aliases: ["colesterol hdl", "hdl colesterol"],
    category: "Perfil lipídico",
    description:
      "Mede a fração HDL do colesterol, utilizada na composição da avaliação do perfil lipídico.",
    preparation: standardBloodPreparation,
    duration: "10 minutos",
    resultTime: "No mesmo dia",
    basePrice: 27,
  },
  {
    id: "ldl",
    name: "LDL",
    aliases: ["colesterol ldl", "ldl colesterol"],
    category: "Perfil lipídico",
    description:
      "Avalia a fração LDL do colesterol como parte da análise laboratorial do perfil lipídico.",
    preparation: standardBloodPreparation,
    duration: "10 minutos",
    resultTime: "No mesmo dia",
    basePrice: 28,
  },
  {
    id: "vldl",
    name: "VLDL",
    aliases: ["colesterol vldl", "vldl colesterol"],
    category: "Perfil lipídico",
    description: "Estima a fração VLDL, relacionada ao transporte de triglicerídeos no sangue.",
    preparation: standardBloodPreparation,
    duration: "10 minutos",
    resultTime: "No mesmo dia",
    basePrice: 28,
  },
  {
    id: "triglicerideos",
    name: "Triglicerídeos",
    aliases: ["triglicerides"],
    category: "Perfil lipídico",
    description:
      "Mede a concentração de triglicerídeos e complementa a avaliação das gorduras no sangue.",
    preparation: standardBloodPreparation,
    duration: "10 minutos",
    resultTime: "No mesmo dia",
    basePrice: 27,
  },
  {
    id: "testosterona",
    name: "Testosterona",
    aliases: ["testosterona total"],
    category: "Exames hormonais",
    description:
      "Mede a testosterona circulante para apoiar avaliações hormonais solicitadas pelo profissional de saúde.",
    preparation: noFastingPreparation,
    duration: "10 minutos",
    resultTime: "Em até 3 dias",
    basePrice: 55,
  },
  {
    id: "estradiol",
    name: "Estradiol",
    aliases: ["e2"],
    category: "Exames hormonais",
    description:
      "Quantifica o estradiol e auxilia no acompanhamento da função hormonal e reprodutiva.",
    preparation: noFastingPreparation,
    duration: "10 minutos",
    resultTime: "Em até 3 dias",
    basePrice: 58,
  },
  {
    id: "cortisol",
    name: "Cortisol",
    aliases: ["cortisol serico"],
    category: "Exames hormonais",
    description:
      "Mede o cortisol no sangue e auxilia na avaliação da resposta hormonal do organismo.",
    preparation: [
      "Confirme o horário de coleta indicado no pedido médico.",
      "Evite esforço físico intenso antes do exame.",
      "Leve um documento com foto e o pedido médico, se houver.",
      "Informe medicamentos em uso à equipe responsável.",
    ],
    duration: "10 minutos",
    resultTime: "Em até 3 dias",
    basePrice: 52,
  },
  {
    id: "eas",
    name: "EAS (Urina tipo 1)",
    aliases: ["eas", "urina tipo 1", "sumario de urina"],
    category: "Exames de urina",
    description: "Analisa características físicas, químicas e microscópicas da urina.",
    preparation: [
      "Prefira a primeira urina da manhã ou siga a orientação recebida.",
      "Realize a higiene íntima antes da coleta.",
      "Despreze o primeiro jato e colete o jato médio no frasco apropriado.",
      "Entregue a amostra dentro do prazo informado pela unidade.",
    ],
    duration: "10 minutos",
    resultTime: "Em até 24 horas",
    basePrice: 26,
  },
  {
    id: "urocultura",
    name: "Urocultura",
    aliases: ["cultura de urina"],
    category: "Exames de urina",
    description:
      "Pesquisa o crescimento de microrganismos na urina e pode apoiar a investigação de infecções urinárias.",
    preparation: [
      "Realize a higiene íntima antes da coleta.",
      "Despreze o primeiro jato e colete o jato médio em frasco estéril.",
      "Informe o uso recente de antibióticos.",
      "Entregue a amostra dentro do prazo informado pela unidade.",
    ],
    duration: "10 minutos",
    resultTime: "Em até 5 dias",
    basePrice: 54,
  },
  {
    id: "parasitologico-fezes",
    name: "Parasitológico de fezes",
    aliases: ["exame de fezes", "parasitologico"],
    category: "Outros exames laboratoriais",
    description:
      "Pesquisa estruturas relacionadas a parasitas intestinais em uma amostra de fezes.",
    preparation: [
      "Colete a amostra no frasco apropriado, evitando contato com água ou urina.",
      "Não utilize laxantes sem orientação profissional.",
      "Identifique o frasco conforme a orientação da unidade.",
      "Entregue a amostra dentro do prazo informado.",
    ],
    duration: "10 minutos",
    resultTime: "Em até 3 dias",
    basePrice: 38,
  },
  {
    id: "psa",
    name: "PSA",
    aliases: ["antigeno prostatico especifico", "psa total"],
    category: "Outros exames laboratoriais",
    description:
      "Mede o antígeno prostático específico no sangue para apoiar a avaliação clínica da próstata.",
    preparation: [
      "Siga as orientações médicas sobre atividades a evitar antes da coleta.",
      "Informe procedimentos urológicos recentes.",
      "Leve um documento com foto e o pedido médico, se houver.",
      "Informe medicamentos em uso à equipe responsável.",
    ],
    duration: "10 minutos",
    resultTime: "Em até 3 dias",
    basePrice: 63,
  },
];

const normalizeSearch = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const findExam = (query: string) => {
  const normalizedQuery = normalizeSearch(query);
  if (!normalizedQuery) return null;

  return (
    exams.find((exam) =>
      [exam.name, ...exam.aliases].some((term) => normalizeSearch(term) === normalizedQuery),
    ) ??
    exams.find((exam) =>
      [exam.name, ...exam.aliases].some((term) => normalizeSearch(term).includes(normalizedQuery)),
    ) ??
    null
  );
};

const labs = [
  {
    name: "Laboratório Vida",
    neighborhood: "Ponta Verde",
    distance: "1,2 km",
    price: 68,
    oldPrice: 82,
    rating: "4,9",
    reviews: "328",
    next: "Hoje, 14:30",
    priceFactor: 1,
    accent: true,
  },
  {
    name: "Clínica Bem-Estar",
    neighborhood: "Jatiúca",
    distance: "2,4 km",
    price: 74,
    oldPrice: 89,
    rating: "4,8",
    reviews: "214",
    next: "Amanhã, 07:20",
    priceFactor: 1.09,
  },
  {
    name: "Centro Diagnóstico Atlântico",
    neighborhood: "Farol",
    distance: "4,1 km",
    price: 59,
    oldPrice: 72,
    rating: "4,7",
    reviews: "186",
    next: "Amanhã, 08:00",
    priceFactor: 0.89,
  },
];

const getDemoOfferings = (exam: Exam) =>
  labs.map((lab) => {
    const price = Math.max(18, Math.round(exam.basePrice * lab.priceFactor));
    return { ...lab, price, oldPrice: Math.round(price * 1.2) };
  });

const timeSlots = ["07:20", "08:00", "08:40", "09:20", "10:00", "14:30", "15:10", "16:30"];

function Logo({ light = false }: { light?: boolean }) {
  return (
    <button className={`brand ${light ? "brand-light" : ""}`} aria-label="Exame-Fácil, início">
      <span className="brand-mark">
        <HeartPulse size={22} strokeWidth={2.4} />
      </span>
      <span>
        Exame<span>Fácil</span>
      </span>
    </button>
  );
}

function Pill({
  children,
  tone = "blue",
}: {
  children: React.ReactNode;
  tone?: "blue" | "green" | "gray";
}) {
  return <span className={`pill pill-${tone}`}>{children}</span>;
}

function Header({
  screen,
  go,
  notificationsOpen,
  setNotificationsOpen,
}: {
  screen: Screen;
  go: (screen: Screen) => void;
  notificationsOpen: boolean;
  setNotificationsOpen: (open: boolean) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const nav = [
    { label: "Início", icon: Home, target: "dashboard" as Screen },
    { label: "Buscar exames", icon: Search, target: "search" as Screen },
    { label: "Meu histórico", icon: FileClock, target: "dashboard" as Screen },
  ];

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <Logo />
        <nav className={menuOpen ? "nav nav-open" : "nav"} aria-label="Navegação principal">
          {nav.map(({ label, icon: Icon, target }) => (
            <button
              key={label}
              className={
                screen === target ||
                (label === "Buscar exames" && ["details", "booking"].includes(screen))
                  ? "nav-item active"
                  : "nav-item"
              }
              onClick={() => {
                go(target);
                setMenuOpen(false);
              }}
            >
              <Icon size={17} />
              {label}
            </button>
          ))}
          <button className="nav-item mobile-only">
            <CircleUserRound size={17} /> Meu perfil
          </button>
        </nav>
        <div className="header-actions">
          <div className="notification-wrap">
            <button
              className="icon-button notification-button"
              aria-label="Notificações"
              onClick={() => setNotificationsOpen(!notificationsOpen)}
            >
              <Bell size={20} />
              <span className="notification-dot" />
            </button>
            {notificationsOpen && (
              <div className="notification-popover">
                <div className="popover-head">
                  <strong>Notificações</strong>
                  <button onClick={() => setNotificationsOpen(false)}>
                    <X size={18} />
                  </button>
                </div>
                <div className="notice unread">
                  <span className="notice-icon">
                    <CalendarDays size={18} />
                  </span>
                  <div>
                    <strong>Lembrete de exame</strong>
                    <p>Seu hemograma é amanhã às 08:40.</p>
                    <small>Há 5 min</small>
                  </div>
                </div>
                <div className="notice">
                  <span className="notice-icon green">
                    <WalletCards size={18} />
                  </span>
                  <div>
                    <strong>Orçamento atualizado</strong>
                    <p>Um orçamento salvo teve redução de preço.</p>
                    <small>Ontem</small>
                  </div>
                </div>
              </div>
            )}
          </div>
          <button className="profile">
            <span className="avatar">MA</span>
            <span className="profile-copy">
              <strong>Mariana Alves</strong>
              <small>Minha conta</small>
            </span>
            <ChevronRight size={16} />
          </button>
          <button
            className="menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menu"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </header>
  );
}

function Breadcrumbs({ items, onBack }: { items: string[]; onBack?: () => void }) {
  return (
    <div className="breadcrumbs">
      {onBack && (
        <button onClick={onBack}>
          <ChevronLeft size={17} /> Voltar
        </button>
      )}
      <div>
        <span>Início</span>
        {items.map((item, index) => (
          <span key={item} className={index === items.length - 1 ? "current" : ""}>
            <ChevronRight size={14} /> {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function Login({ onLogin }: { onLogin: () => void }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("mariana.alves@email.com");
  const [password, setPassword] = useState("examefacil");

  return (
    <main className="login-screen">
      <section className="login-story">
        <div className="story-content">
          <Logo light />
          <div className="story-tag">
            <Sparkles size={15} /> Cuidado que cabe na sua rotina
          </div>
          <h1>
            Sua saúde,
            <br />
            <em>sem complicação.</em>
          </h1>
          <p>Encontre exames, compare opções e agende seu atendimento em poucos minutos.</p>
          <div className="story-benefits">
            <span>
              <Check size={17} /> Preços transparentes
            </span>
            <span>
              <Check size={17} /> Horários em um só lugar
            </span>
            <span>
              <Check size={17} /> Jornada simples e segura
            </span>
          </div>
        </div>
        <div className="story-decoration">
          <div className="pulse-ring ring-one" />
          <div className="pulse-ring ring-two" />
          <FlaskConical size={54} />
        </div>
        <p className="login-disclaimer">Plataforma demonstrativa para fins acadêmicos.</p>
      </section>
      <section className="login-panel">
        <div className="login-card">
          <div className="mobile-login-logo">
            <Logo />
          </div>
          <Pill>Área do paciente</Pill>
          <h2>Que bom ter você aqui</h2>
          <p className="muted">Entre na sua conta para cuidar dos seus próximos exames.</p>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              onLogin();
            }}
          >
            <label>E-mail</label>
            <div className="input-shell">
              <Mail size={19} />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                aria-label="E-mail"
              />
            </div>
            <div className="label-row">
              <label>Senha</label>
              <button type="button" className="text-button">
                Esqueci minha senha
              </button>
            </div>
            <div className="input-shell">
              <LockKeyhole size={19} />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                aria-label="Senha"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Mostrar senha"
              >
                {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>
            </div>
            <label className="remember">
              <input type="checkbox" defaultChecked /> <span>Lembrar meu acesso</span>
            </label>
            <button className="primary-button large" type="submit">
              Entrar <ChevronRight size={19} />
            </button>
          </form>
          <div className="divider">
            <span>ou continue com</span>
          </div>
          <button className="google-button">
            <span>G</span> Continuar com Google
          </button>
          <p className="signup">
            Ainda não tem uma conta? <button>Criar conta grátis</button>
          </p>
          <div className="secure-note">
            <ShieldCheck size={18} /> Seus dados são protegidos e tratados com segurança.
          </div>
        </div>
      </section>
    </main>
  );
}

function Dashboard({
  go,
  onSearch,
}: {
  go: (screen: Screen) => void;
  onSearch: (query: string) => void;
}) {
  const [query, setQuery] = useState("");
  return (
    <main className="page">
      <section className="welcome-row">
        <div>
          <Pill tone="green">Terça-feira, 18 de novembro</Pill>
          <h1>
            Olá, Mariana! <span>Como você está?</span>
          </h1>
          <p>Organize seus cuidados e acompanhe seus exames em um só lugar.</p>
        </div>
        <div className="health-score">
          <span className="score-icon">
            <HeartPulse size={24} />
          </span>
          <div>
            <small>Jornada de cuidado</small>
            <strong>2 exames em dia</strong>
          </div>
          <ChevronRight size={18} />
        </div>
      </section>

      <section className="search-hero">
        <div className="search-copy">
          <span>ENCONTRE SEU EXAME</span>
          <h2>O que você precisa hoje?</h2>
          <p>Compare preços e horários em laboratórios próximos.</p>
        </div>
        <form
          className="hero-search"
          onSubmit={(e) => {
            e.preventDefault();
            onSearch(query);
          }}
        >
          <Search size={21} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Digite o nome do exame..."
          />
          <span className="location-chip">
            <MapPin size={16} /> Maceió, AL
          </span>
          <button type="submit">Buscar</button>
        </form>
        <div className="popular-searches">
          <span>Mais buscados:</span>
          {["Hemograma", "Vitamina D", "TSH", "HbA1c", "Ultrassom"].map((item) => (
            <button key={item} onClick={() => onSearch(item)}>
              {item}
            </button>
          ))}
        </div>
      </section>

      <section className="dashboard-grid">
        <div className="main-column">
          <div className="section-heading">
            <div>
              <h2>Próximo exame</h2>
              <p>Seu atendimento está chegando.</p>
            </div>
            <button className="text-button">
              Ver detalhes <ChevronRight size={16} />
            </button>
          </div>
          <article className="appointment-card">
            <div className="date-card">
              <strong>19</strong>
              <span>NOV</span>
              <small>Quarta</small>
            </div>
            <div className="appointment-main">
              <div className="card-topline">
                <Pill tone="green">Confirmado</Pill>
                <span>
                  <Clock3 size={15} /> 08:40
                </span>
              </div>
              <h3>Hemograma completo</h3>
              <p>
                <FlaskConical size={16} /> Laboratório Vida
              </p>
              <p>
                <MapPin size={16} /> Av. Álvaro Otacílio, 3.191 — Ponta Verde
              </p>
            </div>
            <div className="appointment-actions">
              <button className="secondary-button">Ver preparo</button>
              <button className="icon-button">
                <CalendarDays size={19} />
              </button>
            </div>
          </article>

          <div className="section-heading spaced">
            <div>
              <h2>Exames recentes</h2>
              <p>Seu histórico de cuidados.</p>
            </div>
            <button className="text-button">
              Ver histórico <ChevronRight size={16} />
            </button>
          </div>
          <div className="recent-grid">
            {[
              ["Glicemia em jejum", "03 nov 2026", "Concluído"],
              ["Colesterol total", "22 set 2026", "Concluído"],
              ["Vitamina D", "14 ago 2026", "Concluído"],
            ].map(([name, date, status]) => (
              <article className="mini-exam-card" key={name}>
                <span className="exam-icon">
                  <FlaskConical size={19} />
                </span>
                <div>
                  <h3>{name}</h3>
                  <p>{date}</p>
                </div>
                <Pill tone="green">{status}</Pill>
                <ChevronRight size={18} />
              </article>
            ))}
          </div>
        </div>

        <aside className="side-column">
          <div className="section-heading">
            <div>
              <h2>Para você</h2>
              <p>Acessos rápidos.</p>
            </div>
          </div>
          <button className="quick-card blue" onClick={() => go("search")}>
            <span>
              <Search />
            </span>
            <div>
              <strong>Buscar novo exame</strong>
              <small>Compare preços e horários</small>
            </div>
            <ChevronRight />
          </button>
          <button className="quick-card mint">
            <span>
              <WalletCards />
            </span>
            <div>
              <strong>Orçamentos salvos</strong>
              <small>Você tem 3 opções salvas</small>
            </div>
            <ChevronRight />
          </button>
          <article className="reminder-card">
            <div className="reminder-head">
              <span>
                <Bell size={18} />
              </span>
              <Pill tone="blue">Lembrete</Pill>
            </div>
            <h3>Prepare-se para amanhã</h3>
            <p>O exame requer jejum de 8 horas. Você poderá beber água normalmente.</p>
            <button>
              Ver orientações <ChevronRight size={16} />
            </button>
          </article>
        </aside>
      </section>
    </main>
  );
}

function SearchScreen({
  go,
  selectedExam,
  setSelectedExam,
}: {
  go: (screen: Screen) => void;
  selectedExam: Exam;
  setSelectedExam: (exam: Exam) => void;
}) {
  const [query, setQuery] = useState(selectedExam.name);
  const [distance, setDistance] = useState(5);
  const [price, setPrice] = useState(100);
  const [agreement, setAgreement] = useState("Particular");
  const [mobileFilters, setMobileFilters] = useState(false);
  const [sort, setSort] = useState("Recomendados");
  const [searchError, setSearchError] = useState(false);

  const offerings = useMemo(() => {
    const available = getDemoOfferings(selectedExam).filter((lab) => {
      const distanceInKm = Number(lab.distance.replace(",", ".").replace(" km", ""));
      return lab.price <= price && distanceInKm <= distance;
    });

    if (sort === "Menor preço") return available.toSorted((a, b) => a.price - b.price);
    if (sort === "Mais próximos") {
      return available.toSorted(
        (a, b) =>
          Number(a.distance.replace(",", ".").replace(" km", "")) -
          Number(b.distance.replace(",", ".").replace(" km", "")),
      );
    }
    return available;
  }, [selectedExam, price, distance, sort]);

  const selectExam = (exam: Exam) => {
    setSelectedExam(exam);
    setQuery(exam.name);
    setSearchError(false);
  };

  const submitSearch = () => {
    const match = findExam(query);
    if (match) selectExam(match);
    else setSearchError(true);
  };

  const filters = (
    <div className="filter-content">
      <div className="filter-mobile-head">
        <strong>Filtros</strong>
        <button onClick={() => setMobileFilters(false)}>
          <X />
        </button>
      </div>
      <div className="filter-title">
        <span>
          <SlidersHorizontal size={18} /> Filtros
        </span>
        <button
          onClick={() => {
            setDistance(5);
            setPrice(100);
            setAgreement("Particular");
          }}
        >
          Limpar
        </button>
      </div>
      <div className="filter-group">
        <label>Localização</label>
        <div className="compact-input">
          <MapPin size={17} />
          <span>Maceió, AL</span>
          <ChevronRight size={16} />
        </div>
        <button className="locate">
          <LocateFixed size={16} /> Usar minha localização
        </button>
      </div>
      <div className="filter-group">
        <label>Distância máxima</label>
        <div className="range-label">
          <span>Até {distance} km</span>
          <strong>{distance} km</strong>
        </div>
        <input
          type="range"
          min="1"
          max="15"
          value={distance}
          onChange={(e) => setDistance(+e.target.value)}
        />
        <div className="range-marks">
          <span>1 km</span>
          <span>15 km</span>
        </div>
      </div>
      <div className="filter-group">
        <label>Faixa de preço</label>
        <div className="range-label">
          <span>Até</span>
          <strong>R$ {price},00</strong>
        </div>
        <input
          type="range"
          min="50"
          max="180"
          step="5"
          value={price}
          onChange={(e) => setPrice(+e.target.value)}
        />
        <div className="range-marks">
          <span>R$ 50</span>
          <span>R$ 180+</span>
        </div>
      </div>
      <div className="filter-group">
        <label>Forma de atendimento</label>
        {["Particular", "Unimed", "Bradesco Saúde"].map((item) => (
          <label className="check-row" key={item}>
            <input
              type="radio"
              name="agreement"
              checked={agreement === item}
              onChange={() => setAgreement(item)}
            />
            <span>{item}</span>
          </label>
        ))}
      </div>
      <button className="primary-button filter-apply" onClick={() => setMobileFilters(false)}>
        Aplicar filtros
      </button>
      <div className="demo-note">
        <Info size={16} />
        <span>Preços e disponibilidades são demonstrativos para fins acadêmicos.</span>
      </div>
    </div>
  );

  return (
    <main className="page search-page">
      <Breadcrumbs items={["Buscar exames"]} />
      <section className="search-page-head">
        <div>
          <h1>Encontre o exame ideal para você</h1>
          <p>Compare opções e escolha com tranquilidade.</p>
        </div>
      </section>
      <form
        className="search-bar"
        onSubmit={(e) => {
          e.preventDefault();
          submitSearch();
        }}
      >
        <Search size={21} />
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSearchError(false);
          }}
          placeholder="Qual exame você procura?"
          list="exam-catalog"
        />
        <datalist id="exam-catalog">
          {exams.map((exam) => (
            <option key={exam.id} value={exam.name}>
              {exam.category}
            </option>
          ))}
        </datalist>
        {query && (
          <button
            type="button"
            className="clear-search"
            onClick={() => {
              setQuery("");
              setSearchError(false);
            }}
          >
            <X size={18} />
          </button>
        )}
        <button className="primary-button" type="submit">
          Buscar exame
        </button>
      </form>
      <div className="suggestion-row">
        <span>Sugestões:</span>
        {["Hemograma completo", "Vitamina D", "TSH", "HbA1c", "Urocultura", "PSA"].map(
          (suggestion) => {
            const exam = findExam(suggestion)!;
            return (
              <button key={exam.id} onClick={() => selectExam(exam)}>
                {exam.name}
              </button>
            );
          },
        )}
      </div>

      <div className="results-layout">
        <aside className="filters">{filters}</aside>
        {mobileFilters && (
          <div className="filter-overlay">
            <div className="filter-drawer">{filters}</div>
          </div>
        )}
        <section className="results">
          <div className="results-head">
            <div>
              <h2>
                {searchError ? "Nenhum exame encontrado" : `${offerings.length} opções encontradas`}
              </h2>
              <p>
                {searchError
                  ? `Não encontramos “${query}” no catálogo`
                  : `Para “${selectedExam.name}” · ${selectedExam.category} em Maceió`}
              </p>
            </div>
            <div className="sort-actions">
              <button className="mobile-filter-button" onClick={() => setMobileFilters(true)}>
                <SlidersHorizontal size={18} /> Filtros
              </button>
              <label>
                Ordenar por
                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                  <option>Recomendados</option>
                  <option>Menor preço</option>
                  <option>Mais próximos</option>
                </select>
              </label>
            </div>
          </div>
          <div className="context-banner">
            <Info size={17} />
            <span>
              {searchError
                ? "Confira a digitação ou selecione um exame nas sugestões do catálogo."
                : `${selectedExam.description} Valores e disponibilidades são demonstrativos.`}
            </span>
          </div>
          {!searchError && (
            <div className="lab-list">
              {offerings.map((lab, index) => (
                <article className={`lab-card ${lab.accent ? "recommended" : ""}`} key={lab.name}>
                  {lab.accent && (
                    <div className="recommended-label">
                      <Sparkles size={14} /> Ótimo equilíbrio
                    </div>
                  )}
                  <div className="lab-logo">
                    <FlaskConical size={25} />
                  </div>
                  <div className="lab-info">
                    <div className="lab-title-row">
                      <div>
                        <h3>{lab.name}</h3>
                        <p>{lab.neighborhood} · Maceió, AL</p>
                      </div>
                      <span className="distance">
                        <MapPin size={15} /> {lab.distance}
                      </span>
                    </div>
                    <div className="rating">
                      <Star size={16} fill="currentColor" />
                      <strong>{lab.rating}</strong>
                      <span>({lab.reviews} avaliações demonstrativas)</span>
                    </div>
                    <div className="lab-meta">
                      <span>
                        <CheckCircle2 size={16} /> Resultado digital
                      </span>
                      <span>
                        <Clock3 size={16} /> Próximo horário: <strong>{lab.next}</strong>
                      </span>
                    </div>
                  </div>
                  <div className="lab-price">
                    <small>a partir de</small>
                    <span>
                      R$ <strong>{lab.price}</strong>,00
                    </span>
                    <del>R$ {lab.oldPrice},00</del>
                    <button
                      className={index === 0 ? "primary-button" : "secondary-button"}
                      onClick={() => {
                        setSelectedExam(selectedExam);
                        go("details");
                      }}
                    >
                      Ver detalhes <ChevronRight size={17} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
          {!searchError && offerings.length === 0 && (
            <div className="comparison-hint">
              <span>
                <SlidersHorizontal size={18} />
              </span>
              <div>
                <strong>Nenhuma opção com os filtros atuais</strong>
                <p>
                  Aumente a distância ou a faixa de preço para visualizar opções demonstrativas.
                </p>
              </div>
            </div>
          )}
          <div className="comparison-hint">
            <span>
              <SlidersHorizontal size={18} />
            </span>
            <div>
              <strong>Compare antes de escolher</strong>
              <p>
                Preço, distância e avaliação são apresentados juntos para facilitar sua decisão.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function Details({
  go,
  selectedExam,
  selectedTime,
  setSelectedTime,
}: {
  go: (screen: Screen) => void;
  selectedExam: Exam;
  selectedTime: string;
  setSelectedTime: (time: string) => void;
}) {
  const [selectedDate, setSelectedDate] = useState(1);
  const [saved, setSaved] = useState(false);
  const dates = [
    ["TER", "18", "Hoje"],
    ["QUA", "19", "Amanhã"],
    ["QUI", "20", ""],
    ["SEX", "21", ""],
    ["SÁB", "22", ""],
  ];

  return (
    <main className="page">
      <Breadcrumbs items={["Buscar exames", "Detalhes"]} onBack={() => go("search")} />
      <div className="details-layout">
        <section className="details-main">
          <article className="exam-heading-card">
            <div className="lab-logo large">
              <FlaskConical size={29} />
            </div>
            <div>
              <Pill tone="blue">{selectedExam.category}</Pill>
              <h1>{selectedExam.name}</h1>
              <p>Laboratório Vida · Unidade Ponta Verde</p>
            </div>
            <div className="heading-rating">
              <Star size={17} fill="currentColor" />
              <strong>4,9</strong>
              <span>328 avaliações demonstrativas</span>
            </div>
          </article>
          <div className="info-tabs">
            <button className="active">Sobre o exame</button>
            <button>Preparo</button>
            <button>Localização</button>
          </div>
          <article className="content-card">
            <h2>Sobre o exame</h2>
            <p>{selectedExam.description}</p>
            <div className="feature-row">
              <div>
                <span>
                  <Clock3 />
                </span>
                <small>Tempo estimado</small>
                <strong>{selectedExam.duration}</strong>
              </div>
              <div>
                <span>
                  <FileClock />
                </span>
                <small>Resultado</small>
                <strong>{selectedExam.resultTime}</strong>
              </div>
              <div>
                <span>
                  <ShieldCheck />
                </span>
                <small>Atendimento</small>
                <strong>Particular</strong>
              </div>
            </div>
          </article>
          <article className="content-card preparation">
            <div className="content-title">
              <span>
                <Info />
              </span>
              <div>
                <h2>Preparo e orientações</h2>
                <p>Leia com atenção antes do seu atendimento.</p>
              </div>
            </div>
            <ul>
              {selectedExam.preparation.map((instruction) => (
                <li key={instruction}>
                  <Check size={17} /> {instruction}
                </li>
              ))}
            </ul>
          </article>
          <article className="content-card location-card">
            <div>
              <h2>Local do atendimento</h2>
              <h3>Laboratório Vida — Ponta Verde</h3>
              <p>
                Av. Álvaro Otacílio, 3.191 — Ponta Verde
                <br />
                Maceió, AL · CEP 57035-180
              </p>
              <button className="text-button">
                <MapPin size={16} /> Ver no mapa
              </button>
            </div>
            <div className="map-placeholder">
              <MapPin />
              <span>1,2 km de você</span>
            </div>
          </article>
        </section>

        <aside className="booking-panel">
          <div className="price-block">
            <span>Valor do exame</span>
            <div>
              <small>R$</small>
              <strong>{selectedExam.basePrice}</strong>
              <small>,00</small>
            </div>
            <p>Pagamento no dia do atendimento</p>
          </div>
          <div className="booking-divider" />
          <div className="panel-heading">
            <div>
              <h3>Escolha uma data</h3>
              <p>Novembro de 2026</p>
            </div>
            <div>
              <button>
                <ChevronLeft />
              </button>
              <button>
                <ChevronRight />
              </button>
            </div>
          </div>
          <div className="date-options">
            {dates.map(([day, date, note], index) => (
              <button
                className={selectedDate === index ? "selected" : ""}
                onClick={() => setSelectedDate(index)}
                key={date}
              >
                <small>{day}</small>
                <strong>{date}</strong>
                <span>{note || "Nov"}</span>
              </button>
            ))}
          </div>
          <h3 className="time-heading">Horários disponíveis</h3>
          <div className="time-grid">
            {timeSlots.map((time) => (
              <button
                key={time}
                className={selectedTime === time ? "selected" : ""}
                onClick={() => setSelectedTime(time)}
              >
                {time}
              </button>
            ))}
          </div>
          <div className="availability">
            <CheckCircle2 size={17} />
            <span>Horário disponível para simulação</span>
          </div>
          <button className="primary-button large" onClick={() => go("booking")}>
            Agendar exame <ChevronRight size={18} />
          </button>
          <button
            className={`save-button ${saved ? "saved" : ""}`}
            onClick={() => setSaved(!saved)}
          >
            {saved ? <Check size={18} /> : <WalletCards size={18} />}{" "}
            {saved ? "Orçamento salvo" : "Salvar orçamento"}
          </button>
          <p className="panel-secure">
            <ShieldCheck size={16} /> Agendamento seguro. Você poderá revisar tudo antes de
            confirmar.
          </p>
        </aside>
      </div>
    </main>
  );
}

function Stepper() {
  return (
    <div className="stepper">
      <div className="done">
        <span>
          <Check size={16} />
        </span>
        <div>
          <strong>Escolha</strong>
          <small>Exame e horário</small>
        </div>
      </div>
      <i />
      <div className="active">
        <span>2</span>
        <div>
          <strong>Seus dados</strong>
          <small>Identificação</small>
        </div>
      </div>
      <i />
      <div>
        <span>3</span>
        <div>
          <strong>Confirmação</strong>
          <small>Revisão final</small>
        </div>
      </div>
    </div>
  );
}

function Booking({
  go,
  selectedExam,
  selectedTime,
  payment,
  setPayment,
}: {
  go: (screen: Screen) => void;
  selectedExam: Exam;
  selectedTime: string;
  payment: string;
  setPayment: (payment: string) => void;
}) {
  const [accepted, setAccepted] = useState(true);
  return (
    <main className="page booking-page">
      <Breadcrumbs items={["Buscar exames", "Agendamento"]} onBack={() => go("details")} />
      <div className="booking-title">
        <div>
          <h1>Finalize seu agendamento</h1>
          <p>Revise os dados e confirme sua simulação.</p>
        </div>
        <Pill tone="gray">Ambiente demonstrativo</Pill>
      </div>
      <Stepper />
      <div className="checkout-layout">
        <section className="checkout-main">
          <article className="form-card">
            <div className="form-card-head">
              <span>
                <UserRound />
              </span>
              <div>
                <h2>Dados do paciente</h2>
                <p>Usaremos estas informações para identificar o atendimento.</p>
              </div>
            </div>
            <div className="form-grid">
              <label className="wide">
                Nome completo
                <input defaultValue="Mariana Alves" />
              </label>
              <label>
                CPF
                <input defaultValue="***.482.***-**" />
              </label>
              <label>
                Data de nascimento
                <input defaultValue="14/05/1994" />
              </label>
              <label>
                Telefone
                <input defaultValue="(82) 9 9876-5432" />
              </label>
              <label>
                E-mail
                <input defaultValue="mariana.alves@email.com" />
              </label>
            </div>
          </article>
          <article className="form-card">
            <div className="form-card-head">
              <span>
                <CreditCard />
              </span>
              <div>
                <h2>Forma de pagamento</h2>
                <p>O pagamento será realizado no local.</p>
              </div>
            </div>
            <div className="payment-options">
              {[
                ["Cartão", "Crédito ou débito no local", CreditCard],
                ["PIX", "Pagamento instantâneo", Sparkles],
                ["Dinheiro", "Pague na recepção", WalletCards],
              ].map(([name, note, Icon]) => (
                <button
                  key={name as string}
                  className={payment === name ? "selected" : ""}
                  onClick={() => setPayment(name as string)}
                >
                  <span>
                    <Icon size={21} />
                  </span>
                  <div>
                    <strong>{name as string}</strong>
                    <small>{note as string}</small>
                  </div>
                  <i>{payment === name && <Check size={14} />}</i>
                </button>
              ))}
            </div>
          </article>
          <article className="form-card">
            <div className="form-card-head">
              <span>
                <FileClock />
              </span>
              <div>
                <h2>Observações</h2>
                <p>Opcional</p>
              </div>
            </div>
            <textarea placeholder="Alguma informação adicional para a equipe do laboratório?" />
          </article>
        </section>
        <aside className="summary-card">
          <div className="summary-head">
            <h2>Resumo do agendamento</h2>
            <Pill tone="green">Disponível</Pill>
          </div>
          <div className="summary-exam">
            <span>
              <FlaskConical />
            </span>
            <div>
              <small>EXAME</small>
              <strong>{selectedExam.name}</strong>
              <p>Laboratório Vida</p>
            </div>
          </div>
          <div className="summary-details">
            <div>
              <CalendarDays />
              <span>
                <small>Data</small>
                <strong>19 de novembro de 2026</strong>
              </span>
            </div>
            <div>
              <Clock3 />
              <span>
                <small>Horário</small>
                <strong>{selectedTime}</strong>
              </span>
            </div>
            <div>
              <MapPin />
              <span>
                <small>Local</small>
                <strong>Unidade Ponta Verde</strong>
                <small>Av. Álvaro Otacílio, 3.191</small>
              </span>
            </div>
          </div>
          <div className="price-summary">
            <span>Valor total</span>
            <strong>R$ {selectedExam.basePrice},00</strong>
          </div>
          <label className="terms">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
            />
            <span>
              Li e concordo com os <button>termos da simulação</button> e orientações de preparo.
            </span>
          </label>
          <button
            className="primary-button large"
            disabled={!accepted}
            onClick={() => go("confirmation")}
          >
            Confirmar agendamento <Check size={18} />
          </button>
          <p className="panel-secure">
            <ShieldCheck size={16} /> Nenhum pagamento será realizado nesta demonstração.
          </p>
        </aside>
      </div>
    </main>
  );
}

function Confirmation({
  go,
  selectedExam,
  selectedTime,
  payment,
}: {
  go: (screen: Screen) => void;
  selectedExam: Exam;
  selectedTime: string;
  payment: string;
}) {
  const [calendarAdded, setCalendarAdded] = useState(false);
  return (
    <main className="confirmation-page">
      <div className="confirmation-shell">
        <div className="success-mark">
          <Check size={38} />
        </div>
        <Pill tone="green">Tudo certo</Pill>
        <h1>Agendamento confirmado!</h1>
        <p>Seu horário foi reservado com sucesso. Enviamos os detalhes para seu e-mail.</p>
        <div className="protocol">
          <span>PROTOCOLO DEMONSTRATIVO</span>
          <strong>EF-261119-0840</strong>
        </div>
        <article className="confirmation-card">
          <div className="confirmation-card-head">
            <div className="lab-logo">
              <FlaskConical />
            </div>
            <div>
              <small>EXAME AGENDADO</small>
              <h2>{selectedExam.name}</h2>
              <p>Laboratório Vida · Ponta Verde</p>
            </div>
            <Pill tone="green">Confirmado</Pill>
          </div>
          <div className="confirmation-grid">
            <div>
              <CalendarDays />
              <span>
                <small>Data</small>
                <strong>19 de novembro, quarta-feira</strong>
              </span>
            </div>
            <div>
              <Clock3 />
              <span>
                <small>Horário</small>
                <strong>{selectedTime}</strong>
              </span>
            </div>
            <div>
              <MapPin />
              <span>
                <small>Endereço</small>
                <strong>Av. Álvaro Otacílio, 3.191</strong>
                <small>Ponta Verde · Maceió, AL</small>
              </span>
            </div>
            <div>
              <CreditCard />
              <span>
                <small>Pagamento</small>
                <strong>{payment} no local</strong>
                <small>Valor: R$ {selectedExam.basePrice},00</small>
              </span>
            </div>
          </div>
          <div className="prep-alert">
            <span>
              <Info />
            </span>
            <div>
              <strong>Lembrete de preparo</strong>
              <p>{selectedExam.preparation.join(" ")}</p>
            </div>
          </div>
        </article>
        <div className="confirmation-actions">
          <button
            className={calendarAdded ? "secondary-button success" : "secondary-button"}
            onClick={() => setCalendarAdded(true)}
          >
            {calendarAdded ? <CheckCircle2 /> : <CalendarDays />}{" "}
            {calendarAdded ? "Adicionado à agenda" : "Adicionar à agenda"}
          </button>
          <button className="primary-button" onClick={() => go("dashboard")}>
            Voltar ao início <ChevronRight />
          </button>
        </div>
        <div className="what-next">
          <HelpCircle />
          <div>
            <strong>Precisa de ajuda?</strong>
            <p>Acesse o suporte demonstrativo ou consulte os detalhes em “Meu histórico”.</p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("login");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState<Exam>(exams[0]);
  const [selectedTime, setSelectedTime] = useState("08:40");
  const [payment, setPayment] = useState("Cartão");

  const go = (next: Screen) => {
    setScreen(next);
    setNotificationsOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const searchExam = (query: string) => {
    const match = findExam(query);
    if (match) setSelectedExam(match);
    go("search");
  };

  const current = useMemo(() => {
    if (screen === "login") return <Login onLogin={() => go("dashboard")} />;
    if (screen === "dashboard") return <Dashboard go={go} onSearch={searchExam} />;
    if (screen === "search")
      return <SearchScreen go={go} selectedExam={selectedExam} setSelectedExam={setSelectedExam} />;
    if (screen === "details")
      return (
        <Details
          go={go}
          selectedExam={selectedExam}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
        />
      );
    if (screen === "booking")
      return (
        <Booking
          go={go}
          selectedExam={selectedExam}
          selectedTime={selectedTime}
          payment={payment}
          setPayment={setPayment}
        />
      );
    return (
      <Confirmation
        go={go}
        selectedExam={selectedExam}
        selectedTime={selectedTime}
        payment={payment}
      />
    );
  }, [screen, selectedExam, selectedTime, payment]);

  return (
    <>
      {screen !== "login" && screen !== "confirmation" && (
        <Header
          screen={screen}
          go={go}
          notificationsOpen={notificationsOpen}
          setNotificationsOpen={setNotificationsOpen}
        />
      )}
      {current}
      {screen !== "login" && screen !== "confirmation" && (
        <footer>
          <Logo />
          <p>Protótipo acadêmico · Dados, preços e estabelecimentos demonstrativos.</p>
          <span>Exame-Fácil © 2026</span>
        </footer>
      )}
    </>
  );
}
