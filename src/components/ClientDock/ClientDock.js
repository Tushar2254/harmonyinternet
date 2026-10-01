import { useRef, useState } from 'react';
import './ClientDock.css';

export default function ClientDock({ clients }) {
  const trackRef = useRef(null);
  const [mouseX, setMouseX] = useState(null);

  const handleMouseMove = (e) => {
    setMouseX(e.clientX);
  };

  const handleMouseLeave = () => {
    setMouseX(null);
  };

  const getScale = (el) => {
    if (mouseX === null || !el) return 1;
    const rect = el.getBoundingClientRect();
    const center = rect.left + rect.width / 2;
    const dist = Math.abs(mouseX - center);
    const maxDist = 150;
    if (dist > maxDist) return 1;
    // Subtle dock curve: peak 1.45 at center with a smooth neighbor falloff
    const t = 1 - dist / maxDist;
    return 1 + 0.45 * Math.pow(t, 1.8);
  };

  return (
    <div className="dock-wrap" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <div className="dock-fade-left" />
      <div className="dock-track" ref={trackRef}>
        {[...clients, ...clients].map((c, i) => (
          <DockItem key={i} client={c} mouseX={mouseX} getScale={getScale} />
        ))}
      </div>
      <div className="dock-fade-right" />
    </div>
  );
}

function DockItem({ client, mouseX, getScale }) {
  const ref = useRef(null);
  const scale = getScale(ref.current);

  return (
    <div
      ref={ref}
      className="dock-item"
      style={{ transform: `scale(${scale}) translateY(${scale > 1 ? -((scale - 1) * 28) : 0}px)` }}
    >
      <img src={client.logo} alt={client.name} />
    </div>
  );
}
