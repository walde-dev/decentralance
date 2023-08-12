import { SewingPinFilledIcon, StarFilledIcon } from "@radix-ui/react-icons";
import {
  ArrowRight,
  Building,
  Clock,
  LocateIcon,
  NavigationIcon,
  Wallet,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Checkbox } from "./ui/checkbox";
import { Separator } from "./ui/separator";
import { useState } from "react";
import { CheckedState } from "@radix-ui/react-checkbox";

const mockJobs = [
  {
    title: "Flutter Developer for a healthcare application",
    company: "Boogle",
    location: "Remote",
    type: "Full Time",
    budget: 10,
    minimumRating: 4.8,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id.",
  },
  {
    title: "UI/UX Designer for a new crypto wallet app",
    company: "Mutamusk",
    location: "Remote",
    type: "Full Time",
    budget: 7,
    minimumRating: 4.5,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id.",
  },
  {
    title: "Python Backend Developer for AI chatbot",
    company: "closedAI",
    location: "Remote",
    type: "Full Time",
    budget: 14,
    minimumRating: 4.9,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id.",
  },
  {
    title: "Tester for a new food delivery app",
    company: "BuberEats",
    location: "Onsite (Munich, Germany)",
    type: "Part Time",
    budget: 4,
    minimumRating: 3,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id.",
  },
];

const JobLists = () => {
  const [searchInput, setSearchInput] = useState("");
  const [remoteOnly, setRemoteOnly] = useState<CheckedState>(false);

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-row items-center justify-between">
        <div className="w-full max-w-[300px]">
          <Input
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search jobs..."
          />
        </div>
        <div className="flex flex-row items-center gap-x-2">
          <Checkbox id="remote" onCheckedChange={(e) => setRemoteOnly(e)} />
          <label
            htmlFor="remote"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Remote only
          </label>
        </div>
      </div>
      <ul className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {mockJobs
          .filter((job) => {
            return (
              job.title.toLowerCase().includes(searchInput.toLowerCase()) ||
              job.company.toLowerCase().includes(searchInput.toLowerCase()) ||
              job.location.toLowerCase().includes(searchInput.toLowerCase())
            );
          })
          .filter((job) => {
            if (remoteOnly) {
              return job.location.toLowerCase().includes("remote");
            }
            return true;
          })
          .map((job) => (
            <li key={job.title} className="">
              <Card>
                <CardHeader>
                  <CardTitle>{job.title}</CardTitle>
                  <CardDescription>{job.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-row items-center gap-x-2">
                    <Building className="h-4 w-4" /> {job.company}
                  </div>
                  <div className="flex flex-row items-center gap-x-2">
                    <SewingPinFilledIcon /> {job.location}
                  </div>

                  <div className="flex flex-row items-center gap-x-2">
                    <StarFilledIcon /> min {job.minimumRating} rating
                  </div>
                  <div className="flex flex-row items-center gap-x-2">
                    <Clock className="h-4 w-4" /> {job.type}
                  </div>
                </CardContent>
                <CardFooter className="flex flex-row items-center justify-between">
                  <div className="flex flex-row items-center gap-x-2">
                    <Wallet className="h-4 w-4" /> {job.budget} ETH
                  </div>
                  <Button>
                    Apply for this job <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default JobLists;
