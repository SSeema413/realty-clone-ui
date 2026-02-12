import { Link } from "react-router-dom";

const footerLinks = {
  "Popular Markets": ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "San Diego"],
  "Apartment Cities": ["NYC Apartments", "LA Apartments", "Chicago Apartments", "Miami Apartments"],
  Resources: ["Blog", "Mortgage Rates", "Home Selling Guide", "Home Buying Guide", "Real Estate News"],
  Company: ["About Us", "Careers", "Contact", "Terms of Service", "Privacy Policy"],
};

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-background/80">
                {category}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      to="#"
                      className="text-sm text-background/60 hover:text-background transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-background/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary">realtor</span>
            <span className="text-xl font-bold text-background">.com</span>
            <span className="text-primary text-2xl leading-none">®</span>
          </div>
          <p className="text-xs text-background/50 text-center">
            © {new Date().getFullYear()} realtor.com clone. For demonstration purposes only. Not affiliated with realtor.com®.
          </p>
          <div className="flex gap-4">
            {["Facebook", "Twitter", "Instagram", "LinkedIn"].map((s) => (
              <Link key={s} to="#" className="text-xs text-background/50 hover:text-background transition-colors">
                {s}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
