# 故障定位

主要是毕设的故障定位相关知识，主要包含的章节有故障定位基本概念、相关论文的阅读

## 基本概念
[故障定位基本概念](/graduationDesign/faultLocation/basicConcepts.html "故障定位的基本概念")。

## 论文1--[DeepLocalize Fault Localization for Deep Neural](/graduationDesign/faultLocation/paperOne.html "故障定位的第一篇论文")

深度神经网络(dnn)正在成为大多数软件系统不可或缺的一部分。之前的研究表明，深度神经网络存在缺陷。不幸的是，由于缺乏对模型行为的理解，现有的调试技术不支持定位DNN错误。整个DNN模型呈现为一个黑盒子。为了解决这些问题，我们提出了一种方法和工具，可以**自动确定模型是否存在错误，并识别DNN错误的根本原因**。我们的关键见解是，可以分析在**层之间传播的值的历史趋势**，以识别故障，并定位故障。为此，我们首先启用深度学习应用程序的动态分析:将其转换为**命令式表示**，或者使用**回调机制**。这两种机制都允许我们插入探针，当DNN在训练数据上进行训练时，可以对DNN产生的痕迹进行动态分析。然后，我们对轨迹进行动态分析，以识别导致错误的故障层或超参数。我们提出了一种识别根本原因的算法，该算法通过捕获任何数值误差和在训练过程中监测模型，并找到DNN结果上每个层/参数的相关性。

## 论文2--[Symbolic Execution for Importance Analysis and Adversarial Generation in Neural Networks](/graduationDesign/faultLocation/paperTwo.html "故障定位的第二篇论文")

深度神经网络(DNN)越来越多地应用于各种应用中，其中许多应用具有严重的安全性和安全性问题。本文描述了DeepCheck，这是一种基于程序分析(特别是符号执行)的核心思想来验证dnn的新方法。DeepCheck实现了DNN轻量级符号分析的新技术，并将其应用于解决DNN分析中的两个具有挑战性的问题:1)识别重要的输入特征，2)利用这些特征创建对抗性输入。使用MNIST图像分类网络和文本数据情感网络进行的实验结果表明，DeepCheck有望成为深度神经网络分析的一个有价值的工具。
