import { useState, useEffect } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import {
  Card,
  CardBody,
  Spinner,
  SearchControl,
  SelectControl,
} from "@wordpress/components";

const BlockListPage = () => {
  console.log("AvailableBlocksPage");
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const { ajaxUrl, nonce } = window.sociusBlockManager || {};

  useEffect(() => {
    loadBlocks();
  }, []);

  const loadBlocks = async () => {
    try {
      const formData = new FormData();
      formData.append("action", "get_available_blocks");
      formData.append("nonce", nonce);

      const response = await fetch(ajaxUrl, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setBlocks(result.data);
      }
    } catch (error) {
      console.error("Error loading blocks:", error);
    } finally {
      setLoading(false);
    }
  };

  const getUniqueCategories = () => {
    const categories = new Set(blocks.map((block) => block.category));
    return Array.from(categories).sort();
  };

  const filteredBlocks = blocks.filter((block) => {
    if (
      searchTerm &&
      !block.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !block.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }

    if (filterCategory !== "all" && block.category !== filterCategory) {
      return false;
    }

    return true;
  });

  if (loading) {
    return (
      <div className="socius-loading">
        <Spinner />
        <p>{__("Loading available blocks...", "socius-block-manager")}</p>
      </div>
    );
  }

  return <div className="socius-available-blocks-container">
    <div className="socius-available-header">
      <h1>{__("Available Socius Pro Blocks", "socius-block-manager")}</h1>
      <p>
        {__(
          "These blocks are included with the Socius Block Manager plugin and available across all sites.",
          "socius-block-manager"
        )}
      </p>
    </div>

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
        </div>

        <div className="available-blocks-stats">
          <p>
            {__("Total Blocks:", "socius-block-manager")}{" "}
            <strong>{blocks.length}</strong>
            {" • "}
            {__("Showing:", "socius-block-manager")}{" "}
            <strong>{filteredBlocks.length}</strong>
          </p>
        </div>
      </CardBody>
    </Card>

    <div className="socius-available-blocks-grid">
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
          <Card key={block.name} className="socius-available-block-card">
            <CardBody>
              <div className="block-icon">
                <span className={`dashicons dashicons-${block.icon}`}></span>
              </div>

              <div className="block-info">
                <h3 className="block-title">{block.title}</h3>
                <div className="block-meta">
                  <span className="block-name">{block.name}</span>
                  <span className="block-version">v{block.version}</span>
                </div>
                {block.description && (
                  <p className="block-description">{block.description}</p>
                )}

                {block.keywords && block.keywords.length > 0 && (
                  <div className="block-keywords">
                    {block.keywords.map((keyword, index) => (
                      <span key={index} className="keyword-tag">
                        {keyword}
                      </span>
                    ))}
                  </div>
                )}

                {block.variations && block.variations.length > 0 && (
                  <div className="block-variations">
                    <small>
                      {block.variations.length}{" "}
                      {__("variations available", "socius-block-manager")}
                    </small>
                  </div>
                )}
              </div>

              <div className="block-footer">
                <span className="block-category-badge">{block.category}</span>
                <span className="block-directory">
                  <code>/blocks/{block.directory}/</code>
                </span>
              </div>
            </CardBody>
          </Card>
        ))
      )}
    </div>

    <Card className="socius-info-card">
      <CardBody>
        <h3>{__("About Socius Pro Blocks", "socius-block-manager")}</h3>
        <ul>
          <li>
            {__(
              "Blocks are automatically registered from the plugin's blocks directory",
              "socius-block-manager"
            )}
          </li>
          <li>
            {__(
              "Frontend assets are only loaded on pages where blocks are actually used",
              "socius-block-manager"
            )}
          </li>
          <li>
            {__(
              'All blocks are available in the editor under the "Socius Pro Blocks" category',
              "socius-block-manager"
            )}
          </li>
          <li>
            {__(
              "Block restrictions can be managed from the Block Restrictions page",
              "socius-block-manager"
            )}
          </li>
        </ul>
      </CardBody>
    </Card>
  </div>;
};

export default BlockListPage;
