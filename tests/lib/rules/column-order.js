/**
 * @fileoverview enforce ordering of attributes
 * @author columns-order
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const RuleTester = require('eslint').RuleTester
const rule = require('../../../lib/rules/columns-order.js')

const tester = new RuleTester({
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  }
})

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

tester.run("columns-order", rule, {
  valid: [
    // give me some code that won't trigger a warning
    {
      filename: '存在重复的关键字.vue',
      code: `
        <script>
            export default {
                data() {
                    return {
                        columns: [
                            {
                                label: "时间",
                            },
                            {
                                label: "填报组织",
                            },
                            {
                                label: "测试单位",
                            },
                            {
                                label: "测试时间",
                            },
                            {
                                label: "测试单位1",
                            },
                        ]
                    }
                }
            }  
        </script>
      `,
    },
  ],

  invalid: [
    {
      filename: '不完全字段乱序.vue',
      code: `
        <script>
            export default {
                data() {
                    return {
                        columns: [
                            {
                                label: "时间",
                            },
                            {
                                label: "填报组织",
                            },
                        ]
                    }
                }
            }  
        </script>
      `,
      output: `
        <script>
            export default {
                data() {
                    return {
                        columns: [
                            {
                                label: "填报组织",
                            },
                            {
                                label: "时间",
                            },
                        ]
                    }
                }
            }  
        </script>
      `,
      errors: [
        {
          message: 'Column "填报组织" should go before "时间".',
        },
      ]
    },
    {
      filename: '完全字段乱序.vue',
      code: `
        <script>
            export default {
                data() {
                    return {
                        columns: [
                            {
                                label: "时间",
                            },
                            {
                                label: "填报组织",
                            },
                            {
                                label: "流程",
                            },
                            {
                                label: "填报单位",
                            },
                            {
                                label: "填报人",
                            },
                        ]
                    }
                }
            }  
        </script>
      `,
      output: `
        <script>
            export default {
                data() {
                    return {
                        columns: [
                            {
                                label: "填报人",
                            },
                            {
                                label: "填报单位",
                            },
                            {
                                label: "填报组织",
                            },
                            {
                                label: "时间",
                            },
                            {
                                label: "流程",
                            },
                        ]
                    }
                }
            }  
        </script>
      `,
      errors: [
        {
          message: 'Column "填报组织" should go before "时间".',
        },
        {
          message: 'Column "填报单位" should go before "流程".',
        },
        {
          message: 'Column "填报人" should go before "流程".',
        },
      ]
    },
    {
      filename: '完全字段乱序-存在其它字段-before.vue',
      code: `
        <script>
            export default {
                data() {
                    return {
                        columns: [
                            {
                                label: "序号",
                            },
                            {
                                label: "名称",
                            },
                            {
                                label: "时间",
                            },
                            {
                                label: "填报组织",
                            },
                            {
                                label: "流程",
                            },
                            {
                                label: "填报人",
                            },
                            {
                                label: "填报单位",
                            },
                        ]
                    }
                }
            }  
        </script>
      `,
      output: `
        <script>
            export default {
                data() {
                    return {
                        columns: [
                            {
                                label: "序号",
                            },
                            {
                                label: "名称",
                            },
                            {
                                label: "填报人",
                            },
                            {
                                label: "填报单位",
                            },
                            {
                                label: "填报组织",
                            },
                            {
                                label: "时间",
                            },
                            {
                                label: "流程",
                            },
                        ]
                    }
                }
            }  
        </script>
      `,
      errors: [
        {
          message: 'Column "填报组织" should go before "时间".',
        },
        {
          message: 'Column "填报人" should go before "流程".',
        },
        {
          message: 'Column "填报单位" should go before "流程".',
        },
      ]
    },
    {
      filename: '完全字段乱序-存在其它字段-after.vue',
      code: `
        <script>
            export default {
                data() {
                    return {
                        columns: [
                            {
                                label: "时间",
                            },
                            {
                                label: "填报组织",
                            },
                            {
                                label: "流程",
                            },
                            {
                                label: "填报人",
                            },
                            {
                                label: "填报单位",
                            },
                            {
                                label: "描述",
                            },
                            {
                                label: "操作",
                            },
                        ]
                    }
                }
            }  
        </script>
      `,
      output: `
        <script>
            export default {
                data() {
                    return {
                        columns: [
                            {
                                label: "填报人",
                            },
                            {
                                label: "填报单位",
                            },
                            {
                                label: "填报组织",
                            },
                            {
                                label: "时间",
                            },
                            {
                                label: "流程",
                            },
                            {
                                label: "描述",
                            },
                            {
                                label: "操作",
                            },
                        ]
                    }
                }
            }  
        </script>
      `,
      errors: [
        {
          message: 'Column "填报组织" should go before "时间".',
        },
        {
          message: 'Column "填报人" should go before "流程".',
        },
        {
          message: 'Column "填报单位" should go before "流程".',
        },
      ]
    },
    {
      filename: '完全字段乱序-存在其它字段-inner.vue',
      code: `
        <script>
            export default {
                data() {
                    return {
                        columns: [
                            {
                                label: "时间",
                            },
                            {
                                label: "填报组织",
                            },
                            {
                                label: "填报人",
                            },
                            {
                                label: "填报测试",
                            },
                            {
                                label: "填报测试2",
                            },
                            {
                                label: "流程",
                            },
                            {
                                label: "填报单位",
                            },
                            {
                                label: "填报测试3",
                            },
                        ]
                    }
                }
            }  
        </script>
      `,
      output: `
        <script>
            export default {
                data() {
                    return {
                        columns: [
                            {
                                label: "填报人",
                            },
                            {
                                label: "填报单位",
                            },
                            {
                                label: "填报组织",
                            },
                            {
                                label: "时间",
                            },
                            {
                                label: "流程",
                            },
                            {
                                label: "填报测试",
                            },
                            {
                                label: "填报测试2",
                            },
                            {
                                label: "填报测试3",
                            },
                        ]
                    }
                }
            }  
        </script>
      `,
      errors: [
        {
          message: 'Column "填报组织" should go before "时间".',
        },
        {
          message: 'Column "填报人" should go before "时间".',
        },
        {
          message: 'Column "填报单位" should go before "流程".',
        },
      ]
    },
  ],
})
