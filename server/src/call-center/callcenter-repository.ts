import { promises as fs } from 'fs'
import path from 'path'

export interface CallCenterRepoInterface {
  getCalls(): Promise<any>
  getAgents(): Promise<any>
  getResolutions(): Promise<any>
  getAgentDetails(): Promise<any>
}

interface AgentData {
  identifier: string
  firstName: string
  lastName: string
}

export class CallCenterRepository implements CallCenterRepoInterface {
  private path: string
  constructor() {
    this.path = path.join(__dirname, '../../json-data')
  }
  async getCalls(): Promise<any> {
    console.log('Dirname2: ', __dirname)
    const data = await fs.readFile(`${this.path}/logs.json`, {
      encoding: 'utf-8'
    })
    return JSON.parse(data)
  }

  async getAgents(): Promise<any> {
    const data = await fs.readFile(`${this.path}/agents.json`, {
      encoding: 'utf-8'
    })
    return JSON.parse(data)
  }

  async getAgentDetails(): Promise<any> {
    const data = await fs.readFile('agents.json', { encoding: 'utf-8' })

    return JSON.parse(data).map(
      ({ identifier, firstName, lastName }: AgentData) => ({
        identifier,
        firstName,
        lastName
      })
    )
  }

  async getResolutions(): Promise<any> {
    const data = await fs.readFile(`${this.path}/resolution.json`, {
      encoding: 'utf-8'
    })
    return JSON.parse(data)
  }
}
