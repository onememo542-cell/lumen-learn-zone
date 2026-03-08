import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { Category } from "@/types";

const CategoryCard = ({ category }: { category: Category }) => (
  <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
    <Link
      to="/courses"
      className="flex h-full flex-col items-center gap-3 rounded-2xl border border-border bg-card p-6 text-center shadow-card transition-shadow hover:shadow-card-hover"
    >
      <span className="text-4xl">{category.icon}</span>
      <h3 className="font-semibold text-card-foreground">{category.name}</h3>
      <p className="text-sm text-muted-foreground">{category.coursesCount} courses</p>
    </Link>
  </motion.div>
);

export default CategoryCard;
