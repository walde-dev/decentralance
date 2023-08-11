/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  ArrowRightIcon,
  ChevronDownIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons";
import { useWeb3Modal } from "@web3modal/react";
import { Plus } from "lucide-react";
import Head from "next/head";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
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
          <div className="flex flex-row items-center justify-center gap-x-6">
            <Button
              variant={address ? "outline" : "default"}
              onClick={() => open()}
            >
              {address ? (
                <>
                  <span>
                    {address?.slice(0, 6) + "..." + address?.slice(-4)}
                  </span>
                  <ChevronDownIcon className="ml-2 h-5 w-5" />
                </>
              ) : (
                "Login"
              )}
            </Button>
            {!!address && <PostJobModal />}
          </div>
        </div>
        <div className="flex h-full w-full flex-row items-center justify-center gap-x-4 pt-[350px] "></div>
      </main>
    </>
  );
}

const PostJobModal = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="flex justify-center gap-x-2">
          <Plus /> Post new Job
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Post a new job</DialogTitle>
          <DialogDescription>
            lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
