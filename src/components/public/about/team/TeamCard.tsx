import React from "react";

export type TeamMember = {
    name: string;
    role: string;
    bio: string;
    img: string;
    linkedin?: string;
    github?: string;
};

type TeamCardProps = {
    member: TeamMember;
};

function LinkedInIcon() {
    return (
        <svg
            className="w-[18px] h-[18px]"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 24h5V7H0v17zm7.5-17h4.78v2.32h.07c.67-1.27 2.3-2.61 4.73-2.61 5.06 0 6 3.33 6 7.66V24h-5v-8.26c0-1.97-.04-4.5-2.75-4.5-2.75 0-3.17 2.15-3.17 4.36V24h-5V7z" />
        </svg>
    );
}

function GitHubIcon() {
    return (
        <svg
            className="w-[18px] h-[18px]"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            <path d="M12 .5C5.73.5.5 5.74.5 12.03c0 5.1 3.29 9.42 7.86 10.95.58.1.79-.25.79-.56v-2.17c-3.2.7-3.88-1.55-3.88-1.55-.53-1.35-1.3-1.71-1.3-1.71-1.06-.73.08-.72.08-.72 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.1-.75.41-1.27.74-1.56-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.27 1.19-3.07-.12-.29-.52-1.47.11-3.07 0 0 .97-.31 3.18 1.17a11.06 11.06 0 0 1 5.8 0c2.21-1.48 3.18-1.17 3.18-1.17.63 1.6.23 2.78.11 3.07.74.8 1.19 1.82 1.19 3.07 0 4.41-2.69 5.38-5.25 5.67.42.37.79 1.09.79 2.2v3.26c0 .31.21.66.8.55 4.56-1.53 7.84-5.85 7.84-10.95C23.5 5.74 18.27.5 12 .5z" />
        </svg>
    );
}

export function TeamCard({ member }: TeamCardProps) {
    return (
        <article
            className="bg-white/3 p-5 rounded-2xl flex gap-4 items-start hover:scale-[1.01] transition"
            aria-label={`Perfil de ${member.name}`}
        >
            <img
                src={member.img}
                alt={member.name}
                className="w-16 h-16 rounded-full object-cover ring-2 ring-[#45C4B0]/40"
            />

            <div className="flex-1">
                <h4 className="font-semibold text-white">{member.name}</h4>
                <p className="text-xs text-[#9AEBA3]">{member.role}</p>

                <p className="mt-2 text-white/80 text-sm">{member.bio}</p>

                {(member.linkedin || member.github) && (
                    <div className="mt-3 flex gap-3">
                        {member.linkedin && (
                            <a
                                href={member.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`LinkedIn de ${member.name}`}
                                className="inline-flex items-center text-[#9AEBA3] hover:text-[#45C4B0] transition"
                            >
                                <LinkedInIcon />
                            </a>
                        )}

                        {member.github && (
                            <a
                                href={member.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`GitHub de ${member.name}`}
                                className="inline-flex items-center text-[#9AEBA3] hover:text-[#45C4B0] transition"
                            >
                                <GitHubIcon />
                            </a>
                        )}
                    </div>
                )}
            </div>
        </article>
    );
}
