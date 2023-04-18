import { prisma } from "../lib/prismaClient";
import { trpc } from "../lib/trpc";
import { z } from "zod";

export const todoRouter = trpc.router({
  list: trpc.procedure.query(async () => {
    const todo = await prisma.todo.findMany();
    return todo;
  }),

  create: trpc.procedure
    .input(z.object({ title: z.string() }))
    .mutation(({ input }) => {
      const title = input.title;
      return prisma.todo.create({
        data: {
          title: title,
          isCompleted: false,
        },
      });
    }),
});
