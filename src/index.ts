/*** FILE: INDEX.TS
 * AUTHOR: aryanrsuri@github.com
 * LICENCE: GNU LICENCE
 ***/

import { Elysia } from "elysia";

type Task = string;
let tasks: Task[] = [];

const getTask = async (ctx) => {
  try {
    const template = await updateTaskUI();
    return new Response(template, {
      status: 200,
      headers: {
        "content-type": "text/html",
      },
    });
  } catch (Error) {
    console.error(Error);
    return new Response(Error, {
      status: 404,
    });
  }
};

/**
 * Handler for /task POST request
 * @param { JSON } ctx of http request
 * @returns { Response } http response obj
 */
const postTask = async (ctx) => {
  try {
    const { task } = await ctx.body;
    tasks.push(task as Task);
    const template = await updateTaskUI();
    return new Response(template, {
      status: 200,
      headers: {
        "content-type": "text/html",
      },
    });
  } catch (Error) {
    console.error(Error);
    return new Response(Error, {
      status: 404,
    });
  }
};

const app = new Elysia()
  .get("/", () => Bun.file("src/index.html"))
  .get("/task", getTask)
  .post("/task", postTask)
  .listen(3000);

console.log(
  `Online on ${app.server?.hostname}:${app.server?.port}`,
);

const updateTaskUI = async () => {
  let template = `<div id="task-list" class="list"><ul>`;
  tasks.map((t) => {
    template += `<li> ${t} </li>`;
  });
  template += `</ul></div>`;
  return template;
};
