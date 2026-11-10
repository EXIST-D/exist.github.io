---
title: PixelCampus · 像素校园
description: 以河北工程大学新校区为原型的多人像素网页游戏。用真实校园地图做探索场景，在浏览器里散步、钓鱼、找猫和联机。
period: 2026 年起 · 持续开发与运营
stack: [Phaser 3, TypeScript, Vite, Node.js, WebSocket]
featured: true
order: 0
category: game
status: 持续运营
role: 发起、核心开发与线上运营
outcome: 上线可直接游玩的浏览器版本，持续维护联机服务和玩家档案。
demo: https://exist.qd.je/pixel/
repo: https://github.com/EXIST-D/PixelCampus
image: /images/pixelcampus-south-gate.webp
imageAlt: PixelCampus 离线试玩截图：角色走过傍晚的南门广场，左下角是校园小地图。
highlights:
  - 根据真实校园布局建模，程序生成像素场景与角色素材
  - 浏览器端实时联机，服务端裁决互动与进度
  - 玩家档案增量保存，公开客户端可独立离线试玩
---

## 一所可以走进去的像素校园

PixelCampus 把河北工程大学新校区做成了俯视角网页游戏。你可以骑共享单车、在湖边钓鱼、跟校园里的小猫互动，也可以和朋友在同一张地图上走一圈。电脑用键盘，手机用虚拟摇杆；打开浏览器就能进入，无需下载或注册传统账号。

## 从真实地图到游戏世界

地图以卫星正射图量测为基础，再用 OpenStreetMap 核对路网。校园蓝图包含 88 栋建筑和湖、运动场、校门等地标。构建脚本从同一份蓝图生成四季地块、建筑图集、碰撞数据和小地图；浏览器随镜头移动加载附近地块。

## 浏览器与联机服务如何分工

Phaser 3 负责渲染和操作，TypeScript 贯穿客户端和共享规则，Vite 构建网页。Node.js 服务通过 WebSocket 同步玩家状态，并判定距离、掉落、交易等规则。客户端和服务器共用地图碰撞数据；玩家档案采用快照加增量日志，避免每次改动都重写所有档案。

GitHub 仓库公开的是客户端、地图工具和共享规则。联机服务及生产数据单独维护，许可范围见仓库说明。

## 继续查看

- [进入像素校园](https://exist.qd.je/pixel/)
- [阅读 PixelCampus 开发与运营记录](/exist.github.io/notes/pixelcampus-operations/)
- [源码、操作说明与玩法清单](https://github.com/EXIST-D/PixelCampus)
