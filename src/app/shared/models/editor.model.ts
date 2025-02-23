import { FormlyFieldConfig } from '@ngx-formly/core';

export enum IFieldType {
  GROUP = 'group',
  ROW = 'row',
  COLUMN = 'column',
}

export enum ICdkDrapActionType {
  COPY = 'copy',
  MOVE = 'move',
  DELETE = 'delete',
}

export interface IEditorFormlyField extends FormlyFieldConfig {
  /**
   * 组件的显示名称
   */
  label?: string;
  fieldGroup?: IEditorFormlyField[];
  fieldId?: string;
  parent?: IEditorFormlyField;
  index?: number;
  canHaveChildren?: boolean;
  childrenPath?: string; // Lodash path
  _design?: boolean;
}
