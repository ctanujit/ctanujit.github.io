---
layout: page
title: Teaching
permalink: /teaching/
redirect_from:
  - /teaching.html
---

{% assign teaching = site.data.teaching %}
<section class="teaching-page" aria-labelledby="teaching-heading">
  <header class="teaching-hero">
    <div class="teaching-hero-copy">
      <h1 id="teaching-heading">{{ teaching.hero.title }}</h1>
      <p class="teaching-hero-lead">{{ teaching.hero.lead }}</p>
    </div>
    <figure class="teaching-hero-art">
      <img src="{{ teaching.hero.image }}" alt="{{ teaching.hero.image_alt }}" loading="eager" decoding="async">
    </figure>
  </header>

  <section class="teaching-featured" aria-labelledby="featured-courses-heading">
    <div class="teaching-section-head">
      <h2 id="featured-courses-heading">Featured Courses</h2>
      <span aria-hidden="true"></span>
    </div>

    <div class="teaching-featured-grid">
      {% for course in teaching.featured_courses %}
      <article class="teaching-featured-card teaching-featured-card--{{ course.visual_class }}">
        <div class="teaching-featured-visual">
          <span class="teaching-featured-badge">{{ course.badge }}</span>
          <img src="{{ course.image }}" alt="{{ course.image_alt }}" loading="lazy" decoding="async">
        </div>
        <div class="teaching-featured-body">
          <h3>{{ course.title }}</h3>
          <p class="teaching-featured-meta">{{ course.meta }}</p>
          <p class="teaching-featured-description">{{ course.description }}</p>
          <a class="teaching-material-button" href="{{ course.url }}" target="_blank" rel="noopener noreferrer">Course Material</a>
        </div>
      </article>
      {% endfor %}
    </div>
  </section>

  <div class="teaching-existing-content">
    {% for section in teaching.sections %}
    <h2>{{ section.title }}</h2>
      {% for group in section.groups %}
      <h3>{{ group.title }}</h3>
      <div class="course-board teaching-course-board">
        {% for course in group.courses %}
        <a class="course-card teaching-course-card tone-{{ course.tone | default: 'blue' }}" href="{{ course.url }}" target="_blank" rel="noopener noreferrer">
          <p class="kicker">Course materials on GitHub</p>
          <h2>{{ course.title }}</h2>
          <p>{{ course.meta }}</p>
          <span class="teaching-card-link">Course Material</span>
        </a>
        {% endfor %}
      </div>
      {% endfor %}
    {% endfor %}

    <h2>Tutorials / Short Courses</h2>
    <ul class="workshop-list teaching-short-courses">
      {% for item in teaching.tutorials %}
      <li>
        <p class="kicker">{{ item.date }}</p>
        <a href="{{ item.url }}" target="_blank" rel="noopener noreferrer">{{ item.title }}</a>
        <span>{{ item.detail }}</span>
      </li>
      {% endfor %}
    </ul>

    <h2>{{ teaching.lecture_notes.title }}</h2>
    <p>{{ teaching.lecture_notes.text }}</p>
    <p class="meta">{{ teaching.lecture_notes.note }}</p>
    <p><a class="btn" href="{{ teaching.lecture_notes.url }}" target="_blank" rel="noopener noreferrer">Lecture notes on GitHub</a></p>
  </div>
</section>

<style>
.prose:has(.teaching-page) > h1:first-child { display: none; }
.prose:has(.teaching-page) { padding-top: 0; }
.teaching-page { margin: 0 0 3.5rem; }

.teaching-hero {
  position: relative;
  min-height: 21.75rem;
  margin: 0 0 2.45rem;
  overflow: hidden;
  isolation: isolate;
  background:
    radial-gradient(circle at 79% 24%, rgba(84,164,197,.08), transparent 24%),
    radial-gradient(circle at 66% 78%, rgba(218,116,70,.045), transparent 22%),
    var(--paper);
}
/* The artwork spans the hero rather than beginning as a separate right-hand rectangle. */
.teaching-hero::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  background:
    linear-gradient(90deg,
      var(--paper) 0%,
      rgba(246,243,238,.99) 23%,
      rgba(246,243,238,.92) 34%,
      rgba(246,243,238,.62) 43%,
      rgba(246,243,238,.18) 57%,
      rgba(246,243,238,0) 72%),
    linear-gradient(180deg,
      var(--paper) 0%,
      rgba(246,243,238,0) 8%,
      rgba(246,243,238,0) 88%,
      var(--paper) 100%);
}
.teaching-hero-copy {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 5;
  width: min(44%, 35rem);
  min-height: 21.75rem;
  padding: 2.65rem 0 2.55rem;
}
.teaching-eyebrow {
  margin: 0 0 .65rem;
  color: var(--terracotta);
  font-family: system-ui, "Segoe UI", sans-serif;
  font-size: .76rem;
  font-weight: 750;
  letter-spacing: .16em;
}
.teaching-hero h1 {
  margin: 0;
  color: var(--primary-deep);
  font-size: clamp(3.8rem, 7vw, 5.6rem);
  line-height: .98;
  letter-spacing: -.035em;
}
.teaching-hero-lead {
  max-width: 31rem;
  margin: 1.25rem 0 0;
  color: #3f5d73;
  font-size: clamp(1.05rem, 1.55vw, 1.25rem);
  line-height: 1.48;
  text-align: left;
}
.teaching-hero-art {
  position: absolute;
  z-index: 1;
  top: -1.8rem;
  right: -1.2rem;
  bottom: -2.2rem;
  left: 18%;
  margin: 0;
  overflow: hidden;
  -webkit-mask-image: linear-gradient(90deg, transparent 0%, rgba(0,0,0,.10) 8%, rgba(0,0,0,.46) 22%, rgba(0,0,0,.82) 38%, #000 52%, #000 100%);
  mask-image: linear-gradient(90deg, transparent 0%, rgba(0,0,0,.10) 8%, rgba(0,0,0,.46) 22%, rgba(0,0,0,.82) 38%, #000 52%, #000 100%);
}
.teaching-hero-art::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  background:
    linear-gradient(180deg, rgba(246,243,238,.64) 0%, rgba(246,243,238,0) 16%, rgba(246,243,238,0) 78%, rgba(246,243,238,.78) 100%),
    linear-gradient(90deg, rgba(246,243,238,.38) 0%, rgba(246,243,238,.05) 35%, rgba(246,243,238,0) 58%);
}
.teaching-hero-art img {
  position: absolute;
  inset: -3% -8% -3% 6%;
  width: 102%;
  height: 108%;
  max-width: none;
  object-fit: contain;
  object-position: 63% 44%;
  opacity: .88;
  mix-blend-mode: multiply;
  filter: saturate(.80) contrast(.94) brightness(1.07);
  transform: translateX(13%) scale(.95);
  transform-origin: center center;
}

.teaching-featured { margin: 0 0 2.7rem; }
.teaching-section-head { display:flex; align-items:center; gap:1.15rem; margin-bottom:1.15rem; }
.teaching-section-head h2 {
  margin:0;
  white-space:nowrap;
  color:var(--primary-deep);
  font-size:clamp(1.85rem,3.1vw,2.55rem);
}
.teaching-section-head span {
  height:1px;
  flex:1;
  background:linear-gradient(90deg,var(--terracotta) 0 4.2rem,var(--line) 4.2rem 100%);
}
.teaching-featured-grid { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:1.35rem; }
.teaching-featured-card {
  display:flex;
  flex-direction:column;
  min-width:0;
  overflow:hidden;
  border:1px solid #d9dedf;
  border-radius:.8rem;
  background:#fff;
  box-shadow:0 10px 28px rgba(31,54,84,.055);
  transition:transform .18s ease,border-color .18s ease,box-shadow .18s ease;
}
.teaching-featured-card:hover,
.teaching-featured-card:focus-within {
  transform:translateY(-2px);
  border-color:#c9d4da;
  box-shadow:0 13px 30px rgba(31,54,84,.075);
}
.teaching-featured-visual {
  position:relative;
  display:grid;
  place-items:center;
  height:12.2rem;
  overflow:hidden;
  background:#f6fafb;
}
.teaching-featured-visual::before,
.teaching-featured-visual::after { content:""; position:absolute; pointer-events:none; }
.teaching-featured-visual::before {
  width:10rem; height:10rem; right:-3rem; top:-4rem;
  border-radius:50%; background:rgba(99,174,200,.10);
}
.teaching-featured-visual::after {
  width:8rem; height:8rem; left:-2.5rem; bottom:-4rem;
  border-radius:50%; background:rgba(225,111,64,.07);
}
.teaching-featured-badge {
  position:absolute;
  z-index:3;
  left:.9rem;
  top:.85rem;
  padding:.28rem .7rem;
  border-radius:999px;
  background:rgba(253,237,229,.95);
  color:#b74b25;
  font-family:system-ui,"Segoe UI",sans-serif;
  font-size:.63rem;
  font-weight:750;
  letter-spacing:.06em;
  text-transform:uppercase;
}
.teaching-featured-visual img { position:relative; z-index:2; max-width:100%; max-height:100%; display:block; }
.teaching-featured-card--forecasting .teaching-featured-visual { background:#fbfcfb; }
.teaching-featured-card--forecasting .teaching-featured-visual img { width:100%; height:100%; object-fit:cover; object-position:center; }

/* Authentic MATH 370 artwork: keep the original course asset and add only a quiet analytical backdrop. */
.teaching-featured-card--machine-learning .teaching-featured-visual {
  background:
    linear-gradient(rgba(50,112,153,.055) 1px, transparent 1px),
    linear-gradient(90deg, rgba(50,112,153,.055) 1px, transparent 1px),
    radial-gradient(circle at 75% 25%, rgba(80,163,192,.14), transparent 31%),
    #f8fbfc;
  background-size:28px 28px,28px 28px,auto,auto;
}
.teaching-featured-card--machine-learning .teaching-featured-visual img {
  width:72%;
  max-height:78%;
  object-fit:contain;
  filter:drop-shadow(0 8px 10px rgba(31,54,84,.07));
}
/* MATH 260 uses the supplied multivariate illustration, cropped to remove the unrelated caption. */
.teaching-featured-card--multivariate .teaching-featured-visual {
  padding:2.6rem .8rem .45rem;
  background:linear-gradient(135deg,#f6f9fb 0%,#fffaf5 100%);
}
.teaching-featured-card--multivariate .teaching-featured-visual img {
  width:94%;
  height:100%;
  object-fit:contain;
  filter:contrast(.95) opacity(.88);
}
.teaching-featured-body { display:flex; flex-direction:column; flex:1; padding:1.05rem 1.15rem 1.15rem; }
.teaching-featured-body h3 {
  margin:0;
  color:var(--primary-deep);
  font-size:clamp(1.22rem,1.7vw,1.48rem);
  line-height:1.17;
}
.teaching-featured-meta { margin:.45rem 0 0; color:#376d91; font-size:.94rem; }
.teaching-featured-description { margin:.48rem 0 1rem; color:#567184; font-size:.92rem; line-height:1.42; }
.teaching-material-button {
  display:inline-flex;
  align-items:center;
  gap:.48rem;
  width:fit-content;
  margin-top:auto;
  padding:.5rem .78rem;
  border:1px solid #bbd0de;
  border-radius:.55rem;
  background:#fff;
  color:var(--primary-deep);
  font-family:system-ui,"Segoe UI",sans-serif;
  font-size:.78rem;
  font-weight:650;
  text-decoration:none;
}
.teaching-material-button:hover,
.teaching-material-button:focus-visible { border-color:var(--primary); color:var(--primary); }

/* Everything below Featured Courses deliberately retains the current Teaching-page structure. */
.teaching-existing-content { margin-top:.4rem; }
.teaching-course-board { margin-top:.7rem; margin-bottom:2rem; }
.teaching-course-card {
  display:flex;
  flex-direction:column;
  min-height:10.75rem;
  color:var(--ink);
  text-decoration:none;
  transition:transform .18s ease,border-color .18s ease,box-shadow .18s ease;
}
.teaching-course-card:hover,
.teaching-course-card:focus-visible {
  color:var(--ink);
  transform:translateY(-2px);
  border-color:#cfd9df;
  box-shadow:0 10px 24px rgba(31,54,84,.07);
}
.teaching-course-card h2 { color:var(--primary-deep); }
.teaching-course-card .kicker { color:var(--muted); }
.teaching-card-link {
  margin-top:auto;
  padding-top:.7rem;
  color:var(--color-link);
  font-size:.88rem;
  font-weight:650;
}
.teaching-short-courses li { padding-block:.9rem; }
.teaching-short-courses .kicker { margin:0; color:var(--terracotta); }
.teaching-short-courses li > a { font-size:1.05rem; }

@media (max-width: 1100px) {
  .teaching-hero-copy { width: min(48%, 30rem); }
  .teaching-hero-art { left: 21%; right: -5rem; }
  .teaching-featured-grid { grid-template-columns:repeat(2,minmax(0,1fr)); }
}
@media (max-width: 780px) {
  .teaching-hero { min-height: 31rem; margin-bottom: 2rem; }
  .teaching-hero::before {
    background:
      linear-gradient(180deg, var(--paper) 0%, rgba(246,243,238,.97) 34%, rgba(246,243,238,.45) 52%, rgba(246,243,238,.04) 67%, var(--paper) 100%);
  }
  .teaching-hero-copy { width:100%; min-height:0; padding:2rem 0 1.2rem; }
  .teaching-hero-art {
    top: 9rem;
    right: -1.4rem;
    bottom: -1.8rem;
    left: -1.4rem;
    -webkit-mask-image: linear-gradient(180deg, transparent 0%, rgba(0,0,0,.52) 12%, #000 30%, #000 78%, transparent 100%);
    mask-image: linear-gradient(180deg, transparent 0%, rgba(0,0,0,.52) 12%, #000 30%, #000 78%, transparent 100%);
  }
  .teaching-hero-art img { inset:-2% -3% -3% -1%; width:100%; height:106%; object-position:56% 36%; opacity:.78; transform:scale(.95); }
  .teaching-featured-grid { grid-template-columns:1fr; }
  .teaching-featured-visual { height:13.5rem; }
  .teaching-course-card { min-height:0; }
}
@media (max-width: 520px) {
  .teaching-hero h1 { font-size:3.6rem; }
  .teaching-section-head { gap:.8rem; }
  .teaching-section-head span { background:var(--line); }
}
</style>
