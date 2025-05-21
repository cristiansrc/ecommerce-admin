import Api from './../api'
import settings from './../../application/config/settings.json'

export default new Api(settings.urlServiceBase + '/api/admin/login');