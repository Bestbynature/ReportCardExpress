/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  //   serverActions: true,
  // },
  images: {
    remotePatterns: [
      { hostname: 'images.unsplash.com' },
      { hostname: 'cdn.pixabay.com' },
      { hostname: 'lh3.googleusercontent.com' },
      { hostname: 'hldrtxfbavwidzcljwng.supabase.co'}
    ],
  },
};

module.exports = nextConfig;
