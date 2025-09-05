'use client';

import { useState } from 'react';

export interface GeneratedImage {
  id: string;
  prompt: string;
  imageUrl: string;
  timestamp: number;
  dimensions: string;
  style: string;
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue] as const;
}

export function useImageHistory() {
  const [images, setImages] = useLocalStorage<GeneratedImage[]>('generated-images', []);

  const addImage = (image: Omit<GeneratedImage, 'id' | 'timestamp'>) => {
    const newImage: GeneratedImage = {
      ...image,
      id: crypto.randomUUID(),
      timestamp: Date.now()
    };
    setImages(prev => [newImage, ...prev]);
    return newImage;
  };

  const removeImage = (id: string) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  const clearHistory = () => {
    setImages([]);
  };

  const searchImages = (query: string) => {
    return images.filter(img => 
      img.prompt.toLowerCase().includes(query.toLowerCase())
    );
  };

  return {
    images,
    addImage,
    removeImage,
    clearHistory,
    searchImages
  };
}