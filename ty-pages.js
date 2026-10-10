/* =========================================================
   Tajir Yahya Creative & Co. — NEW PAGES SCRIPT
   reveal · cursor 3D scenes · counters · contact form
   ========================================================= */
(function () {
  const ready = (fn) => document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", fn) : fn();
  ready(() => {
    const page = document.querySelector(".typ-page");
    if (!page) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* reveal */
    if (!reduce && "IntersectionObserver" in window) {
      document.documentElement.classList.add("typ-js");
      const io = new IntersectionObserver((es) => es.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      }), { threshold: .12 });
      page.querySelectorAll(".typ-reveal").forEach((el) => io.observe(el));
      setTimeout(() => page.querySelectorAll(".typ-reveal").forEach((el) => el.classList.add("in")), 2500);
    }

    /* cursor-driven 3D scenes */
    if (!reduce) page.querySelectorAll("[data-scene]").forEach((zone) => {
      const scene = zone.querySelector(".typ-scene");
      if (!scene) return;
      const max = parseFloat(zone.dataset.scene) || 14;
      let raf = null;
      zone.addEventListener("mousemove", (e) => {
        const r = zone.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        if (raf) return;
        raf = requestAnimationFrame(() => {
          scene.style.transform = `rotateX(${-y * max}deg) rotateY(${x * max * 1.4}deg)`;
          raf = null;
        });
      });
      zone.addEventListener("mouseleave", () => { scene.style.transform = ""; });
    });

    /* counters */
    const counters = page.querySelectorAll("[data-count]");
    const run = (el) => {
      const end = +el.dataset.count, suf = el.dataset.suffix || "", t0 = performance.now();
      const tick = (t) => {
        const p = Math.min((t - t0) / 1400, 1), v = Math.round(end * (1 - Math.pow(1 - p, 3)));
        el.textContent = v + suf; if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    if ("IntersectionObserver" in window) {
      const co = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { run(e.target); co.unobserve(e.target); } }), { threshold: .6 });
      counters.forEach((c) => co.observe(c));
    }

    /* office hours (Pakistan time, Mon–Sat 10:00–19:00) */
    const hours = page.querySelector(".typ-hours");
    if (hours) {
      const pk = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Karachi" }));
      const open = pk.getDay() !== 0 && pk.getHours() >= 10 && pk.getHours() < 19;
      hours.classList.toggle("open", open);
      hours.querySelector("span").textContent = open
        ? "We're in the studio right now — replies today."
        : "Studio closed now — we reply on the next working day.";
    }

    /* contact form */
    const form = page.querySelector("#typContactForm");
    if (!form) return;
    const S = window.TY_SITE || {};
    const params = new URLSearchParams(location.search);
    const pre = params.get("service");
    if (pre) {
      const box = form.querySelector(`input[name="services"][value="${pre}"]`);
      if (box) box.checked = true;
    }
    const plan = params.get("plan");
    if (plan) {
      form.querySelector("#typMessage").value = `I'm interested in: ${plan}\n\n`;
      if (!pre) { const u = form.querySelector('input[name="services"][value="unsure"]'); if (u) u.checked = true; }
    }

    const setErr = (field, on) => field.closest(".typ-field").classList.toggle("err", on);
    const validate = () => {
      let ok = true;
      const name = form.querySelector("#typName"), email = form.querySelector("#typEmail"),
            phone = form.querySelector("#typPhone"), msg = form.querySelector("#typMessage"),
            consent = form.querySelector("#typConsent");
      const checks = [
        [name, name.value.trim().length >= 2],
        [email, /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())],
        [phone, phone.value.replace(/\D/g, "").length >= 10],
        [msg, msg.value.trim().length >= 10],
      ];
      checks.forEach(([f, good]) => { setErr(f, !good); if (!good) ok = false; });
      const svc = form.querySelectorAll('input[name="services"]:checked').length > 0;
      form.querySelector("#typServicesField").classList.toggle("err", !svc); if (!svc) ok = false;
      form.querySelector("#typConsentField").classList.toggle("err", !consent.checked); if (!consent.checked) ok = false;
      return ok;
    };
    form.addEventListener("input", (e) => { const f = e.target.closest(".typ-field"); if (f) f.classList.remove("err"); });

    const summary = () => {
      const d = new FormData(form);
      const svc = d.getAll("services").map((v) => form.querySelector(`input[value="${v}"]`).dataset.label).join(", ");
      return [
        "New project enquiry — Tajir Yahya Creative & Co.",
        "",
        "Name: " + d.get("name"),
        "Email: " + d.get("email"),
        "Phone / WhatsApp: " + d.get("phone"),
        d.get("company") ? "Company: " + d.get("company") : "",
        d.get("website") ? "Website / social: " + d.get("website") : "",
        "Services: " + svc,
        "Budget: " + d.get("budget"),
        "Timeline: " + d.get("timeline"),
        "Preferred contact: " + d.get("contact"),
        d.get("source") ? "Heard about us: " + d.get("source") : "",
        "",
        "Project details:",
        d.get("message"),
      ].filter((l) => l !== "").join("\n").replace("Services:", "\nServices:");
    };

    const success = page.querySelector(".typ-success");
    const showSuccess = (sent) => {
      const text = summary();
      success.querySelector("[data-send-wa]").href = "https://wa.me/" + (S.whatsapp || "") + "?text=" + encodeURIComponent(text);
      success.querySelector("[data-send-mail]").href = "mailto:" + (S.email || "") + "?subject=" + encodeURIComponent("Project enquiry from " + new FormData(form).get("name")) + "&body=" + encodeURIComponent(text);
      success.querySelector("h3").textContent = sent ? "Enquiry sent — thank you!" : "Your enquiry is ready to send";
      success.querySelector("p").textContent = sent
        ? "We received your details and will reply within one working day. Want a faster answer? Message us on WhatsApp too."
        : "Choose how you'd like to send it — WhatsApp is the fastest way to reach our team. Your details are already filled in.";
      form.hidden = true; success.classList.add("show");
      success.scrollIntoView({ behavior: "smooth", block: "center" });
    };

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!validate()) { const first = form.querySelector(".err"); if (first) first.scrollIntoView({ behavior: "smooth", block: "center" }); return; }
      const btn = form.querySelector("button[type=submit]");
      if (S.formEndpoint) {
        btn.disabled = true; btn.textContent = "Sending…";
        try {
          const res = await fetch(S.formEndpoint, { method: "POST", headers: { Accept: "application/json" }, body: new FormData(form) });
          showSuccess(res.ok);
        } catch (err) { showSuccess(false); }
        btn.disabled = false; btn.textContent = "Send Enquiry ↗";
      } else {
        showSuccess(false);
      }
    });
    page.querySelector("[data-reset-form]").addEventListener("click", () => {
      form.reset(); form.hidden = false; success.classList.remove("show");
    });
  });
})();

/* ===== pricing tabs + monthly/quarterly billing (web + graphic pages) ===== */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-tabs]").forEach((tabs) => {
    const root = tabs.closest("section");
    tabs.querySelectorAll("[data-tab]").forEach((btn) => btn.addEventListener("click", () => {
      tabs.querySelectorAll("[data-tab]").forEach((b) => { b.classList.toggle("on", b === btn); b.setAttribute("aria-selected", b === btn); });
      root.querySelectorAll("[data-panel]").forEach((p) => { p.hidden = p.dataset.panel !== btn.dataset.tab; });
      root.querySelectorAll(".typ-reveal").forEach((el) => el.classList.add("in"));
    }));
  });
  document.querySelectorAll("[data-billing]").forEach((sw) => {
    const panel = sw.parentElement;
    sw.querySelectorAll("[data-bill]").forEach((btn) => btn.addEventListener("click", () => {
      const q = btn.dataset.bill === "q";
      sw.querySelectorAll("[data-bill]").forEach((b) => b.classList.toggle("on", b === btn));
      panel.querySelectorAll(".amt-val[data-m]").forEach((v) => { v.textContent = q ? v.dataset.q : v.dataset.m; });
      panel.querySelectorAll(".amt-unit").forEach((u) => { u.textContent = q ? "/ month, billed quarterly" : "/ month"; });
      const note = panel.querySelector("[data-bill-note]");
      if (note) note.textContent = q ? "Billed every 3 months in one payment — you save 10% compared with monthly billing." : "Billed every month. Cancel or change plan with 30 days' notice.";
    }));
  });
});
