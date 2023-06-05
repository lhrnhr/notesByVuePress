---
sidebar: auto
---

# 一、前言知识

node.js是一款软件，可以运行JavaScript

node.js实现开发类工具--eg：webpack、vite、babel

node.js基础上开发出electron，然后开发出桌面应用vscode、figma、postman

dir指令查看文件夹内容

```
// BOM无效
console.log(window)
console.log(history)
console.log(navigator)
console.log(location)
// DOM无效
console.log(document)
// AJAX无效
let xhr = new XMLHttpRequest()
// console和定时器有效
setTimeout(() => {
  console.log('hello');
}, 1000);
// global 顶级对象
console.log(global)
console.log(globalThis) // ES2020
console.log(globalThis === global) // true
```

程序一般保存在硬盘中，软件安装的过程就是将程序写入硬盘的过程。

程序在运行时会加载进入内存，然后由CPU读取并执行程序。

## 进程

进行中的程序 | 程序的一次执行过程

001000000101001010100100000011110010010101000000011111

## 线程

线程是一个进程中执行的一个执行流，一个线程是属于某个进程的

# 二、Buffer

## 概念

Buffer中文译为缓冲区，是一个类似于Array的对象，用于表示固定长度的字节序列。换句话说就是一段固定长度的内存空间，用于处理二进制数据

## 特点

1.Buffer大小固定，且无法调整

2.Buffer性能较好，可以直接对计算机内存进行操作

3.每个元素的大小为1字节（byte）