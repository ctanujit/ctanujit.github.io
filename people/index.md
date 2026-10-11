---
layout: default
title: People
permalink: /people/
redirect_from:
  - /members.html
---
<link rel="stylesheet" href="{{ '/assets/css/foreml-refresh.css' | relative_url }}?v={{ site.time | date: '%Y%m%d%H%M%S' }}">

<main class="foreml-page foreml-people-page">
  <header class="foreml-simple-hero">
    <h1>People</h1>
    <p>Researchers and students working across forecasting, statistical machine learning and real-world applications.</p>
  </header>

  <figure class="foreml-people-group">
    <img src="{{ site.data.foreml.group_photo.src | relative_url }}" alt="{{ site.data.foreml.group_photo.alt }}" loading="eager" decoding="async">
    {% if site.data.foreml.group_photo.caption %}<figcaption>{{ site.data.foreml.group_photo.caption }}</figcaption>{% endif %}
  </figure>

  <div class="foreml-people-page">
  {% include people-list.html %}
</div>
</main>
