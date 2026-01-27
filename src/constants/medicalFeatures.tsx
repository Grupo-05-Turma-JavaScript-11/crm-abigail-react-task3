import { Stethoscope, Calendar, Clipboard, CreditCard, Speech, ShieldCheck } from 'lucide-react';
import type Feature from '../models/Feature';



export const medicalFeatures:Feature[] = [
    {
      title: 'Prontuário Eletrônico',
      description: 'Histórico completo do paciente com segurança de dados e acesso rápido a exames e prescrições.',
      icon: <span><Stethoscope /></span> 
    },
    {
      title: 'Agenda e Fluxo',
      description: 'Gestão de consultas com lembretes automáticos via WhatsApp para reduzir faltas.',
      icon: <span><Calendar /></span>
    },
    {
      title: 'Comunicação',
      description: 'Gestão unificada de mensagens e lembretes, com padronização e histórico centralizado.',
      icon: <span><Speech /></span>
    },
    {
      title: 'Segurança & Compliance',
      description: 'Proteção integral das informações, com controle rigoroso de acesso e rastreabilidade completa.',
      icon: <span><ShieldCheck /></span>
    },
    {
      title: 'Gestão de Convênios',
      description: 'Faturamento TISS/TUSS integrado e controle de glosas para otimizar o repasse financeiro.',
      icon: <span><Clipboard /></span>
    },
    {
      title: 'Telemedicina',
      description: 'Realize consultas por vídeo integradas diretamente ao prontuário, com total sigilo.',
      icon: <span><CreditCard /></span>
    }
  ];