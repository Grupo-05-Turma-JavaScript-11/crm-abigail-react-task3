import React from "react";
import { Link } from "react-router-dom";
import type { NavItem } from "../../dashboard.types";
import { COLORS, classNames } from "../../dashboard.theme";

type Props = {
    item: NavItem;
    onNavigate?: () => void;
};

export default function NavRow({ item, onNavigate }: Props) {
    return (
        <Link
            to={item.to}
            onClick={onNavigate}
            className={classNames(
                "group flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition",
                "hover:bg-[#45c4b01f]"
            )}
            style={{ color: "#012340d9" }}
        >
            <span
                className={classNames(
                    "inline-flex h-9 w-9 items-center justify-center rounded-xl border transition",
                    "group-hover:bg-[#45c4b02e] group-hover:border-[#45c4b059]"
                )}
                style={{ borderColor: "#0123401f", backgroundColor: "#01234008" }}
                aria-hidden="true"
            >
                {item.icon}
            </span>

            <span className="truncate" style={{ color: COLORS.base }}>
                {item.label}
            </span>
        </Link>
    );
}
