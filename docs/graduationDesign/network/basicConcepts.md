---
sidebar: auto
---

# 神经网络基本概念

## 神经网络的层

在神经网络中，层（layer）是网络结构中的基本组成部分之一，用于将输入数据转换为输出数据。每一层都包含一组可学习的参数，例如权重和偏置，用于将输入数据映射到输出数据。

通常情况下，神经网络由多个层组成，每个层的输出都作为下一层的输入。在前馈神经网络（feedforward neural network）中，数据从输入层开始流动，通过隐藏层（hidden layer）逐层进行处理，最终输出到输出层（output layer）。在反向传播神经网络（backpropagation neural network）中，网络的输出与期望输出之间的误差被反向传播到每个层，然后使用误差来更新每个层的参数。

在深度学习中，深度神经网络（deep neural network）通常由多个隐藏层组成，这些隐藏层的数量也被称为网络的深度（depth）。深度神经网络的深度越大，其学习能力和表达能力也越强，可以处理更加复杂的任务。

不同类型的层有不同的功能和用途，例如全连接层（fully connected layer）、卷积层（convolutional layer）、池化层（pooling layer）、循环层（recurrent layer）等等。这些层可以根据不同的应用场景和任务进行组合和调整，以构建不同类型的神经网络。


## 相关链接
### [1.一个简单的神经网络模型搭建](https://blog.csdn.net/N2O_666/article/details/114299612 "基础例子")

> 示例代码
>
> ```python
> from numpy import array,exp,random,dot
> X = array([[0,1,0],[1,1,0],[0,0,0],[0,0,1],[1,0,1]])
> y = array([[0,1,1,0,1]]).T
> random.seed(1)
> weights = 2 * random.random((3,1))-1
> for it in range(100000):
>     output = 1/(1+exp(-dot(X,weights)))
>     error = y - output
>     delta = error * output *(1-output)
>     weights += dot(X.T,delta)
> print("误差为:\n",error)
> print("相关系数为:\n",weights)
> climbing_probability = 1/(1+exp(-dot([[1,1,0]],weights)))
> print("小D会去爬山的概率为:\n",climbing_probability)
> ```

### [2.计算一个神经网络的输出](https://blog.csdn.net/qq_40913465/article/details/103442069 "计算一个神经网络的输出")

> <img :src="$withBase('/assets/img/graduationDesign/network/计算一个神经网络的输出.png')" alt="计算一个神经网络的输出">

### [3.使用MNIST数据集训练手写数字识别模型](https://blog.csdn.net/weixin_45954454/article/details/114455209 "MNIST数据集")
> - 每个样本有28\*28像素点，输入样本有28\*28=784个像素值；
> - 故输入层设置784个节点；
> - 隐含层尽量设置成2的n次幂个节点，故选择128个节点，使用ReLu激活函数；
> - 输出层用于输出数字识别结果0~9，故输出层设置10个节点，
>
> <img :src="$withBase('/assets/img/graduationDesign/network/数字识别模型的神经网络结构.png')" alt="数字识别模型的神经网络结构">

### [4.训练深度学习神经网络时如何选择损失函数](https://blog.csdn.net/Hanx09/article/details/107393370 "损失函数的选择")


### [5.神经网络训练中的几个概念Epoch, Batch, Iteration](https://blog.csdn.net/qq_38597589/article/details/119299082 "神经网络训练中的几个概念Epoch, Batch, Iteration")


