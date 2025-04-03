import { motion } from "framer-motion";
import { useState } from "react";

interface PhotoGalleryProps {
  media: string[];
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ media }) => {
  const [unmutedIndex, setUnmutedIndex] = useState<number | null>(null);

  // Share functionality (not currently in use but you can integrate it with UI)
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

  return (
   
      <div className="flex flex-wrap gap-8">
        {media.map((videoSrc, index) => (
          <motion.div
            key={index}
            
            whileHover={{ scale: 1.03 }} // Slightly smaller scale effect
            // whileTap={{ scale: 0.95 }}
            className=" overflow-hidden rounded-2xl shadow-md bg-gray-900/55 border-spacing-2 border-orange-400 relative hover:border-white flex justify-center items-center hover:shadow-sm hover:shadow-blue-600"
          >
            <video
              className="w-[20rem]  object-contain rounded-2xl "
              src={videoSrc}
              controls={unmutedIndex === index}
            autoPlay={unmutedIndex === index}
         
            playsInline={unmutedIndex === index}
              muted={unmutedIndex !== index} // Mute when not hovered
              onMouseEnter={() => setUnmutedIndex(index)}
              onMouseLeave={() => setUnmutedIndex(null)}
            />
            {/* Optional: Share button for each video */}
            <button
              onClick={() => shareVideo(videoSrc)}
              className="absolute top-2 right-2 bg-black/80 rounded-full flex items-center justify-center p-2 shadow-lg hover:bg-orange-400 hover:border-black border-white  "
            >
              <i className="pi pi-share-alt " style={{ fontSize: "1em",color:"white" }}></i>
            </button>
          </motion.div>
        ))}
      </div>
   
  );
};

export default PhotoGallery;
