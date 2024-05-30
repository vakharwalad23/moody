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
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-row gap-5">
          <input
            disabled={loading}
            onChange={onChange}
            className="border border-border-gray-800/12 px-4 py-3 text-lg rounded-lg"
            type="text"
            value={value}
            placeholder="Ask a question"
          />
          <button
            disabled={loading}
            type="submit"
            className="py-3 px-5 border border-gray-400 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:translate-y-[-3px] hover:bg-gray-500/30"
          >
            Ask
          </button>
        </div>
      </form>
      {loading && (
        <div>
          <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24"></svg>
        </div>
      )}
      {response && <div>{response}</div>}
    </div>
  );
};

export default Question;
