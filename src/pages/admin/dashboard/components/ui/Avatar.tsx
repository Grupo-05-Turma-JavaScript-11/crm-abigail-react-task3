
import { COLORS } from "../../dashboard.theme";

export default function Avatar() {
    return (
        <div
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border"
            style={{
                borderColor: "#0123401f",
                backgroundColor: "#01234008",
                color: COLORS.base,
            }}
            aria-label="Avatar do usuário"
            title="Usuário"
        >
            <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
            >
                <circle cx="12" cy="8" r="4" />
                <path d="M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
            </svg>
        </div>
    );
}
