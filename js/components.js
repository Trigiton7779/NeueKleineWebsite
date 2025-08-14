async function loadComponent(containerId, url) {
  const container = document.getElementById(containerId);
  if (!container) return;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to load ${url}`);
    container.innerHTML = await res.text();
    if (window.configLoader) {
      window.configLoader.replacePlaceholders();
    }
  } catch (err) {
    console.warn(err);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadComponent('footer-placeholder', 'components/footer.html');
});
