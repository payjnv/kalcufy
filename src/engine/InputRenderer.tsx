'use client';

import { useState } from 'react';
import { CalculatorConfig, CalculatorInput } from '@/types/calculator.types';

interface InputRendererProps {
  config: CalculatorConfig;
  data: Record<string, unknown>;
  onChange: (name: string, value: unknown) => void;
  errors?: Record<string, string>;
}

function SingleInput({
  input,
  value,
  onChange,
  error,
}: {
  input: CalculatorInput;
  value: unknown;
  onChange: (name: string, value: unknown) => void;
  error?: string;
}) {
  const [selectedUnit, setSelectedUnit] = useState(input.defaultUnit || input.units?.[0]?.value || '');

  const handleChange = (newValue: unknown) => {
    onChange(input.id, newValue);
  };

  // Unit Input (number with unit selector)
  if (input.type === 'unit-input') {
    return (
      <div className="space-y-1">
        <label className="block text-sm font-medium text-slate-700">
          {input.label}
          {input.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            value={value as number || ''}
            onChange={(e) => handleChange(parseFloat(e.target.value) || 0)}
            min={input.min}
            max={input.max}
            step={input.step || 1}
            placeholder={input.placeholder}
            className={`flex-1 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              error ? 'border-red-500' : 'border-slate-200'
            }`}
          />
          {input.units && input.units.length > 0 && (
            <select
              value={selectedUnit}
              onChange={(e) => setSelectedUnit(e.target.value)}
              className="px-3 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white"
            >
              {input.units.map((unit: { value: string; label: string }) => (
                <option key={unit.value} value={unit.value}>
                  {unit.label}
                </option>
              ))}
            </select>
          )}
        </div>
        {input.helpText && <p className="text-xs text-slate-500">{input.helpText}</p>}
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  }

  // Number Input
  if (input.type === 'number') {
    return (
      <div className="space-y-1">
        <label className="block text-sm font-medium text-slate-700">
          {input.label}
          {input.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <div className="relative">
          <input
            type="number"
            value={value as number || ''}
            onChange={(e) => handleChange(parseFloat(e.target.value) || 0)}
            min={input.min}
            max={input.max}
            step={input.step || 1}
            placeholder={input.placeholder}
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              error ? 'border-red-500' : 'border-slate-200'
            }`}
          />
          {input.suffix && (
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
              {input.suffix}
            </span>
          )}
        </div>
        {input.helpText && <p className="text-xs text-slate-500">{input.helpText}</p>}
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  }

  // Select Input
  if (input.type === 'select') {
    return (
      <div className="space-y-1">
        <label className="block text-sm font-medium text-slate-700">
          {input.label}
          {input.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <select
          value={value as string || ''}
          onChange={(e) => handleChange(e.target.value)}
          className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
        >
          {input.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {input.helpText && <p className="text-xs text-slate-500">{input.helpText}</p>}
      </div>
    );
  }

  // Radio Input
  if (input.type === 'radio') {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-700">
          {input.label}
        </label>
        <div className="flex flex-wrap gap-3">
          {input.options?.map((option) => (
            <label
              key={option.value}
              className={`flex items-center gap-2 px-4 py-2 border rounded-xl cursor-pointer transition-all ${
                value === option.value
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <input
                type="radio"
                name={input.id}
                value={option.value}
                checked={value === option.value}
                onChange={(e) => handleChange(e.target.value)}
                className="sr-only"
              />
              {option.icon && <span>{option.icon}</span>}
              {option.label}
            </label>
          ))}
        </div>
        {input.helpText && <p className="text-xs text-slate-500">{input.helpText}</p>}
      </div>
    );
  }

  // Slider Input
  if (input.type === 'slider') {
    return (
      <div className="space-y-2">
        <div className="flex justify-between">
          <label className="text-sm font-medium text-slate-700">
            {input.label}
          </label>
          <span className="text-sm font-medium text-blue-600">
            {value} {input.suffix || ''}
          </span>
        </div>
        <input
          type="range"
          value={value as number || input.min || 0}
          onChange={(e) => handleChange(parseFloat(e.target.value))}
          min={input.min}
          max={input.max}
          step={input.step || 1}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
        <div className="flex justify-between text-xs text-slate-400">
          <span>{input.min}</span>
          <span>{input.max}</span>
        </div>
        {input.helpText && <p className="text-xs text-slate-500">{input.helpText}</p>}
      </div>
    );
  }

  // Default Text Input
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-slate-700">
        {input.label}
      </label>
      <input
        type="text"
        value={value as string || ''}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={input.placeholder}
        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
      />
      {input.helpText && <p className="text-xs text-slate-500">{input.helpText}</p>}
    </div>
  );
}

export function InputRenderer({ config, data, onChange, errors }: InputRendererProps) {
  if (!config || !config.inputs || config.inputs.length === 0) {
    return <div className="text-slate-500">No inputs configured</div>;
  }

  const inputs = config.inputs;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {inputs.map((input) => (
        <div key={input.id} className={input.width === 'full' ? 'md:col-span-2' : ''}>
          <SingleInput
            input={input}
            value={data[input.id]}
            onChange={onChange}
            error={errors?.[input.id]}
          />
        </div>
      ))}
    </div>
  );
}

export default InputRenderer;
