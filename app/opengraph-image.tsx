import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "JobKonnect - Connect with Your Dream Career";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          backgroundImage: "linear-gradient(to bottom right, #4F46E5, #06B6D4)",
        }}
      >
        <div
          style={{ display: "flex", alignItems: "center", marginBottom: 40 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="120"
            height="120"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          </svg>
          <div
            style={{
              marginLeft: 20,
              color: "white",
              fontSize: 80,
              fontWeight: "bold",
            }}
          >
            JobKonnect
          </div>
        </div>
        <div
          style={{
            color: "white",
            fontSize: 32,
            fontWeight: "normal",
            marginTop: 20,
          }}
        >
          Connect with Your Dream Career
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
