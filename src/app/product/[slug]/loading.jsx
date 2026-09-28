const Loading = () => (
  <div role="status" aria-busy="true">
    <span className="sr-only">Loading product</span>

    <section className="py-8 lg:py-14">
      <div className="site-container px-5 sm:px-8 lg:px-16">
        <div className="mb-6 h-4 w-64 max-w-full animate-pulse bg-ink/10" />

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
          <div className="aspect-square animate-pulse rounded-[2.5rem] bg-mist" />

          <div>
            <div className="h-8 w-3/4 animate-pulse bg-ink/10" />
            <div className="mt-3 h-8 w-1/3 animate-pulse rounded-full bg-sticker/60" />
            <div className="mt-8 space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-5 w-full animate-pulse bg-ink/5" />
              ))}
            </div>
            <div className="mt-8 h-12 w-full animate-pulse rounded-full bg-ink/10" />
            <div className="mt-3 h-12 w-full animate-pulse rounded-full bg-ink/10" />
          </div>
        </div>
      </div>
    </section>

    <section className="border-t border-ink/15 py-12">
      <div className="site-container px-5 sm:px-8 lg:px-16">
        <div className="mb-6 h-6 w-40 animate-pulse bg-ink/10" />
        <div className="grid gap-3 sm:grid-cols-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-6 animate-pulse bg-ink/5" />
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default Loading;
