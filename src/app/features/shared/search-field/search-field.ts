import { Component, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.html',
  styleUrl: './search-field.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchFieldComponent),
      multi: true,
    },
  ],
})
export class SearchFieldComponent implements ControlValueAccessor {
  // Required: a search box with no accessible name fails WCAG, and a placeholder
  // is not a label. Callers pass the translated string.
  readonly label = input.required<string>();
  readonly placeholder = input('');

  protected readonly value = signal('');
  protected readonly disabled = signal(false);

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  protected onInput(value: string): void {
    this.value.set(value);
    this.onChange(value);
  }

  protected onBlur(): void {
    this.onTouched();
  }

  // The four methods below are the ControlValueAccessor contract: Angular's forms
  // layer calls them, nothing in this repo does.

  writeValue(value: string | null): void {
    this.value.set(value ?? '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}
