
export function getRedirectTo(type,header) {
	let path = ''
	if (type === 'boss') {
		path = '/boss'
	} else {
		path = '/master'
	}
	if (!header) {
		path += 'Info'
	}
	return path
}