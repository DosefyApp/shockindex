import { z } from "zod";
import { buildEngine } from "@/features/clinical-calculators/engines/helpers";
import { formatDecimal } from "@/features/clinical-calculators/utils";

const schema = z.object({
  heartRate: z.coerce.number().int().min(50, "Informe uma FC entre 50 e 180 bpm.").max(180, "Informe uma FC entre 50 e 180 bpm."),
  systolicBloodPressure: z.coerce
    .number()
    .int()
    .min(50, "Informe uma PAS entre 50 e 250 mmHg.")
    .max(250, "Informe uma PAS entre 50 e 250 mmHg."),
});

export const shockIndexEngine = buildEngine(schema, ({ heartRate, systolicBloodPressure }) => {
  const shockIndex = heartRate / systolicBloodPressure;
  const formatted = formatDecimal(shockIndex, 2);

  let status = "Abaixo do usual";
  let tone: "info" | "success" | "warning" | "danger" = "info";
  let interpretation =
    "Shock Index abaixo do usual. Interprete no contexto clínico, especialmente em atletas, idosos e pacientes com medicações cronotrópicas.";

  if (shockIndex >= 0.5 && shockIndex <= 0.7) {
    status = "Faixa fisiológica usual";
    tone = "success";
    interpretation = "Shock Index dentro da faixa usual.";
  } else if (shockIndex > 0.7 && shockIndex < 0.9) {
    status = "Atenção";
    tone = "warning";
    interpretation = "Shock Index elevado, sugerindo possível instabilidade hemodinâmica precoce.";
  } else if (shockIndex >= 0.9 && shockIndex < 1) {
    status = "Alto risco";
    tone = "danger";
    interpretation = "Shock Index elevado, sugerindo possível instabilidade hemodinâmica precoce e maior risco de choque oculto.";
  } else if (shockIndex >= 1) {
    status = "Fortemente anormal";
    tone = "danger";
    interpretation = "Shock Index francamente alterado, compatível com maior risco de choque/hipoperfusão.";
  }

  return {
    headline: {
      label: "Shock Index",
      value: formatted,
      status,
      tone,
      description: "O índice relaciona frequência cardíaca e pressão arterial sistólica em um único sinal de alerta.",
    },
    interpretation: {
      title: "Interpretação clínica",
      tone,
      description: interpretation,
      bullets: [
        "O Shock Index pode detectar instabilidade mesmo com pressão arterial aparentemente preservada.",
      ],
    },
    calculation: {
      title: "Como foi calculado",
      tone: "default",
      bullets: [
        `SI = FC / PAS = ${heartRate} / ${systolicBloodPressure}`,
        `SI arredondado = ${formatted}`,
      ],
    },
    extraPanels: [
      {
        title: "Leitura prática",
        tone,
        bullets: [
          shockIndex < 0.5
            ? "Valor baixo pode ocorrer em pacientes muito condicionados ou sob efeito de medicações; correlacione com perfusão."
            : shockIndex <= 0.7
              ? "Mantém-se na faixa fisiológica usual, sem excluir deterioração futura."
              : shockIndex < 1
                ? "Considere monitorização mais estreita, especialmente se houver sepse, trauma ou sangramento oculto."
                : "Valor fortemente alterado e compatível com pior estabilidade hemodinâmica.",
        ],
      },
    ],
  };
});

export const calculatorEngine = shockIndexEngine;
