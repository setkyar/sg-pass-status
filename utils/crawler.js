const puppeteer = require("puppeteer");
const HtmlTableToJson = require("html-table-to-json");

const configs = require("./../config/app");

const is_headless = configs["is_headless"];
const mom_website =
    "https://eponline.mom.gov.sg/epol/PEPOLENQM007NextAction.do";
const requester_nric_fin = "input[name=requesterNRICFIN]";
const requester_name = "input[name=requesterName]";
const next_button = "input[name=save]";

const travel_doc_no = "input[name=travelDocNo]";
const travel_date_brith = "input[name=trvDateBirth]";
const submit_form = "input[name=submitForm]";

const requested_time_selector =
    "body > table:nth-child(21) > tbody > tr:nth-child(2) > td:nth-child(3) > form > table:nth-child(9) > tbody > tr > td";

async function crawler(passport, name, dob) {
    const browser = await puppeteer.launch(is_headless);
    const page = await browser.newPage();

    await page.goto(mom_website)
    await page.type(requester_nric_fin, passport);
    await page.type(requester_name, name);
    await page.click(next_button);
    await page.waitForNavigation();

    await page.type(travel_doc_no, passport);
    await page.type(travel_date_brith, dob);
    await page.click(submit_form);

    await page.waitForSelector(requested_time_selector);

    let result_table = await page.evaluate(() => {
        const result_table_selector =
            "body > table:nth-child(21) > tbody > tr:nth-child(2) > td:nth-child(3) > form > table:nth-child(10) > tbody > tr > td > table";
        return document.querySelector(result_table_selector).outerHTML;
    });

    await browser.close();

    let data = HtmlTableToJson.parse(result_table, { values: true }).results.flat();

    let result = [];

    data.forEach((element) => {
        result[element[1]] = element[2];
    });

    return result;
}

module.exports = crawler