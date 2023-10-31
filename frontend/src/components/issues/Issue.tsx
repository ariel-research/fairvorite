import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';

import Navbar from '../navbar/Navbar'; 
import { IIssue, IMember } from '../../data/types'; 
import {Api} from '../../api/api'

function Issue() {
  const { issue_id } = useParams<{ issue_id?: string }>();
  const default_issue = {
    id: 0,
    title: '',
    description: '',
    created_at: new Date(),
    updated_at: new Date(),
    created_by: 0,
    weight: 0,
    status: 'open',
  }
  const [issue, setIssue] = useState<IIssue>(default_issue);

  const onVote = (issue: IIssue, member: IMember) => {
    console.log('vote accepted')
  };

  useEffect(() => {
    async function fetchIssue() {
      try {
        if (issue_id) {
          const temp_issue = await Api.getIssueById(issue_id);
          setIssue(temp_issue || issue);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchIssue();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto mt-8 p-4 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">{issue.title}</h1>
        <p className="text-gray-600 text-sm mb-4">
          {'21/10/2023'}
        </p>
        <p className="text-lg mb-4">{issue.description}</p>

        <div className="flex items-center justify-between mb-4">
          <div className="text-xl font-semibold">Weight: {issue.weight}</div>
          <div className="flex items-center">
            <button
              onClick={() => onVote( issue,{name:'bar'})}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-4"
            >
              Vote
            </button>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-lg font-semibold">
            Status:{' '}
            <span
              className={`${
                issue.status === 'open'
                  ? 'text-green-500'
                  : issue.status === 'closed'
                  ? 'text-red-500'
                  : 'text-blue-500'
              }`}
            >
              {issue.status}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Issue;
