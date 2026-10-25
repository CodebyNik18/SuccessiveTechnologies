(function () {
    "use strict";
    document.addEventListener("click", e => { if (e.target.closest("[data-placeholder]")) e.preventDefault() });

    /* ===== Animations ===== */
    document.documentElement.classList.add("js");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const SEL = ".hero-copy>*,.mission-quote,.mission-text p,#principles .head>*,.principle-list li,#approach .head>*,.stage,#commitments .head>*,.commit,.sticky>*,.exp-list li,#team .head>*,.member,.cta .container>*";
    document.querySelectorAll(SEL).forEach(el => {
        el.classList.add("reveal");
        const sibs = Array.from(el.parentElement.children).filter(c => c.matches(SEL));
        el.style.setProperty("--d", Math.min(sibs.indexOf(el), 6) * 0.08 + "s");
    });
    const reveals = document.querySelectorAll(".reveal");
    if (!reduce && "IntersectionObserver" in window) {
        const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target) } }), { rootMargin: "0px 0px -8% 0px", threshold: .08 });
        reveals.forEach(el => io.observe(el));
    } else reveals.forEach(el => el.classList.add("is-visible"));
    document.addEventListener("click", e => {
        const a = e.target.closest('a[href^="#"]'); if (!a || a.hasAttribute("data-placeholder")) return;
        const id = a.getAttribute("href"); if (id === "#") return;
        const t = document.querySelector(id); if (!t) return;
        e.preventDefault(); t.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" }); history.replaceState(null, "", id);
    });
    const tl = document.querySelector(".timeline"); if (tl) { tl.classList.add("reveal-line"); const o = new IntersectionObserver(e => { if (e[0].isIntersecting) { tl.classList.add("is-visible"); o.disconnect() } }, { threshold: .2 }); o.observe(tl) }
})();