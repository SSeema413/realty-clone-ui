import { Search, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const agents = [
  { name: "Sarah Johnson", brokerage: "Century 21", experience: 12, sales: 340, rating: 4.9, photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80" },
  { name: "Michael Chen", brokerage: "Keller Williams", experience: 8, sales: 215, rating: 4.8, photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80" },
  { name: "Emily Davis", brokerage: "RE/MAX", experience: 15, sales: 520, rating: 5.0, photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80" },
  { name: "James Wilson", brokerage: "Coldwell Banker", experience: 10, sales: 280, rating: 4.7, photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80" },
];

const FindAgentSection = () => {
  return (
    <section className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl font-heading font-bold text-foreground mb-2">Find a Real Estate Agent</h2>
          <p className="text-muted-foreground mb-6">Connect with top-performing agents in your area</p>
          <div className="max-w-lg mx-auto flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Enter your address" className="pl-10 h-12" />
            </div>
            <Button className="h-12 px-6 bg-primary text-primary-foreground hover:bg-primary/90">
              Compare Agents
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {agents.map((agent, i) => (
            <motion.div
              key={agent.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-card rounded-xl p-6 shadow-sm border border-border text-center cursor-pointer transition-shadow hover:shadow-lg"
            >
              <img
                src={agent.photo}
                alt={agent.name}
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                loading="lazy"
              />
              <h3 className="font-semibold text-card-foreground">{agent.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">{agent.brokerage}</p>
              <div className="flex items-center justify-center gap-1 mb-3">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span className="text-sm font-medium text-card-foreground">{agent.rating}</span>
              </div>
              <div className="flex justify-center gap-4 text-xs text-muted-foreground">
                <span>{agent.experience} yrs exp</span>
                <span>{agent.sales} sales</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FindAgentSection;
