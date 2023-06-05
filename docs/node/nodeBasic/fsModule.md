---
sidebar: auto
---

# fs(file system)模块

## 0.基础

fs模块可以实现与硬盘的交互，例如文件的创建、删除、重命名、移动，还有文件内容的写入、读取，以及文件夹的相关操作

## 1.写入文件

### 1-1 writeFile异步写入

语法:

```
fs.writeFile(file,data[,options],callback)
```

参数说明:

- file 文件名
- data 待写入的数据
- options 选项设置(可选)
- callback 写入回调

### 1-2 writeFileSync同步写入

### 1-3 appendFile/appendFileSync追加写入

语法与writeFile完全相同

### 1-4 createWriteStream流式写入

语法:

```
fs.createWriteStream(path[,options])
```

参数说明:

- path 文件路径
- options 选项设置(可选)

程序打开一个文件是需要消耗资源的，流式写入可以减少打开关闭文件的次数

流式写入方式适用于大文件写入或者频繁写入的场景，writeFile适合于写入频率较低的场景

### 1-5 写入文件的场景

文件写入在计算机中是一个非常常见的操作，下面的场景都用到了文件写入

- 下载文件
- 安装软件
- 保存程序日志，如Git
- 编辑器保存文件
- 视频录制

> 当需要**持久化保持数据**的时候，应该想到**文件写入**

## 2.文件读取

### 2-1 readFile异步读取

语法:

```
fs.readFile(path[,options],callback)
```

参数说明:

- path 文件路径
- options 选项设置(可选)
- callback 回调函数

### 2-2 readFileSync同步读取

### 2-3 createReadStream流式读取

语法:

```
fs.createReadStream(path[,options])
// 绑定data事件
rs.on('data',chunk=>{
  console.log(chunk.length);
})
// end 可选事件
rs.on('end',()=>{
  console.log('读取完成');
})
```

参数说明:

- path 文件路径
- options 选项设置(可选)

### 2-4 读取文件应用场景

电脑开机、程序运行、编辑器打开文件、查看图片、播放视频、播放音乐、Git查看日志、上传文件、查看聊天记录

## 3.文件移动与重命名

在Node.js中，可以使用rename或renameSync来移动或重命名文件或文件夹

语法:

```
fs.rename(oldPath,newPath,callback)
fs.renameSync(oldPath,newPath)
```

参数说明:

- oldPath 文件当前的路径
- newPath 文件新的路径
- callback 操作后的回调

代码示例：

```
fs.rename('./座右铭.txt','./论语/座右铭.txt'，(err)=>{
    if(err) throw err;
    console.log('移动完成')
})
fs.renameSync('./座右铭.txt','./论语/座右铭.txt');
```

## 4.文件删除

在Node.js中，可以使用unlink或rm来删除文件或文件夹

## 5.文件夹操作

借助Node.js的能力，对文件夹进行创建、读取、删除等操作

| 方法                | 说明       |
| ------------------- | ---------- |
| mkdir/mkdirSync     | 创建文件夹 |
| readdir/readdirSync | 读取文件夹 |
| rmdir/rmdirSync     | 删除文件夹 |

### 5-1mkdir创建文件夹

在Node.js中，可以使用mkdir或mkdirSync来创建文件夹

语法:

```
fs.mkdir(path[,options],callback)
fs.mkdirSync(path[,options])
```

参数说明:

- path 文件路径
- options 选项配置(可选)
- callback 操作后的回调

代码示例：

```
fs.mkdir('./page'，(err)=>{
    if(err) throw err;
    console.log('创建完成')
})
```

## 6.查看资源状态

在Node.js中，可以使用stat或statSync来创建文件夹

语法:

```
fs.stat(path[,options],callback)
fs.statSync(path[,options])
```

参数说明:

- path 文件路径
- options 选项配置(可选)
- callback 操作后的回调

代码示例：

```
// 异步获取状态
fs.stat('./data.txt'，(err,data)=>{
    if(err) throw err;
    console.log(data)
})
// 同步获取状态
let data = fs.statSync('./data.txt')
```

结果值对象结构：

- size                         文件体积
- birthtime               创建时间
- mtime                    最后修改时间
- atime                      访问时间
- isFile                       检测是否为文件
- isDirectory            检测是否为文件夹

## 7.相对路径问题

fs模块对资源进行操作时，路径的写法有两种：

- 相对路径

> 代码中的路径是相对命令行操作目录
>
> eg：代码--fs.writeFileSync('./data.txt'，’love‘)
>
> 命令行--D:\nodeJS\12-fs
>
> 最终的data.txt'文件会创建在D:\nodeJS\12-fs下，而不是代码所在文件夹下

- 绝对路径

> __dirname 保存的是所在文件的所在目录的绝对路径，不会随着工作目录的变化而变化