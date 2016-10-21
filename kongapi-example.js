// Kongregate API init
var kongregate;

if (kongregateAPI) {
	kongregateAPI.loadAPI(onComplete);
	
	function onComplete(){
		kongregate = kongregateAPI.getAPI();
	};
};

// Kongregate leaderboard usage
var manualScore = 0,
	tradingScore = 0,
	score = 0;

if (kongregate && Math.random() < 0.05) {
	kongregate.stats.submit("manualScore", manualScore);
	kongregate.stats.submit("tradingScore", tradingScore);
	kongregate.stats.submit("autoScore", tradingScore);
	kongregate.stats.submit("score", score);
};