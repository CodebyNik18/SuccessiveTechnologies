/* SuccessiveTechnologies — homepage interactions (vanilla JS, no dependencies) */
(function () {
    "use strict";

    const root = document.documentElement;
    root.classList.add("js");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ---------- Sticky header ---------- */
    const header = document.querySelector("[data-header]");
    const onScroll = () => header && header.classList.toggle("is-scrolled", window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    /* ---------- Mobile menu ---------- */
    const toggle = document.querySelector("[data-menu-toggle]");
    const navList = document.getElementById("nav-list");
    function setMobile(open) {
        if (!toggle) return;
        toggle.setAttribute("aria-expanded", String(open));
        toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
        document.body.classList.toggle("nav-open", open);
    }
    toggle && toggle.addEventListener("click", () => setMobile(toggle.getAttribute("aria-expanded") !== "true"));
    navList && navList.addEventListener("click", (e) => {
        if (e.target.closest("a")) { setMobile(false); closeMenu(); }
    });

    /* ---------- Services dropdown ---------- */
    const trigger = document.querySelector("[data-menu-trigger]");
    const menu = document.querySelector("[data-menu]");
    function openMenu() { if (!menu) return; menu.hidden = false; trigger.setAttribute("aria-expanded", "true"); }
    function closeMenu() { if (!menu) return; menu.hidden = true; trigger.setAttribute("aria-expanded", "false"); }
    if (trigger && menu) {
        trigger.addEventListener("click", (e) => { e.stopPropagation(); menu.hidden ? openMenu() : closeMenu(); });
        document.addEventListener("click", (e) => { if (!menu.contains(e.target)) closeMenu(); });
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                if (!menu.hidden) { closeMenu(); trigger.focus(); }
                setMobile(false);
            }
        });
        menu.addEventListener("focusout", (e) => {
            if (!menu.contains(e.relatedTarget) && e.relatedTarget !== trigger) closeMenu();
        });
    }

    /* ---------- Challenge tabs (WAI-ARIA tabs pattern) ---------- */
    document.querySelectorAll("[data-tabs]").forEach((wrap) => {
        const tabs = Array.from(wrap.querySelectorAll('[role="tab"]'));
        function select(tab, focus) {
            tabs.forEach((t) => {
                const on = t === tab;
                t.setAttribute("aria-selected", String(on));
                t.tabIndex = on ? 0 : -1;
                const panel = document.getElementById(t.getAttribute("aria-controls"));
                if (panel) panel.hidden = !on;
            });
            if (focus) tab.focus();
        }
        tabs.forEach((tab, i) => {
            tab.addEventListener("click", () => select(tab));
            tab.addEventListener("keydown", (e) => {
                let n = null;
                if (e.key === "ArrowDown" || e.key === "ArrowRight") n = (i + 1) % tabs.length;
                if (e.key === "ArrowUp" || e.key === "ArrowLeft") n = (i - 1 + tabs.length) % tabs.length;
                if (e.key === "Home") n = 0;
                if (e.key === "End") n = tabs.length - 1;
                if (n !== null) { e.preventDefault(); select(tabs[n], true); }
            });
        });
    });

    /* ---------- Smooth in-page navigation ---------- */
    document.addEventListener("click", (e) => {
        const a = e.target.closest('a[href^="#"]');
        if (!a) return;
        const id = a.getAttribute("href");
        if (id === "#" || a.hasAttribute("data-placeholder")) { e.preventDefault(); return; }
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
        history.replaceState(null, "", id);
    });

    /* ---------- Reveal on scroll ---------- */
    const reveals = document.querySelectorAll(".reveal");
    if (!reduceMotion && "IntersectionObserver" in window) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach((en) => {
                if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
            });
        }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
        reveals.forEach((el) => io.observe(el));
    } else {
        reveals.forEach((el) => el.classList.add("is-visible"));
    }

    /* ---------- Contact form (frontend validation only) ---------- */
    const form = document.querySelector("[data-contact-form]");
    if (form) {
        const status = form.querySelector(".form-status");
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            let ok = true;
            form.querySelectorAll("input, textarea").forEach((f) => {
                const err = f.parentElement.querySelector(".error");
                let msg = "";
                if (f.validity.valueMissing) msg = "This field is required.";
                else if (f.validity.typeMismatch) msg = "Please enter a valid email address.";
                else if (f.validity.tooShort) msg = "Please add a little more detail.";
                err.textContent = msg;
                f.setAttribute("aria-invalid", msg ? "true" : "false");
                if (msg && ok) { f.focus(); ok = false; }
            });
            status.textContent = ok
                ? "Looks good. This is a demo form — nothing was sent. Connect a backend to enable submission."
                : "";
        });
    }

    /* ---------- Footer year ---------- */
    document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
})();