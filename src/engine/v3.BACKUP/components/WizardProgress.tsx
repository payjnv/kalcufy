"use client";

import type { WizardStep, TranslationFn } from "../types/engine.types";

interface WizardProgressProps {
  steps: WizardStep[];
  currentStep: number;
  onStepClick?: (stepIndex: number) => void;
  showNumbers?: boolean;
  allowClickPrevious?: boolean;
  t: TranslationFn;
}

export default function WizardProgress({
  steps,
  currentStep,
  onStepClick,
  showNumbers = true,
  allowClickPrevious = true,
  t,
}: WizardProgressProps) {
  return (
    <div className="mb-6">
      {/* Progress Bar */}
      <div className="flex items-center justify-between mb-2">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const canClick = allowClickPrevious && index < currentStep && onStepClick;

          return (
            <div key={step.id} className="flex items-center flex-1">
              {/* Step Circle */}
              <button
                onClick={() => canClick && onStepClick(index)}
                disabled={!canClick}
                className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold text-sm transition-all ${
                  isCompleted
                    ? "bg-green-500 text-white cursor-pointer hover:bg-green-600"
                    : isCurrent
                    ? "bg-blue-600 text-white ring-4 ring-blue-200"
                    : "bg-slate-200 text-slate-500"
                } ${canClick ? "cursor-pointer" : ""}`}
              >
                {isCompleted ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : showNumbers ? (
                  index + 1
                ) : step.icon ? (
                  <span>{step.icon}</span>
                ) : (
                  index + 1
                )}
              </button>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div 
                  className={`flex-1 h-1 mx-2 rounded ${
                    index < currentStep ? "bg-green-500" : "bg-slate-200"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Step Labels */}
      <div className="flex justify-between">
        {steps.map((step, index) => (
          <div 
            key={step.id} 
            className={`text-center flex-1 ${index === currentStep ? "text-blue-600" : "text-slate-500"}`}
          >
            <p className="text-xs font-medium truncate px-1">
              {t(`wizard.steps.${step.id}.title`, step.title)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Wizard Navigation Buttons
interface WizardNavigationProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
  onComplete: () => void;
  canGoNext?: boolean;
  isLastStep?: boolean;
  t: TranslationFn;
}

export function WizardNavigation({
  currentStep,
  totalSteps,
  onBack,
  onNext,
  onComplete,
  canGoNext = true,
  isLastStep = false,
  t,
}: WizardNavigationProps) {
  return (
    <div className="flex justify-between items-center pt-4 border-t border-slate-200 mt-4">
      {/* Back Button */}
      <button
        onClick={onBack}
        disabled={currentStep === 0}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
          currentStep === 0
            ? "text-slate-300 cursor-not-allowed"
            : "text-slate-600 hover:bg-slate-100"
        }`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        {t("wizard.back", "Back")}
      </button>

      {/* Step Indicator */}
      <span className="text-sm text-slate-500">
        {t("wizard.stepOf", `Step ${currentStep + 1} of ${totalSteps}`)}
      </span>

      {/* Next/Complete Button */}
      {isLastStep ? (
        <button
          onClick={onComplete}
          disabled={!canGoNext}
          className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-all ${
            canGoNext
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-slate-200 text-slate-400 cursor-not-allowed"
          }`}
        >
          {t("wizard.complete", "Calculate")}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </button>
      ) : (
        <button
          onClick={onNext}
          disabled={!canGoNext}
          className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-all ${
            canGoNext
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-slate-200 text-slate-400 cursor-not-allowed"
          }`}
        >
          {t("wizard.next", "Next")}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </div>
  );
}
