import { IEditorFormlyField } from '@src/app/shared/models/editor.model';

const appearance = 'outline';
const density = 5;

const baseProps = {
  appearance, // 输入类型
  density, // 密度
  placeholder: '',
  description: '',
  disabled: false,
  required: false,
  readonly: false,
};

const densityExpressions = {
  className: (field: IEditorFormlyField) => {
    // 根据 props.density 的值动态计算 className
    return `hs-density--${field.props?.['density']}`;
  },
};

export const formlyFormTypes = [
  {
    name: 'input',
    type: 'input',
    defaultOptions: {
      props: {
        ...baseProps,
        label: '单行文本',
        maxLength: undefined,
      },
      expressions: {
        ...densityExpressions,
      },
    },
  },
  {
    name: 'textarea',
    defaultOptions: {
      props: {
        label: '多行文本',
        maxLength: undefined,
        ...baseProps,
      },
      expressions: {
        ...densityExpressions,
      },
    },
  },
  {
    name: 'input',
    type: 'number',
    defaultOptions: {
      props: {
        ...baseProps,
        label: '数字',
        min: undefined,
        max: undefined,
      },
      expressions: {
        ...densityExpressions,
      },
    },
  },
  {
    name: 'input',
    type: 'password',
    defaultOptions: {
      props: {
        ...baseProps,
        type: 'password',
        label: '密码',
      },
      expressions: {
        ...densityExpressions,
      },
    },
  },
  {
    name: 'datepicker',
    defaultOptions: {
      props: {
        label: '日期选择',
        ...baseProps,
        dateFormat: 'yyyy-MM-dd', // 设置日期格式
      },
      expressions: {
        ...densityExpressions,
      },
    },
  },
  {
    name: 'radio',
    defaultOptions: {
      props: {
        ...baseProps,
        label: '单选',
        options: [
          { value: 1, label: '选项 1' },
          { value: 2, label: '选项 2' },
          { value: 3, label: '选项 3' },
          { value: 4, label: '选项 4', disabled: true },
        ],
      },
      expressions: {
        ...densityExpressions,
      },
    },
  },
  {
    name: 'checkbox',
    defaultOptions: {
      props: {
        ...baseProps,
        label: '多选',
        options: [
          { value: 1, label: '选项 1' },
          { value: 2, label: '选项 2' },
          { value: 3, label: '选项 3' },
          { value: 4, label: '选项 4', disabled: true },
        ],
      },
      expressions: {
        ...densityExpressions,
      },
    },
  },
  {
    name: 'toggle',
    defaultOptions: {
      props: {
        ...baseProps,
        label: '开关',
      },
      expressions: {
        ...densityExpressions,
      },
    },
  },
  {
    name: 'select',
    defaultOptions: {
      props: {
        ...baseProps,
        label: '下拉单选',
        options: [
          { value: 1, label: '选项 1' },
          { value: 2, label: '选项 2' },
          { value: 3, label: '选项 3' },
          { value: 4, label: '选项 4', disabled: true },
        ],
      },
      expressions: {
        ...densityExpressions,
      },
    },
  },
  {
    name: 'select',
    defaultOptions: {
      props: {
        ...baseProps,
        label: '下拉多选',
        multiple: true,
        selectAllOption: '选择全部',
        options: [
          { value: 1, label: '选项 1' },
          { value: 2, label: '选项 2' },
          { value: 3, label: '选项 3' },
          { value: 4, label: '选项 4', disabled: true },
        ],
      },
      expressions: {
        ...densityExpressions,
      },
    },
  },
];
