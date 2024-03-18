import { Request, Response } from "express";
const { PrismaClient } = require("@prisma/client");

const express = require("express");
const app = express();
const port = 8000;
const prisma = new PrismaClient();

type PostRequestBody = {
  body: {
    title: string;
    body: string;
  };
};

type PostResponseBody = {
  id: number;
  title: string;
  body: string;
  created_at: Date;
};

app.listen(port, () => {
  console.log(`Server起動中やで！！！`);
});

app.post(
  "/",
  async (req: Request<PostRequestBody>, res: Response<PostResponseBody>) => {
    const { title, body } = req.body;
    const posts = await prisma.posts.create({
      data: {
        title: title,
        body: body,
      },
    });
    return res.json(posts);
  }
);
