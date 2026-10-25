(function () {
    "use strict";
    document.documentElement.classList.add("js");
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    /* reveal */
    const els = document.querySelectorAll(".page-hero .container>*,.doc section");
    els.forEach(el => el.classList.add("reveal"));
    if (!reduce && "IntersectionObserver" in window) {
        const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target) } }), { rootMargin: "0px 0px -6% 0px", threshold: .04 });
        els.forEach(el => io.observe(el));
    } else els.forEach(el => el.classList.add("is-visible"));
    /* scroll-spy */
    const links = [...document.querySelectorAll(".toc a")], secs = links.map(a => document.querySelector(a.getAttribute("href")));
    if ("IntersectionObserver" in window) {
        const spy = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { links.forEach(l => l.classList.remove("active")); const i = secs.indexOf(e.target); if (i > -1) links[i].classList.add("active") } }), { rootMargin: "-20% 0px -70% 0px" });
        secs.forEach(s => s && spy.observe(s));
    }
    document.addEventListener("click", e => {
        const a = e.target.closest('.toc a[href^="#"]'); if (!a) return;
        const s = document.querySelector(a.getAttribute("href")); if (!s) return; e.preventDefault();
        s.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" }); history.replaceState(null, "", a.getAttribute("href"))
    });
})();