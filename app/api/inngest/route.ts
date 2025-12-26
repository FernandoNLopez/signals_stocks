import {  serve  } from 'inngest/next';

import {inngest} from "@/lib/inngest/client";
import {sendSignUpEmail} from "@/lib/inngest/functions";


export const { GET, POST, PUT } = serve({
    client: inngest,
    functions: [sendSignUpEmail]
})

/*
* Exposing our inngest functions via Next.js API Route which will make these functions callable within our app and Next.js
* will handle all the incoming events request automatically.
*
* These functions are going to be our background jobs. These functions that we want to execute in the background, not while
* our users are running the app.
*/