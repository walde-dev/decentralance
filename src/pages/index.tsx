/* eslint-disable @typescript-eslint/no-misused-promises */
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { useWeb3Modal } from "@web3modal/react";
import Head from "next/head";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import { Button } from "~/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "~/components/ui/navigation-menu";

export default function Home() {
  const { open, close } = useWeb3Modal();

  const { address } = useAccount();

  return (
    <>
      <Head>
        <title>decentralance</title>
        <meta name="description" content="Decentralized Freelance Platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center bg-[#050210] px-64 py-8">
        <div className="flex w-full flex-row items-center justify-between">
          <span className="text-4xl font-semibold text-gray-200">
            decentralance
          </span>

          <Button
            variant={address ? "outline" : "default"}
            onClick={() => open()}
          >
            {address
              ? address?.slice(0, 6) + "..." + address?.slice(-4) 
              : "Login"}
          </Button>
        </div>
        <div className="flex h-full w-full flex-row items-center justify-center gap-x-4 pt-[350px] "></div>
      </main>
    </>
  );
}
