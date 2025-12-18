'use client';

import {
  motion,
  AnimatePresence
} from 'motion/react';
import React, { useRef, useState, useCallback } from 'react';

export type DockItemData = {
  icon: React.ReactNode;
  label: React.ReactNode;
  onClick: () => void;
  className?: string;
};

export type DockProps = {
  items: DockItemData[];
  className?: string;
  distance?: number;
  panelHeight?: number;
  baseItemSize?: number;
  dockHeight?: number;
  magnification?: number;
  spring?: { mass?: number; stiffness?: number; damping?: number };
};

function DockItem({
  children,
  className = '',
  onClick,
  mouseX,
  distance,
  magnification,
  baseItemSize
}: {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  mouseX: number;
  distance: number;
  magnification: number;
  baseItemSize: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [scale, setScale] = useState(1);

  React.useEffect(() => {
    if (!ref.current) return;

    const updateScale = () => {
      if (!ref.current || mouseX === Infinity) {
        setScale(1);
        return;
      }

      const rect = ref.current.getBoundingClientRect();
      
      // Only scale if mouse is actually over this item (within its bounds)
      const isMouseOverItem = mouseX >= rect.left && mouseX <= rect.right;
      
      if (!isMouseOverItem) {
        setScale(1);
        return;
      }
      
      // Calculate scale based on how close mouse is to center of item
      const centerX = rect.left + rect.width / 2;
      const mouseDistance = Math.abs(mouseX - centerX);
      const maxDistance = rect.width / 2; // Distance from center to edge
      
      // Scale factor: 1 at center, 0 at edge
      const scaleFactor = 1 - (mouseDistance / maxDistance);
      // Scale up proportionally, max scale when mouse is at center
      const targetScale = 1 + (magnification / baseItemSize) * scaleFactor;
      
      setScale(Math.max(1, targetScale));
    };

    updateScale();
  }, [mouseX, magnification, baseItemSize]);

  return (
    <div
      ref={ref}
      style={{
        width: baseItemSize,
        height: baseItemSize,
        transform: `scale(${scale})`,
        transformOrigin: 'center',
        transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center rounded-full bg-[#060010] border-neutral-700 border-2 shadow-md cursor-pointer ${className}`}
      role="button"
      tabIndex={0}
    >
      {React.Children.map(children, child =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement<{ isHovered?: boolean }>, { isHovered })
          : child
      )}
    </div>
  );
}

function DockLabel({ children, className = '', isHovered }: { className?: string; children: React.ReactNode; isHovered?: boolean }) {
  return (
    <AnimatePresence>
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: -10 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.2 }}
          className={`${className} absolute -top-6 left-1/2 -translate-x-1/2 w-fit whitespace-pre rounded-md border border-neutral-700 bg-[#060010] px-2 py-0.5 text-xs text-white pointer-events-none`}
          role="tooltip"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DockIcon({ children, className = '' }: { className?: string; children: React.ReactNode }) {
  return <div className={`flex items-center justify-center ${className}`}>{children}</div>;
}

export default function Dock({
  items,
  className = '',
  magnification = 40,
  distance = 150,
  panelHeight = 64,
  dockHeight = 256,
  baseItemSize = 50
}: DockProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouseX, setMouseX] = useState(Infinity);
  const rafRef = useRef<number | null>(null);
  const lastMouseXRef = useRef<number>(0);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    // Throttle updates
    const currentX = e.clientX;
    if (Math.abs(currentX - lastMouseXRef.current) < 3) {
      return;
    }
    lastMouseXRef.current = currentX;

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      setMouseX(e.clientX);
      rafRef.current = null;
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    setMouseX(Infinity);
  }, []);

  return (
    <div 
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50"
    >
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`${className} flex items-end w-fit gap-4 rounded-2xl border-neutral-700 border-2 pb-2 px-4 bg-[#060010]/80 backdrop-blur-md`}
        style={{ height: panelHeight }}
        role="toolbar"
        aria-label="Application dock"
      >
        {items.map((item, index) => (
          <DockItem
            key={index}
            onClick={item.onClick}
            className={item.className}
            mouseX={mouseX}
            distance={distance}
            magnification={magnification}
            baseItemSize={baseItemSize}
          >
            <DockIcon>{item.icon}</DockIcon>
            <DockLabel>{item.label}</DockLabel>
          </DockItem>
        ))}
      </div>
    </div>
  );
}
