(function () {
  var rootStyle = window.getComputedStyle(document.documentElement);
  function paint(name, fallback) {
    var value = rootStyle.getPropertyValue(name).trim();
    return value || fallback;
  }
  var colors = {
    tanujit: paint("--color-primary", "#1f4e79"),
    foreml: paint("--color-accent", "#b4532a"),
    other: paint("--color-secondary", "#2c6b5a")
  };

  function clean(name) {
    return String(name)
      .replace(/\*/g, "")
      .replace(/\u200b/g, "")
      .replace(/^[\s,.;]+|[\s,.;]+$/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function identity(token, aliases) {
    var key = clean(token);
    for (var i = 0; i < aliases.length; i++) {
      var row = aliases[i];
      var list = row.aliases || [];
      for (var j = 0; j < list.length; j++) {
        if (clean(list[j]) === key) return row;
      }
    }
    return { canonical_id: key, display: token, exclude_from_collaborators: false };
  }

  function paperLabel(p) {
    if (p.title) {
      var bits = p.authors_display ? p.authors_display + " " : "";
      bits += p.title;
      if (p.venue) bits += ". " + p.venue;
      if (p.year) bits += ". " + p.year;
      return bits;
    }
    return p.citation || p.id;
  }

  function tokenKey(token) {
    var text = clean(token).replace(/\./g, "");
    var comma = text.indexOf(",");
    var surname;
    var initials;
    if (comma >= 0) {
      surname = text.slice(0, comma).trim().toLowerCase();
      initials = text.slice(comma + 1).replace(/[^A-Za-z]/g, "").toLowerCase();
    } else {
      var bits = text.split(/\s+/).filter(Boolean);
      if (bits.length < 2) return null;
      surname = bits[0].toLowerCase();
      initials = bits.slice(1).map(function (part) { return part[0].toLowerCase(); }).join("");
    }
    if (!surname || !initials) return null;
    return { surname: surname, initials: initials };
  }

  function foremlPeople(groups) {
    var people = [];
    (groups || []).forEach(function (group) {
      var named = group.group === "Investigators" || group.group === "Current members" || group.group === "Alumni (PhD/Postdoc)";
      if (!named && group.listed !== false) return;
      (group.people || []).forEach(function (person) {
        var parts = clean(person.name).replace(/\./g, "").split(/\s+/).filter(Boolean);
        if (parts.length < 2) return;
        var surname = parts[parts.length - 1].toLowerCase();
        var initials = parts.slice(0, -1).map(function (part) { return part[0].toLowerCase(); }).join("");
        if (surname === "chakraborty" && initials === "t") return;
        people.push({ surname: surname, initials: initials, name: clean(person.name) });
      });
    });
    return people;
  }

  function matchesForeml(token, label, people) {
    if (people[clean(label)] || people[clean(token)]) return true;
    var keys = [tokenKey(token), tokenKey(label)];
    for (var i = 0; i < keys.length; i++) {
      if (!keys[i]) continue;
      var hits = people.list.filter(function (person) {
        return person.surname === keys[i].surname && person.initials === keys[i].initials;
      });
      if (hits.length === 1) return true;
    }
    return false;
  }

  function buildGraph(pubs, aliases, groups) {
    var roster = foremlPeople(groups);
    var foreml = { list: roster };
    roster.forEach(function (person) { foreml[person.name] = true; });

    var nodes = {};
    var edges = {};
    pubs.forEach(function (paper) {
      var ids = [];
      var seen = {};
      (paper.authors || []).forEach(function (name) {
        var idn = identity(name, aliases);
        var id = idn.canonical_id;
        if (!id || seen[id]) return;
        seen[id] = true;
        var isTanujit = !!idn.exclude_from_collaborators;
        if (!nodes[id]) {
          var label = isTanujit ? "Tanujit Chakraborty" : (idn.display || name);
          var category = "other";
          if (isTanujit) category = "tanujit";
          else if (matchesForeml(name, label, foreml)) category = "foreml";
          nodes[id] = { id: id, label: label, category: category, withTanujit: 0, papers: [], pinned: false };
        }
        nodes[id].papers.push(paper);
        ids.push(id);
      });
      for (var i = 0; i < ids.length; i++) {
        for (var j = i + 1; j < ids.length; j++) {
          var a = ids[i] < ids[j] ? ids[i] : ids[j];
          var b = ids[i] < ids[j] ? ids[j] : ids[i];
          var key = a + "\0" + b;
          if (!edges[key]) edges[key] = { a: a, b: b, w: 0, papers: [] };
          edges[key].w += 1;
          edges[key].papers.push(paper);
        }
      }
    });

    Object.keys(edges).forEach(function (key) {
      var edge = edges[key];
      if (nodes[edge.a] && nodes[edge.a].category === "tanujit" && nodes[edge.b]) nodes[edge.b].withTanujit += edge.w;
      if (nodes[edge.b] && nodes[edge.b].category === "tanujit" && nodes[edge.a]) nodes[edge.a].withTanujit += edge.w;
    });

    var list = Object.keys(nodes).map(function (id) { return nodes[id]; });
    var tanujit = list.filter(function (n) { return n.category === "tanujit"; })[0];
    if (tanujit) tanujit.withTanujit = tanujit.papers.length;
    var n = Math.max(list.length, 1);
    list.forEach(function (node, index) {
      var angle = (Math.PI * 2 * index) / n;
      var radius = node.category === "tanujit" ? 0 : 220 + (index % 7) * 36;
      node.x = Math.cos(angle) * radius;
      node.y = Math.sin(angle) * radius;
      node.vx = 0;
      node.vy = 0;
    });
    return { nodes: nodes, list: list, edges: Object.keys(edges).map(function (key) { return edges[key]; }) };
  }

  function mountNetwork(host, graph, pubCount) {
    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var wrap = document.createElement("div");
    wrap.className = "network-stage";
    wrap.innerHTML =
      '<div class="network-main">' +
        '<div class="net-counts" id="net-counts"></div>' +
        '<div class="network-bar">' +
          '<label>Min collaborations <input id="net-min" type="range" min="1" max="8" value="1"> <span id="net-min-label">1</span></label>' +
          '<button type="button" class="text-button" id="net-freeze">Freeze</button>' +
          '<button type="button" class="text-button" id="net-unpin">Unpin all</button>' +
          '<button type="button" class="text-button" id="net-reset">Reset view</button>' +
          '<label class="net-search">Search <input id="net-search" type="search" placeholder="Name"></label>' +
        '</div>' +
        '<div class="canvas-frame"><canvas id="net-canvas"></canvas><div id="net-tip" class="net-tip" hidden></div></div>' +
        '<p class="legend"><span><i style="background:' + colors.tanujit + '"></i>' + esc(host.getAttribute("data-owner") || "Tanujit Chakraborty") + '</span><span><i style="background:' + colors.foreml + '"></i>ForeML Lab member</span><span><i style="background:' + colors.other + '"></i>External co-author</span></p>' +
        '<p class="net-hint">drag to pin · double-click to unpin · scroll to zoom · click a node or edge for details</p>' +
        '<div id="net-detail" class="network-detail"><p class="meta">Click a node or edge for details.</p></div>' +
      '</div>' +
      '<aside class="collab-side"><h3>Top collaborators</h3><p class="meta">Click a name to focus that researcher.</p><ol id="collab-list"></ol></aside>';
    host.appendChild(wrap);
    var coauthors = graph.list.filter(function (node) { return node.category !== "tanujit"; }).length;
    wrap.querySelector("#net-counts").innerHTML =
      "<p><b>" + coauthors + "</b><span>Co-authors</span></p>" +
      "<p><b>" + graph.edges.length + "</b><span>Collaborations</span></p>" +
      "<p><b>" + pubCount + "</b><span>Publications</span></p>";

    var canvas = wrap.querySelector("#net-canvas");
    var ctx = canvas.getContext("2d");
    var tip = wrap.querySelector("#net-tip");
    var detail = wrap.querySelector("#net-detail");
    var frame = wrap.querySelector(".canvas-frame");
    var panX = 0, panY = 0, zoom = 0.92, frozen = reduced, drag = null, panning = false, last = null;
    var minJoint = 1, query = "", selected = null, hover = null, hoverEdge = null;
    var pointers = {};

    function resize() {
      var rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(320, Math.floor(rect.width * devicePixelRatio));
      canvas.height = Math.max(280, Math.floor(rect.height * devicePixelRatio));
    }
    resize();
    window.addEventListener("resize", resize);

    function visible(node) {
      if (!node) return false;
      if (node.category === "tanujit") return true;
      return node.withTanujit >= minJoint;
    }

    function toScreen(x, y) {
      var rect = canvas.getBoundingClientRect();
      return [rect.width / 2 + (x + panX) * zoom, rect.height / 2 + (y + panY) * zoom];
    }

    function toWorld(sx, sy) {
      var rect = canvas.getBoundingClientRect();
      return [(sx - rect.width / 2) / zoom - panX, (sy - rect.height / 2) / zoom - panY];
    }

    function radius(node) {
      if (node.category === "tanujit") return 18;
      return 5.5 + Math.sqrt(Math.max(node.withTanujit, 1)) * 3.4;
    }

    function hitNode(wx, wy) {
      var found = null;
      graph.list.forEach(function (node) {
        if (!visible(node)) return;
        var dx = node.x - wx, dy = node.y - wy;
        var r = radius(node) + 4;
        if (dx * dx + dy * dy <= r * r) found = node;
      });
      return found;
    }

    function hitEdge(wx, wy) {
      var best = null, bestDist = 7;
      graph.edges.forEach(function (edge) {
        var a = graph.nodes[edge.a], b = graph.nodes[edge.b];
        if (!visible(a) || !visible(b)) return;
        var dx = b.x - a.x, dy = b.y - a.y;
        var len2 = dx * dx + dy * dy || 1;
        var t = Math.max(0, Math.min(1, ((wx - a.x) * dx + (wy - a.y) * dy) / len2));
        var dist = Math.hypot(wx - (a.x + t * dx), wy - (a.y + t * dy));
        if (dist < bestDist) { best = edge; bestDist = dist; }
      });
      return best;
    }

    function papersHtml(papers) {
      return "<ul>" + papers.map(function (p) { return "<li>" + esc(paperLabel(p)) + "</li>"; }).join("") + "</ul>";
    }

    function showNode(node) {
      selected = node;
      detail.innerHTML = "<p><strong>" + esc(node.label) + "</strong> · " + node.withTanujit + " joint canonical works</p>" + papersHtml(node.papers);
      wrap.querySelectorAll(".collab-side button").forEach(function (button) {
        button.classList.toggle("is-selected", button.getAttribute("data-id") === node.id);
      });
    }

    function showEdge(edge) {
      selected = null;
      var a = graph.nodes[edge.a], b = graph.nodes[edge.b];
      detail.innerHTML = "<p><strong>" + esc(a.label) + "</strong> and <strong>" + esc(b.label) + "</strong> · " + edge.w + " shared papers</p>" + papersHtml(edge.papers);
    }

    function focusNode(node) {
      panX = -node.x;
      panY = -node.y;
      zoom = Math.max(zoom, 1.25);
      showNode(node);
      draw();
    }

    function step() {
      if (frozen) return;
      var list = graph.list.filter(visible);
      for (var i = 0; i < list.length; i++) {
        for (var j = i + 1; j < list.length; j++) {
          var a = list[i], b = list[j];
          if (a.pinned && b.pinned) continue;
          var dx = a.x - b.x, dy = a.y - b.y;
          var dist = Math.hypot(dx, dy) || 0.1;
          if (dist < 90) {
            var force = (90 - dist) / dist * 0.05;
            if (!a.pinned) { a.vx += dx * force; a.vy += dy * force; }
            if (!b.pinned) { b.vx -= dx * force; b.vy -= dy * force; }
          }
        }
      }
      graph.edges.forEach(function (edge) {
        var a = graph.nodes[edge.a], b = graph.nodes[edge.b];
        if (!visible(a) || !visible(b)) return;
        var dx = b.x - a.x, dy = b.y - a.y;
        var dist = Math.hypot(dx, dy) || 0.1;
        var rest = 120 + 28 / edge.w;
        var force = (dist - rest) * 0.003;
        if (!a.pinned) { a.vx += dx / dist * force; a.vy += dy / dist * force; }
        if (!b.pinned) { b.vx -= dx / dist * force; b.vy -= dy / dist * force; }
      });
      list.forEach(function (node) {
        if (node.pinned) { node.vx = 0; node.vy = 0; return; }
        if (node.category === "tanujit") {
          node.x += (0 - node.x) * 0.08;
          node.y += (0 - node.y) * 0.08;
          return;
        }
        node.vx += (0 - node.x) * 0.0012;
        node.vy += (0 - node.y) * 0.0012;
        node.vx *= 0.84;
        node.vy *= 0.84;
        node.x += node.vx;
        node.y += node.vy;
      });
    }

    function draw() {
      var rect = canvas.getBoundingClientRect();
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      ctx.clearRect(0, 0, rect.width, rect.height);
      graph.edges.forEach(function (edge) {
        var a = graph.nodes[edge.a], b = graph.nodes[edge.b];
        if (!visible(a) || !visible(b)) return;
        var hub = a.category === "tanujit" || b.category === "tanujit";
        var pa = toScreen(a.x, a.y), pb = toScreen(b.x, b.y);
        ctx.beginPath();
        ctx.moveTo(pa[0], pa[1]);
        ctx.lineTo(pb[0], pb[1]);
        ctx.strokeStyle = hub ? "rgba(31, 78, 121, " + Math.min(0.72, 0.18 + edge.w * 0.08) + ")" : "rgba(44, 107, 90, 0.18)";
        ctx.lineWidth = (hub ? 0.8 : 0.4) + Math.min(edge.w, 10) * 0.55;
        ctx.stroke();
      });
      graph.list.forEach(function (node) {
        if (!visible(node)) return;
        var p = toScreen(node.x, node.y);
        var matched = query && node.label.toLowerCase().indexOf(query) >= 0;
        var r = radius(node);
        ctx.beginPath();
        ctx.arc(p[0], p[1], r, 0, Math.PI * 2);
        ctx.fillStyle = colors[node.category] || colors.other;
        ctx.globalAlpha = query && !matched && node.category !== "tanujit" ? 0.22 : 1;
        ctx.fill();
        ctx.globalAlpha = 1;
        if (selected && selected.id === node.id) {
          ctx.beginPath();
          ctx.arc(p[0], p[1], r + 4, 0, Math.PI * 2);
          ctx.strokeStyle = "#a6843d";
          ctx.lineWidth = 2;
          ctx.stroke();
        }
        if (node.category === "tanujit" || matched || (selected && selected.id === node.id) || node.withTanujit >= 8) {
          ctx.fillStyle = "#1c2430";
          ctx.font = "12px Segoe UI, sans-serif";
          ctx.fillText(node.label, p[0] + r + 5, p[1] + 4);
        }
      });
    }

    function loop() {
      step();
      draw();
      if (!frozen) requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);

    function pointer(event) {
      var rect = canvas.getBoundingClientRect();
      return [event.clientX - rect.left, event.clientY - rect.top];
    }

    function placeTip(s, text) {
      tip.hidden = !text;
      if (!text) return;
      tip.textContent = text;
      tip.style.left = Math.min(s[0] + 14, frame.clientWidth - 220) + "px";
      tip.style.top = Math.max(8, s[1] - 28) + "px";
    }

    canvas.addEventListener("pointerdown", function (event) {
      canvas.setPointerCapture(event.pointerId);
      pointers[event.pointerId] = pointer(event);
      var ids = Object.keys(pointers);
      if (ids.length > 1) { drag = null; panning = false; return; }
      var s = pointers[event.pointerId];
      var world = toWorld(s[0], s[1]);
      var node = hitNode(world[0], world[1]);
      if (node) { drag = node; node.pinned = true; }
      else { panning = true; last = s; }
    });

    canvas.addEventListener("pointermove", function (event) {
      var s = pointer(event);
      if (pointers[event.pointerId]) pointers[event.pointerId] = s;
      var ids = Object.keys(pointers);
      if (ids.length > 1) {
        var a = pointers[ids[0]], b = pointers[ids[1]];
        var dist = Math.hypot(a[0] - b[0], a[1] - b[1]);
        if (canvas._pinch) {
          var next = Math.max(0.4, Math.min(3.4, zoom * (dist / canvas._pinch)));
          zoom = next;
        }
        canvas._pinch = dist;
        draw();
        return;
      }
      if (drag) {
        var world = toWorld(s[0], s[1]);
        drag.x = world[0];
        drag.y = world[1];
        draw();
        return;
      }
      if (panning && last) {
        panX += (s[0] - last[0]) / zoom;
        panY += (s[1] - last[1]) / zoom;
        last = s;
        draw();
        return;
      }
      var world = toWorld(s[0], s[1]);
      hover = hitNode(world[0], world[1]);
      hoverEdge = hover ? null : hitEdge(world[0], world[1]);
      canvas.style.cursor = hover || hoverEdge ? "pointer" : "grab";
      if (hover) placeTip(s, hover.label + " · " + hover.withTanujit + " joint papers");
      else if (hoverEdge) {
        var a = graph.nodes[hoverEdge.a], b = graph.nodes[hoverEdge.b];
        placeTip(s, a.label + " — " + b.label + " · " + hoverEdge.w + " papers");
      } else placeTip(s, "");
    });

    function endPointer(event) {
      delete pointers[event.pointerId];
      if (Object.keys(pointers).length < 2) canvas._pinch = 0;
      drag = null;
      panning = false;
      last = null;
    }
    canvas.addEventListener("pointerup", endPointer);
    canvas.addEventListener("pointercancel", endPointer);
    canvas.addEventListener("pointerleave", function () { placeTip([0, 0], ""); });

    canvas.addEventListener("dblclick", function (event) {
      var s = pointer(event);
      var world = toWorld(s[0], s[1]);
      var node = hitNode(world[0], world[1]);
      if (node && node.category !== "tanujit") node.pinned = false;
    });

    canvas.addEventListener("click", function (event) {
      var s = pointer(event);
      var world = toWorld(s[0], s[1]);
      var node = hitNode(world[0], world[1]);
      if (node) { showNode(node); draw(); return; }
      var edge = hitEdge(world[0], world[1]);
      if (edge) { showEdge(edge); draw(); }
    });

    canvas.addEventListener("wheel", function (event) {
      event.preventDefault();
      var before = pointer(event);
      var world = toWorld(before[0], before[1]);
      zoom = Math.max(0.4, Math.min(3.4, zoom * (event.deltaY < 0 ? 1.08 : 0.92)));
      var after = toScreen(world[0], world[1]);
      panX += (before[0] - after[0]) / zoom;
      panY += (before[1] - after[1]) / zoom;
      draw();
    }, { passive: false });

    wrap.querySelector("#net-search").addEventListener("input", function (event) {
      query = event.target.value.trim().toLowerCase();
      var hit = graph.list.filter(function (node) { return query && visible(node) && node.label.toLowerCase().indexOf(query) >= 0; })[0];
      if (hit) focusNode(hit);
      else draw();
    });

    wrap.querySelector("#net-min").addEventListener("input", function (event) {
      minJoint = Number(event.target.value);
      wrap.querySelector("#net-min-label").textContent = String(minJoint);
      renderList();
      draw();
    });

    wrap.querySelector("#net-reset").addEventListener("click", function () {
      panX = 0; panY = 0; zoom = 0.92; query = ""; minJoint = 1; selected = null;
      graph.list.forEach(function (node) { node.pinned = false; });
      wrap.querySelector("#net-search").value = "";
      wrap.querySelector("#net-min").value = "1";
      wrap.querySelector("#net-min-label").textContent = "1";
      detail.innerHTML = "<p class=\"meta\">Click a node or edge for details.</p>";
      renderList();
      draw();
    });

    wrap.querySelector("#net-freeze").addEventListener("click", function (event) {
      frozen = !frozen;
      event.target.textContent = frozen ? "Unfreeze" : "Freeze";
      if (!frozen) requestAnimationFrame(loop);
    });

    wrap.querySelector("#net-unpin").addEventListener("click", function () {
      graph.list.forEach(function (node) { node.pinned = false; });
      if (frozen) { frozen = false; wrap.querySelector("#net-freeze").textContent = "Freeze"; requestAnimationFrame(loop); }
    });

    var listHost = wrap.querySelector("#collab-list");
    function renderList() {
      var ranked = graph.list.filter(function (node) { return node.category !== "tanujit" && visible(node); })
        .sort(function (a, b) { return b.withTanujit - a.withTanujit || a.label.localeCompare(b.label); });
      listHost.innerHTML = ranked.map(function (node) {
        return '<li><button type="button" data-id="' + esc(node.id) + '"><span>' + esc(node.label) + '</span><b>' + node.withTanujit + '</b></button></li>';
      }).join("");
      listHost.querySelectorAll("button").forEach(function (button) {
        button.addEventListener("click", function () {
          var node = graph.nodes[button.getAttribute("data-id")];
          if (node) focusNode(node);
        });
      });
    }
    renderList();
  }

  Promise.all([
    fetch("/data/publications.json").then(function (r) { return r.json(); }),
    fetch("/data/author-aliases.json").then(function (r) { return r.json(); }),
    fetch("/data/people.json").then(function (r) { return r.json(); })
  ]).then(function (all) {
    var pubs = all[0];
    var cards = document.getElementById("stats-cards");
    var network = document.getElementById("stats-network");
    if (!cards || !network) return;
    var journal = pubs.filter(function (p) { return p.section === "journal"; }).length;
    var conference = pubs.filter(function (p) { return p.section === "conference"; }).length;
    var journalCard = document.getElementById("card-journal");
    var conferenceCard = document.getElementById("card-conference");
    if (journalCard) journalCard.textContent = String(journal);
    if (conferenceCard) conferenceCard.textContent = String(conference);
    mountNetwork(network, buildGraph(pubs, all[1], all[2]), pubs.length);
  });
})();
