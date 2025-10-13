/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@wordpress/icons/build-module/library/plus.js":
/*!********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/plus.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

const plus = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M11 12.5V17.5H12.5V12.5H17.5V11H12.5V6H11V11H6V12.5H11Z"
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (plus);
//# sourceMappingURL=plus.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/trash.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/trash.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

const trash = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M12 5.5A2.25 2.25 0 0 0 9.878 7h4.244A2.251 2.251 0 0 0 12 5.5ZM12 4a3.751 3.751 0 0 0-3.675 3H5v1.5h1.27l.818 8.997a2.75 2.75 0 0 0 2.739 2.501h4.347a2.75 2.75 0 0 0 2.738-2.5L17.73 8.5H19V7h-3.325A3.751 3.751 0 0 0 12 4Zm4.224 4.5H7.776l.806 8.861a1.25 1.25 0 0 0 1.245 1.137h4.347a1.25 1.25 0 0 0 1.245-1.137l.805-8.861Z"
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (trash);
//# sourceMappingURL=trash.js.map

/***/ }),

/***/ "./src/blocks/call-to-action.js":
/*!**************************************!*\
  !*** ./src/blocks/call-to-action.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__);





(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.registerBlockType)("socius-pro-blocks/call-to-action", {
  edit: ({
    attributes,
    setAttributes
  }) => {
    const {
      heading,
      text,
      buttonText,
      buttonUrl,
      backgroundColor,
      textColor
    } = attributes;
    const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.useBlockProps)({
      className: "socius-cta-block",
      style: {
        backgroundColor: backgroundColor,
        color: textColor
      }
    });
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.InspectorControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelBody, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("CTA Settings", "socius-block-manager"),
      initialOpen: true
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Button Text", "socius-block-manager"),
      value: buttonText,
      onChange: value => setAttributes({
        buttonText: value
      })
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      style: {
        marginBottom: "15px"
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
      style: {
        display: "block",
        marginBottom: "5px",
        fontWeight: "600"
      }
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Button URL", "socius-block-manager")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.URLInput, {
      value: buttonUrl,
      onChange: value => setAttributes({
        buttonUrl: value
      })
    }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.PanelColorSettings, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Color Settings", "socius-block-manager"),
      colorSettings: [{
        value: backgroundColor,
        onChange: value => setAttributes({
          backgroundColor: value
        }),
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Background Color", "socius-block-manager")
      }, {
        value: textColor,
        onChange: value => setAttributes({
          textColor: value
        }),
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Text Color", "socius-block-manager")
      }]
    })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      ...blockProps
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "socius-cta-content"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.RichText, {
      tagName: "h2",
      placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Enter heading...", "socius-block-manager"),
      value: heading,
      onChange: value => setAttributes({
        heading: value
      }),
      className: "socius-cta-heading"
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.RichText, {
      tagName: "p",
      placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Enter description...", "socius-block-manager"),
      value: text,
      onChange: value => setAttributes({
        text: value
      }),
      className: "socius-cta-text"
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "socius-cta-button-wrapper"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "socius-cta-button"
    }, buttonText || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Button Text", "socius-block-manager"))))));
  },
  save: ({
    attributes
  }) => {
    const {
      heading,
      text,
      buttonText,
      buttonUrl,
      backgroundColor,
      textColor
    } = attributes;
    const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.useBlockProps.save({
      className: "socius-cta-block",
      style: {
        backgroundColor: backgroundColor,
        color: textColor
      }
    });
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      ...blockProps
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "socius-cta-content"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.RichText.Content, {
      tagName: "h2",
      value: heading,
      className: "socius-cta-heading"
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.RichText.Content, {
      tagName: "p",
      value: text,
      className: "socius-cta-text"
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "socius-cta-button-wrapper"
    }, buttonUrl ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: buttonUrl,
      className: "socius-cta-button"
    }, buttonText) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "socius-cta-button"
    }, buttonText))));
  }
});

/***/ }),

/***/ "./src/blocks/feature-box.js":
/*!***********************************!*\
  !*** ./src/blocks/feature-box.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_5__);







// Common WordPress Dashicons
const iconOptions = [{
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Star", "socius-block-manager"),
  value: "star-filled"
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Heart", "socius-block-manager"),
  value: "heart"
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Lightbulb", "socius-block-manager"),
  value: "lightbulb"
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Chart", "socius-block-manager"),
  value: "chart-line"
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Shield", "socius-block-manager"),
  value: "shield"
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Award", "socius-block-manager"),
  value: "awards"
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Rocket", "socius-block-manager"),
  value: "performance"
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Megaphone", "socius-block-manager"),
  value: "megaphone"
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Thumbs Up", "socius-block-manager"),
  value: "thumbs-up"
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Clock", "socius-block-manager"),
  value: "clock"
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Location", "socius-block-manager"),
  value: "location"
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Cart", "socius-block-manager"),
  value: "cart"
}];

// Get allowed variations based on restrictions
const getAllowedVariations = blockName => {
  const restrictions = window.sociusBlockRestrictions || {};

  // Super admins see all variations
  if (restrictions.isSuperAdmin) {
    return null; // null means no filtering
  }

  // If no restrictions set, allow all
  if (!restrictions.restrictions || !restrictions.restrictions[blockName]) {
    return null;
  }
  const blockRestrictions = restrictions.restrictions[blockName];

  // If block itself is not allowed, return empty array
  if (blockRestrictions.allowed === false) {
    return [];
  }

  // Check variation restrictions
  const variationRestrictions = blockRestrictions.variations || {};
  const allVariations = ["icon-top", "icon-left", "icon-right"];

  // Filter out restricted variations
  const allowedVariations = allVariations.filter(varName => {
    if (!variationRestrictions[varName]) {
      return true; // No restriction means allowed
    }
    return variationRestrictions[varName].allowed !== false;
  });
  return allowedVariations;
};
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.registerBlockType)("socius-pro-blocks/feature-box", {
  edit: ({
    attributes,
    setAttributes
  }) => {
    const {
      title,
      description,
      icon,
      variation,
      iconColor,
      backgroundColor
    } = attributes;
    const [showVariationPicker, setShowVariationPicker] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useState)(!variation || variation === "");
    const [allowedVariations, setAllowedVariations] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useState)(null);
    const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.useBlockProps)({
      className: `socius-feature-box feature-${variation}`,
      style: {
        backgroundColor: backgroundColor
      }
    });

    // Get allowed variations on mount
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useEffect)(() => {
      const allowed = getAllowedVariations("socius-pro-blocks/feature-box");
      setAllowedVariations(allowed);

      // If current variation is not allowed, reset to first allowed or show picker
      if (allowed && allowed.length > 0 && variation && !allowed.includes(variation)) {
        setAttributes({
          variation: allowed[0]
        });
      }
    }, []);
    const selectVariation = selectedVariation => {
      setAttributes({
        variation: selectedVariation
      });
      setShowVariationPicker(false);
    };
    const allVariationOptions = [{
      name: "icon-top",
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Icon Top", "socius-block-manager"),
      description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Icon positioned above the content", "socius-block-manager"),
      icon: "⬆️"
    }, {
      name: "icon-left",
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Icon Left", "socius-block-manager"),
      description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Icon positioned to the left of content", "socius-block-manager"),
      icon: "⬅️"
    }, {
      name: "icon-right",
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Icon Right", "socius-block-manager"),
      description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Icon positioned to the right of content", "socius-block-manager"),
      icon: "➡️"
    }];

    // Filter variation options based on restrictions
    const variationOptions = allowedVariations ? allVariationOptions.filter(opt => allowedVariations.includes(opt.name)) : allVariationOptions;

    // If no variations are allowed, show error
    if (allowedVariations && allowedVariations.length === 0) {
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        ...blockProps
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Placeholder, {
        icon: "star-filled",
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Feature Box", "socius-block-manager")
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("No variations are available for this block. Contact your administrator.", "socius-block-manager"))));
    }

    // Show variation picker if no variation is selected
    if (showVariationPicker) {
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        ...blockProps
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Placeholder, {
        icon: "star-filled",
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Feature Box", "socius-block-manager"),
        instructions: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Choose a layout variation to get started", "socius-block-manager")
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        style: {
          display: "grid",
          gap: "1rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          width: "100%"
        }
      }, variationOptions.map(option => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
        key: option.name,
        isSecondary: true,
        onClick: () => selectVariation(option.name),
        style: {
          height: "auto",
          padding: "1rem",
          textAlign: "center",
          flexDirection: "column",
          display: "flex",
          gap: "0.5rem"
        }
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        style: {
          fontSize: "2rem"
        }
      }, option.icon), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        style: {
          fontWeight: "bold"
        }
      }, option.title), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        style: {
          fontSize: "0.9rem",
          opacity: 0.7
        }
      }, option.description)))), variationOptions.length > 0 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        style: {
          marginTop: "1rem"
        }
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
        isLink: true,
        onClick: () => selectVariation(variationOptions[0].name)
      }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Skip and use default", "socius-block-manager"), " (", variationOptions[0].title, ")"))));
    }

    // Filter select options based on allowed variations
    const selectOptions = allowedVariations ? [{
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Icon Top", "socius-block-manager"),
      value: "icon-top"
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Icon Left", "socius-block-manager"),
      value: "icon-left"
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Icon Right", "socius-block-manager"),
      value: "icon-right"
    }].filter(opt => allowedVariations.includes(opt.value)) : [{
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Icon Top", "socius-block-manager"),
      value: "icon-top"
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Icon Left", "socius-block-manager"),
      value: "icon-left"
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Icon Right", "socius-block-manager"),
      value: "icon-right"
    }];
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.InspectorControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelBody, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Layout Settings", "socius-block-manager"),
      initialOpen: true
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.SelectControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Variation", "socius-block-manager"),
      value: variation,
      options: selectOptions,
      onChange: value => setAttributes({
        variation: value
      }),
      help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Choose the icon position", "socius-block-manager")
    }), selectOptions.length > 1 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
      isSecondary: true,
      onClick: () => setShowVariationPicker(true),
      style: {
        marginTop: "1rem"
      }
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Change Layout Variation", "socius-block-manager"))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelBody, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Icon Settings", "socius-block-manager"),
      initialOpen: false
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.SelectControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Icon", "socius-block-manager"),
      value: icon,
      options: iconOptions,
      onChange: value => setAttributes({
        icon: value
      })
    })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.PanelColorSettings, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Color Settings", "socius-block-manager"),
      colorSettings: [{
        value: iconColor,
        onChange: value => setAttributes({
          iconColor: value
        }),
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Icon Color", "socius-block-manager")
      }, {
        value: backgroundColor,
        onChange: value => setAttributes({
          backgroundColor: value
        }),
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Background Color", "socius-block-manager")
      }]
    })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      ...blockProps
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: `feature-box-content feature-${variation}`
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "feature-icon",
      style: {
        color: iconColor
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: `dashicons dashicons-${icon}`
    })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "feature-text"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.RichText, {
      tagName: "h3",
      placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Enter title...", "socius-block-manager"),
      value: title,
      onChange: value => setAttributes({
        title: value
      }),
      className: "feature-title"
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.RichText, {
      tagName: "p",
      placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Enter description...", "socius-block-manager"),
      value: description,
      onChange: value => setAttributes({
        description: value
      }),
      className: "feature-description"
    })))));
  },
  save: ({
    attributes
  }) => {
    const {
      title,
      description,
      icon,
      variation,
      iconColor,
      backgroundColor
    } = attributes;
    const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.useBlockProps.save({
      className: `socius-feature-box feature-${variation}`,
      style: {
        backgroundColor: backgroundColor
      }
    });
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      ...blockProps
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: `feature-box-content feature-${variation}`
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "feature-icon",
      style: {
        color: iconColor
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: `dashicons dashicons-${icon}`
    })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "feature-text"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.RichText.Content, {
      tagName: "h3",
      value: title,
      className: "feature-title"
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.RichText.Content, {
      tagName: "p",
      value: description,
      className: "feature-description"
    }))));
  }
});

/***/ }),

/***/ "./src/blocks/hero/index.js":
/*!**********************************!*\
  !*** ./src/blocks/hero/index.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _variations_single_image__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./variations/single-image */ "./src/blocks/hero/variations/single-image.js");
/* harmony import */ var _variations_carousel__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./variations/carousel */ "./src/blocks/hero/variations/carousel.js");
/* harmony import */ var _variations_with_form__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./variations/with-form */ "./src/blocks/hero/variations/with-form.js");







// Import variation components




// Get allowed variations based on restrictions
const getAllowedVariations = blockName => {
  const restrictions = window.sociusBlockRestrictions || {};
  if (restrictions.isSuperAdmin) {
    return null;
  }
  if (!restrictions.restrictions || !restrictions.restrictions[blockName]) {
    return null;
  }
  const blockRestrictions = restrictions.restrictions[blockName];
  if (blockRestrictions.allowed === false) {
    return [];
  }
  const variationRestrictions = blockRestrictions.variations || {};
  const allVariations = ["single-image", "carousel", "with-form"];
  const allowedVariations = allVariations.filter(varName => {
    if (!variationRestrictions[varName]) {
      return true;
    }
    return variationRestrictions[varName].allowed !== false;
  });
  return allowedVariations;
};
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.registerBlockType)("socius-pro-blocks/hero", {
  edit: ({
    attributes,
    setAttributes
  }) => {
    const {
      variation
    } = attributes;
    const [showVariationPicker, setShowVariationPicker] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useState)(!variation);
    const [allowedVariations, setAllowedVariations] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useState)(null);
    const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.useBlockProps)({
      className: `socius-hero-block hero-${variation || "unset"}`
    });
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useEffect)(() => {
      const allowed = getAllowedVariations("socius-pro-blocks/hero");
      setAllowedVariations(allowed);

      // If current variation is not allowed, show picker
      if (allowed && allowed.length > 0 && variation && !allowed.includes(variation)) {
        setAttributes({
          variation: ""
        });
        setShowVariationPicker(true);
      }

      // If no variation is set and we have allowed variations, show picker
      if (!variation && allowed && allowed.length > 0) {
        setShowVariationPicker(true);
      }
    }, []);
    const selectVariation = selectedVariation => {
      setAttributes({
        variation: selectedVariation
      });
      setShowVariationPicker(false);
    };
    const allVariationOptions = [{
      name: "single-image",
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Single Image Hero", "socius-block-manager"),
      description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Hero with single background image, title, subtitle, and buttons", "socius-block-manager"),
      icon: "🖼️"
    }, {
      name: "carousel",
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Carousel Hero", "socius-block-manager"),
      description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Hero with image carousel, title, subtitle, and buttons", "socius-block-manager"),
      icon: "🎠"
    }, {
      name: "with-form",
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Hero with Form", "socius-block-manager"),
      description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Hero with image, content, and optional form shortcode", "socius-block-manager"),
      icon: "📝"
    }];
    const variationOptions = allowedVariations ? allVariationOptions.filter(opt => allowedVariations.includes(opt.name)) : allVariationOptions;

    // If no variations are allowed
    if (allowedVariations && allowedVariations.length === 0) {
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        ...blockProps
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Placeholder, {
        icon: "format-image",
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Hero Section", "socius-block-manager")
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("No variations are available for this block. Contact your administrator.", "socius-block-manager"))));
    }

    // Show variation picker
    if (showVariationPicker || !variation) {
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        ...blockProps
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Placeholder, {
        icon: "format-image",
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Hero Section", "socius-block-manager"),
        instructions: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Choose a hero layout to get started", "socius-block-manager")
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        style: {
          display: "grid",
          gap: "1rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          width: "100%",
          maxWidth: "800px"
        }
      }, variationOptions.map(option => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
        key: option.name,
        isSecondary: true,
        onClick: () => selectVariation(option.name),
        style: {
          height: "auto",
          padding: "1.5rem",
          textAlign: "center",
          flexDirection: "column",
          display: "flex",
          gap: "0.5rem"
        }
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        style: {
          fontSize: "3rem"
        }
      }, option.icon), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        style: {
          fontWeight: "bold",
          fontSize: "1.1rem"
        }
      }, option.title), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        style: {
          fontSize: "0.9rem",
          opacity: 0.7
        }
      }, option.description)))), variationOptions.length > 0 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        style: {
          marginTop: "1rem"
        }
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
        isLink: true,
        onClick: () => selectVariation(variationOptions[0].name)
      }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Skip and use default", "socius-block-manager"), " (", variationOptions[0].title, ")"))));
    }

    // Get filtered select options for inspector
    const selectOptions = allowedVariations ? allVariationOptions.filter(opt => allowedVariations.includes(opt.name)).map(opt => ({
      label: opt.title,
      value: opt.name
    })) : allVariationOptions.map(opt => ({
      label: opt.title,
      value: opt.name
    }));

    // Render the appropriate variation with inspector controls to change it
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      ...blockProps
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.InspectorControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelBody, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Hero Variation", "socius-block-manager"),
      initialOpen: true
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.SelectControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Select Variation", "socius-block-manager"),
      value: variation,
      options: selectOptions,
      onChange: value => setAttributes({
        variation: value
      }),
      help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Choose the hero layout style", "socius-block-manager")
    }), selectOptions.length > 1 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
      isSecondary: true,
      onClick: () => setShowVariationPicker(true),
      style: {
        marginTop: "1rem",
        width: "100%"
      }
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Change Layout Variation", "socius-block-manager")))), variation === "single-image" && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_variations_single_image__WEBPACK_IMPORTED_MODULE_6__.SingleImageEdit, {
      attributes: attributes,
      setAttributes: setAttributes
    }), variation === "carousel" && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_variations_carousel__WEBPACK_IMPORTED_MODULE_7__.CarouselEdit, {
      attributes: attributes,
      setAttributes: setAttributes
    }), variation === "with-form" && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_variations_with_form__WEBPACK_IMPORTED_MODULE_8__.WithFormEdit, {
      attributes: attributes,
      setAttributes: setAttributes
    }));
  },
  save: ({
    attributes
  }) => {
    const {
      variation
    } = attributes;
    const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.useBlockProps.save({
      className: `socius-hero-block hero-${variation}`
    });
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      ...blockProps
    }, variation === "single-image" && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_variations_single_image__WEBPACK_IMPORTED_MODULE_6__.SingleImageSave, {
      attributes: attributes
    }), variation === "carousel" && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_variations_carousel__WEBPACK_IMPORTED_MODULE_7__.CarouselSave, {
      attributes: attributes
    }), variation === "with-form" && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_variations_with_form__WEBPACK_IMPORTED_MODULE_8__.WithFormSave, {
      attributes: attributes
    }));
  }
});

/***/ }),

/***/ "./src/blocks/hero/variations/carousel.js":
/*!************************************************!*\
  !*** ./src/blocks/hero/variations/carousel.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CarouselEdit: () => (/* binding */ CarouselEdit),
/* harmony export */   CarouselSave: () => (/* binding */ CarouselSave)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/trash.js");
/* harmony import */ var _components_ButtonGroup__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../components/ButtonGroup */ "./src/components/ButtonGroup.js");

// src/blocks/hero/variations/carousel.js






const CarouselEdit = ({
  attributes,
  setAttributes
}) => {
  const {
    title,
    subtitle,
    carouselImages,
    buttons,
    backgroundColor,
    textColor,
    overlayOpacity
  } = attributes;
  const [currentSlide, setCurrentSlide] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)(0);
  const addImage = media => {
    const newImages = [...carouselImages, {
      id: media.id,
      url: media.url
    }];
    setAttributes({
      carouselImages: newImages
    });
  };
  const removeImage = index => {
    const newImages = carouselImages.filter((_, i) => i !== index);
    setAttributes({
      carouselImages: newImages
    });
    if (currentSlide >= newImages.length && newImages.length > 0) {
      setCurrentSlide(newImages.length - 1);
    }
  };
  const nextSlide = () => {
    if (carouselImages.length > 0) {
      setCurrentSlide((currentSlide + 1) % carouselImages.length);
    }
  };
  const prevSlide = () => {
    if (carouselImages.length > 0) {
      setCurrentSlide(currentSlide === 0 ? carouselImages.length - 1 : currentSlide - 1);
    }
  };
  const currentImage = carouselImages[currentSlide];
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Carousel Images", "socius-block-manager"),
    initialOpen: true
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Add multiple images for the carousel", "socius-block-manager")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.MediaUploadCheck, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.MediaUpload, {
    onSelect: addImage,
    allowedTypes: ["image"],
    multiple: false,
    render: ({
      open
    }) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
      isPrimary: true,
      onClick: open
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Add Image", "socius-block-manager"))
  })), carouselImages.length > 0 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      marginTop: "15px"
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Images:", "socius-block-manager"), " ", carouselImages.length), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "10px",
      marginTop: "10px"
    }
  }, carouselImages.map((image, index) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: index,
    style: {
      position: "relative"
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: image.url,
    alt: "",
    style: {
      width: "100%",
      height: "80px",
      objectFit: "cover",
      borderRadius: "4px"
    }
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_5__["default"],
    isDestructive: true,
    isSmall: true,
    onClick: () => removeImage(index),
    style: {
      position: "absolute",
      top: "5px",
      right: "5px",
      minWidth: "auto",
      padding: "4px"
    }
  }))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Overlay Opacity", "socius-block-manager"),
    value: overlayOpacity,
    onChange: value => setAttributes({
      overlayOpacity: value
    }),
    min: 0,
    max: 1,
    step: 0.1
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Button Settings", "socius-block-manager"),
    initialOpen: false
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_ButtonGroup__WEBPACK_IMPORTED_MODULE_6__.ButtonGroup, {
    buttons: buttons,
    onChange: newButtons => setAttributes({
      buttons: newButtons
    }),
    maxButtons: 3
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.PanelColorSettings, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Color Settings", "socius-block-manager"),
    colorSettings: [{
      value: backgroundColor,
      onChange: value => setAttributes({
        backgroundColor: value
      }),
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Background Color (fallback)", "socius-block-manager")
    }, {
      value: textColor,
      onChange: value => setAttributes({
        textColor: value
      }),
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Text Color", "socius-block-manager")
    }]
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "hero-carousel",
    style: {
      backgroundImage: currentImage ? `url(${currentImage.url})` : "none",
      backgroundColor: backgroundColor,
      color: textColor
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "hero-overlay",
    style: {
      backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`
    }
  }, carouselImages.length > 1 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "carousel-nav carousel-prev",
    onClick: prevSlide
  }, "\u2039"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "carousel-nav carousel-next",
    onClick: nextSlide
  }, "\u203A")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "hero-content"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.RichText, {
    tagName: "h1",
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Enter hero title...", "socius-block-manager"),
    value: title,
    onChange: value => setAttributes({
      title: value
    }),
    className: "hero-title"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.RichText, {
    tagName: "p",
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Enter subtitle...", "socius-block-manager"),
    value: subtitle,
    onChange: value => setAttributes({
      subtitle: value
    }),
    className: "hero-subtitle"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_ButtonGroup__WEBPACK_IMPORTED_MODULE_6__.ButtonGroupDisplay, {
    buttons: buttons
  })), carouselImages.length > 0 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "carousel-indicators"
  }, carouselImages.map((_, index) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    key: index,
    className: `carousel-indicator ${index === currentSlide ? "active" : ""}`,
    onClick: () => setCurrentSlide(index)
  }))))));
};
const CarouselSave = ({
  attributes
}) => {
  const {
    title,
    subtitle,
    carouselImages,
    buttons,
    backgroundColor,
    textColor,
    overlayOpacity
  } = attributes;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "hero-carousel",
    style: {
      backgroundColor: backgroundColor,
      color: textColor
    },
    "data-carousel-images": JSON.stringify(carouselImages)
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "hero-overlay",
    style: {
      backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`
    }
  }, carouselImages.length > 1 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "carousel-nav carousel-prev",
    "data-direction": "prev"
  }, "\u2039"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "carousel-nav carousel-next",
    "data-direction": "next"
  }, "\u203A")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "hero-content"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.RichText.Content, {
    tagName: "h1",
    value: title,
    className: "hero-title"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.RichText.Content, {
    tagName: "p",
    value: subtitle,
    className: "hero-subtitle"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_ButtonGroup__WEBPACK_IMPORTED_MODULE_6__.ButtonGroupDisplay, {
    buttons: buttons
  })), carouselImages.length > 0 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "carousel-indicators"
  }, carouselImages.map((_, index) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    key: index,
    className: `carousel-indicator ${index === 0 ? "active" : ""}`,
    "data-slide": index
  })))));
};

/***/ }),

/***/ "./src/blocks/hero/variations/single-image.js":
/*!****************************************************!*\
  !*** ./src/blocks/hero/variations/single-image.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SingleImageEdit: () => (/* binding */ SingleImageEdit),
/* harmony export */   SingleImageSave: () => (/* binding */ SingleImageSave)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_ButtonGroup__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../components/ButtonGroup */ "./src/components/ButtonGroup.js");

// src/blocks/hero/variations/single-image.js




const SingleImageEdit = ({
  attributes,
  setAttributes
}) => {
  const {
    title,
    subtitle,
    imageUrl,
    imageId,
    buttons,
    backgroundColor,
    textColor,
    overlayOpacity
  } = attributes;
  const onSelectImage = media => {
    setAttributes({
      imageUrl: media.url,
      imageId: media.id
    });
  };
  const onRemoveImage = () => {
    setAttributes({
      imageUrl: "",
      imageId: 0
    });
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Background Image", "socius-block-manager"),
    initialOpen: true
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.MediaUploadCheck, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.MediaUpload, {
    onSelect: onSelectImage,
    allowedTypes: ["image"],
    value: imageId,
    render: ({
      open
    }) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, imageUrl ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ResponsiveWrapper, {
      naturalWidth: 400,
      naturalHeight: 300
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: imageUrl,
      alt: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Hero background", "socius-block-manager")
    })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      style: {
        marginTop: "1rem"
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
      isSecondary: true,
      onClick: open
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Replace Image", "socius-block-manager")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
      isDestructive: true,
      onClick: onRemoveImage,
      style: {
        marginLeft: "1rem"
      }
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Remove Image", "socius-block-manager")))) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
      isPrimary: true,
      onClick: open
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Select Background Image", "socius-block-manager")))
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Overlay Opacity", "socius-block-manager"),
    value: overlayOpacity,
    onChange: value => setAttributes({
      overlayOpacity: value
    }),
    min: 0,
    max: 1,
    step: 0.1
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Button Settings", "socius-block-manager"),
    initialOpen: false
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_ButtonGroup__WEBPACK_IMPORTED_MODULE_4__.ButtonGroup, {
    buttons: buttons,
    onChange: newButtons => setAttributes({
      buttons: newButtons
    }),
    maxButtons: 3
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.PanelColorSettings, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Color Settings", "socius-block-manager"),
    colorSettings: [{
      value: backgroundColor,
      onChange: value => setAttributes({
        backgroundColor: value
      }),
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Background Color (fallback)", "socius-block-manager")
    }, {
      value: textColor,
      onChange: value => setAttributes({
        textColor: value
      }),
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Text Color", "socius-block-manager")
    }]
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "hero-single-image",
    style: {
      backgroundImage: imageUrl ? `url(${imageUrl})` : "none",
      backgroundColor: backgroundColor,
      color: textColor
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "hero-overlay",
    style: {
      backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "hero-content"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.RichText, {
    tagName: "h1",
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Enter hero title...", "socius-block-manager"),
    value: title,
    onChange: value => setAttributes({
      title: value
    }),
    className: "hero-title"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.RichText, {
    tagName: "p",
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Enter subtitle...", "socius-block-manager"),
    value: subtitle,
    onChange: value => setAttributes({
      subtitle: value
    }),
    className: "hero-subtitle"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_ButtonGroup__WEBPACK_IMPORTED_MODULE_4__.ButtonGroupDisplay, {
    buttons: buttons
  })))));
};
const SingleImageSave = ({
  attributes
}) => {
  const {
    title,
    subtitle,
    imageUrl,
    buttons,
    backgroundColor,
    textColor,
    overlayOpacity
  } = attributes;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "hero-single-image",
    style: {
      backgroundImage: imageUrl ? `url(${imageUrl})` : "none",
      backgroundColor: backgroundColor,
      color: textColor
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "hero-overlay",
    style: {
      backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "hero-content"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.RichText.Content, {
    tagName: "h1",
    value: title,
    className: "hero-title"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.RichText.Content, {
    tagName: "p",
    value: subtitle,
    className: "hero-subtitle"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_ButtonGroup__WEBPACK_IMPORTED_MODULE_4__.ButtonGroupDisplay, {
    buttons: buttons
  }))));
};

/***/ }),

/***/ "./src/blocks/hero/variations/with-form.js":
/*!*************************************************!*\
  !*** ./src/blocks/hero/variations/with-form.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WithFormEdit: () => (/* binding */ WithFormEdit),
/* harmony export */   WithFormSave: () => (/* binding */ WithFormSave)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_ButtonGroup__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../components/ButtonGroup */ "./src/components/ButtonGroup.js");

// src/blocks/hero/variations/with-form.js




const WithFormEdit = ({
  attributes,
  setAttributes
}) => {
  const {
    title,
    subtitle,
    description,
    imageUrl,
    imageId,
    buttons,
    showForm,
    formShortcode,
    backgroundColor,
    textColor,
    overlayOpacity
  } = attributes;
  const onSelectImage = media => {
    setAttributes({
      imageUrl: media.url,
      imageId: media.id
    });
  };
  const onRemoveImage = () => {
    setAttributes({
      imageUrl: "",
      imageId: 0
    });
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Background Image", "socius-block-manager"),
    initialOpen: true
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.MediaUploadCheck, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.MediaUpload, {
    onSelect: onSelectImage,
    allowedTypes: ["image"],
    value: imageId,
    render: ({
      open
    }) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, imageUrl ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ResponsiveWrapper, {
      naturalWidth: 400,
      naturalHeight: 300
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: imageUrl,
      alt: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Hero background", "socius-block-manager")
    })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      style: {
        marginTop: "1rem"
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
      isSecondary: true,
      onClick: open
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Replace Image", "socius-block-manager")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
      isDestructive: true,
      onClick: onRemoveImage,
      style: {
        marginLeft: "1rem"
      }
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Remove Image", "socius-block-manager")))) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
      isPrimary: true,
      onClick: open
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Select Background Image", "socius-block-manager")))
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.RangeControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Overlay Opacity", "socius-block-manager"),
    value: overlayOpacity,
    onChange: value => setAttributes({
      overlayOpacity: value
    }),
    min: 0,
    max: 1,
    step: 0.1
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Form Settings", "socius-block-manager"),
    initialOpen: true
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Show Form", "socius-block-manager"),
    checked: showForm,
    onChange: value => setAttributes({
      showForm: value
    }),
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Toggle to show/hide the form section", "socius-block-manager")
  }), showForm && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Form Shortcode", "socius-block-manager"),
    value: formShortcode,
    onChange: value => setAttributes({
      formShortcode: value
    }),
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Enter your form shortcode (e.g., [contact-form-7 id="123"])', "socius-block-manager"),
    placeholder: "[contact-form-7 id='123']"
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Button Settings", "socius-block-manager"),
    initialOpen: false
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_ButtonGroup__WEBPACK_IMPORTED_MODULE_4__.ButtonGroup, {
    buttons: buttons,
    onChange: newButtons => setAttributes({
      buttons: newButtons
    }),
    maxButtons: 3
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.PanelColorSettings, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Color Settings", "socius-block-manager"),
    colorSettings: [{
      value: backgroundColor,
      onChange: value => setAttributes({
        backgroundColor: value
      }),
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Background Color (fallback)", "socius-block-manager")
    }, {
      value: textColor,
      onChange: value => setAttributes({
        textColor: value
      }),
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Text Color", "socius-block-manager")
    }]
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "hero-with-form",
    style: {
      backgroundImage: imageUrl ? `url(${imageUrl})` : "none",
      backgroundColor: backgroundColor,
      color: textColor
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "hero-overlay",
    style: {
      backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "hero-content-with-form"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "hero-text-content"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.RichText, {
    tagName: "h1",
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Enter hero title...", "socius-block-manager"),
    value: title,
    onChange: value => setAttributes({
      title: value
    }),
    className: "hero-title"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.RichText, {
    tagName: "p",
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Enter subtitle...", "socius-block-manager"),
    value: subtitle,
    onChange: value => setAttributes({
      subtitle: value
    }),
    className: "hero-subtitle"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.RichText, {
    tagName: "p",
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Enter description text...", "socius-block-manager"),
    value: description,
    onChange: value => setAttributes({
      description: value
    }),
    className: "hero-description"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_ButtonGroup__WEBPACK_IMPORTED_MODULE_4__.ButtonGroupDisplay, {
    buttons: buttons
  })), showForm && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "hero-form-container"
  }, formShortcode ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "hero-form-placeholder"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Form Preview", "socius-block-manager"))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("code", null, formShortcode), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Form will render on frontend", "socius-block-manager"))) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "hero-form-placeholder"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Add form shortcode in sidebar →", "socius-block-manager"))))))));
};
const WithFormSave = ({
  attributes
}) => {
  const {
    title,
    subtitle,
    description,
    imageUrl,
    buttons,
    showForm,
    formShortcode,
    backgroundColor,
    textColor,
    overlayOpacity
  } = attributes;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "hero-with-form",
    style: {
      backgroundImage: imageUrl ? `url(${imageUrl})` : "none",
      backgroundColor: backgroundColor,
      color: textColor
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "hero-overlay",
    style: {
      backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "hero-content-with-form"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "hero-text-content"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.RichText.Content, {
    tagName: "h1",
    value: title,
    className: "hero-title"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.RichText.Content, {
    tagName: "p",
    value: subtitle,
    className: "hero-subtitle"
  }), description && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.RichText.Content, {
    tagName: "p",
    value: description,
    className: "hero-description"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_ButtonGroup__WEBPACK_IMPORTED_MODULE_4__.ButtonGroupDisplay, {
    buttons: buttons
  })), showForm && formShortcode && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "hero-form-container"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    dangerouslySetInnerHTML: {
      __html: `[${formShortcode}]`
    }
  })))));
};

/***/ }),

/***/ "./src/blocks/showcase.js":
/*!********************************!*\
  !*** ./src/blocks/showcase.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _components_ButtonGroup__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/ButtonGroup */ "./src/components/ButtonGroup.js");

// src/blocks/showcase.js





(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.registerBlockType)("socius-pro-blocks/showcase", {
  edit: ({
    attributes,
    setAttributes
  }) => {
    const {
      eyebrow,
      title,
      subtitle,
      content,
      imageUrl,
      imageId,
      buttons,
      horizontalAlign,
      verticalAlign,
      backgroundColor,
      textColor,
      overlayOpacity
    } = attributes;
    const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.useBlockProps)({
      className: `socius-showcase-block align-h-${horizontalAlign} align-v-${verticalAlign}`
    });
    const onSelectImage = media => {
      setAttributes({
        imageUrl: media.url,
        imageId: media.id
      });
    };
    const onRemoveImage = () => {
      setAttributes({
        imageUrl: "",
        imageId: 0
      });
    };
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.InspectorControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelBody, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Background Image", "socius-block-manager"),
      initialOpen: true
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.MediaUploadCheck, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.MediaUpload, {
      onSelect: onSelectImage,
      allowedTypes: ["image"],
      value: imageId,
      render: ({
        open
      }) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, imageUrl ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ResponsiveWrapper, {
        naturalWidth: 400,
        naturalHeight: 300
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
        src: imageUrl,
        alt: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Showcase background", "socius-block-manager")
      })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        style: {
          marginTop: "1rem"
        }
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
        isSecondary: true,
        onClick: open
      }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Replace Image", "socius-block-manager")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
        isDestructive: true,
        onClick: onRemoveImage,
        style: {
          marginLeft: "1rem"
        }
      }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Remove Image", "socius-block-manager")))) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
        isPrimary: true,
        onClick: open
      }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Select Background Image", "socius-block-manager")))
    })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.RangeControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Overlay Opacity", "socius-block-manager"),
      value: overlayOpacity,
      onChange: value => setAttributes({
        overlayOpacity: value
      }),
      min: 0,
      max: 1,
      step: 0.1
    })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelBody, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Layout Settings", "socius-block-manager"),
      initialOpen: true
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.SelectControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Horizontal Alignment", "socius-block-manager"),
      value: horizontalAlign,
      options: [{
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Left", "socius-block-manager"),
        value: "left"
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Center", "socius-block-manager"),
        value: "center"
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Right", "socius-block-manager"),
        value: "right"
      }],
      onChange: value => setAttributes({
        horizontalAlign: value
      }),
      help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Position content horizontally", "socius-block-manager")
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.SelectControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Vertical Alignment", "socius-block-manager"),
      value: verticalAlign,
      options: [{
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Top", "socius-block-manager"),
        value: "top"
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Middle", "socius-block-manager"),
        value: "middle"
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Bottom", "socius-block-manager"),
        value: "bottom"
      }],
      onChange: value => setAttributes({
        verticalAlign: value
      }),
      help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Position content vertically", "socius-block-manager")
    })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelBody, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Button Settings", "socius-block-manager"),
      initialOpen: false
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_ButtonGroup__WEBPACK_IMPORTED_MODULE_5__.ButtonGroup, {
      buttons: buttons,
      onChange: newButtons => setAttributes({
        buttons: newButtons
      }),
      maxButtons: 3
    })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.PanelColorSettings, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Color Settings", "socius-block-manager"),
      colorSettings: [{
        value: backgroundColor,
        onChange: value => setAttributes({
          backgroundColor: value
        }),
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Background Color (fallback)", "socius-block-manager")
      }, {
        value: textColor,
        onChange: value => setAttributes({
          textColor: value
        }),
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Text Color", "socius-block-manager")
      }]
    })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      ...blockProps
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "showcase-background",
      style: {
        backgroundImage: imageUrl ? `url(${imageUrl})` : "none",
        backgroundColor: backgroundColor
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "showcase-overlay",
      style: {
        backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "showcase-content-wrapper"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "showcase-content",
      style: {
        color: textColor
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.RichText, {
      tagName: "div",
      placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Enter eyebrow text...", "socius-block-manager"),
      value: eyebrow,
      onChange: value => setAttributes({
        eyebrow: value
      }),
      className: "showcase-eyebrow"
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.RichText, {
      tagName: "h2",
      placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Enter showcase title...", "socius-block-manager"),
      value: title,
      onChange: value => setAttributes({
        title: value
      }),
      className: "showcase-title"
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.RichText, {
      tagName: "h3",
      placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Enter subtitle...", "socius-block-manager"),
      value: subtitle,
      onChange: value => setAttributes({
        subtitle: value
      }),
      className: "showcase-subtitle"
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.RichText, {
      tagName: "div",
      placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Enter showcase content...", "socius-block-manager"),
      value: content,
      onChange: value => setAttributes({
        content: value
      }),
      className: "showcase-text",
      multiline: "p"
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_ButtonGroup__WEBPACK_IMPORTED_MODULE_5__.ButtonGroupDisplay, {
      buttons: buttons,
      className: "showcase-button-group"
    })))))));
  },
  save: ({
    attributes
  }) => {
    const {
      eyebrow,
      title,
      subtitle,
      content,
      imageUrl,
      buttons,
      horizontalAlign,
      verticalAlign,
      backgroundColor,
      textColor,
      overlayOpacity
    } = attributes;
    const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.useBlockProps.save({
      className: `socius-showcase-block align-h-${horizontalAlign} align-v-${verticalAlign}`
    });
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      ...blockProps
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "showcase-background",
      style: {
        backgroundImage: imageUrl ? `url(${imageUrl})` : "none",
        backgroundColor: backgroundColor
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "showcase-overlay",
      style: {
        backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "showcase-content-wrapper"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "showcase-content",
      style: {
        color: textColor
      }
    }, eyebrow && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.RichText.Content, {
      tagName: "div",
      value: eyebrow,
      className: "showcase-eyebrow"
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.RichText.Content, {
      tagName: "h2",
      value: title,
      className: "showcase-title"
    }), subtitle && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.RichText.Content, {
      tagName: "h3",
      value: subtitle,
      className: "showcase-subtitle"
    }), content && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.RichText.Content, {
      tagName: "div",
      value: content,
      className: "showcase-text"
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_ButtonGroup__WEBPACK_IMPORTED_MODULE_5__.ButtonGroupDisplay, {
      buttons: buttons,
      className: "showcase-button-group"
    }))))));
  }
});

/***/ }),

/***/ "./src/blocks/testimonial.js":
/*!***********************************!*\
  !*** ./src/blocks/testimonial.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__);





(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.registerBlockType)("socius-pro-blocks/testimonial", {
  edit: ({
    attributes,
    setAttributes
  }) => {
    const {
      quote,
      authorName,
      authorRole,
      imageUrl,
      imageId
    } = attributes;
    const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.useBlockProps)({
      className: "socius-testimonial-block"
    });
    const onSelectImage = media => {
      setAttributes({
        imageUrl: media.url,
        imageId: media.id
      });
    };
    const onRemoveImage = () => {
      setAttributes({
        imageUrl: "",
        imageId: 0
      });
    };
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.InspectorControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelBody, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Author Image", "socius-block-manager"),
      initialOpen: true
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.MediaUploadCheck, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.MediaUpload, {
      onSelect: onSelectImage,
      allowedTypes: ["image"],
      value: imageId,
      render: ({
        open
      }) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, imageUrl ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ResponsiveWrapper, {
        naturalWidth: 150,
        naturalHeight: 150
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
        src: imageUrl,
        alt: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Author", "socius-block-manager")
      })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        style: {
          marginTop: "1rem"
        }
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
        isSecondary: true,
        onClick: open
      }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Replace Image", "socius-block-manager")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
        isDestructive: true,
        onClick: onRemoveImage,
        style: {
          marginLeft: "1rem"
        }
      }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Remove Image", "socius-block-manager")))) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
        isPrimary: true,
        onClick: open
      }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Select Image", "socius-block-manager")))
    })))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      ...blockProps
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "testimonial-content"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "testimonial-quote-icon"
    }, "\""), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.RichText, {
      tagName: "blockquote",
      placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Enter testimonial quote...", "socius-block-manager"),
      value: quote,
      onChange: value => setAttributes({
        quote: value
      }),
      className: "testimonial-quote"
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "testimonial-author"
    }, imageUrl && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "testimonial-author-image"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: imageUrl,
      alt: authorName
    })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "testimonial-author-info"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.RichText, {
      tagName: "div",
      placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Author name...", "socius-block-manager"),
      value: authorName,
      onChange: value => setAttributes({
        authorName: value
      }),
      className: "testimonial-author-name"
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.RichText, {
      tagName: "div",
      placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("Author role...", "socius-block-manager"),
      value: authorRole,
      onChange: value => setAttributes({
        authorRole: value
      }),
      className: "testimonial-author-role"
    }))))));
  },
  save: ({
    attributes
  }) => {
    const {
      quote,
      authorName,
      authorRole,
      imageUrl
    } = attributes;
    const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.useBlockProps.save({
      className: "socius-testimonial-block"
    });
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      ...blockProps
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "testimonial-content"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "testimonial-quote-icon"
    }, "\""), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.RichText.Content, {
      tagName: "blockquote",
      value: quote,
      className: "testimonial-quote"
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "testimonial-author"
    }, imageUrl && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "testimonial-author-image"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: imageUrl,
      alt: authorName
    })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "testimonial-author-info"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.RichText.Content, {
      tagName: "div",
      value: authorName,
      className: "testimonial-author-name"
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.RichText.Content, {
      tagName: "div",
      value: authorRole,
      className: "testimonial-author-role"
    })))));
  }
});

/***/ }),

/***/ "./src/components/ButtonGroup.js":
/*!***************************************!*\
  !*** ./src/components/ButtonGroup.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ButtonGroup: () => (/* binding */ ButtonGroup),
/* harmony export */   ButtonGroupDisplay: () => (/* binding */ ButtonGroupDisplay)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/plus.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/trash.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_5__);





const ButtonGroup = ({
  buttons,
  onChange,
  maxButtons = 3
}) => {
  const [pages, setPages] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useState)([]);
  const [posts, setPosts] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useState)([]);
  const [loading, setLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useState)(true);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useEffect)(() => {
    fetchPagesAndPosts();
  }, []);
  const fetchPagesAndPosts = async () => {
    try {
      const pagesResponse = await fetch("/wp-json/wp/v2/pages?per_page=100&orderby=title&order=asc");
      const pagesData = await pagesResponse.json();
      setPages(pagesData.map(page => ({
        label: page.title.rendered,
        value: page.link
      })));
      const postsResponse = await fetch("/wp-json/wp/v2/posts?per_page=100&orderby=date&order=desc");
      const postsData = await postsResponse.json();
      setPosts(postsData.map(post => ({
        label: post.title.rendered,
        value: post.link
      })));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching pages/posts:", error);
      setLoading(false);
    }
  };
  const addButton = () => {
    if (buttons.length < maxButtons) {
      onChange([...buttons, {
        text: "New Button",
        linkType: "external",
        url: "",
        style: "primary",
        openInNewWindow: false
      }]);
    }
  };
  const updateButton = (index, field, value) => {
    const newButtons = [...buttons];
    newButtons[index][field] = value;
    if (field === "linkType") {
      newButtons[index].url = "";
    }
    onChange(newButtons);
  };
  const removeButton = index => {
    const newButtons = buttons.filter((_, i) => i !== index);
    onChange(newButtons.length > 0 ? newButtons : [{
      text: "Button",
      linkType: "external",
      url: "",
      style: "primary",
      openInNewWindow: false
    }]);
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "button-group-editor"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "10px"
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Buttons", "socius-block-manager")), buttons.length < maxButtons && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_3__["default"],
    isSmall: true,
    onClick: addButton
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Add Button", "socius-block-manager"))), buttons.map((button, index) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: index,
    style: {
      marginBottom: "15px",
      padding: "15px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      background: "#f9f9f9"
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "10px"
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Button", "socius-block-manager"), " ", index + 1), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_4__["default"],
    isDestructive: true,
    isSmall: true,
    onClick: () => removeButton(index),
    disabled: buttons.length === 1
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Button Text", "socius-block-manager"),
    value: button.text,
    onChange: value => updateButton(index, "text", value)
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Link Type", "socius-block-manager"),
    value: button.linkType || "external",
    options: [{
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("External URL", "socius-block-manager"),
      value: "external"
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Internal Page", "socius-block-manager"),
      value: "page"
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Internal Post", "socius-block-manager"),
      value: "post"
    }],
    onChange: value => updateButton(index, "linkType", value)
  }), button.linkType === "external" && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("External URL", "socius-block-manager"),
    value: button.url,
    onChange: value => updateButton(index, "url", value),
    placeholder: "https://example.com",
    help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Enter the full URL including https://", "socius-block-manager")
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.CheckboxControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Open in new window", "socius-block-manager"),
    checked: button.openInNewWindow || false,
    onChange: value => updateButton(index, "openInNewWindow", value)
  })), button.linkType === "page" && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Select Page", "socius-block-manager"),
    value: button.url,
    options: [{
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("-- Select a Page --", "socius-block-manager"),
      value: ""
    }, ...pages],
    onChange: value => updateButton(index, "url", value),
    disabled: loading
  }), button.linkType === "post" && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Select Post", "socius-block-manager"),
    value: button.url,
    options: [{
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("-- Select a Post --", "socius-block-manager"),
      value: ""
    }, ...posts],
    onChange: value => updateButton(index, "url", value),
    disabled: loading
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Button Style", "socius-block-manager"),
    value: button.style,
    options: [{
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Primary", "socius-block-manager"),
      value: "primary"
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Secondary", "socius-block-manager"),
      value: "secondary"
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Outline", "socius-block-manager"),
      value: "outline"
    }],
    onChange: value => updateButton(index, "style", value)
  }))));
};
const ButtonGroupDisplay = ({
  buttons,
  className = "hero-button-group"
}) => {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: className
  }, buttons.map((button, index) => {
    const target = button.linkType === "external" && button.openInNewWindow ? "_blank" : "_self";
    const rel = button.linkType === "external" && button.openInNewWindow ? "noopener noreferrer" : undefined;
    if (button.url) {
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
        key: index,
        href: button.url,
        className: `hero-button hero-button-${button.style}`,
        target: target,
        rel: rel
      }, button.text);
    } else {
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
        key: index,
        className: `hero-button hero-button-${button.style}`
      }, button.text);
    }
  }));
};

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "@wordpress/primitives":
/*!************************************!*\
  !*** external ["wp","primitives"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["primitives"];

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

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
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!***********************!*\
  !*** ./src/blocks.js ***!
  \***********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _blocks_call_to_action__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./blocks/call-to-action */ "./src/blocks/call-to-action.js");
/* harmony import */ var _blocks_testimonial__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./blocks/testimonial */ "./src/blocks/testimonial.js");
/* harmony import */ var _blocks_feature_box__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./blocks/feature-box */ "./src/blocks/feature-box.js");
/* harmony import */ var _blocks_hero__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./blocks/hero */ "./src/blocks/hero/index.js");
/* harmony import */ var _blocks_showcase__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./blocks/showcase */ "./src/blocks/showcase.js");
// Import all block registrations





})();

/******/ })()
;
//# sourceMappingURL=blocks.js.map