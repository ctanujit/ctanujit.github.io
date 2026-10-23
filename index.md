---
layout: default
title: Tanujit Chakraborty
permalink: /
---

<link rel="stylesheet" href="{{ '/assets/css/home-refresh.css' | relative_url }}?v={{ site.time | date: '%Y%m%d%H%M%S' }}">

{% assign home = site.data.home %}

<main class="home-redesign">
  <div class="home-shell">
    {% include home-sidebar.html %}

    <div class="home-main">

      <section class="home-section home-introduction" id="introduction">
        <h2>Introduction</h2>
        <div class="home-introduction-copy">{{ home.introduction | markdownify }}</div>
      </section>

      <section class="home-section" id="affiliations">
        <h2>Affiliations</h2>
        <div class="home-affiliations-grid">
          {% for item in home.affiliations %}
          {% if item.url and item.url != "" %}
            <a class="home-affiliation-card" href="{{ item.url }}" target="_blank" rel="noopener noreferrer">
          {% else %}
            <article class="home-affiliation-card">
          {% endif %}
              <div class="home-affiliation-logo-wrap">
                <img class="home-affiliation-logo"
                     src="{{ item.logo | relative_url }}"
                     alt="{{ item.logo_alt }}"
                     loading="lazy"
                     decoding="async">
              </div>
              <div class="home-affiliation-copy">
                <h3>{{ item.title }}</h3>
                <p>{{ item.subtitle }}</p>
                <strong>{{ item.institution }}</strong>
                
                {% if item.email and item.email != "" %}
                  <span 
                    class="home-affiliation-email"
                    onclick="event.preventDefault(); event.stopPropagation();"
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <rect x="3" y="5" width="18" height="14" rx="2"></rect>
                      <path d="M3 7l9 6 9-6"></path>
                    </svg>
                    <span class="home-affiliation-email-text">{{ item.email }}</span>
                  </span>
                {% endif %}
              </div>
              {% if item.url and item.url != "" %}
                <span class="home-affiliation-arrow" aria-hidden="true">→</span>
              {% endif %}
          {% if item.url and item.url != "" %}
            </a>
          {% else %}
            </article>
          {% endif %}
          {% endfor %}
        </div>
      </section>

      <section class="home-section" id="education">
        <h2>Education</h2>
        <div class="home-education-list">
          {% for item in home.education %}
            <div class="home-education-row">
              <span class="home-degree">{{ item.degree }}</span>
              <span>{{ item.institution }}</span>
            </div>
          {% endfor %}
        </div>
      </section>

      <section class="home-section" id="research">
        <h2>Research</h2>
        <p class="home-research-copy">{{ home.research_intro }}</p>

        <div class="home-research-grid">
          {% for theme in site.data.research.themes %}
            {% assign area_slug = theme.publication_area | default: theme.title | slugify %}
            <a class="home-research-card"
               href="{{ '/publications/' | relative_url }}?area={{ area_slug | url_encode }}">
              <figure>
                <img src="{{ theme.image | relative_url }}"
                     alt="{{ theme.alt | default: theme.title }}"
                     loading="lazy"
                     decoding="async">
              </figure>
              <div class="home-research-card-copy">
                <span>{{ theme.title }}</span>
                <span aria-hidden="true">→</span>
              </div>
            </a>
          {% endfor %}
        </div>

        <a class="home-inline-link" href="{{ '/research/' | relative_url }}">Research interests →</a>
      </section>

      <section class="home-section" id="latest-news">
        <div class="home-section-heading-row">
          <h2>Latest News</h2>
        </div>

        <div class="home-news-list" data-home-news>
          {% assign news_source = site.data.news | default: home.news %}
          {% for item in news_source %}
            <article class="home-news-row{% if item.tone %} home-news-row--{{ item.tone }}{% endif %}{% if forloop.index > 10 %} home-news-extra{% endif %}">
              <time>{{ item.date }}</time>
              <div class="home-news-text">{{ item.text | default: item.title | markdownify }}</div>
            </article>
          {% endfor %}
        </div>

        {% assign news_source = site.data.news | default: home.news %}
        {% if news_source.size > 10 %}
          <button class="home-news-toggle" type="button" data-home-news-toggle>
            Show all news
          </button>
        {% endif %}
      </section>

      <section class="home-section" id="recent-highlights">
        <h2>Recent Highlights</h2>
        <div class="home-highlight-grid">
          {% for item in home.highlights %}
            <figure class="home-highlight">
              <img src="{{ item.image | relative_url }}"
                   alt="{{ item.alt }}"
                   loading="lazy"
                   decoding="async">
            </figure>
          {% endfor %}
        </div>
      </section>

    </div>
  </div>
</main>

<script>
(function () {
  const button = document.querySelector('[data-home-news-toggle]');
  const list = document.querySelector('[data-home-news]');
  if (!button || !list) return;

  button.addEventListener('click', function () {
    const expanded = list.classList.toggle('is-expanded');
    button.textContent = expanded ? 'Show less news' : 'Show all news';
  });
})();
</script>
