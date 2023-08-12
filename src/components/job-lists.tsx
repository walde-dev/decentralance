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
    title: "Frontend Developer for E-commerce Website",
    company: "ShopifyTech",
    location: "Remote",
    type: "Full Time",
    budget: 12,
    minimumRating: 4.7,
    description:
      "Join our team to build and enhance the user interface of our cutting-edge e-commerce platform. Experience with React and CSS required.",
  },
  {
    title: "Mobile App QA Engineer",
    company: "TestSprint",
    location: "Onsite (San Francisco, USA)",
    type: "Contract",
    budget: 6,
    minimumRating: 4.2,
    description:
      "Looking for a detail-oriented QA Engineer to ensure the quality and functionality of our mobile app across various devices and platforms.",
  },
  {
    title: "Data Scientist - Machine Learning",
    company: "DataAlchemy",
    location: "Remote",
    type: "Full Time",
    budget: 18,
    minimumRating: 4.9,
    description:
      "Join our AI team to develop advanced machine learning models for data analysis. Strong background in Python and ML algorithms required.",
  },
  {
    title: "Marketing Specialist for Tech Startup",
    company: "InnovateTech",
    location: "Remote",
    type: "Part Time",
    budget: 8,
    minimumRating: 4.5,
    description:
      "Seeking a creative marketing specialist to develop and execute digital marketing campaigns, including social media and content creation.",
  },
  {
    title: "Full Stack Developer - Fintech",
    company: "CashFlow Systems",
    location: "Onsite (New York City, USA)",
    type: "Full Time",
    budget: 15,
    minimumRating: 4.8,
    description:
      "Join our fintech team to build and maintain features for our online financial platform. Proficiency in React and Node.js required.",
  },
  {
    title: "Product Designer - Health and Wellness",
    company: "VitalVibe",
    location: "Remote",
    type: "Full Time",
    budget: 11,
    minimumRating: 4.6,
    description:
      "Design user-centric interfaces for our health and wellness app, focusing on creating a seamless and engaging user experience.",
  },
  // Previous job listings...
  {
    title: "Content Writer - Travel Blog",
    company: "Wanderlust Media",
    location: "Remote",
    type: "Freelance",
    budget: 5,
    minimumRating: 4.4,
    description:
      "Write captivating and informative travel articles for our blog. Passion for travel and excellent writing skills are a must.",
  },
  {
    title: "DevOps Engineer - Cloud Infrastructure",
    company: "CloudWare Solutions",
    location: "Remote",
    type: "Full Time",
    budget: 16,
    minimumRating: 4.7,
    description:
      "Manage and optimize our cloud infrastructure, ensuring high availability and scalability. Experience with AWS and Docker required.",
  },
  {
    title: "Graphic Designer - Gaming Studio",
    company: "PixelPlay Games",
    location: "Onsite (Los Angeles, USA)",
    type: "Full Time",
    budget: 13,
    minimumRating: 4.6,
    description:
      "Create visually stunning graphics for our video games, including character designs, concept art, and promotional materials.",
  },
  {
    title: "Project Manager - Construction",
    company: "BuildRight Inc.",
    location: "Onsite (London, UK)",
    type: "Full Time",
    budget: 20,
    minimumRating: 4.9,
    description:
      "Lead and coordinate construction projects from planning to completion. Strong organizational and leadership skills required.",
  },
  {
    title: "Data Analyst - E-commerce Analytics",
    company: "ShopInsight",
    location: "Remote",
    type: "Part Time",
    budget: 9,
    minimumRating: 4.3,
    description:
      "Analyze e-commerce data to provide insights on customer behavior, trends, and performance. Proficiency in SQL and data visualization tools required.",
  },
  {
    title: "iOS App Developer - Social Networking",
    company: "ConnectHub",
    location: "Remote",
    type: "Contract",
    budget: 14,
    minimumRating: 4.8,
    description:
      "Develop and maintain features for our social networking app on iOS. Swift programming skills and experience with app UI/UX required.",
  },
  {
    title: "Cybersecurity Analyst",
    company: "SecureNet Solutions",
    location: "Onsite (Toronto, Canada)",
    type: "Full Time",
    budget: 17,
    minimumRating: 4.7,
    description:
      "Protect our systems and networks from security breaches. Strong knowledge of cybersecurity practices and tools is essential.",
  },
  {
    title: "HR Specialist - Talent Acquisition",
    company: "TalentForge",
    location: "Remote",
    type: "Part Time",
    budget: 8,
    minimumRating: 4.5,
    description:
      "Assist in recruiting top talent for our company. Experience in candidate sourcing, interviews, and HR processes required.",
  },
  {
    title: "Video Editor - YouTube Channel",
    company: "ViralVision Media",
    location: "Remote",
    type: "Freelance",
    budget: 6,
    minimumRating: 4.2,
    description:
      "Edit engaging and creative videos for our YouTube channel. Proficiency in video editing software and storytelling skills are a must.",
  },
];

// You can continue adding more job listings as needed.

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
