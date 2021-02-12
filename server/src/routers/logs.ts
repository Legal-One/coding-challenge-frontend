import express from 'express'

import { findById, findAll } from '../controllers/logs'

const router = express.Router()

// Every path we define here will get /api/v1/agent prefix
router.get('/', findAll)
router.get('/:logId', findById)

export default router
