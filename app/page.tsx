'use client';

import dynamic from "next/dynamic";

const App = dynamic(() => import("@/src/App"), {
  ssr: false,
  loading: () => <div>Loading…</div>,
});

export default function Page() {
  return <App />;
}