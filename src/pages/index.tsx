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
import { useAccount, useContractRead } from "wagmi";
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
import { getUserAccountData } from "~/contractInteraction/user";
import { CONTRACT_ABI, CONTRACT_ADDRESS, NETID } from "../STATIC";
const wagmigotchiABI = CONTRACT_ABI;

export default function Home() {
  const { open, close } = useWeb3Modal();

  const { address } = useAccount();
  const { data, isError, isLoading } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: wagmigotchiABI,
    chainId: NETID,
    functionName: "owner",
  });

  const { data: dataC } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: wagmigotchiABI,
    chainId: NETID,
    functionName: "checkStakedAmount",
    args: ["0x4a8A65e1F3592D44743389FD12Cc013B3c60E1C5"],
  });

  useEffect(() => {
    console.log("Welcome to Decentralance!" + data?.toString(), isLoading);
  }, [data, isLoading]);

  useEffect(() => {
    console.log("Welcome to stake!" + dataC?.toString());
  }, [dataC]);

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
