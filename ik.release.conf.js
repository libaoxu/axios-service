const { version } = require('./package.json')

console.log('version: ', version)
console.log()

module.exports = { // ik-release要读取的配置
  isNeedGitHandle: true, // 是否包含git操作 type: Boolean
  task: [
    { // 任务
      source: 'dist', // 要copy的文件夹
      destinationFolder: `../static-resources/tpc/common/base-module-template@${version}`, // 目标文件夹
      destinationCwd: '../static-resources', // 目标仓库位置
      destinationBranch: 'master', // 要提交的分支
      destinationRepo: 'git@code.inke.cn:tpc/sre/static-resources.git', // 目标仓库地址
      filter: [/.js$/, /.js.map$/]
    },
    {
      source: 'dist',
      destinationFolder: './_dist',
      destinationCwd: '',
      destinationBranch: 'master',
      filter: [/.js$/, /.js.map$/]
    }
  ]
}
