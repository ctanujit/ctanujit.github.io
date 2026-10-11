---
layout: default
title: Apply to ForeML
permalink: /foreml/apply/
redirect_from:
  - /apply-here.html
---

<link rel="stylesheet" href="{{ '/assets/css/foreml-refresh.css' | relative_url }}?v={{ site.time | date: '%Y%m%d%H%M%S' }}">
<link rel="stylesheet" href="{{ '/assets/css/foreml-apply.css' | relative_url }}?v={{ site.time | date: '%Y%m%d%H%M%S' }}">

{% assign foreml = site.data.foreml %}
{% assign apply_data = site.data.foreml_apply %}

<main class="foreml-page foreml-apply-page foreml-apply-redesign">

  <header class="foreml-apply-intro">
    <p class="foreml-apply-kicker">Join our research group</p>
    <h1>Apply to ForeML</h1>
    <p class="foreml-apply-intro-text">{{ foreml.apply.intro }}</p>

    <div class="foreml-apply-hero-actions">
      <a class="foreml-btn foreml-btn-primary" href="#research-areas">Research Areas</a>
      <a class="foreml-btn foreml-btn-secondary" href="{{ '/people/' | relative_url }}">Meet the Team</a>
    </div>
  </header>

  <section class="foreml-apply-step foreml-apply-step-cards" id="research-areas">
    <div class="foreml-step-number">01</div>
    <div class="foreml-apply-step-body">
      <h2>Research Areas</h2>
      <p>We are particularly interested in candidates whose interests align with the lab's research themes.</p>

      <div class="foreml-apply-research-grid">
        {% for theme in site.data.research.themes %}
          {% assign area_slug = theme.publication_area | default: theme.title | slugify %}
          <a class="foreml-apply-research-card"
             href="{{ '/publications/' | relative_url }}?area={{ area_slug | url_encode }}"
             aria-label="View {{ theme.title }} publications">
            <figure>
              <img src="{{ theme.image | relative_url }}" alt="{{ theme.alt | default: theme.title }}" loading="lazy" decoding="async">
            </figure>
            <div class="foreml-apply-research-copy">
              <h3>{{ theme.title }}</h3>
              {% if theme.description %}<p>{{ theme.description }}</p>{% endif %}
              <span aria-hidden="true">→</span>
            </div>
          </a>
        {% endfor %}
      </div>
    </div>
  </section>

  <section class="foreml-apply-step" id="recommended-preparation">
    <div class="foreml-step-number">02</div>
    <div class="foreml-apply-step-body">
      <h2>Recommended Preparation</h2>
      <p>The following books and resources provide a useful mathematical and practical foundation for our research areas.</p>

      <div class="foreml-apply-reading-grid">
        {% for group in apply_data.reading_groups %}
        <article class="foreml-apply-reading-card foreml-apply-reading-card--{{ group.accent }}">
          <header class="foreml-reading-header">
            <div class="foreml-reading-icon" aria-hidden="true">
              {% case group.id %}
                {% when 'statistical-learning' %}
                  <svg viewBox="0 0 32 32"><path d="M6 24V18M11 24V14M16 24V10M21 24V6" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>
                {% when 'deep-learning' %}
                  <svg viewBox="0 0 32 32"><circle cx="16" cy="7" r="3"/><circle cx="8" cy="23" r="3"/><circle cx="24" cy="23" r="3"/><path d="M14 10L9.5 20M18 10l4.5 10" fill="none" stroke="currentColor" stroke-width="2.2"/></svg>
                {% else %}
                  <svg viewBox="0 0 32 32"><path d="M6 24V8M6 24h20M9 19l5-5 4 3 7-8" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
              {% endcase %}
            </div>
            <div>
              <h3>{{ group.heading }}</h3>
              <p>{{ group.description }}</p>
            </div>
          </header>

          <div class="foreml-reading-resources">
            {% for book in group.books %}
            <a class="foreml-reading-resource" href="{{ book.url }}" target="_blank" rel="noopener noreferrer">
              <span class="foreml-book-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24"><path d="M4 5.5c2.3-.7 4.7-.4 7 1.2v12c-2.3-1.6-4.7-1.9-7-1.2zM20 5.5c-2.3-.7-4.7-.4-7 1.2v12c2.3-1.6 4.7-1.9 7-1.2z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>
              </span>
              <span class="foreml-reading-resource-copy">
                <strong>{{ book.label }}</strong>
                <small>{{ book.authors }}</small>
              </span>
              <span class="foreml-reading-arrow" aria-hidden="true">→</span>
            </a>
            {% endfor %}
          </div>
        </article>
        {% endfor %}
      </div>
    </div>
  </section>

  <section class="foreml-apply-step" id="before-contacting">
    <div class="foreml-step-number">03</div>
    <div class="foreml-apply-step-body">
      <h2>Before Contacting Us</h2>
      <p>Please make sure you meet the following guidelines before reaching out.</p>

      <div class="foreml-apply-check-grid">
        {% for item in foreml.apply.guidelines %}
        <article class="foreml-apply-check">
          <span class="foreml-apply-check-icon" aria-hidden="true">✓</span>
          <p>{{ item }}</p>
        </article>
        {% endfor %}
      </div>
    </div>
  </section>

  <section class="foreml-apply-step foreml-apply-final" id="how-to-apply">
    <div class="foreml-step-number">04</div>
    <div class="foreml-apply-step-body">
      <h2>How to Apply</h2>
      <p>
        If you are interested in joining ForeML, please send the relevant application material to
        <a href="mailto:{{ foreml.apply.contact.email }}">{{ foreml.apply.contact.email }}</a>.
      </p>

      <div class="foreml-apply-materials">
        {% for item in apply_data.application_materials %}
        <article class="foreml-apply-material-card">
          <div class="foreml-apply-material-icon" aria-hidden="true">
            {% case item.icon %}
              {% when 'cv' %}
                <svg viewBox="0 0 24 24"><path d="M6 3h8l4 4v14H6zM14 3v5h5M9 12h6M9 16h6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
              {% when 'transcript' %}
                <svg viewBox="0 0 24 24"><rect x="5" y="3" width="14" height="18" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M9 8h6M9 12h6M9 16h3" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
              {% else %}
                <svg viewBox="0 0 24 24"><path d="M5 4h14v16H5zM8 8h8M8 12h8M8 16h5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
            {% endcase %}
          </div>
          <div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.text }}</p>
          </div>
        </article>
        {% endfor %}
      </div>

      <p class="foreml-apply-note">{{ foreml.apply.contact.note }}</p>

      <div class="foreml-apply-final-actions">
        <a class="foreml-btn foreml-btn-primary" href="mailto:{{ foreml.apply.contact.email }}">Contact ForeML</a>
        <a class="foreml-btn foreml-btn-secondary" href="{{ '/people/' | relative_url }}">Meet the Team</a>
      </div>
    </div>
  </section>

</main>
