# 登陆
# npm adduser

# 当前账号信息
# npm who am i

# # 发布
# npm publish
# if [ $? != 0 ]; then
#     exit 0
# fi

# # git 添加到暂存区
git add .

# git 提交内容
read -p "请输入提交版本号：" v
read -p "请输入提交内容：" input
echo "feat()：<$v> $input"
git commit -m "feat()：<$v> $input"

# git 推送
git push