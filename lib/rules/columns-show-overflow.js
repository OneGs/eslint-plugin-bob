/**
 * @fileoverview column item must has a showOverflow prop
 * @author columns-showOverflow
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const utils = require("../utils");
/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'suggestion', // `problem`, `suggestion`, or `layout`
    docs: {
      description: "column item must has a showOverflow prop",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: 'code',
    schema: [], // Or `code` or `whitespace`
  },

  create(context) {
    return utils.defineTemplateBodyVisitor(context, {}, {
      'Identifier[name=/columns/]': function (node) {
        if (!/\.vue$/.test(context.getFilename())) return;

        const columnElements = getColumnsProperties(node)
        if (!columnElements.length) return

        columnElements.forEach((column) => {
          if(!column || getNodeProperties(column, 'showOverflow')) return

          if(getLabelName(column) === '操作') return;

          context.report({
            node: column.properties[0],
            message: `introduce to add showOverflow to true`,
            fix(fixer) {
              return [fixer.insertTextAfter(getColumnLastProperty(column), ',showOverflow: true')]
            }
          })
        })

        function getColumnsProperties(node) {
          return node.parent && node.parent.value && node.parent.value.elements && node.parent.value.elements || []
        }

        function getNodeProperties(node, _property) {
          if (!node || !node.properties) return

          return node.properties.reduce((node, property) => {
            if (property.key.name === _property) {
              node = property
            }
            return node
          }, null)
        }

        function getNodeValue(node, _property) {
          const labelNode = getNodeProperties(node, _property)

          if (labelNode) return labelNode.value.value
        }

        function getNodeLabel(node) {
          return getNodeProperties(node, 'label')
        }

        function getLabelName(node) {
          return getNodeValue(node, 'label')
        }

        function getColumnLastProperty(node) {
          return node.properties.slice(-1)[0]
        }
      },
    })
  },
};
