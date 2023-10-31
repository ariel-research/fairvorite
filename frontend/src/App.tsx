import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import dotenv from 'dotenv';

import './App.css';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import Issue from './components/issues/Issue';


// Load environment variables from .env file
//dotenv.config();

/*const issuesl: Issue[] = [
  {id : 1, title : 'hi', description : 'kfmldsfkmlkanlkdsnflknd', weight : 23},
  {id : 2, title : 'hello', description : 'kfmldsfkmlkanlkdsnflknd', weight : 23}
 ]
 const handleVote = () =>{
     console.log("vote!")
 }*/
const App: React.FC = () => (
	<BrowserRouter>
    <Navbar />
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/issues/:issue_id" element={<Issue />} />

		</Routes>
	</BrowserRouter>
);

export default App;
