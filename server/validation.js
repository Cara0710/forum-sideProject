const Joi = require("joi");

// 檢驗註冊格式
const registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(50).required().messages({
      "string.empty": `請輸入"使用者名稱"`,
      "string.min": `"使用者名稱"最小的長度必須為{#limit}`,
      "string.max": `"使用者名稱"最大的長度限制為{#limit}`,
    }),
    password: Joi.string().min(6).max(1024).required().messages({
      "string.empty": `請輸入"密碼"`,
      "string.min": `"密碼"最小的長度必須為{#limit}`,
      "string.max": `"密碼"最大的長度限制為{#limit}`,
    }),
  });
  return schema.validate(data);
};

// 檢驗登入格式
const loginValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(50).required().messages({
      "string.empty": `請輸入"使用者名稱"`,
      "string.min": `"使用者名稱"最小的長度必須為{#limit}`,
      "string.max": `"使用者名稱"最大的長度限制為{#limit}`,
      "any.required": `請輸入"使用者名稱"`,
    }),
    password: Joi.string().min(6).max(1024).required().messages({
      "string.empty": `請輸入"密碼"`,
      "string.min": `"密碼"最小的長度必須為{#limit}`,
      "string.max": `"密碼"最大的長度限制為{#limit}`,
      "any.required": `請輸入"密碼"`,
    }),
  });
  return schema.validate(data);
};

// 檢驗發文格式
const postValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(50).required().messages({
      "string.empty": `請輸入"標題"`,
      "string.min": `"標題"最小的長度必須為{#limit}`,
      "string.max": `"標題"最大的長度限制為{#limit}`,
      "any.required": `請輸入"標題"`,
    }),
    description: Joi.string().min(6).required().messages({
      "string.empty": `請輸入"內容"`,
      "string.min": `"內容"最小的長度必須為{#limit}`,
      "string.max": `"內容"最大的長度限制為{#limit}`,
      "any.required": `請輸入"內容"`,
    }),
  });
  return schema.validate(data);
};

// 檢驗留言格式
const commentValidation = (data) => {
  const schema = Joi.object({
    dangerous: Joi.number().min(1).max(10).required().messages({
      "number.base": `"危險指數"應該為數字`,
      "number.empty": `請輸入"危險指數"`,
      "number.min": `"危險指數"最小的數字必須為{#limit}`,
      "number.max": `"危險指數"最大的數字限制為{#limit}`,
      "any.required": `請輸入"危險指數"`,
    }),
    content: Joi.string().min(1).max(999999).required().messages({
      "string.empty": `請輸入"留言"`,
      "string.min": `"留言"字數最小長度必須為{#limit}`,
      "string.max": `"留言"字數最大長度限制為{#limit}`,
      "any.required": `請輸入"留言"`,
    }),
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.postValidation = postValidation;
module.exports.commentValidation = commentValidation;
