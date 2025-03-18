import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import { Suspense } from 'react';
import './index.css'
import ToastComponent from "./components/ToastComponent";
import router from "./router";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastComponent />
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>

  </StrictMode>,
)
