import FeatureCard from '../../components/cardFuncions/FeatureCard';
import { medicalFeatures } from '../../constants/medicalFeatures';

const MedicalCRMFeatures = () => {
  return (
    <section className="bg-[#F8FAFC] py-20 px-6">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-16">
          <span className="text-[#027333] font-semibold tracking-widest uppercase text-sm">
            Solução Completa
          </span>
          <h2 className="text-[#012340] text-3xl md:text-4xl font-black mt-2">
            Tecnologia para o <span className="text-[#45C4B0]">Cuidado Médico</span>
          </h2>
          <p className="text-[#025959] mt-4 max-w-2xl mx-auto">
            Otimize o fluxo da sua clínica com ferramentas desenvolvidas para facilitar o dia a dia de médicos e secretárias.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {medicalFeatures.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default MedicalCRMFeatures;