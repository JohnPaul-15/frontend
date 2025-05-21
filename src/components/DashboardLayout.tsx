import { ReactNode } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Books, 
  Package, 
  BarChart3, 
  MessageSquare,
  BookOpen,
  Menu
} from 'lucide-react';

interface DashboardLayoutProps {
  children: ReactNode;
}

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
  { icon: Books, label: 'Books', href: '/books' },
  { icon: Package, label: 'Inventory', href: '/inventory' },
  { icon: BarChart3, label: 'Sales', href: '/sales' },
  { icon: BookOpen, label: 'Shelves', href: '/shelves' },
  { icon: MessageSquare, label: 'Messages', href: '/messages' },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border hidden md:block">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-primary">LibDash</h1>
        </div>
        <nav className="px-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="nav-link"
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-card border-b border-border p-4 z-50">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-primary">LibDash</h1>
          <button className="p-2 hover:bg-muted rounded-lg">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 md:ml-64">
        <div className="p-6 md:p-8 mt-16 md:mt-0">
          {children}
        </div>
      </main>
    </div>
  );
} 