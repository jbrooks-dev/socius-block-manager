// src/blocks/hero/variations/carousel.js
import { __ } from "@wordpress/i18n";
import {
  InspectorControls,
  RichText,
  MediaUpload,
  MediaUploadCheck,
  PanelColorSettings,
} from "@wordpress/block-editor";
import { PanelBody, Button, RangeControl } from "@wordpress/components";
import { useState } from "@wordpress/element";
import { trash } from "@wordpress/icons";
import {
  ButtonGroup,
  ButtonGroupDisplay,
} from "../../../components/ButtonGroup";

export const CarouselEdit = ({ attributes, setAttributes }) => {
  const {
    title,
    subtitle,
    carouselImages,
    buttons,
    backgroundColor,
    textColor,
    overlayOpacity,
  } = attributes;

  const [currentSlide, setCurrentSlide] = useState(0);

  const addImage = (media) => {
    const newImages = [...carouselImages, { id: media.id, url: media.url }];
    setAttributes({ carouselImages: newImages });
  };

  const removeImage = (index) => {
    const newImages = carouselImages.filter((_, i) => i !== index);
    setAttributes({ carouselImages: newImages });
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
      setCurrentSlide(
        currentSlide === 0 ? carouselImages.length - 1 : currentSlide - 1
      );
    }
  };

  const currentImage = carouselImages[currentSlide];

  return (
    <>
      <InspectorControls>
        <PanelBody
          title={__("Carousel Images", "socius-block-manager")}
          initialOpen={true}
        >
          <p>
            {__("Add multiple images for the carousel", "socius-block-manager")}
          </p>

          <MediaUploadCheck>
            <MediaUpload
              onSelect={addImage}
              allowedTypes={["image"]}
              multiple={false}
              render={({ open }) => (
                <Button isPrimary onClick={open}>
                  {__("Add Image", "socius-block-manager")}
                </Button>
              )}
            />
          </MediaUploadCheck>

          {carouselImages.length > 0 && (
            <div style={{ marginTop: "15px" }}>
              <strong>
                {__("Images:", "socius-block-manager")} {carouselImages.length}
              </strong>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "10px",
                  marginTop: "10px",
                }}
              >
                {carouselImages.map((image, index) => (
                  <div key={index} style={{ position: "relative" }}>
                    <img
                      src={image.url}
                      alt=""
                      style={{
                        width: "100%",
                        height: "80px",
                        objectFit: "cover",
                        borderRadius: "4px",
                      }}
                    />
                    <Button
                      icon={trash}
                      isDestructive
                      isSmall
                      onClick={() => removeImage(index)}
                      style={{
                        position: "absolute",
                        top: "5px",
                        right: "5px",
                        minWidth: "auto",
                        padding: "4px",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

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
        className="hero-carousel"
        style={{
          backgroundImage: currentImage ? `url(${currentImage.url})` : "none",
          backgroundColor: backgroundColor,
          color: textColor,
        }}
      >
        <div
          className="hero-overlay"
          style={{ backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})` }}
        >
          {carouselImages.length > 1 && (
            <>
              <button
                className="carousel-nav carousel-prev"
                onClick={prevSlide}
              >
                ‹
              </button>
              <button
                className="carousel-nav carousel-next"
                onClick={nextSlide}
              >
                ›
              </button>
            </>
          )}

          <div className="hero-content">
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

            <ButtonGroupDisplay buttons={buttons} />
          </div>

          {carouselImages.length > 0 && (
            <div className="carousel-indicators">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  className={`carousel-indicator ${
                    index === currentSlide ? "active" : ""
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export const CarouselSave = ({ attributes }) => {
  const {
    title,
    subtitle,
    carouselImages,
    buttons,
    backgroundColor,
    textColor,
    overlayOpacity,
  } = attributes;

  return (
    <div
      className="hero-carousel"
      style={{
        backgroundColor: backgroundColor,
        color: textColor,
      }}
      data-carousel-images={JSON.stringify(carouselImages)}
    >
      <div
        className="hero-overlay"
        style={{ backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})` }}
      >
        {carouselImages.length > 1 && (
          <>
            <button
              className="carousel-nav carousel-prev"
              data-direction="prev"
            >
              ‹
            </button>
            <button
              className="carousel-nav carousel-next"
              data-direction="next"
            >
              ›
            </button>
          </>
        )}

        <div className="hero-content">
          <RichText.Content tagName="h1" value={title} className="hero-title" />
          <RichText.Content
            tagName="p"
            value={subtitle}
            className="hero-subtitle"
          />
          <ButtonGroupDisplay buttons={buttons} />
        </div>

        {carouselImages.length > 0 && (
          <div className="carousel-indicators">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                className={`carousel-indicator ${index === 0 ? "active" : ""}`}
                data-slide={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
