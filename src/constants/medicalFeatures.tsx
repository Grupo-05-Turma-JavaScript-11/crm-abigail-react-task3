import { Stethoscope, Calendar, Clipboard, CreditCard } from 'lucide-react';
import type Feature from '../models/Feature';



export const medicalFeatures:Feature[] = [
    {
      title: 'Prontuário Eletrônico',
      description: 'Histórico completo do paciente com segurança de dados e acesso rápido a exames e prescrições.',
      icon: <span><Stethoscope></Stethoscope></span> 
    },
    {
      title: 'Agenda Inteligente',
      description: 'Gestão de consultas com lembretes automáticos via WhatsApp para reduzir faltas.',
      icon: <span><Calendar></Calendar></span>
    },
    {
      title: 'Gestão de Convênios',
      description: 'Faturamento TISS/TUSS integrado e controle de glosas para otimizar o repasse financeiro.',
      icon: <span><Clipboard></Clipboard></span>
    },
    {
      title: 'Telemedicina',
      description: 'Realize consultas por vídeo integradas diretamente ao prontuário, com total sigilo.',
      icon: <span><CreditCard></CreditCard></span>
    }
  ];