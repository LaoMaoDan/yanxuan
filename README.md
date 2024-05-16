# yanxuanmall

## Project setup

```
npm install

```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### 组件的 options

1、elMessage
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :---: | :---: | :---: | :---: | :---: |
| title | 消息文字 | string | --- | --- |
| type | 主题 | string | success/error/info | info |

2、swiper
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :------: | :----------: | :-----: | :--------: | :----: |
| imgs | 图片 | Array | --- | --- |
| autopaly | 是否自动播放 | boolean | true/false | true |

3、tabpanel
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :--: | :--: | :----: | ------ | ------ |
| item | 数据 | object | --- | --- |
| text | 文字 | string | --- | 文字 |

4、top-title
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :---: | :------: | :-----: | :----: | :----: |
| title | 标题 | string | --- | 首页 |
| show | 显示返回 | boolean | --- | false |

5、tips
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :---: | :------: | :-----: | :----: | :----: |
| title | 标题 | string | --- | 首页 |
| show | 显示隐藏 | boolean | --- | false |

6、mask
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :---: | :------: | :-----: | :----: | :----: |
| dis | 控制显示/隐藏 | boolean | --- | false |
| height | 控制白色部分的高 | string | --- | '80%' |
| radius | 控制白色部分的圆角 | string | --- | '0.6667rem' |

7、confirmMask
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :---: | :------: | :-----: | :----: | :----: |
| display | 显示隐藏 | boolean | --- | false |
