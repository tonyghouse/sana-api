import { SnippetDao } from "../dao/SnippetDao";

export class SnippetService {

    private snippetDao: SnippetDao;

    constructor(snippetDao: SnippetDao) {
      this.snippetDao = snippetDao;
    }

    async getAllSnippets() {
        const snippets = await this.snippetDao.getAllSnippets();
        return snippets;
    }

    async getSnippetById(id: number) {
        const snippet = await this.snippetDao.getSnippetById(id);
        return snippet;
    }

    async createSnippet(data: { name: string; text: string; }) {
        const snippet = await this.snippetDao.createSnippet(data);
        return snippet;
    }

    async updateSnippet(id: number, data: { name?: string; text?: string; }) {
        const snippet = await this.snippetDao.updateSnippet(id, data);
        return snippet;
    }

    async deleteSnippet(id: number) {
        const snippet = await this.snippetDao.deleteSnippet(id);
        return snippet;
    }
    
  }