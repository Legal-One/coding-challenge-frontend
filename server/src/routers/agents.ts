import express from 'express'

import { findById, findAll } from '../controllers/agent'

const router = express.Router()

// Every path we define here will get /api/v1/agent prefix
router.get('/', findAll)
router.get('/:agentId', findById)

export default router
