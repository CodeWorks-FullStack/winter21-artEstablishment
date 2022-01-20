import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from './AxiosService'

class ProjectsService {
  async getProjects(query = '') {
    const res = await api.get('api/projects' + query)
    logger.log('get projects res', res.data)
    // NOTE don't need to map to a class so we can just set the res.data directly into appstate
    AppState.projects = res.data
  }

  async createProject(newProject) {
    const res = await api.post('api/projects', newProject)
    logger.log('create project res', res.data)
    AppState.projects.unshift(res.data)
  }
}

export const projectsService = new ProjectsService()
