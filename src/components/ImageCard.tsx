import React from 'react';
import { Palette } from 'lucide-react';

interface ImageCardProps {
  imageUrl: string;
  backgroundColor: string;
  onColorChange: (color: string) => void;
  onClick: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({
  imageUrl,
  backgroundColor,
  onColorChange,
  onClick,
}) => {
  return (
    <div 
      className="relative group rounded-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl"
      style={{ backgroundColor }}
    >
      <img
        src={imageUrl}
        alt="Dog"
        className="w-full h-full object-cover aspect-square"
        loading="lazy"
      />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-30">
        <button
          onClick={onClick}
          className="bg-white px-4 py-2 rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
        >
          View Larger
        </button>
      </div>
      <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="bg-white p-2 rounded-lg shadow-lg flex items-center gap-2">
          <Palette className="w-4 h-4" />
          <input
            type="color"
            value={backgroundColor}
            onChange={(e) => onColorChange(e.target.value)}
            className="w-6 h-6 cursor-pointer"
            aria-label="Choose background color"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageCard;