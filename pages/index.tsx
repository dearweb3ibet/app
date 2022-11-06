import { useRouter } from "next/router";
import { useEffect } from "react";

/**
 * Home page.
 */
export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/bets/new");
  }, []);

  return <></>;
}
