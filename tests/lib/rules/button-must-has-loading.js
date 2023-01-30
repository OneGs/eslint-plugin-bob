/**
 * @author sunzeyu
 * See LICENSE file in root directory for full license.
 */
'use strict'

const RuleTester = require('eslint').RuleTester
const rule = require('../../../lib/rules/button-must-has-loading')

const tester = new RuleTester({
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  }
})

tester.run('button-must-has-loading', rule, {
  valid: [
    {
      filename: 'test.vue',
      code: `
      <template>
        <el-button :loading="loading">loading</el-button>
      </template>
      `
    }
  ],
  invalid: [
    {
      filename: 'test.vue',
      code: `
      <template>
        <div>
          <el-button>loading</el-button>
        </div>
      </template>
      `,
      errors: [
        {
          message: 'Add loading status for button.'
        }
      ]
    }
  ]
})
