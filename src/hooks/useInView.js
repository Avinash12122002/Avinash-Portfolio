import { useEffect, useRef, useState } from 'react';

/**
 * useInView — fires once when the element enters the viewport.
 * @param {object} options — IntersectionObserver options
 * @returns {{ ref, isInView }}
 */
export function useInView(options = {}) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px', ...options }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, isInView };
}

/**
 * useTyping — cycling typewriter effect
 * @param {string[]} words
 * @param {{ typeSpeed, deleteSpeed, pauseMs }} opts
 */
export function useTyping(words, opts = {}) {
  const { typeSpeed = 90, deleteSpeed = 50, pauseMs = 2200 } = opts;
  const [text, setText] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx];
    const speed = deleting ? deleteSpeed : typeSpeed;

    const timer = setTimeout(() => {
      if (!deleting) {
        if (text.length < word.length) {
          setText(word.slice(0, text.length + 1));
        } else {
          setTimeout(() => setDeleting(true), pauseMs);
        }
      } else {
        if (text.length > 0) {
          setText(text.slice(0, -1));
        } else {
          setDeleting(false);
          setWordIdx((i) => (i + 1) % words.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [text, deleting, wordIdx, words, typeSpeed, deleteSpeed, pauseMs]);

  return text;
}

/**
 * useScrollProgress — scroll progress 0–100
 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return progress;
}

/**
 * useCounter — animated number counter
 * @param {number} end
 * @param {boolean} start
 * @param {number} duration ms
 */
export function useCounter(end, start = false, duration = 1800) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // easeOutQuart
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(end);
    };
    requestAnimationFrame(step);
  }, [start, end, duration]);

  return count;
}
