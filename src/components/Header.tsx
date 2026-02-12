import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  {
    label: "Buy",
    href: "/buy",
    submenu: [
      { label: "Homes for Sale", href: "/buy" },
      { label: "Open Houses", href: "/buy?type=open-houses" },
      { label: "New Construction", href: "/buy?type=new-construction" },
      { label: "Recently Sold", href: "/buy?type=recently-sold" },
    ],
  },
  {
    label: "Sell",
    href: "/sell",
    submenu: [
      { label: "Home Value", href: "/sell" },
      { label: "Find an Agent", href: "/agents" },
      { label: "Selling Guide", href: "/sell" },
    ],
  },
  {
    label: "Rent",
    href: "/rent",
    submenu: [
      { label: "Apartments for Rent", href: "/rent" },
      { label: "Houses for Rent", href: "/rent?type=houses" },
      { label: "Renter Tools", href: "/rent" },
    ],
  },
  {
    label: "Mortgage",
    href: "/mortgage",
    submenu: [
      { label: "Mortgage Rates", href: "/mortgage" },
      { label: "Mortgage Calculator", href: "/mortgage" },
      { label: "Pre-Approval", href: "/mortgage" },
    ],
  },
  { label: "Find an Agent", href: "/agents" },
  { label: "My Home", href: "/my-home" },
  { label: "News", href: "/news" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-primary">realtor</span>
            <span className="text-2xl font-bold text-foreground">.com</span>
            <span className="text-primary text-3xl leading-none">®</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => setActiveDropdown(item.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                to={item.href}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors rounded-md"
              >
                {item.label}
                {item.submenu && <ChevronDown className="h-3 w-3" />}
              </Link>
              <AnimatePresence>
                {item.submenu && activeDropdown === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 top-full mt-0 w-56 rounded-lg border border-border bg-popover p-2 shadow-lg"
                  >
                    {item.submenu.map((sub) => (
                      <Link
                        key={sub.label}
                        to={sub.href}
                        className="block rounded-md px-3 py-2 text-sm text-popover-foreground hover:bg-accent transition-colors"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <User className="h-4 w-4 mr-1" />
            Log In
          </Button>
          <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
            Sign Up
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-2 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-50 w-80 bg-background border-l border-border shadow-2xl p-6 overflow-y-auto lg:hidden"
          >
            <div className="flex justify-end mb-6">
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <X className="h-6 w-6 text-foreground" />
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <div key={item.label}>
                  <Link
                    to={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-3 text-base font-medium text-foreground hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                  {item.submenu && (
                    <div className="pl-6 flex flex-col gap-1">
                      {item.submenu.map((sub) => (
                        <Link
                          key={sub.label}
                          to={sub.href}
                          onClick={() => setMobileOpen(false)}
                          className="block px-3 py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
            <div className="mt-8 flex flex-col gap-3">
              <Button variant="outline" className="w-full">Log In</Button>
              <Button className="w-full bg-primary text-primary-foreground">Sign Up</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
