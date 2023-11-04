/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'images.unsplash.com' },
      { hostname: 'cdn.pixabay.com' },
      { hostname: 'lh3.googleusercontent.com' },
      { hostname: 'hldrtxfbavwidzcljwng.supabase.co' },
    ],
  },
  compiler: { 
    styledComponents: true 
  },
};

module.exports = nextConfig;
