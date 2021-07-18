/****
 * 加密函数
 * 用于文件
 * 用来加密登录和验证
 * ***/

import CryptoJS from "crypto-js";

// 加密密钥
const key1 = CryptoJS.enc.Utf8.parse("1234567890123456");

//加密
export const encrypt = (msgString) => {
  // msgString is expected to be Utf8 encoded
  let iv = CryptoJS.lib.WordArray.random(16);
  let encrypted = CryptoJS.AES.encrypt(msgString, key1, { iv });
  return iv.concat(encrypted.ciphertext).toString(CryptoJS.enc.Base64);
};

export const decrypt = (ciphertextStr) => {
  let ciphertext = CryptoJS.enc.Base64.parse(ciphertextStr);

  // split IV and ciphertext
  let iv = ciphertext.clone();
  iv.sigBytes = 16;
  iv.clamp();
  ciphertext.words.splice(0, 4); // delete 4 words = 16 bytes
  ciphertext.sigBytes -= 16;

  // decryption
  let decrypted = CryptoJS.AES.decrypt({ ciphertext: ciphertext }, key1, {
    iv,
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
};
