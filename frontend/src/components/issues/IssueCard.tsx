import React from 'react';

interface IssueCardProps {
  id: number,
  title: string;
  description: string;
  weight: number;
  onVote: () => void;
}

function IssueCard({id, title, description, weight, onVote }: IssueCardProps) {
  return (
    <div className="max-w-xs bg-white shadow-md rounded-lg overflow-hidden m-4 flex flex-col justify-between">
    <div className="px-6 py-4">
    <a href={`/issues/${id}`} className="font-bold text-xl mb-2">{title}</a>

      <p className="text-gray-700 text-base">{description.substring(0, 50)}...</p>
    </div>
    <div className="px-6 py-4">
      <span className="text-lg">{weight}</span>
      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={onVote}>
        ▲
      </button>
    </div>
  </div>
  );
}

export default IssueCard;
