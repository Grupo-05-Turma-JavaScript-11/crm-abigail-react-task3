

export function Title() {
  return (
    <> 
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-justify">
              Eleve a gestão da sua clínica{" "}
              <span className="relative inline-block">
                <span className="text-[#9AEBA3]">
                  com o melhor software médico!
                </span>

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
    </>
  );
}