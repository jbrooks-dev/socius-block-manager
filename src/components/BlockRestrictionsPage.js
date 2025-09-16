import { useState, useEffect } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import {
  Button,
  Card,
  CardBody,
  CheckboxControl,
  Spinner,
  Notice,
  SearchControl,
  SelectControl,
  ToggleControl,
} from "@wordpress/components";
import apiFetch from "@wordpress/api-fetch";
import BlockCard from "./BlockCard";

const BlockRestrictionsPage = () => {
  const [blocks, setBlocks] = useState([]);
  const [restrictions, setRestrictions] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [showOnlyRestricted, setShowOnlyRestricted] = useState(false);

  const { ajaxUrl, nonce } = window.sociusBlockManager || {};

  useEffect(() => {
    loadBlocks();
    loadRestrictions();
  }, []);

  const loadBlocks = async () => {
    try {
      const formData = new FormData();
      formData.append("action", "get_blocks");
      formData.append("nonce", nonce);

      const response = await fetch(ajaxUrl, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setBlocks(result.data);
      } else {
        setNotice({
          type: "error",
          message: __("Failed to load blocks", "socius-block-manager"),
        });
      }
    } catch (error) {
      setNotice({
        type: "error",
        message: __("Error loading blocks", "socius-block-manager"),
      });
    }
  };

  const loadRestrictions = async () => {
    try {
      const formData = new FormData();
      formData.append("action", "get_block_restrictions");
      formData.append("nonce", nonce);

      const response = await fetch(ajaxUrl, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setRestrictions(result.data || {});
      }
    } catch (error) {
      console.error("Error loading restrictions:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveRestrictions = async () => {
    setSaving(true);

    try {
      const formData = new FormData();
      formData.append("action", "save_block_restrictions");
      formData.append("nonce", nonce);
      formData.append("restrictions", JSON.stringify(restrictions));

      const response = await fetch(ajaxUrl, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setNotice({
          type: "success",
          message: __(
            "Block restrictions saved successfully!",
            "socius-block-manager"
          ),
        });
      } else {
        setNotice({
          type: "error",
          message:
            result.data ||
            __("Failed to save restrictions", "socius-block-manager"),
        });
      }
    } catch (error) {
      setNotice({
        type: "error",
        message: __("Error saving restrictions", "socius-block-manager"),
      });
    } finally {
      setSaving(false);
    }
  };

  const updateBlockRestriction = (blockName, allowed, variationName = null) => {
    setRestrictions((prev) => {
      const updated = { ...prev };

      if (!updated[blockName]) {
        updated[blockName] = { allowed: true, variations: {} };
      }

      if (variationName) {
        updated[blockName].variations[variationName] = { allowed };
      } else {
        updated[blockName].allowed = allowed;
      }

      return updated;
    });
  };

  const toggleAllBlocks = (allowed) => {
    const updatedRestrictions = {};

    blocks.forEach((block) => {
      updatedRestrictions[block.name] = {
        allowed,
        variations: {},
      };

      if (block.variations && block.variations.length > 0) {
        block.variations.forEach((variation) => {
          updatedRestrictions[block.name].variations[variation.name] = {
            allowed,
          };
        });
      }
    });

    setRestrictions(updatedRestrictions);
  };

  const getUniqueCategories = () => {
    const categories = new Set(blocks.map((block) => block.category));
    return Array.from(categories).sort();
  };

  const filteredBlocks = blocks.filter((block) => {
    // Search filter
    if (
      searchTerm &&
      !block.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !block.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }

    // Category filter
    if (filterCategory !== "all" && block.category !== filterCategory) {
      return false;
    }

    // Restricted filter
    if (showOnlyRestricted) {
      const blockRestriction = restrictions[block.name];
      const isBlockRestricted = blockRestriction && !blockRestriction.allowed;
      const hasRestrictedVariations =
        blockRestriction &&
        Object.values(blockRestriction.variations || {}).some(
          (v) => !v.allowed
        );

      if (!isBlockRestricted && !hasRestrictedVariations) {
        return false;
      }
    }

    return true;
  });

  if (loading) {
    return (
      <div className="socius-loading">
        <Spinner />
        <p>{__("Loading blocks...", "socius-block-manager")}</p>
      </div>
    );
  }

  return (
    <div className="socius-restrictions-container">
      <div className="socius-restrictions-header">
        <h1>{__("Block Restrictions", "socius-block-manager")}</h1>
        <p>
          {__(
            "Control which blocks and variations are available to non-Super Admin users. Unchecked items will be restricted.",
            "socius-block-manager"
          )}
        </p>
      </div>

      {notice && (
        <Notice
          status={notice.type}
          onRemove={() => setNotice(null)}
          isDismissible
        >
          {notice.message}
        </Notice>
      )}

      <Card className="socius-controls-card">
        <CardBody>
          <div className="socius-controls-grid">
            <SearchControl
              label={__("Search blocks", "socius-block-manager")}
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder={__(
                "Search by block name or title...",
                "socius-block-manager"
              )}
            />

            <SelectControl
              label={__("Filter by category", "socius-block-manager")}
              value={filterCategory}
              onChange={setFilterCategory}
              options={[
                {
                  label: __("All Categories", "socius-block-manager"),
                  value: "all",
                },
                ...getUniqueCategories().map((cat) => ({
                  label: cat.charAt(0).toUpperCase() + cat.slice(1),
                  value: cat,
                })),
              ]}
            />

            <ToggleControl
              label={__("Show only restricted", "socius-block-manager")}
              checked={showOnlyRestricted}
              onChange={setShowOnlyRestricted}
              help={__(
                "Display only blocks or variations that are currently restricted",
                "socius-block-manager"
              )}
            />
          </div>

          <div className="socius-bulk-actions">
            <div className="bulk-action-buttons">
              <Button isSecondary onClick={() => toggleAllBlocks(true)}>
                {__("Allow All Blocks", "socius-block-manager")}
              </Button>

              <Button isSecondary onClick={() => toggleAllBlocks(false)}>
                {__("Restrict All Blocks", "socius-block-manager")}
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>

      <div className="socius-blocks-grid">
        {filteredBlocks.length === 0 ? (
          <div className="socius-no-blocks">
            <p>
              {__(
                "No blocks found matching your criteria.",
                "socius-block-manager"
              )}
            </p>
          </div>
        ) : (
          filteredBlocks.map((block) => (
            <BlockCard
              key={block.name}
              block={block}
              restrictions={
                restrictions[block.name] || { allowed: true, variations: {} }
              }
              onUpdateRestriction={updateBlockRestriction}
            />
          ))
        )}
      </div>

      <div className="socius-save-section">
        <Card>
          <CardBody>
            <div className="save-actions">
              <Button
                isPrimary
                onClick={saveRestrictions}
                isBusy={saving}
                disabled={saving}
              >
                {saving
                  ? __("Saving...", "socius-block-manager")
                  : __("Save Restrictions", "socius-block-manager")}
              </Button>

              <div className="save-info">
                <p>
                  {__("Found", "socius-block-manager")}{" "}
                  <strong>{blocks.length}</strong>{" "}
                  {__("blocks in theme directory", "socius-block-manager")}
                </p>
                <p>
                  {__("Displaying", "socius-block-manager")}{" "}
                  <strong>{filteredBlocks.length}</strong>{" "}
                  {__("blocks", "socius-block-manager")}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default BlockRestrictionsPage;
