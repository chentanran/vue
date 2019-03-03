module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "html",
        "vue"
    ],
    "rules": {
        "indent": [
            "error",
            2
        ],
        // "linebreak-style": [
        //     "error",
        //     "windows"
        // ],
        'linebreak-style': 'off',
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};