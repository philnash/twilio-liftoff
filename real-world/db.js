const got = require("got");

async function getOrderByPhoneNumber(number) {
  const response = await got(process.env.API_URL, {
    searchParams: { phoneNumber: number },
    responseType: "json",
  });
  return response.body;
}

async function getOrderByOrderNumber(order) {
  const response = await got(process.env.API_URL, {
    searchParams: { orderNumber: order },
    responseType: "json",
  });
  return response.body;
}

module.exports = { getOrderByPhoneNumber, getOrderByOrderNumber };
