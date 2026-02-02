import React from "react";

export default function IconBadge({ children }: { children: React.ReactNode }) {
    return (
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl border" style={{ borderColor: "#0123401f" }}>
            {children}
        </span>
    );
}
