import { PrismaClient, snippet } from '@prisma/client';



export class SnippetDao {
  async getAllSnippets(): Promise<snippet[]> {
    const prisma = new PrismaClient();
    return await prisma.snippet.findMany();
  }

  async getSnippetById(id: number): Promise<snippet | null> {
    const prisma = new PrismaClient();
    return await prisma.snippet.findUnique({
      where: { id },
    });
  }

  async createSnippet(data: { name: string; text: string }): Promise<snippet> {
    const prisma = new PrismaClient();
    const newSnippet = await prisma.snippet.create({
      data,
    });

    console.log('Created new snippet:', newSnippet);

    return newSnippet;
  }

  async updateSnippet(id: number, data: { name?: string; text?: string }): Promise<snippet | null> {
    const prisma = new PrismaClient();
    return await prisma.snippet.update({
      where: { id },
      data,
    });
  }

  async deleteSnippet(id: number): Promise<snippet | null> {
    const prisma = new PrismaClient();
    return await prisma.snippet.delete({
      where: { id },
    });
  }
}
