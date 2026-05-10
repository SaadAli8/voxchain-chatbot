import { Notyf } from "notyf";
import "notyf/notyf.min.css";

class Helpers {
  static basePath = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000";
  static apiUrl = `${this.basePath}/`;

  static authUser = JSON.parse(localStorage.getItem("user")) ?? {};

  static serverImage = (name) => {
    return `${this.basePath}/uploads/${name}`;
  };

  static authHeaders = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  static authFileHeaders = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  static getItem = (data, isJson = false) => {
    if (isJson) {
      return JSON.parse(localStorage.getItem(data));
    } else {
      return localStorage.getItem(data);
    }
  };

  static setItem = (key, data, isJson = false) => {
    if (isJson) {
      localStorage.setItem(key, JSON.stringify(data));
    } else {
      localStorage.setItem(key, data);
    }
  };

  static toast = (type, message) => {
    const notyf = new Notyf();
    notyf.open({
      message: message,
      type: type,
      position: { x: "right", y: "top" },
      ripple: true,
      dismissible: true,
      duration: 2000,
    });
  };

  static encryptObject = (obj) => {
    const str = JSON.stringify(obj);
    const encrypted = btoa(str);
    return encrypted;
  };

  static decryptObject = (str) => {
    const decrypted = atob(str);
    const obj = JSON.parse(decrypted);
    return obj;
  };

  static encryptString = (str) => {
    const encrypted = btoa(str);
    return encrypted;
  };

  static decryptString = (str) => {
    try {
      const decrypted = atob(str);
      return decrypted;
    } catch (error) {
      return "";
    }
  };

  static paginate = (data) => {
    let pageSize = 10;
    let paginated = [];
    let startIndex = 0;
    let totalPages = Math.ceil(data.length / pageSize);
    for (let i = 0; i < totalPages; i++) {
      let lastIndex = pageSize + startIndex;
      let pageData = data.slice(startIndex, lastIndex);
      paginated.push(pageData);
      startIndex += pageSize;
    }
    return paginated;
  };

  static getContentValue = (dataString) => {
    try {
      let data = JSON.parse(dataString);
      if (data.choices && data.choices.length > 0) {
        return data.choices[0].delta.content;
      } else {
        return "";
      }
    } catch (error) {
      return "";
    }
  };

  static countWords = (str) => {
    if (str) {
      let words = str.split(" ");
      return words.length;
    } else {
      return 0;
    }
  };
}

export default Helpers;
