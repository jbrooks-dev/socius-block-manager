import { __ } from "@wordpress/i18n";
import {
  Button,
  TextControl,
  SelectControl,
  CheckboxControl,
} from "@wordpress/components";
import { plus, trash } from "@wordpress/icons";
import { useState, useEffect } from "@wordpress/element";

export const ButtonGroup = ({ buttons, onChange, maxButtons = 3 }) => {
  const [pages, setPages] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPagesAndPosts();
  }, []);

  const fetchPagesAndPosts = async () => {
    try {
      const pagesResponse = await fetch(
        "/wp-json/wp/v2/pages?per_page=100&orderby=title&order=asc"
      );
      const pagesData = await pagesResponse.json();
      setPages(
        pagesData.map((page) => ({
          label: page.title.rendered,
          value: page.link,
        }))
      );

      const postsResponse = await fetch(
        "/wp-json/wp/v2/posts?per_page=100&orderby=date&order=desc"
      );
      const postsData = await postsResponse.json();
      setPosts(
        postsData.map((post) => ({
          label: post.title.rendered,
          value: post.link,
        }))
      );

      setLoading(false);
    } catch (error) {
      console.error("Error fetching pages/posts:", error);
      setLoading(false);
    }
  };

  const addButton = () => {
    if (buttons.length < maxButtons) {
      onChange([
        ...buttons,
        {
          text: "New Button",
          linkType: "external",
          url: "",
          style: "primary",
          openInNewWindow: false,
        },
      ]);
    }
  };

  const updateButton = (index, field, value) => {
    const newButtons = [...buttons];
    newButtons[index][field] = value;

    if (field === "linkType") {
      newButtons[index].url = "";
    }

    onChange(newButtons);
  };

  const removeButton = (index) => {
    const newButtons = buttons.filter((_, i) => i !== index);
    onChange(
      newButtons.length > 0
        ? newButtons
        : [
            {
              text: "Button",
              linkType: "external",
              url: "",
              style: "primary",
              openInNewWindow: false,
            },
          ]
    );
  };

  return (
    <div className="button-group-editor">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <strong>{__("Buttons", "socius-block-manager")}</strong>
        {buttons.length < maxButtons && (
          <Button icon={plus} isSmall onClick={addButton}>
            {__("Add Button", "socius-block-manager")}
          </Button>
        )}
      </div>

      {buttons.map((button, index) => (
        <div
          key={index}
          style={{
            marginBottom: "15px",
            padding: "15px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            background: "#f9f9f9",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <strong>
              {__("Button", "socius-block-manager")} {index + 1}
            </strong>
            <Button
              icon={trash}
              isDestructive
              isSmall
              onClick={() => removeButton(index)}
              disabled={buttons.length === 1}
            />
          </div>

          <TextControl
            label={__("Button Text", "socius-block-manager")}
            value={button.text}
            onChange={(value) => updateButton(index, "text", value)}
          />

          <SelectControl
            label={__("Link Type", "socius-block-manager")}
            value={button.linkType || "external"}
            options={[
              {
                label: __("External URL", "socius-block-manager"),
                value: "external",
              },
              {
                label: __("Internal Page", "socius-block-manager"),
                value: "page",
              },
              {
                label: __("Internal Post", "socius-block-manager"),
                value: "post",
              },
            ]}
            onChange={(value) => updateButton(index, "linkType", value)}
          />

          {button.linkType === "external" && (
            <>
              <TextControl
                label={__("External URL", "socius-block-manager")}
                value={button.url}
                onChange={(value) => updateButton(index, "url", value)}
                placeholder="https://example.com"
                help={__(
                  "Enter the full URL including https://",
                  "socius-block-manager"
                )}
              />

              <CheckboxControl
                label={__("Open in new window", "socius-block-manager")}
                checked={button.openInNewWindow || false}
                onChange={(value) =>
                  updateButton(index, "openInNewWindow", value)
                }
              />
            </>
          )}

          {button.linkType === "page" && (
            <SelectControl
              label={__("Select Page", "socius-block-manager")}
              value={button.url}
              options={[
                {
                  label: __("-- Select a Page --", "socius-block-manager"),
                  value: "",
                },
                ...pages,
              ]}
              onChange={(value) => updateButton(index, "url", value)}
              disabled={loading}
            />
          )}

          {button.linkType === "post" && (
            <SelectControl
              label={__("Select Post", "socius-block-manager")}
              value={button.url}
              options={[
                {
                  label: __("-- Select a Post --", "socius-block-manager"),
                  value: "",
                },
                ...posts,
              ]}
              onChange={(value) => updateButton(index, "url", value)}
              disabled={loading}
            />
          )}

          <SelectControl
            label={__("Button Style", "socius-block-manager")}
            value={button.style}
            options={[
              {
                label: __("Primary", "socius-block-manager"),
                value: "primary",
              },
              {
                label: __("Secondary", "socius-block-manager"),
                value: "secondary",
              },
              {
                label: __("Outline", "socius-block-manager"),
                value: "outline",
              },
            ]}
            onChange={(value) => updateButton(index, "style", value)}
          />
        </div>
      ))}
    </div>
  );
};

export const ButtonGroupDisplay = ({ buttons, className = "hero-button-group" }) => {
  return (
    <div className={className}>
      {buttons.map((button, index) => {
        const target = button.linkType === "external" && button.openInNewWindow ? "_blank" : "_self";
        const rel = button.linkType === "external" && button.openInNewWindow ? "noopener noreferrer" : undefined;

        if (button.url) {
          return (
            <a
              key={index}
              href={button.url}
              className={`hero-button hero-button-${button.style}`}
              target={target}
              rel={rel}
            >
              {button.text}
            </a>
          );
        } else {
          return (
            <span
              key={index}
              className={`hero-button hero-button-${button.style}`}
            >
              {button.text}
            </span>
          );
        }
      })}
    </div>
  );
};