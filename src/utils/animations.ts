interface AnimationOptions {
  duration?: number;
  easing?: string;
  delay?: number;
  threshold?: number;
  once?: boolean;
  rootMargin?: string;
}

class SmoothAnimations {
  private observer: IntersectionObserver | null = null;
  private animatedElements: Set<Element> = new Set();

  // Initialize animation observer
  init(options: AnimationOptions = {}): void {
    const {
      threshold = 0.1,
      rootMargin = '0px',
      once = true
    } = options;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.animateIn(entry.target);
            if (once) {
              this.observer?.unobserve(entry.target);
            }
          } else if (!once) {
            this.animateOut(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    // Find all elements with animation classes
    const animatedSelectors = [
      '[data-animate]',
      '.animate-on-scroll',
      '.fade-in-up',
      '.fade-in',
      '.slide-in-left',
      '.slide-in-right',
      '.zoom-in'
    ];

    animatedSelectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(element => {
        this.observer?.observe(element);
      });
    });
  }

  private animateIn(element: Element): void {
    element.classList.add('animate-in');
    this.animatedElements.add(element);
  }

  private animateOut(element: Element): void {
    element.classList.remove('animate-in');
  }

  // Create staggered animation
  stagger(
    selector: string,
    options: {
      delay?: number;
      staggerDelay?: number;
      animationClass?: string;
    } = {}
  ): void {
    const {
      delay = 0,
      staggerDelay = 100,
      animationClass = 'animate-in'
    } = options;

    const elements = document.querySelectorAll(selector);
    
    elements.forEach((element, index) => {
      element.classList.add('stagger-animation');
      
      setTimeout(() => {
        element.classList.add(animationClass);
      }, delay + (index * staggerDelay));
    });
  }

  // Parallax effect
  parallax(
    element: HTMLElement,
    options: {
      speed?: number;
      perspective?: number;
      axis?: 'vertical' | 'horizontal' | 'both';
    } = {}
  ): () => void {
    const {
      speed = 0.5,
      perspective = 1000,
      axis = 'vertical'
    } = options;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const elementTop = rect.top + scrollTop;
      const windowHeight = window.innerHeight;

      // Calculate parallax effect
      const scrolled = (scrollTop - elementTop + windowHeight) * speed;
      
      if (axis === 'vertical' || axis === 'both') {
        element.style.transform = `translateY(${scrolled}px)`;
      }
      
      if (axis === 'horizontal' || axis === 'both') {
        element.style.transform += ` translateX(${scrolled}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    // Return cleanup function
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }

  // Smooth scroll to element
  scrollTo(
    target: string | HTMLElement,
    options: {
      offset?: number;
      duration?: number;
      easing?: (t: number) => number;
    } = {}
  ): void {
    const {
      offset = 0,
      duration = 1000,
      easing = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
    } = options;

    const targetElement = typeof target === 'string' 
      ? document.querySelector(target)
      : target;

    if (!targetElement) return;

    const startPosition = window.pageYOffset;
    const targetPosition = (targetElement as HTMLElement).offsetTop - offset;
    const distance = targetPosition - startPosition;
    let startTime: number | null = null;

    const animation = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const easeProgress = easing(progress);

      window.scrollTo(0, startPosition + (distance * easeProgress));

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  }

  // Typing animation
  typewriter(
    element: HTMLElement,
    text: string,
    options: {
      speed?: number;
      delay?: number;
      cursor?: boolean;
      cursorChar?: string;
      onComplete?: () => void;
    } = {}
  ): () => void {
    const {
      speed = 50,
      delay = 500,
      cursor = true,
      cursorChar = '|',
      onComplete
    } = options;

    let index = 0;
    let timeoutId: NodeJS.Timeout;
    const originalText = element.textContent || '';

    // Add cursor if enabled
    if (cursor) {
      const cursorElement = document.createElement('span');
      cursorElement.className = 'typing-cursor';
      cursorElement.textContent = cursorChar;
      element.appendChild(cursorElement);
    }

    const type = () => {
      if (index < text.length) {
        element.textContent = text.substring(0, index + 1);
        if (cursor) {
          element.innerHTML += `<span class="typing-cursor">${cursorChar}</span>`;
        }
        index++;
        timeoutId = setTimeout(type, speed);
      } else {
        if (onComplete) onComplete();
      }
    };

    const startTimeout = setTimeout(type, delay);

    // Return cleanup function
    return () => {
      clearTimeout(startTimeout);
      clearTimeout(timeoutId);
      element.textContent = originalText;
    };
  }

  // Hover animation with 3D effect
  create3DHover(
    element: HTMLElement,
    options: {
      perspective?: number;
      intensity?: number;
      transition?: string;
    } = {}
  ): () => void {
    const {
      perspective = 1000,
      intensity = 20,
      transition = 'transform 0.3s ease-out'
    } = options;

    element.style.transition = transition;
    element.style.transformStyle = 'preserve-3d';

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateY = ((x - centerX) / centerX) * intensity;
      const rotateX = ((centerY - y) / centerY) * intensity;
      
      element.style.transform = `
        perspective(${perspective}px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale3d(1.05, 1.05, 1.05)
      `;
    };

    const handleMouseLeave = () => {
      element.style.transform = 'none';
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    // Return cleanup function
    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }

  // Pulse animation
  pulse(
    element: HTMLElement,
    options: {
      duration?: number;
      scale?: number;
      infinite?: boolean;
    } = {}
  ): () => void {
    const {
      duration = 1000,
      scale = 1.1,
      infinite = false
    } = options;

    const keyframes = [
      { transform: 'scale(1)', opacity: 1 },
      { transform: `scale(${scale})`, opacity: 0.8 },
      { transform: 'scale(1)', opacity: 1 }
    ];

    const animation = element.animate(keyframes, {
      duration,
      iterations: infinite ? Infinity : 1,
      easing: 'ease-in-out'
    });

    // Return cleanup function
    return () => {
      animation.cancel();
    };
  }

  // Cleanup all animations
  destroy(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    this.animatedElements.clear();
  }
}

// Default animation instance
const animations = new SmoothAnimations();

export { SmoothAnimations, animations };
