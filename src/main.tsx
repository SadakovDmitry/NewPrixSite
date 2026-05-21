import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

if (import.meta.env.DEV) {
  void import('@21st-extension/toolbar-react').then(({ TwentyFirstToolbar }) => {
    const toolbarRoot = document.createElement('div');
    toolbarRoot.id = 'stagewise-toolbar-root';
    document.body.appendChild(toolbarRoot);

    createRoot(toolbarRoot).render(
      <StrictMode>
        <TwentyFirstToolbar config={{ plugins: [] }} />
      </StrictMode>,
    );
  });
}
