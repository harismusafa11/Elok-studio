import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { 
  Users, Calendar, DollarSign, TrendingUp, Search, Bell, Settings, LogOut, 
  CheckCircle, XCircle, Clock, ChevronRight, MoreHorizontal, Mail, Phone, MapPin, Trash2, Check, X
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

// --- MOCK DATA ---
const revenueData = [
  { name: 'Mon', revenue: 4000 },
  { name: 'Tue', revenue: 3000 },
  { name: 'Wed', revenue: 2000 },
  { name: 'Thu', revenue: 2780 },
  { name: 'Fri', revenue: 1890 },
  { name: 'Sat', revenue: 2390 },
  { name: 'Sun', revenue: 3490 },
];

const INITIAL_BOOKINGS = [
  { id: 1, customer: 'Jessica Mila', service: 'Royal Color', date: '2023-10-24', time: '10:00', status: 'Confirmed', amount: 850000 },
  { id: 2, customer: 'Budi Santoso', service: 'Signature Cut', date: '2023-10-24', time: '11:30', status: 'Pending', amount: 250000 },
  { id: 3, customer: 'Raline Shah', service: 'Spa Ritual', date: '2023-10-25', time: '14:00', status: 'Confirmed', amount: 450000 },
  { id: 4, customer: 'Pevita Pearce', service: 'Keratin', date: '2023-10-26', time: '09:00', status: 'Completed', amount: 1200000 },
  { id: 5, customer: 'Reza Rahadian', service: 'Gentlemen Cut', date: '2023-10-26', time: '16:00', status: 'Cancelled', amount: 300000 },
];

const mockClients = [
  { id: 1, name: 'Jessica Mila', email: 'jessica@example.com', phone: '+62 812-3456-7890', visits: 12, spent: 15400000, lastVisit: '2023-10-24' },
  { id: 2, name: 'Raline Shah', email: 'raline@example.com', phone: '+62 811-9876-5432', visits: 8, spent: 8500000, lastVisit: '2023-10-25' },
  { id: 3, name: 'Pevita Pearce', email: 'pevita@example.com', phone: '+62 813-5555-4444', visits: 5, spent: 4200000, lastVisit: '2023-10-20' },
  { id: 4, name: 'Budi Santoso', email: 'budi@example.com', phone: '+62 815-1111-2222', visits: 2, spent: 500000, lastVisit: '2023-10-24' },
];

const mockTransactions = [
  { id: 'TRX-001', date: '2023-10-24', description: 'Royal Color - Jessica Mila', amount: 850000, type: 'Credit Card' },
  { id: 'TRX-002', date: '2023-10-24', description: 'Signature Cut - Budi Santoso', amount: 250000, type: 'QRIS' },
  { id: 'TRX-003', date: '2023-10-23', description: 'Product Sales - Shampoo', amount: 450000, type: 'Cash' },
  { id: 'TRX-004', date: '2023-10-23', description: 'Spa Ritual - Guest', amount: 450000, type: 'Credit Card' },
];

type ViewState = 'dashboard' | 'bookings' | 'clients' | 'finances' | 'settings';

const AdminDashboard: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewState>('dashboard');
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [actionMenuOpenId, setActionMenuOpenId] = useState<number | null>(null);

  // --- ACTIONS ---
  const handleUpdateStatus = (id: number, newStatus: string) => {
    setBookings(prev => prev.map(booking => 
      booking.id === id ? { ...booking, status: newStatus } : booking
    ));
    setActionMenuOpenId(null);
  };

  const handleDeleteBooking = (id: number) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      setBookings(prev => prev.filter(booking => booking.id !== id));
      setActionMenuOpenId(null);
    }
  };

  // --- SUB-COMPONENTS FOR VIEWS ---

  const DashboardView = () => (
    <>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Revenue', value: 'Rp 45.2M', icon: DollarSign, color: 'text-emerald-400', trend: '+12%' },
          { label: 'Total Bookings', value: bookings.length.toString(), icon: Calendar, color: 'text-blue-400', trend: '+5%' },
          { label: 'New Clients', value: '85', icon: Users, color: 'text-elok-gold', trend: '+18%' },
          { label: 'Avg. Rating', value: '4.9', icon: TrendingUp, color: 'text-elok-rose', trend: 'Stable' },
        ].map((stat, i) => (
          <div key={i} className="bg-elok-navy border border-white/5 p-6 rounded-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <stat.icon size={60} />
            </div>
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className={`p-3 rounded-lg bg-white/5 ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <span className="text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">{stat.trend}</span>
            </div>
            <h3 className="text-slate-400 text-sm relative z-10">{stat.label}</h3>
            <p className="text-2xl font-bold text-white mt-1 relative z-10">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-elok-navy border border-white/5 p-6 rounded-xl">
          <h3 className="text-xl font-bold text-white mb-6">Revenue Analytics</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" axisLine={false} tickLine={false} />
                <YAxis stroke="#94a3b8" axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#09090b', borderColor: '#334155', color: '#fff', borderRadius: '8px' }}
                  itemStyle={{ color: '#f59e0b' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#f59e0b" fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Bookings Mini List */}
        <div className="bg-elok-navy border border-white/5 p-6 rounded-xl flex flex-col">
          <h3 className="text-xl font-bold text-white mb-6">Today's Schedule</h3>
          <div className="space-y-4 flex-1 overflow-y-auto pr-2">
            {bookings.slice(0, 4).map(booking => (
              <div key={booking.id} className="flex items-center justify-between p-3 hover:bg-white/5 rounded-lg transition-colors cursor-pointer group border border-transparent hover:border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center font-bold text-xs text-elok-gold">
                    {booking.customer.substring(0,2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-medium text-white group-hover:text-elok-gold transition-colors">{booking.customer}</h4>
                    <p className="text-xs text-slate-400">{booking.time} • {booking.service}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-[10px] px-2 py-1 rounded-full ${
                    booking.status === 'Confirmed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                    booking.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
                    'bg-slate-500/10 text-slate-400'
                  }`}>
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={() => setActiveView('bookings')}
            className="w-full mt-6 py-3 border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
          >
            View All Bookings <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </>
  );

  const BookingsView = () => (
    <div className="bg-elok-navy border border-white/5 rounded-xl overflow-hidden min-h-[500px]">
      <div className="p-6 border-b border-white/5 flex justify-between items-center">
        <h3 className="text-xl font-bold text-white">All Bookings</h3>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white/5 text-xs text-white rounded-lg hover:bg-white/10">Filter: All</button>
          <button className="px-4 py-2 bg-elok-gold text-black text-xs font-bold rounded-lg hover:bg-white">New Booking</button>
        </div>
      </div>
      <div className="overflow-x-visible pb-20"> {/* pb-20 gives space for dropdown */}
        <table className="w-full text-left text-sm text-slate-400">
          <thead className="bg-white/5 text-white uppercase text-xs">
            <tr>
              <th className="px-6 py-4 font-medium tracking-wider">Customer</th>
              <th className="px-6 py-4 font-medium tracking-wider">Service</th>
              <th className="px-6 py-4 font-medium tracking-wider">Date & Time</th>
              <th className="px-6 py-4 font-medium tracking-wider">Amount</th>
              <th className="px-6 py-4 font-medium tracking-wider">Status</th>
              <th className="px-6 py-4 font-medium tracking-wider text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {bookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-white/5 transition-colors relative">
                <td className="px-6 py-4 text-white font-medium">{booking.customer}</td>
                <td className="px-6 py-4">{booking.service}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} /> {booking.date}
                    <Clock size={14} className="ml-2" /> {booking.time}
                  </div>
                </td>
                <td className="px-6 py-4 text-white">
                  {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(booking.amount)}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                    booking.status === 'Confirmed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                    booking.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                    booking.status === 'Cancelled' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                    'bg-blue-500/10 text-blue-400 border-blue-500/20'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                       booking.status === 'Confirmed' ? 'bg-emerald-400' : 
                       booking.status === 'Pending' ? 'bg-yellow-400' :
                       booking.status === 'Cancelled' ? 'bg-rose-400' : 'bg-blue-400'
                    }`}></span>
                    {booking.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right relative">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setActionMenuOpenId(actionMenuOpenId === booking.id ? null : booking.id);
                    }}
                    className={`p-2 rounded-full transition-colors ${
                      actionMenuOpenId === booking.id ? 'bg-elok-gold text-black' : 'text-slate-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <MoreHorizontal size={16} />
                  </button>

                  {/* ACTION DROPDOWN */}
                  {actionMenuOpenId === booking.id && (
                    <div className="absolute right-8 top-8 w-40 bg-zinc-950 border border-white/10 rounded-lg shadow-2xl shadow-black z-50 overflow-hidden animate-fade-in-up">
                      <div className="p-1">
                        <button 
                          onClick={() => handleUpdateStatus(booking.id, 'Confirmed')}
                          className="w-full text-left px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-white/10 rounded flex items-center gap-2"
                        >
                          <Check size={14} className="text-emerald-500"/> Confirm
                        </button>
                        <button 
                          onClick={() => handleUpdateStatus(booking.id, 'Cancelled')}
                          className="w-full text-left px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-white/10 rounded flex items-center gap-2"
                        >
                          <X size={14} className="text-rose-500"/> Cancel
                        </button>
                        <div className="h-px bg-white/10 my-1"></div>
                        <button 
                          onClick={() => handleDeleteBooking(booking.id)}
                          className="w-full text-left px-3 py-2 text-xs text-rose-400 hover:bg-rose-500/10 rounded flex items-center gap-2"
                        >
                          <Trash2 size={14}/> Delete
                        </button>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Click outside to close handler (simple overlay) */}
      {actionMenuOpenId !== null && (
        <div 
          className="fixed inset-0 z-40 bg-transparent" 
          onClick={() => setActionMenuOpenId(null)}
        ></div>
      )}
    </div>
  );

  const ClientsView = () => (
    <div className="bg-elok-navy border border-white/5 rounded-xl overflow-hidden">
      <div className="p-6 border-b border-white/5 flex justify-between items-center">
        <h3 className="text-xl font-bold text-white">Client Database</h3>
        <button className="px-4 py-2 bg-elok-gold text-black text-xs font-bold rounded-lg hover:bg-white">Add Client</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-400">
          <thead className="bg-white/5 text-white uppercase text-xs">
            <tr>
              <th className="px-6 py-4 font-medium tracking-wider">Name</th>
              <th className="px-6 py-4 font-medium tracking-wider">Contact</th>
              <th className="px-6 py-4 font-medium tracking-wider">Visits</th>
              <th className="px-6 py-4 font-medium tracking-wider">Total Spent</th>
              <th className="px-6 py-4 font-medium tracking-wider">Last Visit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {mockClients.map((client) => (
              <tr key={client.id} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-elok-gold to-yellow-600 flex items-center justify-center text-black font-bold text-xs">
                      {client.name.charAt(0)}
                    </div>
                    <span className="text-white font-medium">{client.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1">
                    <span className="flex items-center gap-2 text-xs"><Mail size={12}/> {client.email}</span>
                    <span className="flex items-center gap-2 text-xs"><Phone size={12}/> {client.phone}</span>
                  </div>
                </td>
                <td className="px-6 py-4">{client.visits}</td>
                <td className="px-6 py-4 text-elok-gold">
                  {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(client.spent)}
                </td>
                <td className="px-6 py-4">{client.lastVisit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const FinancesView = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-emerald-900/20 border border-emerald-500/20 p-6 rounded-xl">
           <h4 className="text-emerald-400 text-sm font-medium uppercase tracking-wider mb-2">Total Revenue</h4>
           <p className="text-3xl font-bold text-white">Rp 45.200.000</p>
        </div>
        <div className="bg-blue-900/20 border border-blue-500/20 p-6 rounded-xl">
           <h4 className="text-blue-400 text-sm font-medium uppercase tracking-wider mb-2">Pending Payments</h4>
           <p className="text-3xl font-bold text-white">Rp 3.500.000</p>
        </div>
        <div className="bg-purple-900/20 border border-purple-500/20 p-6 rounded-xl">
           <h4 className="text-purple-400 text-sm font-medium uppercase tracking-wider mb-2">Avg. Ticket</h4>
           <p className="text-3xl font-bold text-white">Rp 850.000</p>
        </div>
      </div>

      <div className="bg-elok-navy border border-white/5 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-white/5">
          <h3 className="text-xl font-bold text-white">Recent Transactions</h3>
        </div>
        <table className="w-full text-left text-sm text-slate-400">
          <thead className="bg-white/5 text-white uppercase text-xs">
            <tr>
              <th className="px-6 py-4 font-medium tracking-wider">ID</th>
              <th className="px-6 py-4 font-medium tracking-wider">Date</th>
              <th className="px-6 py-4 font-medium tracking-wider">Description</th>
              <th className="px-6 py-4 font-medium tracking-wider">Method</th>
              <th className="px-6 py-4 font-medium tracking-wider text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {mockTransactions.map((trx) => (
              <tr key={trx.id} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 font-mono text-xs">{trx.id}</td>
                <td className="px-6 py-4">{trx.date}</td>
                <td className="px-6 py-4 text-white">{trx.description}</td>
                <td className="px-6 py-4">{trx.type}</td>
                <td className="px-6 py-4 text-right text-emerald-400">
                  + {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(trx.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const SettingsView = () => (
    <div className="max-w-4xl">
      <div className="bg-elok-navy border border-white/5 rounded-xl overflow-hidden mb-6">
        <div className="p-6 border-b border-white/5">
          <h3 className="text-xl font-bold text-white">General Settings</h3>
          <p className="text-slate-400 text-sm mt-1">Manage your studio information and preferences.</p>
        </div>
        <div className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Studio Name</label>
              <input type="text" defaultValue="ELOK Studio" className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-elok-gold outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Email Address</label>
              <input type="email" defaultValue="hello@elokstudio.id" className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-elok-gold outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Phone Number</label>
              <input type="text" defaultValue="+62 21 555 0199" className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-elok-gold outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Location</label>
              <input type="text" defaultValue="Jakarta Selatan" className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-elok-gold outline-none" />
            </div>
          </div>
          
          <div className="pt-6 border-t border-white/5">
             <h4 className="text-white font-medium mb-4 flex items-center gap-2"><Clock size={16}/> Operating Hours</h4>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between bg-black/20 p-3 rounded-lg border border-white/5">
                   <span className="text-slate-400 text-sm">Weekdays</span>
                   <span className="text-white text-sm font-mono">10:00 - 20:00</span>
                </div>
                <div className="flex items-center justify-between bg-black/20 p-3 rounded-lg border border-white/5">
                   <span className="text-slate-400 text-sm">Weekends</span>
                   <span className="text-white text-sm font-mono">09:00 - 21:00</span>
                </div>
             </div>
          </div>
        </div>
        <div className="p-6 bg-black/20 border-t border-white/5 flex justify-end">
          <button onClick={() => alert('Settings Saved!')} className="bg-elok-gold text-black font-bold px-6 py-2 rounded-lg hover:bg-white transition-colors">Save Changes</button>
        </div>
      </div>
    </div>
  );

  const NavItem = ({ view, icon: Icon, label }: { view: ViewState, icon: any, label: string }) => (
    <div 
      onClick={() => setActiveView(view)}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-300 ${
        activeView === view 
          ? 'bg-elok-gold/10 text-elok-gold border border-elok-gold/20' 
          : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
      }`}
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
      {activeView === view && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-elok-gold shadow-[0_0_8px_rgba(212,185,150,0.8)]"></div>}
    </div>
  );

  return (
    <div className="min-h-screen bg-elok-dark text-slate-200 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-elok-navy border-r border-white/5 flex flex-col fixed h-full z-20">
        <div className="p-6 border-b border-white/5">
           <div className="flex items-center gap-2">
              <Logo />
              <span className="text-elok-gold text-[10px] font-sans tracking-widest bg-white/5 px-2 py-1 rounded border border-white/10">ADMIN</span>
           </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <NavItem view="dashboard" icon={TrendingUp} label="Dashboard" />
          <NavItem view="bookings" icon={Calendar} label="Bookings" />
          <NavItem view="clients" icon={Users} label="Clients" />
          <NavItem view="finances" icon={DollarSign} label="Finances" />
          <NavItem view="settings" icon={Settings} label="Settings" />
        </nav>

        <div className="p-4 border-t border-white/5">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 text-rose-500 hover:bg-rose-500/10 rounded-lg cursor-pointer transition-colors border border-transparent hover:border-rose-500/20">
            <LogOut size={20} />
            <span>Exit to Site</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 relative">
        {/* Header */}
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-serif font-bold text-white mb-1 capitalize">
              {activeView === 'dashboard' ? 'Overview' : activeView}
            </h1>
            <p className="text-slate-400 text-sm">Welcome back to ELOK Studio control panel.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-elok-gold transition-colors" size={18} />
              <input 
                placeholder="Search database..." 
                className="bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 focus:outline-none focus:border-elok-gold focus:ring-1 focus:ring-elok-gold/50 w-64 transition-all text-sm"
              />
            </div>
            <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors relative">
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full animate-pulse"></span>
            </button>
            <div className="flex items-center gap-3 border-l border-white/10 pl-4 ml-2">
              <div className="text-right hidden md:block">
                <p className="text-sm text-white font-medium">Admin</p>
                <p className="text-xs text-slate-500">Super User</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-elok-gold to-elok-rose border border-white/20 shadow-lg"></div>
            </div>
          </div>
        </header>

        {/* Dynamic Content View */}
        <div className="animate-fade-in-up">
          {activeView === 'dashboard' && <DashboardView />}
          {activeView === 'bookings' && <BookingsView />}
          {activeView === 'clients' && <ClientsView />}
          {activeView === 'finances' && <FinancesView />}
          {activeView === 'settings' && <SettingsView />}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;