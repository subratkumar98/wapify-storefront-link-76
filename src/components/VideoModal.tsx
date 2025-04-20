
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Play } from 'lucide-react';

interface VideoModalProps {
  children: React.ReactNode;
}

export const VideoModal: React.FC<VideoModalProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl p-0 bg-black overflow-hidden">
        <div className="relative pb-[56.25%] h-0">
          <iframe 
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
            title="Wapify Demo Video"
            className="absolute top-0 left-0 w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const VideoButton: React.FC = () => {
  return (
    <VideoModal>
      <button className="secondary-button inline-flex items-center">
        <Play className="mr-2 h-4 w-4" /> Watch Demo
      </button>
    </VideoModal>
  );
};

export default VideoModal;
