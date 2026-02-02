import React from "react";

export default function DashboardFooter() {
    return (
        <footer className="mt-8 pb-8 text-center text-sm" style={{ color: "#0123408c" }}>
            © {new Date().getFullYear()} Abgail • Dashboard interno
        </footer>
    );
}
