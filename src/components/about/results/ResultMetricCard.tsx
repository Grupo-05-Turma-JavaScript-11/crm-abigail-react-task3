import React from "react";

type ResultMetricCardProps = {
    value: string;
    label: string;
    width: string; // "30%"
    gradient: string; // "linear-gradient(...)"
};

export function ResultMetricCard({ value, label, width, gradient }: ResultMetricCardProps) {
    return (
        <div className="bg-white/6 rounded-lg p-2 text-center flex flex-col h-[100px] min-w-[85px]">
            <div className="font-bold text-white text-lg leading-none">{value}</div>

            <div className="mt-1 text-[0.8rem] text-white/60 leading-tight min-h-[28px] px-1 flex items-center justify-center">
                {label}
            </div>

            <div className="mt-auto pt-2">
                <div className="h-2 w-[76px] mx-auto bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width, background: gradient }} />
                </div>
            </div>
        </div>
    );
}
