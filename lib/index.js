/*
 * IMPORTANT!
 * This file has been automatically generated,
 * in order to update its content execute "npm run update"
 */
'use strict'

module.exports = {
    rules: {
        'columns-order': require('./rules/columns-order'),
        "form-base-request-interface": require('./rules/form-base-request-interface')
    },
    configs: {
        base: require('./configs/base')
    },
    processors: {
        '.vue': require('./processor')
    },
}
