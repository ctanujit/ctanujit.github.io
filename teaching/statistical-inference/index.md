---
layout: page
title: Statistical Inference
permalink: /teaching/statistical-inference/
redirect_from:
  - /si.html
banner:
  src: /assets/images/teaching/statistical-inference.png
  alt: ""
---

<div class="course-head" markdown="1">

{% include img.html image=page.banner class="course-banner" loading="eager" %}

Course: Statistical Inference.

Participants: BSc Mathematics and Data Science.

Institution: Sorbonne University.

Instructor: Dr. Tanujit Chakraborty.

Timeline: September 2022 to December 2022. 60 sessions.

</div>

## Course introduction

The course is a classical advanced course in parametric mathematical statistics. General theory of point estimation is presented, including unbiasedness, consistency, and optimality, with particular attention to maximum likelihood estimation. Confidence intervals and hypothesis testing follow. The course ends with the linear model. Computer labs cover simulation of random variables, by inversion, rejection sampling, and the Box–Muller transform, and Monte Carlo methods in statistics.

## Objectives

- Prove the Glivenko–Cantelli theorem and assess its role in mathematical statistics.
- Determine the laws of order statistics and of functions of order statistics.
- Infer the laws of the main statistics built from a Gaussian random sample, including the chi-squared statistic and the t statistic.
- Articulate dominated statistical models, and unbiased and consistent estimators. Construct minimum-variance unbiased estimators by the Rao–Blackwell / Lehmann–Scheffé procedure, and efficient estimators in the Cramér–Rao sense.
- Prove efficiency properties of maximum likelihood estimators.
- Construct exact and asymptotic confidence intervals, likelihood-ratio tests, and goodness-of-fit tests (chi-squared and Kolmogorov–Smirnov).
- Construct least-squares estimators in the general linear model and prove their efficiency properties.
- Test generalized linear hypotheses on parameters of linear models.
- Represent ANOVA as a linear model and perform inference in these models.
- Computer labs in RStudio.

## Evaluation

1. Capstone project, report and presentation — 50%
2. End-term theory test — 50%

## Textbooks

- Rice, John A. (2006). *Mathematical Statistics and Data Analysis*. Cengage.
- Casella, George, and Roger L. Berger (2002). *Statistical Inference*. Cengage.
- Wasserman, Larry (2004). *All of Statistics*. Springer.

## Papers listed for reading

- [Fair coins tend to land on the same side they started](https://arxiv.org/pdf/2310.04153) (2024)
- [The Many Faces of Information Geometry](https://www.ams.org/journals/notices/202201/rnoti-p36.pdf) (2022)
- [The science of statistics versus data science](https://www.sciencedirect.com/science/article/abs/pii/S0040162521005448) (2021)

Class notes, tutorials, slides, data, and R code: [Course Materials on GitHub](https://github.com/ctanujit/MATH350).

{% if site.data.integrations.si_notes.enabled %}
The MATH350 notes site is included with this course. Remove it by setting `si_notes.enabled` to false in `_data/integrations.yml` and deleting `teaching/statistical-inference/notes`.

[Open the MATH350 notes](/teaching/statistical-inference/notes/index.html)
{% endif %}
