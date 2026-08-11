// Week 8 - Main Module

import './style.css';

import {
  projects,
  renderProjects
} from './projects.js';

import {
  initRepos
} from './api.js';


// ==========================================
// PROJECT FILTERING
// ==========================================

function getFilteredProjects() {

  const activeBtn =
    document.querySelector('.filter-btn.active');

  const activeTech =
    activeBtn
      ? activeBtn.dataset.filter
      : 'all';

  const searchInput =
    document.getElementById('search-input');

  const searchTerm =
    searchInput
      ? searchInput.value.toLowerCase().trim()
      : '';

  return projects.filter(project => {

    const matchesTech =
      activeTech === 'all' ||
      project.tech === activeTech;

    const matchesSearch =
      searchTerm === '' ||
      project.title.toLowerCase().includes(searchTerm) ||
      project.desc.toLowerCase().includes(searchTerm);

    return matchesTech && matchesSearch;
  });
}


// ==========================================
// INITIALIZE PORTFOLIO
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

  console.log('Main.js loaded');
  console.log('Projects:', projects);

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

});