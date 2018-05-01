/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./components/02-components/menus/main-menu/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./components/02-components/menus/main-menu/index.js":
/*!***********************************************************!*\
  !*** ./components/02-components/menus/main-menu/index.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(/*! ./main-menu.scss */ "./components/02-components/menus/main-menu/main-menu.scss");

__webpack_require__(/*! ./main-menu */ "./components/02-components/menus/main-menu/main-menu.js");

/***/ }),

/***/ "./components/02-components/menus/main-menu/main-menu.js":
/*!***************************************************************!*\
  !*** ./components/02-components/menus/main-menu/main-menu.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @file
 * A JavaScript file containing the main menu functionality (small/large screen)
 *
 */

(function (Drupal) {
  Drupal.behaviors.mainMenu = {
    attach: function attach(context) {
      'use strict';

      // Use context instead of document IF DRUPAL.

      var toggle_expand = document.getElementById('toggle-expand');
      var menu = document.getElementById('main-nav');
      var expand_menu = menu.getElementsByClassName('expand-sub');

      // Mobile Menu Show/Hide.
      toggle_expand.addEventListener('click', function (e) {
        toggle_expand.classList.toggle('toggle-expand--open');
        menu.classList.toggle('main-nav--open');
      });

      // Expose mobile sub menu on click.
      for (var i = 0; i < expand_menu.length; i++) {
        expand_menu[i].addEventListener('click', function (e) {
          var menu_item = e.currentTarget;
          var sub_menu = menu_item.nextElementSibling;

          menu_item.classList.toggle('expand-sub--open');
          sub_menu.classList.toggle('main-menu--sub-open');
        });
      }
    }
  };
})(Drupal); // UNCOMMENT IF DRUPAL.

/***/ }),

/***/ "./components/02-components/menus/main-menu/main-menu.scss":
/*!*****************************************************************!*\
  !*** ./components/02-components/menus/main-menu/main-menu.scss ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });
//# sourceMappingURL=main-menu.js.map