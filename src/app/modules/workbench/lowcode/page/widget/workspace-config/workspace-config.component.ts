import { Component, effect, input, OnInit } from '@angular/core';
import { FormlyModule } from '@ngx-formly/core';
import { IEditorFormlyField } from '@src/app/shared/models/editor.model';
import { CONFIT_RESOURCE } from './field-config.ts/public-api';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'hs-workspace-config',
  templateUrl: './workspace-config.component.html',
  styleUrls: ['./workspace-config.component.less'],
  imports: [FormlyModule],
})
export class WorkspaceConfigComponent implements OnInit {
  selectedField = input<any>();
  configForm = new FormGroup({});
  configFields: IEditorFormlyField[] = [];

  constructor() {
    effect(() => {
      this.configFields = this.getFieldConfig(
        this.selectedField()?.type as string,
      );
      console.log('%c Line:23 🍌', 'color:#4fff4B', this.selectedField());
      this.configForm = new FormGroup({});
    });
  }

  private getFieldConfig(type: string): IEditorFormlyField[] {
    return CONFIT_RESOURCE[type];
  }
  ngOnInit() {}
}
