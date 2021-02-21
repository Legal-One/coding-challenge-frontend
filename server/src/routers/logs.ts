import express from 'express'

import { findAll } from '../controllers/logs'

const router = express.Router()

// The path we define here will get /api/v1/log prefix
router.get('/', findAll)

export default router
