import express from 'express'

import { findAll } from '../controllers/agent'

const router = express.Router()

// The path we define here will get /api/v1/agent prefix
router.get('/', findAll)

export default router
