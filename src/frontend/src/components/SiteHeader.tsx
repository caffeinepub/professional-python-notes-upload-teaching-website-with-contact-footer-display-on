import { Link, useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { BookOpen, FileText, Upload, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';

export function SiteHeader() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const navItems = [
    { label: 'Learn Python', path: '/learn', icon: BookOpen },
    { label: 'Notes', path: '/notes', icon: FileText },
    { label: 'Upload Note', path: '/upload', icon: Upload },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img 
            src="/assets/generated/py-notes-logo.dim_512x512.png" 
            alt="PyNote Academy" 
            className="h-10 w-10 object-contain"
          />
          <span className="text-xl font-bold tracking-tight">PyNote Academy</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2">
          {navItems.map((item) => (
            <Button
              key={item.path}
              variant="ghost"
              asChild
            >
              <Link to={item.path} className="flex items-center gap-2">
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            </Button>
          ))}
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col gap-4 mt-8">
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  variant="ghost"
                  className="justify-start"
                  onClick={() => {
                    navigate({ to: item.path });
                    setOpen(false);
                  }}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
