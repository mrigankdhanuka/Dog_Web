import React from 'react';
import { X } from 'lucide-react';

interface ImageModalProps {
  imageUrl: string;
  backgroundColor: string;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ imageUrl, backgroundColor, onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className="relative max-w-4xl w-full mx-4"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>
        <div 
          className="rounded-lg overflow-hidden shadow-2xl"
          style={{ backgroundColor }}
        >
          <img
            src={imageUrl}
            alt="Enlarged dog"
            className="w-full h-auto"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageModal;