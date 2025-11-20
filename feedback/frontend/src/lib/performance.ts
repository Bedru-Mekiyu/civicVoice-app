/**
 * Performance utilities for Ethiopian Civic Voice platform
 */

// Debounce function for search inputs
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for scroll events
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Format file size for uploads
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

// Image compression for feedback attachments
export async function compressImage(
  file: File,
  maxWidth: number = 1920,
  quality: number = 0.8
): Promise<File> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: file.type,
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            } else {
              reject(new Error('Image compression failed'));
            }
          },
          file.type,
          quality
        );
      };

      img.onerror = () => reject(new Error('Failed to load image'));
    };

    reader.onerror = () => reject(new Error('Failed to read file'));
  });
}

// LocalStorage with size management
export const storage = {
  // Get item with error handling
  get(key: string, defaultValue: any = null): any {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading from localStorage: ${key}`, error);
      return defaultValue;
    }
  },

  // Set item with quota management
  set(key: string, value: any): boolean {
    try {
      const serialized = JSON.stringify(value);
      
      // Check if we're approaching quota
      const estimatedSize = new Blob([serialized]).size;
      if (estimatedSize > 5 * 1024 * 1024) {
        // Over 5MB, clean old data
        this.cleanup();
      }

      localStorage.setItem(key, serialized);
      return true;
    } catch (error) {
      if (error instanceof Error && error.name === 'QuotaExceededError') {
        console.warn('localStorage quota exceeded, cleaning up...');
        this.cleanup();
        try {
          localStorage.setItem(key, JSON.stringify(value));
          return true;
        } catch {
          return false;
        }
      }
      console.error(`Error writing to localStorage: ${key}`, error);
      return false;
    }
  },

  // Remove item
  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing from localStorage: ${key}`, error);
    }
  },

  // Cleanup old data (keep only last 30 days of feedback)
  cleanup(): void {
    try {
      const feedback = this.get('civic_voice_feedback', []);
      const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
      
      const recentFeedback = feedback.filter((item) => {
        const createdAt = new Date(item.createdAt).getTime();
        return createdAt > thirtyDaysAgo;
      });

      this.set('civic_voice_feedback', recentFeedback);
    } catch (error) {
      console.error('Error during localStorage cleanup', error);
    }
  },
};

// Measure component render time (development only)
export function measureRender(componentName: string) {
  if (process.env.NODE_ENV === 'development') {
    return {
      start: () => performance.mark(`${componentName}-start`),
      end: () => {
        performance.mark(`${componentName}-end`);
        performance.measure(
          componentName,
          `${componentName}-start`,
          `${componentName}-end`
        );
        const measure = performance.getEntriesByName(componentName)[0];
        console.log(`${componentName} render time:`, measure.duration.toFixed(2), 'ms');
      },
    };
  }
  return { start: () => {}, end: () => {} };
}
