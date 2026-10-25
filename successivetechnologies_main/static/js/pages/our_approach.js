(function () {
    "use strict";
    document.documentElement.classList.add("js");
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const SEL = ".hero .container>div>*,.hero-visual,.head>*,.phase,.cell,.sticky>*,.rhythm li,.model,.cta .container>*";
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
    const r = document.querySelector(".rhythm"); if (r && "IntersectionObserver" in window && !reduce) { const o = new IntersectionObserver(e => { if (e[0].isIntersecting) { r.classList.add("is-visible"); o.disconnect() } }, { threshold: .25 }); o.observe(r) } else if (r) r.classList.add("is-visible");
})();