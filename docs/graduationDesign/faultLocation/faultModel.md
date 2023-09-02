---
sidebar: auto
---

## 说明

在工具中，没有针对以下问题

(1)缺乏数据集;

(2)具有分布问题的训练数据集;

(3)不正确的epoch数、批大小、隐藏层数和层中的神经节点数。

这些问题的一个例子可以在程序中找到[44]，[45]，这些问题使模型在早期阶段终止训练，我们的工具不会检测到模型中的问题。

### Example 1

[python - Neural network accuracy optimization - Stack Overflow](https://stackoverflow.com/questions/39525358/neural-network-accuracy-optimization)

在 keras 中构建了一个 ANN，其中有一个输入层（3 个输入）、一个输出层（1 个输出）和两个隐藏层，分别有 12 个和 3 个节点。构建和训练网络的方法如下：

```python
from keras.models import Sequential
from keras.layers import Dense
from sklearn.cross_validation import train_test_split
import numpy
# fix random seed for reproducibility
seed = 7
numpy.random.seed(seed)

dataset = numpy.loadtxt("sorted output.csv", delimiter=",")
# split into input (X) and output (Y) variables
X = dataset[:,0:3]
Y = dataset[:,3]
# split into 67% for train and 33% for test
X_train, X_test, y_train, y_test = train_test_split(X, Y, test_size=0.33, random_state=seed)
# create model
model = Sequential()
model.add(Dense(12, input_dim=3, init='uniform', activation='relu'))
model.add(Dense(3, init='uniform', activation='relu'))
model.add(Dense(1, init='uniform', activation='sigmoid'))
# Compile model
model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])
# Fit the model
model.fit(X_train, y_train, validation_data=(X_test,y_test), nb_epoch=150, batch_size=10)
```

作者：因此，经过 150 次计时后，我得到： loss： 0.6932 - acc: 0.5000 - val_loss： 0.6970 - val_acc: 0.1429。问题是：如何修改 ANN 才能达到更高的精度？

回答：您可以尝试以下方法。我大致是按照重要性的顺序来写的，也就是说，为了解决你所看到的精度问题，我会尝试的顺序：
对输入数据进行归一化处理。通常情况下，你会提取训练数据的平均值和标准偏差，并用它们来抵消和缩放所有其他输入数据。sklearn 中有一个标准的归一化函数。记住要以同样的方式处理测试数据（使用训练数据的均值和标准差，而不是重新计算）
训练更多的历时。对于特征数量较少、训练集大小有限的问题，通常需要运行数千个历元，网络才会收敛。你应该绘制训练损失值和验证损失值，以查看网络是否仍在学习，或者已经尽可能收敛。
对于你的简单数据，我会避免使用 relu 激活。你可能听说过relu 激活在某种程度上是 "最佳 "的，但就像大多数 NN 选项一样，它们在某些类型的问题上效果很好，而在另一些问题上则不是最佳选择。我认为你的问题最好在隐藏层中使用 tanh 或 sigmoid 激活。将 relu 留给深度网络和/或图像/音频的卷积问题。
使用更多的训练数据。不清楚你给它提供了多少训练数据，但在大量训练数据的支持下，NN 的效果最好。
如果你已经有大量的训练数据--增加隐藏层的大小。更复杂的关系需要更多的隐藏神经元（有时还需要更多层）来处理。

### Example 2

[python - keras MLP accuracy zero - Stack Overflow](https://stackoverflow.com/questions/50481178/keras-mlp-accuracy-zero)

以下是 MLP 模型

```python
layers = [10,20,30,40,50]
model = keras.models.Sequential()
#Stacking Layers
model.add(keras.layers.Dense(layers[0], input_dim = input_dim, activation='relu'))
#Defining the shape of input
for layer in layers[1:]:
    model.add(keras.layers.Dense(layer, activation='relu'))
    #Layer activation function
# Output layer
model.add(keras.layers.Dense(1, activation='sigmoid'))
#Pre-training
model.compile(loss = 'binary_crossentropy', optimizer = 'adam', metrics = ['accuracy'])
#Training
model.fit(train_set, test_set, validation_split = 0.10, epochs = 50, batch_size = 10, shuffle = True, verbose = 2)
# evaluate the network
loss, accuracy = model.evaluate(train_set, test_set)
print("\nLoss: %.2f, Accuracy: %.2f%%" % (loss, accuracy*100))
#predictions
predt = model.predict(final_test)
print(predt)
```



### Example 3

在其他模型中，该工具和回调方法报告了另一层的根本原因，因为训练过程是一个循环;一层的操作会影响相邻层。例如程序[46]，使用mean_absolute_error作为损失函数而不是mean_squared_error，使用SGD优化器而不是Adam优化器。我们的工具报告这个错误是EBW(反向传播中的权重错误)。No = 1

[python - How to use keras for XOR - Stack Overflow](https://stackoverflow.com/questions/31556268/how-to-use-keras-for-xor)

```python
from keras.models import Sequential
from keras.layers.core import Dense,Activation
from keras.optimizers import SGD
import numpy as np

model = Sequential()# two layers
model.add(Dense(input_dim=2,output_dim=4,init="glorot_uniform"))
model.add(Activation("sigmoid"))
model.add(Dense(input_dim=4,output_dim=1,init="glorot_uniform"))
model.add(Activation("sigmoid"))
sgd = SGD(l2=0.0,lr=0.05, decay=1e-6, momentum=0.11, nesterov=True)
model.compile(loss='mean_absolute_error', optimizer=sgd)
print "begin to train"
list1 = [1,1]
label1 = [0]
list2 = [1,0]
label2 = [1]
list3 = [0,0]
label3 = [0]
list4 = [0,1]
label4 = [1] 
train_data = np.array((list1,list2,list3,list4)) #four samples for epoch = 1000
label = np.array((label1,label2,label3,label4))

model.fit(train_data,label,nb_epoch = 1000,batch_size = 4,verbose = 1,shuffle=True,show_accuracy = True)
list_test = [0,1]
test = np.array((list_test,list1))
classes = model.predict(test)
print classes
```

