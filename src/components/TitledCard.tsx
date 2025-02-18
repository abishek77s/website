import type { SpringOptions } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { X } from "lucide-react";

interface TiltedCardProps {
  imageSrc: React.ComponentProps<"img">["src"];
  altText?: string;
  captionText?: string;
  containerHeight?: React.CSSProperties["height"];
  containerWidth?: React.CSSProperties["width"];
  imageHeight?: React.CSSProperties["height"];
  imageWidth?: React.CSSProperties["width"];
  scaleOnHover?: number;
  rotateAmplitude?: number;
  showTooltip?: boolean;
  overlayContent: React.ReactNode;
  displayOverlayContent?: boolean;
  heading?: string;
  paragraph?: string;
}

const springValues: SpringOptions = {
  damping: 30,
  stiffness: 100,
  mass: 2,
};

export default function TiltedCard({
  imageSrc,
  altText = "Tilted card image",
  captionText = "",
  containerHeight = "600px",
  containerWidth = "100%",
  imageHeight = "600px",
  imageWidth = "500px",
  scaleOnHover = 1.1,
  rotateAmplitude = 14,
  showTooltip = true,
  overlayContent = null,
  displayOverlayContent = true,
  heading = "Card Heading",
  paragraph = "This is a sample paragraph that describes the content of this card in more detail.",
}: TiltedCardProps) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  const opacity = useSpring(0);
  const rotateFigcaption = useSpring(0, {
    stiffness: 350,
    damping: 30,
    mass: 1,
  });
  console.log("Overlay Content:", overlayContent);

  const [lastY, setLastY] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isExpanded]);

  function handleMouse(e: React.MouseEvent<HTMLElement>) {
    if (!ref.current || isExpanded) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

    rotateX.set(rotationX);
    rotateY.set(rotationY);

    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);

    const velocityY = offsetY - lastY;
    rotateFigcaption.set(-velocityY * 0.6);
    setLastY(offsetY);
  }

  function handleMouseEnter() {
    if (!isExpanded) {
      scale.set(scaleOnHover);
      opacity.set(1);
    }
  }

  function handleMouseLeave() {
    if (!isExpanded) {
      opacity.set(0);
      scale.set(1);
      rotateX.set(0);
      rotateY.set(0);
      rotateFigcaption.set(0);
    }
  }

  function handleClick(e: React.MouseEvent) {
    if (!isExpanded) {
      setIsExpanded(true);
      rotateX.set(0);
      rotateY.set(0);
    }
  }

  function handleClose(e: React.MouseEvent) {
    e.stopPropagation();
    setIsExpanded(false);
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <>
      <figure
        ref={ref}
        className="relative w-full h-full [perspective:800px] flex flex-col items-center justify-center"
        style={{
          height: containerHeight,
          width: containerWidth,
        }}
        onMouseMove={handleMouse}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        <motion.div
          className="relative [transform-style:preserve-3d] cursor-pointer"
          style={{
            width: imageWidth,
            height: imageHeight,
            rotateX,
            rotateY,
            scale,
          }}
        >
          <motion.img
            src={imageSrc}
            alt={altText}
            className="absolute top-0 left-0 object-cover rounded-[15px] will-change-transform [transform:translateZ(0)]"
            style={{
              width: "100%",
              height: "100%",
            }}
          />

          {displayOverlayContent && overlayContent && !isExpanded && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center w-full h-full z-[2] will-change-transform [transform:translateZ(30px)]"
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              {overlayContent}
            </motion.div>
          )}
        </motion.div>

        {showTooltip && !isExpanded && (
          <motion.figcaption
            className="pointer-events-none absolute left-0 top-0 rounded-[4px] bg-white px-[10px] py-[4px] text-[10px] text-[#2d2d2d] opacity-0 z-[3]"
            style={{
              x,
              y,
              opacity,
              rotate: rotateFigcaption,
            }}
          >
            {captionText}
          </motion.figcaption>
        )}
      </figure>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 w-screen h-screen overflow-hidden"
          >
            {/* Blurred background */}
            <motion.div
              className="absolute inset-0 z-0"
              initial={{ filter: "blur(0px)", scale: 1 }}
              animate={{ filter: "blur(20px)", scale: 1.1 }}
              style={{
                backgroundImage: `url(${imageSrc})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />

            {/* Content overlay */}
            <motion.div
              className="absolute inset-0 bg-black/40 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />

            {/* Main content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative h-full w-full flex items-center justify-center p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full max-w-6xl flex flex-col lg:flex-row items-center gap-8">
                <div className="w-full lg:w-1/2">
                  <motion.img
                    src={imageSrc}
                    alt={altText}
                    className="w-full h-auto rounded-[15px] shadow-2xl"
                    initial={{ scale: 1 }}
                    animate={{ scale: 1 }}
                  />
                </div>
                <div className="w-full lg:w-1/2 text-white">
                  <h2 className="text-4xl font-bold mb-6">{heading}</h2>
                  <p className="text-lg leading-relaxed">{paragraph}</p>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="absolute top-6 right-6 text-white p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
              >
                <X size={32} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
