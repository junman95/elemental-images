"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="text-lg font-bold tracking-tight">
          五行 관상
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            href="/analyze"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            분석하기
          </Link>
        </nav>
      </div>
    </header>
  );
}
