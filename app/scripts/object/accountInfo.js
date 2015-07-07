function AccountInfo(args) {
	this.accountObj = args;
	this.getSessionId = function() {
		return this.accountObj.SessId;
	},
	this.getUserId = function(){
		return this.accountObj.UserLoginResponse.User.UserId;
	},
	this.getAccounts = function() {
		return this.accountObj.UserLoginResponse.User.AccProfile.Account;
	}
}