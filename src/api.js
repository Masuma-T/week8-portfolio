// Week 8 - GitHub API Module

// Fetch repositories from GitHub
async function fetchRepos(username) {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos`
  );

  if (!response.ok) {
    throw new Error(
      `GitHub request failed: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}


// Create one GitHub repository card
function repoCard(repo) {
  // Only show a description if the repository has one
  const description = repo.description
    ? `<p class="card-desc">${repo.description}</p>`
    : '';

  // Use GitHub's detected language
  let technology = repo.language;

  // Override the language for these two projects
  const repoName = repo.name.toLowerCase();

  if (
    repoName.includes('historical-stock') ||
    repoName.includes('rooftop-solar')
  ) {
    technology = 'Jupyter Notebook';
  }

  // Keep the original language class so your existing CSS works
  const language = technology
    ? `<span class="tech-tag ${technology.toLowerCase().replace(/\s+/g, '-')}">${technology}</span>`
    : '';

  // Only show stars when the repository has stars
  const stars = repo.stargazers_count > 0
    ? `<span class="repo-stars">⭐ ${repo.stargazers_count}</span>`
    : '';

  return `
    <article class="project-card repo-card">

      <h3 class="card-title">
        ${repo.name}
      </h3>

      ${description}

      <div class="card-footer">

        <div>
          ${language}
          ${stars}
        </div>

        <a
          href="${repo.html_url}"
          class="card-link"
          target="_blank"
          rel="noopener noreferrer">
          View on GitHub →
        </a>

      </div>

    </article>
  `;
}

// Render repositories
function renderRepos(repos) {
  const grid = document.getElementById('repo-grid');

  if (!grid) return;

  if (repos.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <p>No repositories found.</p>
        <p>Check back later for new projects.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = repos.map(repoCard).join('');
}


// Initialize GitHub repositories
async function initRepos() {
  const loading = document.getElementById('repos-loading');
  const grid = document.getElementById('repo-grid');

  try {
    if (loading) {
      loading.classList.remove('hidden');
    }

    const repos = await fetchRepos('Masuma-T');

    renderRepos(repos);

  } catch (error) {
    console.error('GitHub API error:', error);

    if (grid) {
      grid.innerHTML = `
        <div class="empty-state">
          <p>Unable to load GitHub repositories.</p>
          <p>Please try again later.</p>
        </div>
      `;
    }

  } finally {
    if (loading) {
      loading.classList.add('hidden');
    }
  }
}


// Export functions for main.js
export {
  fetchRepos,
  repoCard,
  renderRepos,
  initRepos
};