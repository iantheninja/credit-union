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

Bank.prototype.findAccount = function(id) {
    for (let i = 0; i <= this.accounts.length; i++) {
        if(this.accounts[i]) {
            if (this.accounts[i].id == id) {
                return this.accounts[i];
            }
        }
    }
}

Bank.prototype.deleteAccount = function(id) {
    for (let i = 0; i <= this.accounts.length; i++) {
        if(this.accounts[i]) {
            if (this.accounts[i].id == id) {
                delete this.accounts[i];
                return true;
            }
        }
    }
}


// Business logic for accounts
function Account(name, initialDeposit) {
    this.name = name;
    this.initialDeposit = initialDeposit;
}

Account.prototype.withdraw = function(amount) {
    let newBalance = this.initialDeposit - amount;
    return newBalance;
}

Account.prototype.deposit = function(amount) {
    let newBalance = this.initialDeposit + amount;
    return newBalance;
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

function showAccount(accountId) {
    const account = bank.findAccount(accountId); 
    $("#balance").show();
    
    $(".name").html(account.name);
    $(".balance").html(account.initialDeposit);

    let buttons = $("#buttons");
    buttons.empty();
    buttons.append("<button class='deleteButton btn-danger' id=" + account.id + ">Delete</button>");
}

function attachAccountListeners() {
    $("ul#accounts").on("click", "li", function() {
        showAccount(this.id);
    });
}

$("#buttons").on("click", ".deleteButton", function() {
    bank.deleteAccount(this.id)
    $("#balance").hide();
    displayAccountDetails(bank);
});


$(document).ready(function() {
    attachAccountListeners();
    $("form#new-account").submit(function(event) {
        event.preventDefault();

        const inputtedName = $("input#name").val();
        const inputtedInitialDeposit = $("input#initial-deposit").val();

        $("input#name").val("");
        $("input#initial-deposit").val("");

        let newAccount = new Account(inputtedName, inputtedInitialDeposit);
        bank.addAccount(newAccount);
        displayAccountDetails(bank);      
    });
})
