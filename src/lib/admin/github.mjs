const OWNER = 'EXIST-D';
const REPO = 'exist.github.io';
const BRANCH = 'main';

function decodeBase64Utf8(input) {
  const binary = atob(String(input).replace(/\s/g, ''));
  const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function encodeBase64Utf8(input) {
  const bytes = new TextEncoder().encode(String(input));
  let binary = '';
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

function apiUrl(path) {
  return `https://api.github.com${path}`;
}

function authHeaders(token) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
}

async function githubJson(path, token, options = {}) {
  const response = await fetch(apiUrl(path), {
    ...options,
    headers: {
      ...authHeaders(token),
      ...(options.headers ?? {}),
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`GitHub API ${response.status}: ${body}`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export function canEditRepository(user, owner = OWNER) {
  return Boolean(user?.login && user.login.toLowerCase() === owner.toLowerCase());
}

export async function getAuthenticatedUser(token) {
  return githubJson('/user', token);
}

export async function listRepositoryTree(token = null) {
  const headers = token ? { headers: authHeaders(token) } : {};
  const response = await fetch(apiUrl(`/repos/${OWNER}/${REPO}/git/trees/${BRANCH}?recursive=1`), {
    ...headers,
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`GitHub tree API ${response.status}: ${body}`);
  }

  const data = await response.json();
  return Array.isArray(data.tree) ? data.tree : [];
}

export async function loadRepositoryFile(path, token = null) {
  const response = await fetch(apiUrl(`/repos/${OWNER}/${REPO}/contents/${path}?ref=${BRANCH}`), {
    headers: token ? authHeaders(token) : { Accept: 'application/vnd.github+json' },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`GitHub contents API ${response.status}: ${body}`);
  }

  const data = await response.json();
  const content = data.content ? decodeBase64Utf8(data.content) : '';
  return {
    path,
    sha: data.sha,
    content,
  };
}

export async function saveRepositoryFile({ path, content, sha, message, token }) {
  const body = {
    message,
    content: encodeBase64Utf8(content),
    branch: BRANCH,
  };

  if (sha) {
    body.sha = sha;
  }

  return githubJson(`/repos/${OWNER}/${REPO}/contents/${path}`, token, {
    method: 'PUT',
    body: JSON.stringify(body),
  });
}

export { OWNER, REPO, BRANCH };
