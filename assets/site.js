/* ============================================================================
   A-STAR Lab — shared chrome + interactions
   EDIT CONTENT HERE: brand, navigation, footer, contact. Every page picks it up.
   No build step. Vanilla JS, no dependencies.
   ========================================================================== */

var SITE = {
  brand: { name: "A-STAR", tag: "LAB" },

  // Nav order = display order. cta:true renders as the outlined button.
  nav: [
    { href: "index.html", label: "Home" },
    // { href: "research.html", label: "Research" },
    { href: "people.html", label: "People" },
    { href: "publications.html", label: "Publications" },
    { href: "news.html", label: "News" },
    { href: "outreach.html", label: "Outreach" },
    { href: "join.html", label: "Join", cta: true },
  ],

  contact: {
    email: "yliu580@syr.edu",
    scholar: "https://scholar.google.com/citations?user=w91CAdkAAAAJ&hl=en",
    profile: "https://ecs.syracuse.edu/faculty-staff/yizhi-liu",
  },

  footer: {
    blurb: "AI-Driven Sensing Technology And Robotics Lab",
    address: [
      "Dept. of Civil &amp; Environmental Engineering",
      "Syracuse University",
      "Syracuse, NY 13244",
    ],
    est: "Established 2024",
  },
};

/* ========================================================================== */
(function () {
  "use strict";

  var $ = function (s, r) {
    return (r || document).querySelector(s);
  };
  var $$ = function (s, r) {
    return Array.prototype.slice.call((r || document).querySelectorAll(s));
  };
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var mac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);

  var page = location.pathname.split("/").pop() || "index.html";
  if (page === "") page = "index.html";

  var ICON = {
    sun: '<svg class="sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.2 5.2l1.6 1.6M17.2 17.2l1.6 1.6M18.8 5.2l-1.6 1.6M6.8 17.2l-1.6 1.6"/></svg>',
    moon: '<svg class="moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M20.5 13.4A8.4 8.4 0 1 1 11 3.2a6.7 6.7 0 0 0 9.5 10.2z"/></svg>',
    search:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/></svg>',
    up: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M6 11l6-6 6 6"/></svg>',
  };

  /* ---------------------------------------------------------------- header */
  function buildHeader() {
    var host = $("#site-header");
    if (!host) return null;
    host.className = "site-header";

    var links = SITE.nav
      .map(function (i) {
        var cls = (i.cta ? "nav-cta " : "") + (i.href === page ? "active" : "");
        return (
          '<a href="' +
          i.href +
          '" class="' +
          cls.trim() +
          '">' +
          i.label +
          "</a>"
        );
      })
      .join("");

    host.innerHTML =
      '<div class="wrap nav">' +
      '<a class="brand" href="index.html">' +
      '<img class="brand-mark" src="assets/logo-icon.png" alt="" aria-hidden="true">' +
      '<span class="brand-text">' +
      SITE.brand.name +
      "<em>" +
      SITE.brand.tag +
      "</em></span>" +
      "</a>" +
      '<div class="nav-right">' +
      '<nav class="nav-links" aria-label="Primary">' +
      links +
      "</nav>" +
      '<div class="nav-actions">' +
      '<button class="kbd-btn" id="cmdkOpen" aria-label="Search the site">' +
      ICON.search +
      "<span>Search</span><kbd>" +
      (mac ? "⌘" : "Ctrl") +
      "K</kbd>" +
      "</button>" +
      '<button class="icon-btn theme-toggle" id="themeToggle" aria-label="Toggle dark mode">' +
      ICON.sun +
      ICON.moon +
      "</button>" +
      '<button class="menu-btn" id="menuBtn" aria-label="Menu" aria-expanded="false"><i></i><i></i></button>' +
      "</div>" +
      "</div>" +
      "</div>" +
      '<div class="progress" id="progress"></div>';

    // mobile overlay
    var mm = document.createElement("div");
    mm.className = "mobile-menu";
    mm.id = "mobileMenu";
    mm.innerHTML =
      "<nav>" +
      SITE.nav
        .map(function (i, n) {
          return (
            '<a href="' +
            i.href +
            '" style="--i:' +
            n +
            '">' +
            i.label +
            "<span>" +
            String(n + 1).padStart(2, "0") +
            "</span></a>"
          );
        })
        .join("") +
      "</nav>" +
      '<div class="mm-foot">' +
      SITE.footer.est +
      " &middot; Syracuse, NY</div>";
    document.body.appendChild(mm);

    var btn = $("#menuBtn");
    btn.addEventListener("click", function () {
      var open = mm.classList.toggle("open");
      btn.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", String(open));
      document.body.style.overflow = open ? "hidden" : "";
    });

    return host;
  }

  /* ---------------------------------------------------------------- footer */
  function buildFooter() {
    var host = $("#site-footer");
    if (!host) return;
    host.className = "site-footer";

    var pages = SITE.nav
      .filter(function (i) {
        return i.href !== "index.html";
      })
      .map(function (i) {
        return '<a href="' + i.href + '">' + i.label + "</a>";
      })
      .join("");

    host.innerHTML =
      '<div class="wrap">' +
      '<div class="foot-grid">' +
      "<div>" +
      '<div class="foot-brand">' +
      SITE.brand.name +
      "<em>" +
      SITE.footer.blurb +
      "</em></div>" +
      "</div>" +
      '<div class="foot-col"><h4>Pages</h4>' +
      pages +
      "</div>" +
      '<div class="foot-col"><h4>Contact</h4>' +
      '<a href="mailto:' +
      SITE.contact.email +
      '">' +
      SITE.contact.email +
      "</a>" +
      '<a href="' +
      SITE.contact.scholar +
      '" target="_blank" rel="noopener" class="ext">Google Scholar</a>' +
      '<a href="' +
      SITE.contact.profile +
      '" target="_blank" rel="noopener" class="ext">Syracuse profile</a>' +
      "<p>" +
      SITE.footer.address.join("<br>") +
      "</p>" +
      "</div>" +
      "</div>" +
      '<div class="foot-bar">' +
      "<span>&copy; " +
      new Date().getFullYear() +
      " A-STAR Lab, Syracuse University</span>" +
      "<span>" +
      SITE.footer.est +
      "</span>" +
      "</div>" +
      "</div>";
  }

  /* ----------------------------------------------------------------- theme */
  function initTheme() {
    var t = $("#themeToggle");
    if (!t) return;
    t.addEventListener("click", function () {
      var root = document.documentElement;
      var dark = root.getAttribute("data-theme") === "dark";
      if (dark) root.removeAttribute("data-theme");
      else root.setAttribute("data-theme", "dark");
      try {
        localStorage.setItem("astar-theme", dark ? "light" : "dark");
      } catch (e) {}
      window.dispatchEvent(new CustomEvent("astar:theme"));
    });
  }

  /* -------------------------------------------------------- command palette */
  function initPalette() {
    var items = [];

    SITE.nav.forEach(function (i) {
      items.push({
        group: "Pages",
        label: i.label,
        sub: i.href,
        kind: "page",
        go: i.href,
      });
    });

    $$("[data-rail][id]").forEach(function (s) {
      items.push({
        group: "On this page",
        label: s.getAttribute("data-rail"),
        kind: "section",
        go: "#" + s.id,
      });
    });

    $$("[data-search]").forEach(function (row) {
      var h = $("h3", row) || $("h2", row);
      items.push({
        group: row.getAttribute("data-group") || "Entries",
        label: h ? h.textContent.trim() : row.getAttribute("data-search"),
        sub: row.getAttribute("data-sub") || "",
        kind: row.getAttribute("data-kind") || "item",
        node: row,
      });
    });

    items.push({
      group: "Elsewhere",
      label: "Google Scholar",
      kind: "link",
      go: SITE.contact.scholar,
      ext: true,
    });
    items.push({
      group: "Elsewhere",
      label: "Email the lab",
      kind: "link",
      go: "mailto:" + SITE.contact.email,
    });

    var el = document.createElement("div");
    el.className = "cmdk";
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-modal", "true");
    el.setAttribute("aria-label", "Search");
    el.innerHTML =
      '<div class="cmdk-scrim" data-close></div>' +
      '<div class="cmdk-box">' +
      '<div class="cmdk-field">' +
      ICON.search +
      '<input type="text" id="cmdkInput" placeholder="Search pages, sections, publications…" autocomplete="off" spellcheck="false">' +
      "</div>" +
      '<div class="cmdk-list" id="cmdkList" role="listbox"></div>' +
      '<div class="cmdk-foot"><span>&uarr;&darr; navigate</span><span>&crarr; open</span><span>esc close</span></div>' +
      "</div>";
    document.body.appendChild(el);

    var input = $("#cmdkInput", el);
    var list = $("#cmdkList", el);
    var shown = [],
      sel = 0;

    function render(q) {
      q = (q || "").trim().toLowerCase();
      shown = items.filter(function (it) {
        if (!q) return it.kind !== "item" || false;
        return (
          (it.label + " " + (it.sub || "") + " " + it.group)
            .toLowerCase()
            .indexOf(q) > -1
        );
      });
      if (!q)
        shown = items.filter(function (it) {
          return it.group === "Pages" || it.group === "On this page";
        });

      sel = 0;
      if (!shown.length) {
        list.innerHTML =
          '<div class="cmdk-empty">Nothing matches &ldquo;' +
          q +
          "&rdquo;</div>";
        return;
      }
      var html = "",
        group = "";
      shown.forEach(function (it, n) {
        if (it.group !== group) {
          group = it.group;
          html += '<div class="cmdk-group">' + group + "</div>";
        }
        html +=
          '<button class="cmdk-item" role="option" data-n="' +
          n +
          '" aria-selected="' +
          (n === 0) +
          '">' +
          "<span>" +
          it.label +
          "</span>" +
          (it.sub ? ' <span class="ci-sub">' + it.sub + "</span>" : "") +
          '<span class="ci-kind">' +
          it.kind +
          "</span></button>";
      });
      list.innerHTML = html;
    }

    function mark() {
      $$(".cmdk-item", list).forEach(function (b) {
        var on = +b.getAttribute("data-n") === sel;
        b.setAttribute("aria-selected", String(on));
        if (on && b.scrollIntoView) b.scrollIntoView({ block: "nearest" });
      });
    }

    function open() {
      render("");
      el.classList.add("open");
      document.body.style.overflow = "hidden";
      setTimeout(function () {
        input.focus();
        input.value = "";
      }, 20);
    }
    function close() {
      el.classList.remove("open");
      document.body.style.overflow = "";
    }
    function run(it) {
      if (!it) return;
      close();
      if (it.node) {
        var row = it.node;
        // if the row is filtered out or on another page, bring it back first
        if (typeof row.__revealRow === "function") row.__revealRow();
        row.scrollIntoView({
          behavior: reduce ? "auto" : "smooth",
          block: "center",
        });
        if (!row.classList.contains("open")) row.classList.add("open");
        row.style.transition = "background .8s";
        row.style.background = "var(--accent-wash)";
        setTimeout(function () {
          row.style.background = "";
        }, 1400);
        return;
      }
      if (it.ext) window.open(it.go, "_blank", "noopener");
      else location.href = it.go;
    }

    input.addEventListener("input", function () {
      render(input.value);
    });
    list.addEventListener("click", function (e) {
      var b = e.target.closest(".cmdk-item");
      if (b) run(shown[+b.getAttribute("data-n")]);
    });
    list.addEventListener("mousemove", function (e) {
      var b = e.target.closest(".cmdk-item");
      if (b) {
        sel = +b.getAttribute("data-n");
        mark();
      }
    });
    $$("[data-close]", el).forEach(function (n) {
      n.addEventListener("click", close);
    });

    document.addEventListener("keydown", function (e) {
      var typing = /^(INPUT|TEXTAREA|SELECT)$/.test(
        document.activeElement.tagName,
      );
      var isOpen = el.classList.contains("open");

      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        isOpen ? close() : open();
        return;
      }
      if (e.key === "/" && !typing && !isOpen) {
        e.preventDefault();
        open();
        return;
      }
      if (!isOpen) return;

      if (e.key === "Escape") {
        e.preventDefault();
        close();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        sel = (sel + 1) % shown.length;
        mark();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        sel = (sel - 1 + shown.length) % shown.length;
        mark();
      } else if (e.key === "Enter") {
        e.preventDefault();
        run(shown[sel]);
      }
    });

    var ob = $("#cmdkOpen");
    if (ob) ob.addEventListener("click", open);
  }

  /* ------------------------------------------------------------------ rail */
  function initRail() {
    var secs = $$("[data-rail][id]");
    if (secs.length < 3) return;

    var rail = document.createElement("nav");
    rail.className = "rail";
    rail.setAttribute("aria-label", "Sections");
    rail.innerHTML = secs
      .map(function (s) {
        return (
          '<a href="#' +
          s.id +
          '"><span>' +
          s.getAttribute("data-rail") +
          "</span><i></i></a>"
        );
      })
      .join("");
    document.body.appendChild(rail);

    var links = $$("a", rail);
    // a paginated-away section has to be brought back before the anchor jump
    links.forEach(function (a, n) {
      a.addEventListener("click", function () {
        if (typeof secs[n].__revealRow === "function") secs[n].__revealRow();
      });
    });

    return function (y) {
      rail.classList.toggle("show", y > 380);
      var best = 0;
      secs.forEach(function (s, n) {
        if (s.getBoundingClientRect().top < window.innerHeight * 0.42) best = n;
      });
      links.forEach(function (a, n) {
        a.classList.toggle("active", n === best);
      });
    };
  }

  /* ---------------------------------------------------------------- scroll */
  function initScroll(header, railTick) {
    var bar = $("#progress");

    var top = document.createElement("button");
    top.className = "to-top";
    top.setAttribute("aria-label", "Back to top");
    top.innerHTML = ICON.up;
    top.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    });
    document.body.appendChild(top);

    var queued = false;
    function tick() {
      queued = false;
      var y = window.scrollY;
      var h = document.documentElement.scrollHeight - window.innerHeight;
      if (header) header.classList.toggle("scrolled", y > 12);
      if (bar)
        bar.style.width = (h > 0 ? Math.min(100, (y / h) * 100) : 0) + "%";
      top.classList.toggle("show", y > 900);
      if (railTick) railTick(y);
    }
    window.addEventListener(
      "scroll",
      function () {
        if (!queued) {
          queued = true;
          requestAnimationFrame(tick);
        }
      },
      { passive: true },
    );
    window.addEventListener("resize", tick);
    tick();
  }

  /* ---------------------------------------------------------------- reveal */
  function initReveal() {
    var nodes = $$(".reveal, .stagger");
    $$(".stagger").forEach(function (g) {
      Array.prototype.forEach.call(g.children, function (c, n) {
        c.style.setProperty("--i", n);
      });
    });
    if (reduce || !("IntersectionObserver" in window)) {
      nodes.forEach(function (n) {
        n.classList.add("in");
      });
      return;
    }
    var io = new IntersectionObserver(
      function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    nodes.forEach(function (n) {
      io.observe(n);
    });
  }

  /* -------------------------------------------------------------- spotlight */
  function initSpotlight() {
    if (reduce || matchMedia("(hover: none)").matches) return;
    $$(".plate, .band").forEach(function (el) {
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        el.style.setProperty(
          "--mx",
          ((e.clientX - r.left) / r.width) * 100 + "%",
        );
        el.style.setProperty(
          "--my",
          ((e.clientY - r.top) / r.height) * 100 + "%",
        );
      });
    });
  }

  /* --------------------------------------------------------------- explorer */
  function initExplorer() {
    $$("[data-explorer]").forEach(function (ex) {
      var tabs = $$(".ex-tab", ex);
      var panels = $$(".ex-panel", ex);
      var hover = ex.getAttribute("data-explorer") === "hover";

      function select(n, focus) {
        tabs.forEach(function (t, i) {
          t.setAttribute("aria-selected", String(i === n));
          t.setAttribute("tabindex", i === n ? "0" : "-1");
        });
        panels.forEach(function (p, i) {
          p.classList.toggle("is-active", i === n);
        });
        if (focus) tabs[n].focus();
      }

      tabs.forEach(function (t, n) {
        t.addEventListener("click", function () {
          select(n);
        });
        if (hover)
          t.addEventListener("mouseenter", function () {
            select(n);
          });
        t.addEventListener("keydown", function (e) {
          var d =
            e.key === "ArrowDown" || e.key === "ArrowRight"
              ? 1
              : e.key === "ArrowUp" || e.key === "ArrowLeft"
                ? -1
                : 0;
          if (!d) return;
          e.preventDefault();
          select((n + d + tabs.length) % tabs.length, true);
        });
      });

      select(0);
    });
  }

  /* -------------------------------------------------------------- accordion */
  function bindAccordion(row) {
    if (!$(".idx-body", row) || row.hasAttribute("data-acc")) return;
    row.setAttribute("data-acc", "");
    row.setAttribute("tabindex", "0");
    row.setAttribute("role", "button");
    row.setAttribute("aria-expanded", "false");

    function toggle() {
      var open = row.classList.toggle("open");
      row.setAttribute("aria-expanded", String(open));
    }
    row.addEventListener("click", function (e) {
      if (e.target.closest("a")) return;
      toggle();
    });
    row.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle();
      }
    });
  }

  function initAccordion() {
    $$(".idx-row").forEach(bindAccordion);
  }

  /* -------------------------------------------------------------- news feed */
  /* The home page teaser mirrors the top entries of news.html, so the two can
     never drift. The markup already in the page is the fallback: if the fetch
     fails (opened over file://, offline) it simply stays.                    */
  function initNewsFeed() {
    var host = $("[data-news-feed]");
    if (!host || typeof window.fetch !== "function") return;

    var src = host.getAttribute("data-news-feed") || "news.html";
    var want = parseInt(host.getAttribute("data-news-count"), 10) || 3;

    fetch(src, { cache: "no-cache" })
      .then(function (r) {
        if (!r.ok) throw new Error(r.status);
        return r.text();
      })
      .then(function (html) {
        var doc = new DOMParser().parseFromString(html, "text/html");
        var rows = $$("#newsList .idx-row", doc).slice(0, want);
        if (!rows.length) return;

        host.innerHTML = "";
        rows.forEach(function (r) {
          var copy = r.cloneNode(true);
          copy.classList.remove("open");
          copy.removeAttribute("style");
          copy.removeAttribute("data-acc");
          host.appendChild(copy);
          bindAccordion(copy);
        });
        initPhotos();
      })
      .catch(function () {
        /* keep whatever is already in the page */
      });
  }

  /* ---------------------------------------------------------------- filters */
  function initFilters() {
    $$("[data-filters]").forEach(function (bar) {
      var scope = $("#" + bar.getAttribute("data-filters"));
      if (!scope) return;
      var rows = $$("[data-tags]", scope);
      var chips = $$(".chip", bar);
      var input = $("input", bar);
      var count = $(".count", bar);
      var empty = $(".no-match", scope.parentNode) || $(".no-match", scope);
      // "entry|entries" by default; override with data-noun="event|events"
      var nouns = (bar.getAttribute("data-noun") || "entry|entries").split("|");

      // Chips can be split into independent groups with data-group (e.g. year
      // and type): one active choice per group, and the groups combine. Chips
      // with no data-group all share a single group, i.e. the old behaviour.
      var state = {};
      function groupOf(c) { return c.getAttribute("data-group") || "tag"; }
      chips.forEach(function (c) { state[groupOf(c)] = "all"; });

      /* --- pagination (opt-in) -------------------------------------------
         Add data-page-size="6" to the filters bar and drop a
         <div class="pager" data-pager></div> after the list. Paging applies
         to whatever the chips and the search box have left visible.        */
      var pager = $("[data-pager]", scope.parentNode) || $("[data-pager]", scope);
      var pageSize = parseInt(bar.getAttribute("data-page-size"), 10) || 0;
      var page = 1;
      var prevBtn = null, nextBtn = null, pgLabel = null;

      var ARROW_L = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>';
      var ARROW_R = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>';

      if (pager && pageSize) {
        pager.innerHTML =
          '<button class="pg-btn" type="button" data-pg="prev" aria-label="Previous page">' + ARROW_L + "</button>" +
          '<span class="pg-label" aria-live="polite"></span>' +
          '<button class="pg-btn" type="button" data-pg="next" aria-label="Next page">' + ARROW_R + "</button>";
        prevBtn = $('[data-pg="prev"]', pager);
        nextBtn = $('[data-pg="next"]', pager);
        pgLabel = $(".pg-label", pager);

        function goPage(n) {
          page = n;
          apply(true);
          // bring the top of the list into view, allowing for the fixed header
          var top = scope.getBoundingClientRect().top + window.scrollY - 110;
          window.scrollTo({ top: top, behavior: reduce ? "auto" : "smooth" });
        }
        prevBtn.addEventListener("click", function () { if (page > 1) goPage(page - 1); });
        nextBtn.addEventListener("click", function () { goPage(page + 1); });
      }

      function apply(keepPage) {
        if (!keepPage) page = 1;
        var q = input ? input.value.trim().toLowerCase() : "";

        var matches = rows.filter(function (r) {
          var tags = " " + (r.getAttribute("data-tags") || "") + " ";
          var okTag = Object.keys(state).every(function (g) {
            return state[g] === "all" || tags.indexOf(" " + state[g] + " ") > -1;
          });
          return okTag && (!q || r.textContent.toLowerCase().indexOf(q) > -1);
        });

        var pages = pageSize ? Math.max(1, Math.ceil(matches.length / pageSize)) : 1;
        if (page > pages) page = pages;
        var from = pageSize ? (page - 1) * pageSize : 0;
        var to = pageSize ? from + pageSize : matches.length;
        var shown = matches.slice(from, to);

        rows.forEach(function (r) {
          if (shown.indexOf(r) > -1) {
            r.style.display = "";
          } else {
            r.style.display = "none";
            r.classList.remove("open");
          }
        });

        if (count) {
          count.textContent =
            matches.length + " " + (matches.length === 1 ? nouns[0] : nouns[1] || nouns[0]);
        }
        if (empty) empty.classList.toggle("show", matches.length === 0);

        if (pgLabel) {
          pager.style.display = pages > 1 ? "" : "none";
          pgLabel.textContent = "Page " + page + " / " + pages;
          prevBtn.disabled = page <= 1;
          nextBtn.disabled = page >= pages;
        }
      }

      // Lets the command palette jump to an entry that is currently filtered
      // out or sitting on another page: clear the filters, then page to it.
      rows.forEach(function (r) {
        r.__revealRow = function () {
          Object.keys(state).forEach(function (g) { state[g] = "all"; });
          chips.forEach(function (c) {
            c.setAttribute("aria-pressed", String(c.getAttribute("data-tag") === "all"));
          });
          if (input) input.value = "";
          var idx = rows.indexOf(r);
          page = pageSize ? Math.floor(idx / pageSize) + 1 : 1;
          apply(true);
        };
      });

      chips.forEach(function (c) {
        c.addEventListener("click", function () {
          var g = groupOf(c);
          state[g] = c.getAttribute("data-tag");
          chips.forEach(function (o) {
            if (groupOf(o) === g) {
              o.setAttribute("aria-pressed", String(o === c));
            }
          });
          apply();
        });
      });
      if (input) {
        input.addEventListener("input", function () { apply(); });
        input.addEventListener("keydown", function (e) {
          if (e.key === "Escape") {
            input.value = "";
            apply();
          }
        });
      }
      apply();
    });
  }

  /* ------------------------------------------------------------------- copy */
  function initCopy() {
    $$("[data-copy]").forEach(function (b) {
      b.addEventListener("click", function () {
        var text = b.getAttribute("data-copy");
        var done = function () {
          var was = b.querySelector("span");
          if (!was) return;
          var old = was.textContent;
          was.textContent = "Copied";
          b.classList.add("done");
          setTimeout(function () {
            was.textContent = old;
            b.classList.remove("done");
          }, 1600);
        };
        if (navigator.clipboard)
          navigator.clipboard.writeText(text).then(done, done);
        else done();
      });
    });
  }

  /* ----------------------------------------------------------------- photos */
  /* A portrait whose file is missing (or misspelled) falls back to the
     initials plate instead of showing a broken-image icon.                  */
  function initPhotos() {
    $$(".portrait img").forEach(function (im) {
      function fail() { im.style.display = "none"; }
      im.addEventListener("error", fail);
      if (im.complete && im.naturalWidth === 0) fail();
    });
    // decorative looping clips stay still for visitors who asked for less motion
    if (reduce) {
      $$("video[data-auto]").forEach(function (v) {
        v.removeAttribute("autoplay");
        v.pause();
      });
    }
  }

  /* ---------------------------------------------------------------- gallery */
  /* Horizontal photo strip: auto-advances, pauses on hover or when the tab is
     hidden, and can be driven with the arrows, the dots, or a swipe.        */
  function initGallery() {
    // a page can hold several strips (outreach has one per event)
    $$("[data-gallery]").forEach(setupGallery);
  }

  function setupGallery(g) {
    var track = $(".gal-track", g);
    var items = $$(".gal-item", track);
    var dotsHost = $(".gal-dots", g);
    var playBtn = $('[data-gal="play"]', g);
    if (!track || !items.length) return;

    var DELAY = 4000;
    var timer = null;
    var playing = !reduce;

    // a missing file shows the "add photo" placeholder instead of a broken icon
    items.forEach(function (fig) {
      var im = $("img", fig);
      if (!im) return;
      if (!im.getAttribute("src")) fig.classList.add("is-empty");
      im.addEventListener("error", function () { fig.classList.add("is-empty"); });
    });

    // video slides: muted clips marked data-auto play only while on screen, so
    // off-screen clips cost nothing. A clip the visitor starts with sound stops
    // the carousel so it does not slide away mid-playback.
    var vids = $$("video", track);
    vids.forEach(function (v) {
      v.addEventListener("play", function () { if (!v.muted) stop(); });
      if (!v.hasAttribute("data-auto")) return;

      // click (or Enter/Space) toggles this clip; a paused clip shows a play
      // badge and stays paused even if you scroll it out of view and back
      var fig = v.closest(".gal-item");
      var badge = document.createElement("span");
      badge.className = "gal-play";
      badge.setAttribute("aria-hidden", "true");
      v.parentNode.appendChild(badge);

      v.tabIndex = 0;
      v.setAttribute("role", "button");
      v.setAttribute("aria-label", "Play or pause this clip");

      function toggle(e) {
        if (e) e.preventDefault();
        if (v.paused) {
          v.removeAttribute("data-user-paused");
          var pr = v.play();
          if (pr && pr.catch) pr.catch(function () {});
        } else {
          v.setAttribute("data-user-paused", "");
          v.pause();
        }
      }
      v.addEventListener("click", toggle);
      badge.addEventListener("click", toggle);
      v.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") toggle(e);
      });
      // shown until playback actually starts, so a clip still reads as a clip
      // even where the browser refuses to autoplay it
      fig.classList.add("clip-paused");
      v.addEventListener("play", function () { fig.classList.remove("clip-paused"); });
      v.addEventListener("pause", function () { fig.classList.add("clip-paused"); });
    });
    if (vids.length && "IntersectionObserver" in window) {
      var vio = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (e) {
            var v = e.target;
            if (!v.hasAttribute("data-auto")) return;
            if (v.hasAttribute("data-user-paused")) return;
            if (e.isIntersecting && !reduce) {
              var pr = v.play();
              if (pr && pr.catch) pr.catch(function () {});
            } else {
              v.pause();
            }
          });
        },
        { root: track, threshold: 0.45 }
      );
      vids.forEach(function (v) { vio.observe(v); });
    }

    // Indicator: a dash per slide is readable up to about a dozen; beyond that
    // the row would overflow on a phone, so it becomes a "05 / 24" counter.
    var dots = [];
    var counter = null;
    var MANY = items.length > 12;
    if (dotsHost) {
      if (MANY) {
        dotsHost.classList.add("as-counter");
        counter = document.createElement("span");
        counter.className = "gal-count";
        dotsHost.appendChild(counter);
      } else {
        items.forEach(function (_, n) {
          var b = document.createElement("button");
          b.className = "gal-dot";
          b.type = "button";
          b.setAttribute("aria-label", "Photo " + (n + 1));
          b.addEventListener("click", function () { stop(); go(n); });
          dotsHost.appendChild(b);
          dots.push(b);
        });
      }
    }

    function maxScroll() {
      return track.scrollWidth - track.clientWidth;
    }
    // photos have different widths, so each stop is read off the item itself
    // (offsetLeft already includes the track padding, which snapping strips)
    function posOf(i) {
      var pad = parseFloat(getComputedStyle(track).paddingLeft) || 0;
      return Math.max(0, Math.min(items[i].offsetLeft - pad, maxScroll()));
    }
    function current() {
      var x = track.scrollLeft,
        best = 0,
        bestD = Infinity;
      for (var i = 0; i < items.length; i++) {
        var d = Math.abs(posOf(i) - x);
        if (d < bestD) { bestD = d; best = i; }
      }
      return best;
    }
    function go(n) {
      var i = Math.max(0, Math.min(items.length - 1, n));
      // no `behavior` here on purpose: some engines drop back-to-back smooth
      // scroll requests. The animation comes from scroll-behavior in the CSS,
      // which the reduced-motion media query turns off.
      track.scrollTo({ left: posOf(i) });
    }
    function next() {
      if (track.scrollLeft >= maxScroll() - 6) go(0);
      else go(current() + 1);
    }
    function prev() {
      if (track.scrollLeft <= 6) go(items.length - 1);
      else go(current() - 1);
    }

    function pad2(n) { return (n < 10 ? "0" : "") + n; }
    function mark() {
      var i = current();
      if (counter) counter.textContent = pad2(i + 1) + " / " + pad2(items.length);
      else dots.forEach(function (d, n) { d.classList.toggle("active", n === i); });
    }

    // One interval for the whole life of the page; each tick decides whether to
    // advance. Pausing never destroys the timer, so a stray hover or visibility
    // event can't leave autoplay permanently stuck.
    var hovering = false;

    function tick() {
      // nothing to do when every slide already fits on screen
      if (!playing || hovering || document.hidden || maxScroll() <= 8) return;
      next();
    }
    function start() {
      if (reduce) return;
      playing = true;
      if (!timer) timer = setInterval(tick, DELAY);
      if (playBtn) {
        playBtn.classList.remove("paused");
        playBtn.setAttribute("aria-label", "Pause");
      }
    }
    function stop() {
      playing = false;
      if (playBtn) {
        playBtn.classList.add("paused");
        playBtn.setAttribute("aria-label", "Play");
      }
    }
    function suspend() { hovering = true; }
    function resume() { hovering = false; }

    var nb = $('[data-gal="next"]', g);
    var pb = $('[data-gal="prev"]', g);
    if (nb) nb.addEventListener("click", function () { stop(); next(); });
    if (pb) pb.addEventListener("click", function () { stop(); prev(); });
    if (playBtn) playBtn.addEventListener("click", function () { playing ? stop() : start(); });

    // hover-pause covers the photos only: resting the cursor on the controls
    // after pressing play should not stop what you just started
    track.addEventListener("mouseenter", suspend);
    track.addEventListener("mouseleave", resume);
    track.addEventListener("focusin", suspend);
    track.addEventListener("focusout", resume);
    track.addEventListener("pointerdown", stop);

    var queued = false;
    track.addEventListener("scroll", function () {
      if (queued) return;
      queued = true;
      requestAnimationFrame(function () { queued = false; mark(); });
    }, { passive: true });

    track.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { e.preventDefault(); stop(); next(); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); stop(); prev(); }
    });

    // Arrows and counter are pointless when the whole strip already fits. This
    // has to be re-checked whenever the track's box changes, not just on window
    // resize: a strip inside a hidden page (pagination) measures 0 wide, so it
    // would otherwise stay control-less after the page is switched back on.
    var ctrlBar = $(".gal-ctrl", g);
    function syncCtrl() {
      if (!ctrlBar) return;
      var want = maxScroll() > 8 ? "" : "none";
      if (ctrlBar.style.display !== want) ctrlBar.style.display = want;
      mark();
    }
    window.addEventListener("resize", syncCtrl);
    if ("ResizeObserver" in window) {
      new ResizeObserver(syncCtrl).observe(track);
    }
    syncCtrl();

    mark();
    if (reduce) stop();
    else start();
  }

  /* --------------------------------------------- hero survey plane (canvas) */
  /* A surveyed ground plane in perspective with a scan ring travelling out
     from the viewer, plus a few vertical returns standing on the plane.     */
  function initCloud() {
    var cv = $("#cloud");
    if (!cv) return;
    var ctx = cv.getContext("2d");
    var w = 0,
      h = 0,
      dpr = 1,
      mx = 0,
      my = 0,
      t = 0,
      raf = null;

    var EYE = 0.85,
      Z0 = 1.7,
      Z1 = 16;
    var grid = [],
      posts = [],
      zRows = [];

    function css(name, fallback) {
      var v = getComputedStyle(document.documentElement)
        .getPropertyValue(name)
        .trim();
      return v || fallback;
    }
    var color = css("--ink", "#16151A");
    var hot = css("--accent", "#4B2FE0");

    function seed() {
      grid = [];
      zRows = [];
      var rows = 30,
        cols = 42;
      for (var r = 0; r < rows; r++) {
        var z = Z0 * Math.pow(Z1 / Z0, r / (rows - 1));
        zRows.push(z);
        for (var c = 0; c < cols; c++) {
          grid.push({ x: (c / (cols - 1) - 0.5) * 9, z: z });
        }
      }
      posts = [
        { x: -2.45, z: 6.2, n: 7 },
        { x: 1.85, z: 8.6, n: 5 },
        { x: 3.1, z: 12.4, n: 8 },
        { x: -0.7, z: 13.6, n: 4 },
      ];
    }

    function size() {
      var r = cv.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      t += 0.0035;

      var f = h * 1.05;
      var cx = w * (0.6 + mx * 0.04);
      var horizon = h * (0.33 + my * 0.02);
      var ring = Z0 + ((t * 0.55) % 1) * (Z1 - Z0);
      var yaw = Math.sin(t * 0.5) * 0.06;

      function px(x, z) {
        return cx + ((x + yaw * z) * f) / z;
      }
      function py(z, up) {
        return horizon + ((EYE - (up || 0)) * f) / z;
      }

      // survey grid: rails converging to the horizon, plus range rings
      ctx.lineWidth = 1;
      ctx.strokeStyle = color;
      for (var c = -4; c <= 4; c++) {
        ctx.globalAlpha = 0.05;
        ctx.beginPath();
        ctx.moveTo(px(c, Z0), py(Z0));
        ctx.lineTo(px(c, Z1), py(Z1));
        ctx.stroke();
      }
      for (var r = 0; r < zRows.length; r += 3) {
        var z = zRows[r];
        var lit = Math.max(0, 1 - Math.abs(z - ring) / 1.9);
        ctx.globalAlpha = 0.045 + lit * 0.2;
        ctx.strokeStyle = lit > 0.5 ? hot : color;
        ctx.beginPath();
        ctx.moveTo(px(-4.5, z), py(z));
        ctx.lineTo(px(4.5, z), py(z));
        ctx.stroke();
      }

      function dot(x, z, up, base) {
        var sx = px(x, z),
          sy = py(z, up);
        if (sx < -30 || sx > w + 30 || sy < -30 || sy > h + 30) return;
        var far = (z - Z0) / (Z1 - Z0);
        var near = Math.max(0, 1 - Math.abs(z - ring) / 1.5);
        var a = base * (1 - far * 0.72) * (0.5 + near * 1.3);
        ctx.globalAlpha = Math.min(0.72, a);
        ctx.fillStyle = near > 0.6 ? hot : color;
        ctx.beginPath();
        ctx.arc(sx, sy, (3.4 / z) * (1 + near * 0.9) + 0.4, 0, 6.283);
        ctx.fill();
      }

      for (var i = 0; i < grid.length; i++) dot(grid[i].x, grid[i].z, 0, 0.46);
      for (var p = 0; p < posts.length; p++) {
        for (var k = 1; k <= posts[p].n; k++) {
          dot(posts[p].x, posts[p].z, k * 0.13, 0.5);
        }
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    }

    function ink() {
      color = css("--ink", "#16151A");
      hot = css("--accent", "#4B2FE0");
    }

    seed();
    size();
    window.addEventListener(
      "resize",
      function () {
        size();
      },
      { passive: true },
    );
    window.addEventListener("astar:theme", ink);
    if (!reduce) {
      window.addEventListener(
        "mousemove",
        function (e) {
          mx = e.clientX / window.innerWidth - 0.5;
          my = e.clientY / window.innerHeight - 0.5;
        },
        { passive: true },
      );
      document.addEventListener("visibilitychange", function () {
        if (document.hidden && raf) {
          cancelAnimationFrame(raf);
          raf = null;
        } else if (!raf) raf = requestAnimationFrame(draw);
      });
      raf = requestAnimationFrame(draw);
    } else {
      draw();
      if (raf) {
        cancelAnimationFrame(raf);
        raf = null;
      }
    }
  }

  /* ------------------------------------------------------------------- boot */
  var header = buildHeader();
  buildFooter();
  initTheme();
  initPalette();
  initScroll(header, initRail());
  initReveal();
  initSpotlight();
  initExplorer();
  initAccordion();
  initFilters();
  initCopy();
  initNewsFeed();
  initPhotos();
  initGallery();
  initCloud();
})();
