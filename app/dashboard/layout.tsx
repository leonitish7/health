import { Providers } from '@/components/Providers';
import DashboardLayout from '@/components/DashboardLayout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <DashboardLayout>{children}</DashboardLayout>
    </Providers>
  );
}
