import React from "react";

export default function DashboardFooter() {
    return (
        <footer className="mt-20 pb-8 text-center text-sm flex fle-col items-end justify-center" style={{ color: "#0123408c" }}>
            © {new Date().getFullYear()} Abgail • Dashboard interno
        </footer>
    );
}
