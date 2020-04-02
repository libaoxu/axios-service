const pkg = require('./package.json')
const isBuildCommonjs = process.env.BABEL_ENV === "commonjs"

module.exports = {
  "presets": [
    [
      "@babel/preset-env", {
        // commonjs时: 需要构建commonjs模块
        "modules": isBuildCommonjs ? "commonjs" : false,
        targets: {
          browsers: [
            'last 2 versions',
            'Firefox ESR',
            '> 1%',
            'ie >= 9',
            'iOS >= 8',
            'Android >= 4',
          ],
        },
      }
    ]
  ],
  "plugins": [
    "@babel/plugin-transform-member-expression-literals",
    "@babel/plugin-transform-object-assign",
    "@babel/plugin-transform-property-literals",
    ["@babel/plugin-transform-runtime", {
      "helpers": true,
    }],
    "@babel/plugin-transform-spread",
    "@babel/plugin-proposal-object-rest-spread",
    ["@babel/plugin-proposal-decorators", {
      "legacy": true
    }],
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-export-default-from",
    // 构建commonjs时, 把版本好注入到js里, 作为固定好的变量
    isBuildCommonjs && ["transform-define", {
      "__VERSION__": pkg.version
    }]
  ].filter(Boolean),
  "exclude": "node_modules/**"
}
