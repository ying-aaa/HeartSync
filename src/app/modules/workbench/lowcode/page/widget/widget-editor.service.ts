import { Injectable, signal } from '@angular/core';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { FormGroup } from '@angular/forms';

import {
  deepClone,
  generateUUID,
  getRecursivePosition,
} from '@src/app/core/utils';
import {
  IEditorFormlyField,
  IFieldType,
} from '@src/app/shared/models/editor.model';

@Injectable({
  providedIn: 'root',
})
export class WidgetEditorService {
  HS_DEFAULT_ID = 'workspace';

  // 是否编辑模式
  isEditMode = signal(true);

  mousePosition: { x: number; y: number } = { x: 0, y: 0 };

  // 当前是否在拖拽中
  dragStart = false;

  // 选中的 Field
  public activeField = signal<IEditorFormlyField | null>(null);
  _fieldSelected$ = new Subject<IEditorFormlyField | null>();
  get fieldSelected$(): Observable<IEditorFormlyField | null> {
    return this._fieldSelected$.asObservable();
  }

  flatField$ = new BehaviorSubject([]);

  fields = signal<IEditorFormlyField[]>([]);
  formGroup = new FormGroup({});
  model = {};
  options = {};

  constructor() {}

  getSpecifyFields(fieldId: string) {
    return this.getFlatField(this.fields()).find(
      (item: any) => item.fieldId === fieldId,
    );
  }

  isActiveField(fieldId: string) {
    return this.activeField()?.fieldId === fieldId;
  }

  updateFields(fields: IEditorFormlyField[]) {
    this.fields.set(fields);
    this.formGroup.patchValue(this.model);
    this.flatField$.next(this.getFlatField());
  }

  selectField(field: IEditorFormlyField | null): void {
    this.activeField.set(field);
    this._fieldSelected$.next(field);
  }

  addField(
    field: IEditorFormlyField,
    toParentField: IEditorFormlyField[],
    toIndex: number,
  ) {
    field = deepClone(field);
    function addFieldId(field: IEditorFormlyField) {
      field.key = generateUUID();
      field.fieldId = `${field.type}_key_${field.key}`;
      if (field.fieldGroup) {
        field.fieldGroup.forEach(addFieldId);
      }
    }
    addFieldId(field);
    toParentField.splice(toIndex, 0, field);
    this.formGroup = new FormGroup({});
    this.options = {};
    this.selectField(field);
    this.flatField$.next(this.getFlatField());
  }

  removeField(toParentField: IEditorFormlyField[], toIndex: number) {
    toParentField.splice(toIndex, 1);
    this.formGroup = new FormGroup({});
    this.options = {};
    this.selectField(null);
    this.flatField$.next(this.getFlatField());
  }

  moveField(
    toParent: IEditorFormlyField[],
    fromIndex: number,
    toIndex: number,
  ) {
    moveItemInArray(toParent, fromIndex, toIndex);
    this.flatField$.next(this.getFlatField());
  }

  transferField(
    formParent: IEditorFormlyField[],
    toParent: IEditorFormlyField[],
    formIndex: number,
    toIndex: number,
  ) {
    transferArrayItem(formParent, toParent, formIndex, toIndex);
    this.flatField$.next(this.getFlatField());
  }

  getConnectedTo(type: IFieldType) {
    const options: any = {
      [IFieldType.GROUP]: [],
      [IFieldType.COLUMN]: [this.HS_DEFAULT_ID],
      [IFieldType.FLEX]: [],
      [IFieldType.ROW]: [],
      [IFieldType.MATTABS]: [],
    };

    // @ts-ignore
    return this.isEditMode()
      ? findSameField(this.fields(), options)[type]
      : options;
  }

  getFlatField(field?: IEditorFormlyField[], level: number = 0) {
    field = field || this.fields();
    return field.reduce((acc, field) => {
      acc.push({
        // @ts-ignore
        name: field.type + '_' + field.key,
        level,
        expandable: !!field.fieldGroup,
        field,
      });
      if (field.fieldGroup) {
        acc.push(...this.getFlatField(field.fieldGroup, level + 1));
      }
      return acc;
    }, [] as any);
  }
}

function findSameField(
  fields: IEditorFormlyField[],
  options: { [key in IFieldType]?: string[] },
): { [key in IFieldType]: string[] } {
  for (let i = 0; i < fields.length; i++) {
    const type = fields[i].type as IFieldType;
    if ((type === 'column' || type === 'flex') && options[type]) {
      // 暂时都用column进行连接，后面可改为 new Map 来存储 ！
      options['column']!.unshift(fields[i].fieldId as string);
    } else if (type && options[type]) {
      options[type].unshift(fields[i].fieldId as string);
    }

    if (fields[i].fieldGroup) {
      options = findSameField(
        fields[i].fieldGroup as IEditorFormlyField[],
        options,
      );
    }
  }
  // @ts-ignore
  return options;
}
