# 小程序框架说明（⭐️ 为统一编码规范，建议统一使用[小程序开发者工具及配置](install.md#小程序开发者工具) ⭐️）

👉 请提前学习[小程序开发指南](https://developers.weixin.qq.com/miniprogram/dev/framework)

- `.js`：脚本逻辑文件
- `.json`：配置文件
- `.wxml`：模板文件
- `.less`：CSS 预处理语言文件，  
  小程序开发者工具不会自动生成，需手动创建，  
  通过插件可自动生成同名`.wxss`样式文件，  
  可参考[小程序开发者工具配置](install.md#小程序开发者工具)
- `.wxss`：样式文件

## 创建项目

- 在公司自建 GitLab 上创建项目空仓库（不勾选【使用自述文件初始化仓库】）
- 在小程序开发者工具中创建新项目
- 在项目目录中执行 git 初始化，并关联远程仓库地址

  ```shell
  # git初始化
  git init

  # 关联远程仓库地址
  git remote add origin ssh://git@gitlab.healthan.net:22322/palm-hosp/minzu.git
  ```

## 添加文件

- 将[目录](wx-framework-core/)中的文件拷贝到项目中，部分文件会被覆盖，  
  树状图结构如下

  ```shell
  .
  ├── api/
  │   └── api.js                  # API请求函数
  ├── components/                 # 自定义公共组件
  │   └── auth/                   # 登录授权
  │       ├── index.js
  │       ├── index.json
  │       ├── index.less
  │       ├── index.wxml
  │       └── index.wxss
  ├── config/                     # 配置文件
  │   └── app.js
  ├── images/                     # 公共图片
  │   └── logo.jpg
  ├── utils/                      # 工具类
  │   ├── log.js
  │   ├── qrcode.js
  │   ├── request.js
  │   └── tools.js
  ├── .gitignore                  # git过滤文件配置
  ├── app.js                      # 小程序主体逻辑（可定义全局变量）
  ├── app.json                    # 小程序主体配置（全局配置）
  ├── app.less                    # 使用less编写样式，通过小程序开发者工具[插件+配置]实现自动转wxss功能，简化样式源码
  ├── app.wxss                    # 由app.less自动生成的样式文件
  ├── CHANGELOG.md                # 更新日志（内容仅供参考，需根据实际情况修改）
  ├── gulpfile.js                 # 小程序开发者工具[构建 npm]操作后，执行[npm run build]可将miniprogram_npm目录下的px转成rpx，如：8px >>> 16rpx
  ├── package.json                # npm配置
  └── sitemap.json                # 微信索引配置
  ```

## 依赖插件

```json
{
  "dependencies": {
    "@vant/weapp": "^1.4.4", // 小程序 UI 组件库
    "dayjs": "^1.8.34" // 处理时间和日期的 JavaScript 库
  },
  "devDependencies": {
    "gulp": "^4.0.2", // 自动化构建工具
    "gulp-px2rpx": "^0.2.2" // 单位转换工具：px 转 rpx
  }
}
```

- 安装

  ```shell
  # 安装
  npm install

  # 检查版本是否有更新
  npm-check -u
  ```

- 构建

  - 在小程序开发者工具菜单中找到`[构建 npm]`
  - 点击`[构建 npm]`，将 node_modules 构建成 miniprogram_npm

- 转换单位

  ```shell
  # px 转成 rpx
  npm run build
  ```

## 命名规范

- 文件名

  ```shell
  ├── register/
  │   ├── index.js
  │   ├── record.js
  │   └── record-detail.js          # 多单词用横杠连接
  ```

- CSS

  - 采用 BEM 命名规则(Block-Element-Modifier)
  - 示例

    ```html
    <article class="listing-card listing-card--featured">
      <h1 class="listing-card__title">Adorable 2BR in the sunny Mission</h1>
      <div class="listing-card__content">
        <p>Vestibulum id ligula porta felis euismod semper.</p>
      </div>
    </article>
    ```

    ```css
    .listing-card {
    }
    .listing-card--featured {
    }
    .listing-card__title {
    }
    .listing-card__content {
    }
    ```

    - `.listing-card`是一个块（block），表示高层次的组件。
    - `.listing-card__title`是一个元素（element），它属于`.listing-card`的一部分，因此块是由元素组成的。
    - `.listing-card--featured`是一个修饰符（modifier），表示这个块与`.listing-card`有着不同的状态或者变化。

- JavaScript

  - 参考[Airbnb JavaScript 风格指南](https://github.com/airbnb/javascript)

  - 用小驼峰式命名你的对象、函数、实例。 eslint: `camelcase`

    ```js
    // bad
    const OBJEcttsssss = {}
    const this_is_my_object = {}
    function c() {}

    // good
    const thisIsMyObject = {}
    function thisIsMyFunction() {}
    ```

  - 用大驼峰式命名类。 eslint: `new-cap`

    ```js
    // bad
    function user(options) {
      this.name = options.name
    }

    const bad = new user({
      name: 'nope'
    })

    // good
    class User {
      constructor(options) {
        this.name = options.name
      }
    }

    const good = new User({
      name: 'yup'
    })
    ```

## 全局样式

- 使用`display:flex`布局，参考资料([弹性布局（display:flex;）属性详解](https://www.cnblogs.com/hellocd/p/10443237.html))

  ```css
  page {
    display: flex;
    flex-direction: column;
  }
  ```

- 使用`自定义属性`设置 CSS 变量，参考[MDN 文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/--*)

  ```css
  /** 定义变量 */
  page {
    --background-color: #f2f4f5;
    --primary-color: #3e9572;
  }

  /** 引用变量 */
  .content {
    /** 若自定义变量不存在，则使用备用值 #ffffff */
    background-color: var(--background-color, #ffffff);
  }
  .text {
    color: var(--primary-color);
  }
  ```

## 项目相关

- 修改项目本地配置
- 添加医院必要参数
- 编写业务模块代码
