var plays = {
    "hamlet": { "name": "Hamlet", "type": "tragedy" },
    "as-like": { "name": "As You Like It", "type": "comedy" },
    "othello": { "name": "Othello", "type": "tragedy" }
}

var invoices = {
    "customer": "BigCo",
    "performances": [{
            "playID": "hamlet",
            "audience": 55
        },
        {
            "playID": "as-like",
            "audience": 35
        },
        {
            "playID": "othello",
            "audience": 40
        }
    ]
}


function statement(invoice, plays) {


    let result = `Statement for ${invoice.customer}\n`;

    for (let perf of invoice.performances) {

        // print line for this order
        result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience} seats)\n`;

    }

    result += `Amount owed is ${usd( totalAmount (invoice))}\n`;
    result += `You earned ${totalVolumeCredits(invoice)} credits\n`;
    return result;
}

function totalAmount(aInvoice) {
    let result = 0;
    for (let perf of aInvoice.performances) {
        result += amountFor(perf);
    }

    return result

}

function totalVolumeCredits(aInvoice) {

    let result = 0;
    for (let perf of aInvoice.performances) {

        result += volumeCreditsFor(perf);
        // add volume credits
    }
    return result;

}

function usd(aNumber) {

    return new Intl.NumberFormat("en-US",

        {
            style: "currency",
            currency: "USD",

            minimumFractionDigits: 2
        }).format(aNumber / 100);

}

function volumeCreditsFor(aPerformances) {

    let result = 0

    result += Math.max(aPerformances.audience - 30, 0);

    if ("comedy" === playFor(aPerformances).type)
        result += Math.floor(aPerformances.audience / 5);

    return result;

}


//将计算戏剧演出的费用的代码提炼为函数

function amountFor(aPerformances) {

    let result = 0;

    switch (playFor(aPerformances).type) {
        case "tragedy":
            thisAmount = 40000;
            if (aPerformances.audience > 30) {
                result += 1000 * (aPerformances.audience - 30);
            }
            break;
        case "comedy":
            thisAmount = 30000;
            if (aPerformances.audience > 20) {
                result += 10000 + 500 * (aPerformances.audience - 20);
            }
            result += 300 * aPerformances.audience;
            break;
        default:
            throw new Error(`unknown type: ${play.type}`);
    }

    return result;
}

function playFor(aPerformances) {

    return plays[aPerformances.playID]

}


console.log(statement(invoices, plays))