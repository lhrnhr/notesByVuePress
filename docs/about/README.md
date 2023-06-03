# 关于页面

## 侧边栏配置

博客模式

```javascript
sidebar: {
      "/graduationDesign/":[
        'network/',
        'faultLocation/'
      ]
    },
```

## 时间更新配置

首先安装moment

```sh
yarn add moment
```

然后添加配置依赖

```javascript
module.exports = {
  plugins: [
    [
      '@vuepress/last-updated',
      {
        transformer: (timestamp, lang) => {
          // 不要忘了安装 moment
          const moment = require('moment')
          moment.locale(lang)
          return moment(timestamp).fromNow()
        }
      }
    ]
  ]
}
```

最后需要在themeConfig添加lastUpdated属性

```javascript
lastUpdated:'更新时间'
```

## 发布到git配置
1.在config文件下添加base

2.在项目添加deploy.sh文件

代码如下

```javascript
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages
git push -f git@github.com:lhrnhr/notesByVuePress.git master:gh-pages

cd -
```

