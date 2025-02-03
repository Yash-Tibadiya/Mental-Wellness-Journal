import CalendarHeatmap, { TooltipDataAttrs } from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { Tooltip } from "react-tooltip";
import { addDays, format, parseISO } from "date-fns";

function getJournalEntriesFromLocalStorage() {
  const saved = localStorage.getItem("journal-entries");
  let entries = [];

  if (saved) {
    try {
      entries = JSON.parse(saved);
    } catch (error) {
      console.error("Error parsing journal entries:", error);
    }
  }

  // Aggregate contributions per day
  const contributions: { [key: string]: number } = {};
  entries.forEach((entry: { date: string }) => {
    const dateKey = format(parseISO(entry.date), "yyyy-MM-dd");
    contributions[dateKey] = (contributions[dateKey] || 0) + 1;
  });

  // Create an array with formatted date and contribution count
  const today = new Date();
  return Array.from({ length: 365 }, (_, index) => {
    const date = format(addDays(today, -index), "yyyy-MM-dd");
    return { date, count: contributions[date] || 0 };
  });
}

export function ContributionHeatmap() {
  const heatmapData = getJournalEntriesFromLocalStorage();

  return (
    <div className="flex justify-center w-full lg:mx-[475px]">
      <div className="dark:bg-[#09090b] bg-white p-4 rounded-lg shadow-lg border w-full">
        <h3 className="text-center text-2xl font-semibold text-white mb-3">
          Contributions in the last year
        </h3>
        <CalendarHeatmap
          startDate={addDays(new Date(), -365)}
          endDate={new Date()}
          values={heatmapData}
          classForValue={(value) => {
            if (!value) return "color-empty";
            return `color-scale-${value.count}`;
          }}
          tooltipDataAttrs={(value) => {
            if (!value || !value.date) {
              return {};
            }
            return {
              "data-tooltip-id": "heatmap-tooltip",
              "data-tooltip-content": `${value.date} - ${
                value.count || 0
              } contributions`,
            } as TooltipDataAttrs;
          }}
        />
        <Tooltip id="heatmap-tooltip" />
        <div className="flex justify-end items-center gap-2 text-sm text-gray-400 mt-2">
          <span className="font-bold text-base">Less</span>
          <div className="flex gap-1">
            <span className="w-4 h-4 bg-gray-800"></span>
            <span className="w-4 h-4 bg-green-700"></span>
            <span className="w-4 h-4 bg-green-600"></span>
            <span className="w-4 h-4 bg-green-500"></span>
          </div>
          <span className="font-bold text-base">More</span>
        </div>
      </div>
    </div>
  );
}
