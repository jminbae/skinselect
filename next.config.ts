import type { NextConfig } from "next";

/**
 * 기본: Vercel/로컬 (이미지 최적화 사용).
 * DEPLOY_TARGET=pages: GitHub Pages용 정적 export —
 *   basePath /skinselect + 커스텀 이미지 로더(basePath 수동 프리픽스).
 */
const isPagesExport = process.env.DEPLOY_TARGET === "pages";

const nextConfig: NextConfig = isPagesExport
  ? {
      output: "export",
      basePath: "/skinselect",
      trailingSlash: true,
      images: {
        loader: "custom",
        loaderFile: "./image-loader.js",
      },
    }
  : {
      images: {
        formats: ["image/avif", "image/webp"],
      },
    };

export default nextConfig;
