g.options.notes = {
	latest: '<b>v0.20: SkidInc full-rewrite.</b><br>' +
		'- <b>better UI</b>: new console, you can switch between themes, try <b>options console -help</b>.<br>' +
		'- <b>commands executer rewrite</b>: no more bugs with commands, case sensitive, options not buggy anymore, code is easier to manage.<br>' +
		'- <b>random events</b>: jobs are random offers, you gain a consecutive amount of $$$ and exp just for a few seconds of your time.<br>' +
		'- <b>added \'scripts\'</b>: you can buy them like servers to automatize the <b>hack</b> command.<br>' +
		'- <b>balancing changes</b>: servers cost and effect have been reviewed, same for places rewards ($$$, exp, level requirement), hackers prices.',
	
	previous: ''
};

g.options.notes.write = () => {
	g.console.print(g.options.notes.latest);
};