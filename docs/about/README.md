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

