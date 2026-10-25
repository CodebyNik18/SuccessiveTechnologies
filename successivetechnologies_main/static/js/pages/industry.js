(function () {
    "use strict";
    document.documentElement.classList.add("js");
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const SEL = ".hero .container>div>*,.hero-visual,.head>*,.ind-nav,.ind,.across>*,.across>div>*,.cta .container>*";
    document.querySelectorAll(SEL).forEach(el => {
        el.classList.add("reveal");
        const sibs = [...el.parentElement.children].filter(c => c.matches(SEL));
        el.style.setProperty("--d", Math.min(sibs.indexOf(el), 6) * .08 + "s")
    });
    const rv = document.querySelectorAll(".reveal");
    if (!reduce && "IntersectionObserver" in window) {
        const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target) } }), { rootMargin: "0px 0px -8% 0px", threshold: .06 });
        rv.forEach(el => io.observe(el));
    } else rv.forEach(el => el.classList.add("is-visible"));
    const links = [...document.querySelectorAll(".ind-nav a")], secs = links.map(a => document.querySelector(a.getAttribute("href")));
    if ("IntersectionObserver" in window) { const spy = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { links.forEach(l => l.classList.remove("active")); const i = secs.indexOf(e.target); if (i > -1) links[i].classList.add("active") } }), { rootMargin: "-20% 0px -70% 0px" }); secs.forEach(s => s && spy.observe(s)) }
    links.forEach(a => a.addEventListener("click", e => { const s = document.querySelector(a.getAttribute("href")); if (!s) return; e.preventDefault(); s.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" }); history.replaceState(null, "", a.getAttribute("href")) }));
})();