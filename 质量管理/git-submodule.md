# Git 子模块管理

👉 请提前学习[git submodule 使用文档](https://git-scm.com/book/zh/v2/Git-%E5%B7%A5%E5%85%B7-%E5%AD%90%E6%A8%A1%E5%9D%97) 或其他网站的相关技术分享

---

## 添加

- 在`GitLab`上创建并初始化仓库（同普通仓库一样创建）

  > 例：[https://gitlab.healthan.net/zl-modules/medical/card](https://gitlab.healthan.net/zl-modules/medical/card)（就诊卡管理）

- 在主项目里添加子模块

  ```shell
  # 通过git submodule add -h 查看子模块添加方式
  # git submodule [--quiet] add [-b <branch>] [-f|--force] [--name <name>] [--reference <repository>] [--] <repository> [<path>]

  # 添加前请确认pages/card未被占用
  git submodule add --name 就诊卡管理 ssh://git@gitlab.healthan.net:22322/zl-modules/medical/card.git pages/card
  ```

- 提交子模块及关联映射文件

  ```shell
  git add .gitmodules
  git add pages/card
  # 或添加所有变更文件
  git add .

  # 提交文件
  git commit -m '提交说明'
  ```

## 修改

- 在子模块里创建或切换为自己的任务分支

  ```shell
  cd pages/card
  git checkout dev
  git pull origin dev
  git checkout -b feature_2020082601
  ```

- 照常修改`pages/card`目录下的文件代码
- 测试通过后提交分支代码，由管理员`review`和`merge`
- 管理员`merge`完成后

  - 将子模块分支切回`master`分支，并拉取最新代码

    ```shell
    cd pages/card
    git checkout master
    git pull origin master
    ```

  - 更新项目的子模块关联

    ```shell
    git add .gitmodules
    git add pages/card
    # 或添加所有变更文件
    git add .

    # 提交文件
    git commit -m '提交说明'
    ```

- 推送所有提交至远程分支

  ```shell
  git push origin [分支名称]
  ```

## 更新

- 单个模块更新

  ```shell
  cd pages/card
  git checkout master
  git pull origin master

  cd ../../
  git add .gitmodules
  git add pages/card
  # 或添加所有变更文件
  git add .

  # 提交文件
  git commit -m '提交说明'

  git push origin [分支名称]
  ```

- 批量更新

  ```shell
  git submodule foreach git checkout master
  git submodule foreach git pull origin master

  git add .
  # 或逐个添加变更文件

  # 提交文件
  git commit -m '提交说明'

  git push origin [分支名称]
  ```

## 删除

```shell
git rm pages/card

git add .
# 或逐个添加变更文件

# 提交文件
git commit -m '提交说明'

git push origin [分支名称]
```

## 文档规范

每一个子模块，都应有以下 4 个文档。

- readme.md 用来记录功能说明、依赖说明、目录说明。
- config.md 为了使每个模块更加具有通用性，应该把跳往其他页面/模块的入口路径与功能开关全部都写到配置文件中。 此文档为记录各个入口与开关的说明文档。
- api.md 记录为了使整个模块运转起来的依赖 api，文档中应详细记录模块中应用的 api，api 功能说明，出入参说明。
- changelog.md 修改日志
