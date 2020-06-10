// Business logic for bank
function Bank() {
    this.accounts = [];
    this.currentId = 0;
}

Bank.prototype.addAccount = function(account) {
    account.id = this.assignId();
    this.accounts.push(account);
}

Bank.prototype.assignId = function(account) {
    return this.currentId += 1;
}


// Business logic for accounts
function Account(name, initialDeposit) {
    this.name = name;
    this.initialDeposit = initialDeposit;
}

Account.prototype.withdraw = function(amount) {
    return this.initialDeposit - amount;
}

Account.prototype.deposit = function(amount) {
    return this.initialDeposit + amount;
}

// UI logic for accounts
$(document).ready(function() {
    
})
