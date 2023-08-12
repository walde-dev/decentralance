/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  ArrowRightIcon,
  ChevronDownIcon,
  ExclamationTriangleIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons";
import { useWeb3Modal } from "@web3modal/react";
import { Plus } from "lucide-react";
import Head from "next/head";
import { useEffect, useState } from "react";

import { useAccount, useContractRead } from "wagmi";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import JobLists from "~/components/job-lists";
import { Separator } from "~/components/ui/separator";
import { Checkbox } from "~/components/ui/checkbox";

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

  const [selectedView, setSelectedView] = useState<"worker" | "client">(
    "worker"
  );

  function handleViewChange(value: "worker" | "client") {
    setSelectedView(value);
    window.localStorage.setItem("selectedView", value);
  }

  useEffect(() => {
    if (window.localStorage.getItem("selectedView")) {
      setSelectedView(
        window.localStorage.getItem("selectedView") as "worker" | "client"
      );
    }
  }, []);

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
          <div className="flex flex-row items-center justify-center gap-x-2">
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
            <Select
              onValueChange={(value: "worker" | "client") =>
                handleViewChange(value)
              }
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue
                  placeholder={
                    selectedView === "client" ? "Client" : "Freelancer"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="worker">Freelancer</SelectItem>
                <SelectItem value="client">Client</SelectItem>
              </SelectContent>
            </Select>

            {!!address && <PostJobModal />}
          </div>
        </div>
        <Separator className="my-8" />
        <div className="flex h-full w-full flex-col  justify-center gap-y-4 ">
          <h1 className="text-3xl">
            {selectedView === "client"
              ? "Browse Freelancers"
              : "Browse Projects"}
          </h1>
          <JobLists />
        </div>
      </main>
    </>
  );
}

const PostJobModal = () => {
  const formSchema = z.object({
    title: z.string().min(2).max(50),
    description: z.string().min(2).max(500),
    budget: z.number().min(0),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      budget: 0.001,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="flex justify-center gap-x-2">
          <Plus /> Post new Job
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Post a new job</DialogTitle>
          {/* <DialogDescription>Post a new job</DialogDescription> */}
        </DialogHeader>
        <Alert variant={"destructive"}>
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle className="text-white">Heads up!</AlertTitle>
          <AlertDescription className="text-white">
            You first need to register your account before you can post a job.
          </AlertDescription>
          <RegisterModal />
        </Alert>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-4 space-y-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormDescription>
                    Provide as much detail as possible
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Budget</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" step={0.001} />
                  </FormControl>
                  <FormDescription>in ETH</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex w-full items-center justify-end">
              <Button disabled type="submit">
                Post the Job
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

const RegisterModal = () => {
  const items = [
    {
      id: "frontend",
      label: "Frontend",
    },
    {
      id: "backend",
      label: "Backend",
    },
    {
      id: "design",
      label: "Design",
    },
    {
      id: "marketing",
      label: "Marketing",
    },
  ] as const;

  const formSchema = z.object({
    name: z.string().min(2).max(50),
    description: z.string().min(2).max(500),
    workType: z.object({
      items: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: "You have to select at least one item.",
      }),
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }


  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline" className=" mt-2 gap-x-1 text-white">
          <span className="">Register</span>
          <ArrowRightIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Welcome 👋 </DialogTitle>
          <DialogDescription>
            In order to be able to apply for jobs, you need to stake some ETH
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>About you</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
                <FormDescription>
                  Tell us a bit about yourself and your skills
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="workType"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Your Skills</FormLabel>
                  <FormDescription>
                    Select the skills you want to be hired for
                  </FormDescription>
                </div>
                {items.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="workType"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.items.includes(item.id)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  field.onChange({
                                    items: [
                                      ...(field.value?.items ?? []),
                                      item.id,
                                    ],
                                  });
                                } else {
                                  field.onChange({
                                    items: field.value?.items.filter(
                                      (i) => i !== item.id
                                    ),
                                  });
                                }
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />
        </Form>
        <Button>Stake 0.01 ETH</Button>
      </DialogContent>
    </Dialog>
  );
};
