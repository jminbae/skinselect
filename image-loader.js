/**
 * GitHub Pages 정적 export용 이미지 로더 (DEPLOY_TARGET=pages일 때만 활성).
 * public/ 자산은 basePath가 자동 적용되지 않으므로 수동 프리픽스.
 * 경로형 환경변수는 Git Bash의 MSYS 경로 변환에 오염되므로 상수 사용.
 */
const BASE_PATH = "/skinselect";

export default function imageLoader({ src }) {
  if (src.startsWith("/")) return `${BASE_PATH}${src}`;
  return src;
}
