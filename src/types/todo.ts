// TypeScript equivalent of TodoPostRequestSchema
export interface TodoPostRequestSchema {
  title: string; // Title of the Todo
  text: string; // Text of the Todo
}

// TypeScript equivalent of TodoPatchRequestSchema
export interface TodoPatchRequestSchema {
  title?: string | null; // Title of the Todo (optional)
  text?: string | null; // Text of the Todo (optional)
  done?: boolean | null; // Done status of the Todo (optional)
  modified?: boolean | null; // Modified status of the Todo (optional)
}

// TypeScript equivalent of TodoSchema
export interface TodoSchema extends TodoPatchRequestSchema {
  id: number; // ID of the Todo
}


export interface StatisticsSchema {
  n_total_todos: number;
  n_todos: number;
  n_modified: number;
  n_modifications: number;
  n_deleted: number;
}
