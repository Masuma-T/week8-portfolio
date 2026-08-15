// Week 8 - Main Module

import './style.css';

import {
  projects,
  renderProjects,
  getFilteredProjects
} from './projects.js';

import {
  initRepos
} from './api.js';


// ==========================================
// INITIALIZE PORTFOLIO
// ==========================================

document.addEventListener('DOMContentLoaded', () => {


  // Show all projects
  renderProjects(projects);


  // ==========================================
  // FILTER BUTTONS
  // ==========================================

  const filterButtons =
    document.querySelectorAll('.filter-btn');

  filterButtons.forEach(btn => {

    btn.addEventListener('click', () => {

      filterButtons.forEach(button => {
        button.classList.remove('active');
      });

      btn.classList.add('active');

      renderProjects(getFilteredProjects());
    });

  });


  // ==========================================
  // SEARCH
  // ==========================================

  const searchInput =
    document.getElementById('search-input');

  if (searchInput) {

    searchInput.addEventListener('input', () => {
      renderProjects(getFilteredProjects());
    });


    // Escape clears search
    searchInput.addEventListener('keydown', (event) => {

      if (event.key === 'Escape') {

        searchInput.value = '';

        renderProjects(getFilteredProjects());
      }

    });

  }


  // ==========================================
  // GITHUB REPOSITORIES
  // ==========================================

  initRepos();

  // ==========================
// DARK MODE
// ==========================

const themeToggle =
  document.getElementById('theme-toggle');

if (themeToggle) {

  themeToggle.addEventListener('click', () => {

    document.body.classList.toggle('dark-mode');

    themeToggle.textContent =
      document.body.classList.contains('dark-mode')
        ? '☀️'
        : '🌙';

  });

}

});

function initTypingEffect() {
    const typingText = document.querySelector(".typing-text");

    if (!typingText) return;

    const words = [
        "Engineer",
        "Data Enthusiast",
        "Web Developer"
    ];

    let wordIndex = 0;
    let characterIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            characterIndex--;
        } else {
            characterIndex++;
        }

        typingText.textContent = currentWord.substring(
            0,
            characterIndex
        );

        let speed = isDeleting ? 60 : 100;

        if (!isDeleting && characterIndex === currentWord.length) {
            speed = 1500;
            isDeleting = true;
        }

        if (isDeleting && characterIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            speed = 400;
        }

        setTimeout(type, speed);
    }

    type();
}

initTypingEffect();