import { Mail, Phone, Instagram } from 'lucide-react';
import { SiInstagram } from 'react-icons/si';
import { Separator } from '@/components/ui/separator';

export function SiteFooter() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = typeof window !== 'undefined' 
    ? encodeURIComponent(window.location.hostname) 
    : 'pynote-academy';

  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-8 md:py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* About Section */}
          <div>
            <h3 className="mb-3 text-lg font-semibold">PyNote Academy</h3>
            <p className="text-sm text-muted-foreground">
              Your platform for learning Python and sharing knowledge through collaborative notes.
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="mb-3 text-lg font-semibold">Contact</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="font-medium">Kumar Anubhava</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>9993225367</span>
              </div>
              <div className="flex items-center gap-2">
                <SiInstagram className="h-4 w-4" />
                <span>k.anubhavv</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>anubhavk939@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-3 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="/learn" className="hover:text-foreground transition-colors">
                  Learn Python
                </a>
              </li>
              <li>
                <a href="/notes" className="hover:text-foreground transition-colors">
                  Browse Notes
                </a>
              </li>
              <li>
                <a href="/upload" className="hover:text-foreground transition-colors">
                  Upload Note
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="flex flex-col gap-4 text-center text-sm text-muted-foreground md:flex-row md:justify-between md:text-left">
          <p>© {currentYear} PyNote Academy. All rights reserved.</p>
          <p>
            Built with ❤️ using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:text-foreground transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
