import { describe, expect, it } from "vitest";
import { shockIndexEngine } from "@/features/clinical-calculators/engines/engine";

describe("shockIndexEngine", () => {
  it("classifica faixa fisiológica usual", () => {
    const parsed = shockIndexEngine.parse({ heartRate: 70, systolicBloodPressure: 120 });
    expect(parsed.success).toBe(true);

    if (!parsed.success) return;
    const result = shockIndexEngine.compute(parsed.data);

    expect(result.headline.value).toBe("0,58");
    expect(result.headline.status).toBe("Faixa fisiológica usual");
  });

  it("classifica zona de atenção", () => {
    const parsed = shockIndexEngine.parse({ heartRate: 95, systolicBloodPressure: 120 });
    expect(parsed.success).toBe(true);
    if (!parsed.success) return;

    const result = shockIndexEngine.compute(parsed.data);
    expect(result.headline.value).toBe("0,79");
    expect(result.headline.status).toBe("Atenção");
  });

  it("classifica alto risco e valor crítico", () => {
    const highRisk = shockIndexEngine.parse({ heartRate: 110, systolicBloodPressure: 110 });
    const critical = shockIndexEngine.parse({ heartRate: 130, systolicBloodPressure: 90 });
    expect(highRisk.success).toBe(true);
    expect(critical.success).toBe(true);

    if (!highRisk.success || !critical.success) return;

    expect(shockIndexEngine.compute(highRisk.data).headline.status).toBe("Fortemente anormal");
    expect(shockIndexEngine.compute(critical.data).headline.value).toBe("1,44");
  });
});
