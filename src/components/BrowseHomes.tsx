import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { categorySlugMap } from "@/data/mockListings";

const categories = [
  { label: "New Listings", count: "28,450", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80" },
  { label: "Price Reduced", count: "12,300", image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80" },
  { label: "Open Houses", count: "5,210", image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80" },
  { label: "Recently Sold", count: "34,100", image: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=600&q=80" },
  { label: "New Construction", count: "8,750", image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80" },
  { label: "New Home Communities", count: "2,100", image: "https://images.unsplash.com/photo-1592595896551-12b371d546d5?w=600&q=80" },
  { label: "Land", count: "15,800", image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80" },
  { label: "Foreclosures", count: "3,450", image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=600&q=80" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const BrowseHomes = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-heading font-bold text-foreground mb-2">Browse Homes</h2>
        <p className="text-muted-foreground mb-8">Explore properties across categories</p>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {categories.map((cat) => (
            <Link key={cat.label} to={`/listings/${categorySlugMap[cat.label]}`}>
            <motion.div
              variants={item}
              whileHover={{ scale: 1.03 }}
              className="relative rounded-xl overflow-hidden cursor-pointer group h-48"
            >
              <img
                src={cat.image}
                alt={cat.label}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-semibold text-lg">{cat.label}</h3>
                <span className="inline-block mt-1 bg-primary/90 text-primary-foreground text-xs font-medium px-2 py-0.5 rounded-full">
                  {cat.count} homes
                </span>
              </div>
            </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BrowseHomes;
