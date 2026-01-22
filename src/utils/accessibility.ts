class Accessibility {
  // Initialize accessibility features
  static init(): void {
    this.enableFocusVisible();
    this.setupSkipLinks();
    this.setupAriaLiveRegions();
  }

  // Enable focus-visible polyfill for better focus styles
  static enableFocusVisible(): void {
    if (typeof window !== 'undefined') {
      // Add focus-visible class on focus
      document.addEventListener('DOMContentLoaded', () => {
        document.body.classList.add('js-focus-visible');
      });

      // Handle keyboard focus
      let hadKeyboardEvent = false;
      const keyboardModalityWhitelist = [
        'input:not([type])',
        'input[type=text]',
        'input[type=email]',
        'input[type=password]',
        'input[type=search]',
        'input[type=tel]',
        'input[type=url]',
        'textarea',
        '[contenteditable]',
        '[tabindex]'
      ];

      document.addEventListener('keydown', () => {
        hadKeyboardEvent = true;
      }, true);

      document.addEventListener('mousedown', () => {
        hadKeyboardEvent = false;
      }, true);

      document.addEventListener(
        'focus',
        (event) => {
          if (hadKeyboardEvent) {
            (event.target as HTMLElement).classList.add('focus-visible');
          }
        },
        true
      );

      document.addEventListener(
        'blur',
        (event) => {
          (event.target as HTMLElement).classList.remove('focus-visible');
        },
        true
      );
    }
  }

  // Setup skip to content links
  static setupSkipLinks(): void {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-to-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.setAttribute('tabindex', '0');
    
    skipLink.style.cssText = `
      position: absolute;
      top: -40px;
      left: 0;
      background: #000;
      color: white;
      padding: 8px 16px;
      z-index: 9999;
      text-decoration: none;
    `;
    
    skipLink.addEventListener('focus', () => {
      skipLink.style.top = '0';
    });
    
    skipLink.addEventListener('blur', () => {
      skipLink.style.top = '-40px';
    });
    
    document.body.prepend(skipLink);
  }

  // Setup ARIA live regions for announcements
  static setupAriaLiveRegions(): void {
    const regions = {
      status: 'polite',
      alert: 'assertive'
    };

    Object.entries(regions).forEach(([id, politeness]) => {
      const region = document.createElement('div');
      region.id = `aria-live-${id}`;
      region.setAttribute('aria-live', politeness);
      region.setAttribute('aria-atomic', 'true');
      region.className = 'sr-only';
      document.body.appendChild(region);
    });
  }

  // Announce to screen readers
  static announce(message: string, type: 'status' | 'alert' = 'status'): void {
    const region = document.getElementById(`aria-live-${type}`);
    if (region) {
      region.textContent = message;
      // Clear after announcement
      setTimeout(() => {
        region.textContent = '';
      }, 1000);
    }
  }

  // Trap focus within an element
  static trapFocus(element: HTMLElement): () => void {
    const focusableElements = element.querySelectorAll(
      'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0] as HTMLElement;
    const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    };

    element.addEventListener('keydown', handleTabKey);

    // Return cleanup function
    return () => {
      element.removeEventListener('keydown', handleTabKey);
    };
  }

  // Validate ARIA attributes
  static validateAria(element: HTMLElement): string[] {
    const errors: string[] = [];
    
    // Check for required ARIA attributes
    const requiredPairs = [
      { attr: 'aria-labelledby', needs: 'id' },
      { attr: 'aria-describedby', needs: 'id' },
      { attr: 'aria-controls', needs: 'id' }
    ];

    requiredPairs.forEach(({ attr, needs }) => {
      if (element.hasAttribute(attr)) {
        const value = element.getAttribute(attr);
        if (value && !document.getElementById(value)) {
          errors.push(`${attr} references non-existent id: ${value}`);
        }
      }
    });

    // Check for invalid ARIA states
    const booleanAttrs = ['aria-hidden', 'aria-disabled', 'aria-readonly', 'aria-required'];
    booleanAttrs.forEach(attr => {
      if (element.hasAttribute(attr)) {
        const value = element.getAttribute(attr);
        if (value !== 'true' && value !== 'false') {
          errors.push(`${attr} must be "true" or "false", got: ${value}`);
        }
      }
    });

    // Check for ARIA role validity
    if (element.hasAttribute('role')) {
      const validRoles = [
        'button', 'link', 'checkbox', 'radio', 'switch',
        'tab', 'tabpanel', 'combobox', 'listbox', 'option',
        'grid', 'gridcell', 'row', 'rowgroup', 'columnheader',
        'rowheader', 'table', 'cell', 'rowgroup', 'row',
        'columnheader', 'rowheader', 'alert', 'alertdialog',
        'dialog', 'status', 'timer', 'log', 'marquee',
        'progressbar', 'scrollbar', 'search', 'separator',
        'slider', 'spinbutton', 'tooltip', 'tree', 'treegrid',
        'treeitem', 'application', 'article', 'banner',
        'complementary', 'contentinfo', 'form', 'heading',
        'main', 'navigation', 'region', 'search'
      ];
      
      const role = element.getAttribute('role');
      if (role && !validRoles.includes(role)) {
        errors.push(`Invalid ARIA role: ${role}`);
      }
    }

    return errors;
  }

  // Generate accessible IDs
  static generateId(prefix: string = 'id'): string {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
  }

  // Make image accessible
  static makeImageAccessible(img: HTMLImageElement, context: string = ''): void {
    if (!img.hasAttribute('alt')) {
      if (img.hasAttribute('aria-hidden') || img.getAttribute('role') === 'presentation') {
        img.setAttribute('alt', '');
      } else {
        console.warn('Image missing alt text:', img.src);
        img.setAttribute('alt', context || 'Decorative image');
      }
    }

    // Add loading="lazy" for better performance
    if (!img.hasAttribute('loading')) {
      img.setAttribute('loading', 'lazy');
    }

    // Add decoding="async" for better performance
    if (!img.hasAttribute('decoding')) {
      img.setAttribute('decoding', 'async');
    }
  }

  // Make button accessible
  static makeButtonAccessible(button: HTMLElement): void {
    if (!button.hasAttribute('type')) {
      button.setAttribute('type', 'button');
    }

    if (!button.hasAttribute('aria-label') && !button.textContent?.trim()) {
      console.warn('Button missing accessible label:', button);
    }
  }

  // Make link accessible
  static makeLinkAccessible(link: HTMLAnchorElement): void {
    if (!link.hasAttribute('aria-label') && !link.textContent?.trim()) {
      console.warn('Link missing accessible text:', link.href);
    }

    // Add external link indicators
    if (link.hostname !== window.location.hostname) {
      link.setAttribute('rel', 'noopener noreferrer');
      link.setAttribute('target', '_blank');
      
      // Add visually hidden text for screen readers
      const srText = document.createElement('span');
      srText.className = 'sr-only';
      srText.textContent = '(opens in new window)';
      link.appendChild(srText);
    }
  }
}

export default Accessibility;
