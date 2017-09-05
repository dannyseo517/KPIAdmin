import { combineReducers } from 'redux'
import commentstate from './commentstate'
import authentication from './authentication';

const mainPanelC = combineReducers({
	commentstate,
	authentication
})

export default mainPanelC