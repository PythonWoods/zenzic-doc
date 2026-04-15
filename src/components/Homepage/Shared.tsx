import React, { ReactNode } from 'react';

export function TrendIcon(): React.JSX.Element {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>;
}

export function Iso({children}: {children: ReactNode}): React.JSX.Element {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-full h-full text-zinc-600 stroke-current opacity-70 group-hover:opacity-100 transition-opacity" fill="none" strokeWidth="0.75" strokeLinejoin="round" strokeLinecap="round">{children}</svg>;
}
