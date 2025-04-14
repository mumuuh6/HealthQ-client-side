import Link from "next/link"
import { Clock, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container px-4 py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 ">
          <div className="flex flex-col justify-center items-center gap-2">
            <Link href="/" className="flex items-center gap-2 font-semibold mb-4">
              <Clock className="h-6 w-6 text-primary" />
              <span>HealthQ</span>
            </Link>
            <p className="text-sm  text-center">
              Smart queue management for healthcare providers. Streamline patient flow and reduce wait times.
            </p>
            <div className="flex gap-4 mt-4">
              <Link href="#" className=" hover:text-primary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className=" hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className=" hover:text-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className=" hover:text-primary">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          <div className="flex flex-col  justify-center items-center gap-2">
            <h3 className="font-medium text-lg mb-4">Product</h3>
            <Link href="/#features" className=" hover:text-primary text-sm">
              Features
            </Link>
            <Link href="/#how-it-works" className=" hover:text-primary text-sm">
              How It Works
            </Link>
            <Link href="/pricing" className=" hover:text-primary text-sm">
              Pricing
            </Link>
            <Link href="/faq" className=" hover:text-primary text-sm">
              FAQ
            </Link>
          </div>

          <div className="flex flex-col  justify-center items-center gap-2">
            <h3 className="font-medium text-lg mb-4">Company</h3>
            <Link href="/about" className=" hover:text-primary text-sm">
              About Us
            </Link>
            <Link href="/contact" className=" hover:text-primary text-sm">
              Contact
            </Link>
            <Link href="/careers" className=" hover:text-primary text-sm">
              Careers
            </Link>
            <Link href="/blog" className=" hover:text-primary text-sm">
              Blog
            </Link>
          </div>

          <div className="flex flex-col  justify-center items-center gap-2">
            <h3 className="font-medium text-lg mb-4">Legal</h3>
            <Link href="/terms" className=" hover:text-primary text-sm">
              Terms of Service
            </Link>
            <Link href="/privacy" className=" hover:text-primary text-sm">
              Privacy Policy
            </Link>
            <Link href="/cookies" className=" hover:text-primary text-sm">
              Cookie Policy
            </Link>
            <Link href="/compliance" className=" hover:text-primary text-sm">
              HIPAA Compliance
            </Link>
          </div>

          <div className="flex flex-col  justify-center items-center gap-4 sm:col-span-2 md:col-span-1">
            <h3 className="font-medium text-lg mb-2">Contact Us</h3>
            <div className="flex items-center gap-2 text-sm ">
              <Mail className="h-4 w-4 text-primary" />
              <a href="mailto:info@healthq.com" className="hover:text-primary">
                info@healthq.com
              </a>
            </div>
            <div className="flex items-center gap-2 text-sm ">
              <Phone className="h-4 w-4 text-primary" />
              <a href="tel:+18001234567" className="hover:text-primary">
                +8801963175097
              </a>
            </div>
            <div className="flex items-start gap-2 text-sm ">
              <MapPin className="h-4 w-4 text-primary mt-1" />
              <address className="not-italic">
                RASG-1,Dattapara,Ashulia
                <br />
                Dhaka,Bangladesh
              </address>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center mt-12 border-t pt-8 text-sm ">
          <p>&copy; {new Date().getFullYear()} HealthQ. All rights reserved.</p>
          <p>Made with ❤️ by HealthQ Team</p>
          <p >Follow us on social media for updates and news.</p></div>
      </div>
    </footer>
  )
}
