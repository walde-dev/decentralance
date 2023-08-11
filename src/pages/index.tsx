import Head from "next/head";
import { Button } from "~/components/ui/button";

export default function Home() {
  return (
    <>
      <Head>
        <title>decentralance</title>
        <meta name="description" content="Decentralized Freelance Platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center bg-[#050210] py-8">
        <span className="text-4xl font-semibold text-gray-200">
          decentralance
        </span>
        <div className="flex h-full w-full flex-row items-center justify-center pt-[350px] ">
          <Button>Login</Button>
          <Button variant={"outline"}>Read Documentation</Button>
        </div>
      </main>
    </>
  );
}
