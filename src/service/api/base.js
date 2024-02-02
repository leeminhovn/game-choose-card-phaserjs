/** @format */

import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    PrivateKey: "M0ch1M0ch1_En_$ecret_k3y",
  },
  timeout: 5000,
});

//  ==============================================
// 	config: option
// 	params = {
// 		email: userState?.userInfo?.email,
// 		page: page,
// 		typeQuery: 1,
// 	}
// 	option = {
// 		params,
// 		header {
// 			'MyCustomHeader1': '1',
// 			'MyCustomHeader2': '2'
// 		}
// 	}
// 	option = {}
// ==============================================
export const get = async (endpoint, config) => {
  try {
    const finalParam = config || {};
    const res = await instance.get(endpoint, { ...finalParam });
    return res;
  } catch (err) {
    return err;
  }
};

//  ==============================================
// 	body = {
// 		email: email,
// 		password: password,
// 	}
// 	customInfo = {
// 		params: {
//     		mail, firstName;
// 		},
// 		headers {
// 			'MyCustomHeader1': '1',
// 			'MyCustomHeader2': '2'
// 		}
// 	}
// ==============================================

export const post = async (endpoint, body, customInfo) => {
  try {
    const finalParam = customInfo || {};
    const res = await instance.post(endpoint, body, {
      ...finalParam,
    });
    return res;
  } catch (err) {
    return err;
  }
};
