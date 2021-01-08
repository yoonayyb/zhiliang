# 小程序业务模块说明（⭐️ 为统一编码规范，建议统一使用[小程序开发者工具及配置](install.md#小程序开发者工具) ⭐️）

👉 请提前学习[小程序开发指南](https://developers.weixin.qq.com/miniprogram/dev/framework)

- `.js`：脚本逻辑文件
- `.json`：配置文件
- `.wxml`：模板文件
- `.less`：CSS 预处理语言文件，  
  小程序开发者工具不会自动生成，需手动创建，  
  通过插件可自动生成同名`.wxss`样式文件，  
  可参考[小程序开发者工具配置](install.md#小程序开发者工具)
- `.wxss`：样式文件

## 创建子模块

- 查看[Git 子模块管理](git-submodule.md)

## 提交代码

- 先提交子模块代码
- 再提交主项目与子模块的关联

## 子模块树状图参考

- 就诊卡管理

  ```shell
  .
  ├── CHANGELOG.md                    # 更新日志
  ├── add.js                          # 添加/绑定
  ├── add.json                        # 添加/绑定
  ├── add.less                        # 添加/绑定
  ├── add.wxml                        # 添加/绑定
  ├── add.wxss                        # 添加/绑定
  ├── detail.js                       # 详情
  ├── detail.json                     # 详情
  ├── detail.less                     # 详情
  ├── detail.wxml                     # 详情
  ├── detail.wxss                     # 详情
  ├── index.js                        # 首页
  ├── index.json                      # 首页
  ├── index.less                      # 首页
  ├── index.wxml                      # 首页
  └── index.wxss                      # 首页
  ```

- 在线咨询

  ```shell
  .
  ├── chat/                           # 咨询聊天
  │   ├── index.js
  │   ├── index.json
  │   ├── index.less
  │   ├── index.wxml
  │   └── index.wxss
  ├── collect/                        # 收藏医生
  │   ├── index.js
  │   ├── index.json
  │   ├── index.less
  │   ├── index.wxml
  │   └── index.wxss
  ├── common/                         # 通用工具库
  │   ├── iconfont/                   # 字体图标
  │   │   ├── iconfont.svg
  │   │   └── iconfont.wxss
  │   ├── images/                     # 静态图片
  │   │   ├── avatar/
  │   │   │   ├── default.png
  │   │   │   └── doctor.png
  │   │   ├── error.png
  │   │   └── quanke.png
  │   └── socket.js                   # WebSocket二次封装
  ├── components/                     # 自定义组件
  │   ├── chat-input/                 # 聊天输入框
  │   │   ├── index.js
  │   │   ├── index.json
  │   │   ├── index.less
  │   │   ├── index.wxml
  │   │   └── index.wxss
  │   └── search/                     # 自定义搜索组件
  │       ├── index.js
  │       ├── index.json
  │       ├── index.less
  │       ├── index.wxml
  │       └── index.wxss
  ├── department/                     # 科室/医生选择列表
  │   ├── index.js
  │   ├── index.json
  │   ├── index.less
  │   ├── index.wxml
  │   └── index.wxss
  ├── doctor/                         # 医生详情
  │   ├── index.js
  │   ├── index.json
  │   ├── index.less
  │   ├── index.wxml
  │   └── index.wxss
  ├── evaluate/                       # 评价医生
  │   ├── index.js
  │   ├── index.json
  │   ├── index.less
  │   ├── index.wxml
  │   └── index.wxss
  ├── record/                         # 咨询记录
  │   ├── index.js
  │   ├── index.json
  │   ├── index.less
  │   ├── index.wxml
  │   └── index.wxss
  ├── start/                          # 开始咨询
  │   ├── index.js
  │   ├── index.json
  │   ├── index.less
  │   ├── index.wxml
  │   └── index.wxss
  └── CHANGELOG.md                    # 更新日志
  ```
