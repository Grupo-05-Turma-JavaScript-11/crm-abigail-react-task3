// É um objeto de cores padrão do dashboard
export const COLORS = {
    base: "#012340",
    mid: "#025959",
    darkGreen: "#027333",
    aqua: "#45C4B0",
    lightGreen: "#9AEBA3",
};

// Junta classes do Tailwind com segurança
export function classNames(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(" ");
}
