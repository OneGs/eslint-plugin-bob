/**
 * @fileoverview column item must has a showOverflow prop
 * @author columns-showOverflow
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const RuleTester = require('eslint').RuleTester
const rule = require('../../../lib/rules/columns-show-overflow.js')

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

tester.run("columns-show-overflow", rule, {
  valid: [
    {
      filename: 'have showOverflow true.vue',
      code: `
        <script>
            export default {
                data() {
                    return {
                        columns: [
                            {
                                label: "时间",
                                showOverflow: true
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
                                label: "时间",
                                showOverflow: true
                            },
                        ]
                    }
                }
            }  
        </script>
      `,
      errors: [
        {
          message: `introduce to add showOverflow to true`
        },
      ]
    },
    {
      filename: 'have showOverflow false.vue',
      code: `
        <script>
            export default {
                data() {
                    return {
                        columns: [
                            {
                                label: "时间",
                                showOverflow: false
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
                                label: "时间",
                                showOverflow: true
                            },
                        ]
                    }
                }
            }  
        </script>
      `,
      errors: [
        {
          message: `introduce to add showOverflow to true`
        },
      ]
    },
    {
      filename: 'operator showOverflow.vue',
      code: `
        <script>
            export default {
                data() {
                    return {
                        columns: [
                            {
                                 prop: 'operator',
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
          message: `introduce to add showOverflow to true`
        },
        {
          message: `introduce to add showOverflow to true`
        },
      ]
    },
  ],

  invalid: [
    {
      filename: 'no showOverflow.vue',
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
                                 label: "名称",
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
                                 label: "时间",showOverflow: true,
                            },
                            {
                                 label: "名称",showOverflow: true,
                            },
                        ]
                    }
                }
            }  
        </script>
      `,
      errors: [
        {
          message: `introduce to add showOverflow to true`
        },
        {
          message: `introduce to add showOverflow to true`
        },
      ]
    },
  ],
});
