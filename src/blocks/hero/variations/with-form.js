import { __ } from "@wordpress/i18n";
import {
  InspectorControls,
  RichText,
  MediaUpload,
  MediaUploadCheck,
  PanelColorSettings,
} from "@wordpress/block-editor";
import {
  PanelBody,
  Button,
  TextControl,
  ToggleControl,
  RangeControl,
  ResponsiveWrapper,
} from "@wordpress/components";
import { ButtonGroup, ButtonGroupDisplay } from "../components/button-group";

export const WithFormEdit = ({ attributes, setAttributes }) => {
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
    overlayOpacity,
  } = attributes;

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
                      <ResponsiveWrapper naturalWidth={400} naturalHeight={300}>
                        <img
                          src={imageUrl}
                          alt={__("Hero background", "socius-block-manager")}
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
          title={__("Form Settings", "socius-block-manager")}
          initialOpen={true}
        >
          <ToggleControl
            label={__("Show Form", "socius-block-manager")}
            checked={showForm}
            onChange={(value) => setAttributes({ showForm: value })}
            help={__(
              "Toggle to show/hide the form section",
              "socius-block-manager"
            )}
          />

          {showForm && (
            <TextControl
              label={__("Form Shortcode", "socius-block-manager")}
              value={formShortcode}
              onChange={(value) => setAttributes({ formShortcode: value })}
              help={__(
                'Enter your form shortcode (e.g., [contact-form-7 id="123"])',
                "socius-block-manager"
              )}
              placeholder="[contact-form-7 id='123']"
            />
          )}
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
              label: __("Background Color (fallback)", "socius-block-manager"),
            },
            {
              value: textColor,
              onChange: (value) => setAttributes({ textColor: value }),
              label: __("Text Color", "socius-block-manager"),
            },
          ]}
        />
      </InspectorControls>

      <div
        className="hero-with-form"
        style={{
          backgroundImage: imageUrl ? `url(${imageUrl})` : "none",
          backgroundColor: backgroundColor,
          color: textColor,
        }}
      >
        <div
          className="hero-overlay"
          style={{ backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})` }}
        >
          <div className="hero-content-with-form">
            <div className="hero-text-content">
              <RichText
                tagName="h1"
                placeholder={__("Enter hero title...", "socius-block-manager")}
                value={title}
                onChange={(value) => setAttributes({ title: value })}
                className="hero-title"
              />

              <RichText
                tagName="p"
                placeholder={__("Enter subtitle...", "socius-block-manager")}
                value={subtitle}
                onChange={(value) => setAttributes({ subtitle: value })}
                className="hero-subtitle"
              />

              <RichText
                tagName="p"
                placeholder={__(
                  "Enter description text...",
                  "socius-block-manager"
                )}
                value={description}
                onChange={(value) => setAttributes({ description: value })}
                className="hero-description"
              />

              <ButtonGroupDisplay buttons={buttons} />
            </div>

            {showForm && (
              <div className="hero-form-container">
                {formShortcode ? (
                  <div className="hero-form-placeholder">
                    <p>
                      <strong>
                        {__("Form Preview", "socius-block-manager")}
                      </strong>
                    </p>
                    <code>{formShortcode}</code>
                    <p>
                      {__(
                        "Form will render on frontend",
                        "socius-block-manager"
                      )}
                    </p>
                  </div>
                ) : (
                  <div className="hero-form-placeholder">
                    <p>
                      {__(
                        "Add form shortcode in sidebar →",
                        "socius-block-manager"
                      )}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export const WithFormSave = ({ attributes }) => {
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
    overlayOpacity,
  } = attributes;

  return (
    <div
      className="hero-with-form"
      style={{
        backgroundImage: imageUrl ? `url(${imageUrl})` : "none",
        backgroundColor: backgroundColor,
        color: textColor,
      }}
    >
      <div
        className="hero-overlay"
        style={{ backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})` }}
      >
        <div className="hero-content-with-form">
          <div className="hero-text-content">
            <RichText.Content
              tagName="h1"
              value={title}
              className="hero-title"
            />
            <RichText.Content
              tagName="p"
              value={subtitle}
              className="hero-subtitle"
            />
            {description && (
              <RichText.Content
                tagName="p"
                value={description}
                className="hero-description"
              />
            )}
            <ButtonGroupDisplay buttons={buttons} />
          </div>

          {showForm && formShortcode && (
            <div className="hero-form-container">
              <div dangerouslySetInnerHTML={{ __html: `[${formShortcode}]` }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
