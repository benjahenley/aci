export default function NewsArtwork() {
  return (
    <svg
      viewBox="0 0 240 240"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden>
      <defs>
        <pattern id="news-grid" width="42" height="42" patternUnits="userSpaceOnUse">
          <path d="M42 0H0v42" fill="none" stroke="#F7F4EE" strokeWidth="0.7" opacity="0.16" />
        </pattern>
      </defs>
      <rect width="240" height="240" fill="#1A1A1A" />
      <path
        d="M0 184C42 150 84 158 120 174s78 24 120-12v78H0z"
        fill="#E8262A"
        opacity="0.2"
      />
      <rect width="240" height="240" fill="url(#news-grid)" />
    </svg>
  );
}
