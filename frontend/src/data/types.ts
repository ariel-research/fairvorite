export interface IIssue {
    id: number;
    title: string;
    description: string;
    status: string;
    created_at: Date;
    updated_at: Date;
    created_by: number;
    weight: number;
  }

  export interface IMember {
    name: string  
  }