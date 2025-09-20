import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import TitleComponent from 'subComponents/TitleComponent';
import styles from './styles.module.scss';

export const Default = (props) => {
  const fields = props?.fields;
  const { title, titleTag } = fields;
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [isAnimated, setIsAnimated] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [trackWidth, setTrackWidth] = useState(0);
  const logos = isAnimated ? [...fields.ourPartners, ...fields.ourPartners] : fields.ourPartners;

  // Check overflow: if track width > container width -> animate
  useEffect(() => {
    function checkOverflow() {
      const container = containerRef.current;
      const track = trackRef.current;
      if (!container || !track) return;
      const fits = track.scrollWidth <= container.clientWidth + 1;
      setIsOverflowing(!fits);
    }

    checkOverflow();

    const ro = new ResizeObserver(() => checkOverflow());
    if (containerRef.current) ro.observe(containerRef.current);
    if (trackRef.current) {
      ro.observe(trackRef.current);
      const firstHalfWidth = trackRef.current.scrollWidth / 2;
      setTrackWidth(firstHalfWidth);
    }

    window.addEventListener('load', checkOverflow);
    window.addEventListener('resize', checkOverflow);
    return () => {
      ro.disconnect();
      window.removeEventListener('load', checkOverflow);
      window.removeEventListener('resize', checkOverflow);
    };
  }, [logos]);

  // Observe visibility to start animation when it enters viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsVisible(true);
          else setIsVisible(false);
        });
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Start animation only when visible and overflowing
  useEffect(() => {
    setIsAnimated(isVisible && isOverflowing && logos.length > 0);
  }, [isVisible, trackWidth, isOverflowing, logos]);

  const styleVars = {
    ['--scroll-speed']: '30s',
    '--scroll-distance': `${trackWidth}px`,
  };

  return (
    <div ref={containerRef} className={clsx(styles['partners-container'])}>
      {!!title?.value && (
        <TitleComponent field={title} headingTag={titleTag} className={styles['title']} />
      )}
      <div
        ref={trackRef}
        className={clsx(
          styles['partner-logos'],
          isAnimated ? styles['animated-track'] : styles['static-track']
        )}
        style={styleVars}
      >
        {logos.map((partner) => (
          <div className={styles['logo-frame']} key={partner.id}>
            <img src={partner.fields.logo.value.src} alt="Partner 1" />
          </div>
        ))}
      </div>
    </div>
  );
};
