const placeholders = ["sk-1", "sk-2", "sk-3", "sk-4", "sk-5", "sk-6", "sk-7", "sk-8"];

const ListingSkeleton = () => (
  <div role="status" aria-busy="true">
    <span className="sr-only">Loading products</span>
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
      {placeholders.map((id) => (
        <div key={id} className="animate-pulse rounded-3xl bg-white p-4 sm:p-5">
          <div className="aspect-square rounded-[2rem] bg-mist" />
          <div className="mt-4 h-4 w-3/4 bg-ink/10" />
          <div className="mt-2 h-4 w-1/2 bg-ink/10" />
          <div className="mt-6 h-8 w-28 rounded-full bg-sticker/60" />
          <div className="mt-8 h-11 rounded-full bg-ink/10" />
        </div>
      ))}
    </div>
  </div>
);

export default ListingSkeleton;
