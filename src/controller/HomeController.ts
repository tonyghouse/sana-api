import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('<h1>Welcome to the SANA API</h1><p>A Misc API application</p>');
});

export default router;
