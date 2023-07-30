---
sidebar: auto
---

# 神经网络基本概念

## 神经网络的层

在神经网络中，层（layer）是网络结构中的基本组成部分之一，用于将输入数据转换为输出数据。每一层都包含一组可学习的参数，例如权重和偏置，用于将输入数据映射到输出数据。

通常情况下，神经网络由多个层组成，每个层的输出都作为下一层的输入。在前馈神经网络（feedforward neural network）中，数据从输入层开始流动，通过隐藏层（hidden layer）逐层进行处理，最终输出到输出层（output layer）。在反向传播神经网络（backpropagation neural network）中，网络的输出与期望输出之间的误差被反向传播到每个层，然后使用误差来更新每个层的参数。

在深度学习中，深度神经网络（deep neural network）通常由多个隐藏层组成，这些隐藏层的数量也被称为网络的深度（depth）。深度神经网络的深度越大，其学习能力和表达能力也越强，可以处理更加复杂的任务。

不同类型的层有不同的功能和用途，例如全连接层（fully connected layer）、卷积层（convolutional layer）、池化层（pooling layer）、循环层（recurrent layer）等等。这些层可以根据不同的应用场景和任务进行组合和调整，以构建不同类型的神经网络。
