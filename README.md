# jsProject
jsRefactoring代码重构学习，使用《重构 改善既有代码的设计》（第二版）学习笔记

1.4.1 将statement里面的函数提炼出来，将计算戏剧费用的代码提炼为函数，amountFor（）
1.4.2 将amountFor（）函数中返回值的变量修改为result
1.4.3 javascript 动态语言的参数取名字时都默认带上其类型名，一般我会使用不定冠词a，本次重构，就将amountFor（）函数中的perf修改为aPerformances 