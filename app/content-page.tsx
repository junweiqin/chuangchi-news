import type { ReactNode } from "react";
import { SiteFooter, SiteHeader } from "./site-chrome";

type ContentPageProps = {
  eyebrow: string;
  title: string;
  lead: string;
  children: ReactNode;
  reviewNote?: string;
};

export function ContentPage({
  eyebrow,
  title,
  lead,
  children,
  reviewNote,
}: ContentPageProps) {
  return (
    <main>
      <SiteHeader />
      <article className="content-page">
        <header className="content-hero">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p>{lead}</p>
          {reviewNote && <p className="review-note">{reviewNote}</p>}
        </header>
        <div className="content-body">{children}</div>
      </article>
      <SiteFooter />
    </main>
  );
}
