import { ImageResponse } from "next/og";
import { getEnPostData } from "@/lib/posts-en";

// No "edge" runtime: getEnPostData uses the Node fs module, only available
// in the Node.js runtime.
export const alt = "THE GBR article";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const COLOR_BASE = "#EEF0EC";
const COLOR_INK = "#14171A";
const COLOR_SIGNAL = "#93B300";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getEnPostData(slug);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: COLOR_BASE,
        padding: "80px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div
          style={{
            width: 16,
            height: 16,
            borderRadius: "50%",
            backgroundColor: COLOR_SIGNAL,
            display: "flex",
          }}
        />
        <div
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: COLOR_INK,
            letterSpacing: "-0.02em",
            display: "flex",
          }}
        >
          THE GBR
        </div>
      </div>

      <div
        style={{
          display: "flex",
          fontSize: post.title.length > 60 ? 52 : 64,
          fontWeight: 800,
          color: COLOR_INK,
          lineHeight: 1.15,
          maxWidth: 1000,
          letterSpacing: "-0.02em",
        }}
      >
        {post.title}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          fontSize: 24,
          color: COLOR_INK,
          opacity: 0.55,
        }}
      >
        <span style={{ display: "flex" }}>thegbr.eu/en/writing</span>
        {post.category && (
          <>
            <span style={{ display: "flex" }}>•</span>
            <span style={{ display: "flex" }}>{post.category}</span>
          </>
        )}
      </div>
    </div>,
    { ...size }
  );
}
