const shelfPlaceholders = ["sk-1", "sk-2", "sk-3", "sk-4"];

// Mirrors the shape of the real homepage (hero, category grid, a couple of
// product shelves) so the swap-in on load doesn't jump around too much.
const Loading = () => (
  <div role="status" aria-busy="true">
    <span className="sr-only">Loading homepage</span>

    <section className="h-[32rem] animate-pulse bg-linear-to-br from-deep to-brand" />

    <section className="py-12 lg:py-20">
      <div className="site-container px-5 sm:px-8 lg:px-16">
        <div className="mb-8 h-8 w-56 animate-pulse bg-ink/10" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="aspect-square animate-pulse rounded-3xl bg-mist">
              <div className="size-full" />
            </div>
          ))}
        </div>
      </div>
    </section>

    {shelfPlaceholders.map((id) => (
      <section key={id} className="py-10">
        <div className="site-container px-5 sm:px-8 lg:px-16">
          <div className="mb-6 h-7 w-48 animate-pulse bg-ink/10" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square rounded-[2rem] bg-mist" />
                <div className="mt-3 h-4 w-3/4 bg-ink/10" />
                <div className="mt-2 h-4 w-1/2 bg-ink/10" />
              </div>
            ))}
          </div>
        </div>
      </section>
    ))}
  </div>
);

export default Loading;
