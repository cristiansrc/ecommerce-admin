import Api from 'infrastructure/api/'
import settings from './../../application/config/settings.json'

export default new Api(settings.urlServiceBase + '/api/product');