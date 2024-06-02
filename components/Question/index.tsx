"use client";
import { askQuestion } from "@/utils/api";
import React from "react";

type Props = {};

const Question = (props: Props) => {
  const [value, setValue] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [response, setResponse] = React.useState();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const answer = await askQuestion(value);
    setResponse(answer);

    setValue("");
    setLoading(false);
  };
  return (
    <div className="flex flex-col gap-3">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-row gap-5">
          <input
            disabled={loading}
            onChange={onChange}
            className="border border-border-gray-800/12 px-4 py-3 text-lg rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors duration-300"
            type="text"
            value={value}
            placeholder="Ask a question"
          />
          <button
            disabled={loading}
            type="submit"
            className="py-3 px-5 border border-gray-400 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:translate-y-[-3px] hover:bg-gray-500/30 bg-white"
          >
            Ask
          </button>
        </div>
      </form>
      {loading && (
        <div className="flex pt-2">
          <svg
            className="animate-spin h-5 w-5 mr-3 text-gray-500"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span className="text-gray-500">Loading...</span>
        </div>
      )}
      {response && (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md max-w-[600px]">
          {response}
        </div>
      )}
    </div>
  );
};

export default Question;
