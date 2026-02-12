import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, ChevronDown } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { slugLabelMap, getListingsByCategory } from "@/data/mockListings";
import type { Listing } from "@/data/mockListings";
import { useState } from "react";

const sortOptions = ["Newest Listings", "Price (Low to High)", "Price (High to Low)", "Sqft (High to Low)"];

function formatPrice(price: number) {
  return "$" + price.toLocaleString();
}

const PropertyCard = ({ listing, index }: { listing: Listing; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.05 }}
    className="group cursor-pointer"
  >
    <div className="relative rounded-lg overflow-hidden">
      <img
        src={listing.images[0]}
        alt={listing.address}
        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-semibold px-2.5 py-1 rounded">
        {listing.status} · {listing.timeAgo}
      </span>
      <button className="absolute bottom-3 right-3 w-8 h-8 bg-white/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-colors">
        <Heart className="w-4 h-4 text-muted-foreground" />
      </button>
    </div>
    <div className="pt-3 pb-4">
      <p className="text-xs text-muted-foreground mb-1">Brokered by {listing.broker}</p>
      <div className="flex items-center gap-1 mb-1">
        <span className="w-2 h-2 rounded-full bg-primary inline-block" />
        <span className="text-xs text-primary font-medium">{listing.type}</span>
      </div>
      <p className="text-xl font-bold text-foreground">{formatPrice(listing.price)}</p>
      <div className="flex items-center gap-2 text-sm text-foreground mt-1">
        <span><strong>{listing.beds}</strong> bed</span>
        <span><strong>{listing.baths}</strong> bath</span>
        <span><strong>{listing.sqft.toLocaleString()}</strong> sqft</span>
        <span className="text-muted-foreground">{listing.lotSize}</span>
      </div>
      <p className="text-sm text-muted-foreground mt-1">{listing.address}</p>
      <p className="text-sm text-muted-foreground">{listing.city}, {listing.state} {listing.zip}</p>
    </div>
  </motion.div>
);

const Listings = () => {
  const { category } = useParams<{ category: string }>();
  const [sortBy, setSortBy] = useState(sortOptions[0]);
  const [showSort, setShowSort] = useState(false);

  const label = category ? slugLabelMap[category] || "All Listings" : "All Listings";
  const allListings = category ? getListingsByCategory(category) : [];

  // If no listings for this category, show all
  const listings = allListings.length > 0 ? allListings : getListingsByCategory("new-listings");

  const sorted = [...listings].sort((a, b) => {
    if (sortBy === "Price (Low to High)") return a.price - b.price;
    if (sortBy === "Price (High to Low)") return b.price - a.price;
    if (sortBy === "Sqft (High to Low)") return b.sqft - a.sqft;
    return 0;
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="text-sm text-muted-foreground mb-4">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground font-medium">{label}</span>
          </div>

          {/* Title & Sort */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-heading font-bold text-foreground">
                San Francisco, CA Real Estate &amp; Homes for Sale
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                <span className="font-semibold text-primary">{sorted.length}</span> Homes
              </p>
            </div>
            <div className="relative">
              <button
                onClick={() => setShowSort(!showSort)}
                className="flex items-center gap-1 text-sm text-foreground border border-border rounded-md px-3 py-2 hover:bg-accent transition-colors"
              >
                Sort by <span className="text-primary font-medium">{sortBy}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {showSort && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 top-full mt-1 bg-card border border-border rounded-md shadow-lg z-10 min-w-[200px]"
                >
                  {sortOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => { setSortBy(opt); setShowSort(false); }}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-accent transition-colors ${opt === sortBy ? "text-primary font-medium" : "text-foreground"}`}
                    >
                      {opt}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sorted.map((listing, i) => (
              <PropertyCard key={listing.id} listing={listing} index={i} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Listings;
