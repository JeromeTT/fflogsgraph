import cryptoRandomString from "crypto-random-string";
import { base64_urlencode } from "./base64_urlencode";

const authrorize_url = process.env.FFLOGS_AUTHORIZE_URL

export const PKCEAuthorizationRedirect = async () => {
  const tempCodeVerifier = cryptoRandomString({length: 128, type: 'url-safe'});
  const redirect_url = authrorize_url.concat(
    `?client_id=${process.env.APP_ID}`,
    `&code_challenge=${await base64_urlencode(tempCodeVerifier)}`,
    `&code_challenge_method=S256`,
    `&state=${tempCodeVerifier}`,
    `&redirect_uri=${encodeURIComponent(process.env.BASE_URL)}`,
    `&response_type=code`)

  console.log('v'+tempCodeVerifier);
  console.log(await base64_urlencode(tempCodeVerifier));
  window.location.href = redirect_url;
}