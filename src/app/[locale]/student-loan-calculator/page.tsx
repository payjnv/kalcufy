"use client";

import { useLocale } from "next-intl";
import { CalculatorEngineV3 } from "@/engine/v3";
import { studentLoanCalculatorConfig, calculateStudentLoan } from "@/config/calculators/v3/student-loan.config";
import { useCalcTranslations } from "@/lib/useCalcTranslations";

export default function StudentLoanCalculatorPage() {
  const locale = useLocale();
  const { t } = useCalcTranslations(locale, "student-loan-calculator");

  return (
    <CalculatorEngineV3
      config={studentLoanCalculatorConfig}
      calculate={calculateStudentLoan}
      t={t}
    />
  );
}
