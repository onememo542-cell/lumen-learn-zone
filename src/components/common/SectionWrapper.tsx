import { ReactNode } from "react";
import { motion } from "framer-motion";

interface SectionWrapperProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
}

const SectionWrapper = ({ children, title, subtitle, className = "" }: SectionWrapperProps) => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className={`py-16 lg:py-24 ${className}`}
  >
    <div className="container mx-auto px-4 lg:px-8">
      {(title || subtitle) && (
        <div className="mb-12 text-center">
          {title && <h2 className="text-3xl font-bold text-foreground lg:text-4xl">{title}</h2>}
          {subtitle && <p className="mt-3 text-lg text-muted-foreground">{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  </motion.section>
);

export default SectionWrapper;
