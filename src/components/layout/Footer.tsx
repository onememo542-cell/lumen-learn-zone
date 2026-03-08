import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border bg-card">
    <div className="container mx-auto px-4 py-12 lg:px-8">
      <div className="grid gap-8 md:grid-cols-4">
        <div>
          <Link to="/" className="mb-4 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Learnify</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            Empowering learners worldwide with premium online education and expert-led courses.
          </p>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold text-foreground">Platform</h4>
          <div className="flex flex-col gap-2">
            <Link to="/courses" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Browse Courses</Link>
            <Link to="/courses" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Categories</Link>
            <Link to="/courses" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Instructors</Link>
            <Link to="/dashboard" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Dashboard</Link>
          </div>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold text-foreground">Company</h4>
          <div className="flex flex-col gap-2">
            <span className="text-sm text-muted-foreground">About Us</span>
            <span className="text-sm text-muted-foreground">Careers</span>
            <span className="text-sm text-muted-foreground">Blog</span>
            <span className="text-sm text-muted-foreground">Contact</span>
          </div>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold text-foreground">Support</h4>
          <div className="flex flex-col gap-2">
            <span className="text-sm text-muted-foreground">Help Center</span>
            <span className="text-sm text-muted-foreground">Terms of Service</span>
            <span className="text-sm text-muted-foreground">Privacy Policy</span>
          </div>
        </div>
      </div>
      <div className="mt-12 border-t border-border pt-6 text-center">
        <p className="text-sm text-muted-foreground">
          © 2026 Learnify. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
