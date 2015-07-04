function accountInfo(args) {
	this.accountObj = args;
	this.getSessionId = function() {
		return this.accountObj.SessId;
	},
	this.getAccounts = function() {
		return this.accountObj.UserLoginResponse.User.AccProfile.Account;
	}
}