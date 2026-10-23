'use client';

import { useEffect } from 'react';

export function ScrollReveal() {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        }
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -5% 0px',
      },
    );

    function observeSections(node: ParentNode) {
      if (node instanceof Element && node.matches('main > section')) {
        node.classList.add('scroll-reveal');
        observer.observe(node);
      }

      node.querySelectorAll('main > section').forEach((section) => {
        section.classList.add('scroll-reveal');
        observer.observe(section);
      });
    }

    observeSections(document);

    const mutationObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof Element) observeSections(node);
        });
      }
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, []);

  return null;
}
