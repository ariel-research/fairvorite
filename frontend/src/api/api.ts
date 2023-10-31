//const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_BASE_URL = "http://csariel.xyz:8001/ballot"

export class Api {
  static async getIssues() {
    try {
      const response = await fetch(`${API_BASE_URL}/issues/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error in getIssues: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async getIssueById(issue_id: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/issues/${issue_id}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error in getIssue: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

