/**
 * FrontendTips Menu Web Component
 * A collapsible vertical menu component for OutSystems applications
 * Uses Phosphor Icons from https://phosphoricons.com/
 * 
 * All icons are embedded as SVG - no external dependencies required.
 * Just include this single JavaScript file in your application.
 */

// Icon cache to avoid repeated fetches
const iconCache = new Map();

// Phosphor Icons SVG data (common icons)
const phosphorIcons = {
  'funnel': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><path d="M34.1,61.38A8,8,0,0,1,40,48H216a8,8,0,0,1,5.92,13.38L152,136v58.65a8,8,0,0,1-3.56,6.66l-32,21.33A8,8,0,0,1,104,216V136Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>',
  'gear': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><path d="M41.43,178.09A99.14,99.14,0,0,1,31.36,153.8l16.78-21a81.59,81.59,0,0,1,0-9.64l-16.77-21a99.43,99.43,0,0,1,10.05-24.3l26.71-3a81,81,0,0,1,6.81-6.81l3-26.7A99.14,99.14,0,0,1,102.2,31.36l21,16.78a81.59,81.59,0,0,1,9.64,0l21-16.77a99.43,99.43,0,0,1,24.3,10.05l3,26.71a81,81,0,0,1,6.81,6.81l26.7,3a99.14,99.14,0,0,1,10.07,24.29l-16.78,21a81.59,81.59,0,0,1,0,9.64l16.77,21a99.43,99.43,0,0,1-10,24.3l-26.71,3a81,81,0,0,1-6.81,6.81l-3,26.7a99.14,99.14,0,0,1-24.29,10.07l-21-16.78a81.59,81.59,0,0,1-9.64,0l-21,16.77a99.43,99.43,0,0,1-24.3-10l-3-26.71a81,81,0,0,1-6.81-6.81Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>',
  'house': '<svg width="24" height="24" viewBox="0 0 256 256" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M218.83,103.77l-80-75.48a1.14,1.14,0,0,1-.11-.11,16,16,0,0,0-21.44,0l-.11.11L37.17,103.77A16,16,0,0,0,32,115.55V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V160h32v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V115.55A16,16,0,0,0,218.83,103.77Z"/></svg>',
  'medium-logo': '<svg width="24" height="24" viewBox="0 0 256 256" fill="currentColor" xmlns="http://www.w3.org/2000/svg">< rect width="256" height="256" fill="none" /><circle cx="72" cy="128" r="56" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><ellipse cx="184" cy="128" rx="24" ry="56" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="240" y1="72" x2="240" y2="184" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>',
  'youtube-logo': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><polygon points="160 128 112 96 112 160 160 128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><path d="M24,128c0,29.91,3.07,47.45,5.41,56.47A16,16,0,0,0,39,195.42C72.52,208.35,128,208,128,208s55.48.35,89-12.58a16,16,0,0,0,9.63-10.95c2.34-9,5.41-26.56,5.41-56.47s-3.07-47.45-5.41-56.47a16,16,0,0,0-9.63-11C183.48,47.65,128,48,128,48s-55.48-.35-89,12.58a16,16,0,0,0-9.63,11C27.07,80.54,24,98.09,24,128Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>',
};

// Get Phosphor Icon SVG
function getPhosphorIcon(iconName, size = 24) {
  // Remove 'ph-' prefix if present
  const cleanName = iconName.replace(/^ph-/, '');
  const cacheKey = `${cleanName}-${size}`;

  if (iconCache.has(cacheKey)) {
    return iconCache.get(cacheKey);
  }

  // Check if we have the icon in our predefined set
  if (phosphorIcons[cleanName]) {
    let svg = phosphorIcons[cleanName];
    // Update size if needed
    if (size !== 24) {
      svg = svg.replace(/width="24" height="24"/, `width="${size}" height="${size}"`);
    }
    iconCache.set(cacheKey, svg);
    return svg;
  }

  // Fallback: return a simple circle icon
  const fallback = `<svg width="${size}" height="${size}" viewBox="0 0 256 256" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><circle cx="128" cy="128" r="96"/></svg>`;
  iconCache.set(cacheKey, fallback);
  return fallback;
}

// Wrap class definition in IIFE to prevent global scope pollution
(function () {
  'use strict';

  class FrontendTipsMenu extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      // Initialize with empty items - will be loaded from endpoint or attribute
      this.menuItems = [];
      this.isLoading = false;
      this.hasFetched = false; // Track if we've already fetched to prevent duplicate requests
      this.lastCheckedPath = window.location.pathname; // Track last checked path for URL changes
      this.urlCheckTimeout = null; // Timeout for debouncing URL checks
    }

    static get observedAttributes() {
      return ['items', 'endpoint'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'endpoint' && newValue && newValue !== oldValue) {
        // Endpoint changed, fetch new data
        // Only fetch if component is already connected to avoid duplicate fetch
        if (this.isConnected) {
          this.hasFetched = false; // Reset flag for new endpoint
          this.fetchMenuItems(newValue);
        }
      } else if (name === 'items' && newValue) {
        // Items provided as attribute (fallback)
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
      // Check if endpoint is provided
      const endpoint = this.getAttribute('endpoint');
      if (endpoint) {
        // Fetch menu items from REST endpoint
        this.fetchMenuItems(endpoint);
      } else {
        // Fallback: check if items are provided as attribute
        const itemsAttr = this.getAttribute('items');
        if (itemsAttr) {
          try {
            this.menuItems = JSON.parse(itemsAttr);
            this.render();
            this.attachEventListeners();
            this.loadIcons();
          } catch (e) {
            console.error('Invalid JSON for menu items:', e);
            this.render(); // Render empty menu
          }
        } else {
          // No endpoint or items - render empty menu
          this.render();
        }
      }

      // Add padding to OutSystems screen container if it exists
      this.adjustScreenContainer();

      // Listen for URL changes (for SPA navigation)
      this.setupUrlChangeListener();
    }

    async fetchMenuItems(endpoint) {
      if (!endpoint) {
        console.error('FrontendTipsMenu: No endpoint provided');
        return;
      }

      // Prevent duplicate fetches
      if (this.hasFetched && this.isLoading) {
        return;
      }

      this.hasFetched = true;
      this.isLoading = true;
      this.render(); // Show loading state

      try {
        // Simple GET request without headers to avoid CORS preflight issues
        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Handle different response formats
        // Expected format: array of { icon, label, link, target? } objects
        // Or: { items: [...] } or { data: [...] }
        // target defaults to '_blank' if not provided
        if (Array.isArray(data)) {
          this.menuItems = data;
        } else if (data.items && Array.isArray(data.items)) {
          this.menuItems = data.items;
        } else if (data.data && Array.isArray(data.data)) {
          this.menuItems = data.data;
        } else {
          console.warn('FrontendTipsMenu: Unexpected response format. Expected array or object with items/data property.');
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
        this.render(); // Render empty menu on error
      }
    }

    adjustScreenContainer() {
      // Find container with .active-screen.screen-container class
      const screenContainer = document.querySelector('.active-screen.screen-container');
      if (screenContainer) {
        // Add padding-left to account for the menu
        screenContainer.style.paddingLeft = '60px';
      } else {
        // If container not found, check again after a short delay
        // (in case it's added dynamically)
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

      // Remove leading/trailing slashes for comparison
      const normalizePath = (path) => {
        return path.replace(/^\/+|\/+$/g, '') || '/';
      };

      const normalizedCurrent = normalizePath(currentPath);
      const normalizedLink = normalizePath(itemLink);

      // Exact match
      if (normalizedCurrent === normalizedLink) {
        return true;
      }

      // Check if current path starts with the link path (for nested routes)
      if (normalizedLink !== '/' && normalizedCurrent.startsWith(normalizedLink + '/')) {
        return true;
      }

      // Check if link is a full URL and pathname matches
      try {
        const linkUrl = new URL(itemLink, window.location.origin);
        if (linkUrl.pathname === currentPath) {
          return true;
        }
      } catch (e) {
        // Not a valid URL, continue with path comparison
      }

      return false;
    }

    setupUrlChangeListener() {
      // Listen for popstate events (browser back/forward)
      window.addEventListener('popstate', () => {
        this.render();
        this.attachEventListeners();
        this.loadIcons();
      });

      // For OutSystems/SPA navigation, also check periodically or use MutationObserver
      // This will update active state when navigation occurs
      if (typeof MutationObserver !== 'undefined') {
        // Observe changes to the document that might indicate navigation
        const observer = new MutationObserver(() => {
          // Debounce the check
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
      // Load all icons synchronously (they're now in memory)
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
      // Add click handlers for menu items
      const menuItems = this.shadowRoot.querySelectorAll('.menu-item');
      menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
          const link = item.getAttribute('data-link');
          if (link && link !== '#') {
            // Dispatch custom event for OutSystems to handle navigation
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

        /* Scrollbar styling */
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
                <!-- Icon will be loaded here -->
              </div>
              <span class="menu-label">${item.label || ''}</span>
            </a>
          `;
      }).join('')}
        </div>
      </div>
    `;
    }

    // Public method to set menu items programmatically
    setItems(items) {
      this.menuItems = items;
      this.render();
      this.attachEventListeners();
      this.loadIcons();
    }

    // Public method to get menu items
    getItems() {
      return this.menuItems;
    }

    // Public method to append new menu items
    appendItem(item) {
      if (!item || typeof item !== 'object') {
        console.error('Invalid menu item:', item);
        return false;
      }

      // Validate required properties
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

    // Public method to append multiple menu items
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

  // Register the custom element
  if (!customElements.get('frontendtips-menu')) {
    customElements.define('frontendtips-menu', FrontendTipsMenu);
  }

})(); // End IIFE - class is now scoped and won't pollute global scope

// Global namespace for FrontendTips Menu API
// Execute immediately after class definition to ensure it's available
(function () {
  'use strict';

  // Create the API object
  var FrontendTipsMenuAPI = {
    /**
     * Get the menu component instance
     * @returns {FrontendTipsMenu|null} The menu component or null if not found
     */
    getMenu: function () {
      const menuElement = document.querySelector('frontendtips-menu');
      return menuElement || null;
    },

    /**
     * Append a new menu item
     * @param {Object} item - Menu item object with icon, label, and optional link
     * @param {string} item.icon - Icon name (e.g., 'ph-house' or 'house')
     * @param {string} item.label - Menu item label
     * @param {string} [item.link='#'] - Optional link URL
     * @returns {boolean} True if successful, false otherwise
     * @example
     * FrontendTipsMenu.appendItem({ icon: 'ph-star', label: 'Favorites', link: '/favorites' });
     */
    appendItem: function (item) {
      const menu = this.getMenu();
      if (!menu) {
        console.error('FrontendTipsMenu: Menu component not found. Make sure <frontendtips-menu> exists in the DOM.');
        return false;
      }
      return menu.appendItem(item);
    },

    /**
     * Append multiple menu items at once
     * @param {Array<Object>} items - Array of menu item objects
     * @returns {number} Number of successfully added items
     * @example
     * FrontendTipsMenu.appendItems([
     *   { icon: 'ph-star', label: 'Favorites', link: '/favorites' },
     *   { icon: 'ph-bookmark', label: 'Bookmarks', link: '/bookmarks' }
     * ]);
     */
    appendItems: function (items) {
      const menu = this.getMenu();
      if (!menu) {
        console.error('FrontendTipsMenu: Menu component not found. Make sure <frontendtips-menu> exists in the DOM.');
        return 0;
      }
      return menu.appendItems(items);
    },

    /**
     * Get all current menu items
     * @returns {Array} Array of menu items
     */
    getItems: function () {
      const menu = this.getMenu();
      if (!menu) {
        console.error('FrontendTipsMenu: Menu component not found. Make sure <frontendtips-menu> exists in the DOM.');
        return [];
      }
      return menu.getItems();
    }
  };

  // Expose to global scope - ensure it's set on window
  var globalObj = typeof window !== 'undefined' ? window : (typeof global !== 'undefined' ? global : this);

  // Check if something already exists with this name (like the class)
  if (globalObj.FrontendTipsMenu && typeof globalObj.FrontendTipsMenu === 'function') {
    console.warn('FrontendTipsMenu class already exists in global scope. Overwriting with API object.');
    try {
      delete globalObj.FrontendTipsMenu;
    } catch (e) {
      // Ignore if can't delete
    }
  }

  // Also store a backup reference with a different name
  globalObj.FrontendTipsMenuAPI = FrontendTipsMenuAPI;

  // Force assignment - overwrite anything that might be there
  try {
    // Use defineProperty to make it non-configurable and prevent overwriting
    Object.defineProperty(globalObj, 'FrontendTipsMenu', {
      value: FrontendTipsMenuAPI,
      writable: true,
      configurable: false, // Prevent deletion/overwriting
      enumerable: true
    });

    // Also set directly as backup
    globalObj.FrontendTipsMenu = FrontendTipsMenuAPI;

    // Verify it was set correctly
    if (globalObj.FrontendTipsMenu !== FrontendTipsMenuAPI) {
      console.error('FrontendTipsMenu assignment failed - values do not match');
    } else {
      // Debug: verify it was set correctly
      if (typeof console !== 'undefined' && console.log) {
        var apiKeys = Object.keys(globalObj.FrontendTipsMenu || {});
      }
    }
  } catch (e) {
    console.error('Failed to expose FrontendTipsMenu API:', e);
    // Fallback: try simple assignment
    try {
      globalObj.FrontendTipsMenu = FrontendTipsMenuAPI;
    } catch (e2) {
      console.error('Fallback assignment also failed:', e2);
    }
  }

  // Set up a watcher to detect if FrontendTipsMenu gets overwritten
  if (typeof window !== 'undefined' && window.setInterval) {
    var checkInterval = setInterval(function () {
      if (window.FrontendTipsMenu !== FrontendTipsMenuAPI && typeof window.FrontendTipsMenu === 'function') {
        console.warn('FrontendTipsMenu was overwritten by class! Restoring API...');
        window.FrontendTipsMenu = FrontendTipsMenuAPI;
      }
    }, 100);

    // Stop checking after 5 seconds
    setTimeout(function () {
      clearInterval(checkInterval);
    }, 5000);
  }

})();

