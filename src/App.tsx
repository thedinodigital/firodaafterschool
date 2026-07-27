import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SCHOOL_SITE_ENABLED, AFTER_SCHOOL_HOME } from "@/config/site";

import { lazy, Suspense } from "react";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Our School
const OurSchool = lazy(() => import("./pages/our-school/OurSchool"));
const Ethos = lazy(() => import("./pages/our-school/Ethos"));
const History = lazy(() => import("./pages/our-school/History"));
const Staff = lazy(() => import("./pages/our-school/Staff"));
const Board = lazy(() => import("./pages/our-school/Board"));

// Parents
const Parents = lazy(() => import("./pages/parents/Parents"));
const Admissions = lazy(() => import("./pages/parents/Admissions"));
const Calendar = lazy(() => import("./pages/parents/Calendar"));
const Newsletters = lazy(() => import("./pages/parents/Newsletters"));
const Uniform = lazy(() => import("./pages/parents/Uniform"));
const Booklists = lazy(() => import("./pages/parents/Booklists"));
const BiCinealta = lazy(() => import("./pages/parents/BiCinealta"));
const Funding = lazy(() => import("./pages/parents/Funding"));

// News
const News = lazy(() => import("./pages/News"));
const NewsPost = lazy(() => import("./pages/NewsPost"));

// Activities
const Activities = lazy(() => import("./pages/activities/Activities"));
const ActivityPage = lazy(() => import("./pages/activities/ActivityPage"));

// After School
const AfterSchool = lazy(() => import("./pages/AfterSchool"));

// Policies
const Policies = lazy(() => import("./pages/Policies"));

// Archive
const Archive = lazy(() => import("./pages/archive/Archive"));
const ArchivePage = lazy(() => import("./pages/archive/ArchivePage"));

// Contact
const Contact = lazy(() => import("./pages/Contact"));

// Admin
const AdminLogin = lazy(() => import("./pages/admin/Login"));
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const AdminNewsList = lazy(() => import("./pages/admin/NewsList"));
const AdminNewsEditor = lazy(() => import("./pages/admin/NewsEditor"));
const AdminPlanning = lazy(() => import("./pages/admin/Planning"));
const AdminPlanningAppeal = lazy(() => import("./pages/admin/PlanningAppeal"));

// Afterschool (FAS)
const FasLogin = lazy(() => import("./pages/afterschool/Login"));
const FasDashboard = lazy(() => import("./pages/afterschool/Dashboard"));
const FasRegister = lazy(() => import("./pages/afterschool/Register"));
const FasChildren = lazy(() => import("./pages/afterschool/Children"));
const FasChildEditor = lazy(() => import("./pages/afterschool/ChildEditor"));
const FasStaff = lazy(() => import("./pages/afterschool/Staff"));
const FasInvoices = lazy(() => import("./pages/afterschool/Invoices"));
const FasInvoiceNew = lazy(() => import("./pages/afterschool/InvoiceNew"));
const FasInvoiceDetail = lazy(() => import("./pages/afterschool/InvoiceDetail"));
const FasSettings = lazy(() => import("./pages/afterschool/Settings"));
const FasPageEditor = lazy(() => import("./pages/afterschool/PageEditor"));
const FasGallery = lazy(() => import("./pages/afterschool/Gallery"));

import { AuthProvider } from "./hooks/useAuth";
import { RequireAuth } from "./pages/admin/RequireAuth";

const queryClient = new QueryClient();

const Loading = () => (
  <div className="min-h-screen flex items-center justify-center bg-cream">
    <img
      src="/firoda-crest.png"
      alt=""
      aria-hidden="true"
      className="w-24 h-auto opacity-80 motion-safe:animate-pulse"
      style={{ animationDuration: "3s" }}
    />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Suspense fallback={<Loading />}>
            <Routes>
              {/* After School — always available */}
              <Route path="/after-school" element={<AfterSchool />} />

              {SCHOOL_SITE_ENABLED ? (
                <>
                  <Route path="/" element={<Index />} />

                  <Route path="/our-school" element={<OurSchool />} />
                  <Route path="/our-school/ethos" element={<Ethos />} />
                  <Route path="/our-school/history" element={<History />} />
                  <Route path="/our-school/staff" element={<Staff />} />
                  <Route path="/our-school/board" element={<Board />} />

                  <Route path="/parents" element={<Parents />} />
                  <Route path="/parents/admissions" element={<Admissions />} />
                  <Route path="/parents/calendar" element={<Calendar />} />
                  <Route path="/parents/newsletters" element={<Newsletters />} />
                  <Route path="/parents/uniform" element={<Uniform />} />
                  <Route path="/parents/booklists" element={<Booklists />} />
                  <Route path="/parents/bi-cinealta" element={<BiCinealta />} />
                  <Route path="/parents/funding" element={<Funding />} />

                  <Route path="/news" element={<News />} />
                  <Route path="/news/:slug" element={<NewsPost />} />

                  <Route path="/activities" element={<Activities />} />
                  <Route path="/activities/:slug" element={<ActivityPage />} />

                  <Route path="/policies" element={<Policies />} />

                  <Route path="/archive" element={<Archive />} />
                  <Route path="/archive/:slug" element={<ArchivePage />} />

                  <Route path="/contact" element={<Contact />} />
                </>
              ) : (
                /* School site switched off — pages kept, routes redirected */
                <>
                  <Route path="/" element={<Navigate to={AFTER_SCHOOL_HOME} replace />} />
                  <Route path="/our-school/*" element={<Navigate to={AFTER_SCHOOL_HOME} replace />} />
                  <Route path="/parents/*" element={<Navigate to={AFTER_SCHOOL_HOME} replace />} />
                  <Route path="/news/*" element={<Navigate to={AFTER_SCHOOL_HOME} replace />} />
                  <Route path="/activities/*" element={<Navigate to={AFTER_SCHOOL_HOME} replace />} />
                  <Route path="/archive/*" element={<Navigate to={AFTER_SCHOOL_HOME} replace />} />
                  <Route path="/policies" element={<Navigate to={AFTER_SCHOOL_HOME} replace />} />
                  <Route path="/contact" element={<Navigate to={AFTER_SCHOOL_HOME} replace />} />
                </>
              )}


              {/* Admin */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<RequireAuth><AdminDashboard /></RequireAuth>} />
              <Route path="/admin/news" element={<RequireAuth><AdminNewsList /></RequireAuth>} />
              <Route path="/admin/news/new" element={<RequireAuth><AdminNewsEditor /></RequireAuth>} />
              <Route path="/admin/news/:id/edit" element={<RequireAuth><AdminNewsEditor /></RequireAuth>} />
              <Route path="/admin/planning" element={<RequireAuth><AdminPlanning /></RequireAuth>} />
              <Route path="/admin/planning/appeal" element={<RequireAuth><AdminPlanningAppeal /></RequireAuth>} />

              {/* Afterschool (FAS) */}
              <Route path="/afterschool-admin/login" element={<FasLogin />} />
              <Route path="/afterschool-admin" element={<FasDashboard />} />
              <Route path="/afterschool-admin/register" element={<FasRegister />} />
              <Route path="/afterschool-admin/children" element={<FasChildren />} />
              <Route path="/afterschool-admin/children/new" element={<FasChildEditor />} />
              <Route path="/afterschool-admin/children/:id" element={<FasChildEditor />} />
              <Route path="/afterschool-admin/children/:id/edit" element={<FasChildEditor />} />
              <Route path="/afterschool-admin/staff" element={<FasStaff />} />
              <Route path="/afterschool-admin/invoices" element={<FasInvoices />} />
              <Route path="/afterschool-admin/invoices/new" element={<FasInvoiceNew />} />
              <Route path="/afterschool-admin/invoices/:id" element={<FasInvoiceDetail />} />
              <Route path="/afterschool-admin/settings" element={<FasSettings />} />
              <Route path="/afterschool-admin/page" element={<FasPageEditor />} />
              <Route path="/afterschool-admin/gallery" element={<FasGallery />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
