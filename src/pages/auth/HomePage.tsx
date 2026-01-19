import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] gap-8 text-center p-4">
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Welcome to LDRS
        </h1>
        <p className="text-xl text-muted-foreground max-w-[600px]">
          The ultimate platform for influencers to manage campaigns and for consumers to discover the best deals.
        </p>
      </div>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link to="/influencer">
          <Button size="lg" className="h-24 w-48 text-lg flex flex-col gap-2">
            <span>Influencer</span>
            <span className="text-xs font-normal opacity-80">Manage Campaigns</span>
          </Button>
        </Link>
        <Link to="/consumer">
          <Button size="lg" variant="secondary" className="h-24 w-48 text-lg flex flex-col gap-2">
            <span>Consumer</span>
            <span className="text-xs font-normal opacity-80">Browse Deals</span>
          </Button>
        </Link>
        <Link to="/admin">
          <Button size="lg" variant="outline" className="h-24 w-48 text-lg flex flex-col gap-2">
            <span>Admin</span>
            <span className="text-xs font-normal opacity-80">Back Office</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
