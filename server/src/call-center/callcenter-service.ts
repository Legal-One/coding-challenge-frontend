import { FileNotFoundError } from '../utils/errors'
import { errorMessages } from '../utils/error-messages'
import { CallCenterRepoInterface } from './callcenter-repository'

interface UserDetails {
  success: boolean
  name: string
  id: string
}

export interface CallCenterServiceInterface {
  callCenterRepository: CallCenterRepoInterface
  getCalls(): Promise<Record<string, any>>
  getAgents(): Promise<Record<string, any>>
  getResolutions(): Promise<Record<string, any>>
}

export class CallCenterService implements CallCenterServiceInterface {
  callCenterRepository: CallCenterRepoInterface

  constructor(callCenterRepository: CallCenterRepoInterface) {
    this.callCenterRepository = callCenterRepository
  }
  //In production environment, each of call, agent and resolution domains would probably have their own router, controller, service and repositories.
  //For simplicity, they all exposed under a single application domain named call center.
  async getCalls(): Promise<Record<string, any>> {
    try {
      const callData = await this.callCenterRepository.getCalls()
      const response = {
        data: callData
      }
      return response
    } catch (err) {
      console.log(err)
      throw new FileNotFoundError(errorMessages.FILE_NOT_FOUND)
    }
  }
  async getAgents(): Promise<Record<string, any>> {
    try {
      const agentDetails = await this.callCenterRepository.getAgents()
      const response = {
        data: agentDetails
      }
      return response
    } catch (err) {
      throw new FileNotFoundError(errorMessages.FILE_NOT_FOUND)
    }
  }

  async getResolutions(): Promise<Record<string, any>> {
    try {
      const agentDetails = await this.callCenterRepository.getResolutions()
      const response = {
        data: agentDetails
      }
      return response
    } catch (err) {
      throw new FileNotFoundError(errorMessages.FILE_NOT_FOUND)
    }
  }
}
