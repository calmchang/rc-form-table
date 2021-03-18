(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("antd"), require("react"));
	else if(typeof define === 'function' && define.amd)
		define("rc-form-table", ["antd", "react"], factory);
	else if(typeof exports === 'object')
		exports["rc-form-table"] = factory(require("antd"), require("react"));
	else
		root["rc-form-table"] = factory(root["antd"], root["React"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE_antd__, __WEBPACK_EXTERNAL_MODULE_react__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd */ \"antd\");\n/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_1__);\nfunction _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }\n\n\n\n\nclass TableFormItem extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {\n  constructor(props) {\n    super(props);\n    let initialValue = props.initialValue || [];\n    initialValue = initialValue.map((item, idx) => {\n      item._rowKey = `${idx}`;\n      return item;\n    });\n    this.state = {\n      initialValue: initialValue,\n      value: initialValue,\n      formName: props.formItemName\n    };\n    this.counter = 1;\n  }\n\n  getNewId() {\n    return `${Date.now()}_${this.counter++}`;\n  }\n\n  async onCopy(record, index, event) {\n    if (event) event.preventDefault();\n    const form = this.props.form;\n    const {\n      formName\n    } = this.state;\n    const {\n      getFieldValue\n    } = form;\n    const formData = getFieldValue(formName) || [];\n    let newdata = null;\n\n    if (this.props.onCopy) {\n      newdata = this.props.onCopy(record, index);\n      if (!newdata) return;\n    } else {\n      newdata = { ...this.props.newdata\n      };\n    }\n\n    newdata = { ...formData[index]\n    };\n    newdata._rowKey = this.getNewId();\n    let newFormData = this.onInsert(newdata, index);\n    this.onChange(newFormData);\n  }\n\n  async onInsert(newdata, index) {\n    const {\n      form\n    } = this.props;\n    const {\n      getFieldValue,\n      setFieldsValue\n    } = form;\n    const {\n      formName,\n      value\n    } = this.state;\n    const formData = getFieldValue(formName) || [];\n\n    if (index >= 0) {\n      formData.splice(index + 1, 0, newdata);\n    } else {\n      formData.push(newdata);\n    }\n\n    await this.setState({\n      value: []\n    });\n    await setFieldsValue({\n      [formName]: []\n    });\n    await this.setState({\n      value: formData\n    });\n    await setFieldsValue({\n      [formName]: formData\n    });\n    return formData;\n  }\n\n  async onAdd(record, index, event) {\n    if (event) event.preventDefault();\n    let newdata = null;\n\n    if (this.props.onAdd) {\n      newdata = this.props.onAdd(record, index);\n      if (!newdata) return;\n    } else {\n      newdata = { ...this.props.newdata\n      };\n    }\n\n    newdata._rowKey = this.getNewId();\n    let formData = this.onInsert(newdata, index);\n    this.onChange(formData);\n  }\n\n  async onDel(record, index, event) {\n    if (event) event.preventDefault();\n    const {\n      form\n    } = this.props;\n    const {\n      getFieldValue,\n      setFieldsValue\n    } = form;\n    const {\n      formName\n    } = this.state;\n    const formData = getFieldValue(formName) || [];\n    formData.splice(index, 1);\n    await this.setState({\n      value: []\n    });\n    await setFieldsValue({\n      [formName]: []\n    });\n    await this.setState({\n      value: formData\n    });\n    await setFieldsValue({\n      [formName]: formData\n    });\n    this.onChange(formData);\n  }\n\n  async onReset(initValue, event) {\n    if (event) event.preventDefault();\n    const {\n      form\n    } = this.props;\n    const {\n      setFieldsValue\n    } = form;\n    const {\n      formName\n    } = this.state;\n    const {\n      initialValue\n    } = this.props;\n    initValue = initValue || initialValue;\n    initValue = initValue.map((item, idx) => {\n      item._rowKey = `${idx}`;\n      return item;\n    });\n    await this.setState({\n      value: [],\n      initialValue: initValue\n    });\n    await setFieldsValue({\n      [formName]: []\n    });\n    await this.setState({\n      value: initValue\n    });\n    await setFieldsValue({\n      [formName]: initValue\n    });\n  }\n\n  async onChange(value) {\n    if (this.props.onChange) {\n      await this.props.onChange(value);\n    }\n\n    if (this.props.onRefresh) {\n      this.props.onRefresh(value);\n    }\n  }\n\n  render() {\n    const {\n      value\n    } = this.state;\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_1__[\"Table\"], _extends({}, this.props.antTableOptions, {\n      dataSource: value,\n      columns: this.props.columns({\n        onDel: this.onDel.bind(this),\n        onAdd: this.onAdd.bind(this),\n        onCopy: this.onCopy.bind(this),\n        onReset: this.onReset.bind(this)\n      })\n    }));\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (TableFormItem);\n\n//# sourceURL=webpack://rc-form-table/./src/index.js?");

/***/ }),

/***/ "antd":
/*!***********************!*\
  !*** external "antd" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE_antd__;\n\n//# sourceURL=webpack://rc-form-table/external_%22antd%22?");

/***/ }),

/***/ "react":
/*!**************************************************************************************!*\
  !*** external {"commonjs":"react","commonjs2":"react","amd":"react","root":"React"} ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE_react__;\n\n//# sourceURL=webpack://rc-form-table/external_%7B%22commonjs%22:%22react%22,%22commonjs2%22:%22react%22,%22amd%22:%22react%22,%22root%22:%22React%22%7D?");

/***/ })

/******/ });
});