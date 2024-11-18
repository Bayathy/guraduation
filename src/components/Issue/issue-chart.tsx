"use client";

import { Issue } from "@prisma/client";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

type chartLabel =
  | "Syntax Error"
  | "Logic Error"
  | "Concept Misunderstanding"
  | "Algorithm Design"
  | "Error/Warning Interpretation"
  | "Coding Style/Best Practice";

type chartData = {
  label: chartLabel;
  value: number;
}[];

export const IssueCharts = ({ issues }: { issues: Issue[] }) => {
  const chartData = issues.reduce<chartData>(
    (acc, issue) => {
      issue.category.forEach((category) => {
        if (category === "Other") return;
        const index = acc.findIndex((data) => data.label === category);
        if (index !== -1) {
          acc[index].value += 1;
        }
      });
      return acc;
    },
    [
      {
        label: "Syntax Error",
        value: 0,
      },
      {
        label: "Logic Error",
        value: 0,
      },
      {
        label: "Concept Misunderstanding",
        value: 0,
      },
      {
        label: "Algorithm Design",
        value: 0,
      },
      {
        label: "Error/Warning Interpretation",
        value: 0,
      },
    ]
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Issue Category</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="label"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="value" fill="var(--color-desktop)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm"></CardFooter>
    </Card>
  );
};
