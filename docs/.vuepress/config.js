const moment = require('moment');

module.exports = {
  base:'/notesByVuePress/',
  title: 'Notes by lhr',
  head: [
    ['link', { rel: 'icon', href: 'logo.png' }],
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
          text: '前端学习',
          items: [
            { text: 'Vue学习', items: [
              { text: 'Vue基础', link: '/vue/vueBasic/' },
              { text: 'Vue进阶', link: '/vue/vueHigh/' },
            ] },
            { text: 'Node学习', items: [
              { text: 'Node基础', link: '/node/nodeBasic/' },
              { text: 'Node进阶', link: '/node/nodeHigh/' },
            ] },
            { text: 'React Native学习', items: [
              { text: 'React Native基础', link: '/reactNative/reactNativeBasic/' },
              { text: 'React Native进阶', link: '/reactNative/reactNativeHigh/' },
            ] }
          ]
      },
      {
        text: '毕设相关',
        items: [
          { text: '代码环境', link: '/graduationDesign/codeEnvironment/' },
          { text: '神经网络', items: [
            { text: '基本概念及相关论文', link: '/graduationDesign/network/' },
          ] },
          { text: '故障定位', items: [
            { text: '基本概念及相关论文', link: '/graduationDesign/faultLocation/' },
          ] },
          { text: '论文研究', items: [
            { text: '论文思路', link: '/graduationDesign/paperIdea/' },
          ] }
        ]
      },
      {
      text: '公务员考试',
      items: [
          { text: '行测', link: '/examinationStudy/measurementTest/' },
          { text: '申论', link: '/examinationStudy/essayTest/' },
      ]
  },
      { text: 'GitHub', link: 'https://github.com/lhrnhr' },
    ],
    // 左边的侧边栏配置
    sidebar: {
      "/vue/":[
        'vueBasic/',
        'vueHigh/'
      ],
      "/node/":[
        'nodeBasic/',
        'nodeHigh/'
      ],
      "/reactNative/":[
        'reactNativeBasic/',
        'reactNativeHigh/'
      ],
      "/graduationDesign/":[
        'codeEnvironment/',
        'network/',
        'faultLocation/',
        'paperIdea/'
      ]
    },
    smoothScroll: true
  }
  }