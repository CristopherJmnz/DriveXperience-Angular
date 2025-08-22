import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-dx-form-field',
  templateUrl: './dx-form-field.component.html',
  styleUrls: ['./dx-form-field.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DxFormFieldComponent),
      multi: true,
    },
  ],
})
export class DxFormFieldComponent implements ControlValueAccessor, OnInit {
  @ViewChild('inputRef') inputRef!: ElementRef<HTMLInputElement>;

  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() error: string = '';
  @Input() helperText: string = '';
  @Input() icon: string = '';

  @Output() focus = new EventEmitter<Event>();
  @Output() blur = new EventEmitter<Event>();
  @Output() input = new EventEmitter<Event>();

  value: any = '';
  focused: boolean = false;
  touched: boolean = false;
  dirty: boolean = false; // Track if user has actually typed something

  private onChange = (value: any) => {};
  private onTouched = () => {};

  ngOnInit(): void {}

  // ControlValueAccessor implementation
  writeValue(value: any): void {
    this.value = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // Event handlers
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.dirty = true; // Mark as dirty when user types
    this.onChange(this.value);
    this.input.emit(event);
  }

  onFocus(event: Event): void {
    this.focused = true;
    this.focus.emit(event);
  }

  onBlur(event: Event): void {
    this.focused = false;
    this.touched = true;
    this.onTouched();
    this.blur.emit(event);
  }

  get hasLabel(): boolean {
    return !!this.label;
  }

  get hasError(): boolean {
    // Only show error if user has interacted and actually typed something
    return !!this.error && this.touched && this.dirty;
  }

  get hasIcon(): boolean {
    return !!this.icon;
  }

  get isFloatingLabel(): boolean {
    return this.focused || !!this.value;
  }
}
