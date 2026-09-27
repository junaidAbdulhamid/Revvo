import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Book from "@/components/sections/Book";

export const metadata: Metadata = {
  title: "Book a Free Consultation | Revvo",
  description: "Pick a time for a free 30-minute consultation about AI automations for your business.",
};

export default function BookPage() {
  return (
    <>
      <main className="pt-[70px]">
        <Book standalone />
      </main>
      <Footer />
    </>
  );
}
