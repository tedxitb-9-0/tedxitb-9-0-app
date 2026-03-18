import { api } from "~/trpc/server";
import MagazineClient from "./MagazineClient";

export default async function MagazinePage() {
    const [latestMagazine, magazines] = await Promise.all([
        api.magazine.getLatest(),
        api.magazine.getAll(),
    ]);

    return (
        <>
            <MagazineClient latestMagazine={latestMagazine} magazines={magazines} />
        </>
    );
}
