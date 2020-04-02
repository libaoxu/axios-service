## version
*日期*
### Changed

### Added

### Fixed

## 优化构建方案

*2020-04-02*

### Changed
  - `lib`目录构建为一个与`src`目录结构一模一样的es5语法的commonjs模块
  - 将根目录的`index.js`中指向`lib/index.js`

### Added
  - `.babellrc.js`中增加`@babel/plugin-transform-object-assign`, `@babel/plugin-transform-runtime`等插件, 将通用模块在每个`module`中通过require引入, 而不是每个`module`内部都实现一次, 从而减少构建体积
  - 将`@babel/runtime`设置为`dependencies`, 因为构建到lib目录的commonjs会依赖其中的模块, 并不会将具体代码构建进去, 这样可以减少上层业务中的构建体积

### Fixed
