import {Component, EventEmitter, Output} from '@angular/core';
import {MatRadioGroup} from "@angular/material/radio";
import {MatDivider} from "@angular/material/divider";
import {CurrencyPipe, NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MatSlider, MatSliderRangeThumb} from "@angular/material/slider";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    MatRadioGroup,
    MatDivider,
    CurrencyPipe,
    FormsModule,
    MatSliderRangeThumb,
    MatSlider,
    MatButton,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    MatInput,
    NgForOf
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  @Output() valueChanged = new EventEmitter<string>();
  @Output() optionChanged = new EventEmitter<string>();

  inputValue!: string;
  selectedOption!: string;

  emitValue(): void {
    this.valueChanged.emit(this.inputValue);
  }

  emitOption(): void {
    this.optionChanged.emit(this.selectedOption);
  }

  options = [
    {
      name: 'Most expensive',
    },
    {
      name: 'Least expensive',
    },
  ];
}
