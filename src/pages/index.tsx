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
import { useAccount } from "wagmi";
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

export default function Home() {
  const { open, close } = useWeb3Modal();

  const { address } = useAccount();

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
          <Button variant="outline" className="ml-6 mt-2 gap-x-1 text-white">
            <span className="">Register</span>
            <ArrowRightIcon className="h-4 w-4" />
          </Button>
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
