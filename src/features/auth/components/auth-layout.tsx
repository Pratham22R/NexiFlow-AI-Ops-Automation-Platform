"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!wrapperRef.current || !contentRef.current) return;

    const wrapper = wrapperRef.current;
    const content = contentRef.current;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { duration: 0.7, ease: "power3.out" },
      });

      tl.from(wrapper, { autoAlpha: 0, y: 16, scale: 0.996 });

      const targets = content.children.length
        ? Array.from(content.children)
        : [content];

      tl.from(
        targets,
        {
          y: 10,
          autoAlpha: 0,
          stagger: 0.06,
        },
        "-=0.28"
      );
    }, wrapper);

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-gradient-to-b from-white via-slate-50 to-slate-100 min-h-[100svh] flex flex-col justify-center items-center p-6 md:p-10">
      <div className="w-full max-w-sm flex flex-col gap-6">
        <Link
          href="/"
          className="flex items-center gap-3 self-center font-medium select-none transition-transform duration-300 ease-out hover:scale-[1.03] focus-visible:scale-[1.03] outline-none"
        >
          <div
            aria-hidden
            className="w-11 h-11 rounded-lg flex items-center justify-center bg-gradient-to-br from-indigo-600 to-violet-500 shadow-md shadow-indigo-100/40 transform transition-transform duration-500 will-change-transform"
          >
            <Image src="/logo.svg" alt="Nexiflow" width={30} height={30} />
          </div>

          <span className="hidden sm:inline text-lg font-semibold text-slate-900 tracking-tight">
            Nexiflow
          </span>
        </Link>

        <div
          ref={wrapperRef}
          className="w-full bg-white/90 backdrop-blur-md border border-gray-100 rounded-2xl p-6 shadow-lg shadow-slate-900/6"
        >
          <div ref={contentRef} className="space-y-4">
            {children}
          </div>
        </div>

        <div className="text-center text-xs text-slate-400">
          <span>By continuing, you agree to our </span>
          <a
            className="underline decoration-slate-200 hover:decoration-indigo-300"
            href="#"
          >
            Terms
          </a>
          <span> &amp; </span>
          <a
            className="underline decoration-slate-200 hover:decoration-indigo-300"
            href="#"
          >
            Privacy
          </a>
        </div>
      </div>
    </div>
  );
};
