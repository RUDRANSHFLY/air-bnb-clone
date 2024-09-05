import getCurrentUser from "@/actions/getCurrentUser";
import getListings, { IListingsParams } from "@/actions/getListings";
import ListingsCard from "@/components/card/ListingsCard";
import Container from "@/components/helper/Container";
import EmptyState from "@/components/rent/EmptyState";

export const dynamic = "force-dynamic";

interface HomeProps {
  searchParams: IListingsParams;
}

export default async function Home({ searchParams }: HomeProps) {
  const sessionCurrentUser = await getCurrentUser();
  const listings = await getListings(searchParams);

  const isEmpty = listings.length === 0;

  return (
    <main className={"relative font-mono"}>
      <div className={"pt-28 pb-20"}>
        <Container>
          {isEmpty ? (
            <div className={"w-full"}>
              <EmptyState showReset />
            </div>
          ) : (
            <div
              className={
                "pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8"
              }
            >
              {listings.map((listing) => (
                <ListingsCard
                  data={listing}
                  key={listing.id}
                  actionId={""}
                  currentUser={sessionCurrentUser}
                />
              ))}
            </div>
          )}
        </Container>
      </div>
    </main>
  );
}
