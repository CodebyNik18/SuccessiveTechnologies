/* SuccessiveTechnologies — shared header + footer behaviour (vanilla JS)
   Load at the end of <body>:  <script src="shared/site.js" defer></script> */
(function () {
    "use strict";

    const MOBILE_BP = 960;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ---------- Sticky header state ---------- */
    const header = document.querySelector("[data-header]");
    const onScroll = () => header && header.classList.toggle("is-scrolled", window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    /* ---------- Mobile menu ---------- */
    const toggle = document.querySelector("[data-menu-toggle]");
    const navList = document.getElementById("nav-list");
    const trigger = document.querySelector("[data-menu-trigger]");
    const menu = document.querySelector("[data-menu]");

    function setMobile(open) {
        if (!toggle) return;
        toggle.setAttribute("aria-expanded", String(open));
        toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
        document.body.classList.toggle("nav-open", open);
    }

    /* ---------- Services dropdown ---------- */
    function placeMenu() {
        if (!menu) return;
        menu.style.left = "";
        if (window.innerWidth <= MOBILE_BP) return;
        const r = menu.getBoundingClientRect();
        const over = r.right - (window.innerWidth - 16);
        if (over > 0) menu.style.left = "calc(-1rem - " + Math.ceil(over) + "px)";
    }
    function openMenu() {
        if (!menu || !trigger) return;
        menu.hidden = false;
        trigger.setAttribute("aria-expanded", "true");
        placeMenu();
    }
    function closeMenu() {
        if (!menu || !trigger) return;
        menu.hidden = true;
        menu.style.left = "";
        trigger.setAttribute("aria-expanded", "false");
    }

    toggle && toggle.addEventListener("click", () => setMobile(toggle.getAttribute("aria-expanded") !== "true"));
    navList && navList.addEventListener("click", (e) => {
        if (e.target.closest("a")) { setMobile(false); closeMenu(); }
    });

    if (trigger && menu) {
        trigger.addEventListener("click", (e) => { e.stopPropagation(); menu.hidden ? openMenu() : closeMenu(); });
        document.addEventListener("click", (e) => { if (!menu.contains(e.target)) closeMenu(); });
        menu.addEventListener("focusout", (e) => {
            if (window.innerWidth <= MOBILE_BP) return;
            if (!menu.contains(e.relatedTarget) && e.relatedTarget !== trigger) closeMenu();
        });
    }
    document.addEventListener("keydown", (e) => {
        if (e.key !== "Escape") return;
        if (menu && !menu.hidden) { closeMenu(); trigger && trigger.focus(); }
        setMobile(false);
    });
    window.addEventListener("resize", () => {
        if (window.innerWidth > MOBILE_BP) setMobile(false);
        if (menu && !menu.hidden) placeMenu();
    });

    /* ---------- Mark the current page in the nav ---------- */
    const here = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".primary-nav a.nav-link").forEach((a) => {
        const href = a.getAttribute("href") || "";
        if (href && !href.includes("#") && href === here) a.setAttribute("aria-current", "page");
    });

    /* ---------- Placeholder links + same-page smooth scroll ---------- */
    document.addEventListener("click", (e) => {
        const a = e.target.closest("a");
        if (!a) return;
        if (a.hasAttribute("data-placeholder") || a.getAttribute("href") === "#") { e.preventDefault(); return; }
        /* turn "index.html#services" into a smooth scroll when already on index.html */
        const url = new URL(a.href, location.href);
        const same = url.pathname === location.pathname && url.hash && url.origin === location.origin;
        if (!same) return;
        const target = document.querySelector(url.hash);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
        history.replaceState(null, "", url.hash);
    });

    /* ---------- Footer year ---------- */
    document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
})();