---
layout: default
title: Media
permalink: /media/
redirect_from:
  - /media.html
description: Media coverage, paintings, poems and selected images from Tanujit Chakraborty's personal archive.
---

<link rel="stylesheet" href="{{ '/assets/css/media.css' | relative_url }}?v={{ site.time | date: '%Y%m%d%H%M%S' }}">

{% assign media = site.data.media %}
<article class="media-page">

  <header class="media-hero" aria-labelledby="media-page-title">
    <div class="media-hero-copy">
      <h1 id="media-page-title">{{ media.hero.title }}</h1>
      <p class="media-hero-lead">{{ media.hero.subtitle }}</p>
    </div>
    <figure class="media-hero-art">
      <img src="{{ media.hero.image | relative_url }}" alt="{{ media.hero.image_alt }}" loading="eager" decoding="async">
    </figure>
  </header>

  <section class="media-section media-coverage" aria-labelledby="media-coverage-heading">
    <div class="media-section-heading">
      <div>
        <h2 id="media-coverage-heading">Media Coverage</h2>
        <p>Selected interviews, articles and features.</p>
      </div>
    </div>

    <div class="media-coverage-grid">
      {% for item in media.coverage %}
      <article class="media-coverage-card">
        <a class="media-coverage-image" href="{{ item.url }}" target="_blank" rel="noopener noreferrer" aria-label="{{ item.title }} — {{ item.source }}">
          <img src="{{ item.image | relative_url }}" alt="{{ item.image_alt }}" loading="lazy" decoding="async">
        </a>
        <div class="media-coverage-copy">
          <p class="media-source">{{ item.source }}</p>
          <h3><a href="{{ item.url }}" target="_blank" rel="noopener noreferrer">{{ item.title }}</a></h3>
          <a class="media-action" href="{{ item.url }}" target="_blank" rel="noopener noreferrer">{{ item.action }}</a>
        </div>
      </article>
      {% endfor %}
    </div>
  </section>

  <section class="media-section personal-corner" aria-labelledby="personal-corner-heading">
    <div class="media-section-heading">
      <div>
        <h2 id="personal-corner-heading">Personal Corner</h2>
        <p>Paintings, poems and moments from the personal archive.</p>
      </div>
    </div>

    <div class="personal-grid">
      {% for gallery in media.personal %}
      <section class="personal-card" data-media-gallery>
        <div class="personal-card-head">
          <div>
            <h3>{{ gallery.title }}</h3>
            <p>{{ gallery.description }}</p>
          </div>
          {% if gallery.id == "paintings" and gallery.items.size > 6 %}
          <button class="personal-toggle" type="button" aria-expanded="false">
            <span class="toggle-label">View all</span>
          </button>
          {% endif %}
        </div>

        <div class="personal-preview" aria-label="{{ gallery.title }} preview">
          {% for image in gallery.items limit:6 %}
          <a href="{{ image.src | relative_url }}" class="personal-preview-item">
            <img src="{{ image.src | relative_url }}" alt="{{ image.alt }}" loading="lazy" decoding="async">
          </a>
          {% endfor %}
        </div>

        {% if gallery.id == "paintings" and gallery.items.size > 6 %}
        <div class="personal-extra" hidden>
          {% for image in gallery.items offset:6 %}
          <a href="{{ image.src | relative_url }}">
            <img src="{{ image.src | relative_url }}" alt="{{ image.alt }}" loading="lazy" decoding="async">
          </a>
          {% endfor %}
        </div>
        {% endif %}
      </section>
      {% endfor %}
    </div>
  </section>

</article>

<script src="{{ '/assets/js/media.js' | relative_url }}?v={{ site.time | date: '%Y%m%d%H%M%S' }}" defer></script>
