document.addEventListener('DOMContentLoaded', () => {
  const releaseGrid = document.getElementById('release-grid');
  const downloadStatus = document.getElementById('download-status');

  const versions = [
    '1.21.1', '1.21.2', '1.21.3', '1.21.4', '1.21.5', '1.21.6', '1.21.7', '1.21.8', '1.21.9', '1.21.10', '1.21.11'
  ];
  const modVersion = '1.0.5';

  const loaders = {
    fabric: { label: 'Fabric', className: 'fabric', deps: 'Fabric Loader 0.20.0+ + Fabric API' },
    forge: { label: 'Forge', className: 'forge', deps: 'Forge для этой версии Minecraft' },
    neoforge: { label: 'NeoForge', className: 'neo', deps: 'NeoForge для этой версии Minecraft' }
  };

  const files = Object.fromEntries(versions.map((version) => [version, {
    fabric: `downloads/target-finder-fabric-${version}-${modVersion}.jar`,
    forge: null,
    neoforge: null
  }]));

  versions.forEach((version) => {
    const card = document.createElement('article');
    card.className = 'release-card';

    const title = document.createElement('h3');
    title.textContent = `Minecraft ${version}`;

    const list = document.createElement('div');
    list.className = 'loader-list';

    Object.entries(loaders).forEach(([key, loader]) => {
      const link = document.createElement('a');
      link.className = 'download-link';
      const href = files[version]?.[key];
      const filename = `Target-Finder-Minecraft-${version}-Mod-${modVersion}-${loader.label}.jar`;

      if (href) {
        link.href = href;
        link.download = filename;
        link.dataset.download = 'true';
        link.textContent = loader.label;
      } else {
        link.href = '#';
        link.classList.add('disabled');
        link.setAttribute('aria-disabled', 'true');
        link.textContent = `${loader.label} — скоро`;
      }

      const meta = document.createElement('small');
      meta.textContent = loader.deps;

      const item = document.createElement('div');
      item.className = `loader-item ${loader.className}`;
      item.appendChild(link);
      item.appendChild(meta);
      if (href) {
        const fileName = document.createElement('small');
        fileName.className = 'download-filename';
        fileName.textContent = filename;
        item.appendChild(fileName);
      }
      list.appendChild(item);
    });

    card.appendChild(title);
    card.appendChild(list);
    releaseGrid.appendChild(card);
  });

  releaseGrid.addEventListener('click', (event) => {
    const link = event.target.closest('a[data-download="true"]');
    if (!link) return;

    const filename = link.download || link.textContent.trim();

    if (!filename || !link.href || link.href === '#') {
      event.preventDefault();
      return;
    }

    link.setAttribute('download', filename);
  });

  const animatedCards = document.querySelectorAll('.release-card, .feature-card, .dependency-card');
  animatedCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 80}ms`;
    card.style.animation = 'rise 0.7s ease both';
  });
});
