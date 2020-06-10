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
let bank = new Bank();

function displayAccountDetails(bankToDisplay) {
    let accountsList = $("ul#accounts");
    let htmlForAccountInfo = "";

    bankToDisplay.accounts.forEach(function(account) {
        htmlForAccountInfo += "<li id=" + account.id + ">" + account.name + "</li>"
    });
    accountsList.html(htmlForAccountInfo);
}

$(document).ready(function() {
    $("form#new-account").submit(function(event) {
        event.preventDefault();

        const inputtedName = $("input#name").val();
        const inputtedInitialDeposit = $("input#initial-deposit").val();

        $("input#name").val("");
        $("input#initial-deposit").val("");

        let newAccount = new Account(inputtedName, inputtedInitialDeposit);
        bank.addAccount(newAccount);
        displayAccountDetails(bank);      
    })
})
