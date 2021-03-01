import {
  CallCenterRepoInterface,
  CallCenterRepository
} from './call-center/callcenter-repository'
import {
  CallCenterServiceInterface,
  CallCenterService
} from './call-center/callcenter-service'

import { ErrorMesages, errorMessages } from './utils/error-messages'

export interface ServiceContainer {
  callcenter: {
    repository: CallCenterRepoInterface
    service: CallCenterServiceInterface
  }
  errorMessages: ErrorMesages
}

export function createServiceContainer(): ServiceContainer {
  const callCenterRepository = new CallCenterRepository()
  const callCenterService = new CallCenterService(callCenterRepository)

  return {
    callcenter: {
      repository: callCenterRepository,
      service: callCenterService
    },
    errorMessages: errorMessages
  }
}
