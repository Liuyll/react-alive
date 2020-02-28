# react-alive

## How to Use
```
  <KeepScope>
    <KeepAlive>
      {...component}
    </KeepAlive>
  </KeepScope>
```

## 注意
1. 该版本只是初始版本，还剩余很多问题并未解决，主要是`context`上下文重构带来的问题(包括但不限于事件冒泡，context失效)
2. 如果需要生产环境的稳定版本，[react-activation](https://github.com/CJY0208/react-activation/tree/master/src/core)
3. 该组件依赖于`Suspense`,自行查看react版本
