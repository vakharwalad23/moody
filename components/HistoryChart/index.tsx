"use client";

import { HistoryChartAnalysis } from "@/utils/definitions";
import React from "react";
import { ResponsiveContainer, Line, XAxis, Tooltip, LineChart } from "recharts";

type Props = {
  data: HistoryChartAnalysis;
};

const CustomToolTip = ({
  payload,
  label,
  active,
}: {
  payload: any;
  label: any;
  active: any;
}) => {
  const dateLabel = new Date(label).toLocaleString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  if (active) {
    const analysis = payload[0].payload;
    return (
      <div className="p-8 custom-tooltip bg-white/5 shadow-md border border-black/10 rounded-lg backdrop-blur-md relative">
        <div
          className="absolute left-2 top-2 w-2 h-2 rounded-full"
          style={{ background: analysis.color }}
        ></div>
        <p className="label text-sm text-black/30">{dateLabel}</p>
        <p className="intro text-xl uppercase">{analysis.mood}</p>
      </div>
    );
  }
  return null;
};

const HistoryChart = (props: Props) => {
  return (
    <div className="h-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={props.data.analysis}>
          <Line
            dataKey="sentimentScore"
            type="monotone"
            stroke="#8884d8"
            strokeWidth={2}
            activeDot={{ r: 6 }}
          />
          <XAxis dataKey="createdAt" />
          {/* @ts-ignore */}
          <Tooltip content={<CustomToolTip />} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HistoryChart;
