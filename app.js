


import { configure } from "https://deno.land/x/eta@v2.2.0/mod.ts";
import * as taskController from "./controllers/taskController.js";
import * as workEntryController from "./controllers/workEntryController.js";
import * as requestUtils from "./utils/requestUtils.js";

configure({
  views: `${Deno.cwd()}/views/`,
});


const handleRequest = async (request) => {
    const url = new URL(request.url);
  
    if (url.pathname === "/" && request.method === "GET") {
      return requestUtils.redirectTo("/tasks");
    } else if (url.pathname === "/tasks" && request.method === "POST") {
      return await taskController.addTask(request);
    } else if (url.pathname === "/tasks" && request.method === "GET") {
      return await taskController.viewTasks(request);
    } else if (url.pathname.match("tasks/[0-9]+") && request.method === "GET") {
      return await taskController.viewTask(request);
    } else if (url.pathname.match("tasks/[0-9]+/entries/[0-9]+") && request.method === "POST") {
      return await workEntryController.finishWorkEntry(request);
    } else if (url.pathname.match("tasks/[0-9]+/entries") && request.method === "POST") {
      return await workEntryController.createWorkEntry(request);
    } else if (url.pathname.match("tasks/[0-9]+") && request.method === "POST") {
      return await taskController.completeTask(request);
    } else {
      return new Response("Not found", { status: 404 });
    }
  };


  Deno.serve({ port: 7777 }, handleRequest );