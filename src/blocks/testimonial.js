import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import {
  InspectorControls,
  RichText,
  MediaUpload,
  MediaUploadCheck,
  useBlockProps,
} from "@wordpress/block-editor";
import { PanelBody, Button, ResponsiveWrapper } from "@wordpress/components";

registerBlockType("socius-pro-blocks/testimonial", {
  edit: ({ attributes, setAttributes }) => {
    const { quote, authorName, authorRole, imageUrl, imageId } = attributes;

    const blockProps = useBlockProps({
      className: "socius-testimonial-block",
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
            title={__("Author Image", "socius-block-manager")}
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
                          naturalWidth={150}
                          naturalHeight={150}
                        >
                          <img
                            src={imageUrl}
                            alt={__("Author", "socius-block-manager")}
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
                        {__("Select Image", "socius-block-manager")}
                      </Button>
                    )}
                  </div>
                )}
              />
            </MediaUploadCheck>
          </PanelBody>
        </InspectorControls>

        <div {...blockProps}>
          <div className="testimonial-content">
            <div className="testimonial-quote-icon">"</div>

            <RichText
              tagName="blockquote"
              placeholder={__(
                "Enter testimonial quote...",
                "socius-block-manager"
              )}
              value={quote}
              onChange={(value) => setAttributes({ quote: value })}
              className="testimonial-quote"
            />

            <div className="testimonial-author">
              {imageUrl && (
                <div className="testimonial-author-image">
                  <img src={imageUrl} alt={authorName} />
                </div>
              )}

              <div className="testimonial-author-info">
                <RichText
                  tagName="div"
                  placeholder={__("Author name...", "socius-block-manager")}
                  value={authorName}
                  onChange={(value) => setAttributes({ authorName: value })}
                  className="testimonial-author-name"
                />

                <RichText
                  tagName="div"
                  placeholder={__("Author role...", "socius-block-manager")}
                  value={authorRole}
                  onChange={(value) => setAttributes({ authorRole: value })}
                  className="testimonial-author-role"
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  },

  save: ({ attributes }) => {
    const { quote, authorName, authorRole, imageUrl } = attributes;

    const blockProps = useBlockProps.save({
      className: "socius-testimonial-block",
    });

    return (
      <div {...blockProps}>
        <div className="testimonial-content">
          <div className="testimonial-quote-icon">"</div>
          <RichText.Content
            tagName="blockquote"
            value={quote}
            className="testimonial-quote"
          />

          <div className="testimonial-author">
            {imageUrl && (
              <div className="testimonial-author-image">
                <img src={imageUrl} alt={authorName} />
              </div>
            )}

            <div className="testimonial-author-info">
              <RichText.Content
                tagName="div"
                value={authorName}
                className="testimonial-author-name"
              />
              <RichText.Content
                tagName="div"
                value={authorRole}
                className="testimonial-author-role"
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
});
