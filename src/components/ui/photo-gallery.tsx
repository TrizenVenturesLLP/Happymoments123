import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface PhotoGalleryProps {
  media: string[];
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ media }) => {
  const [unmutedIndex, setUnmutedIndex] = useState<number | null>(null);

  function setVideo(index: number) {

    setUnmutedIndex(index);
    videoRefs.current[index]?.play().catch(() => {});
    if (videoRefs.current[index]) {
      videoRefs.current[index].muted = false;
    }
    
  }
  function pauseVideo(index: number) {

    setUnmutedIndex(index);
    videoRefs.current[index]?.pause();
    if (videoRefs.current[index]) {
      videoRefs.current[index].muted = true;
    }
    
  }
  // Create refs for all video elements
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

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
    // Mobile detection
    const isMobile = window.innerWidth <= 768;
  
    if (!isMobile) return; // Exit early on desktop
  
    const observers: IntersectionObserver[] = [];
  
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
  
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
            video.muted = false;
          } else {
            video.pause();
            video.muted = true;
          }
        },
        { threshold: 0.25 }
      );
  
      observer.observe(video);
      observers.push(observer);
    });
  
    return () => {
      observers.forEach((observer, index) => {
        const video = videoRefs.current[index];
        if (video) observer.unobserve(video);
      });
    };
  }, [media]);
  
  return (
    <div className="flex flex-wrap gap-8 justify-center">
      {media.map((videoSrc, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.03 }}
          className="overflow-hidden rounded-2xl shadow-md bg-gray-900/55 border border-orange-400 relative hover:border-white flex justify-center items-center hover:shadow-sm hover:shadow-blue-600"
        >
          <video
            ref={(el) => (videoRefs.current[index] = el)}
            className="w-[20rem] object-contain rounded-2xl"
            src={videoSrc}
            controls={unmutedIndex === index}
            autoPlay={unmutedIndex === index}
            
            muted={unmutedIndex !== index}
            onMouseEnter={() => setVideo(index)}
            onMouseLeave={() => pauseVideo(index)}
          />
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
