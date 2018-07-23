const paystackBaseUrl = "api.paystack.co";
export const Paystack = {
  verify(referenceNumber, secretKey, callback) {
    const paystackVerificationUrl = `https://${paystackBaseUrl}/transaction/verify/${referenceNumber}`;
    const headers = new Headers({
      "Authorization": `Bearer ${secretKey}`,
      "Content-Type": "application/json"
    });
    fetch(paystackVerificationUrl, {
      headers
    })
      .then(res => res.json())
      .then(response => {
        if (response.status) {
          callback(null, response);
        } else {
          callback(response, null);
        }
      });
  }
};
