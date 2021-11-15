# 前言

在 Git 安装好之后，会有三个程序，分别为：

Git Bash：Linux 风格的命令行

Git CMD：Windows 风格的命令行

Git GUI：拥有图形界面的 Git

在初学时使用第一个 Git Bash，熟悉掌握常用的命令

Linux常用的命令如下：

1. cd  进入主目录
2. cd..  返回到上一级目录
3. pwd  显示当前所在的路径
4. ls(ll)  列出当前目录中的所有文件
5. touch  新建一个文件
6. rm  删除一个文件
7. mkdir  新建一个文件夹
8. rm -r  删除一个文件夹
9. mv 
    1. mv source_file dest_file  将源文件 source_file 改名为 dest_file
    2. mv source_file dest_directory  将源文件 source_file 移动到目标目录 dest_directory 中
    3. mv source_directory dest_directory  若 dest_directory 不存在，则将 source_directory 改名为 dest_directory；否则将 source_directory 移动到 dest_directory 中
10. reset  初始化终端
11. clear  清屏
12. history  查看命令历史
13. help  帮助
14. exit  退出



# Git项目搭建

1. 创建全新的本地仓库
```plain
$ git init
```
2. 克隆远程仓库
```plain
$ git clone [url] 
```



