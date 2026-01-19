import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PROMOTIONS } from "@/lib/mockData";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { DollarSign, Users, MousePointerClick, ArrowUpRight, Activity } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useTranslation } from "react-i18next";

export default function InfluencerDashboard() {
  const { t } = useTranslation();
  const totalReach = PROMOTIONS.reduce((acc, curr) => acc + curr.reach, 0);
  const totalConversions = PROMOTIONS.reduce((acc, curr) => acc + curr.conversions, 0);
  const totalRevenue = PROMOTIONS.reduce((acc, curr) => acc + curr.revenue, 0);

  const data = PROMOTIONS.map(p => ({
    name: p.name,
    reach: p.reach,
    conversions: p.conversions,
    revenue: p.revenue
  }));

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">{t('dashboard.title')}</h2>
        <p className="text-muted-foreground">
            {t('dashboard.subtitle')}
        </p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="transition-all hover:shadow-md border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{t('dashboard.stats.total_revenue')}</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <span className="text-emerald-600 bg-emerald-100/50 px-1 py-0.5 rounded flex items-center me-2">
                  +20.1% <ArrowUpRight className="h-3 w-3 ms-0.5" />
              </span>
              {t('dashboard.stats.from_last_month')}
            </p>
          </CardContent>
        </Card>
        <Card className="transition-all hover:shadow-md border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{t('dashboard.stats.total_reach')}</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalReach.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <span className="text-emerald-600 bg-emerald-100/50 px-1 py-0.5 rounded flex items-center me-2">
                  +180.1% <ArrowUpRight className="h-3 w-3 ms-0.5" />
              </span>
              {t('dashboard.stats.from_last_month')}
            </p>
          </CardContent>
        </Card>
        <Card className="transition-all hover:shadow-md border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{t('dashboard.stats.conversions')}</CardTitle>
            <MousePointerClick className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalConversions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
                <span className="text-emerald-600 bg-emerald-100/50 px-1 py-0.5 rounded flex items-center me-2">
                  +19% <ArrowUpRight className="h-3 w-3 ms-0.5" />
              </span>
                {t('dashboard.stats.from_last_month')}
            </p>
          </CardContent>
        </Card>
        <Card className="transition-all hover:shadow-md border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{t('dashboard.stats.active_campaigns')}</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{PROMOTIONS.filter(p => p.status === 'Active').length}</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
                <span className="text-emerald-600 bg-emerald-100/50 px-1 py-0.5 rounded flex items-center me-2">
                  +1 <ArrowUpRight className="h-3 w-3 ms-0.5" />
              </span>
                {t('dashboard.stats.since_last_hour')}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Chart and Activity Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 shadow-sm border-slate-200">
          <CardHeader>
            <CardTitle>{t('dashboard.charts.revenue_overview')}</CardTitle>
             <CardDescription>
                {t('dashboard.charts.revenue_desc')}
              </CardDescription>
          </CardHeader>
          <CardContent className="ps-2">
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <XAxis 
                    dataKey="name" 
                    stroke="#888888" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                    dy={10}
                  />
                  <YAxis 
                    stroke="#888888" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(value) => `$${value}`} 
                  />
                   <Tooltip
                    cursor={{ fill: 'hsl(var(--muted))', opacity: 0.2 }}
                    contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        borderColor: 'hsl(var(--border))',
                        borderRadius: 'var(--radius)',
                        color: 'hsl(var(--foreground))',
                        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
                    }}
                    itemStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                  <Bar
                    dataKey="revenue"
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                    className="fill-primary"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Recent Activity / Top Coupons */}
        <Card className="col-span-3 shadow-sm border-slate-200">
          <CardHeader>
            <CardTitle>{t('dashboard.charts.top_campaigns')}</CardTitle>
             <CardDescription>
                {t('dashboard.charts.top_desc')}
              </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {PROMOTIONS.map((promo) => (
                <div className="flex items-center group" key={promo.id}>
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-primary/10 text-primary font-bold">
                        {promo.name.substring(0,2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="ms-4 space-y-1">
                    <p className="text-sm font-medium leading-none group-hover:text-primary transition-colors">{promo.name}</p>
                    <p className="text-sm text-muted-foreground">{promo.status}</p>
                  </div>
                  <div className="ms-auto font-medium">+${promo.revenue}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
