// Week 8 - Projects Module

const projects = [
  {
    title: 'Personal Portfolio',
    tech: 'html',
    week: 1,
    desc: 'Created a personal portfolio using semantic HTML to introduce my background, skills, education, and career goals.',
    link: 'https://masuma-t.github.io/hello-web/'
  },
  {
    title: 'Styled Portfolio',
    tech: 'css',
    week: 2,
    desc: 'Improved the portfolio design using CSS, custom properties, typography, spacing, colors, shadows, and hover effects.',
    link: 'https://masuma-t.github.io/hello-web/'
  },
  {
    title: 'Portfolio Layout',
    tech: 'css',
    week: 3,
    desc: 'Used Flexbox for navigation and social links and CSS Grid to create a structured layout for the Projects section.',
    link: 'https://masuma-t.github.io/hello-web/'
  },
  {
    title: 'Responsive Portfolio',
    tech: 'css',
    week: 4,
    desc: 'Made the portfolio responsive using mobile-first design, media queries, responsive images, and fluid typography.',
    link: 'https://masuma-t.github.io/hello-web/'
  },
  {
    title: 'Interactive Quiz App',
    tech: 'javascript',
    week: 5,
    desc: 'Built an interactive quiz application using JavaScript to handle questions, user interactions, scoring, and dynamic updates.',
    link: 'https://masuma-t.github.io/quiz-app/'
  }
];

function projectCard({ title, tech, week, desc, link }) {
  return `
    <article class="project-card" data-tech="${tech}">

      <span class="week-badge">
        Week ${week}
      </span>

      <h3 class="card-title">
        ${title}
      </h3>

      <p class="card-desc">
        ${desc}
      </p>

      <div class="card-footer">

        <span class="tech-tag ${tech}">
          ${tech}
        </span>

        <a
          href="${link}"
          class="card-link"
          target="_blank"
          rel="noopener noreferrer">
          View Demo →
        </a>

      </div>

    </article>
  `;
}

function renderProjects(list) {
  const grid = document.getElementById('project-grid');
  const resultsCount = document.getElementById('results-count');

  if (!grid) {
    console.error('project-grid was not found.');
    return;
  }

  if (list.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <p>No projects found.</p>
        <p>Try a different search or filter.</p>
      </div>
    `;
  } else {
    grid.innerHTML = list.map(projectCard).join('');
  }

  if (resultsCount) {
    resultsCount.textContent =
      `Showing ${list.length} of ${projects.length} projects`;
  }
}


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


export {
  projects,
  projectCard,
  renderProjects,
  getFilteredProjects
};