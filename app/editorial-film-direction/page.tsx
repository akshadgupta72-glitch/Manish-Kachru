import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { servicePages } from "@/lib/service-pages";

const page = servicePages["editorial-film-direction"];

export const metadata: Metadata = {
  title: page.title,
  description: page.description
};

export default function EditorialFilmDirectionPage() {
  return <ServicePageTemplate page={page} />;
}
