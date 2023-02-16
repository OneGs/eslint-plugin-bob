/**
 * @fileoverview nothing
 * @author cloumn-order
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const RuleTester = require('eslint').RuleTester
const rule = require('../../../lib/rules/column-order.js')

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

tester.run("column-order", rule, {
  valid: [
    // give me some code that won't trigger a warning
    {
      filename: 'test.vue',
      code: `
        <template>
            <div>name</div>
        </template>
        <script>
            export default {
                data() {
                    return {
                        columns: [
                            {
                                prop: "contractClassName",
                                label: "序号",
                                align: "center",
                                showOverflow: true,
                            },
                            {
                                prop: "contractClassName",
                                label: "名称",
                                align: "center",
                                showOverflow: true,
                            },
                            {
                                prop: "contractClassName",
                                label: "时间",
                                align: "center",
                                showOverflow: true,
                            },
                            {
                                prop: "contractClassName",
                                label: "填报人",
                                align: "center",
                                showOverflow: true,
                            },
                             {
                                prop: "contractClassName",
                                label: "流程",
                                align: "center",
                                showOverflow: true,
                            },
                            {
                                prop: "contractClassName",
                                label: "填报人",
                                align: "center",
                                showOverflow: true,
                            },
                            {
                                prop: "contractNumber",
                                label: "填报单位",
                                align: "center",
                                showOverflow: true,
                            },
                            {
                                prop: "contractClassName",
                                label: "描述",
                                align: "center",
                                showOverflow: true,
                            },
                            {
                                prop: "contractClassName",
                                label: "操作",
                                align: "center",
                                showOverflow: true,
                            },
                        ]
                    }
                }
            }  
        </script>
      `
    },
  ],

  invalid: [
  ],
});
