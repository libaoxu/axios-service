const IS_DEV = process.env.NODE_ENV !== 'production'

module.exports = {
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true
  },
  "extends": [
    "eslint:recommended",
    "standard",
  ],
  "parserOptions": {
    "sourceType": "module",
    "allowImportExportEverywhere": false,
    "codeFrame": false
  },
  "rules": {
    "strict": 0,
    "no-unused-vars": 0,
    "no-console": "off", "no-unused-vars": 0,
    // 关闭未定义变量检测
    "no-undef": "off", 
    // 关闭强制返回检测
    "no-unreachable": "off", 
    // 关闭判断条件中的常量检测
    "no-constant-condition": "off", 
    // 关闭分号检测
    "semi": "off", 
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': IS_DEV ? 2 : 0,
    "no-useless-escape": "off",
    // 不让new
    "no-new": "off",
    "eol-last": "off",
    "no-trailing-spaces": "off",
    // 每个js末尾多个空格
    "no-multiple-empty-lines": "off",
    "no-extend-native": ["error", { "exceptions": ["Object", "Array", "Date", "Promise"] }],
    "comma-dangle": ["error", {
      "arrays": "ignore",
      "objects": "ignore",
      "imports": "ignore",
      "exports": "ignore",
      "functions": "ignore"
    }],
    "space-before-function-paren": ["error", {"anonymous": "ignore", "named": "ignore"}],
    // 服务端某些接口就是中杆, 属性这块可以非驼峰
    "camelcase": ["error", {properties: "never"}],
    "prefer-const": "off",
    "object-curly-spacing": "off",
  },
  "settings": {
    "import/ignore": [
      "node_modules"
    ]
  }
}