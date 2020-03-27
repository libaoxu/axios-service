# base-module-template

## 安装

## 使用文档

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

1. 修改package.json中`author`, `keyword`, `description`, `homepage`等信息

## 项目介绍

1. 可以在`src`目录下进行开发, 通过`npm run example`

1. ***开发完成一定要维护README***, ***开发完成一定要维护README***, ***开发完成一定要维护README***

其中*使用文档* 部分应该全部替换为, 具体*module的使用文档*, 而不是保留`ik-modules-pro`的使用说明, 谨记!!!

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

会进行代码提交和发布到cdn,访问路径为(其中module-name是要被替换的):

开发包: `https:webcdn.inke.cn/tpc/common/${module-name}@${version}/${module-name}.development.js`

生产包: `https:webcdn.inke.cn/tpc/common/${module-name}@${version}/${module-name}.production.min.js`

如:

https://webcdn.inke.cn/tpc/common/ik-bridgex@1.0.8/ik-bridgex.development.js

https://webcdn.inke.cn/tpc/common/ik-bridgex@1.0.8/ik-bridgex.production.min.js

9. 在[CHANGELOG.md]('./CHANGELOG.md)中维护修改内容
