import { ShoppingBag } from "lucide-react";
import PageBanner from "@/components/ui/PageBanner";
import CartView from "@/components/cart/CartView";

export const metadata = {
  title: "Your cart",
  robots: { index: false },
};

const CartPage = () => (
  <>
    <PageBanner title="Your cart" icon={<ShoppingBag className="size-14" strokeWidth={1.5} />} />
    <section className="pb-10 pt-10 lg:pb-16 lg:pt-14">
      <div className="site-container px-5 sm:px-8 lg:px-16">
        <CartView />
      </div>
    </section>
  </>
);

export default CartPage;
