/**
 * @fileoverview enforce ordering of attributes
 * @author columns-order
 */
"use strict";

const utils = require('../utils')
const columnsOrder = ['人', '单位', '组织', '时间', '流程']
const before = []
const after = []

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
    meta: {
        type: 'suggestion', // `problem`, `suggestion`, or `layout`
        docs: {
            description: "Sort of property field to avoid general error.",
            categories: ['recommended'],
            url: null, // URL to the documentation page for this rule
        },
        fixable: 'code', // Or `code` or `whitespace`
        schema: [], // Add a schema if the rule has options
    },

    create(context) {
        const sourceCode = context.getSourceCode()

        function getLabelNode(column) {
            return column.properties.reduce((node, property) => {
                if (property.key.name === 'label') {
                    node = property.value
                }
                return node
            })
        }

        function getLabelName(column) {
            return getLabelNode(column).value
        }

        function matchColumnOrderLabel(label) {
            const filterColumn = columnsOrder.filter(orderLabel => label.indexOf(orderLabel) !== -1) || []

            return filterColumn[0]
        }

        function getColumnAndPositionList(columns, columnsOrderPosition) {
            const _columnsSort = []
            columns.forEach((column) => {
                const label = getLabelName(column)
                const position = columnsOrderPosition[matchColumnOrderLabel(label)]
                if (position !== undefined) _columnsSort.push({column, label, position})
            })

            return _columnsSort
        }

        function errorReport(preColumn, column, fixChangeList, isEnd = false) {
            const [preLabel, label] = [getLabelName(preColumn), getLabelName(column)]
            const elements = column.parent.elements

            context.report({
                node: getLabelNode(column),
                message: `Column "${label}" should go before "${preLabel}".`,
                fix(fixer) {
                    if (isEnd) {
                        return elements.map((element, index) => {
                            return fixer.replaceText(element, sourceCode.getText(fixChangeList[index]))
                        })
                    }
                }
            })
        }

        function getErrorList(columnAndPositions) {
            const errorList = []
            let {column: preColumn, position: prePosition} = columnAndPositions[0] || {}
            for (let i = 1; i < columnAndPositions.length; i++) {
                const {column, position} = columnAndPositions[i]
                const valid = position >= prePosition

                if (valid) {
                    preColumn = column;
                    prePosition = position;
                } else {
                    errorList.push([preColumn, column])
                }
            }
            return errorList
        }

        return utils.defineTemplateBodyVisitor(context, {}, {
            'Identifier[name=/columns/]': function (node) {
                const isVueFile = /\.vue$/.test(context.getFilename())
                if (!isVueFile) return;

                const columnProperties = node.parent && node.parent.value && node.parent.value.elements || []
                if (!columnProperties.length) return

                const corePosition = {}
                for (const [i, item] of columnsOrder.entries()) {
                    corePosition[item] = i
                }

                // 去出对应数据
                const _coreColumns = columnProperties
                    .filter(column => matchColumnOrderLabel(getLabelName(column)))
                    .sort((first, second) => corePosition[matchColumnOrderLabel(getLabelName(first))] - corePosition[matchColumnOrderLabel(getLabelName(second))])
                // console.log([..._coreColumns].map(getLabelName), 'ss')
                if (!before.length) before.push(matchColumnOrderLabel(getLabelName(_coreColumns[0])))
                if (!after.length) after.push(matchColumnOrderLabel(getLabelName(_coreColumns.slice(-1)[0])))

                let beforeLoad = false
                const beforeColumns = columnProperties.filter((column) => {
                    if (getLabelName(column).indexOf(before[0]) !== -1) beforeLoad = true

                    return !beforeLoad && !matchColumnOrderLabel(getLabelName(column))
                })
                // console.log([...beforeColumns].map(getLabelName))

                let afterLoad = false
                const afterColumns = [...columnProperties].reverse().filter((column) => {
                    if (getLabelName(column).indexOf(after[0]) !== -1) afterLoad = true

                    return !afterLoad && !matchColumnOrderLabel(getLabelName(column))
                }).reverse()
                // console.log([...afterColumns].map(getLabelName))

                let finallyColumns = [...beforeColumns, ..._coreColumns, ...afterColumns]
                // finallyColumns = finallyColumns.map(column => sourceCode.getText(column))
                // console.log(finallyColumns, 'find')

                // start
                let columnAndPositions = getColumnAndPositionList(columnProperties, corePosition)
                // console.log([...columnAndPositions].map(item => item.label), 'name')

                const errorList = getErrorList(columnAndPositions)

                errorList.forEach((error, index) => {
                    errorReport(...error, finallyColumns, index === errorList.length - 1)
                })
            },
        })
    },
};
