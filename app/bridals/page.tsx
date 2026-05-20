import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { servicePages } from "@/lib/service-pages";

const page = servicePages.bridals;

export const metadata: Metadata = {
  title: page.title,
  description: page.description
};

export default function BridalsPage() {
  return <ServicePageTemplate page={page} />;
}
