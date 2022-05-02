###
 # @Descripttion:
 # @version:
 # @Author: ZhenghuaXie
 # @Date: 2022-05-02 10:22:54
 # @LastEditors: ZhenghuaXie
 # @LastEditTime: 2022-05-02 10:50:29
###
#!/usr/bin/env sh

# 发生错误时终止
set -e

# 构建
npm run build

# 进入构建文件夹
cd dist

# 如果你要部署到自定义域名
# echo 'www.example.com' > CNAME

git init
git checkout -b main
git add *
git commit -m 'deploy'

# 如果你要部署在 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git main

# 如果你要部署在 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:zhangguifu123/GameFriendGack.git main

cd -
