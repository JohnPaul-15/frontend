import DashboardLayout from '@/components/DashboardLayout';
import { 
  TrendingUp, 
  BookOpen, 
  Package, 
  DollarSign,
  ArrowUpRight,
  BookMarked
} from 'lucide-react';

export default function Home() {
  return (
    <DashboardLayout>
      {/* Banner Section */}
      <div className="card bg-gradient-to-r from-primary/20 to-secondary/20 mb-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">Welcome to LibDash</h2>
            <p className="text-muted-foreground mb-4">
              Your modern library management system. Track inventory, manage sales, and keep your library organized.
            </p>
            <button className="btn-primary">Read More</button>
          </div>
          <div className="hidden md:block">
            <BookMarked className="w-32 h-32 text-primary/50" />
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Total Sales"
          value="$12,345"
          change="+12.5%"
          icon={DollarSign}
          trend="up"
        />
        <MetricCard
          title="Books in Stock"
          value="2,543"
          change="+5.2%"
          icon={BookOpen}
          trend="up"
        />
        <MetricCard
          title="Inventory Items"
          value="1,234"
          change="-2.1%"
          icon={Package}
          trend="down"
        />
        <MetricCard
          title="Monthly Growth"
          value="8.3%"
          change="+2.4%"
          icon={TrendingUp}
          trend="up"
        />
      </div>

      {/* Additional Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">New book added to inventory</p>
                  <p className="text-sm text-muted-foreground">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-left">
              <BookOpen className="w-6 h-6 text-primary mb-2" />
              <p className="font-medium">Add New Book</p>
            </button>
            <button className="p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-left">
              <Package className="w-6 h-6 text-primary mb-2" />
              <p className="font-medium">Update Inventory</p>
            </button>
            <button className="p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-left">
              <DollarSign className="w-6 h-6 text-primary mb-2" />
              <p className="font-medium">Record Sale</p>
            </button>
            <button className="p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-left">
              <TrendingUp className="w-6 h-6 text-primary mb-2" />
              <p className="font-medium">View Reports</p>
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ElementType;
  trend: 'up' | 'down';
}

function MetricCard({ title, value, change, icon: Icon, trend }: MetricCardProps) {
  return (
    <div className="metric-card">
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div className={`flex items-center gap-1 text-sm ${
          trend === 'up' ? 'text-green-500' : 'text-red-500'
        }`}>
          <ArrowUpRight className={`w-4 h-4 ${trend === 'down' ? 'rotate-180' : ''}`} />
          {change}
        </div>
      </div>
      <h3 className="text-2xl font-bold mb-1">{value}</h3>
      <p className="text-sm text-muted-foreground">{title}</p>
    </div>
  );
}
