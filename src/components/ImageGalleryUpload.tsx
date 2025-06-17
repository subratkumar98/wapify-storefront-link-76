import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Label } from './ui/label';
import { Upload, X, Plus } from 'lucide-react';

interface ImageGalleryUploadProps {
  label: string;
  images: string[];
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
  aspectRatio?: string;
}

const ImageGalleryUpload: React.FC<ImageGalleryUploadProps> = ({
  label,
  images,
  onImagesChange,
  maxImages = 5,
  aspectRatio = "aspect-[3/1]"
}) => {
  const [draggedOver, setDraggedOver] = useState(false);

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;
    
    const remainingSlots = maxImages - images.length;
    const filesToProcess = Math.min(files.length, remainingSlots);
    
    for (let i = 0; i < filesToProcess; i++) {
      const file = files[i];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newImage = e.target?.result as string;
          onImagesChange([...images, newImage]);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDraggedOver(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDraggedOver(true);
  };

  const handleDragLeave = () => {
    setDraggedOver(false);
  };

  return (
    <div className="space-y-3">
      <Label className="text-base font-medium">{label}</Label>
      
      {/* Existing Images */}
      {images.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {images.map((image, index) => (
            <Card key={index} className="relative group">
              <CardContent className="p-2">
                <div className={`${aspectRatio} relative overflow-hidden rounded-md`}>
                  <img 
                    src={image} 
                    alt={`${label} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Upload Area */}
      {images.length < maxImages && (
        <Card 
          className={`border-2 border-dashed transition-colors ${
            draggedOver ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <CardContent className="p-6">
            <div className="text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">
                  Drop images here or click to upload
                </p>
                <p className="text-xs text-gray-500">
                  {images.length}/{maxImages} images uploaded
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => {
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.multiple = true;
                  input.accept = 'image/*';
                  input.onchange = (e) => {
                    const target = e.target as HTMLInputElement;
                    handleFileUpload(target.files);
                  };
                  input.click();
                }}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Images
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ImageGalleryUpload;
