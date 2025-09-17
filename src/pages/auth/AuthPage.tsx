import { Banner } from "../../components/auth/Banner";
import { AuthCard } from "../../components/auth/AuthCard";

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-gray-50 main-bg">
      <div className="flex min-h-screen">
        <Banner />
        <div className="flex items-center justify-center w-full px-6 py-12 lg:w-1/2">
          <AuthCard />
        </div>
      </div>
    </div>
  );
}
