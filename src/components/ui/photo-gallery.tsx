import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player/youtube";

interface PhotoGalleryProps {
  media: string[];
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ media }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null); // Tracks the currently playing video
  const playerRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleInteraction = (index: number) => {
    setActiveIndex(index); // Set the active video index
  };

  const clearInteraction = () => {
    setActiveIndex(null); // Clear the active video index to pause all videos
  };
  const activateVideo = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };
  
  const shareVideo = async (videoUrl: string) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check out this video!",
          text: "Watch this amazing video",
          url: videoUrl,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      alert("Sharing is not supported in this browser.");
    }
  };
  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    if (!isMobile) return;
  
    const observers: IntersectionObserver[] = [];
  
    const currentRefs = [...playerRefs.current]; // Copy refs to a local variable

    currentRefs.forEach((ref, index) => {
      if (!ref) return;
  
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting && activeIndex === index) {
            setActiveIndex(null); // Pause when offscreen
          }
        },
        { threshold: 0.25 }
      );
  
      observer.observe(ref);
      observers.push(observer);
    });
  
    return () => {
      observers.forEach((observer, i) => {
        if (currentRefs[i]) observer.unobserve(currentRefs[i]!);
      });
    };
  }, [media, activeIndex]);
  const hoverTimeouts = useRef<{ [key: number]: NodeJS.Timeout }>({});

  
  return (
    <div className="flex flex-wrap gap-6 justify-center p-4">
      {media.map((videoSrc, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.03 }}
          className="overflow-hidden rounded-2xl shadow-md bg-gray-900/55 border border-orange-400 relative hover:border-white flex justify-center items-center hover:shadow-sm hover:shadow-blue-600"
        >
          <div
           ref={(el) => (playerRefs.current[index] = el)}
           onMouseEnter={() => {
            setActiveIndex(null);
             if (window.innerWidth > 768) {
               // Web only: start delayed hover
               hoverTimeouts.current[index] = setTimeout(() => {
                 setActiveIndex(index);
               }, 600); // 1 second
             }
           }}
           onMouseLeave={() => {
            //  if (hoverTimeouts.current[index]) {
               clearTimeout(hoverTimeouts.current[index]);
            //  }
             
           }}
           onClick={() => {
             if (window.innerWidth <= 768) {
               // Mobile only: toggle on click
               setActiveIndex((prev) => (prev === index ? null : index));
             }
           }}
           className="w-[90vw] sm:w-[24rem] h-[70vw] sm:h-[24rem] rounded-2xl overflow-hidden cursor-pointer"
          >
            <ReactPlayer
              url={videoSrc}
              playing={activeIndex === index} // Only play the active video
              muted={false} // Ensure sound is enabled for active videos
              loop={true}
              controls={true}
              width="100%"
              height="100%"
              onPlay={() => handleInteraction(index)} // Track interaction
              config={{
                playerVars: { // ✅ Correct placement under `config`
                  playerVars: {
                    rel: 0,
                    controls: 1,
                    fs: 0,
                    iv_load_policy: 3,
                    cc_load_policy: 0,
                  },
                },
              }}
            />
          </div>
          <button
            onClick={() => shareVideo(videoSrc)}
            className="absolute top-2 right-2 bg-black/80 rounded-full flex items-center justify-center p-2 shadow-lg hover:bg-orange-400 hover:border-black border-white"
          >
            <i className="pi pi-share-alt" style={{ fontSize: "1em", color: "white" }}></i>
          </button>
        </motion.div>
      ))}
    </div>
  );
};

export default PhotoGallery;
