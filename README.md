# 编辑帖子按钮 flarum-edit-post

给 Flarum 2.x 论坛加一个「随手就能编辑」的入口：不用再滚到长帖子的底部去找编辑按钮。

## 功能

1. **帖子头部编辑按钮**：每篇帖子的右上角（移动端同样可见）多出一个铅笔图标，点一下立即打开编辑框。
2. **「回复」下拉菜单里的「编辑帖子」**：讨论页右侧（移动端顶部「⋮」菜单）的回复按钮下拉菜单中新增「编辑帖子」一项，点击后直接编辑主题首帖。
3. **按钮按权限显示**：只有「能编辑这篇帖子」的用户才会看到按钮，普通成员看不到多余的入口。

## 安装

```bash
composer require tcs/flarum-edit-post:@dev
php flarum extension:enable tcs-edit-post
php flarum cache:clear
```

## 兼容性

- Flarum `^2.0`
- PHP `^8.2`