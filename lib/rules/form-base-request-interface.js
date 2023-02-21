/**
 * @fileoverview standard interface for form-base request
 * @author oenGs
 */
"use strict";

const utils = require('../utils')
const {isVueFile} = require("../utils");
const BASE_OPTIONS = Object.freeze({
    SAVE: 'save',
    UPDATE: 'update',
    PAGE: 'page',
    INFO: 'info',
    DELETE: 'delete'
})

function compareString(a, b) {
    return a.toLowerCase() === b.toLowerCase()
}

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
    meta: {
        type: 'suggestion', // `problem`, `suggestion`, or `layout`
        docs: {
            description: "standard interface of form-base request is save delete info update page.",
            categories: ['recommended'],
            url: null, // URL to the documentation page for this rule
        },
        fixable: 'code', // Or `code` or `whitespace`
        schema: [], // Add a schema if the rule has options
    },

    create(context) {
        function errorReportByType(node, type) {
            if (!isVueFile(context.getFilename())) return;

            // 变量无法解析
            if (node.parent.type === 'VDirectiveKey') return

            const requestInterface = node.parent.value.value.split('/').filter(Boolean)

            if(requestInterface.length <= 1) return context.report({
                node,
                message: `检测到你的输入不是一个地址，请重新输入。`
            })

            if (!compareString(requestInterface.slice(-1)[0], type)) {
                return  context.report({
                    node,
                    message: `最后值 ${requestInterface.slice(-1)[0]} 和标准值 ${type} 不匹配。`
                })
            }
        }

        return utils.defineTemplateBodyVisitor(context, {
            'VIdentifier[name=/query-interface/]': function (node) {
                errorReportByType(node, BASE_OPTIONS.PAGE)
            },
            'VIdentifier[name=/query-one-interface/]': function (node) {
                errorReportByType(node, BASE_OPTIONS.INFO)
            },
            'VIdentifier[name=/save-interface/]': function (node) {
                errorReportByType(node, BASE_OPTIONS.SAVE)
            },
            'VIdentifier[name=/update-interface/]': function (node) {
                errorReportByType(node, BASE_OPTIONS.UPDATE)
            },
            'VIdentifier[name=/delete-interface/]': function (node) {
                errorReportByType(node, BASE_OPTIONS.DELETE)
            },
        }, {
        })
    },
};
