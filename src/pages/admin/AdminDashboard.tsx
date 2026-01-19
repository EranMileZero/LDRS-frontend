import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Activity, CreditCard, ShieldAlert } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function AdminDashboard() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">{t('admin.title')}</h2>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('admin.stats.total_users')}</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,345</div>
            <p className="text-xs text-muted-foreground">+180 {t('admin.stats.new_today')}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('admin.stats.system_activity')}</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.2%</div>
            <p className="text-xs text-muted-foreground">{t('admin.stats.uptime')}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('admin.stats.active_coupons')}</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">573</div>
            <p className="text-xs text-muted-foreground">+201 {t('admin.stats.since_last_hour')}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('admin.stats.pending_approvals')}</CardTitle>
            <ShieldAlert className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">{t('admin.stats.requires_attention')}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
            <CardHeader>
                <CardTitle>{t('admin.logs.title')}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="flex items-center text-sm">
                        <div className="w-2 h-2 rounded-full bg-green-500 me-2"></div>
                        <span className="font-medium">{t('admin.logs.user_login')}</span>
                        <span className="ms-auto text-muted-foreground">2 mins ago</span>
                    </div>
                    <div className="flex items-center text-sm">
                        <div className="w-2 h-2 rounded-full bg-blue-500 me-2"></div>
                        <span className="font-medium">{t('admin.logs.new_coupon')}</span>
                        <span className="ms-auto text-muted-foreground">5 mins ago</span>
                    </div>
                    <div className="flex items-center text-sm">
                        <div className="w-2 h-2 rounded-full bg-yellow-500 me-2"></div>
                        <span className="font-medium">{t('admin.logs.influencer_app')}</span>
                        <span className="ms-auto text-muted-foreground">10 mins ago</span>
                    </div>
                </div>
            </CardContent>
        </Card>
        <Card className="col-span-3">
             <CardHeader>
                <CardTitle>{t('admin.top_influencers')}</CardTitle>
            </CardHeader>
             <CardContent>
                <div className="space-y-4">
                     <div className="flex items-center">
                        <div className="h-9 w-9 rounded-full bg-slate-200 flex items-center justify-center">A</div>
                        <div className="ms-4 space-y-1">
                            <p className="text-sm font-medium leading-none">Alice Influencer</p>
                            <p className="text-sm text-muted-foreground">alice@example.com</p>
                        </div>
                        <div className="ms-auto font-medium">15k Reach</div>
                    </div>
                </div>
             </CardContent>
        </Card>
      </div>
    </div>
  );
}
