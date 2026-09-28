import ListingSkeleton from "@/components/listing/ListingSkeleton";

const Loading = () => (
  <>
    <div className="h-40 animate-pulse bg-linear-to-br from-deep to-brand lg:h-52" />
    <section className="py-10 lg:py-14">
      <div className="site-container px-5 sm:px-8 lg:px-16">
        <div className="mb-8 h-32 animate-pulse rounded-[2rem] bg-mist" />
        <ListingSkeleton />
      </div>
    </section>
  </>
);

export default Loading;
