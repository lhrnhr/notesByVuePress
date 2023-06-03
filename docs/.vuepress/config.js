const moment = require('moment');

module.exports = {
  base:'/notesByVuePress/',
  title: 'Notes by lhr',
  head: [
    ['meta', { name: 'keywords', content: 'vuePress,lhrNotes' }],
    ['meta', { name: 'author', content: 'lhr' }]
  ],
  // 时间更新插件
  plugins: [
    [
      '@vuepress/last-updated',
      {
        transformer: (timestamp, lang) => {
          // lang代表的是语言，在此可以先使用zh-cn
          moment.locale('zh-cn')
          return moment(timestamp).format('LLLL')
        }
      }
    ]
  ],
  themeConfig: {
    lastUpdated:'更新时间',
    logo: '/assets/img/logo.png', // 左上角的Logo图片
    // 右上角的导航栏配置
    nav: [
      { text: '主页', link: '/' },
      {
          text: 'vue及其相关',
          items: [
            { text: 'vue生态', items: [
              { text: 'vuePress', link: '/about/' },
              { text: 'vueCLI', link: '/about/' },
            ] },
            { text: 'Group2', items: [
              { text: '主页', link: '/' },
              { text: '关于', link: '/about/' },
            ] }
          ]
      },
      {
        text: '毕设相关',
        items: [
          { text: '神经网络', items: [
            { text: '基本概念', link: '/graduationDesign/network/basicConcepts.html' },
          ] },
          { text: '故障定位', items: [
            { text: '基本概念', link: '/graduationDesign/faultLocation/basicConcepts.html' },
          ] }
        ]
    },
    {
      text: '参考(各种)',
      items: [
        { text: '神经网络', items: [
          { text: '基本概念', link: '/graduationDesign/network/basicConcepts.html' },
        ] },
        { text: '故障定位', items: [
          { text: '基本概念', link: '/graduationDesign/faultLocation/basicConcepts.html' },
        ] }
      ]
  },
      { text: 'GitHub', link: 'https://github.com/lhrnhr' },
    ],
    // 左边的侧边栏配置
    sidebar: {
      "/graduationDesign/":[
        'network/',
        'faultLocation/'
      ]
    },
    smoothScroll: true
  }
  }