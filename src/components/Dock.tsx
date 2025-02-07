import { useState, useEffect, useCallback } from "react";
import { useSpring, animated, useSprings } from "@react-spring/web";

type Position = "bottom" | "top" | "left" | "right";

interface DockProps {
  position?: Position;
  collapsible?: boolean;
  responsive?: Position;
}

const DOCK_ITEMS = ["Home", "Events", "About", "Contact"];

const Dock = ({
  position = "bottom",
  collapsible = false,
  responsive = "bottom",
}: DockProps) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [isDockVisible, setDockVisible] = useState(!collapsible);
  const [currentPosition, setCurrentPosition] = useState<Position>(position);

  const getTranslateValue = useCallback(
    (position: Position, isHovered: boolean) => {
      if (!isHovered) return "translateX(0px) translateY(0px)";

      const translations = {
        left: "translateX(5px) translateY(0px)",
        right: "translateX(-5px) translateY(0px)",
        top: "translateX(0px) translateY(5px)",
        bottom: "translateX(0px) translateY(-5px)",
      };
      return translations[position];
    },
    []
  );

  const [springs, api] = useSprings(
    DOCK_ITEMS.length,
    (index) => ({
      scale: 1,
      translate: "translateX(0px) translateY(0px)",
      config: { tension: 200, friction: 15 },
    }),
    [currentPosition]
  );

  useEffect(() => {
    api.start((index) => {
      const isHovered = index === hoverIndex;

      return {
        scale: isHovered ? 1.4 : 1, // Only scale the hovered element
        translate: getTranslateValue(currentPosition, isHovered),
        immediate: false,
      };
    });
  }, [hoverIndex, currentPosition, api, getTranslateValue]);

  const handleMouseEnter = useCallback((index: number) => {
    setHoverIndex(index);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoverIndex(null);
  }, []);

  const handleParentMouseEnter = useCallback(() => {
    if (collapsible) setDockVisible(true);
  }, [collapsible]);

  const handleParentMouseLeave = useCallback(() => {
    if (collapsible) setDockVisible(false);
  }, [collapsible]);

  useEffect(() => {
    const updatePosition = () => {
      setCurrentPosition(
        responsive && window.innerWidth <= 768 ? responsive : position
      );
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, [position, responsive]);

  const getDockStyle = useCallback((position: Position): string => {
    const styles = {
      left: "flex-col items-start justify-center h-full left-4",
      right: "flex-col items-end justify-center h-full right-4",
      top: "flex-row items-start justify-center w-full top-4",
      bottom: "flex-row items-end justify-center w-full bottom-4",
    };
    return styles[position] || styles.bottom;
  }, []);

  const visibilitySpring = useSpring({
    opacity: isDockVisible ? 1 : 0,
    config: { tension: 120, friction: 14 },
  });

  return (
    <div
      className={`absolute w-full h-full pointer-events-none flex ${getDockStyle(
        currentPosition
      )}`}
      onMouseEnter={handleParentMouseEnter}
      onMouseLeave={handleParentMouseLeave}
    >
      <animated.div
        className="flex pointer-events-auto border border-white/[0.11] p-3 rounded-[20px] transition-all duration-200 ease-out"
        style={visibilitySpring}
      >
        {springs.map((springs, index) => (
          <animated.div
            key={DOCK_ITEMS[index]}
            className="bg-[#060606]/25 m-[5px] w-auto min-w-[80px] h-[50px] px-4 rounded-[10px] border border-white/[0.11] flex relative z-0 text-base items-center justify-center transition-all duration-100 ease-out cursor-pointer pointer-events-auto hover:z-[2] hover:bg-[#111] hover:transition-colors hover:duration-300 text-white"
            style={{
              transform: springs.scale.to(
                (s) => `${springs.translate.get()} scale(${s})`
              ),
            }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {DOCK_ITEMS[index]}
          </animated.div>
        ))}
      </animated.div>
    </div>
  );
};

export default Dock;
