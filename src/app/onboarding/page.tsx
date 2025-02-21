import OnboardingView from '@/sections/onboarding/views/onboarding-view';
import ProtectedRoute from '@/components/protected-route';

export const metadata = {
  title: 'Onboarding',
};

export default function Page() {
  return (<ProtectedRoute><OnboardingView /></ProtectedRoute>);
}
