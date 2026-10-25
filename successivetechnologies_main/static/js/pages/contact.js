(function () {
    "use strict";

    /* Placeholder links */
    document.addEventListener("click", e => { const a = e.target.closest("[data-placeholder]"); if (a) e.preventDefault() });

    /* Form: frontend validation only */
    const form = document.querySelector("[data-contact-form]");
    const status = form.querySelector(".form-status");
    const btn = form.querySelector('button[type="submit"]');
    form.addEventListener("submit", e => {
        e.preventDefault();
        if (form.website.value) return; /* honeypot */
        let ok = true;
        form.querySelectorAll("input[required],textarea[required]").forEach(f => {
            const err = f.parentElement.querySelector(".error");
            let msg = "";
            if (f.validity.valueMissing) msg = "This field is required.";
            else if (f.validity.typeMismatch) msg = "Enter a valid email address, like name@company.com.";
            else if (f.validity.tooShort) msg = "Add a little more detail (at least " + f.minLength + " characters).";
            err.textContent = msg; f.setAttribute("aria-invalid", msg ? "true" : "false");
            if (msg && ok) { f.focus(); ok = false }
        });
        status.className = "form-status";
        if (!ok) { status.textContent = "Please fix the highlighted fields."; return }
        /* TODO: replace with fetch("/api/contact", {method:"POST", body:new FormData(form)}) */
        btn.disabled = true;
        setTimeout(() => {
            btn.disabled = false;
            status.className = "form-status ok";
            status.textContent = "Thanks. This is a demo, so nothing was sent. Connect a backend to enable submission.";
        }, 600);
    });
    form.addEventListener("input", e => {
        if (e.target.getAttribute("aria-invalid") === "true" && e.target.validity.valid) {
            e.target.setAttribute("aria-invalid", "false");
            const err = e.target.parentElement.querySelector(".error"); if (err) err.textContent = "";
        }
    });

    /* ===== Animations ===== */
    document.documentElement.classList.add("js");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const SEL = ".page-hero .container>*,.contact-form,.channels li,.aside h2,.steps li,.faq-grid>div:first-child>*,details";
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
    const st = document.querySelector(".steps"); if (st) { const o = new IntersectionObserver(e => { if (e[0].isIntersecting) { st.classList.add("is-visible"); o.disconnect() } }, { threshold: .2 }); o.observe(st) }
})();