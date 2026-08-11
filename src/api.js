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
  const description =
    repo.description || 'No description available.';

   const language = repo.language
   ? `<span class="tech-tag ${repo.language.toLowerCase()}">${repo.language}</span>`
   : '';

  return `
    <article class="project-card repo-card">

      <h3 class="card-title">
        ${repo.name}
      </h3>

      <p class="card-desc">
        ${description}
      </p>

      <div class="card-footer">

        <div>
          ${language}
          <span class="repo-stars">
            ⭐ ${repo.stargazers_count}
          </span>
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