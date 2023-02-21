/**
 * @fileoverview enforce ordering of attributes
 * @author columns-order
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const RuleTester = require('eslint').RuleTester
const rule = require('../../../lib/rules/form-base-request-interface.js')

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

tester.run("form-base-request-interface", rule, {
  valid: [
    {
      filename: '值为变量.vue',
      code: `
        <template>
            <el-form-base
                :query-interface="deleteInterface"
            />
       </template>
      `,
    },
    {
      filename: '全成功.vue',
      code: `
        <template>
            <el-form-base
                query-interface="/api/build/safe-accident-management/page"
                query-one-interface="/api/build/safe-accident-management/info"
                save-interface="/api/build/safe-accident-management/save"
                update-interface="/api/build/safe-accident-management/update"
                delete-interface="/api/build/safe-accident-management/delete"
            />
       </template>
      `,
    },
  ],

  invalid: [
    {
      filename: '全错误.vue',
      code: `
        <template>
            <el-form-base
                query-interface="/api/build/safe-accident-management"
                query-one-interface="/api/build/safe-accident-management"
                save-interface="/api/build/safe-accident-management"
                update-interface="/api/build/safe-accident-management"
                delete-interface="/api/build/safe-accident-management"
            />
       </template>
      `,
      errors: [
        {
          message: '最后值 safe-accident-management 和标准值 page 不匹配。',
        },
        {
          message: '最后值 safe-accident-management 和标准值 info 不匹配。',
        },
        {
          message: '最后值 safe-accident-management 和标准值 save 不匹配。',
        },
        {
          message: '最后值 safe-accident-management 和标准值 update 不匹配。',
        },
        {
          message: '最后值 safe-accident-management 和标准值 delete 不匹配。',
        },
      ]
    },
    {
      filename: '存在空值.vue',
      code: `
        <template>
            <el-form-base
                query-interface="/api"
            />
       </template>
      `,
      errors: [
        {
          message: '检测到你的输入不是一个地址，请重新输入。',
        },
      ]
    },
  ],
})
