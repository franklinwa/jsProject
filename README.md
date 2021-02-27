# jsProject
jsRefactoring代码重构学习，使用《重构 改善既有代码的设计》（第二版）学习笔记

1.4.1 将statement里面的函数提炼出来，将计算戏剧费用的代码提炼为函数，amountFor（）

1.4.1 将amountFor（）函数中返回值的变量修改为result

1.4.2 javascript 动态语言的参数取名字时都默认带上其类型名，一般我会使用不定冠词a，本次重构，就将amountFor（）函数中的perf修改为aPerformances.

1.4.3 很多局部作用域的临时变量，应该及时移除，重构手法叫“以查询取代临时变量”，也就是说通过其他变量的查询操作可以获得该变量，那么就可以将该变量移除。比如这里的play是为了获取计算戏剧的费用的局部作用区域变量。所以可以通过aPerformance变量查询获得。

1.4.4 使用内联变量手法内联play变量

1.4.5 amountFor（）函数内部应用新提炼的函数，最后删除playFor(perf)参数。

1.4.6 在调用amountFor（）函数的地方采用内联变量的方法内联他。应为函数被赋值给一个变量后，该变量一直没有被修改。移除局部变量的好处就是做提炼时会简单的多，因为需要操作的局部作用域变少了。实际上，在做任何提炼前，我一般都会先移除局部变量。

1.4.7 提炼计算观众积分的逻辑，将相关代码提炼为函数。

就是将以下的代码：

```
volumeCredits += Math.max(perf.audience - 30, 0);

if ("comedy" === playFor(perf).type) volumeCredits += Math.floor(perf.audience / 5);
```

初次修改为：
```
function volumeCreditaFor(pref){

let volumeCredits = 0

volumeCredits += Math.max(perf.audience - 30, 0);

if ("comedy" === playFor(perf).type) volumeCredits += Math.floor(perf.audience / 5);

return volumeCredits;

}

```


再次修改为：
```
function volumeCreditsFor(aPerformances){

    let result = 0

    result += Math.max(aPerformances.audience - 30, 0);

    if ("comedy" === playFor(aPerformances).type) 
        result += Math.floor(aPerformances.audience / 5);

    return result;

}

```
1.4.8 将函数赋给变量，更应将其替换为一个明确声明的函数，并为函数命名要体现函数的意图。将常量format，提升为明确的声明的函数，并根据其功能，将函数名修改为usd。

```
 const format = new Intl.NumberFormat("en-US",
 
                        { style: "currency", currency: "USD",
                        
                          minimumFractionDigits: 2 }).format;
```

提升为函数

```
function usd(aNumber){

return new Intl.NumberFormat("en-US",

                        { style: "currency", currency: "USD",
                        
                          minimumFractionDigits: 2 }).format(aNumber/100);

}
```

1.4.9 移除观众量积分总和。

第一步就是应用拆分循环，将volumeCredits的累加过程从迭代中分离出来。

将以下代码分离为如下：
```
for (let perf of invoice.performances) { 
    
    volumeCredits += volumeCreditsFor(perf);
    // add volume credits

    // print line for this order
    result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience} seats)\n`;
    totalAmount += amountFor(perf);
  }

```

修改为：
```
for (let perf of invoice.performances) { 
    
    volumeCredits += volumeCreditsFor(perf);
    // add volume credits

    // print line for this order
    result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience} seats)\n`;
    totalAmount += amountFor(perf);
  }

  // 拆分循环

for (let perf of invoice.performances) { 
    
    volumeCredits += volumeCreditsFor(perf);
    // add volume credits
  }
```


第二步，利用移动语句手法将变量声明挪动到紧邻循环的位置。

let volumeCredits = 0;

第三步，同样是先对变量的计算过程提炼函数。


   
第四步，应用内联变量手法内联函数。


1.4.10 
除totalAmount

第一步就是应用拆分循环，将totalAmount的累加过程从迭代中分离出来。

第二步，将变量内联