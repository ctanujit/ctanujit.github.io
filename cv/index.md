---
layout: default
title: Curriculum Vitae
permalink: /cv/
redirect_from:
  - /cv.html
---

<link rel="stylesheet" href="{{ '/assets/css/cv-refresh.css' | relative_url }}?v={{ site.time | date: '%Y%m%d%H%M%S' }}">

{% assign cv = site.data.tanujit_cv %}
{% assign media_photo = cv.profile.media_photo | relative_url %}
{% assign permission_text = cv.bio.permission | replace: '{MEDIA_PHOTO}', media_photo %}

<main class="cv-page">

  <header class="cv-hero">
    <div class="cv-hero-photo">
      <a href="{{ cv.profile.media_photo | relative_url }}" target="_blank" rel="noopener">
        <img src="{{ cv.profile.photo | relative_url }}"
             alt="{{ cv.profile.photo_alt }}">
      </a>
    </div>

<div class="cv-hero-copy">
  <h1>{{ cv.profile.headline }}</h1>
  <p class="cv-hero-summary">
    {{ cv.profile.hero_summary }}
  </p>

  <div class="cv-hero-actions">

    {% if cv.profile.show_cv_download %}
      <div class="cv-download-menu">
        <button
          class="cv-btn cv-btn-primary cv-download-trigger"
          type="button"
          aria-expanded="false"
          aria-haspopup="true">
          Download CV
        </button>

        <div class="cv-download-options">
          <a
            href="{{ cv.profile.short_cv_pdf | relative_url }}"
            download>
            <strong>Short CV</strong>
          </a>

          <a
            href="{{ cv.profile.full_cv_pdf | relative_url }}"
            download>
            <strong>Full CV</strong>
          </a>
        </div>
      </div>
    {% endif %}


    <a
      class="cv-btn cv-btn-secondary"
      href="{{ cv.profile.google_scholar }}"
      target="_blank"
      rel="noopener noreferrer">
      Google Scholar →
    </a>

  </div>
</div>
</header>

  <nav class="cv-anchor-nav" aria-label="CV sections">
    {% for item in cv.nav %}
      <a href="#{{ item.anchor }}">{{ item.label }}</a>
    {% endfor %}
  </nav>

  <section class="cv-section cv-bio" id="bio">
    <h2>Short Bio</h2>

    <div class="cv-bio-card">
      <div class="cv-bio-text">
        <p class="cv-media-permission">{{ permission_text | markdownify }}</p>
        <div class="cv-bio-copy">{{ cv.bio.text | markdownify }}</div>
      </div>

      <a class="cv-bio-photo"
         href="{{ cv.profile.media_photo | relative_url }}"
         target="_blank"
         rel="noopener"
         aria-label="Open full-size Tanujit Chakraborty photo">
        <img src="{{ cv.profile.photo | relative_url }}"
             alt="{{ cv.profile.photo_alt }}">
        <span>Open full-size photo →</span>
      </a>
    </div>
  </section>

  {% for section in cv.sections %}
    <section class="cv-section cv-section--{{ section.id }}" id="{{ section.id }}">
      <h2>{{ section.title }}</h2>

      <div class="cv-section-card">
        {% for entry in section.entries %}
          {% include cv-entry.html entry=entry %}
        {% endfor %}

        {% if section.id == "academic-service" %}
          <div class="cv-reviewing">
            <div class="cv-reviewing-block">
              <h3>Reviewer (Journals)</h3>
              <p>{{ cv.reviewing.journals | join: ', ' }}.</p>
            </div>

            <div class="cv-reviewing-block">
              <h3>Reviewer (Conferences)</h3>
              <p>{{ cv.reviewing.conferences | join: ', ' }}.</p>
            </div>

            <div class="cv-reviewing-block">
              <h3>Thesis reviewer</h3>
              <p>{{ cv.reviewing.thesis_reviewer | join: ', ' }}.</p>
            </div>
          </div>
        {% endif %}
      </div>
    </section>
  {% endfor %}

</main>
<script>
document.addEventListener('DOMContentLoaded', function () {
  const menu = document.querySelector('.cv-download-menu');
  const trigger = document.querySelector('.cv-download-trigger');

  if (!menu || !trigger) return;

  trigger.addEventListener('click', function (event) {
    event.stopPropagation();

    const open = menu.classList.toggle('is-open');
    trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  document.addEventListener('click', function () {
    menu.classList.remove('is-open');
    trigger.setAttribute('aria-expanded', 'false');
  });
});
</script>
