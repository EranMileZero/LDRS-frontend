import { COUPONS } from "@/lib/mockData";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ConsumerMarketplace() {
  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Marketplace</h1>
        <div className="flex flex-1 gap-4 md:max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search coupons..."
              className="pl-8"
            />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="fashion">Fashion</SelectItem>
              <SelectItem value="food">Food</SelectItem>
              <SelectItem value="health">Health</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Coupon Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {COUPONS.map((coupon) => (
          <Card key={coupon.id} className="overflow-hidden flex flex-col">
            <div className="aspect-video w-full overflow-hidden">
              <img
                src={coupon.image}
                alt={coupon.title}
                className="h-full w-full object-cover transition-all hover:scale-105"
              />
            </div>
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="outline">{coupon.category}</Badge>
                <span className="text-sm text-muted-foreground">{coupon.brand}</span>
              </div>
              <CardTitle className="line-clamp-1">{coupon.title}</CardTitle>
              <CardDescription className="line-clamp-2">
                {coupon.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
               <div className="text-2xl font-bold text-primary">{coupon.discount}</div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Get Coupon</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
