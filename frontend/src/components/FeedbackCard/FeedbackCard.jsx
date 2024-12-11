import React from "react";
import { LuSend } from "react-icons/lu";

const FeedbackCard = () => {
  return (
    <div className="bg-white border border-slate-200 grid grid-cols-8 gap-2 rounded-xl p-2 text-sm">
      <h1 className="text-center text-slate-200 text-xl font-bold col-span-8">
        Send Feedback
      </h1>
      <textarea
        placeholder="Your feedback..."
        className="bg-slate-100 text-slate-600 h-28 placeholder:text-slate-600 placeholder:opacity-50 border border-slate-200 col-span-8 resize-none outline-none rounded-lg p-2 duration-300 focus:border-slate-600"
        defaultValue={""}
      />
      <button className="fill-slate-600 col-span-1 flex justify-center items-center rounded-lg p-2 duration-300 bg-slate-100 hover:border-slate-600 focus:fill-blue-200 focus:bg-blue-400 border border-slate-200">
        <span>1</span>
      </button>
      <button className="fill-slate-600 col-span-1 flex justify-center items-center rounded-lg p-2 duration-300 bg-slate-100 hover:border-slate-600 focus:fill-blue-200 focus:bg-blue-400 border border-slate-200">
        <span>2</span>
      </button>
      <button className="fill-slate-600 col-span-1 flex justify-center items-center rounded-lg p-2 duration-300 bg-slate-100 hover:border-slate-600 focus:fill-blue-200 focus:bg-blue-400 border border-slate-200">
        <span>3</span>
      </button>
      <button className="fill-slate-600 col-span-1 flex justify-center items-center rounded-lg p-2 duration-300 bg-slate-100 hover:border-slate-600 focus:fill-blue-200 focus:bg-blue-400 border border-slate-200">
        <span>4</span>
      </button>
      <button className="fill-slate-600 col-span-1 flex justify-center items-center rounded-lg p-2 duration-300 bg-slate-100 hover:border-slate-600 focus:fill-blue-200 focus:bg-blue-400 border border-slate-200">
        <span>5</span>
      </button>
      <span className="col-span-1" />
      <button className="bg-slate-100 stroke-slate-600 border border-slate-200 col-span-2 flex justify-center rounded-lg p-2 duration-300 hover:border-slate-600 dark:hover:text-white focus:stroke-blue-200 focus:bg-blue-400">
        <LuSend className="h-4 w-4" />
      </button>
    </div>
  );
};

export default FeedbackCard;
