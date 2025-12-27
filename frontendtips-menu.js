const iconCache = new Map();

const phosphorIcons = {
  'funnel': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><path d="M34.1,61.38A8,8,0,0,1,40,48H216a8,8,0,0,1,5.92,13.38L152,136v58.65a8,8,0,0,1-3.56,6.66l-32,21.33A8,8,0,0,1,104,216V136Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>',
  'gear': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><path d="M41.43,178.09A99.14,99.14,0,0,1,31.36,153.8l16.78-21a81.59,81.59,0,0,1,0-9.64l-16.77-21a99.43,99.43,0,0,1,10.05-24.3l26.71-3a81,81,0,0,1,6.81-6.81l3-26.7A99.14,99.14,0,0,1,102.2,31.36l21,16.78a81.59,81.59,0,0,1,9.64,0l21-16.77a99.43,99.43,0,0,1,24.3,10.05l3,26.71a81,81,0,0,1,6.81,6.81l26.7,3a99.14,99.14,0,0,1,10.07,24.29l-16.78,21a81.59,81.59,0,0,1,0,9.64l16.77,21a99.43,99.43,0,0,1-10,24.3l-26.71,3a81,81,0,0,1-6.81,6.81l-3,26.7a99.14,99.14,0,0,1-24.29,10.07l-21-16.78a81.59,81.59,0,0,1-9.64,0l-21,16.77a99.43,99.43,0,0,1-24.3-10l-3-26.71a81,81,0,0,1-6.81-6.81Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>',
  'house': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><path d="M218.83,103.77l-80-75.48a1.14,1.14,0,0,1-.11-.11,16,16,0,0,0-21.44,0l-.11.11L37.17,103.77A16,16,0,0,0,32,115.55V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V160h32v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V115.55A16,16,0,0,0,218.83,103.77Z" fill="currentColor"/></svg>',
  'medium-logo': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><circle cx="72" cy="128" r="56" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><ellipse cx="184" cy="128" rx="24" ry="56" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="240" y1="72" x2="240" y2="184" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>',
  'youtube-logo': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><polygon points="160 128 112 96 112 160 160 128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><path d="M24,128c0,29.91,3.07,47.45,5.41,56.47A16,16,0,0,0,39,195.42C72.52,208.35,128,208,128,208s55.48.35,89-12.58a16,16,0,0,0,9.63-10.95c2.34-9,5.41-26.56,5.41-56.47s-3.07-47.45-5.41-56.47a16,16,0,0,0-9.63-11C183.48,47.65,128,48,128,48s-55.48-.35-89,12.58a16,16,0,0,0-9.63,11C27.07,80.54,24,98.09,24,128Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>',
  'user-list': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><path d="M152,80a8,8,0,0,1,8-8h88a8,8,0,0,1,0,16H160A8,8,0,0,1,152,80Zm96,40H160a8,8,0,0,0,0,16h88a8,8,0,0,0,0-16Zm0,48H184a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16Zm-96.25,22a8,8,0,0,1-5.76,9.74,7.55,7.55,0,0,1-2,.26,8,8,0,0,1-7.75-6c-6.16-23.94-30.34-42-56.25-42s-50.09,18.05-56.25,42a8,8,0,0,1-15.5-4c5.59-21.71,21.84-39.29,42.46-48a48,48,0,1,1,58.58,0C129.91,150.71,146.16,168.29,151.75,190ZM80,136a32,32,0,1,0-32-32A32,32,0,0,0,80,136Z" fill="currentColor"/></svg>'
};

function getPhosphorIcon(iconName, size = 24) {
  const cleanName = iconName.replace(/^ph-/, '');
  const cacheKey = `${cleanName}-${size}`;

  if (iconCache.has(cacheKey)) {
    return iconCache.get(cacheKey);
  }

  if (phosphorIcons[cleanName]) {
    let svg = phosphorIcons[cleanName];
    if (size !== 24) {
      svg = svg.replace(/width="24" height="24"/, `width="${size}" height="${size}"`);
    }
    iconCache.set(cacheKey, svg);
    return svg;
  }

  const fallback = `<svg width="${size}" height="${size}" viewBox="0 0 256 256" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><circle cx="128" cy="128" r="96"/></svg>`;
  iconCache.set(cacheKey, fallback);
  return fallback;
}

(function () {
  'use strict';

  class FrontendTipsMenu extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.menuItems = [];
      this.isLoading = false;
      this.hasFetched = false;
      this.lastCheckedPath = window.location.pathname;
      this.urlCheckTimeout = null;
    }

    static get observedAttributes() {
      return ['items', 'endpoint'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'endpoint' && newValue && newValue !== oldValue) {
        if (this.isConnected) {
          this.hasFetched = false;
          this.fetchMenuItems(newValue);
        }
      } else if (name === 'items' && newValue) {
        try {
          this.menuItems = JSON.parse(newValue);
          this.render();
          this.attachEventListeners();
          this.loadIcons();
        } catch (e) {
          console.error('Invalid JSON for menu items:', e);
        }
      }
    }

    connectedCallback() {
      const endpoint = this.getAttribute('endpoint');
      if (endpoint) {
        this.fetchMenuItems(endpoint);
      } else {
        const itemsAttr = this.getAttribute('items');
        if (itemsAttr) {
          try {
            this.menuItems = JSON.parse(itemsAttr);
            this.render();
            this.attachEventListeners();
            this.loadIcons();
          } catch (e) {
            console.error('Invalid JSON for menu items:', e);
            this.render();
          }
        } else {
          this.render();
        }
      }

      this.adjustScreenContainer();
      this.setupUrlChangeListener();
    }

    async fetchMenuItems(endpoint) {
      if (!endpoint) {
        console.error('FrontendTipsMenu: No endpoint provided');
        return;
      }

      if (this.hasFetched && this.isLoading) {
        return;
      }

      this.hasFetched = true;
      this.isLoading = true;
      this.render();

      try {
        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          this.menuItems = data;
        } else if (data.items && Array.isArray(data.items)) {
          this.menuItems = data.items;
        } else if (data.data && Array.isArray(data.data)) {
          this.menuItems = data.data;
        } else {
          console.warn('FrontendTipsMenu: Unexpected response format.');
          this.menuItems = [];
        }

        this.isLoading = false;
        this.render();
        this.attachEventListeners();
        this.loadIcons();
      } catch (error) {
        console.error('FrontendTipsMenu: Failed to fetch menu items:', error);
        this.isLoading = false;
        this.menuItems = [];
        this.render();
      }
    }

    adjustScreenContainer() {
      const screenContainer = document.querySelector('.active-screen.screen-container');
      if (screenContainer) {
        screenContainer.style.paddingLeft = '60px';
      } else {
        const layout = document.querySelector('.layout');
        if (layout) {
          layout.style.paddingLeft = '60px';
          const header = document.querySelector('.header');
          if (header) {
            header.style.paddingLeft = '60px';
          }
        }
        setTimeout(() => {
          const delayedContainer = document.querySelector('.active-screen.screen-container');
          if (delayedContainer) {
            delayedContainer.style.paddingLeft = '60px';
          }
        }, 100);
      }
    }

    isItemActive(item) {
      if (!item || !item.link || item.link === '#') {
        return false;
      }

      const currentPath = window.location.pathname;
      const itemLink = item.link;

      const normalizePath = (path) => {
        return path.replace(/^\/+|\/+$/g, '') || '/';
      };

      const normalizedCurrent = normalizePath(currentPath);
      const normalizedLink = normalizePath(itemLink);

      if (normalizedCurrent === normalizedLink) {
        return true;
      }

      if (normalizedLink !== '/' && normalizedCurrent.startsWith(normalizedLink + '/')) {
        return true;
      }

      try {
        const linkUrl = new URL(itemLink, window.location.origin);
        if (linkUrl.pathname === currentPath) {
          return true;
        }
      } catch (e) {
      }

      return false;
    }

    setupUrlChangeListener() {
      window.addEventListener('popstate', () => {
        this.render();
        this.attachEventListeners();
        this.loadIcons();
      });

      if (typeof MutationObserver !== 'undefined') {
        const observer = new MutationObserver(() => {
          if (this.urlCheckTimeout) {
            clearTimeout(this.urlCheckTimeout);
          }
          this.urlCheckTimeout = setTimeout(() => {
            const currentPath = window.location.pathname;
            if (this.lastCheckedPath !== currentPath) {
              this.lastCheckedPath = currentPath;
              this.render();
              this.attachEventListeners();
              this.loadIcons();
            }
          }, 100);
        });

        observer.observe(document.body, {
          childList: true,
          subtree: true
        });
      }
    }

    loadIcons() {
      this.menuItems.forEach((item, index) => {
        const iconName = item.icon || 'circle';
        const iconSvg = getPhosphorIcon(iconName, 24);
        const iconElement = this.shadowRoot.querySelector(`.menu-icon[data-icon-index="${index}"]`);
        if (iconElement) {
          iconElement.innerHTML = iconSvg;
        }
      });
    }

    attachEventListeners() {
      const menuItems = this.shadowRoot.querySelectorAll('.menu-item');
      menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
          const link = item.getAttribute('data-link');
          if (link && link !== '#') {
            this.dispatchEvent(new CustomEvent('menu-item-clicked', {
              detail: { link, label: item.getAttribute('data-label') },
              bubbles: true
            }));
          }
        });
      });
    }

    render() {
      const iconSize = '24';
      const closedWidth = '60px';
      const expandedWidth = '200px';

      this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          width: ${closedWidth};
          background-color: #1a1a1a;
          color: #ffffff;
          z-index: 1000;
          transition: width 0.3s ease;
          box-shadow: 2px 0 8px rgba(0, 0, 0, 0.2);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        :host(:hover) {
          width: ${expandedWidth};
        }

        .menu-container {
          display: flex;
          flex-direction: column;
          height: 100%;
          padding: 20px 0;
        }

        .menu-items {
          display: flex;
          flex-direction: column;
          flex: 1;
          overflow-y: auto;
          overflow-x: hidden;
        }

        .menu-item {
          display: flex;
          align-items: center;
          padding: 12px 20px;
          text-decoration: none;
          color: #ffffff;
          transition: background-color 0.2s;
          cursor: pointer;
          white-space: nowrap;
          min-height: 48px;
          justify-content: flex-start;
        }

        .menu-item:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }

        .menu-item.active {
          background-color: rgba(255, 255, 255, 0.15);
          border-left: 3px solid #4a9eff;
        }

        .menu-icon {
          flex-shrink: 0;
          width: ${iconSize}px;
          height: ${iconSize}px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: currentColor;
        }

        .menu-icon svg {
          width: 100%;
          height: 100%;
          display: block;
        }

        .menu-label {
          margin-left: 16px;
          font-size: 14px;
          opacity: 0;
          transition: opacity 0.2s ease;
          pointer-events: none;
          white-space: nowrap;
          overflow: hidden;
        }

        :host(:hover) .menu-label {
          opacity: 1;
        }

        .menu-items::-webkit-scrollbar {
          width: 4px;
        }

        .menu-items::-webkit-scrollbar-track {
          background: transparent;
        }

        .menu-items::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 2px;
        }

        .menu-items::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
        
        .loading {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          color: rgba(255, 255, 255, 0.6);
          font-size: 12px;
        }
      </style>
      <div class="menu-container">
        <div class="menu-items">
          ${this.isLoading ? `
            <div class="loading">Loading...</div>
          ` : this.menuItems.length === 0 ? `
            <div class="loading">No menu items</div>
          ` : this.menuItems.map((item, index) => {
        const isActive = this.isItemActive(item);
        return `
            <a class="menu-item${isActive ? ' active' : ''}" 
               data-link="${item.link || '#'}" 
               data-label="${item.label || ''}"
               href="${item.link || '#'}"
               target="${item.target || '_blank'}"
               title="${item.label || ''}">
              <div class="menu-icon" data-icon-index="${index}">
              </div>
              <span class="menu-label">${item.label || ''}</span>
            </a>
          `;
      }).join('')}
        </div>
      </div>
    `;
    }

    setItems(items) {
      this.menuItems = items;
      this.render();
      this.attachEventListeners();
      this.loadIcons();
    }

    getItems() {
      return this.menuItems;
    }

    appendItem(item) {
      if (!item || typeof item !== 'object') {
        console.error('Invalid menu item:', item);
        return false;
      }

      if (!item.icon || !item.label) {
        console.error('Menu item must have icon and label properties');
        return false;
      }

      this.menuItems.push({
        icon: item.icon,
        label: item.label,
        link: item.link || '#',
        target: item.target || '_blank'
      });

      this.render();
      this.attachEventListeners();
      this.loadIcons();
      return true;
    }

    appendItems(items) {
      if (!Array.isArray(items)) {
        console.error('appendItems expects an array');
        return false;
      }

      let successCount = 0;
      items.forEach(item => {
        if (this.appendItem(item)) {
          successCount++;
        }
      });

      return successCount;
    }
  }

  if (!customElements.get('frontendtips-menu')) {
    customElements.define('frontendtips-menu', FrontendTipsMenu);
  }

})();

(function () {
  'use strict';

  var api = {
    getMenu: function () {
      const menuElement = document.querySelector('frontendtips-menu');
      return menuElement || null;
    },

    appendItem: function (item) {
      const menu = this.getMenu();
      if (!menu) {
        console.error('FrontendTipsMenu: Menu component not found.');
        return false;
      }
      return menu.appendItem(item);
    },

    appendItems: function (items) {
      const menu = this.getMenu();
      if (!menu) {
        console.error('FrontendTipsMenu: Menu component not found.');
        return 0;
      }
      return menu.appendItems(items);
    },

    getItems: function () {
      const menu = this.getMenu();
      if (!menu) {
        console.error('FrontendTipsMenu: Menu component not found.');
        return [];
      }
      return menu.getItems();
    }
  };

  var globalObj = typeof window !== 'undefined' ? window : (typeof global !== 'undefined' ? global : this);

  if (globalObj.FrontendTipsMenu && typeof globalObj.FrontendTipsMenu === 'function') {
    try {
      delete globalObj.FrontendTipsMenu;
    } catch (e) {
    }
  }

  try {
    Object.defineProperty(globalObj, 'FrontendTipsMenu', {
      value: api,
      writable: true,
      configurable: false,
      enumerable: true
    });
  } catch (e) {
    console.error('Failed to expose FrontendTipsMenu API:', e);
    try {
      globalObj.FrontendTipsMenu = api;
    } catch (e2) {
      console.error('Fallback assignment also failed:', e2);
    }
  }

})();
