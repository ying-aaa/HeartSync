import { Component, input, model, OnInit } from '@angular/core';
import { IRadioConfig } from '../../models/system.model';

@Component({
  selector: 'hs-radio',
  templateUrl: './hs-radio.component.html',
  styleUrls: ['./hs-radio.component.less'],
})
export class HsRadioComponent implements OnInit {
  activeValue = model<string>();

  configs = input.required<IRadioConfig[] | []>();
  rows = input<number>(1);

  constructor() {}

  styleComputer = () => {
    return {
      'grid-template-columns': `
        repeat(${Math.ceil(this.configs().length / this.rows())}, 
        ${this.rows()}fr)
      `,
    };
  };
  ngOnInit() {}
}
