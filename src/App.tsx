import React, { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import ImageCard from './components/ImageCard';
import ImageModal from './components/ImageModal';
import LoadingSkeleton from './components/LoadingSkeleton';

interface DogImage {
  url: string;
  backgroundColor: string;
}

function App() {
  const [images, setImages] = useState<DogImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<DogImage | null>(null);

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const promises = Array(12).fill(null).map(async () => {
          const response = await fetch('https://dog.ceo/api/breeds/image/random');
          const data = await response.json();
          return {
            url: data.message,
            backgroundColor: '#ffffff'
          };
        });

        const results = await Promise.all(promises);
        setImages(results);

        // Load from localStorage if available
        const savedColors = localStorage.getItem('dogGalleryColors');
        if (savedColors) {
          const colors = JSON.parse(savedColors);
          setImages(prev => prev.map((img, i) => ({
            ...img,
            backgroundColor: colors[i] || '#ffffff'
          })));
        }
      } catch (err) {
        setError('Failed to fetch dog images. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDogs();
  }, []);

  // Save colors to localStorage when they change
  useEffect(() => {
    const colors = images.map(img => img.backgroundColor);
    localStorage.setItem('dogGalleryColors', JSON.stringify(colors));
  }, [images]);

  const handleColorChange = (index: number, color: string) => {
    setImages(prev => prev.map((img, i) => 
      i === index ? { ...img, backgroundColor: color } : img
    ));
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-red-50 text-red-700 p-4 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Dog Gallery
        </h1>
        
        {loading ? (
          <LoadingSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {images.map((image, index) => (
              <ImageCard
                key={image.url}
                imageUrl={image.url}
                backgroundColor={image.backgroundColor}
                onColorChange={(color) => handleColorChange(index, color)}
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
        )}

        {selectedImage && (
          <ImageModal
            imageUrl={selectedImage.url}
            backgroundColor={selectedImage.backgroundColor}
            onClose={() => setSelectedImage(null)}
          />
        )}
      </div>
    </div>
  );
}

export default App;