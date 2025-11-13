import React, { useState, useEffect } from 'react';

/*
  Central UI exports replacing shadcn/radix components.
  Exports: Button, Card, Input, Dialog, Tabs, Tab, Tooltip, Toaster
*/

export function Button({ children, className = '', ...props }) {
  return (
    <button className={'px-3 py-2 rounded-md bg-blue-600 text-white ' + className} {...props}>
      {children}
    </button>
  )
}
// export const ArrowRight = (props) => (
//   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props} aria-hidden="true">
//     <circle cx="12" cy="12" r="3" />
//   </svg>
// );

// export const Loader2 = (props) => (
//   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props} aria-hidden="true">
//     <circle cx="12" cy="12" r="3" />
//   </svg>
// );
export function Card({ children, className = '' }) {
  return <div className={'p-4 rounded-lg shadow-sm bg-white ' + className}>{children}</div>
}

export function Input(props) {
  return <input className="border rounded px-2 py-1 w-full" {...props} />
}

export function Dialog({ open, onOpenChange, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-40">
      <div className="bg-white rounded-lg p-4 max-w-lg w-full">{children}</div>
    </div>
  )
}

export function Tabs({ children }) {
  return <div className="space-y-2">{children}</div>
}

export function Tab({ children }) {
  return <div>{children}</div>
}

export function Tooltip({ children, text }) {
  const [show, setShow] = React.useState(false);
  return (
    <span onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)} className="relative inline-block">
      {children}
      {show && (
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs bg-black text-white rounded px-2 py-1 whitespace-nowrap">
          {text}
        </span>
      )}
    </span>
  );
}

/* Simple Toaster system */
let globalToast = null;
export function ToasterContainer() {
  const [toasts, setToasts] = useState([]);
  useEffect(() => {
    globalToast = {
      show: (msg, duration = 3000) => {
        const id = Date.now();
        setToasts((t) => [...t, { id, msg }]);
        setTimeout(() => setToasts((t) => t.filter(x => x.id !== id)), duration);
      }
    };
    return () => { globalToast = null; }
  }, []);
  if (toasts.length === 0) return null;
  return (
    <div className="fixed bottom-4 right-4 space-y-2">
      {toasts.map(t => (
        <div key={t.id} className="bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg">
          {t.msg}
        </div>
      ))}
    </div>
  );
}

export function toast(msg, duration) {
  if (globalToast && globalToast.show) globalToast.show(msg, duration);
}

export default {
  Button, Card, Input, Dialog, Tabs, Tab, Tooltip, ToasterContainer, toast
};

export const AlertTriangle = (props) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props} aria-hidden="true">
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const ArrowLeft = (props) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props} aria-hidden="true">
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const ArrowRight = (props) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props} aria-hidden="true">
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const Check = (props) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props} aria-hidden="true">
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const ChevronDown = (props) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props} aria-hidden="true">
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const ChevronLeft = (props) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props} aria-hidden="true">
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const ChevronRight = (props) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props} aria-hidden="true">
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const ChevronUp = (props) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props} aria-hidden="true">
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const Circle = (props) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props} aria-hidden="true">
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const Code = (props) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props} aria-hidden="true">
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const Dot = (props) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props} aria-hidden="true">
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const Github = (props) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props} aria-hidden="true">
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const GripVertical = (props) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props} aria-hidden="true">
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const Home = (props) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props} aria-hidden="true">
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const Loader2 = (props) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props} aria-hidden="true">
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const Moon = (props) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props} aria-hidden="true">
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const MoreHorizontal = (props) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props} aria-hidden="true">
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const PanelLeft = (props) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props} aria-hidden="true">
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const Play = (props) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props} aria-hidden="true">
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const Plus = (props) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props} aria-hidden="true">
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const RefreshCw = (props) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props} aria-hidden="true">
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const Search = (props) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props} aria-hidden="true">
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const Share2 = (props) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props} aria-hidden="true">
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const Square = (props) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props} aria-hidden="true">
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const Sun = (props) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props} aria-hidden="true">
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const Terminal = (props) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props} aria-hidden="true">
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const Trash2 = (props) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props} aria-hidden="true">
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const User = (props) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props} aria-hidden="true">
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const Users = (props) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props} aria-hidden="true">
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const X = (props) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props} aria-hidden="true">
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const Zap = (props) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props} aria-hidden="true">
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export function Select({ value, onValueChange, children }) {
  return (
    <select
      value={value}
      onChange={(e) => onValueChange && onValueChange(e.target.value)}
      className="border rounded px-2 py-1 w-full"
    >
      {children}
    </select>
  );
}

export function SelectTrigger({ children, className = '' }) {
  return <div className={'relative ' + className}>{children}</div>;
}

export function SelectValue({ placeholder }) {
  return <span className="text-gray-600">{placeholder}</span>;
}

export function SelectContent({ children }) {
  return <>{children}</>;
}

export function SelectItem({ value, children }) {
  return <option value={value}>{children}</option>;
}
