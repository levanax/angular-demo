function AccountCashBalance(args){
	this.account = args;
	this.getBuyPower = function(){
		return this.account.CashBal.BuyPower;
	}
}