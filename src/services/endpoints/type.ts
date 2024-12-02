import { BaseQueryFn, EndpointBuilder, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from "@reduxjs/toolkit/query";

export type Builder =  EndpointBuilder<
     BaseQueryFn<
       string | FetchArgs,
       unknown,
       FetchBaseQueryError,
       {},
       FetchBaseQueryMeta
     >,
     "Todos",
     "todosApi"
   >
 ;