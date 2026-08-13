"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { navigation } from "../lib/docs";
import { Brand } from "./brand";

export function MobileNav() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  function close() {
    dialogRef.current?.close();
  }

  return (
    <>
      <button
        type="button"
        className="icon-button mobile-menu-button"
        aria-label="Open navigation"
        onClick={() => dialogRef.current?.showModal()}
      >
        <Menu size={19} aria-hidden="true" />
      </button>

      <dialog
        ref={dialogRef}
        className="mobile-nav-dialog"
        aria-label="Documentation navigation"
        onClick={(event) => {
          if (event.currentTarget === event.target) close();
        }}
      >
        <div className="mobile-nav-panel">
          <div className="mobile-nav-header">
            <Brand />
            <button
              type="button"
              className="icon-button"
              aria-label="Close navigation"
              onClick={close}
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>
          <nav className="mobile-nav-content" aria-label="Mobile documentation">
            {navigation.map((section) => (
              <section className="mobile-nav-section" key={section.label}>
                <p>{section.label}</p>
                <ul>
                  {section.items.map((item) => (
                    <li key={item.href}>
                      {item.external ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noreferrer"
                          onClick={close}
                        >
                          <span>{item.label}</span>
                          <ArrowUpRight size={14} aria-hidden="true" />
                        </a>
                      ) : (
                        <Link href={item.href} onClick={close}>
                          {item.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </nav>
        </div>
      </dialog>
    </>
  );
}
