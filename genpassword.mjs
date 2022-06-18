function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
  const symbols = '!@#$%^&*(){}[]=<>/,.';
  return symbols[Math.floor(Math.random() * symbols.length)];
}

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

/**
 * @param {HTMLElement} resultEl
 */
export function clipboard(resultEl) {
  const textarea = document.createElement('textarea');
  const result = resultEl.innerText;

  if (!result) {
    return;
  }

  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
  alert('Result copied to clipboard!');
}

/**
 * 根据要求生成密码
 * @param {boolean} lower 是否有小写字符
 * @param {boolean} upper 是否有大写字符
 * @param {boolean} number 是否有数字
 * @param {boolean} symbol 是否有特殊字符
 * @param {number} length 要生成的密码长度
 * @return {string}
 */
export function generatePassword(length, opts = {}) {
  let generatedPassword = '';
  const { lower = false, upper = false, number = false, symbol = false } = opts;
  const typesCount = lower + upper + number + symbol;
  // 利用对象简写创造变量名与键值相同的对象
  const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
    item => Object.values(item)[0]
  );

  if (typesCount === 0) {
    return '';
  }

  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach(type => {
      const funcName = Object.keys(type)[0];
      generatedPassword += randomFunc[funcName]();
    });
  }

  const finalPassword = generatedPassword.slice(0, length);

  return finalPassword;
}
