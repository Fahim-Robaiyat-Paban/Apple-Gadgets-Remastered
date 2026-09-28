import SectionHeading from "@/components/ui/SectionHeading";

const ProductDetails = ({ product, details }) => {
  const { specs = [], highlights = [], description, faqs = [] } = details;

  return (
    <section className="bg-linear-to-b from-paper to-mist py-12 lg:py-20">
      <div className="site-container grid gap-12 px-5 sm:px-8 lg:grid-cols-[1.4fr_1fr] lg:px-16">
        {specs.length > 0 && (
          <div className="self-start rounded-[2rem] bg-white p-6 sm:p-8">
            <SectionHeading title="Specifications" />
            <table className="w-full border-t-2 border-dashed border-ink/30 text-left">
              <caption className="sr-only">{product.name} specifications</caption>
              <tbody>
                {specs.map((spec) => (
                  <tr key={spec.id} className="border-b border-ink/25 align-top">
                    <th scope="row" className="w-1/3 py-3 pr-4 font-semibold">
                      {spec.label}
                    </th>
                    <td className="py-3 text-ink/85">{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="space-y-6">
          {highlights.length > 0 && (
            <div className="rounded-[2rem] bg-white p-6 sm:p-8">
              <SectionHeading title="Highlights" />
              <ul className="border-t-2 border-dashed border-ink/30">
                {highlights.map((item) => (
                  <li key={item.id} className="border-b border-ink/25 py-3">
                    {item.text}
                  </li>
                ))}
              </ul>
              {description && <p className="mt-6 text-ink/80">{description}</p>}
            </div>
          )}

          {faqs.length > 0 && (
            <div className="rounded-[2rem] bg-white p-6 sm:p-8">
              <SectionHeading title="FAQ" />
              <div className="border-t-2 border-dashed border-ink/30">
                {faqs.map((faq) => (
                  <details key={faq.id} className="border-b border-ink/25">
                    <summary className="flex min-h-11 cursor-pointer items-center py-2 font-semibold">
                      {faq.question}
                    </summary>
                    <p className="pb-3 text-ink/80">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
