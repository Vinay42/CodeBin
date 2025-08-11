import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import Room from "./pages/Room";
import NotFound from "./pages/NotFound";
import React from "react";
import CodeRunner from "./CodeRunner.jsx";

// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <ThemeProvider
//       attribute="class"
//       defaultTheme="dark"
//       enableSystem
//       disableTransitionOnChange
//     >
//       <TooltipProvider>
//         <Toaster />
//         <Sonner />
//         <BrowserRouter
//           future={{
//           v7_startTransition: true,
//           v7_relativeSplatPath: true,
//       }}
//         >
//           <Routes>
//             <Route path="/" element={<Index />} />
//             <Route path="/room/:roomId" element={<Room />} />
//             {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
//             <Route path="*" element={<NotFound />} />
//           </Routes>
//         </BrowserRouter>
//       </TooltipProvider>
//     </ThemeProvider>
//   </QueryClientProvider>
// );


function App() {
  return (
    <div>
      <h1>Interactive Code Runner</h1>
      <CodeRunner />
    </div>
  );
}

export default App;