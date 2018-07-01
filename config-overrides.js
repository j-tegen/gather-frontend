const { injectBabelPlugin } = require('react-app-rewired')

module.exports = function override(config, env) {

    config = injectBabelPlugin(
        ["module-resolver", {
            "root": ["./src"],
            "alias": {
                "utilities": "./src/utilities",
                "settings": "./src/settings.js",
                "env": "./src/env.js"
            }
        }],
        config,
    )
    return config
}