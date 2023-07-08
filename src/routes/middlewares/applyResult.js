export function applyResult(result, res, successStatusCode) {
	if (result.hasError()) {
		if (result.hasCriticalError()) {
			res.writeHead(500);
		} else {
			res.writeHead(400);
		}
		console.log(result.getErrorList())
		res.end(JSON.stringify(result.getErrorList()));
	} else if (result.isResultEmpty()) {
		res.writeHead(204);
		res.end();
	} else {
		res.writeHead(successStatusCode);
		res.end(JSON.stringify(result.getResult()));
	}
}