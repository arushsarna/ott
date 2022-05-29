/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["hey1.b-cdn.net"],
  },
};

module.exports = nextConfig;
// module.exports = {
//   env: {
//     MONGO_URI:
//       "mongodb+srv://demo:demo@cluster0.gjuzy.mongodb.net/ott?retryWrites=true&w=majority",
//   },
// };
