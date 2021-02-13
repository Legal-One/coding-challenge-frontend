import express from 'express'

import { findById, findAll } from '../controllers/resolution'

const router = express.Router()

// Every path we define here will get /api/v1/resolution prefix
router.get('/', findAll)
router.get('/:resolutionId', findById)

export default router
