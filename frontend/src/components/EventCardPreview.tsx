type EventCardPreviewProps = {
  title: string;
  date: string;
  location: string;
  image: string;
  category: string;
};

export default function EventCardPreview({
  title,
  date,
  location,
  image,
  category,
}: EventCardPreviewProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-white/10 bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-cyan-500/10">
      <div className="relative h-52 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <span className="absolute left-4 top-4 rounded-full border border-primary/30 bg-space/90 px-4 py-1 text-xs font-semibold text-primary backdrop-blur">
          {category}
        </span>
      </div>

      <div className="p-6">
        <p className="mb-3 text-sm font-semibold text-gold">{date}</p>

        <h3 className="mb-3 text-xl font-bold text-text-main">{title}</h3>

        <p className="mb-6 text-sm text-text-muted">📍 {location}</p>

        <button
          type="button"
          className="w-full rounded-lg border border-primary/50 px-5 py-3 font-semibold text-primary transition hover:bg-primary hover:text-space"
        >
          View Details →
        </button>
      </div>
    </article>
  );
}
