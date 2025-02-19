import DashboardView from '@/sections/dashboard/views/dashboard-view';
import ProtectedRoute from '@/components/protected-route';
export const metadata = {
  title: 'Dashbord',
};

export default function Page() {
  return (
    <ProtectedRoute>
      <DashboardView />
    </ProtectedRoute>
  );
}
