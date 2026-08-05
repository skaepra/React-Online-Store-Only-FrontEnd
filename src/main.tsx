import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./Layout";

// الحصول على عنصر الـ root من ملف HTML
const rootElement = document.getElementById('root');

// التأكد من أن العنصر موجود لمنع أخطاء TypeScript (Null Check)
if (!rootElement) {
  throw new Error("Failed to find the root element. Make sure index.html has a <div id='root'></div>");
}

createRoot(rootElement).render(
  <StrictMode>
    <Router>
      <Layout /> 
    </Router>  
  </StrictMode>
);