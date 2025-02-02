import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Book, Brain, Coffee, Frown, Home, Meh, Smile } from "lucide-react";
import { Link } from "react-router-dom";
import { ModeToggle } from "../mode-toggle";

// Define the ChartConfig using our mood keys and colors.
const chartConfig = {
  happy: {
    label: "Happy",
    color: "hsl(var(--chart-1))",
    icon: Smile,
  },
  calm: {
    label: "Calm",
    color: "hsl(var(--chart-2))",
    icon: Coffee,
  },
  neutral: {
    label: "Neutral",
    color: "hsl(var(--chart-3))",
    icon: Meh,
  },
  sad: {
    label: "Sad",
    color: "hsl(var(--chart-4))",
    icon: Frown,
  },
  stressed: {
    label: "Stressed",
    color: "hsl(var(--chart-5))",
    icon: Brain,
  },
} satisfies ChartConfig;

// Helper function to aggregate JournalEntry data by month.
// It reads the entries from localStorage and groups them by month,
// counting the number of entries per mood.
function aggregateJournalEntries() {
  const saved = localStorage.getItem("journal-entries");
  let entries: {
    id: string;
    date: string;
    content: string;
    mood: "happy" | "calm" | "neutral" | "sad" | "stressed";
    tags: string[];
  }[] = [];
  if (saved) {
    try {
      entries = JSON.parse(saved);
    } catch (error) {
      console.error("Error parsing journal entries:", error);
    }
  }
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dataMap: Record<
    string,
    {
      happy: number;
      calm: number;
      neutral: number;
      sad: number;
      stressed: number;
    }
  > = {};

  for (const entry of entries) {
    const d = new Date(entry.date);
    const month = monthNames[d.getMonth()];
    if (!dataMap[month]) {
      dataMap[month] = { happy: 0, calm: 0, neutral: 0, sad: 0, stressed: 0 };
    }
    dataMap[month][entry.mood] += 1;
  }
  const chartData = Object.entries(dataMap).map(([month, counts]) => ({
    month,
    ...counts,
  }));
  // Sort by month order
  chartData.sort(
    (a, b) => monthNames.indexOf(a.month) - monthNames.indexOf(b.month)
  );
  return chartData;
}

export function ChartPage() {
  const chartData = aggregateJournalEntries();

  return (
    <div className="flex flex-col items-center justify-center">
        <div className="flex items-center gap-4 m-5">
          <Link
            to="/"
            className="flex border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-12 w-12 justify-center items-center gap-3 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            <Home className="h-[1.5rem] w-[1.5rem] text-gray-700 dark:text-white" />
          </Link>
          <ModeToggle />
          <Link
            to="/journal"
            className="flex border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-12 w-12 justify-center items-center gap-3 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            <Book className="h-[1.5rem] w-[1.5rem]" />
          </Link>
        </div>
      <div className="w-full h-auto flex justify-center items-center">
        <div className="w-2/3">
          <Card>
            <CardHeader>
              <CardTitle>Journal Entries by Mood (Stacked Bar Chart)</CardTitle>
              <CardDescription>Aggregated by Month</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <BarChart data={chartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  {/* One Bar for each mood; all bars use the same stackId to be stacked */}
                  <Bar
                    dataKey="happy"
                    stackId="a"
                    fill="hsl(var(--chart-1))"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="calm"
                    stackId="a"
                    fill="hsl(var(--chart-2))"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="neutral"
                    stackId="a"
                    fill="hsl(var(--chart-3))"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="sad"
                    stackId="a"
                    fill="hsl(var(--chart-4))"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="stressed"
                    stackId="a"
                    fill="hsl(var(--chart-5))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
