interface CDNOptions {
  quality?: number;
  width?: number;
  height?: number;
  format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png';
  fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
}

class CDNOptimizer {
  private cdnBaseUrl: string;
  private fallbackBaseUrl: string;

  constructor(cdnBaseUrl: string = '', fallbackBaseUrl: string = '') {
    this.cdnBaseUrl = cdnBaseUrl;
    this.fallbackBaseUrl = fallbackBaseUrl;
  }

  optimizeImage(
    src: string,
    options: CDNOptions = {}
  ): string {
    if (!src) return '';

    const {
      quality = 80,
      width,
      height,
      format = 'auto',
      fit = 'cover'
    } = options;

    // Check if src is already a CDN URL
    if (src.startsWith('http') && !src.includes(this.cdnBaseUrl) && this.cdnBaseUrl) {
      // Convert to CDN URL
      const url = new URL(src);
      const path = url.pathname;
      return this.buildCDNUrl(path, { quality, width, height, format, fit });
    }

    // If it's already a CDN URL, optimize it
    if (src.includes(this.cdnBaseUrl)) {
      return this.addOptimizationParams(src, { quality, width, height, format, fit });
    }

    // Local image
    if (src.startsWith('/')) {
      if (this.cdnBaseUrl) {
        return this.buildCDNUrl(src, { quality, width, height, format, fit });
      }
      return src;
    }

    return src;
  }

  optimizeVideo(
    src: string,
    options: {
      quality?: 'low' | 'medium' | 'high' | 'auto';
      width?: number;
      height?: number;
    } = {}
  ): string {
    if (!src) return '';

    const { quality = 'auto', width, height } = options;

    if (src.includes('youtube.com') || src.includes('youtu.be')) {
      return this.optimizeYouTubeUrl(src, { quality });
    }

    if (src.includes('vimeo.com')) {
      return this.optimizeVimeoUrl(src, { width, height });
    }

    return src;
  }

  private buildCDNUrl(
    path: string,
    options: CDNOptions
  ): string {
    const params = new URLSearchParams();

    if (options.quality) params.set('q', options.quality.toString());
    if (options.width) params.set('w', options.width.toString());
    if (options.height) params.set('h', options.height.toString());
    if (options.format !== 'auto') params.set('fm', options.format);
    if (options.fit) params.set('fit', options.fit);

    const queryString = params.toString();
    return `${this.cdnBaseUrl}${path}${queryString ? `?${queryString}` : ''}`;
  }

  private addOptimizationParams(
    url: string,
    options: CDNOptions
  ): string {
    const urlObj = new URL(url);
    const params = urlObj.searchParams;

    if (options.quality) params.set('q', options.quality.toString());
    if (options.width) params.set('w', options.width.toString());
    if (options.height) params.set('h', options.height.toString());
    if (options.format !== 'auto') params.set('fm', options.format);
    if (options.fit) params.set('fit', options.fit);

    return urlObj.toString();
  }

  private optimizeYouTubeUrl(
    url: string,
    options: { quality?: 'low' | 'medium' | 'high' | 'auto' }
  ): string {
    const videoId = this.extractYouTubeId(url);
    if (!videoId) return url;

    const qualityParams = {
      low: 'sddefault',
      medium: 'mqdefault',
      high: 'hqdefault',
      auto: 'maxresdefault'
    };

    const quality = options.quality || 'auto';
    return `https://img.youtube.com/vi/${videoId}/${qualityParams[quality]}.jpg`;
  }

  private optimizeVimeoUrl(
    url: string,
    options: { width?: number; height?: number }
  ): string {
    const videoId = this.extractVimeoId(url);
    if (!videoId) return url;

    const { width = 1280, height = 720 } = options;
    return `https://vumbnail.com/${videoId}.jpg?size=${width}x${height}`;
  }

  private extractYouTubeId(url: string): string | null {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
      /youtube\.com\/embed\/([^&\n?#]+)/,
      /youtube\.com\/v\/([^&\n?#]+)/
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }

    return null;
  }

  private extractVimeoId(url: string): string | null {
    const pattern = /vimeo\.com\/(?:channels\/\w+\/)?(\d+)/;
    const match = url.match(pattern);
    return match ? match[1] : null;
  }

  // Generate responsive image srcset
  generateSrcSet(
    src: string,
    sizes: number[] = [320, 640, 768, 1024, 1280, 1536]
  ): string {
    return sizes
      .map(size => `${this.optimizeImage(src, { width: size, quality: 75 })} ${size}w`)
      .join(', ');
  }

  // Generate sizes attribute for responsive images
  generateSizes(
    breakpoints: { minWidth: number; size: string }[] = [
      { minWidth: 1536, size: '1536px' },
      { minWidth: 1280, size: '1280px' },
      { minWidth: 1024, size: '1024px' },
      { minWidth: 768, size: '768px' },
      { minWidth: 640, size: '640px' }
    ]
  ): string {
    return breakpoints
      .map(({ minWidth, size }) => `(min-width: ${minWidth}px) ${size}`)
      .concat(['100vw'])
      .join(', ');
  }
}

// Default instance with Cloudinary CDN (you can change this to your preferred CDN)
const defaultCDN = new CDNOptimizer(
  'https://res.cloudinary.com/demo/image/fetch/',
  '/images/'
);

export { CDNOptimizer, defaultCDN as cdn };
