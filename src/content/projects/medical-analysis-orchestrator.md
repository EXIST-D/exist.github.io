---
title: Medical Analysis Orchestrator Skill
description: 一个面向 Codex 及兼容 Agent 的医学数据分析编排 Skill，以确认门控、R-first 执行和可审计交付物组织完整分析流程。
period: 2026.07 - 至今
stack:
  - Codex Skill
  - Medical Statistics
  - R
  - Python
  - Reproducible Research
featured: true
order: 0
role: 独立设计与维护
outcome: 将医学数据分析组织为可检查、可确认、可复现、可审计的流程，并输出可直接用于研究交付的统计表、图形和报告。
repo: https://github.com/EXIST-D/medical-analysis-orchestrator
---

## 项目简介

`medical-analysis-orchestrator` 是一个面向医学、临床与问卷数据分析场景的通用 Agent Skill。它不把某一种模型或一份固定统计脚本设为默认答案，而是将分析任务组织为一条明确的工作链：

```text
inspect → recommend → confirm → execute → report
```

Skill 首先以只读方式检查数据文件、变量类型、缺失与重复情况，并识别可能的研究角色；随后结合研究问题、研究设计和数据条件推荐分析方案。只有在使用者确认结局、分组、参照组、清洗规则与统计方法后，才会调用 R 执行分析。

## 为什么做这个项目

医学统计分析不仅是“跑出一个结果”。主要结局、事件编码、协变量、缺失处理、异常值和量表计分都会影响结论；如果这些决策由 Agent 擅自完成，分析即使看起来流畅，也难以复核和复现。

这个项目将关键决策设计为确认门，并为同一次运行保存输入哈希、方案指纹、R 与包版本、随机种子、模型对象和输出文件清单。它希望把 Agent 的协助限定在透明、可追溯且由研究者掌控的边界内。

## 核心能力

- 以只读模式检查 CSV、Excel、SPSS、Stata、SAS、JSON 等常见数据文件，并生成数据清单、变量字典、质量报告和清洗候选。
- 根据研究问题和数据结构推荐描述性分析、组间比较、相关、回归、心理测量、纵向分析及其他可行方法，同时说明假设、限制与替代方案。
- 在确认后执行描述性统计、组间比较、相关、线性与 Logistic 回归、信效度、因子分析、混合效应模型、缺失数据处理、生存分析、倾向评分、结构方程、网络分析和贝叶斯分析等模块。
- 使用 R 作为统计计算核心；模块独立注册依赖与参数，缺失包只安装到项目级 Library，不修改系统 R 环境。
- 输出机器可读 CSV、三线表 XLSX、R 图形、Source Data、模型对象、运行记录、依赖版本清单、manifest 和中文 Word 报告。

## 安全与研究边界

原始数据始终保持只读；Skill 不会为了显著性或预期方向修改数据，也不会自动删除病例、异常值或重复值，更不会擅自改变量表计分、主要结局、分组或多重比较策略。

当数据存在小样本、稀少事件、严重缺失、完全分离、不收敛或关键假设失败等问题时，流程会给出警告或拒绝不可靠的复杂模型。它不构成医疗、诊断或治疗建议，数据使用仍须由研究者遵守伦理审批、隐私保护与适用法规。

## 项目状态

当前版本为 `0.0.6`，处于 Beta / 技术预览阶段。项目以 MIT License 开源，并提供中英文 README、模块化 Skill 文件、参考文档、脚本与报告模板。

## 开源地址

- [EXIST-D/medical-analysis-orchestrator](https://github.com/EXIST-D/medical-analysis-orchestrator)
