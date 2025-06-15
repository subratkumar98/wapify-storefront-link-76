
import React, { useState, useRef } from 'react';
import { Button } from './ui/button';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void;
  currentImage?: string;
  label: string;
  aspectRatio?: string;
  maxSize?: number; // in MB
}

const ImageUpload: React.FC<ImageUploadProps> = ({ 
  onImageUpload, 
  currentImage, 
  label, 
  aspectRatio = "aspect-square",
  maxSize = 2 
}) => {
  const { toast } = useToast();
  const [preview, setPreview] = useState<string>(currentImage || '');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (file.size > maxSize * 1024 * 1024) {
      toast({
        title: "File too large",
        description: `Please select a file smaller than ${maxSize}MB`,
        variant: "destructive"
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreview(result);
      onImageUpload(result);
      toast({
        title: "Image uploaded!",
        description: "Your image has been uploaded successfully",
      });
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files[0]) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.[0]) {
      handleFileSelect(files[0]);
    }
  };

  const removeImage = () => {
    setPreview('');
    onImageUpload('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div
        className={`${aspectRatio} relative border-2 border-dashed rounded-xl transition-all duration-200 ${
          isDragging
            ? 'border-blue-400 bg-blue-50'
            : preview
            ? 'border-green-300 bg-green-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
      >
        {preview ? (
          <div className="relative w-full h-full">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover rounded-lg"
            />
            <Button
              size="sm"
              variant="destructive"
              className="absolute top-2 right-2 h-6 w-6 p-0"
              onClick={removeImage}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ) : (
          <div
            className="flex flex-col items-center justify-center h-full cursor-pointer p-6"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-10 w-10 text-gray-400 mb-3" />
            <p className="text-sm text-gray-600 text-center">
              Drag & drop or click to upload
            </p>
            <p className="text-xs text-gray-500 mt-1">
              PNG, JPG up to {maxSize}MB
            </p>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default ImageUpload;
