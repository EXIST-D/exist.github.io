---
title: Interview Bank
description: 面向 Codex、Claude Code 等 Agent 的面试题整理 Skill，连接多模态素材、保守去重、有来源的答案和碎片化复习。
period: 持续迭代
stack: [Agent Skills, Python, React, TypeScript, Tailwind CSS, FSRS]
featured: true
order: 2
category: skills
status: 开源 · 在线测试版
role: 独立设计与开发
outcome: 从面试素材整理延伸到电脑与手机上的阅读、笔记、收藏和复习。
repo: https://github.com/EXIST-D/Interview-bank
demo: https://exist.qd.je/
image: /images/interview-bank-public.png
imageAlt: Interview Bank 在线站点的公开资料概览与四个阅读板块
highlights:
  - 截图、文字与音视频转写抽题
  - 同义题合并与有来源的参考答案
  - Web 阅读器、个人笔记与间隔复习
---

## 从碎片材料到个人题库

面试题常常散落在截图、网页、选中的文字和录音里。Interview Bank 用 Agent 理解这些材料，提取原题与追问关系，再交给 Python CLI 校验、暂存和事务入库。它保留公司、轮次、日期和来源，不靠生成一篇长报告代替可维护的数据。

## 抽取、去重与答案研究

处理链路是：素材入库 → 题目抽取 → 分类 → 候选去重 → 提交 → 研究参考答案 → 导出。

候选检索先缩小范围，Agent 再结合完整题意判断是否合并，保留语言、版本和场景约束。拿不准的合并可以交给用户在网页中裁决。参考答案优先依据官方文档、原始论文和第一方资料，将要点映射到出处；来源核验与人工审阅分别记录。

同一份题库可生成带答案和纯题目两版 Markdown 报告，也支持 JSON、JSONL、CSV 与 Anki 导出。JD 专题选题、覆盖缺口、每日计划和逐题模拟面试建立在已有题库上。

## 在线阅读与碎片复习

[在线测试版](https://exist.qd.je/) 已部署到个人服务器。公开八股资料、公开面经和学习资料可以免登录浏览；个人面经、笔记、收藏与练习记录需要登录，完整功能测试可通过仓库联系作者。

桌面端支持列表与阅读区并排、专注模式、Markdown 笔记面板；手机端支持全屏阅读、上一题与下一题、随机一题和先想再看。复习可选简单间隔、FSRS-4.5 或 FSRS-6，间隔安排不等同于已验证的个人学习效果。

## 技术与质量边界

Python 核心使用标准库，Agent 负责材料理解和答案研究；React、TypeScript、Vite 与 Tailwind CSS 构成网页阅读器。JSONL 保留题目、来源、出现记录和答案历史，修改经过校验与提交，支持备份恢复。

公开仓库包含 Skill、工具、测试、评测和合成演示数据，不包含个人题库。截图识别、语音转写和参考答案都需要结合原文与适用条件复核。网页中的 AI 导入和模拟面试依赖服务器配置，不意味着公开访问者自动具备全部功能。

## 源码与体验

- [访问 Interview Bank 在线测试版](https://exist.qd.je/)
- [Interview Bank 开源仓库与安装说明](https://github.com/EXIST-D/Interview-bank)
- [问题与反馈](https://github.com/EXIST-D/Interview-bank/issues)

本页根据公开 README 与在线页面整理，核对日期：2026-11-01。最新功能以仓库及站点实际开放范围为准。
