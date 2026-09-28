import Button from "@/components/ui/Button";

export const metadata = { title: "Page not found" };

const NotFound = () => (
  <section className="bg-linear-to-b from-mist to-paper py-24 lg:py-32">
    <div className="site-container px-5 sm:px-8 lg:px-16">
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">
        Nothing on this shelf.
      </h1>
      <p className="mt-4 max-w-md text-lg text-ink/80">
        The page you were looking for has moved or never existed.
      </p>
      <Button href="/" variant="sticker" className="mt-8">
        Back to the store
      </Button>
    </div>
  </section>
);

export default NotFound;
