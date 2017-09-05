const commentstate = (state = {}, action) => {
	switch(action.type){
		case 'COMMENT_LAST_WEEK':
			return {
				lastweek: action.lastweek
			}
		case 'COMMENT_THIS_WEEK':
			return {
				thisweek: action.thisweek
			}
		case 'COMMENT_NEXT_WEEK': 
			return {
				nextweek: action.nextweek
			}
		case 'COMMENT_VALUE':
			return{
				lastweek: action.lastweek,
				thisweek: action.thisweek,
				nextweek: action.nextweek
			}
		default:
			return state
	}
}

export default commentstate;