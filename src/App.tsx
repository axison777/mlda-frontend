import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';

// Layouts
import { AppLayout } from '@/components/layout/AppLayout';
import { ProtectedRoute } from '@/components/ProtectedRoute';

// Public Pages
import { LandingPage } from '@/pages/public/LandingPage';
import { CoursesPage } from '@/pages/public/CoursesPage';
import { ContactPage } from '@/pages/public/ContactPage';
import { ShopPage } from '@/pages/public/ShopPage';
import { LoginPage } from '@/pages/auth/LoginPage';
import { SignupPage } from '@/pages/auth/SignupPage';

// Dashboard Pages
import { AdminDashboard } from '@/pages/admin/AdminDashboard';
import { UsersManagement } from '@/pages/admin/UsersManagement';
import { TeacherTracking } from '@/pages/admin/TeacherTracking';
import { StudentTracking } from '@/pages/admin/StudentTracking';
import { CoursesManagement } from '@/pages/admin/CoursesManagement';
import { ProductsManagement } from '@/pages/admin/ProductsManagement';
import { PaymentsManagement } from '@/pages/admin/PaymentsManagement';
import { AdsManagement } from '@/pages/admin/AdsManagement';
import { AdminSettings } from '@/pages/admin/AdminSettings';
import { ProfessorDashboard } from '@/pages/professor/ProfessorDashboard';
import { MyCourses as ProfessorCourses } from '@/pages/professor/MyCourses';
import { CreateCourse } from '@/pages/professor/CreateCourse';
import { LessonsQuiz } from '@/pages/professor/LessonsQuiz';
import { MyStudents } from '@/pages/professor/MyStudents';
import { ProfessorProfile } from '@/pages/professor/ProfessorProfile';
import { StudentDashboard } from '@/pages/student/StudentDashboard';
import { MyCourses as StudentCourses } from '@/pages/student/MyCourses';
import { ContinueCourse } from '@/pages/student/ContinueCourse';
import { LevelTest } from '@/pages/student/LevelTest';
import { Subscriptions } from '@/pages/student/Subscriptions';
import { StudentProfile } from '@/pages/student/StudentProfile';

// Shared Pages
import { MessagesPage } from '@/pages/shared/MessagesPage';
import { AchievementsPage } from '@/pages/shared/AchievementsPage';
import { ReportsPage } from '@/pages/shared/ReportsPage';

const queryClient = new QueryClient();

function App() {
  const { initializeAuth } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Protected Dashboard Routes */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute requiredRole="admin">
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<UsersManagement />} />
            <Route path="teachers" element={<TeacherTracking />} />
            <Route path="students" element={<StudentTracking />} />
            <Route path="courses" element={<CoursesManagement />} />
            <Route path="products" element={<ProductsManagement />} />
            <Route path="payments" element={<PaymentsManagement />} />
            <Route path="ads" element={<AdsManagement />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="messages" element={<MessagesPage />} />
          </Route>

          <Route
            path="/professor/*"
            element={
              <ProtectedRoute requiredRole="professor">
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<ProfessorDashboard />} />
            <Route path="courses" element={<ProfessorCourses />} />
            <Route path="students" element={<MyStudents />} />
            <Route path="profile" element={<ProfessorProfile />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="messages" element={<MessagesPage />} />
          </Route>

          <Route
            path="/student/*"
            element={
              <ProtectedRoute requiredRole="student">
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<StudentDashboard />} />
            <Route path="courses" element={<StudentCourses />} />
            <Route path="continue" element={<ContinueCourse />} />
            <Route path="level-test" element={<LevelTest />} />
            <Route path="subscriptions" element={<Subscriptions />} />
            <Route path="profile" element={<StudentProfile />} />
            <Route path="messages" element={<MessagesPage />} />
            <Route path="achievements" element={<AchievementsPage />} />
          </Route>
        </Routes>
        <Toaster />
      </Router>
    </QueryClientProvider>
  );
}

export default App;