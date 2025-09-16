import { __ } from "@wordpress/i18n";
import {
  Card,
  CardBody,
  CheckboxControl,
  ToggleControl,
} from "@wordpress/components";
import { useState } from "@wordpress/element";
import { chevronDown, chevronUp } from "@wordpress/icons";

const BlockCard = ({ block, restrictions, onUpdateRestriction }) => {
  const [showVariations, setShowVariations] = useState(false);

  const isBlockAllowed = restrictions.allowed !== false;
  const hasVariations = block.variations && block.variations.length > 0;

  const getVariationStatus = (variationName) => {
    return restrictions.variations?.[variationName]?.allowed !== false;
  };

  const getBlockStatusText = () => {
    if (!isBlockAllowed) {
      return __("Restricted", "socius-block-manager");
    }

    if (hasVariations) {
      const restrictedVariations = block.variations.filter(
        (v) => !getVariationStatus(v.name)
      );
      if (restrictedVariations.length > 0) {
        return `${restrictedVariations.length} ${__(
          "variations restricted",
          "socius-block-manager"
        )}`;
      }
    }

    return __("Allowed", "socius-block-manager");
  };

  const getStatusClass = () => {
    if (!isBlockAllowed) {
      return "status-restricted";
    }

    if (hasVariations) {
      const hasRestrictedVariations = block.variations.some(
        (v) => !getVariationStatus(v.name)
      );
      if (hasRestrictedVariations) {
        return "status-partial";
      }
    }

    return "status-allowed";
  };

  return (
    <Card className={`socius-block-card ${getStatusClass()}`}>
      <CardBody>
        <div className="block-header">
          <div className="block-info">
            <h3 className="block-title">{block.title}</h3>
            <div className="block-meta">
              <span className="block-name">{block.name}</span>
              <span className="block-category">{block.category}</span>
            </div>
            {block.description && (
              <p className="block-description">{block.description}</p>
            )}
          </div>

          <div className="block-status">
            <span className={`status-badge ${getStatusClass()}`}>
              {getBlockStatusText()}
            </span>
          </div>
        </div>

        <div className="block-controls">
          <ToggleControl
            label={__("Allow this block", "socius-block-manager")}
            checked={isBlockAllowed}
            onChange={(allowed) => onUpdateRestriction(block.name, allowed)}
            help={
              isBlockAllowed
                ? __("Block is available to all users", "socius-block-manager")
                : __(
                    "Block is restricted from non-Super Admin users",
                    "socius-block-manager"
                  )
            }
          />

          {hasVariations && (
            <div className="variations-section">
              <button
                type="button"
                className="variations-toggle"
                onClick={() => setShowVariations(!showVariations)}
                disabled={!isBlockAllowed}
              >
                <span>
                  {`${block.variations.length} ${__(
                    "variations",
                    "socius-block-manager"
                  )}`}
                </span>
                <span className="toggle-icon">
                  {showVariations ? chevronUp : chevronDown}
                </span>
              </button>

              {showVariations && isBlockAllowed && (
                <div className="variations-list">
                  {block.variations.map((variation) => (
                    <div key={variation.name} className="variation-item">
                      <CheckboxControl
                        label={variation.title || variation.name}
                        checked={getVariationStatus(variation.name)}
                        onChange={(allowed) =>
                          onUpdateRestriction(
                            block.name,
                            allowed,
                            variation.name
                          )
                        }
                        help={variation.description}
                      />
                    </div>
                  ))}
                </div>
              )}

              {showVariations && !isBlockAllowed && (
                <div className="variations-disabled-notice">
                  <p>
                    {__(
                      "Enable the block to manage individual variations",
                      "socius-block-manager"
                    )}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="block-footer">
          <div className="block-directory">
            <small>
              {__("Directory:", "socius-block-manager")}{" "}
              <code>/blocks/{block.directory}/</code>
            </small>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default BlockCard;
