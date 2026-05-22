export function Sparkline({ data, className = "" }: { data: number[]; className?: string }) {
  const width = 160;
  const height = 48;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((value - min) / range) * height;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={className} aria-hidden="true">
      <polyline fill="none" stroke="#2563eb" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" points={points} />
    </svg>
  );
}
