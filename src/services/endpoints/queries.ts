import { StatisticsSchema, TodoSchema } from "@/types/todo";
import { PaginationRequest, PaginationResponse } from "@/types/pagination";
import { Builder } from "./type";

export const getTodosPaginated = (builder: Builder) =>
  builder.query<PaginationResponse<TodoSchema[]>, PaginationRequest>({
    query: ({ startIndex, ppageSize }) =>
      `todos?startIndex=${startIndex}&pageSize=${ppageSize}`,
    providesTags: ["Todos"],
  });

export const getTodoById = (builder: Builder) =>
  builder.query<TodoSchema, string>({
    query: (name) => `${name}`,
  });

export const getStats = (builder: Builder) =>
  builder.query<{ title: string; value: number }[], void>({
    query: () => "stats",
    transformResponse: (response: StatisticsSchema) => {
      const keys = Object.keys(response) as Array<keyof typeof response>;
      const keyNames = {
        n_total_todos: "Total Created Todos",
        n_todos: "Total Existing Todos",
        n_modified: "Modified Todos",
        n_modifications: "Total Modifications",
        n_deleted: "Total Deleted Todos",
      };
      const statistics = keys.map((key) => ({
        title: keyNames[key as keyof typeof keyNames],
        value: response[key],
      }));
      return statistics;
    },
  });
