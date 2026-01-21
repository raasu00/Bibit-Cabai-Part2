export const setupScrollAnimation = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  return observer;
};

export const animateOnScroll = (selector: string) => {
  const elements = document.querySelectorAll(selector);
  const observer = setupScrollAnimation();
  
  elements.forEach((element) => {
    observer.observe(element);
  });
  
  return () => observer.disconnect();
};
