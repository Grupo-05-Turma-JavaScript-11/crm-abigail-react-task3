import type Feature from '../../models/Feature';

interface FeatureCardProps {
  feature: Feature
}

function FeatureCard({ feature }: FeatureCardProps) {
  return (
    <div className="bg-white p-8 rounded-2xl border border-[#9AEBA3]/30 shadow-sm 
                    hover:shadow-xl hover:border-[#45C4B0] transition-all duration-300 
                    flex flex-col items-start group">
      <div className="p-3 rounded-lg bg-[#F8FAFC] text-[#025959] mb-5 
                      group-hover:bg-[#45C4B0] group-hover:text-white transition-colors duration-300">
        {feature.icon}
      </div>
      <h3 className="text-[#012340] text-xl font-bold mb-3 uppercase tracking-wide">
        {feature.title}
      </h3>
      <p className="text-[#025959] text-sm leading-relaxed">
        {feature.description}
      </p>
    </div>
  );
};

export default FeatureCard;