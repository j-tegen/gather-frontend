const { injectBabelPlugin } = require('react-app-rewired')

module.exports = function override(config, env) {

    config = injectBabelPlugin(
        ["module-resolver", {
            "root": ["./src"],
            "alias": {
                "utilities": "./src/utilities"
            }
        }],
        config,
    )
    return config
}