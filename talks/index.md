---
layout: default
collection: talks
title: Talks
permalink: /talks/
redirect_from:
  - /talks.html
hero:
  title: Talks
  subtitle: Invited and plenary talks on statistical learning, forecasting, AI and data science.
  image: /assets/images/talks/talks-hero-speaker.png
  image_alt: Tanujit Chakraborty delivering an academic presentation
filters:
  - id: plenary
    label: Plenary / Keynote Talks
  - id: invited
    label: Invited Talks
---

<link rel="stylesheet" href="{{ '/assets/css/talks-refresh.css' | relative_url }}?v={{ site.time | date: '%Y%m%d%H%M%S' }}">

<article class="prose wrap talks-article">
  {% include talks-list.html %}
</article>

<script src="{{ '/assets/js/talks.js' | relative_url }}?v={{ site.time | date: '%Y%m%d%H%M%S' }}" defer></script>
