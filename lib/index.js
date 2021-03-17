/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("antd"));
	else if(typeof define === 'function' && define.amd)
		define("rc-form-table", ["react", "antd"], factory);
	else if(typeof exports === 'object')
		exports["rc-form-table"] = factory(require("react"), require("antd"));
	else
		root["rc-form-table"] = factory(root["React"], root["antd"]);
})(self, function(__WEBPACK_EXTERNAL_MODULE_react__, __WEBPACK_EXTERNAL_MODULE_antd__) {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd */ \"antd\");\n/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_1__);\nfunction _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }\n\n\n\n\nclass TableFormItem extends (react__WEBPACK_IMPORTED_MODULE_0___default().Component) {\n  constructor(props) {\n    super(props);\n    let initialValue = props.initialValue || [];\n    initialValue = initialValue.map((item, idx) => {\n      item._rowKey = `${idx}`;\n      return item;\n    });\n    this.state = {\n      initialValue: initialValue,\n      value: initialValue,\n      formName: props.formItemName\n    };\n    this.counter = 1;\n  }\n\n  getNewId() {\n    return `${Date.now()}_${this.counter++}`;\n  }\n\n  async onCopy(record, index, event) {\n    if (event) event.preventDefault();\n    const form = this.props.form;\n    const {\n      formName\n    } = this.state;\n    const {\n      getFieldValue\n    } = form;\n    const formData = getFieldValue(formName) || [];\n    let newdata = null;\n\n    if (this.props.onCopy) {\n      newdata = this.props.onCopy(record, index);\n      if (!newdata) return;\n    } else {\n      newdata = { ...this.props.newdata\n      };\n    }\n\n    newdata = { ...formData[index]\n    };\n    newdata._rowKey = this.getNewId();\n    let newFormData = this.onInsert(newdata, index);\n    this.onChange(newFormData);\n  }\n\n  async onInsert(newdata, index) {\n    const {\n      form\n    } = this.props;\n    const {\n      getFieldValue,\n      setFieldsValue\n    } = form;\n    const {\n      formName,\n      value\n    } = this.state;\n    const formData = getFieldValue(formName) || [];\n\n    if (index >= 0) {\n      formData.splice(index + 1, 0, newdata);\n    } else {\n      formData.push(newdata);\n    }\n\n    await this.setState({\n      value: []\n    });\n    await setFieldsValue({\n      [formName]: []\n    });\n    await this.setState({\n      value: formData\n    });\n    await setFieldsValue({\n      [formName]: formData\n    });\n    return formData;\n  }\n\n  async onAdd(record, index, event) {\n    if (event) event.preventDefault();\n    let newdata = null;\n\n    if (this.props.onAdd) {\n      newdata = this.props.onAdd(record, index);\n      if (!newdata) return;\n    } else {\n      newdata = { ...this.props.newdata\n      };\n    }\n\n    newdata._rowKey = this.getNewId();\n    let formData = this.onInsert(newdata, index);\n    this.onChange(formData);\n  }\n\n  async onDel(record, index, event) {\n    if (event) event.preventDefault();\n    const {\n      form\n    } = this.props;\n    const {\n      getFieldValue,\n      setFieldsValue\n    } = form;\n    const {\n      formName\n    } = this.state;\n    const formData = getFieldValue(formName) || [];\n    formData.splice(index, 1);\n    await this.setState({\n      value: []\n    });\n    await setFieldsValue({\n      [formName]: []\n    });\n    await this.setState({\n      value: formData\n    });\n    await setFieldsValue({\n      [formName]: formData\n    });\n    this.onChange(formData);\n  }\n\n  async onReset(event) {\n    if (event) event.preventDefault();\n    const {\n      form\n    } = this.props;\n    const {\n      setFieldsValue\n    } = form;\n    const {\n      formName,\n      initialValue\n    } = this.state;\n    await this.setState({\n      value: []\n    });\n    await setFieldsValue({\n      [formName]: []\n    });\n    await this.setState({\n      value: initialValue\n    });\n    await setFieldsValue({\n      [formName]: initialValue\n    });\n  }\n\n  async onChange(value) {\n    if (this.props.onChange) {\n      await this.props.onChange(value);\n    }\n\n    if (this.props.onRefresh) {\n      this.props.onRefresh(value);\n    }\n  }\n\n  render() {\n    const {\n      value\n    } = this.state;\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(antd__WEBPACK_IMPORTED_MODULE_1__.Table, _extends({}, this.props.antTableOptions, {\n      dataSource: value,\n      columns: this.props.columns({\n        onDel: this.onDel.bind(this),\n        onAdd: this.onAdd.bind(this),\n        onCopy: this.onCopy.bind(this),\n        onReset: this.onReset.bind(this)\n      })\n    }));\n  }\n\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TableFormItem);\n\n//# sourceURL=webpack://rc-form-table/./src/index.js?");

/***/ }),

/***/ "antd":
/*!***********************!*\
  !*** external "antd" ***!
  \***********************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_antd__;

/***/ }),

/***/ "react":
/*!**************************************************************************************!*\
  !*** external {"commonjs":"react","commonjs2":"react","amd":"react","root":"React"} ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_react__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});