/**
 * @author sunzeyu
 * See LICENSE file in root directory for full license.
 */
'use strict'

const utils = require('../utils')

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'enforce request mostly by click frequently.',
      categories: undefined,
      url: 'https://eslint.vuejs.org/rules/button-must-has-loading.html'
    },
    fixable: null,
    schema: [],
    messages: {
      // ...
    }
  },
  /** @param {RuleContext} context */
  create(context) {
    // ...
    return utils.defineTemplateBodyVisitor(context, {
      // ...
      VElement(node) {
        if (node.name !== 'el-button') return

        const attributes = node.startTag.attributes || []

        const ElBtnHasLoading = attributes
          .filter((attr) => attr.key.type === 'VDirectiveKey')
          .filter((attr) => attr.key.argument.name === 'loading')

        if (!ElBtnHasLoading || ElBtnHasLoading.length === 0) {
          context.report({
            node,
            loc: node.loc,
            message: 'Add loading status for button 1.'
          })
        }
      },
    })
  }
}
