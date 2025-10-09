import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import {
  InspectorControls,
  RichText,
  URLInput,
  useBlockProps,
  PanelColorSettings,
} from "@wordpress/block-editor";
import { PanelBody, TextControl } from "@wordpress/components";

registerBlockType("socius-pro-blocks/call-to-action", {
  edit: ({ attributes, setAttributes }) => {
    const { heading, text, buttonText, buttonUrl, backgroundColor, textColor } =
      attributes;

    const blockProps = useBlockProps({
      className: "socius-cta-block",
      style: {
        backgroundColor: backgroundColor,
        color: textColor,
      },
    });

    return (
      <>
        <InspectorControls>
          <PanelBody
            title={__("CTA Settings", "socius-block-manager")}
            initialOpen={true}
          >
            <TextControl
              label={__("Button Text", "socius-block-manager")}
              value={buttonText}
              onChange={(value) => setAttributes({ buttonText: value })}
            />

            <div style={{ marginBottom: "15px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "600",
                }}
              >
                {__("Button URL", "socius-block-manager")}
              </label>
              <URLInput
                value={buttonUrl}
                onChange={(value) => setAttributes({ buttonUrl: value })}
              />
            </div>
          </PanelBody>

          <PanelColorSettings
            title={__("Color Settings", "socius-block-manager")}
            colorSettings={[
              {
                value: backgroundColor,
                onChange: (value) => setAttributes({ backgroundColor: value }),
                label: __("Background Color", "socius-block-manager"),
              },
              {
                value: textColor,
                onChange: (value) => setAttributes({ textColor: value }),
                label: __("Text Color", "socius-block-manager"),
              },
            ]}
          />
        </InspectorControls>

        <div {...blockProps}>
          <div className="socius-cta-content">
            <RichText
              tagName="h2"
              placeholder={__("Enter heading...", "socius-block-manager")}
              value={heading}
              onChange={(value) => setAttributes({ heading: value })}
              className="socius-cta-heading"
            />

            <RichText
              tagName="p"
              placeholder={__("Enter description...", "socius-block-manager")}
              value={text}
              onChange={(value) => setAttributes({ text: value })}
              className="socius-cta-text"
            />

            <div className="socius-cta-button-wrapper">
              <span className="socius-cta-button">
                {buttonText || __("Button Text", "socius-block-manager")}
              </span>
            </div>
          </div>
        </div>
      </>
    );
  },

  save: ({ attributes }) => {
    const { heading, text, buttonText, buttonUrl, backgroundColor, textColor } =
      attributes;

    const blockProps = useBlockProps.save({
      className: "socius-cta-block",
      style: {
        backgroundColor: backgroundColor,
        color: textColor,
      },
    });

    return (
      <div {...blockProps}>
        <div className="socius-cta-content">
          <RichText.Content
            tagName="h2"
            value={heading}
            className="socius-cta-heading"
          />
          <RichText.Content
            tagName="p"
            value={text}
            className="socius-cta-text"
          />
          <div className="socius-cta-button-wrapper">
            {buttonUrl ? (
              <a href={buttonUrl} className="socius-cta-button">
                {buttonText}
              </a>
            ) : (
              <span className="socius-cta-button">{buttonText}</span>
            )}
          </div>
        </div>
      </div>
    );
  },
});
