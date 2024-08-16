import getCurrentUser from "@/actions/getCurrentUser";
import SignInComp from "@/components/auth/SignInComp";
import SignUpComp from "@/components/auth/SignUpComp";
import NavBar from "@/components/navbar/NavBar";

export const dynamic = "force-dynamic";

export default async function Home() {
  const sessionCurrentUser = await getCurrentUser();

  return (
    <main>
      <SignInComp />
      <SignUpComp />
      <NavBar currentUser={sessionCurrentUser} />
    </main>
  );
}
