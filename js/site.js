(function () {
  "use strict";

  var FAV_KEY = "tl-fav-builds";
  var currentRole = "全部";

  function escHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/"/g, "&quot;");
  }

  function escAttr(s) {
    return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
  }

  function getFavSet() {
    try {
      var arr = JSON.parse(localStorage.getItem(FAV_KEY) || "[]");
      if (!Array.isArray(arr)) return [];
      return arr.filter(function (n) {
        return typeof n === "number" && n >= 0 && n < builds.length;
      });
    } catch (e) {
      return [];
    }
  }

  function setFavSet(arr) {
    localStorage.setItem(FAV_KEY, JSON.stringify(arr));
  }

  function toggleFavorite(index) {
    var favs = getFavSet();
    var i = favs.indexOf(index);
    if (i === -1) favs.push(index);
    else favs.splice(i, 1);
    setFavSet(favs);
    renderBuilds(document.getElementById("globalSearch") ? document.getElementById("globalSearch").value : "");
    renderPinnedBuilds();
    fillPrintBriefing();
  }

  window.toggleFavorite = toggleFavorite;

  function renderBuilds(keyword) {
    var grid = document.getElementById("buildGrid");
    var empty = document.getElementById("buildEmpty");
    if (!grid || !empty) return;
    var q = (keyword || "").trim().toLowerCase();
    var favs = getFavSet();
    var list = builds.filter(function (item) {
      var rolePass = currentRole === "全部" || item.role.includes(currentRole);
      var text = buildSearchBlob(item);
      return rolePass && (!q || text.includes(q));
    });
    grid.innerHTML = builds
      .map(function (item, buildIndex) {
        var rolePass = currentRole === "全部" || item.role.includes(currentRole);
        var text = buildSearchBlob(item);
        var visible = rolePass && (!q || text.includes(q));
        if (!visible) return "";
        var isFav = favs.indexOf(buildIndex) !== -1;
        return (
          '<article class="card searchable build-card" data-build-index="' +
          buildIndex +
          '" data-keywords="' +
          escAttr(buildSearchBlob(item)) +
          '">' +
          '<div class="build-card-top">' +
          '<h3>' +
          escHtml(item.name) +
          "</h3>" +
          '<button type="button" class="fav-star' +
          (isFav ? " is-on" : "") +
          '" data-build-index="' +
          buildIndex +
          '" aria-pressed="' +
          (isFav ? "true" : "false") +
          '" aria-label="收藏到今日指挥台" title="收藏">★</button>' +
          "</div>" +
          '<div class="weapon-line">' +
          item.weapons
            .map(function (w) {
              return '<span class="weapon">' + escHtml(w) + "</span>";
            })
            .join("") +
          "</div>" +
          "<p>" +
          escHtml(item.summary) +
          "</p>" +
          '<div class="build-meta">' +
          '<div class="meta-box">适合人群<b>' +
          escHtml(item.crowd) +
          "</b></div>" +
          '<div class="meta-box">上手难度<b>' +
          escHtml(item.difficulty) +
          "</b></div>" +
          "</div>" +
          '<div class="build-weapons-detail">' +
          buildWeaponBlocksHtml(item) +
          "</div>" +
          '<div class="tags">' +
          item.role
            .map(function (r) {
              return '<span class="tag gold">' + escHtml(r) + "</span>";
            })
            .join("") +
          item.tags
            .map(function (t) {
              return '<span class="tag blue">' + escHtml(t) + "</span>";
            })
            .join("") +
          "</div></article>"
        );
      })
      .join("");
    empty.style.display = list.length ? "none" : "block";
    grid.querySelectorAll(".fav-star").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        var idx = parseInt(btn.getAttribute("data-build-index"), 10);
        if (!isNaN(idx)) toggleFavorite(idx);
      });
    });
  }

  function renderPinnedBuilds() {
    var host = document.getElementById("pinnedBuilds");
    if (!host) return;
    var favs = getFavSet();
    if (!favs.length) {
      host.innerHTML =
        '<p class="today-empty">尚未收藏构筑。在 <a href="builds.html">构筑库</a> 卡片右上角点星标，会显示在这里（数据存于本机浏览器）。</p>';
      return;
    }
    host.innerHTML = favs
      .map(function (idx) {
        var item = builds[idx];
        if (!item) return "";
        return (
          '<div class="pinned-row">' +
          "<div><strong>" +
          escHtml(item.name) +
          "</strong><span class=\"pinned-meta\">" +
          escHtml(item.weapons.join(" · ")) +
          "</span></div>" +
          '<a class="btn secondary tiny" href="builds.html">去构筑库</a>' +
          "</div>"
        );
      })
      .join("");
  }

  function renderWeeklyGoals() {
    var tbody = document.getElementById("weeklyGoalsBody");
    if (!tbody || typeof weeklyGoals === "undefined") return;
    tbody.innerHTML = weeklyGoals
      .map(function (row) {
        return (
          "<tr><td>" +
          escHtml(row.goal) +
          "</td><td>" +
          escHtml(row.need) +
          "</td><td>" +
          escHtml(row.source) +
          "</td></tr>"
        );
      })
      .join("");
  }

  function renderTodayBossMini() {
    var tbody = document.getElementById("todayBossMini");
    if (!tbody || typeof bosses === "undefined") return;
    tbody.innerHTML = bosses
      .map(function (item) {
        return (
          "<tr><td><strong>" +
          escHtml(item.name) +
          "</strong></td><td>" +
          escHtml(item.time) +
          '</td><td class="today-boss-note">' +
          escHtml(item.value) +
          "</td></tr>"
        );
      })
      .join("");
  }

  function rollNextMs(iso) {
    var t = Date.parse(iso);
    if (isNaN(t)) return null;
    var now = Date.now();
    while (t < now) {
      t += 86400000;
    }
    return t;
  }

    function pad2(n) {
      return (n < 10 ? "0" : "") + n;
    }

    function startCountdown() {
    var el = document.getElementById("todayCountdown");
    if (!el || typeof demoCountdown === "undefined" || !demoCountdown.nextIso) return;
    var titleEl = document.getElementById("todayCountdownTitle");
    if (titleEl) titleEl.textContent = demoCountdown.title;
    var target = rollNextMs(demoCountdown.nextIso);
    if (target == null) {
      el.textContent = "倒计时不可用（请检查 nextIso）。";
      return;
    }
    function tick() {
      var left = target - Date.now();
      if (left <= 0) {
        target = rollNextMs(demoCountdown.nextIso);
        left = target - Date.now();
      }
      var s = Math.floor(left / 1000) % 60;
      var m = Math.floor(left / 60000) % 60;
      var h = Math.floor(left / 3600000) % 24;
      var d = Math.floor(left / 86400000);
      el.textContent =
        (d > 0 ? d + " 天 " : "") +
        pad2(h) +
        ":" +
        pad2(m) +
        ":" +
        pad2(s) +
        "（本地时钟；示例锚点按日顺延）";
    }
    tick();
    setInterval(tick, 1000);
  }

  function fillPrintBriefing() {
    var el = document.getElementById("printBriefingBody");
    if (!el) return;
    var lines = [];
    lines.push("生成时间（本地）：" + new Date().toLocaleString());
    lines.push("");
    lines.push("【待办摘要】");
    try {
      var saved = JSON.parse(localStorage.getItem("tl-mvp-todos") || "{}");
      todos.forEach(function (todo, i) {
        var t = typeof todo === "string" ? { text: todo } : todo;
        lines.push((saved[i] ? "[x]" : "[ ]") + " " + t.text);
      });
    } catch (e) {
      lines.push("（无法读取待办状态）");
    }
    lines.push("");
    lines.push("【收藏构筑】");
    var favs = getFavSet();
    if (!favs.length) lines.push("（无）");
    else
      favs.forEach(function (idx) {
        var b = builds[idx];
        if (b) lines.push("- " + b.name + " · " + b.weapons.join(" + "));
      });
    lines.push("");
    lines.push("【活动占位】");
    if (typeof bosses !== "undefined") {
      bosses.forEach(function (b) {
        lines.push("- " + b.name + " · " + b.time);
      });
    }
    el.innerHTML = lines.map(function (l) {
      return escHtml(l);
    }).join("<br />");
  }

  window.fillPrintBriefing = fillPrintBriefing;

  function exportLocalData() {
    var payload = {
      exportedAt: new Date().toISOString(),
      favorites: getFavSet(),
      todosState: JSON.parse(localStorage.getItem("tl-mvp-todos") || "{}")
    };
    var blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json;charset=utf-8" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "tl-site-local-data.json";
    a.click();
    URL.revokeObjectURL(a.href);
  }

  window.exportLocalData = exportLocalData;

  function injectSiteMeta() {
    if (typeof siteMeta === "undefined") return;
    var txt = "本站内容最后校对：" + siteMeta.lastVerified + "。" + siteMeta.summary;
    document.querySelectorAll("[data-site-meta]").forEach(function (el) {
      el.textContent = txt;
    });
  }

  function updateTzLine() {
    var el = document.getElementById("todayTzLine");
    if (!el) return;
    try {
      el.textContent =
        "浏览器报告时区：" +
        Intl.DateTimeFormat().resolvedOptions().timeZone +
        " · 倒计时与生成时间均按本机本地时钟计算。";
    } catch (e) {
      el.textContent = "使用本机本地时间显示。";
    }
  }

  function initTodayPage() {
    if (!document.getElementById("todayRoot")) return;
    injectSiteMeta();
    updateTzLine();
    renderWeeklyGoals();
    renderTodayBossMini();
    renderPinnedBuilds();
    startCountdown();
    fillPrintBriefing();
  }

  function renderDungeons() {
    var grid = document.getElementById("dungeonGrid");
    if (!grid) return;
    grid.innerHTML = dungeons
      .map(function (item) {
        var kwExtra = (item.instances || [])
          .map(function (d) {
            return (d.nameEn || "") + " " + (d.nameZh || "") + " " + (d.blurb || "");
          })
          .join(" ");
        var instBlock = "";
        if (item.instances && item.instances.length) {
          instBlock =
            '<div class="dungeon-instance-list">' +
            '<h4 class="dungeon-instance-head">游戏内副本（示例链）</h4>' +
            '<ul class="dungeon-instance-ul">' +
            item.instances
              .map(function (d) {
                return (
                  "<li>" +
                  '<a class="dungeon-instance-link" href="' +
                  escAttr(d.page) +
                  '">' +
                  "<span class=\"dungeon-instance-zh\">" +
                  escHtml(d.nameZh) +
                  "</span>" +
                  '<span class="dungeon-instance-en">' +
                  escHtml(d.nameEn) +
                  "</span>" +
                  '<span class="dungeon-instance-meta">' +
                  "Lv." +
                  escHtml(String(d.levelMin)) +
                  " · " +
                  escHtml(d.tier) +
                  "</span>" +
                  "</a></li>"
                );
              })
              .join("") +
            "</ul></div>";
        }
        return (
          '<article class="card searchable" data-keywords="' +
          escAttr(
            item.title + " " + item.level + " " + item.tags.join(" ") + " 副本 地下城 boss 机制 " + kwExtra
          ) +
          '">' +
          "<h3>" +
          escHtml(item.title) +
          "</h3><p>" +
          escHtml(item.summary) +
          '</p><div class="tags"><span class="tag green">' +
          escHtml(item.level) +
          "</span>" +
          item.tags
            .map(function (t) {
              return '<span class="tag">' + escHtml(t) + "</span>";
            })
            .join("") +
          "</div>" +
          instBlock +
          "</article>"
        );
      })
      .join("");
  }

  function renderBosses() {
    var tbody = document.getElementById("bossTable");
    if (!tbody) return;
    tbody.innerHTML = bosses
      .map(function (item) {
        return (
          '<tr class="searchable" data-keywords="' +
          escAttr(item.name + " " + item.type + " boss archboss 活动 时间 掉落 公会") +
          '">' +
          "<td><strong>" +
          escHtml(item.name) +
          "</strong></td><td>" +
          escHtml(item.type) +
          "</td><td>" +
          escHtml(item.time) +
          "</td><td>" +
          escHtml(item.value) +
          "</td></tr>"
        );
      })
      .join("");
  }

  function todoItemHtml(todo, index, saved) {
    var t = typeof todo === "string" ? { text: todo } : todo;
    var inner =
      t.href != null && t.href !== ""
        ? '<a href="' + escAttr(t.href) + '">' + escHtml(t.text) + "</a>"
        : escHtml(t.text);
    return (
      '<label class="todo ' +
      (saved[index] ? "done" : "") +
      '">' +
      '<input type="checkbox" ' +
      (saved[index] ? "checked" : "") +
      ' data-todo-index="' +
      index +
      '" />' +
      "<span>" +
      inner +
      "</span></label>"
    );
  }

  function bindTodoInputs(root) {
    root.querySelectorAll("input[data-todo-index]").forEach(function (input) {
      input.addEventListener("change", function () {
        var i = parseInt(input.getAttribute("data-todo-index"), 10);
        toggleTodo(i, input.checked);
      });
    });
  }

  function renderTodos() {
    var roots = document.querySelectorAll(".todo-root");
    if (!roots.length) return;
    var saved = {};
    try {
      saved = JSON.parse(localStorage.getItem("tl-mvp-todos") || "{}");
    } catch (e) {}
    var html = todos
      .map(function (todo, index) {
        return todoItemHtml(todo, index, saved);
      })
      .join("");
    roots.forEach(function (list) {
      list.innerHTML = html;
      bindTodoInputs(list);
    });
    fillPrintBriefing();
  }

  function toggleTodo(index, checked) {
    var saved = JSON.parse(localStorage.getItem("tl-mvp-todos") || "{}");
    saved[index] = checked;
    localStorage.setItem("tl-mvp-todos", JSON.stringify(saved));
    renderTodos();
  }

  function resetTodos() {
    localStorage.removeItem("tl-mvp-todos");
    renderTodos();
  }

  window.resetTodos = resetTodos;

  function filterSearchables(q) {
    document.querySelectorAll(".searchable").forEach(function (el) {
      var text = (el.innerText + " " + (el.dataset.keywords || "")).toLowerCase();
      el.style.display = !q || text.includes(q) ? "" : "none";
    });
  }

  function initNav() {
    var path = location.pathname.replace(/\/+$/, "") || "/";
    var seg = path.split("/").filter(Boolean).pop() || "index.html";
    var cur = (seg.indexOf(".") === -1 ? "index.html" : seg).toLowerCase();
    document.querySelectorAll(".nav-links a[href], .footer-nav a[href]").forEach(function (a) {
      var href = (a.getAttribute("href") || "").split("/").pop().toLowerCase();
      if (href === cur) a.classList.add("active");
    });
  }

  function initHomeSearch() {
    var gs = document.getElementById("globalSearch");
    if (!gs || document.getElementById("buildGrid")) return;
    gs.addEventListener("input", function () {
      filterSearchables(gs.value.trim().toLowerCase());
    });
    var btn = document.getElementById("homeSearchBtn");
    if (btn) {
      btn.addEventListener("click", function () {
        filterSearchables(gs.value.trim().toLowerCase());
      });
    }
  }

  function initBuildsPage() {
    var grid = document.getElementById("buildGrid");
    if (!grid) return;
    var gs = document.getElementById("globalSearch");
    if (gs) {
      gs.addEventListener("input", function () {
        renderBuilds(gs.value);
      });
    }
    document.querySelectorAll("#buildFilters .chip").forEach(function (btn) {
      btn.addEventListener("click", function () {
        document.querySelectorAll("#buildFilters .chip").forEach(function (b) {
          b.classList.remove("active");
        });
        btn.classList.add("active");
        currentRole = btn.dataset.role || "全部";
        renderBuilds(gs ? gs.value : "");
      });
    });
    var presetQ = "";
    try {
      presetQ = new URLSearchParams(location.search).get("q") || "";
    } catch (e) {}
    if (gs && presetQ) {
      gs.value = presetQ;
      renderBuilds(presetQ);
    } else {
      renderBuilds("");
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    initNav();
    injectSiteMeta();
    initHomeSearch();
    initBuildsPage();
    initTodayPage();
    renderDungeons();
    renderBosses();
    renderTodos();
    fillPrintBriefing();
  });
})();
