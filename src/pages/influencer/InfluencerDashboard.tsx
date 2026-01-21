import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';
import { DollarSign, Users, MousePointerClick, ArrowUpRight, Activity, TrendingUp } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { useMarketplace } from "@/context/MarketplaceContext";

export default function InfluencerDashboard() {
  const { t } = useTranslation();
  const { promotions } = useMarketplace();
  
  const totalReach = promotions.reduce((acc, curr) => acc + curr.reach, 0);
  const totalConversions = promotions.reduce((acc, curr) => acc + curr.conversions, 0);
  const totalRevenue = promotions.reduce((acc, curr) => acc + curr.revenue, 0);

  const data = promotions.map(p => ({
    name: p.name,
    reach: p.reach,
    conversions: p.conversions,
    revenue: p.revenue
  }));

  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">{t('dashboard.title')}</h2>
        <p className="text-muted-foreground text-lg">
            {t('dashboard.subtitle')}
        </p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Highlight Card for Revenue */}
        <Card className="relative overflow-hidden border-none shadow-lg bg-primary text-primary-foreground transition-all hover:scale-[1.02]">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <DollarSign className="h-24 w-24" />
          </div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-medium text-primary-foreground/80">{t('dashboard.stats.total_revenue')}</CardTitle>
            <DollarSign className="h-4 w-4 text-primary-foreground/80" />
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold tracking-tight">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-primary-foreground/60 flex items-center mt-1 font-medium">
              <span className="bg-white/20 px-1.5 py-0.5 rounded text-white flex items-center me-2">
                  +20.1% <ArrowUpRight className="h-3 w-3 ms-0.5" />
              </span>
              {t('dashboard.stats.from_last_month')}
            </p>
          </CardContent>
        </Card>

        {/* Standard Stats Cards */}
        {[
            { title: 'dashboard.stats.total_reach', value: totalReach.toLocaleString(), icon: Users, change: '+180.1%', trend: 'up' },
            { title: 'dashboard.stats.conversions', value: totalConversions.toLocaleString(), icon: MousePointerClick, change: '+19%', trend: 'up' },
            { title: 'dashboard.stats.active_campaigns', value: promotions.filter(p => p.status === 'Active').length, icon: Activity, change: '+1', trend: 'neutral' }
        ].map((stat, idx) => (
            <Card key={idx} className="transition-all hover:shadow-md border-border/60 shadow-sm hover:border-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">{t(stat.title)}</CardTitle>
                    <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <p className="text-xs text-muted-foreground flex items-center mt-1">
                        <span className={cn(
                            "px-1.5 py-0.5 rounded flex items-center me-2 font-medium",
                            stat.trend === 'up' ? "text-emerald-600 bg-emerald-100/50" : "text-amber-600 bg-amber-100/50"
                        )}>
                            {stat.change} <ArrowUpRight className="h-3 w-3 ms-0.5" />
                        </span>
                        {t('dashboard.stats.from_last_month')}
                    </p>
                </CardContent>
            </Card>
        ))}
      </div>

      {/* Chart and Activity Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 shadow-sm border-border/60">
          <CardHeader>
            <div className="flex items-center justify-between">
                <div>
                    <CardTitle className="text-xl">{t('dashboard.charts.revenue_overview')}</CardTitle>
                    <CardDescription>
                        {t('dashboard.charts.revenue_desc')}
                    </CardDescription>
                </div>
                <div className="p-2 bg-muted/50 rounded-md">
                    <TrendingUp className="h-5 w-5 text-muted-foreground" />
                </div>
            </div>
          </CardHeader>
          <CardContent className="ps-2">
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.4} />
                  <XAxis 
                    dataKey="name" 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                    dy={14}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(value) => `$${value}`} 
                    dx={-10}
                  />
                   <Tooltip
                    cursor={{ fill: 'hsl(var(--muted))', opacity: 0.2 }}
                    contentStyle={{
                        backgroundColor: 'hsl(var(--popover))',
                        borderColor: 'hsl(var(--border))',
                        borderRadius: 'var(--radius)',
                        color: 'hsl(var(--popover-foreground))',
                        boxShadow: 'var(--shadow-lg)',
                        padding: '12px'
                    }}
                    itemStyle={{ color: 'hsl(var(--foreground))', fontWeight: 500 }}
                  />
                  <Bar
                    dataKey="revenue"
                    fill="hsl(var(--primary))"
                    radius={[6, 6, 0, 0]}
                    maxBarSize={50}
                    className="fill-primary"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Recent Activity / Top Coupons */}
        <Card className="col-span-3 shadow-sm border-border/60 flex flex-col">
          <CardHeader>
            <CardTitle className="text-xl">{t('dashboard.charts.top_campaigns')}</CardTitle>
             <CardDescription>
                {t('dashboard.charts.top_desc')}
              </CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="space-y-6">
              {promotions.map((promo, i) => (
                <div className="flex items-center group cursor-pointer p-2 -mx-2 rounded-lg hover:bg-muted/50 transition-colors" key={promo.id}>
                  <Avatar className="h-10 w-10 border border-border">
                    <AvatarFallback className={cn(
                        "font-bold text-xs",
                        i === 0 ? "bg-amber-100 text-amber-700" : 
                        i === 1 ? "bg-slate-100 text-slate-700" : "bg-orange-100 text-orange-700"
                    )}>
                        {promo.name.substring(0,2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="ms-4 space-y-1 flex-1">
                    <p className="text-sm font-semibold leading-none group-hover:text-primary transition-colors">{promo.name}</p>
                    <div className="flex items-center gap-2">
                        <span className={cn(
                            "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                            promo.status === 'Active' 
                                ? "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20" 
                                : "bg-slate-50 text-slate-700 ring-1 ring-inset ring-slate-600/20"
                        )}>
                            {promo.status}
                        </span>
                        <span className="text-xs text-muted-foreground">• 2h ago</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                      <span className="font-bold text-sm">+${promo.revenue}</span>
                      <span className="text-xs text-muted-foreground">Earned</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
