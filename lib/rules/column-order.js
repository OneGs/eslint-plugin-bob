/**
 * @fileoverview nothing
 * @author cloumn-order
 */
"use strict";

const utils = require('../utils')
const columnOrder = ['人', '单位', '时间', '流程']

function getColumnAndPositionList(columns) {
    const getLabelName = (properties) => properties.reduce((name, property) => {
        if (property.key.name === 'label') {
            name = property.value.value
        }
        return name
    })

    const _columnsLabelIndexKey = {}
    const _columnsOrderIndexKey = {}
    columns
        .forEach((column, index) => _columnsLabelIndexKey[getLabelName(column.properties)] = index)
        .forEach((column, index) => {
            if(columnOrder.join(',').indexOf(getLabelName(column.properties)) !== -1) {
                _columnsOrderIndexKey['s'] = index
            }
        })


    console.log(_columnsLabelIndexKey, 'index')

    return []
}

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
    meta: {
        type: 'suggestion', // `problem`, `suggestion`, or `layout`
        docs: {
            description: "nothing", recommended: false, url: null, // URL to the documentation page for this rule
        },
        fixable: null, // Or `code` or `whitespace`
        schema: [], // Add a schema if the rule has options
    },

    create(context) {
        return utils.defineTemplateBodyVisitor(context, {}, {
            'Identifier[name=/columns/]': function (node) {
                const columnProperties = node.parent.value.elements || []

                if (!columnProperties.length) return

                // default position
                const columnsPosition = {}
                for (const [i, item] of columnOrder.entries()) {
                    columnsPosition[item] = i
                }

                console.log(columnProperties, 'sss')

                const columnAndPositions = getColumnAndPositionList(columnProperties)
            },
        })
    },
};
