(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function s(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(r){if(r.ep)return;r.ep=!0;const o=s(r);fetch(r.href,o)}})();const c=[{title:"Personal Portfolio",tech:"html",week:1,desc:"Created a personal portfolio using semantic HTML to introduce my background, skills, education, and career goals.",link:"https://masuma-t.github.io/hello-web/"},{title:"Styled Portfolio",tech:"css",week:2,desc:"Improved the portfolio design using CSS, custom properties, typography, spacing, colors, shadows, and hover effects.",link:"https://masuma-t.github.io/hello-web/"},{title:"Portfolio Layout",tech:"css",week:3,desc:"Used Flexbox for navigation and social links and CSS Grid to create a structured layout for the Projects section.",link:"https://masuma-t.github.io/hello-web/"},{title:"Responsive Portfolio",tech:"css",week:4,desc:"Made the portfolio responsive using mobile-first design, media queries, responsive images, and fluid typography.",link:"https://masuma-t.github.io/hello-web/"},{title:"Interactive Quiz App",tech:"javascript",week:5,desc:"Built an interactive quiz application using JavaScript to handle questions, user interactions, scoring, and dynamic updates.",link:"https://masuma-t.github.io/quiz-app/"},{title:"Joke Generator",tech:"javascript",week:6,desc:"Built an interactive joke generator using JavaScript to dynamically fetch and display jokes for the user.",link:"https://github.com/Masuma-T/Joke-Generator"}];function d({title:t,tech:e,week:s,desc:n,link:r}){return`
    <article class="project-card" data-tech="${e}">

      <span class="week-badge">
        Week ${s}
      </span>

      <h3 class="card-title">
        ${t}
      </h3>

      <p class="card-desc">
        ${n}
      </p>

      <div class="card-footer">

        <span class="tech-tag ${e}">
          ${e}
        </span>

        <a
          href="${r}"
          class="card-link"
          target="_blank"
          rel="noopener noreferrer">
          View Demo →
        </a>

      </div>

    </article>
  `}function a(t){const e=document.getElementById("project-grid"),s=document.getElementById("results-count");if(!e){console.error("project-grid was not found.");return}t.length===0?e.innerHTML=`
      <div class="empty-state">
        <p>No projects found.</p>
        <p>Try a different search or filter.</p>
      </div>
    `:e.innerHTML=t.map(d).join(""),s&&(s.textContent=`Showing ${t.length} of ${c.length} projects`)}function l(){const t=document.querySelector(".filter-btn.active"),e=t?t.dataset.filter:"all",s=document.getElementById("search-input"),n=s?s.value.toLowerCase().trim():"";return c.filter(r=>{const o=e==="all"||r.tech===e,i=n===""||r.title.toLowerCase().includes(n)||r.desc.toLowerCase().includes(n);return o&&i})}async function u(t){const e=await fetch(`https://api.github.com/users/${t}/repos`);if(!e.ok)throw new Error(`GitHub request failed: ${e.status} ${e.statusText}`);return e.json()}function p(t){const e=t.description||"No description available.",s=t.language?`<span class="tech-tag ${t.language.toLowerCase()}">${t.language}</span>`:"";return`
    <article class="project-card repo-card">

      <h3 class="card-title">
        ${t.name}
      </h3>

      <p class="card-desc">
        ${e}
      </p>

      <div class="card-footer">

        <div>
          ${s}
          <span class="repo-stars">
            ⭐ ${t.stargazers_count}
          </span>
        </div>

        <a
          href="${t.html_url}"
          class="card-link"
          target="_blank"
          rel="noopener noreferrer">
          View on GitHub →
        </a>

      </div>

    </article>
  `}function f(t){const e=document.getElementById("repo-grid");if(e){if(t.length===0){e.innerHTML=`
      <div class="empty-state">
        <p>No repositories found.</p>
        <p>Check back later for new projects.</p>
      </div>
    `;return}e.innerHTML=t.map(p).join("")}}async function h(){const t=document.getElementById("repo-loading"),e=document.getElementById("repo-grid");try{t&&t.classList.remove("hidden");const s=await u("Masuma-T");f(s)}catch(s){console.error("GitHub API error:",s),e&&(e.innerHTML=`
        <div class="empty-state">
          <p>Unable to load GitHub repositories.</p>
          <p>Please try again later.</p>
        </div>
      `)}finally{t&&t.classList.add("hidden")}}document.addEventListener("DOMContentLoaded",()=>{console.log("Main.js loaded"),console.log("Projects:",c),a(c);const t=document.querySelectorAll(".filter-btn");t.forEach(s=>{s.addEventListener("click",()=>{t.forEach(n=>{n.classList.remove("active")}),s.classList.add("active"),a(l())})});const e=document.getElementById("search-input");e&&(e.addEventListener("input",()=>{a(l())}),e.addEventListener("keydown",s=>{s.key==="Escape"&&(e.value="",a(l()))})),h()});
