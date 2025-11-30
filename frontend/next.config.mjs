// next.config.mjs
const isProd = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // output static site
  output: "export",

  // for gh pages
  images: {
    unoptimized: true,
  },

  // If this is a project page (username.github.io/my-repo)
  // set basePath + assetPrefix to "/my-repo"
  basePath: isProd ? "/dpi662-demo" : "",
  assetPrefix: isProd ? "/dpi662-demo/" : "",
};

export default nextConfig;
