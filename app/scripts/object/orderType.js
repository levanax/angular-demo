function OrderType(args) {
	this.orderTypeObj = args;
	this.getTypes = function(args) {
		var result = null;
		if (typeof args !== 'undefined') {
			var key = args.toUpperCase();
			switch (key) {
				case 'B':
				case 'BUY':
					var tempArray = this.orderTypeObj.OrderTicket;
					for (var i = 0; i < tempArray.length; i++) {
						if (tempArray[i].OrdSide === "B") {
							result = tempArray[i].OrderType;
							break;
						}
					}
					break;
				case 'S':
				case 'SELL':
					var tempArray = this.orderTypeObj.OrderTicket;
					for (var i = 0; i < tempArray.length; i++) {
						if (tempArray[i].OrdSide === "S") {
							result = tempArray[i].OrderType;
							break;
						}
					}
					break;
				default:
					console.error('not found ...');
					break;
			}
		}
		return result;
	}
}