import { Button } from "@/components/ui/button";
import { PlusSquare } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Create Your Resume or CV",
  description:
    "Create your resume or CV with a simple drag and drop interface.",
};

export default function Page() {
  return (
    <main className=" mx-auto max-w-7xl w-full px-3 py-6 space-y-6">
      <Button asChild className="mx-auto flex w-fit gap-2">
        <Link href="/editor">
          <PlusSquare className="size-5" />
          New resume / CV
        </Link>
      </Button>
    </main>
  );
}
