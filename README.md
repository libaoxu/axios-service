# base-module-template

## 如何使用
1. 安装ik-cli, 详见[ik-cli](https://code.inke.cn/opd/fe-aws/ik-cli)

1. 初始化项目
```sh
# 执行命令公式
ik-cli init ik-modules-pro ${module-name}

# 示例:
ik-cli init ik-modules-pro ik-bridgex
```

3. **全局替换关键名**

    `base-module-template -> ${module-name}`

1. 修改package.json中`author`, `keyword`, `description`等信息

1. 可以在`src`目录下进行开发, 通过`npm run example`

1. ***开发完成一定要维护README***, ***开发完成一定要维护README***, ***开发完成一定要维护README***

1. 构建

```sh
npm run build
```

会构建到lib目录下: `${module-name}.development.js` 和 `${module-name}.production.min.js`

8. 发布

```sh
# 补丁迭代
npm run publish:patch

# 小版本迭代
npm run publish:minor

# 大版本迭代
npm run publish:major
```

会将代码发布到npm中[inkefe](https://www.npmjs.com/settings/inkefe/packages)组下, 如果没有权限请联系`李宝旭`or`leader`开通npm组权限

9. 在[CHANGELOG.md]('./CHANGELOG.md)中维护修改内容
