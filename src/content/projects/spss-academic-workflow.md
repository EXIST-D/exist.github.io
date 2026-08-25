---
title: SPSS Academic Workflow Skill
description: 一个面向 Codex 的 SPSS 实证研究 Agent Skill，把数据分析、结果整理、中文 LaTeX 论文写作和 PDF 输出组织成可复用工作流。
period: 2026.04 - 至今
stack:
  - Codex Skill
  - SPSS
  - SPSS-MCP
  - Python
  - LaTeX
featured: true
order: 1
role: 独立设计与维护
outcome: 将 SPSS 实证分析流程封装为开源 Skill，帮助 agent 更系统地完成中文实证论文分析与写作。
repo: https://github.com/EXIST-D/spss-academic-workflow
---

## 项目简介

`spss-academic-workflow` 是一个面向 Codex 的 Agent Skill，目标是把中文实证研究中反复出现的流程沉淀成可复用的自动化工作流。

它围绕 SPSS 分析场景设计，帮助 agent 组织研究项目、准备数据集、设计变量和模型、调用或指导 SPSS/SPSS-MCP 完成分析，并把统计输出整理成论文可用的表格、中文结果段落和 LaTeX 文稿。

## 为什么做这个项目

传统实证论文写作里，数据处理、模型设计、SPSS 分析、结果解释和论文排版往往分散在多个工具与文档中。这个项目希望把这些步骤变成一套稳定的 agent workflow，让分析过程更可复现，也让结果输出更接近论文交付形态。

## 核心能力

- 创建可复现的实证研究项目目录结构。
- 指导数据准备、变量设计、样本规则和模型设计。
- 覆盖描述性统计、相关分析、t 检验、方差分析、卡方检验、信度分析、因子分析、回归分析等常见 SPSS 分析场景。
- 支持主效应模型、控制变量模型、稳健性检验、异质性分析、机制分析、调节效应和中介效应等论文分析路径。
- 将 SPSS 输出整理成论文表格、中文结果说明、LaTeX 源文件和可编译 PDF。

## 项目结果

这个仓库已经作为一个小型开源项目发布，提供中英文 README、Skill 文件、参考文档、脚本和 LaTeX 模板资源。它不仅是一个工具包，也是一份关于“如何让 AI agent 辅助完成实证研究流程”的实践记录。

## 开源地址

- [EXIST-D/spss-academic-workflow](https://github.com/EXIST-D/spss-academic-workflow)
