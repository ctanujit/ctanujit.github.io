---
layout: page
title: Research
permalink: /research/
redirect_from:
  - /research-interests.html
---

{% assign research = site.data.research %}
<section class="research-page" aria-labelledby="research-title">
  <header class="research-intro">
    <p class="research-eyebrow">RESEARCH</p>
    <h1 id="research-title">{{ research.title }}</h1>
    <p class="research-philosophy">{{ research.intro | replace: 'application-driven theory', '<em>application-driven theory</em>' }}</p>
  </header>

  <section class="research-themes" aria-labelledby="research-themes-heading">
    <div class="research-section-head">
      <h2 id="research-themes-heading">Research Themes</h2>
      <span aria-hidden="true"></span>
    </div>

    <div class="research-theme-grid">
      {% for theme in research.themes %}
      <a class="research-theme-card"
         href="/publications/?area={{ theme.publication_area | url_encode }}"
         aria-label="View publications in {{ theme.title }}">
        <figure class="research-theme-image">
          <img src="{{ theme.image }}" alt="{{ theme.alt }}" loading="{% if forloop.first %}eager{% else %}lazy{% endif %}" decoding="async">
        </figure>
        <div class="research-theme-copy">
          <h3>{{ theme.title }}</h3>
          <p>{{ theme.description }}</p>
        </div>
      </a>
      {% endfor %}
    </div>
  </section>

  <section class="research-explore" aria-labelledby="explore-research-heading">
    <div class="research-section-head">
      <h2 id="explore-research-heading">Explore Research</h2>
      <span aria-hidden="true"></span>
    </div>
    <nav class="research-explore-links" aria-label="Explore research">
      {% for item in research.explore %}
      <a href="{{ item.url }}"><span>{{ item.label }}</span><span class="research-link-arrow" aria-hidden="true">→</span></a>
      {% endfor %}
    </nav>
  </section>
</section>

<style>
.prose:has(.research-page) > h1:first-child { display: none; }
.prose:has(.research-page) { padding-top: 0; }

.research-page {
  width: min(82rem, 100%);
  margin: 0 auto 3.8rem;
}

.research-intro {
  padding: clamp(2.7rem, 5.2vw, 4.45rem) 0 clamp(2.2rem, 3.8vw, 3.2rem);
  border-bottom: 1px solid var(--line);
}
.research-eyebrow {
  margin: 0 0 .62rem;
  color: var(--terracotta);
  font-family: system-ui, "Segoe UI", sans-serif;
  font-size: .76rem;
  font-weight: 750;
  letter-spacing: .16em;
}
.research-intro h1 {
  margin: 0;
  color: var(--primary-deep);
  font-size: clamp(2.55rem, 3.55vw, 3.2rem);
  line-height: 1.04;
  letter-spacing: -.035em;
  white-space: nowrap;
}
.research-philosophy {
  max-width: 65rem;
  margin: 1.18rem 0 0;
  color: #405c70;
  font-size: clamp(1.02rem, 1.32vw, 1.15rem);
  line-height: 1.6;
  text-align: left;
}
.research-philosophy em { color: var(--primary-deep); }

.research-themes { padding-top: clamp(2.25rem, 4.2vw, 3.3rem); }
.research-section-head {
  display: flex;
  align-items: center;
  gap: 1.05rem;
  margin: 0 0 1.35rem;
}
.research-section-head h2 {
  flex: none;
  margin: 0;
  padding: 0 0 0 .62rem;
  border-left: 4px solid var(--terracotta);
  color: var(--primary-deep);
  font-size: clamp(1.75rem, 2.45vw, 2.2rem);
  line-height: 1.15;
}
.research-section-head span {
  display: block;
  height: 1px;
  flex: 1;
  background: linear-gradient(90deg, var(--terracotta) 0 3.5rem, var(--line) 3.5rem 100%);
}

.research-theme-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.35rem 1.45rem;
}
.research-theme-card {
  display: block;
  min-width: 0;
  overflow: hidden;
  border: 1px solid rgba(205, 202, 196, .9);
  border-radius: .38rem;
  background: rgba(255, 252, 248, .72);
  color: inherit;
  text-decoration: none;
  transition: transform .16s ease, border-color .16s ease, box-shadow .16s ease, background .16s ease;
}
.research-theme-card:hover,
.research-theme-card:focus-visible {
  color: inherit;
  border-color: #c7b9ab;
  background: #fffdfa;
  transform: translateY(-2px);
  box-shadow: 0 8px 22px rgba(22, 54, 84, .08);
  outline: none;
}
.research-theme-card:focus-visible {
  box-shadow: 0 0 0 3px rgba(31, 78, 121, .12), 0 8px 22px rgba(22, 54, 84, .08);
}
.research-theme-image {
  display: block;
  aspect-ratio: 11 / 6;
  margin: 0;
  overflow: hidden;
  background: #f7f8f8;
  border-bottom: 1px solid rgba(222, 218, 211, .88);
}
.research-theme-image img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
.research-theme-copy { padding: 1rem 1.08rem 1.12rem; }
.research-theme-copy h3 {
  margin: 0;
  color: var(--primary-deep);
  font-size: clamp(1.22rem, 1.65vw, 1.45rem);
  line-height: 1.18;
}
.research-theme-copy p {
  margin: .5rem 0 0;
  color: #4f6677;
  font-size: .96rem;
  line-height: 1.5;
  text-align: left;
}

.research-explore { padding-top: clamp(2.5rem, 4.5vw, 3.5rem); }
.research-explore-links {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: .85rem;
}
.research-explore-links a {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 3.15rem;
  padding: .72rem .95rem;
  border: 1px solid var(--line);
  background: rgba(255, 252, 248, .7);
  color: var(--primary-deep);
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  transition: border-color .15s ease, color .15s ease, background .15s ease;
}
.research-link-arrow {
  color: var(--terracotta);
  font-family: system-ui, sans-serif;
  font-weight: 500;
}
.research-explore-links a:hover,
.research-explore-links a:focus-visible {
  border-color: #c7b9ab;
  background: #fffdfa;
  color: var(--terracotta);
  outline: none;
}
.research-explore-links a:focus-visible { box-shadow: 0 0 0 3px rgba(31,78,121,.12); }

@media (max-width: 1180px) {
  .research-intro h1 { white-space: normal; max-width: 58rem; }
}
@media (max-width: 760px) {
  .research-page { width: 100%; }
  .research-intro { padding-top: 2.1rem; }
  .research-intro h1 { font-size: clamp(2.15rem, 9vw, 2.9rem); }
  .research-philosophy { line-height: 1.56; }
  .research-theme-grid { grid-template-columns: 1fr; gap: 1.2rem; }
  .research-theme-image { aspect-ratio: 11 / 6; }
  .research-explore-links { grid-template-columns: 1fr; }
}
</style>
