import type { Metadata } from "next";
import { RegistrationFlow } from "./RegistrationFlow";

export const metadata: Metadata = { title: "Register", description: "Register for Indian Creative Star Season 02 in a few minutes from your phone." };

export default async function RegisterPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category } = await searchParams;
  return <RegistrationFlow initialCategory={category ?? ""} />;
}
