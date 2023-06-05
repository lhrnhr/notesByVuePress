---
sidebar: auto
---

# pycharm及python
<img :src="$withBase('/assets/img/graduationDesign/codeEnvironment/环境配置XMind图.png')" alt="环境配置XMind图">

## 1.编辑器pycharm

### 1.1 简介

PyCharm是一种Python IDE（Integrated Development Environment，集成开发环境），带有一整套可以帮助用户在使用Python语言开发时提高其效率的工具，比如调试、语法高亮、项目管理、代码跳转、智能提示、自动完成、单元测试、版本控制。

### 1.2 安装步骤

#### 1.2.1 网站及版本选择

Pycharm的下载地址——[Download PyCharm: Python IDE for Professional Developers by JetBrains](https://www.jetbrains.com/pycharm/download/#section=windows)。

选择Community版本即可，除非需要用 Python 进行 Django 等 Web 开发时才需要用到专业版。

#### 1.2.2 安装过程

下载好Community版本安装包后，进入安装界面，依次点击next进行安装即可（安装的位置最好修改一下，不要默认安装在C盘）。

安装过程中会出现如下的相关界面，基本不需要做出改动，直接next即可，直到安装完成。

### 1.3 基本操作

#### 1.3.1 项目构建

安装完成后打开桌面快捷方式后就可以进行项目构建，编写自己想要编写的代码。Pycharm编辑器的上方是工具栏，最常用到的就是左边的“File”栏，主要进行项目的新建、项目的打开、环境的配置等操作。（项目的新建步骤如下图所示）
<img :src="$withBase('/assets/img/graduationDesign/codeEnvironment/pycharm项目构建.png')" alt="pycharm项目构建">

#### 1.3.2 项目执行

项目构建完成后，进行代码的编写，然后在对应的主函数点击“run+文件名”即可运行成功。
<img :src="$withBase('/assets/img/graduationDesign/codeEnvironment/pycharm项目执行.png')" style="zoom:50%;" alt="pycharm项目执行">

#### 1.3.3 环境配置

环境的配置也是关键，配置分为两部分，第一步是在电脑上安装好python，第二步就是在Pycharm编辑器中选择已经安装好的python环境（环境除了python之外，还有许多其他库，例如绘图的库matplotlib、数学相关的库numpy……）
<img :src="$withBase('/assets/img/graduationDesign/codeEnvironment/pycharm环境配置.png')" style="zoom:50%;" alt="pycharm环境配置">

## 2.python环境

## 2.1 方法1——直接配置python

### 2.1.1 版本选择

Python的版本无特别说明的话，直接下载最新版本即可。

### 2.1.2 安装步骤

【安装教程——[全网最详细的Python安装教程（Windows） - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/344887837)】

进入官网下载即可，下载地址为[Python Releases for Windows | Python.org](https://www.python.org/downloads/windows/)。

基本是直接安装，注意的问题——安装路径。

安装完成后，打开cmd，输入“python”，检查是否安装成功。

## 2.2 方法2——安装Anaconda

### 2.2.1 版本选择

Anaconda的版本建议选择2019-2020中的anaconda3随意一个版本，2019-10-16的Windows-x86_64.exe，这个anaconda自带的python是3.7版本。

### 2.2.2 安装步骤

【安装教程——[(18条消息) anaconda安装-超详细版_in546的博客-CSDN博客_anaconda安装](https://blog.csdn.net/in546/article/details/117400839)】

首先进入官网下载Anaconda对应的版本，下载地址为[Index of /anaconda/archive/ | 清华大学开源软件镜像站 | Tsinghua Open Source Mirror](https://mirrors.tuna.tsinghua.edu.cn/anaconda/archive/)。

然后进入安装步骤，直接安装即可。
<img :src="$withBase('/assets/img/graduationDesign/codeEnvironment/Anaconda安装-步骤1.png')" style="zoom:70%;" alt="Anaconda安装-步骤1">
<img :src="$withBase('/assets/img/graduationDesign/codeEnvironment/Anaconda安装-步骤2.png')" style="zoom:70%;" alt="Anaconda安装-步骤2">
<img :src="$withBase('/assets/img/graduationDesign/codeEnvironment/Anaconda安装-步骤3.png')" style="zoom:70%;" alt="Anaconda安装-步骤3">

安装完成后，在cmd中输入 ：python(按回车键)，查看是否有Python环境。
