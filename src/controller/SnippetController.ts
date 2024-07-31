import express from 'express';
import { SnippetDao } from '../dao/SnippetDao.js';
import { SnippetService } from '../service/SnippetService.js';

const router = express.Router();
const snippetDao = new SnippetDao();
const snippetService = new SnippetService(snippetDao);

router.get('/', async (req, res) => {
    try {
        const snippets = await snippetService.getAllSnippets();
        res.json(snippets);
    } catch (error) {
        console.error('Error fetching snippets:', error);
        res.status(500).json({ error: 'An error occurred while fetching snippets.' });
    }
});

router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        const snippet = await snippetService.getSnippetById(id);
        if (snippet) {
            res.json(snippet);
        } else {
            res.status(204).json(null);
        }
    } catch (error) {
        console.error('Error fetching snippet:', error);
        res.status(500).json({ error: 'An error occurred while fetching the snippet.' }); // Updated error message
    }
});

router.post('/', async (req, res) => {
    try {
        const { name, text } = req.body;
        if (!name || !text) {
            res.status(400).json({ error: 'Invalid input data.' });
            return;
        }
        const snippet = await snippetService.createSnippet({ name, text });
        res.status(201).json(snippet);
    } catch (error) {
        console.error('Error creating snippet:', error);
        res.status(500).json({ error: 'An error occurred while creating the snippet.' });
    }
});

router.put('/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        const { name, text } = req.body;
        const snippet = await snippetService.updateSnippet(id, { name, text });
        if (snippet) {
            res.json(snippet);
        } else {
            res.status(204).json(null);
        }
    } catch (error) {
        console.error('Error updating snippet:', error);
        res.status(500).json({ error: 'An error occurred while updating the snippet.' });
    }
});

router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        const snippet = await snippetService.deleteSnippet(id);
        if (snippet) {
            res.json({ message: 'Snippet deleted successfully.' });
        } else {
            res.status(204).json(null);
        }
    } catch (error) {
        console.error('Error deleting snippet:', error);
        res.status(500).json({ error: 'An error occurred while deleting the snippet.' });
    }
});

export default router;
