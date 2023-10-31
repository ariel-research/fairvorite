import React, {useState,useEffect} from 'react';
import {IIssue} from '../../data/types'
import IssueCard from '../issues/IssueCard';
import {Api} from '../../api/api'



/*interface HomePageProps {
  userName: string;
  latestIssues: IIssue[];
  handleVote: (issueId: number) => void;
}*/

function Home() {

  const handleVote = (issue_id: number) =>{
    console.log(`vote! for issue no.${issue_id}`)
  }
  
  const [latestIssues, setLatestIssues] = useState<IIssue[]>([]);
  
    useEffect(() => {
      async function fetchIssues() {
        try {
          const issues = await Api.getIssues();
          setLatestIssues(issues);
        } catch (error) {
          console.error(error);
        }
      }
      fetchIssues();
    }, []);

  return (
    <div className="p-4">
  <h1 className="text-3xl font-bold">Hello, User!</h1>
  <h2 className="text-2xl my-4">Latest Issues</h2>
  <div className="grid grid-cols-1 grid-cols-2 grid-cols-3 gap-4">
    {[...latestIssues]
      .sort((a: IIssue, b: IIssue) => +b.created_at - +a.created_at)
      .reverse() // Reverse the order
      .map((issue: IIssue) => (
        <IssueCard
          key={issue.id}
          id={issue.id}
          title={issue.title}
          description={issue.description}
          weight={25}
          onVote={() => handleVote(issue.id)}
        />
      ))}
  </div>
  {/* Add the popular issues section similarly */}
</div>
  
)}

export default Home;
