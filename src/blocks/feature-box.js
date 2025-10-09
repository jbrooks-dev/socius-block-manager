import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import {
  InspectorControls,
  RichText,
  useBlockProps,
  PanelColorSettings,
} from "@wordpress/block-editor";
import {
  PanelBody,
  SelectControl,
  Button,
  Placeholder,
} from "@wordpress/components";
import { useState, useEffect } from "@wordpress/element";

// Common WordPress Dashicons
const iconOptions = [
  { label: __("Star", "socius-block-manager"), value: "star-filled" },
  { label: __("Heart", "socius-block-manager"), value: "heart" },
  { label: __("Lightbulb", "socius-block-manager"), value: "lightbulb" },
  { label: __("Chart", "socius-block-manager"), value: "chart-line" },
  { label: __("Shield", "socius-block-manager"), value: "shield" },
  { label: __("Award", "socius-block-manager"), value: "awards" },
  { label: __("Rocket", "socius-block-manager"), value: "performance" },
  { label: __("Megaphone", "socius-block-manager"), value: "megaphone" },
  { label: __("Thumbs Up", "socius-block-manager"), value: "thumbs-up" },
  { label: __("Clock", "socius-block-manager"), value: "clock" },
  { label: __("Location", "socius-block-manager"), value: "location" },
  { label: __("Cart", "socius-block-manager"), value: "cart" },
];

// Get allowed variations based on restrictions
const getAllowedVariations = (blockName) => {
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
  const allowedVariations = allVariations.filter((varName) => {
    if (!variationRestrictions[varName]) {
      return true; // No restriction means allowed
    }
    return variationRestrictions[varName].allowed !== false;
  });

  return allowedVariations;
};

registerBlockType("socius-pro-blocks/feature-box", {
  edit: ({ attributes, setAttributes }) => {
    const { title, description, icon, variation, iconColor, backgroundColor } =
      attributes;
    const [showVariationPicker, setShowVariationPicker] = useState(
      !variation || variation === ""
    );
    const [allowedVariations, setAllowedVariations] = useState(null);

    const blockProps = useBlockProps({
      className: `socius-feature-box feature-${variation}`,
      style: {
        backgroundColor: backgroundColor,
      },
    });

    // Get allowed variations on mount
    useEffect(() => {
      const allowed = getAllowedVariations("socius-pro-blocks/feature-box");
      setAllowedVariations(allowed);

      // If current variation is not allowed, reset to first allowed or show picker
      if (
        allowed &&
        allowed.length > 0 &&
        variation &&
        !allowed.includes(variation)
      ) {
        setAttributes({ variation: allowed[0] });
      }
    }, []);

    const selectVariation = (selectedVariation) => {
      setAttributes({ variation: selectedVariation });
      setShowVariationPicker(false);
    };

    const allVariationOptions = [
      {
        name: "icon-top",
        title: __("Icon Top", "socius-block-manager"),
        description: __(
          "Icon positioned above the content",
          "socius-block-manager"
        ),
        icon: "⬆️",
      },
      {
        name: "icon-left",
        title: __("Icon Left", "socius-block-manager"),
        description: __(
          "Icon positioned to the left of content",
          "socius-block-manager"
        ),
        icon: "⬅️",
      },
      {
        name: "icon-right",
        title: __("Icon Right", "socius-block-manager"),
        description: __(
          "Icon positioned to the right of content",
          "socius-block-manager"
        ),
        icon: "➡️",
      },
    ];

    // Filter variation options based on restrictions
    const variationOptions = allowedVariations
      ? allVariationOptions.filter((opt) =>
          allowedVariations.includes(opt.name)
        )
      : allVariationOptions;

    // If no variations are allowed, show error
    if (allowedVariations && allowedVariations.length === 0) {
      return (
        <div {...blockProps}>
          <Placeholder
            icon="star-filled"
            label={__("Feature Box", "socius-block-manager")}
          >
            <p>
              {__(
                "No variations are available for this block. Contact your administrator.",
                "socius-block-manager"
              )}
            </p>
          </Placeholder>
        </div>
      );
    }

    // Show variation picker if no variation is selected
    if (showVariationPicker) {
      return (
        <div {...blockProps}>
          <Placeholder
            icon="star-filled"
            label={__("Feature Box", "socius-block-manager")}
            instructions={__(
              "Choose a layout variation to get started",
              "socius-block-manager"
            )}
          >
            <div
              style={{
                display: "grid",
                gap: "1rem",
                gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                width: "100%",
              }}
            >
              {variationOptions.map((option) => (
                <Button
                  key={option.name}
                  isSecondary={true}
                  onClick={() => selectVariation(option.name)}
                  style={{
                    height: "auto",
                    padding: "1rem",
                    textAlign: "center",
                    flexDirection: "column",
                    display: "flex",
                    gap: "0.5rem",
                  }}
                >
                  <div style={{ fontSize: "2rem" }}>{option.icon}</div>
                  <div style={{ fontWeight: "bold" }}>{option.title}</div>
                  <div style={{ fontSize: "0.9rem", opacity: 0.7 }}>
                    {option.description}
                  </div>
                </Button>
              ))}
            </div>

            {variationOptions.length > 0 && (
              <div style={{ marginTop: "1rem" }}>
                <Button
                  isLink
                  onClick={() => selectVariation(variationOptions[0].name)}
                >
                  {__("Skip and use default", "socius-block-manager")} (
                  {variationOptions[0].title})
                </Button>
              </div>
            )}
          </Placeholder>
        </div>
      );
    }

    // Filter select options based on allowed variations
    const selectOptions = allowedVariations
      ? [
          { label: __("Icon Top", "socius-block-manager"), value: "icon-top" },
          {
            label: __("Icon Left", "socius-block-manager"),
            value: "icon-left",
          },
          {
            label: __("Icon Right", "socius-block-manager"),
            value: "icon-right",
          },
        ].filter((opt) => allowedVariations.includes(opt.value))
      : [
          { label: __("Icon Top", "socius-block-manager"), value: "icon-top" },
          {
            label: __("Icon Left", "socius-block-manager"),
            value: "icon-left",
          },
          {
            label: __("Icon Right", "socius-block-manager"),
            value: "icon-right",
          },
        ];

    return (
      <>
        <InspectorControls>
          <PanelBody
            title={__("Layout Settings", "socius-block-manager")}
            initialOpen={true}
          >
            <SelectControl
              label={__("Variation", "socius-block-manager")}
              value={variation}
              options={selectOptions}
              onChange={(value) => setAttributes({ variation: value })}
              help={__("Choose the icon position", "socius-block-manager")}
            />

            {selectOptions.length > 1 && (
              <Button
                isSecondary
                onClick={() => setShowVariationPicker(true)}
                style={{ marginTop: "1rem" }}
              >
                {__("Change Layout Variation", "socius-block-manager")}
              </Button>
            )}
          </PanelBody>

          <PanelBody
            title={__("Icon Settings", "socius-block-manager")}
            initialOpen={false}
          >
            <SelectControl
              label={__("Icon", "socius-block-manager")}
              value={icon}
              options={iconOptions}
              onChange={(value) => setAttributes({ icon: value })}
            />
          </PanelBody>

          <PanelColorSettings
            title={__("Color Settings", "socius-block-manager")}
            colorSettings={[
              {
                value: iconColor,
                onChange: (value) => setAttributes({ iconColor: value }),
                label: __("Icon Color", "socius-block-manager"),
              },
              {
                value: backgroundColor,
                onChange: (value) => setAttributes({ backgroundColor: value }),
                label: __("Background Color", "socius-block-manager"),
              },
            ]}
          />
        </InspectorControls>

        <div {...blockProps}>
          <div className={`feature-box-content feature-${variation}`}>
            <div className="feature-icon" style={{ color: iconColor }}>
              <span className={`dashicons dashicons-${icon}`}></span>
            </div>

            <div className="feature-text">
              <RichText
                tagName="h3"
                placeholder={__("Enter title...", "socius-block-manager")}
                value={title}
                onChange={(value) => setAttributes({ title: value })}
                className="feature-title"
              />

              <RichText
                tagName="p"
                placeholder={__("Enter description...", "socius-block-manager")}
                value={description}
                onChange={(value) => setAttributes({ description: value })}
                className="feature-description"
              />
            </div>
          </div>
        </div>
      </>
    );
  },

  save: ({ attributes }) => {
    const { title, description, icon, variation, iconColor, backgroundColor } =
      attributes;

    const blockProps = useBlockProps.save({
      className: `socius-feature-box feature-${variation}`,
      style: {
        backgroundColor: backgroundColor,
      },
    });

    return (
      <div {...blockProps}>
        <div className={`feature-box-content feature-${variation}`}>
          <div className="feature-icon" style={{ color: iconColor }}>
            <span className={`dashicons dashicons-${icon}`}></span>
          </div>

          <div className="feature-text">
            <RichText.Content
              tagName="h3"
              value={title}
              className="feature-title"
            />
            <RichText.Content
              tagName="p"
              value={description}
              className="feature-description"
            />
          </div>
        </div>
      </div>
    );
  },
});
