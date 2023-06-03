# 关于git上传
由于本地已经完成与远程仓库的连接，所以每次以下三个指令即可
git add .
git commit -m "注释"
git push -u origin main

# notesByVuePress
通过vuePress建立的前端笔记项目

yarn docs:dev # npm run docs:dev
yarn deploy  # 该指令完成GitHub的部署，注意使用git bash 

| 文件的相对路径     | 页面路由地址   |
| ------------------ | -------------- |
| `/README.md`       | `/`            |
| `/guide/README.md` | `/guide/`      |
| `/config.md`       | `/config.html` |

# .vuePress

 `.vuepress` 目录，所有 VuePress 相关的文件都将会被放在这里。你的项目结构可能是这样：

