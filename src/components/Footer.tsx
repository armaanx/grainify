import React from "react";
import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Heart, Mail, Shield } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background border-t">
      <MaxWidthWrapper>
        <div className="py-8 flex flex-col sm:flex-row items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center mb-4 sm:mb-0">
            <p>
              Made with ❤️ by{" "}
              <Link
                href="https://armaan.live"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium hover:text-primary transition-colors"
              >
                Armaan
              </Link>
            </p>
          </div>
          <nav className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <Link
              className="flex items-center hover:text-primary transition-colors"
              href="/privacy"
            >
              <Shield className="w-4 h-4 mr-2" />
              Privacy Policy
            </Link>
            <Link
              className="flex items-center hover:text-primary transition-colors"
              href="/contact"
            >
              <Mail className="w-4 h-4 mr-2" />
              Contact Me
            </Link>
          </nav>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
};

export default Footer;
