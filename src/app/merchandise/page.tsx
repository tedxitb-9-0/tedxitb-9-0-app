import { redirect } from "next/navigation";
import { getSession } from "~/server/better-auth/server";
import MerchandiseGrid from "./_components/MerchandiseGrid";

export default async function MerchandisePage() {
  const session = await getSession();

  if (!session) {
    redirect("/signin");
  }

  return (
    <main>
      <h1 className="sr-only">TEDxITB 9.0 Merchandise</h1>
      <MerchandiseGrid />
    </main>
  );
}
