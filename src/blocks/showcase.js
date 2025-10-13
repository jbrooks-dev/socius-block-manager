// src/blocks/showcase.js
import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import {
  InspectorControls,
  RichText,
  MediaUpload,
  MediaUploadCheck,
  PanelColorSettings,
  useBlockProps,
} from "@wordpress/block-editor";
import {
  PanelBody,
  Button,
  SelectControl,
  RangeControl,
  ResponsiveWrapper,
} from "@wordpress/components";
import { ButtonGroup, ButtonGroupDisplay } from "../components/ButtonGroup";

registerBlockType("socius-pro-blocks/showcase", {
  edit: ({ attributes, setAttributes }) => {
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
      overlayOpacity,
    } = attributes;

    const blockProps = useBlockProps({
      className: `socius-showcase-block align-h-${horizontalAlign} align-v-${verticalAlign}`,
    });

    const onSelectImage = (media) => {
      setAttributes({
        imageUrl: media.url,
        imageId: media.id,
      });
    };

    const onRemoveImage = () => {
      setAttributes({
        imageUrl: "",
        imageId: 0,
      });
    };

    return (
      <>
        <InspectorControls>
          <PanelBody
            title={__("Background Image", "socius-block-manager")}
            initialOpen={true}
          >
            <MediaUploadCheck>
              <MediaUpload
                onSelect={onSelectImage}
                allowedTypes={["image"]}
                value={imageId}
                render={({ open }) => (
                  <div>
                    {imageUrl ? (
                      <div>
                        <ResponsiveWrapper
                          naturalWidth={400}
                          naturalHeight={300}
                        >
                          <img
                            src={imageUrl}
                            alt={__(
                              "Showcase background",
                              "socius-block-manager"
                            )}
                          />
                        </ResponsiveWrapper>
                        <div style={{ marginTop: "1rem" }}>
                          <Button isSecondary onClick={open}>
                            {__("Replace Image", "socius-block-manager")}
                          </Button>
                          <Button
                            isDestructive
                            onClick={onRemoveImage}
                            style={{ marginLeft: "1rem" }}
                          >
                            {__("Remove Image", "socius-block-manager")}
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button isPrimary onClick={open}>
                        {__("Select Background Image", "socius-block-manager")}
                      </Button>
                    )}
                  </div>
                )}
              />
            </MediaUploadCheck>

            <RangeControl
              label={__("Overlay Opacity", "socius-block-manager")}
              value={overlayOpacity}
              onChange={(value) => setAttributes({ overlayOpacity: value })}
              min={0}
              max={1}
              step={0.1}
            />
          </PanelBody>

          <PanelBody
            title={__("Layout Settings", "socius-block-manager")}
            initialOpen={true}
          >
            <SelectControl
              label={__("Horizontal Alignment", "socius-block-manager")}
              value={horizontalAlign}
              options={[
                {
                  label: __("Left", "socius-block-manager"),
                  value: "left",
                },
                {
                  label: __("Center", "socius-block-manager"),
                  value: "center",
                },
                {
                  label: __("Right", "socius-block-manager"),
                  value: "right",
                },
              ]}
              onChange={(value) => setAttributes({ horizontalAlign: value })}
              help={__("Position content horizontally", "socius-block-manager")}
            />

            <SelectControl
              label={__("Vertical Alignment", "socius-block-manager")}
              value={verticalAlign}
              options={[
                {
                  label: __("Top", "socius-block-manager"),
                  value: "top",
                },
                {
                  label: __("Middle", "socius-block-manager"),
                  value: "middle",
                },
                {
                  label: __("Bottom", "socius-block-manager"),
                  value: "bottom",
                },
              ]}
              onChange={(value) => setAttributes({ verticalAlign: value })}
              help={__("Position content vertically", "socius-block-manager")}
            />
          </PanelBody>

          <PanelBody
            title={__("Button Settings", "socius-block-manager")}
            initialOpen={false}
          >
            <ButtonGroup
              buttons={buttons}
              onChange={(newButtons) => setAttributes({ buttons: newButtons })}
              maxButtons={3}
            />
          </PanelBody>

          <PanelColorSettings
            title={__("Color Settings", "socius-block-manager")}
            colorSettings={[
              {
                value: backgroundColor,
                onChange: (value) => setAttributes({ backgroundColor: value }),
                label: __(
                  "Background Color (fallback)",
                  "socius-block-manager"
                ),
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
          <div
            className="showcase-background"
            style={{
              backgroundImage: imageUrl ? `url(${imageUrl})` : "none",
              backgroundColor: backgroundColor,
            }}
          >
            <div
              className="showcase-overlay"
              style={{ backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})` }}
            >
              <div className="showcase-content-wrapper">
                <div className="showcase-content" style={{ color: textColor }}>
                  <RichText
                    tagName="div"
                    placeholder={__(
                      "Enter eyebrow text...",
                      "socius-block-manager"
                    )}
                    value={eyebrow}
                    onChange={(value) => setAttributes({ eyebrow: value })}
                    className="showcase-eyebrow"
                  />

                  <RichText
                    tagName="h2"
                    placeholder={__(
                      "Enter showcase title...",
                      "socius-block-manager"
                    )}
                    value={title}
                    onChange={(value) => setAttributes({ title: value })}
                    className="showcase-title"
                  />

                  <RichText
                    tagName="h3"
                    placeholder={__(
                      "Enter subtitle...",
                      "socius-block-manager"
                    )}
                    value={subtitle}
                    onChange={(value) => setAttributes({ subtitle: value })}
                    className="showcase-subtitle"
                  />

                  <RichText
                    tagName="div"
                    placeholder={__(
                      "Enter showcase content...",
                      "socius-block-manager"
                    )}
                    value={content}
                    onChange={(value) => setAttributes({ content: value })}
                    className="showcase-text"
                    multiline="p"
                  />

                  <ButtonGroupDisplay
                    buttons={buttons}
                    className="showcase-button-group"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  },

  save: ({ attributes }) => {
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
      overlayOpacity,
    } = attributes;

    const blockProps = useBlockProps.save({
      className: `socius-showcase-block align-h-${horizontalAlign} align-v-${verticalAlign}`,
    });

    return (
      <div {...blockProps}>
        <div
          className="showcase-background"
          style={{
            backgroundImage: imageUrl ? `url(${imageUrl})` : "none",
            backgroundColor: backgroundColor,
          }}
        >
          <div
            className="showcase-overlay"
            style={{ backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})` }}
          >
            <div className="showcase-content-wrapper">
              <div className="showcase-content" style={{ color: textColor }}>
                {eyebrow && (
                  <RichText.Content
                    tagName="div"
                    value={eyebrow}
                    className="showcase-eyebrow"
                  />
                )}

                <RichText.Content
                  tagName="h2"
                  value={title}
                  className="showcase-title"
                />

                {subtitle && (
                  <RichText.Content
                    tagName="h3"
                    value={subtitle}
                    className="showcase-subtitle"
                  />
                )}

                {content && (
                  <RichText.Content
                    tagName="div"
                    value={content}
                    className="showcase-text"
                  />
                )}

                <ButtonGroupDisplay
                  buttons={buttons}
                  className="showcase-button-group"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
});
