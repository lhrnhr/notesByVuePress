---
sidebar: auto
---

# TensorFlow程序缺陷的实证研究

An Empirical Study on TensorFlow Program Bugs

## 摘要

深度学习应用在自动驾驶系统和面部识别系统等重要领域越来越受欢迎。有缺陷的深度学习应用可能会导致灾难性的后果。虽然最近对深度学习应用的测试和调试进行了大量的研究，但深度学习缺陷的特征却从未被研究过。为了填补所有这些差距，我们研究了建立在TensorFlow之上的深度学习应用程序，并从StackOver Flow的QA页面和Github项目中收集了与TensorFlow相关的程序错误。我们从QA页面中提取信息、提交消息、提取请求消息并发布讨论，以检查这些bug的根本原因和症状。

我们还研究了TensorFlow用户部署的错误检测和定位策略。这些发现有助于研究人员和TensorFlow用户更好地理解TensorFlow程序中的编码缺陷，并为未来的研究指明了新的方向

## 1介绍

我们正在进入人工智能时代，在多层神经网络的基础上构建深度学习(DL)应用。

已经提出了各种框架，如TensorFlow [9]， Caffe [18]， MXNet [5]， PyTorch[27]和Theano[36]来促进此类应用程序的编程。

深度学习应用程序的编程范式与传统应用程序的编程范式有显著的差异。在传统应用中，编写程序直接对模型进行编码以解决目标问题。然而，深度学习应用程序并**不直接对问题解决**模型进行编码。相反，深度学习应用程序对理想的深度学习模型的网络结构和使用大量数据集训练问题解决模型的过程进行编码。**网络结构和训练过程都取决于超参数的精心设置**。深度学习应用程序的开发经常面临在开发传统应用程序时很少遇到的任务，例如，构建包含节点层的复杂网络结构(也称为计算图)。此外，训练过程涉及密集循环，计算对学习率和辍学率等超参数调优敏感。

随着深度学习越来越多地被用于关键任务应用程序，有缺陷的深度学习应用程序可能导致灾难性的后果。例如，有缺陷的自动驾驶系统可能导致车祸，有缺陷的面部识别系统可能导致银行账户被盗。最近对深度学习应用的测试[28,34,38,40]和调试[17,23]进行了各种研究。尽管有这些的努力，在深度学习应用中缺陷的特征从未被系统地研究过。特别是，目前还不清楚从传统程序语言到深度学习语言的**范式转变**给故障检测和定位带来了什么新的挑战。

例如，如果在构建DL模型时存在缺失的缺陷，那么在**训练模型时发现它的可能性有多大?**本文介绍了在Github上最流行的深度学习框架TensorFlow (TF)上编程的深度学习应用程序中检测和定位编码错误的第一个实证研究。有36,079个Github项目使用TensorFlow，这是使用PyTorch的4.8倍(7,485个项目)，PyTorch是Github上第二大流行的DL框架。

该研究旨在系统地了解T**ensorFlow用户在编程深度学习应用程序时产生的编码缺陷**。

请注意，TensorFlow应用程序中的缺陷可能来自其

- 训练数据
- 程序代码
- 执行环境
- TensorFlow框架

我们的实证研究集中在TensorFlow程序的缺陷上。为了便于表述，我们将TF程序中的缺陷称为bug。我们还将使用TensorFlow开发深度学习应用程序的用户称为TensorFlow用户(或TF用户)。

我们的研究从GitHub问题和StackOverflow问题中收集了175个TensorFlow编码错误。我们对这些漏洞进行了定量和定性分析，并报告了(1)它们的症状和根本原因，(2)它们的检测挑战，(3)它们的定位挑战。

通过研究，确定了四种类型的症状、七种类型的根本原因、在检测和故障定位方面的五种挑战，以及TF用户为应对这些挑战而采取的五种策略。

5个挑战

•由于学习过程的随机性，正确性标准是概率性的，TF用户依靠统计值来确定测试结果。需要新的测试技术来支持这种测试。

•由于神经网络庞大的计算模型，巧合正确性[7,10,16,25,31]发生在更大的尺度上，但不易被观察到。

•培训过程中普遍存在非确定性，因此bug繁殖成为di邪教。

•由于神经网络的紧密相互依赖，传统的调试技术，如切片[41]提供的帮助很少，需要新的调试研究技术。

•由于神经网络的黑箱性质，TF用户通常无法检查di事件程序点的状态，并依赖于黑箱技术，如替换参数或切换训练集。。

综上所述，本文做出了以下贡献。

•从StackOverflow和GitHub收集的TensorFlow错误数据集。

•对漏洞的症状和根本原因进行研究，这有助于未来对TensorFlow应用程序测试和调试技术的研究。

•研究检测和定位漏洞的新挑战以及当前解决这些问题的策略，为未来的研究开辟了新的问题

本文的其余部分组织如下。在第2节中，我们提供了在TensorFlow框架上编程的背景知识。

在第3节中，我们提出了三个研究问题。在第4节中，我们将介绍如何收集数据。在第5、6、7节中，我们分别回答了这三个研究问题

## 2背景

深度学习(DL)是一种人工智能计算范式，它基于相互连接以形成神经网络的神经元的分层层来进行分类。每个神经元都是一个简单的处理单元，它接受来自前一层神经元的输入，对这些输入应用非线性激活函数，并将结果值传递给后继层中其他连接的神经元。神经网络中的每个连接边都被加权参数(Wi)增强，加权参数表征其连接强度。深度学习模型通常在部署前使用反向传播的梯度下降方法进行训练[12]，通常以不确定的方式进行。训练的目的是搜索这些权重参数的值，使数据集上的成本函数最小。在监督学习中，成本函数量表示训练数据中的标记值与模型输出的分类值之间的误差，称为“损失”1[12]。例如，可以声明一个成本函数来计算两组值之间的交叉熵。在无监督学习中，成本函数可以量化底层自编码器神经网络中编码和解码表征之间的距离。

图1给出了一个TensorFlow程序的示例2。该计划包括两个主要阶段:构建和执行。

首先，在构建阶段生成计算图(2 - 14行)。其次，创建会话对象启动构造的计算图，构建神经网络;执行阶段可以进一步分为两个子阶段:培训和测试。在这个训练阶段(第16-21行)，使用一组标记的样本来训练神经网络，通过交叉熵最小化模型损失。通常采用梯度下降算法来实现最小化。在训练阶段，网络将进行多次迭代训练。模型训练完成后，在测试阶段，可以应用它对数据集中的样本进行分类(第22行)。 

## 3研究问题

我们的研究旨在回答以下三个研究问题。

•RQ1:漏洞的症状和根本原因是什么?

•RQ2:在检测bug方面存在哪些新的挑战? TF用户是如何处理的?

•RQ3:对于bug的本地化有哪些新的挑战? TF用户是如何处理的?

第一个研究问题是关于bug的特征。

这些症状可以帮助我们了解错误的后果，并有助于设计检测方法。根本原因帮助我们了解bug的性质，并且根本原因和症状之间的联系对于设计故障定位方法非常有用。

第二和第三个研究问题涉及从传统程序到TF程序的范式转变所带来的新挑战，重点是故障检测和定位。在回答这些关于挑战的问题时，我们也关心TF用户目前使用的解决方案。

了解这些解决方案有助于开发新的故障检测和定位技术

## 4数据收集

我们从两个来源收集TensorFlow bug: StackOverflow pages和GitHub commits。StackOver flow页面中包含的bug可能会被删除，难以调试:至少TF用户无法快速解决这个bug，并且不得不寻求帮助。另一方面，GitHub提交中包含的bug可能需要才能检测到:至少TF用户没有在第一个地方发现它并提交到项目中。把这两个来源放在一起，我们有一个感兴趣的数据集:那些给TF用户带来问题的bug，那些值得研究的bug。


为了从StackOverflow页面收集bug，我们在StackOverflow的搜索引擎中使用了搜索词“tensorflow answers:1 -how -install -build”。参数“answers:1”确保只考虑至少有一个答案的问题。其他参数“-how -install -build”用于过滤关于安装和构建TensorFlow的讨论，这些讨论我们不关心。然后我们手动查看了StackOverflow返回的前500个问题，发现了87个与TensorFlow应用程序错误相关的问题。


请注意，StackOverflow可能同时包含新手和专家的帖子，我们认为两者都很重要，应该包括在研究中。QA页面的统计信息见表1。


为了从GitHub提交中收集bug，我们在GitHub的搜索引擎中搜索关键字“tensorflow”的项目。在搜索结果中，我们选择了11个维护良好、提交和星级最高的目标项目进行进一步检查。这些项目的统计数据见表2。我们考虑在开始日期和结束日期之间提交，以收集每个项目中的bug。然后，我们在每个项目中搜索带有关键字“bug， fix, wrong, error, nan, inf, issue, fault, fail, crash”的提交消息。此外，我们过滤了“typo”并合并了pull请求，以消除不相关和重复的提交。我们手动检查源代码、提交消息、提取请求消息和发出消息，以识别编码错误。结果，我们在GitHub上发现了82个提交，其中包含88个与TensorFlow应用程序错误相关的错误。对于每个提交，我们读取提交和拉取请求消息，以查看是否存在任何相关问题，并将问题的讨论线程纳入考虑范围。


受试者于2017年7月至2018年5月收集。


我们计算了从发布问题到解决Github问题和StackOverflow在QA页面上花费的时间。在Github问题中，平均值为27,845分钟，中位数为5,122分钟。在StackOverflow的QA页面中，平均值是33,312分钟，中位数是177分钟。当涉及到手工检查时，两位作者分别执行检查并讨论不一致的问题，直到达成一致。在这个过程中，一个StackOverflow bug和一个作者发现的八个GitHub bug 从讨论中删除了。


综合起来，我们得到了175个bug的数据集，其中87个来自StackOverflow, 88个来自GitHub。我们的数据集规模与其他需要人工检查的现有研究类似，例如Jin等人对性能bug进行了研究，检查了109个性能bug [19]， Nasehi等人对什么是好的代码示例进行了研究，分析了163个StackOverflow的QA页面[26]。

## 5 RQ1:症状和根本原因

## 5.1分析信息来源

为了回答第一个研究问题，我们分析了数据集中的每个漏洞，以确定其根本原因和症状。对于GitHub bug，根源可以通过提交中所做的更改来确定。我们通过读取提交消息、拉取请求消息和相关问题，确定了错误的症状。

对于StackOverflow的bug，我们通过阅读提供解决方案的答案来了解bug的根本原因。我们从问题描述中确定了这些漏洞的症状。此外，我们还试图重现这些虫子，以进一步了解它们的症状。我们能够重现88个Github bug中的75个，以及87个StackOverflow bug中的76个。由于死链接、缺少数据集或对特定c硬件的要求，其余的错误无法重现。我们将收集到的bug的常见根本原因和症状归纳为主要类别，并相应地对每个bug进行分类。两位作者分别进行了分类分类，在StackOverfllow bug和没有发现分歧，而Github bug分别被分类为和di。

### 5.2结果

表3给出了我们从分析中发现的症状(行)和根本原因(列)的统计信息。我们收集的161个(92%)bug'表现出的三种常见症状类型。我们将其余14例(8%)无明显症状的患者归为“未知”。

现象1：Error。TensorFlow错误类似于传统应用程序中的异常或崩溃，例如NaN错误。TensorFlow框架可以在构造或执行阶段引发错误。


症状2:效率低。程序在执行阶段显示出非常差的准确性、丢失或其他意外输出。


现象3:效率低。在构造或执行阶段，程序执行缓慢，甚至在中执行。


现象4:未知。在讨论bug的后果时没有任何指示。我们无法重现他们的失败。特别是，许多bug是通过代码审查检测到的，但它们的症状仍然未知。


在引起bug的根本原因中，159个(90.9%)与TensorFlow有关，可分为六大原因。

其余16个(9.1%)无法归类为和“其他”。


如表3所示，我们的数据集中最常见的症状是Error，最常见的根本原因是APIC。每种症状最常见的根本原因分别是APIC、IPS、APIM和IPS。此外，APIC唯一的bug症状是Error，而CCM和Others的bug涵盖了所有的bug症状。

#### 原因1:IPS (Model Parameter or Structure)不正确。

与建模错误相关的bug源于不合适的模型参数(如学习率)或不正确的模型结构(如缺少节点或层)。这种建模错误是TF程序中的一种特殊类型，导致在执行阶段出现异常行为。这种疾病的主要症状是症状2，如低准确性和巨大的损失

我们发现这三个观察结果适用于这个根本原因中的大多数bug。


(1)通常需要多个训练周期来捕捉故障，所需的周期数取决于超参数设置。尽管在大多数程序执行中会多次到达错误语句，但失败并不经常发生。


(2)在我们的数据集中，故障通常发生在训练阶段。


在DL模型被训练后测试它不太可能捕捉到这些错误。


(3)当其症状为Error时，错误信息通常令人困惑。报告节点崩溃的堆栈跟踪不能精确定位错误代码。StackOver现在的讨论表明，即使对于一个小程序，TF程序的故障确定也不是微不足道的。


图1显示了从Github上的TensorFlow专家编写的编程教程程序中提取的示例。该程序在原始数据集上运行顺利，但是一个TF用户在使用另一个数据集运行时发现了运行错误，并在StackOverow上发起了讨论。对于一些数据集，在大约8000次训练迭代后，程序会因为“ReluGrad输入不是nite”错误而崩溃。当超参数e - 4的值被e - 3替换时(第14行)，崩溃发生得更快。报告节点h_fc3崩溃的错误消息(第10行)没有精确指出表达式中的错误代码(第13行)。当y_ = 0并且y_conv的值接近0时，表达式的求值为0 log 0。

图2显示了StackOverow中推荐的x。x通过在y_conv的节点上插入一个节点并添加一个常数e−9，对模型的计算图进行结构上的改变

#### 原因2:Unaligned Tensor (UT)

当输入张量的形状与期望的不匹配时，在计算图构建阶段发现的错误称为未对齐张量错误。


这个原因的主要症状是错误，因为TensorFlow在API中有断言来检查输入张量的形状。

图4:从StackOverow #44676248中提取的一个有缺陷的TensorFlow示例与传统的错误(如数组大小不匹配)相比，TensorFlow张量的一些错误是非常独特的，因为TensorFlow张量允许具有动态形状，可以在一次迭代到另一次迭代中变化。


我们给出了一个从StackOverow(#34079787)的问题中提取的示例，如图3所示:程序在第7行引发“ValueError: initial_value必须具有指定的形状”错误。张量normal_dist具有部分de需要的静态形状，这意味着在执行阶段执行w_shape之后可以知道normal_dist的真实形状。在构造阶段，TensorFlow只能推断normal_dist的形状为[Dimension(None)， Dimension(None)]，表示一个行数和列数未知的二维矩阵。x如图3(b)所示，为TensorFlow提供了一个静态的normal_dist形状。这样，变量self。W可以被正确构造。

#### 原因3:与TensorFlow计算模型(CCM)混淆

当TF用户不熟悉TensorFlow假设的底层计算模型时，就会出现错误。一个典型的例子是，TF用户使用control-ow而不是data-ow语义错误地构建了TensorFlow计算图。另一个典型的例子是图构建阶段和评估阶段之间的混淆。这种bug的主要症状是结果的准确性和损失很差，这被归类为“Low Eectiveness”。当TF用户对TensorFlow计算语义产生混淆时，程序不会编码有效的深度学习模型。因此，基于无效DL模型的训练过程是线性有效的，即使它不一定会导致TensorFlow错误。这解释了训练模型在准确性和损失方面表现不佳的原因。


图4给出了这种错误类型的一个示例。用户打算使用tf.assign计算斐波那契数列。该程序构造了节点as0、as1和as2。由于TensorFlow对它们的计算没有施加顺序，因此它们可以以任意顺序计算。然而，提问者误以为它们遵循传统的控制-语义，并将按顺序计算。


这种类型的bug在StackOver讨论中比在Github项目中更常见。由于在触发这些错误时可以观察到偏差计算，因此TF用户通常在提交代码之前解决它们。事实上，它们可能是TF用户常犯的错误，并在StackOver上讨论如何寻求建议

#### 原因4:TensorFlow API Change (APIC)

在TensorFlow库的新版本上，可以通过TF程序展示异常。在我们的数据集中，这些异常总是以TensorFlow错误的形式出现，类似于传统应用中的异常。当新的API版本与以前的版本不向后兼容时，就会出现这种错误。与传统应用相比，这个问题更为严重，在Github项目中有36个(40.9%)问题。


研究xing版本的代码提交，我们发现通常可以通过替换更改的api的名称和/或更改参数的顺序来消除这些错误。图5显示了一个示例。然而，x可能分布在许多文件中，因此确保一致地应用更改非常重要。


图6显示了一个从Github收集到的问题，当x到一个已更改的TensorFlow API没有一致地应用时。

#### 原因5:TensorFlow API Misuse (APIM)

像传统的应用程序框架一样，TensorFlow支持一组丰富的api。


bug是由TF用户引入的，他们没有完全理解api所做的假设。当使用这些api时，如果没有完全满足的假设，则api无法成功执行，从而导致TensorFlow错误，这是此类错误的主要症状。为了支持基于学习的深度学习算法，TensorFlow API所做的假设可能与传统API库中出现的假设不同。


让我们使用从StackOverow中提取的代码片段来说明它(如图7所示):程序可以使用GD优化器顺利工作(在第4行注释掉)。然而，如果TF用户用Adam优化器替换GD优化器(第3行)，程序将崩溃，并出现错误“试图使用未初始化的值Variable_21/Adam”(第7行)。注意，添加了一个初始化器(第2行)，它将向计算图中的变量添加初始化操作符。这个程序以前工作得很顺利，因为GD优化器不会向计算图中添加额外的变量。对于类似Adam的优化器(如Adam、Adagrad、Adadelta优化器)，它将添加名为“slots”的额外变量，这些变量不会被初始化(第6行)，并导致崩溃(第7行)。推荐的x如图7(b)所示:将初始化器移动到Adam优化器后面的行。

#### 原因6:Structure Inefficiency  (SI)

SI和IPS的一个主要区别是SI带来性能提升，而IPS带来功能不正确。


少量的性能行效率问题表明，要么性能问题很少发生，要么这些问题很难检测到。

#### 原因7:其他

其他无法归类为的错误也包含在此类型中。这些错误通常是与TensorFlow无关的编程错误，例如Python编程错误，包括需要的变量，或数据预处理。因此，它们不常在StackOverow上讨论。


我们观察到，最后一类导致bug的原因，其中一些与TensorFlow无关，仅占我们在Github项目中发现的12个(13.6%)实际问题。这表明TF相关的问题是TF应用程序中出现bug的主要原因，需要新的测试和调试技术来专门解决TF相关的bug

## 6 RQ2:故障检测的挑战

### 6.1设置

为了理解bug检测中的挑战，我们通过回答两个问题首先对 bug进行了分类:(1)是否总是由任何输入触发bug;(2)这些bug是否总是会导致崩溃。第一个问题与触发错误的确定程度有关，第二个问题与捕获错误的确定程度有关。如果两个问题的答案都是“是”，那么肯定可以检测到bug。然后，我们手动调查了至少有一个问题的答案是“否”的bug，并试图识别与检测传统程序中的bug不同的新挑战。对于确定的每个挑战，我们进一步阅读问题和QA页面，找出TF用户已经使用的策略来处理这些挑战。


最后，我们分析了六种常见bug成因的挑战分布

### 6.2结果

表4显示了这两个问题的答案分布。


从表中可以看出，82个(46.9%)bug总是会导致程序崩溃，并且肯定会被检测到。

我们在其余53.1%的漏洞检测中发现了三个新的挑战。表5显示了显示这些挑战的bug数量。我们将在下面逐一描述这三个挑战。

#### 挑战1:概率正确性


在传统程序中，它们的输入/输出关系通常是非常需要的。这种关系决定了程序的正确性。


给定一个输入，如果程序产生错误的输出，则认为该程序有bug。然而，在TF程序中，可观察到的结果的正确性不能确定地确定。给定一个训练好的模型和一个输入，如果程序产生不正确的类位置，这并不一定意味着程序包含错误，因为TF程序不能保证100%正确的类位置。


相反，正确性通常被解释为一个概率:给定一个输入，TF程序被期望以一个概率产生正确的输出。传统的测试框架不能很好地处理概率正确性。在大多数测试框架中，需要将测试作为传递给程序的测试输入和测试oracle来确定输出的正确性，并且测试的意外输出表明存在错误。然而，当涉及到概率正确性时，我们不能通过观察单个测试的意外输出来确定bug的存在。


通过研究问题和QA页面，我们发现TF用户主要依靠统计数据来解决这些问题。虽然很难从单个输出确定概率，但对许多对输入和输出执行统计通常是一个很好的近似。特别是，我们发现TF用户主要依赖于两个统计值:准确性和程序在训练集或测试集上的损失。确定正确性的两种策略是基于准确性和损耗。

**策略1:**将总体精度和损失与固定阈值进行比较。当训练模型在训练集或测试集上没有达到预期的精度或损失时，认为该模型存在缺陷。

**策略2:**比较迭代之间准确性和损失的相对变化。虽然前面的策略在确定模型的正确性方面是有用的，但是测试执行可能是昂贵的。TensorFlow模型的完整训练过程通常需要几天的时间来完成，只有在训练之后我们才能知道模型的准确性和损失。另一方面，训练阶段由许多迭代组成，TensorFlow可以在每次迭代后报告中间精度和损失。因此，我们观察到一些TF用户使用迭代之间这些中间值的变化来确定正确性。一般来说，期望精度在迭代中呈现出增加的趋势，而损失则呈现出减少的趋势。如果在几次迭代中没有观察到明显的增加或减少的趋势，则TF用户认为模型有bug。


这些挑战和策略需要新的测试技术和框架。首先，大多数测试框架不支持统计正确性，应该开发确定统计正确性的机制。其次，传统的测试生成技术是为绝对正确性而设计的，如何有效地触发以统计正确性为特征的bug仍然是未知的。第三，统计正确性只是概率正确性的近似值，但我们如何测量可信度仍然未知。可以开发新的理论来测量测试TF程序的可信度。

#### 挑战2:巧合正确性


巧合正确性指的是测试执行触发了错误，但碰巧没有检测到失败的情况。


我们还观察了数据集的巧合正确性。虽然在训练过程中会触发错误，但训练后的模型在测试集上仍然达到了理想的精度和损失。这些bug最终是通过代码审查发现的。


由于巧合正确性在传统程序中已经存在，所以在bug检测中并不是一个新的挑战。然而，我们观察到，就规模而言，巧合正确性可能是一个新的挑战。TF程序的计算是由张量驱动的，张量通常是由大尺寸的多维数组来建模的。在计算迭代之后，数组中单个元素的值对nal类的识别结果(例如汽车前面是否有障碍物)有很小的贡献。


此外，大多数计算采用非线性激活函数，其输出对某些输入范围不敏感。因此，计算错误更有可能对最终结果产生不可观察的影响。换句话说，TF程序对计算错误的容忍度更高。因此，与传统程序相比，TF程序的巧合正确性在更大的范围内发生。


然而，这并不一定意味着巧合正确性不是一个重要的问题。在激活函数的过渡范围内计算错误的影响可以被大大放大。这种放大的 - ed - 效应可能导致不正确的分类信息，从而在任务关键型应用程序中造成严重后果。这种效应类似于DL模型中的对抗性攻击[12,35]。由于一些激活函数(如sigmoid)的转换范围很窄，因此找到对巧合正确性有抵抗的训练数据是具有挑战性的。


在我们的数据集中，我们观察到bug是通过代码审查发现的， TF用户决定x它们，尽管他们没有发现不正确的结果4。

#### 挑战3:随机执行


考虑到训练阶段的随机性，有可能两次执行表现出不同的事件行为，这使得很难重现错误。中给出的错误就是一个例子

图1所示。在训练过程中，TF用户会在多次迭代中评估他们的模型，以优化他们的损失函数。TF用户在StackOver上报告说，在对一些数据集进行大约8000次迭代后，程序因错误而崩溃。然而，由于梯度下降算法的随机性，哪一次迭代会产生误差是不确定的。在一次运行中，错误可能在第7900次迭代时发生。在另一次运行中，错误可能在第8100次迭代时发生。如果TF用户将模型设置为迭代8000次，他可能会在第一次运行中检测到错误，但在第二次运行中无法检测到它。


严格地说，非决定论并不新鲜:许多传统程序也表现出非决定论。然而，在TF应用程序上，这个问题变得更加严重，因为几乎所有的执行都是由不确定性决定的。需要更多的研究来处理TF应用中的不确定性

## 7 RQ3:故障定位的挑战

### 7.1设置

根据我们的分类教育，有三种主要类型的症状。与其他两种类型不同，“Error”的症状为调试提供了额外的信息，包括指示错误发生位置的行号和描述故障原因的错误消息。为了了解故障定位的挑战，我们使用di事件方法来分析“Error”类型和其他两种类型的错误。


对于“Error”类型的错误，我们使用跟踪依赖距离来定量度量故障定位的di重要性。我们将执行跟踪定义为执行期间执行的语句序列。跟踪依赖图是这样一种图，其中节点是执行跟踪中的语句执行实例，边缘是语句执行实例之间的动态数据或控制依赖关系。跟踪依赖距离是指从报告的错误位置到错误根源的跟踪依赖图上的最小节点数，被先前的研究提出用来衡量故障定位的可信度[30]。


此外，为了补充定量分析，我们还定性地读取了错误消息，以判断定位错误的di可靠性。请注意，并不是我们收集的所有错误在我们的数据集中都有错误消息，我们只关注那些有错误消息的错误。我们分析了79个带有错误消息的bug。如果执行跟踪涉及多个周期，我们将在讨论哪个周期引发错误时参考其他信息。

对于其他两种类型的漏洞，我们定性地分析了这些漏洞，以了解本地化的程度如何。最后，对于那些我们认为无法本地化的bug，我们试图找出TF用户如何本地化这些bug并将其总结为策略。

### 7.2结果


图8显示了从StackOverflow和Github收集的bug的依赖距离分布。除了2个距离超过8000的bug(我们在图1中的激励示例显示了图8中的一个:依赖距离分布它们)，可以看到其余的距离都小于8。这两个错误的错误执行都涉及到执行阶段。对于其他漏洞，平均值为0.99，中位数为0。


将此确定与我们对错误消息和其他两种类型的错误的定性分析相结合，我们有以下观察结果。


(1)当在构建阶段产生错误时，通常可以确定地将错误定位。在这种情况下，与涉及大量迭代和概率计算的执行阶段相比，跟踪依赖距离很短。此外，错误信息所嵌入的信息有助于对错误进行定位。可以通过跟踪依赖项从错误消息提供的错误语句开始向后检查程序。


(2)当故障执行涉及到执行阶段时，bug行为变得随机，极大地增加了故障定位能力。与传统程序相比，我们发现在定位这些漏洞时面临以下两个主要挑战。

#### 挑战4:密集相互依赖的神经网络


传统程序中的元素通常是松散地相互依赖的。如果我们从出现错误或不正确输出的点动态切片，切片结果通常只包含程序中编码实体的一小部分。然而，在神经网络中，当前层的节点通常依赖于前一层的节点。此外，在训练阶段，由于反向传播，依赖关系变成双向的。


因此，切片可以提供很少的帮助，因为切片通常包含神经网络中的所有节点，并且不能帮助调试。

#### 挑战5:神经网络的未知行为


调试传统程序的一种典型方法是通过比较变量的值和它们的期望值来检查特定c程序点上的程序状态。然而，在神经网络中，由于程序行为对训练过程中分配的超参数很敏感，程序员很难预测程序在某个点的期望值。因此，尽管我们可以在训练过程中访问神经网络的中间状态，但TF用户通常很难根据这些状态来判断其正确性。

由于许多bug都无法本地化，所以了解TF用户如何处理它们会很有趣。我们的研究确定了 TF用户用于定位漏洞的三种策略如下。

**策略3**:替换网络中的超参数


StackOver问题#42821125(图9)描述了一个IPS错误。这个任务是一个二进制类教育(0-1类教育)，输入包含大约69%的零，所以模型的准确率不能超过69%，这真的很奇怪。因此，提问者怀疑Yhat收敛为全零。


提问者说，我已经尝试了很多东西，如di事件优化器，损失函数，批量大小等。但无论我怎么做，它都会收敛到69%，永远不会超过。我猜我正在做的事情有一个更根本的问题，但我似乎无法找到它。


可以推断，提问者替换了网络的一些参数，希望寻求更好的结果。如果TF用户从他们的网络中得到意外的输出，他们要做的第一件事就是替换一些参数，如事件优化器、损失函数、批处理大小、学习率等。


提问者期望损失和准确性如何随事件的不同而变化。然而，中的输出并没有受到这些替换的影响，这导致提问者怀疑模型结构中存在更根本的问题，而不是这些模型参数。他应该使用谓词(在logits上应用sigmoid)将其范围从(−1;+1)到(0;1))计算correct_prediction，如图9(b)所示。

**策略4:**检查变量值的分布


StackOver问题#40166236(图10)描述了一个CCM错误。提问者打算使用di基于张量模式的事件批处理归一化参数。后来发现提问者应该用tf。cond而不是if(在第2行)选择所需的分支。使用if，分支将在图构建过程中被选择并且不会改变。


询问者通过使用TensorFlow可视化工具检查变量pop_mean和pop_var的分布来定位此故障，发现这两个变量的值从未改变。因此，尽管提提者不能预测准确的图10:从StackOver中提取的有问题的TensorFlow示例ow #40166236图11:从Github变量值中提取的有问题的TensorFlow代码片段上的x提交，可以指定di事件迭代中变量值之间的一些变形关系ed。

**策略5**:切换训练数据集


在Github上发现的commit5(如图11所示)中，这个错误是由初始化项的错误顺序引起的。TF用户在模型加载预训练模型后编写初始化器。这意味着所有加载的数据将被初始化为随机值。


由于它是一个视频预测模型，它不关心准确性，只通过其损失来评估。另一个(第二个)TF用户发布了一个问题6，报告预测图像严重模糊，损失性能很差。


第二个TF用户评论说我使用验证数据用于测试预测网络。由于我得到了类似的验证损失曲线，我假设训练过程是正确的。(我没有对代码做任何修改)。


可以看到，第二个TF用户将数据集切换到并找出了错误所在。两个数据集的训练损失曲线相似。因此，第二个TF用户怀疑错误不是在训练过程中触发的。根据后续程序版本的补丁(提交)，怀疑是正确的。

## 8 对有效性的威胁

首先，我们的研究涉及到对bug的手工检查。由于我们在缺乏文档的情况下对代码意图的推断，这些主观步骤可能会有偏差。为了减少这种威胁，两位作者分别分析了漏洞，并讨论了不一致的问题，直到达成一致。其次，我们的研究调查了来自StackOverow和Github的175个bug，目前还不清楚我们的结论在数据集之外有多少推广，特别是考虑到TF正在快速增长的事实。然而，扩展这个数据集并不容易。首先，由于TensorFlow是一个新兴的框架，在我们进行这项实证研究时，并没有很多维护良好的流行Github项目。其次，分析bug所需的手动e操作非常多。

在分析bug时，我们花费了大约400人小时，平均每个bug花费2.3人小时。

## 9 讨论

**常见的固定模式**

本文的重点是bug的检测和定位，而bug修复则留给以后的工作。尽管如此，我们也从GitHub项目的补丁中对Tensor的xing模式ow bug进行了小规模的试点分析，并在StackOverow QA页面中推荐了x。总的来说，我们发现xing模式与bug的根本原因密切相关。例如，APIC和APIM都与API调用相关，常见的xing模式正在更改参数顺序(图5和6)和更改API调用序列(图7(b))。


另一方面，IPS常见的修复模式是改变模型结构(图2)。这一发现表明，分析根本原因可能有助于进一步开发自动化修复方法。

**其他部分的bug**

正如在介绍中提到的，TF应用程序中的缺陷可能来自其训练数据、程序代码、执行环境或TensorFlow框架。我们的研究重点是TF程序中的bug，而不是其他类型的bug，因为这些类型本质上是不同的事件，不容易以的方式进行研究。训练数据中的bug与数据质量问题有关[14,33]，需要通过数据清洗[15,24,29]和数据增强[28,38]等方法来处理。TensorFlow框架中的bug是一种编译器bug，通常需要特定的c编译测试技术[3,4]来处理。执行环境中的bug通常是不可控制的，需要容错技术[21]来处理。这些类型的错误在StackOverflow页面或GitHub提交的TF程序中并不常见，并且需要其他数据源，例如训练数据集的历史或Tensorflow框架的提交。

## 10 近期工作

实证研究:Thung等[37]调查了三种机器学习系统，Apache Mahout, Lucene和OpenNLP。他们分析了他们的bug和fix的样本，并将bug分为不同的类别。他们还研究了bug的严重程度，消灭bug所需的时间和精力，以及bug的影响。与他们不同的是，我们的研究重点是建立在TensorFlow之上的深度学习应用程序的错误，这些应用程序基于神经元的分层层，这些神经元相互连接以形成神经网络。


Seaman等人[32]调查了NASA的81个项目，并构建了一组新的缺陷类别，其抽象层次略高于历史上的。Thung等人在机器学习系统的实证研究中使用了Seaman等人提供的缺陷类别。与它们的类别不同，我们在较低的抽象层次上对深度学习应用程序的错误提出了分类。


一些实证研究集中在某些类型的bug上。Jin等[19]和Zaman等[42,43]对性能漏洞进行了研究。Gunawi等[13]对云系统的开发和部署问题进行了研究。Xiao等[39]研究了MapReduce程序中非交换约简函数的bug。Chen等[6]研究了Apache基础软件系统中的休眠bug。许多研究[2,8,20,22]关注API变化带来的bug。我们的研究重点是TF错误，它与上述大多数错误不同事件。唯一的例外是API变化带来的bug，这些bug在TF程序和传统程序中都会出现。我们对这些bug的观察与现有的研究是一致的，我们没有发现在检测和定位这些bug方面存在新的挑战。


机器学习测试:Xie等人[40]提出了一种基于变质测试的技术来解决机器学习分类教育算法:k近邻和朴素贝叶斯分类er实现的测试oracle问题。


Pei等人[28]设计的DeepXplore是一个白盒di迭代测试系统，可以和可能触发多个dnn之间不一致的输入，并识别错误行为。他们将神经元覆盖率作为一种系统的度量标准，用于测量深度神经网络的内部逻辑已被测试的程度。


Tian等人[38]提出了DeepTest，这是一种用于dnn驱动的自动驾驶汽车自动测试的工具。DeepTest可以使用由di事件真实转换生成的测试图像来最大化DNN的神经元覆盖率。他们利用域特有的c变质关系到和DNN的错误行为。


Srisakaokul等[34]提出了一种监督学习软件的多重实现测试方法:k近邻和朴素贝叶斯。


大数据调试:Interlandi等人[17]构建了Titian，这是一个直接与Spark运行时和编程接口集成的数据来源库。Ma等[23]提出了一种基于图的机器学习算法的数据来源计算技术LAMP。


概率测试:Barr等[1]研究了软件测试中的测试oracle，包括概率测试oracle。Gerhold等[11]为非确定性概率系统设计了一个可执行的基于模型的测试框架。

我们的工作来源于这些关于测试和调试方法的研究，因为它是第一个关于基于TensorFlow构建的深度学习程序编码错误的实证研究，通过收集StackOverow上的相关讨论和在Github项目中被修复的bug。

## 11 结论及意义

我们研究了175个从StackOverflow收集的TensorFlow应用程序错误，这些错误来自QA页面和Github项目。我们根据QA页面、提交消息、拉取请求消息和问题讨论检查了这些bug的根本原因和症状。我们还研究了TF用户用于错误检测和定位的策略。


两组人可以从这项研究中受益。对于TF用户，我们总结了其他TF用户用于检测和调试TF程序中的错误的五种策略。对于软件工程研究人员，我们指出了需要更多研究的新挑战，详见。我们的课程对的原因和症状的说明有助于TF用户和软件工程研究人员更好地理解深度学习程序的错误。