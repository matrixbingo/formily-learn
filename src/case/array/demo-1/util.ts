import { Form } from "@formily/core"

export const createClild3 = () => {
  return {
    type: 'object',
    properties: {
      array: {
        type: 'array',
        'x-component': 'ArrayItems',
        'x-decorator': 'FormItem',
      //  title: '二级节点',
        items: {
          type: 'object',
          properties: {
            space: {
              type: 'void',
              'x-component': 'Space',
              properties: {
                position: {
                  type: 'string',
                  title: '下拉框3',
                  enum: [
                    { label: '选项1', value: 1 },
                    { label: '选项2', value: 2 },
                  ],
                  'x-decorator': 'FormItem',
                  'x-component': 'Select',
                  'x-component-props': {
                    style: {
                      width: 160,
                    },
                  },
                },
                name: {
                  type: 'string',
                  title: '输入框3',
                  'x-decorator': 'FormItem',
                  'x-component': 'Input',
                },
                right: {
                  type: 'void',
                  'x-component': 'Space',
                  properties: {
                    remove: {
                      type: 'void',
                      'x-decorator': 'FormItem',
                      'x-component': 'ArrayItems.Remove',
                    },
                    add: {
                      type: 'void',
                      'x-decorator': 'FormItem',
                      'x-component': 'ArrayItems.Addition',
                      'x-component-props': {
                        style: {
                          width: 40,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        // properties: {
        //   add: {
        //     type: 'void',
        //     title: '添加一级节点',
        //     'x-component': 'ArrayItems.Addition',
        //   },
        // },
      },
    },
  }
}

export const createClild2 = () => {
  return {
    type: 'object',
    properties: {
      array: {
        type: 'array',
        'x-component': 'ArrayItems',
        'x-decorator': 'FormItem',
        items: {
          type: 'object',
          properties: {
            layout: {
              type: 'void',
              'x-component': 'FormLayout',
              'x-component-props': {
                labelCol: 6,
                wrapperCol: 10,
                layout: 'vertical',
                style:{
                  float: 'right'
                }
              },
              properties: {
                space: {
                  type: 'void',
                  'x-component': 'Space',
                  properties: {
                    position: {
                      type: 'string',
                      title: '下拉框2',
                      enum: [
                        { label: '选项1', value: 1 },
                        { label: '选项2', value: 2 },
                      ],
                      'x-decorator': 'FormItem',
                      'x-component': 'Select',
                      'x-component-props': {
                        style: {
                          width: 160,
                        },
                      },
                    },
                    name: {
                      type: 'string',
                      title: '输入框2',
                      'x-decorator': 'FormItem',
                      'x-component': 'Input',
                    },
                  },
                },
                right: {
                  type: 'void',
                  'x-component': 'Space',
                  properties: {
                    remove: {
                      type: 'void',
                      'x-decorator': 'FormItem',
                      'x-component': 'ArrayItems.Remove',
                    },
                    add: {
                      type: 'void',
                      'x-decorator': 'FormItem',
                      'x-component': 'ArrayItems.Addition',
                      'x-component-props': {
                        style: {
                          width: 40,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  }
}

export const createClild = () => {
  return {
    type: 'object',
    properties: {
      array: {
        type: 'array',
        'x-component': 'ArrayItems',
        'x-decorator': 'FormItem',
        items: {
          type: 'object',
          properties: {
            layout: {
              type: 'void',
              'x-component': 'FormLayout',
              'x-component-props': {
                labelCol: 6,
                wrapperCol: 10,
                layout: 'vertical',
                style:{
                  float: 'right'
                }
              },
              properties: {
                space: {
                  type: 'void',
                  'x-component': 'Space',
                  properties: {
                    position: {
                      type: 'string',
                      title: '下拉框2',
                      enum: [
                        { label: '选项1', value: 1 },
                        { label: '选项2', value: 2 },
                      ],
                      'x-decorator': 'FormItem',
                      'x-component': 'Select',
                      'x-component-props': {
                        style: {
                          width: 160,
                        },
                      },
                    },
                    name: {
                      type: 'string',
                      title: '输入框2',
                      'x-decorator': 'FormItem',
                      'x-component': 'Input',
                    },
                    right:createRight(2),
                  },
                },
                container: createClild2(),
              },
            },
          },
        },
      },
    },
  }
}

export const createRight = (level: number) => {
  return {
    type: 'void',
    'x-component': 'Space',
    properties: {
      remove: {
        type: 'void',
        'x-decorator': 'FormItem',
        'x-component': 'ArrayItems.Remove',
      },
      add1: {
        type: "void",
        "x-decorator": "FormItem",
        "x-component": "ArrayAddBtn",
        'x-component-props': { level }
      },
      add: {
        type: 'void',
        'x-decorator': 'FormItem',
        'x-component': 'ArrayItems.Addition',
        'x-component-props': {
          style: {
            width: 40,
          },
        },
      },
      // edit: {
      //   type: 'void',
      //   'x-component': 'Editable.Popover',
      //   title: '配置数据',
      //   properties: {
      //     add: {
      //       type: 'void',
      //       title: '兄弟节点',
      //       'x-decorator': 'FormItem',
      //       'x-component': 'ArrayItems.Addition',
      //       'x-component-props': {
      //         style: {
      //           width: 40,
      //         },
      //       },
      //     },
      //     add1: {
      //       type: 'void',
      //       title: '子节点',
      //       'x-decorator': 'FormItem',
      //       'x-component': 'ArrayItems.Addition',
      //       'x-component-props': {
      //         style: {
      //           width: 40,
      //         },
      //       },
      //     },
      //   },
      // },
    },
  }
}


export const createRight2 = (level: number ) => {
  return {
    type: 'void',
    'x-component': 'Space',
    properties: {
      remove: {
        type: 'void',
        'x-decorator': 'FormItem',
        'x-component': 'ArrayItems.Remove',
      },
      add1: {
        type: "void",
        "x-decorator": "FormItem",
        "x-component": "ArrayAddBtn2",
        'x-component-props': { level }
      },
      add: {
        type: 'void',
        'x-decorator': 'FormItem',
        'x-component': 'ArrayItems.Addition',
        'x-component-props': {
          style: {
            width: 40,
          },
        },
      },
    },
  }
}
