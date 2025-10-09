import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import { useBlockProps, InspectorControls } from "@wordpress/block-editor";
import {
  Placeholder,
  Button,
  SelectControl,
  PanelBody,
} from "@wordpress/components";
import { useState, useEffect } from "@wordpress/element";

// Import variation components
import { SingleImageEdit, SingleImageSave } from "./variations/single-image";
import { CarouselEdit, CarouselSave } from "./variations/carousel";
import { WithFormEdit, WithFormSave } from "./variations/with-form";

// Get allowed variations based on restrictions
const getAllowedVariations = (blockName) => {
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

  const allowedVariations = allVariations.filter((varName) => {
    if (!variationRestrictions[varName]) {
      return true;
    }
    return variationRestrictions[varName].allowed !== false;
  });

  return allowedVariations;
};

registerBlockType("socius-pro-blocks/hero", {
  edit: ({ attributes, setAttributes }) => {
    const { variation } = attributes;
    const [showVariationPicker, setShowVariationPicker] = useState(!variation);
    const [allowedVariations, setAllowedVariations] = useState(null);

    const blockProps = useBlockProps({
      className: `socius-hero-block hero-${variation || "unset"}`,
    });

    useEffect(() => {
      const allowed = getAllowedVariations("socius-pro-blocks/hero");
      setAllowedVariations(allowed);

      // If current variation is not allowed, show picker
      if (
        allowed &&
        allowed.length > 0 &&
        variation &&
        !allowed.includes(variation)
      ) {
        setAttributes({ variation: "" });
        setShowVariationPicker(true);
      }

      // If no variation is set and we have allowed variations, show picker
      if (!variation && allowed && allowed.length > 0) {
        setShowVariationPicker(true);
      }
    }, []);

    const selectVariation = (selectedVariation) => {
      setAttributes({ variation: selectedVariation });
      setShowVariationPicker(false);
    };

    const allVariationOptions = [
      {
        name: "single-image",
        title: __("Single Image Hero", "socius-block-manager"),
        description: __(
          "Hero with single background image, title, subtitle, and buttons",
          "socius-block-manager"
        ),
        icon: "🖼️",
      },
      {
        name: "carousel",
        title: __("Carousel Hero", "socius-block-manager"),
        description: __(
          "Hero with image carousel, title, subtitle, and buttons",
          "socius-block-manager"
        ),
        icon: "🎠",
      },
      {
        name: "with-form",
        title: __("Hero with Form", "socius-block-manager"),
        description: __(
          "Hero with image, content, and optional form shortcode",
          "socius-block-manager"
        ),
        icon: "📝",
      },
    ];

    const variationOptions = allowedVariations
      ? allVariationOptions.filter((opt) =>
          allowedVariations.includes(opt.name)
        )
      : allVariationOptions;

    // If no variations are allowed
    if (allowedVariations && allowedVariations.length === 0) {
      return (
        <div {...blockProps}>
          <Placeholder
            icon="format-image"
            label={__("Hero Section", "socius-block-manager")}
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

    // Show variation picker
    if (showVariationPicker || !variation) {
      return (
        <div {...blockProps}>
          <Placeholder
            icon="format-image"
            label={__("Hero Section", "socius-block-manager")}
            instructions={__(
              "Choose a hero layout to get started",
              "socius-block-manager"
            )}
          >
            <div
              style={{
                display: "grid",
                gap: "1rem",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                width: "100%",
                maxWidth: "800px",
              }}
            >
              {variationOptions.map((option) => (
                <Button
                  key={option.name}
                  isSecondary={true}
                  onClick={() => selectVariation(option.name)}
                  style={{
                    height: "auto",
                    padding: "1.5rem",
                    textAlign: "center",
                    flexDirection: "column",
                    display: "flex",
                    gap: "0.5rem",
                  }}
                >
                  <div style={{ fontSize: "3rem" }}>{option.icon}</div>
                  <div style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                    {option.title}
                  </div>
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

    // Get filtered select options for inspector
    const selectOptions = allowedVariations
      ? allVariationOptions
          .filter((opt) => allowedVariations.includes(opt.name))
          .map((opt) => ({ label: opt.title, value: opt.name }))
      : allVariationOptions.map((opt) => ({
          label: opt.title,
          value: opt.name,
        }));

    // Render the appropriate variation with inspector controls to change it
    return (
      <div {...blockProps}>
        <InspectorControls>
          <PanelBody
            title={__("Hero Variation", "socius-block-manager")}
            initialOpen={true}
          >
            <SelectControl
              label={__("Select Variation", "socius-block-manager")}
              value={variation}
              options={selectOptions}
              onChange={(value) => setAttributes({ variation: value })}
              help={__("Choose the hero layout style", "socius-block-manager")}
            />

            {selectOptions.length > 1 && (
              <Button
                isSecondary
                onClick={() => setShowVariationPicker(true)}
                style={{ marginTop: "1rem", width: "100%" }}
              >
                {__("Change Layout Variation", "socius-block-manager")}
              </Button>
            )}
          </PanelBody>
        </InspectorControls>

        {variation === "single-image" && (
          <SingleImageEdit
            attributes={attributes}
            setAttributes={setAttributes}
          />
        )}
        {variation === "carousel" && (
          <CarouselEdit attributes={attributes} setAttributes={setAttributes} />
        )}
        {variation === "with-form" && (
          <WithFormEdit attributes={attributes} setAttributes={setAttributes} />
        )}
      </div>
    );
  },

  save: ({ attributes }) => {
    const { variation } = attributes;

    const blockProps = useBlockProps.save({
      className: `socius-hero-block hero-${variation}`,
    });

    return (
      <div {...blockProps}>
        {variation === "single-image" && (
          <SingleImageSave attributes={attributes} />
        )}
        {variation === "carousel" && <CarouselSave attributes={attributes} />}
        {variation === "with-form" && <WithFormSave attributes={attributes} />}
      </div>
    );
  },
});
