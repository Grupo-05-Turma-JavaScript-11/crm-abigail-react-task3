import React from "react";

type HelpFeatureCardProps = {
    title: string;
    description: string;
};

export function HelpFeatureCard({ title, description }: HelpFeatureCardProps) {
    return (
        <div className="p-4 bg-white/5 rounded-lg">
            <h4 className="font-semibold text-[#45C4B0]">{title}</h4>
            <p className="text-white/80 text-sm">{description}</p>
        </div>
    );
}
