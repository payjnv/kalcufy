// KALCUFY ENGINE V4 - SISTEMA DE ERRORES

import type { Locale } from "../types/engine.types";

export class V4Error extends Error {
  public readonly calculator: string;
  public readonly locale?: Locale;
  public readonly suggestion: string;

  constructor(message: string, calculator: string, locale?: Locale, suggestion?: string) {
    super(message);
    this.name = "V4Error";
    this.calculator = calculator;
    this.locale = locale;
    this.suggestion = suggestion || "Check the documentation for more info.";
  }

  toConsoleOutput(): string {
    const parts = [`\n❌ ${this.name}: ${this.message}`, `   Calculator: ${this.calculator}`];
    if (this.locale) parts.push(`   Locale: ${this.locale}`);
    parts.push(`\n   → ${this.suggestion}`);
    return parts.join("\n");
  }
}

export class MissingFileError extends V4Error {
  public readonly filePath: string;
  public readonly isRequired: boolean;

  constructor(calculator: string, locale: Locale, filePath: string, isRequired: boolean = true) {
    const message = isRequired ? `Missing required translation file` : `Missing optional translation file (will use 'en' as fallback)`;
    const suggestion = isRequired ? `Create file: ${filePath}\n   Or run: npm run i18n:generate -- --calc=${calculator} --locale=${locale}` : `This is optional. English will be used as fallback.`;
    super(message, calculator, locale, suggestion);
    this.name = "MissingFileError";
    this.filePath = filePath;
    this.isRequired = isRequired;
  }
}

export class MissingKeysError extends V4Error {
  public readonly filePath: string;
  public readonly missingKeys: string[];

  constructor(calculator: string, locale: Locale, filePath: string, missingKeys: string[]) {
    const message = `Missing ${missingKeys.length} translation key${missingKeys.length > 1 ? "s" : ""}`;
    const suggestion = `Fix in Admin Panel: /admin/translations/${calculator}/${locale}`;
    super(message, calculator, locale, suggestion);
    this.name = "MissingKeysError";
    this.filePath = filePath;
    this.missingKeys = missingKeys;
  }
}

export class InvalidFormatError extends V4Error {
  public readonly filePath: string;
  public readonly parseError: string;

  constructor(calculator: string, locale: Locale, filePath: string, parseError: string) {
    const message = `Invalid JSON format in translation file`;
    const suggestion = `Check JSON syntax. Error: ${parseError}`;
    super(message, calculator, locale, suggestion);
    this.name = "InvalidFormatError";
    this.filePath = filePath;
    this.parseError = parseError;
  }
}

export class EmptyValueError extends V4Error {
  public readonly filePath: string;
  public readonly emptyKeys: string[];

  constructor(calculator: string, locale: Locale, filePath: string, emptyKeys: string[]) {
    const message = `Found ${emptyKeys.length} empty translation value${emptyKeys.length > 1 ? "s" : ""}`;
    const suggestion = `Fill in the empty values.\n   Admin Panel: /admin/translations/${calculator}/${locale}`;
    super(message, calculator, locale, suggestion);
    this.name = "EmptyValueError";
    this.filePath = filePath;
    this.emptyKeys = emptyKeys;
  }
}

export class ConfigValidationError extends V4Error {
  public readonly violations: string[];

  constructor(calculator: string, violations: string[]) {
    const message = `Calculator config validation failed`;
    const suggestion = `Fix the following issues in src/calculators/${calculator}/index.ts`;
    super(message, calculator, undefined, suggestion);
    this.name = "ConfigValidationError";
    this.violations = violations;
  }
}

export class SlugConflictError extends V4Error {
  public readonly slug: string;
  public readonly conflictingCalculator: string;

  constructor(calculator: string, locale: Locale, slug: string, conflictingCalculator: string) {
    const message = `Slug "${slug}" already used by calculator "${conflictingCalculator}"`;
    const suggestion = `Change the slug in src/calculators/${calculator}/index.ts for locale "${locale}"`;
    super(message, calculator, locale, suggestion);
    this.name = "SlugConflictError";
    this.slug = slug;
    this.conflictingCalculator = conflictingCalculator;
  }
}

export class V4ErrorCollection {
  private errors: V4Error[] = [];
  private warnings: V4Error[] = [];

  addError(error: V4Error): void { this.errors.push(error); }
  addWarning(warning: V4Error): void { this.warnings.push(warning); }
  hasErrors(): boolean { return this.errors.length > 0; }
  hasWarnings(): boolean { return this.warnings.length > 0; }
  getErrors(): V4Error[] { return this.errors; }
  getWarnings(): V4Error[] { return this.warnings; }

  toConsoleOutput(): string {
    const parts: string[] = [];
    if (this.errors.length > 0) {
      parts.push(`\n${"═".repeat(60)}`);
      parts.push(`❌ V4 VALIDATION ERRORS: ${this.errors.length}`);
      parts.push(`${"═".repeat(60)}`);
      this.errors.forEach((error) => parts.push(error.toConsoleOutput()));
    }
    if (this.warnings.length > 0) {
      parts.push(`\n${"─".repeat(60)}`);
      parts.push(`⚠️ V4 WARNINGS: ${this.warnings.length}`);
      parts.push(`${"─".repeat(60)}`);
      this.warnings.forEach((warning) => parts.push(warning.toConsoleOutput()));
    }
    if (this.errors.length === 0 && this.warnings.length === 0) {
      parts.push(`\n✅ V4 Validation passed! No errors or warnings.`);
    }
    return parts.join("\n");
  }

  throwIfErrors(): void {
    if (this.hasErrors()) {
      console.error(this.toConsoleOutput());
      throw new Error(`V4 Validation failed with ${this.errors.length} error(s). See above for details.`);
    }
  }
}

export default V4Error;
