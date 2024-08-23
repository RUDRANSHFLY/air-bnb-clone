import getCurrentUser from "@/actions/getCurrentUser";
import SignInComp from "@/components/auth/SignInComp";
import SignUpComp from "@/components/auth/SignUpComp";
import NavBar from "@/components/navbar/NavBar";
import Rent from "@/components/rent/Rent";

export const dynamic = "force-dynamic";

export default async function Home() {
  const sessionCurrentUser = await getCurrentUser();

  return (
    <main>
      <SignInComp />
      <SignUpComp />
      <Rent />
      <NavBar currentUser={sessionCurrentUser} />
    </main>
  );
}
