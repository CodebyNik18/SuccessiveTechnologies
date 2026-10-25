(function () {
    "use strict";
    document.documentElement.classList.add("js");
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const SEL = ".hero .container>div>*,.hero-visual,.note,.feature,.head>*,.filters,.post,.topic,.cta .container>*";
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
    const btns = [...document.querySelectorAll(".filters button")], posts = [...document.querySelectorAll(".post")], count = document.getElementById("count"), empty = document.getElementById("empty");
    function apply(f) {
        let n = 0; posts.forEach(p => { const show = f === "All" || p.dataset.cat === f; p.hidden = !show; if (show) { n++; p.classList.add("is-visible") } });
        btns.forEach(b => b.setAttribute("aria-pressed", String(b.dataset.filter === f))); count.textContent = n + (n === 1 ? " article" : " articles"); empty.hidden = n > 0
    }
    btns.forEach(b => b.addEventListener("click", () => apply(b.dataset.filter))); apply("All");
})();