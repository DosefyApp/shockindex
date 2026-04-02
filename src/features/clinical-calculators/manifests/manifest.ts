import type { CalculatorManifest } from "@/features/clinical-calculators/types";

export const shockIndexManifest: CalculatorManifest = {
  slug: "shock-index",
  title: "Shock Index",
  shortTitle: "Shock Index",
  description: "Calcule o índice de choque para apoiar a avaliação hemodinâmica inicial.",
  seoTitle: "Shock Index Calculator | Dosefy",
  seoDescription: "Calculate Shock Index for hemodynamic assessment. Medical tool.",
  heroEyebrow: "Ferramenta clínica",
  heroDescription:
    "Índice simples e rápido para integrar frequência cardíaca e pressão sistólica em um único sinal de alerta.",
  heroHighlights: [
    "Cálculo imediato com validação de faixa.",
    "Interpretação clínica em cinco zonas.",
    "Útil para triagem em sepse, trauma e sangramento oculto.",
  ],
  resultMetricLabel: "Shock Index",
  actionLabel: "Calcular Shock Index",
  note: "O Shock Index pode detectar instabilidade mesmo com pressão arterial aparentemente preservada.",
  limitations: [
    "Não substitui avaliação clínica global.",
    "Pode se comportar de forma diferente em idosos, gestantes, atletas e em uso de beta-bloqueador.",
    "Não foi desenhado para validar choque distributivo puro de forma isolada.",
  ],
  references: [
    {
      label: "Shock Index and Early Recognition of Sepsis in the Emergency Department",
      href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3628475/",
    },
    {
      label: "The Shock Index as a Predictor of Vasopressor Use in Severe Sepsis",
      href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3952891/",
    },
    {
      label: "Prehospital shock index outperforms hypotension alone in trauma",
      href: "https://pubmed.ncbi.nlm.nih.gov/33907716/",
    },
  ],
  sections: [
    {
      id: "hemodynamics",
      title: "Parâmetros hemodinâmicos",
      description: "Informe os sinais vitais usados no cálculo do índice.",
    },
  ],
  fields: [
    {
      name: "heartRate",
      label: "Frequência cardíaca",
      type: "number",
      sectionId: "hemodynamics",
      placeholder: "Ex.: 95",
      inputMode: "numeric",
      min: 50,
      max: 180,
      suffix: "bpm",
    },
    {
      name: "systolicBloodPressure",
      label: "Pressão arterial sistólica",
      type: "number",
      sectionId: "hemodynamics",
      placeholder: "Ex.: 120",
      inputMode: "numeric",
      min: 50,
      max: 250,
      suffix: "mmHg",
    },
  ],
  initialValues: {
    heartRate: "",
    systolicBloodPressure: "",
  },
};

export const calculatorManifest = shockIndexManifest;
