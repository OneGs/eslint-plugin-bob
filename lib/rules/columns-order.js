/**
 * @fileoverview enforce ordering of attributes
 * @author columns-order
 */
"use strict";

const utils = require('../utils')

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
        schema: [
            {
                type: 'array',
            }
        ], // Add a schema if the rule has options
    },

    create(context) {
        const sourceCode = context.getSourceCode()

        function getLabelNode(column) {
            if (!column) return

            return column.properties && column.properties.reduce((node, property) => {
                if (property.key.name === 'label') {
                    node = property
                }
                return node
            })
        }

        function getLabelName(column) {
            const labelNode = getLabelNode(column)

            if (labelNode) return labelNode.value.value
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

        function getColumnsProperties(node) {
            return node.parent && node.parent.value && node.parent.value.elements && node.parent.value.elements || []
        }

        return utils.defineTemplateBodyVisitor(context, {}, {
            'Identifier[name=/columns/]': function (node) {
                const after = []
                const before = []
                let columnsOrder = ['人', '单位', '组织', '时间', '流程']
                if(context.options[0]) {
                    columnsOrder = context.options[0]
                }

                // must vue file
                if (!/\.vue$/.test(context.getFilename())) return;

                // must have properties
                const columnProperties = getColumnsProperties(node)
                if (!columnProperties.length) return

                // generate position indexKey
                const corePosition = {}
                for (const [i, item] of columnsOrder.entries()) {
                    corePosition[item] = i
                }

                // set base options
                const _coreColumns = getCoreColumns(columnProperties, corePosition)
                if (!before.length) before.push(getColumnOrderLabelByNode(_coreColumns[0]))
                if (!after.length) after.push(getColumnOrderLabelByNode(_coreColumns.slice(-1)[0]))

                // get before and after columns
                const beforeColumns = getBeforeColumns(columnProperties, before)
                const afterColumns = getAfterColumns(columnProperties, after)
                const innerColumns = getInnerColumns(columnProperties)

                // merge before core after columns
                let finallyColumns = [...beforeColumns, ..._coreColumns, ...innerColumns, ...afterColumns]

                // start
                getErrorList(getColumnAndPositionList(columnProperties, corePosition))
                    .forEach((error, index, errorList) => {
                        errorReport(...error, finallyColumns, index === errorList.length - 1)
                    })

                function getColumnOrderLabel(label) {
                    return (columnsOrder.filter(orderLabel => label && label.indexOf(orderLabel) !== -1) || [])[0]
                }

                function getCoreColumns(columnProperties, corePosition) {
                    return columnProperties
                        .filter((column) => getColumnOrderLabelByNode(column))
                        .sort((first, second) => corePosition[getColumnOrderLabelByNode(first)] - corePosition[getColumnOrderLabelByNode(second)])
                }

                function getInnerColumns(columnProperties) {
                    const beforeIndex = columnProperties.findIndex(column => getLabelName(column).indexOf(columnsOrder[0]) !== -1)
                    const afterIndex = columnProperties.findIndex(column => getLabelName(column).indexOf(columnsOrder.slice(-1)[0]) !== -1)

                    return columnProperties
                        .filter((column, index) => (index > beforeIndex && index < afterIndex))
                }

                function getBeforeColumns(columnProperties, before) {
                    let beforeLoad = false

                    return columnProperties.filter((column) => {
                        if (getLabelName(column).indexOf(before[0]) !== -1) beforeLoad = true

                        return !beforeLoad && !getColumnOrderLabel(getLabelName(column))
                    })
                }

                function getAfterColumns(columnProperties, after) {
                    let afterLoad = false

                    return [...columnProperties].reverse().filter((column) => {
                        if (getLabelName(column).indexOf(after[0]) !== -1) afterLoad = true

                        return !afterLoad && !getColumnOrderLabel(getLabelName(column))
                    }).reverse()
                }

                function getColumnOrderLabelByNode(node) {
                    return getColumnOrderLabel(getLabelName(node))
                }

                function getColumnAndPositionList(columns, columnsOrderPosition) {
                    const _columnsSort = []
                    columns.forEach((column) => {
                        const label = getLabelName(column)
                        const position = columnsOrderPosition[getColumnOrderLabel(label)]
                        if (position !== undefined) _columnsSort.push({column, label, position})
                    })

                    return _columnsSort
                }
            },
        })
    },
};
