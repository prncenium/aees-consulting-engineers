import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '@/layouts/RootLayout';
import ErrorBoundaryPage from '@/pages/ErrorBoundaryPage';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Sectors from '@/pages/Sectors';
import Projects from '@/pages/Projects';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/NotFound';

/**
 * Single route table for the site. Adding a page = add an entry here and a
 * matching item in `src/data/site.js` -> navigation.
 */
export const routes = [
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorBoundaryPage />,
    children: [
      { index: true, element: <Home /> },
      { path: 'sectors', element: <Sectors /> },
      { path: 'projects', element: <Projects /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: '*', element: <NotFound /> },
    ],
  },
];

export const router = createBrowserRouter(routes);

export default router;
