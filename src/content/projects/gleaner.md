---
title: Gleaner · 拾穗
description: 面经采集与整理前置工具，将多个平台的公开面经增量采集、规则初筛、去重打包，再交给 Interview Bank 整理。
period: 持续开发
stack: [Python, SQLite, MediaCrawler, faster-whisper, JavaScript]
featured: true
order: 3
category: data
status: 早期版本 · 持续开发
role: 独立设计与开发
outcome: 将跨平台面经组织为保留来源的素材包，连接独立采集题库与人工审阅流程。
repo: https://github.com/EXIST-D/Gleaner
image: /images/gleaner-overview.png
imageAlt: Gleaner 本地控制台的多平台采集概览与运行记录
highlights:
  - 五个平台的面经发现与增量采集
  - 规则初筛、人工标签与来源保留
  - 素材包交接到独立采集题库
---

## 把散落的面经一穗一穗捡回来

Gleaner 负责“发现 → 抓取 → 筛选 → 打包”，与 Interview Bank 配合使用。小红书、抖音、B 站和知乎通过本机 MediaCrawler 小批量采集，牛客由独立读取器访问公开面经列表与帖子。

题目抽取、分类、同义题合并与参考答案由 Interview Bank 完成。两者通过有来源信息的素材包交接，使采集过程与题库理解各自保持清楚的职责。

## 增量采集与可复核筛选

工作区使用 SQLite，以“平台 + 帖子 ID”去重并保存抓取记录和关键词进度。初筛将帖子标为疑似真实面经、题目合集、广告、无关或待判断，不直接删除；人工修改的标签不会被后续规则覆盖。

`gleaner auto` 串联增量采集、录音下载和打包。某个平台需要扫码或触发验证时会跳过或停止该平台并说明原因，后续平台仍可继续，不会自动绕过验证。

## 从素材包到题库

素材包包含 manifest、正文、图片或录音，以及供 Agent 接续处理的 HANDOFF 文档。B 站面试录音可交给本地 faster-whisper 转写，再由 Agent 校正术语和提取题目。

采集题库与个人题库保持独立，避免批量采集次数与个人经历混在一起。需要补充到个人题库时，可导出文字题目包，经过重复候选审阅再导入；这不是后台自动写入线上题库的同步服务。

## 本地控制台

网页支持查看采集概览、执行抓取、浏览帖子、修改标签、打包素材与查看整理后的题库，也能按公司和领域导出 Markdown 报告。控制台默认只监听本机，核心使用 Python 标准库，采集、转写工具分别安装与维护。

## 当前阶段与使用范围

项目处于早期持续开发阶段，公开版本为 0.1.0。采集面向个人学习、小批量使用；数据、登录状态与采集题库留在本机。MediaCrawler 单独安装，其许可证独立适用。帖子与图片仍属于原作者，公开案例不意味着可以转载原始素材。

## 源码与相关项目

- [Gleaner 开源仓库与使用说明](https://github.com/EXIST-D/Gleaner)
- [Interview Bank](https://github.com/EXIST-D/Interview-bank)

本页根据项目公开 README 整理，核对日期：2026-11-01。最新行为与平台限制以仓库说明为准。
