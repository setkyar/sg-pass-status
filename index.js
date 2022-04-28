#!/usr/bin/env node
const program = require("commander");

const crawler = require("./utils/crawler")
const send_telegram_msg = require("./utils/telegram")

const configs = require("./config/app");

program.version("1.0.0").description("Singapore Spass/EP Checker");

program
    .requiredOption("-p, --passport <passport number>", "Passport number.")
    .requiredOption("-n, --name <name>", "Name of pass applier.")
    .requiredOption("-d, --dob <dob>", "Date of pass applier.")
    .parse();

const { passport, name, dob } = program.opts();

async function start(passport, name, dob) {
    let result = await crawler(passport, name, dob);

    let status = result['Status']

    let message = `Yo Yo, your Singapore Spass/EP status got updated to ${status}!`;

    if (status != ": Pending" || configs["debug"] == "true") {
        send_telegram_msg(encodeURIComponent(message));
    }
}

start(passport, name, dob);