import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const queryClient = new QueryClient();

const Loading = () => (
  <div className="min-h-screen flex items-center justify-center bg-cream">
    <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
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

            <Route path="/after-school" element={<AfterSchool />} />

            <Route path="/policies" element={<Policies />} />

            <Route path="/archive" element={<Archive />} />
            <Route path="/archive/:slug" element={<ArchivePage />} />

            <Route path="/contact" element={<Contact />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
