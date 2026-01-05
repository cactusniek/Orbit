import { settingsServices } from '../services/settingsServices'
import { loggerService } from '../global/logger'
import { GlobalServices } from '../global/services'

import { Router, Request, Response } from 'express'

export const settingsRoutes = Router()

settingsRoutes.post('/getConnection', async (req: Request, res: Response) => {
    let result = null

    try {
        result = await settingsServices.getConnection(req.body.id)

        if (!result.success) {
            loggerService.Logger('INFO', req.body.email, req.ip, req.route.path, GlobalServices.filePath(__dirname, __filename), result.function, result.logMessage)
            res.status(400).json({ result: result.success, message: result.message })
        } else {
            loggerService.Logger('INFO', req.body.email, req.ip, req.route.path, GlobalServices.filePath(__dirname, __filename), result.function, result.logMessage)
            res.status(200).json({ result: result.success, data: result.data })
        }
    } catch (err) {
        loggerService.Logger('WARNING', req.body.email, req.ip, req.route.path, GlobalServices.filePath(__dirname, __filename), settingsServices.getConnection.name, err.message)
        res.status(500).json('Something went wrong, please try again')
    }
})

settingsRoutes.post('/saveConnection', async (req: Request, res: Response) => {
    let result = null

    try {
        result = await settingsServices.saveConnection(req.body.id, req.body.connection.name, req.body.connection.host, req.body.connection.port, req.body.connection.user, req.body.connection.password)

        if (!result.success) {
            loggerService.Logger('INFO', req.body.email, req.ip, req.route.path, GlobalServices.filePath(__dirname, __filename), result.function, result.logMessage)
            res.status(400).json({ result: result.success, message: result.message })
        } else {
            loggerService.Logger('INFO', req.body.email, req.ip, req.route.path, GlobalServices.filePath(__dirname, __filename), result.function, result.logMessage)
            res.status(200).json({ result: result.success, message: result.message })
        }
    } catch (err) {
        loggerService.Logger('WARNING', req.body.email, req.ip, req.route.path, GlobalServices.filePath(__dirname, __filename), settingsServices.saveConnection.name, err.message)
        res.status(500).json('Something went wrong, please try again')
    }
})

settingsRoutes.post('/remoteStructure', async (req: Request, res: Response) => {
    let result = null

    try {
        result = await settingsServices.remoteStructure(req.body.id)

        if (!result.success) {
            loggerService.Logger('INFO', req.body.email, req.ip, req.route.path, GlobalServices.filePath(__dirname, __filename), result.function, result.logMessage)
            res.status(400).json({ result: result.success, message: result.message })
        } else {
            loggerService.Logger('INFO', req.body.email, req.ip, req.route.path, GlobalServices.filePath(__dirname, __filename), result.function, result.logMessage)
            res.status(200).json({ result: result.success, data: result.data })
        }
    } catch (err) {
        loggerService.Logger('WARNING', req.body.email, req.ip, req.route.path, GlobalServices.filePath(__dirname, __filename), settingsServices.saveConnection.name, err.message)
        res.status(500).json('Something went wrong, please try again')
    }
})
