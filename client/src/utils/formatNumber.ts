const formatNumber = (seconds: number): string => {
	let duration = seconds;
	let hours = Math.floor(duration / (60 * 60));
	duration = duration % (60 * 60);
	let min = Math.floor(duration / 60);
	duration = duration % 60;
	let sec = Math.floor(duration);
	if (hours > 0) {
		return `${hours}h ${min}m ${sec}s`;
	} else if (min === 0) {
		return `${sec}s`;
	} else {
		return `${min}m ${sec}s`;
	}
};

export default formatNumber;
