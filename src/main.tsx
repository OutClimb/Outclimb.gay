import './index.scss'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Contact from 'views/Contact/Contact.tsx'
import Event from 'views/Event/Event.tsx'
import Events from 'views/Events/Events.tsx'
import Home from 'views/Home/Home.tsx'
import MeetTheTeam from 'views/MeetTheTeam/MeetTheTeam.tsx'
import NotFound from 'views/NotFound/NotFound.tsx'
import React from 'react'
import ReactDOM from 'react-dom/client'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/events',
        element: <Events />,
    },
    {
        path: '/events/:slug',
        element: <Event />,
    },
    {
        path: '/meet-the-team',
        element: <MeetTheTeam />,
    },
    {
        path: '/contact',
        element: <Contact />,
    },
    {
        path: '/404',
        element: <NotFound />,
    },
    {
        path: '*',
        element: <Navigate to="/404" replace />,
    },
])

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 43200000, // 12 Hours
            refetchOnWindowFocus: 'always',
        },
    },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    </React.StrictMode>,
)
