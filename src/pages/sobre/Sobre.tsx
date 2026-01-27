import React from "react";
import aboutHeroImg from "../../assets/illustrations/about-hero.png";
import adryanImg from "../../assets/team/img-adryan.png";
import andersonImg from "../../assets/team/img-anderson.png";
import brunaImg from "../../assets/team/img-bruna.png";
import gabrielaImg from "../../assets/team/img-gabriela.png";
import isadoraImg from "../../assets/team/img-isadora.png";
import licoliImg from "../../assets/team/img-licoli.png";

const team = [
  {
    name: "Adryan Lopes",
    role: "Backend Engineer",
    bio: "Especialista em arquitetura de APIs e integridade dos dados, garante segurança e performance no coração do CRM Abgail.",
    img: adryanImg,
  },
  {
    name: "Anderson da Silva",
    role: "Frontend Engineer",
    bio: "Constrói interfaces ricas, acessíveis e responsivas com foco em usabilidade clínica e velocidade.",
    img: andersonImg,
  },
  {
    name: "Bruna Barbieri",
    role: "IA & Dados",
    bio: "Especialista em modelos inteligentes aplicados a prontuários e triagem, implementa recursos que poupam tempo do médico.",
    img: brunaImg,
  },
  {
    name: "Gabriela Patrocínio",
    role: "Product & UX",
    bio: "Designer de produto orientada a fluxos médicos reais, transformando transforma processos clínicos em experiências claras e eficientes.",
    img: gabrielaImg,
  },
  {
    name: "Isadora Lopes",
    role: "QA & Clinical Validation",
    bio: "Foca na qualidade clínica do produto para que a informação exibida seja confiável e auditável.",
    img: isadoraImg,
  },
  {
    name: "Licóli Santos",
    role: "DevOps & Infra",
    bio: "Responsável por disponibilidade, escalabilidade e automação, garantindo que o sistema esteja sempre pronto para o paciente.",
    img: licoliImg,
  },
];

const Sobre: React.FC = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#012340] via-[#025959] to-[#027333] text-white py-16">
      <section className="container mx-auto px-6 lg:px-12">
        {/* Hero */}
        <div className="grid gap-10 lg:grid-cols-2 items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-3 bg-[#45C4B0]/10 text-[#45C4B0] rounded-full px-3 py-1 text-[1.5rem] text-justify font-medium">
              Software médico • Eleve a gestão da sua clínica
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-justify">
              Eleve a gestão da sua clínica{" "}
              <span className="relative inline-block">
                <span className="text-[#9AEBA3]">
                  com o melhor software médico!
                </span>

                {/* SVG inline: linha tracejada em movimento contínuo */}
                <svg
                  className="absolute left-0 right-0 -bottom-3 w-full h-3 pointer-events-none"
                  viewBox="0 0 100 6"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    d="M0 3 H100"
                    fill="none"
                    stroke="#45C4B0"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray="8 6"
                  >
                    {/* anima a posição do tracejado: ajusta 'dur' para velocidade */}
                    <animate
                      attributeName="stroke-dashoffset"
                      from="0"
                      to="-8"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  </path>
                </svg>
              </span>
            </h1>

            <p className="text-[#9AEBA3]/90 max-w-full text-justify">
              Do prontuário eletrônico com IA ao relacionamento humanizado com o
              paciente, o CRM Abgail é um software médico completo para seus
              objetivos como médico.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="/contato"
                className="inline-flex items-center gap-2 bg-[#45C4B0] text-[#012340] font-semibold px-5 py-3 rounded-lg shadow-md hover:brightness-95 transition"
                aria-label="Fale conosco - CRM Abgail"
              >
                Fale com um especialista
              </a>

              <a
                href="#valores"
                className="inline-flex items-center gap-2 border border-white/20 px-5 py-3 rounded-lg hover:bg-white/5 transition"
                aria-label="Conheça nossos valores"
              >
                Nossos valores
              </a>
            </div>

            <ul className="mt-4 grid grid-cols-1 sm:grid-cols-1 gap-3 text-sm text-white/90 text-justify">
              <li className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-[#9AEBA3] flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M5 12l4 4L19 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Prontuário eletrônico com IA para apoio à decisão clínica
              </li>
              <li className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-[#9AEBA3] flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M5 12l4 4L19 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Gestão completa de agendas e atendimentos
              </li>
              <li className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-[#9AEBA3] flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M5 12l4 4L19 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Relacionamento e comunicação inteligente com pacientes
              </li>
              <li className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-[#9AEBA3] flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M5 12l4 4L19 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Segurança, compliance e auditoria de eventos clínicos
              </li>
            </ul>
          </div>

          <div className="flex justify-center lg:justify-end">
            <img
              src={aboutHeroImg}
              alt="Ilustração sobre o CRM Abgail"
              className="w-full max-w-2x1 scale-105 lg:scale-100 rounded-2xl shadow-2xl border border-white/5"
            />
          </div>
        </div>

        {/* Como funciona */}
        <section className="mt-12 grid gap-8 lg:grid-cols-3">
          <div className="col-span-2 bg-white/3 rounded-2xl p-8 text-justify">
            <h2 className="text-[1.4rem] font-bold text-white">
              Como o CRM Abgail ajuda sua clínica
            </h2>
            <p className="mt-3 text-[1rem] text-white/90">
              Desenvolvido a partir de fluxos clínicos reais, o CRM Abgail
              integra agenda, prontuário e comunicação com o paciente em uma
              única interface. A plataforma oferece módulos independentes,
              permitindo que a clínica utilize apenas os recursos necessários,
              como gestão administrativa, atendimento, prontuário com
              inteligência artificial e relatórios clínicos.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="p-4 bg-white/5 rounded-lg">
                <h4 className="font-semibold text-[#45C4B0]">
                  Prontuário Inteligente
                </h4>
                <p className="text-white/80 text-sm">
                  Sugestões contextuais e resumos automatizados que aceleram a
                  tomada de decisão.
                </p>
              </div>
              <div className="p-4 bg-white/5 rounded-lg">
                <h4 className="font-semibold text-[#45C4B0]">Agenda e Fluxo</h4>
                <p className="text-white/80 text-sm">
                  Agendamento simples, fila de espera e histórico de
                  atendimentos por paciente.
                </p>
              </div>
              <div className="p-4 bg-white/5 rounded-lg">
                <h4 className="font-semibold text-[#45C4B0]">Comunicação</h4>
                <p className="text-white/80 text-sm">
                  Mensagens e lembretes com templates inteligentes e histórico
                  centralizado.
                </p>
              </div>
              <div className="p-4 bg-white/5 rounded-lg">
                <h4 className="font-semibold text-[#45C4B0]">
                  Segurança & Compliance
                </h4>
                <p className="text-white/80 text-sm">
                  Auditoria de eventos, controle de acesso e criptografia de
                  dados clínicos.
                </p>
              </div>
            </div>
          </div>

          <aside className="p-4 bg-white/4 rounded-2xl flex flex-col space-y-3 w-fit mx-auto lg:mx-0">
            <div>
              <h3 className="text-[1.4rem] font-bold text-[#9AEBA3]">
                Resultados esperados
              </h3>
              <p className="mt-1 text-white/80 text-[1rem] leading-tight max-w-full text-justify">
                Impacto prático e mensurável no dia a dia da clínica, com menos
                tarefas administrativas, equipes mais sincronizadas e pacientes
                mais satisfeitos.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-1.5 w-full items-stretch">
              <div className="bg-white/6 rounded-lg p-2 text-center flex flex-col h-[100px] min-w-[85px]">
                <div className="font-bold text-white text-lg leading-none">
                  30%
                </div>

                <div className="mt-1 text-[0.8rem] text-white/60 leading-tight min-h-[28px] px-1 flex items-center justify-center">
                  menos tempo por consulta
                </div>

                <div className="mt-auto pt-2">
                  <div className="h-2 w-[76px] mx-auto bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: "30%",
                        background: "linear-gradient(90deg,#45C4B0,#9AEBA3)",
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white/6 rounded-lg p-2 text-center flex flex-col h-[100px] min-w-[85px]">
                <div className="font-bold text-white text-lg leading-none">
                  18%
                </div>

                <div className="mt-1 text-[0.8rem] text-white/60 leading-tight min-h-[28px] px-1 flex items-center justify-center">
                  mais retornos de pacientes
                </div>

                <div className="mt-auto pt-2">
                  <div className="h-2 w-[76px] mx-auto bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: "18%",
                        background: "linear-gradient(90deg,#027333,#45C4B0)",
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white/6 rounded-lg p-2 text-center flex flex-col h-[100px] min-w-[85px]">
                <div className="font-bold text-white text-lg leading-none">
                  25%
                </div>

                <div className="mt-1 text-[0.8rem] text-white/60 leading-tight min-h-[28px] px-1 flex items-center justify-center">
                  mais produtividade da equipe
                </div>

                <div className="mt-auto pt-2">
                  <div className="h-2 w-[76px] mx-auto bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: "25%",
                        background: "linear-gradient(90deg,#025959,#45C4B0)",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <ul className="mt-3 space-y-2 text-sm text-white/90">
              <li className="flex items-start gap-2">
                <svg
                  className="w-4 h-4 text-[#45C4B0] flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M5 13l4 4L19 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Prontuário inteligente e resumos automatizados</span>
              </li>
              <li className="flex items-start gap-2">
                <svg
                  className="w-4 h-4 text-[#45C4B0] flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M5 13l4 4L19 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Comunicação unificada com o paciente</span>
              </li>
            </ul>

            <div className="mt-4">
              <p className="text-sm text-white/70">
                Quer ver em ação? Agende uma demonstração personalizada.
              </p>
              <a
                href="/demo"
                className="mt-3 inline-block w-full text-center bg-[#45C4B0] text-[#012340] px-3 py-2 rounded-lg font-semibold hover:brightness-95 transition"
                aria-label="Solicitar demonstração"
              >
                Solicitar demo
              </a>
            </div>
          </aside>
        </section>

        {/* Missão / Visão / Valores */}
        <section
          id="valores"
          className="mt-16 bg-white/5 rounded-2xl p-8 lg:p-12"
        >
          <div className="grid gap-8 lg:grid-cols-3 text-justify">
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-[#45C4B0]">Nossa missão</h3>
              <p className="text-white/90">
                Empoderar clínicas e profissionais da saúde por meio de um
                software que organiza processos, otimiza o tempo médico e eleva
                a experiência do paciente, garantindo segurança, clareza e
                confiabilidade em cada etapa do atendimento.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-bold text-[#45C4B0]">Nossa visão</h3>
              <p className="text-white/90">
                Tornar-se o CRM de referência para clínicas brasileiras, unindo
                cuidado clínico, tecnologia escalável e o uso ético da
                inteligência artificial como apoio à decisão e à gestão em
                saúde.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-bold text-[#45C4B0]">
                Nossos valores
              </h3>
              <ul className="list-disc pl-5 text-white/90 space-y-1">
                <li>Segurança e confiança</li>
                <li>
                  Respeito à rotina médica, às necessidades do paciente e à
                  complexidade do atendimento em saúde
                </li>
                <li>Transparência e ética em IA</li>
                <li>Foco em resultados reais para pacientes</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Time */}
        <section className="mt-12">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Nosso time</h2>
            <p className="text-white/80 text-sm p-2">
              Profissionais multidisciplinares unidos pelo cuidado.
            </p>
          </div>

          <div className="mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 text-justify">
            {team.map((m) => (
              <article
                key={m.name}
                className="bg-white/3 p-5 rounded-2xl flex gap-4 items-start hover:scale-[1.01] transition"
                aria-label={`Perfil de ${m.name}`}
              >
                <img
                  src={m.img}
                  alt={m.name}
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-[#45C4B0]/40"
                />
                <div>
                  <h4 className="font-semibold text-white">{m.name}</h4>
                  <p className="text-xs text-[#9AEBA3]">{m.role}</p>
                  <p className="mt-2 text-white/80 text-sm">{m.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Footer CTA */}
        <section className="mt-12 bg-[#012340]/60 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-white">
              Pronto para transformar o atendimento da sua clínica?
            </h3>
            <p className="text-white/80 mt-2 text-sm">
              Converse com nossa equipe e descubra como o CRM Abgail pode se
              encaixar no seu fluxo.
            </p>
          </div>

          <div className="flex gap-3">
            <a
              href="/contato"
              className="inline-flex items-center gap-2 bg-[#45C4B0] text-[#012340] px-5 py-3 rounded-lg font-semibold hover:brightness-95 transition"
            >
              Agendar conversa
            </a>
            <a
              href="/roadmap"
              className="inline-flex items-center gap-2 border border-white/20 px-5 py-3 rounded-lg hover:bg-white/5 transition"
            >
              Ver roadmap
            </a>
          </div>
        </section>
      </section>
    </main>
  );
};

export default Sobre;
