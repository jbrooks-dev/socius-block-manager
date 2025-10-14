import { useState, useEffect } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import {
  Button,
  Card,
  CardBody,
  TextControl,
  Notice,
  ColorPicker,
  TabPanel,
  SelectControl,
} from "@wordpress/components";

const ThemeSettingsPage = () => {
  const [settings, setSettings] = useState({
    primary: {
      background: "#2271b1",
      color: "#ffffff",
      border: "#2271b1",
      backgroundHover: "#135e96",
      colorHover: "#ffffff",
      borderHover: "#135e96",
      fontFamily: "inherit",
      fontWeight: "600",
    },
    secondary: {
      background: "rgba(255, 255, 255, 0.2)",
      color: "#ffffff",
      border: "rgba(255, 255, 255, 0.5)",
      backgroundHover: "rgba(255, 255, 255, 0.3)",
      colorHover: "#ffffff",
      borderHover: "rgba(255, 255, 255, 0.8)",
      fontFamily: "inherit",
      fontWeight: "600",
    },
    outline: {
      background: "transparent",
      color: "#ffffff",
      border: "#ffffff",
      backgroundHover: "rgba(255, 255, 255, 0.1)",
      colorHover: "#ffffff",
      borderHover: "#ffffff",
      fontFamily: "inherit",
      fontWeight: "600",
    },
    general: {
      padding: "15px 35px",
      fontSize: "1.1rem",
      borderRadius: "6px",
      borderWidth: "2px",
    },
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState(null);

  const { ajaxUrl, nonce } = window.sociusBlockManager || {};

  const fontFamilyOptions = [
    {
      label: __("Inherit from theme", "socius-block-manager"),
      value: "inherit",
    },
    {
      label: __("System Default", "socius-block-manager"),
      value:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif",
    },
    { label: "Arial", value: "Arial, sans-serif" },
    { label: "Helvetica", value: "Helvetica, Arial, sans-serif" },
    { label: "Georgia", value: "Georgia, serif" },
    { label: "Times New Roman", value: "'Times New Roman', Times, serif" },
    { label: "Courier New", value: "'Courier New', Courier, monospace" },
    { label: "Verdana", value: "Verdana, Geneva, sans-serif" },
    { label: "Trebuchet MS", value: "'Trebuchet MS', Helvetica, sans-serif" },
  ];

  const fontWeightOptions = [
    { label: "300 - Light", value: "300" },
    { label: "400 - Normal", value: "400" },
    { label: "500 - Medium", value: "500" },
    { label: "600 - Semi Bold", value: "600" },
    { label: "700 - Bold", value: "700" },
    { label: "800 - Extra Bold", value: "800" },
  ];

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const formData = new FormData();
      formData.append("action", "get_button_styles");
      formData.append("nonce", nonce);

      const response = await fetch(ajaxUrl, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success && result.data) {
        const loadedSettings = {
          primary: { ...settings.primary, ...result.data.primary },
          secondary: { ...settings.secondary, ...result.data.secondary },
          outline: { ...settings.outline, ...result.data.outline },
          general: { ...settings.general, ...result.data.general },
        };
        setSettings(loadedSettings);
      }
    } catch (error) {
      console.error("Error loading button styles:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    setSaving(true);
    setNotice(null);

    try {
      const formData = new FormData();
      formData.append("action", "save_button_styles");
      formData.append("nonce", nonce);
      formData.append("settings", JSON.stringify(settings));

      const response = await fetch(ajaxUrl, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setNotice({
          type: "success",
          message: __(
            "Button styles saved successfully! Refresh the page to see changes.",
            "socius-block-manager"
          ),
        });
      } else {
        setNotice({
          type: "error",
          message:
            result.data ||
            __("Failed to save button styles", "socius-block-manager"),
        });
      }
    } catch (error) {
      setNotice({
        type: "error",
        message: __("Error saving button styles", "socius-block-manager"),
      });
    } finally {
      setSaving(false);
    }
  };

  const resetToDefaults = () => {
    setSettings({
      primary: {
        background: "#2271b1",
        color: "#ffffff",
        border: "#2271b1",
        backgroundHover: "#135e96",
        colorHover: "#ffffff",
        borderHover: "#135e96",
        fontFamily: "inherit",
        fontWeight: "600",
      },
      secondary: {
        background: "rgba(255, 255, 255, 0.2)",
        color: "#ffffff",
        border: "rgba(255, 255, 255, 0.5)",
        backgroundHover: "rgba(255, 255, 255, 0.3)",
        colorHover: "#ffffff",
        borderHover: "rgba(255, 255, 255, 0.8)",
        fontFamily: "inherit",
        fontWeight: "600",
      },
      outline: {
        background: "transparent",
        color: "#ffffff",
        border: "#ffffff",
        backgroundHover: "rgba(255, 255, 255, 0.1)",
        colorHover: "#ffffff",
        borderHover: "#ffffff",
        fontFamily: "inherit",
        fontWeight: "600",
      },
      general: {
        padding: "15px 35px",
        fontSize: "1.1rem",
        borderRadius: "6px",
        borderWidth: "2px",
      },
    });
    setNotice({
      type: "info",
      message: __(
        "Settings reset to defaults. Click Save to apply.",
        "socius-block-manager"
      ),
    });
  };

  const updateSetting = (style, property, value) => {
    setSettings((prev) => ({
      ...prev,
      [style]: {
        ...prev[style],
        [property]: value,
      },
    }));
  };

  const parseColor = (color) => {
    if (typeof color === "object" && color !== null) {
      return color;
    }

    if (typeof color !== "string") {
      return { r: 0, g: 0, b: 0, a: 1 };
    }

    if (color.startsWith("rgba") || color.startsWith("rgb")) {
      const match = color.match(
        /rgba?\((\d+),?\s*(\d+),?\s*(\d+),?\s*([\d.]+)?\)/
      );
      if (match) {
        return {
          r: parseInt(match[1]),
          g: parseInt(match[2]),
          b: parseInt(match[3]),
          a: match[4] ? parseFloat(match[4]) : 1,
        };
      }
    }

    if (color.startsWith("#")) {
      const hex = color.replace("#", "");
      if (hex.length === 6) {
        return {
          r: parseInt(hex.substr(0, 2), 16),
          g: parseInt(hex.substr(2, 2), 16),
          b: parseInt(hex.substr(4, 2), 16),
          a: 1,
        };
      } else if (hex.length === 8) {
        return {
          r: parseInt(hex.substr(0, 2), 16),
          g: parseInt(hex.substr(2, 2), 16),
          b: parseInt(hex.substr(4, 2), 16),
          a: parseInt(hex.substr(6, 2), 16) / 255,
        };
      }
    }

    if (color === "transparent") {
      return { r: 0, g: 0, b: 0, a: 0 };
    }

    return color;
  };

  const formatColor = (color) => {
    if (typeof color === "object" && color !== null && color.r !== undefined) {
      if (color.a !== undefined && color.a < 1) {
        return `rgba(${Math.round(color.r)}, ${Math.round(
          color.g
        )}, ${Math.round(color.b)}, ${color.a})`;
      }
      const toHex = (n) => {
        const hex = Math.round(n).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      };
      return `#${toHex(color.r)}${toHex(color.g)}${toHex(color.b)}`;
    }
    return color;
  };

  const renderColorControl = (label, style, property) => (
    <div className="color-control-inline">
      <label>{label}</label>
      <div className="color-picker-wrapper">
        <ColorPicker
          color={parseColor(settings[style][property])}
          onChange={(color) =>
            updateSetting(style, property, formatColor(color))
          }
          enableAlpha
        />
        <TextControl
          value={settings[style][property]}
          onChange={(value) => updateSetting(style, property, value)}
        />
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="socius-loading">
        <p>{__("Loading button styles...", "socius-block-manager")}</p>
      </div>
    );
  }

  return (
    <div className="socius-button-styles-container">
      <div className="socius-button-styles-header">
        <h1>{__("Button Styles", "socius-block-manager")}</h1>
        <p>
          {__(
            "Customize the appearance of buttons used in Hero and Showcase blocks across your site.",
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

      <div className="button-styles-layout">
        <div className="button-styles-tabs-section">
          <TabPanel
            className="socius-button-styles-tabs"
            activeClass="is-active"
            tabs={[
              {
                name: "primary",
                title: __("Primary", "socius-block-manager"),
                className: "tab-primary",
              },
              {
                name: "secondary",
                title: __("Secondary", "socius-block-manager"),
                className: "tab-secondary",
              },
              {
                name: "outline",
                title: __("Outline", "socius-block-manager"),
                className: "tab-outline",
              },
              {
                name: "general",
                title: __("General", "socius-block-manager"),
                className: "tab-general",
              },
            ]}
          >
            {(tab) => (
              <>
                {(tab.name === "primary" ||
                  tab.name === "secondary" ||
                  tab.name === "outline") && (
                  <Card>
                    <CardBody>
                      <h2>
                        {tab.name === "primary" &&
                          __("Primary Button Style", "socius-block-manager")}
                        {tab.name === "secondary" &&
                          __("Secondary Button Style", "socius-block-manager")}
                        {tab.name === "outline" &&
                          __("Outline Button Style", "socius-block-manager")}
                      </h2>

                      <div className="typography-controls">
                        <SelectControl
                          label={__("Font Family", "socius-block-manager")}
                          value={settings[tab.name].fontFamily}
                          options={fontFamilyOptions}
                          onChange={(value) =>
                            updateSetting(tab.name, "fontFamily", value)
                          }
                        />
                        <SelectControl
                          label={__("Font Weight", "socius-block-manager")}
                          value={settings[tab.name].fontWeight}
                          options={fontWeightOptions}
                          onChange={(value) =>
                            updateSetting(tab.name, "fontWeight", value)
                          }
                        />
                      </div>

                      <h3>{__("Normal State", "socius-block-manager")}</h3>
                      <div className="color-controls-row">
                        {renderColorControl(
                          __("Background", "socius-block-manager"),
                          tab.name,
                          "background"
                        )}
                        {renderColorControl(
                          __("Text", "socius-block-manager"),
                          tab.name,
                          "color"
                        )}
                        {renderColorControl(
                          __("Border", "socius-block-manager"),
                          tab.name,
                          "border"
                        )}
                      </div>

                      <h3>{__("Hover State", "socius-block-manager")}</h3>
                      <div className="color-controls-row">
                        {renderColorControl(
                          __("Background", "socius-block-manager"),
                          tab.name,
                          "backgroundHover"
                        )}
                        {renderColorControl(
                          __("Text", "socius-block-manager"),
                          tab.name,
                          "colorHover"
                        )}
                        {renderColorControl(
                          __("Border", "socius-block-manager"),
                          tab.name,
                          "borderHover"
                        )}
                      </div>
                    </CardBody>
                  </Card>
                )}

                {tab.name === "general" && (
                  <Card>
                    <CardBody>
                      <h2>
                        {__("General Button Settings", "socius-block-manager")}
                      </h2>
                      <p>
                        {__(
                          "These settings apply to all button styles",
                          "socius-block-manager"
                        )}
                      </p>

                      <div className="general-controls-grid">
                        <TextControl
                          label={__("Padding", "socius-block-manager")}
                          value={settings.general.padding}
                          onChange={(value) =>
                            updateSetting("general", "padding", value)
                          }
                          help={__("e.g., 15px 35px", "socius-block-manager")}
                        />

                        <TextControl
                          label={__("Font Size", "socius-block-manager")}
                          value={settings.general.fontSize}
                          onChange={(value) =>
                            updateSetting("general", "fontSize", value)
                          }
                          help={__(
                            "e.g., 1.1rem or 18px",
                            "socius-block-manager"
                          )}
                        />

                        <TextControl
                          label={__("Border Radius", "socius-block-manager")}
                          value={settings.general.borderRadius}
                          onChange={(value) =>
                            updateSetting("general", "borderRadius", value)
                          }
                          help={__("e.g., 6px or 30px", "socius-block-manager")}
                        />

                        <TextControl
                          label={__("Border Width", "socius-block-manager")}
                          value={settings.general.borderWidth}
                          onChange={(value) =>
                            updateSetting("general", "borderWidth", value)
                          }
                          help={__("e.g., 2px", "socius-block-manager")}
                        />
                      </div>
                    </CardBody>
                  </Card>
                )}
              </>
            )}
          </TabPanel>
        </div>

        <div className="button-styles-preview-section">
          <Card className="preview-sticky-card">
            <CardBody>
              <h3>{__("Live Preview", "socius-block-manager")}</h3>

              <div className="preview-group">
                <h4>{__("Primary Button", "socius-block-manager")}</h4>
                <div className="preview-states">
                  <div className="preview-state">
                    <small>{__("Normal", "socius-block-manager")}</small>
                    <button
                      className="preview-button"
                      style={{
                        backgroundColor: settings.primary.background,
                        color: settings.primary.color,
                        borderColor: settings.primary.border,
                        padding: settings.general.padding,
                        fontSize: settings.general.fontSize,
                        fontFamily: settings.primary.fontFamily,
                        fontWeight: settings.primary.fontWeight,
                        borderRadius: settings.general.borderRadius,
                        borderWidth: settings.general.borderWidth,
                        borderStyle: "solid",
                      }}
                    >
                      {__("Click Me", "socius-block-manager")}
                    </button>
                  </div>
                  <div className="preview-state">
                    <small>{__("Hover", "socius-block-manager")}</small>
                    <button
                      className="preview-button"
                      style={{
                        backgroundColor: settings.primary.backgroundHover,
                        color: settings.primary.colorHover,
                        borderColor: settings.primary.borderHover,
                        padding: settings.general.padding,
                        fontSize: settings.general.fontSize,
                        fontFamily: settings.primary.fontFamily,
                        fontWeight: settings.primary.fontWeight,
                        borderRadius: settings.general.borderRadius,
                        borderWidth: settings.general.borderWidth,
                        borderStyle: "solid",
                      }}
                    >
                      {__("Click Me", "socius-block-manager")}
                    </button>
                  </div>
                </div>
              </div>

              <div className="preview-group">
                <h4>{__("Secondary Button", "socius-block-manager")}</h4>
                <div className="preview-states">
                  <div className="preview-state">
                    <small>{__("Normal", "socius-block-manager")}</small>
                    <button
                      className="preview-button"
                      style={{
                        backgroundColor: settings.secondary.background,
                        color: settings.secondary.color,
                        borderColor: settings.secondary.border,
                        padding: settings.general.padding,
                        fontSize: settings.general.fontSize,
                        fontFamily: settings.secondary.fontFamily,
                        fontWeight: settings.secondary.fontWeight,
                        borderRadius: settings.general.borderRadius,
                        borderWidth: settings.general.borderWidth,
                        borderStyle: "solid",
                      }}
                    >
                      {__("Click Me", "socius-block-manager")}
                    </button>
                  </div>
                  <div className="preview-state">
                    <small>{__("Hover", "socius-block-manager")}</small>
                    <button
                      className="preview-button"
                      style={{
                        backgroundColor: settings.secondary.backgroundHover,
                        color: settings.secondary.colorHover,
                        borderColor: settings.secondary.borderHover,
                        padding: settings.general.padding,
                        fontSize: settings.general.fontSize,
                        fontFamily: settings.secondary.fontFamily,
                        fontWeight: settings.secondary.fontWeight,
                        borderRadius: settings.general.borderRadius,
                        borderWidth: settings.general.borderWidth,
                        borderStyle: "solid",
                      }}
                    >
                      {__("Click Me", "socius-block-manager")}
                    </button>
                  </div>
                </div>
              </div>

              <div className="preview-group">
                <h4>{__("Outline Button", "socius-block-manager")}</h4>
                <div className="preview-states">
                  <div className="preview-state">
                    <small>{__("Normal", "socius-block-manager")}</small>
                    <button
                      className="preview-button"
                      style={{
                        backgroundColor: settings.outline.background,
                        color: settings.outline.color,
                        borderColor: settings.outline.border,
                        padding: settings.general.padding,
                        fontSize: settings.general.fontSize,
                        fontFamily: settings.outline.fontFamily,
                        fontWeight: settings.outline.fontWeight,
                        borderRadius: settings.general.borderRadius,
                        borderWidth: settings.general.borderWidth,
                        borderStyle: "solid",
                      }}
                    >
                      {__("Click Me", "socius-block-manager")}
                    </button>
                  </div>
                  <div className="preview-state">
                    <small>{__("Hover", "socius-block-manager")}</small>
                    <button
                      className="preview-button"
                      style={{
                        backgroundColor: settings.outline.backgroundHover,
                        color: settings.outline.colorHover,
                        borderColor: settings.outline.borderHover,
                        padding: settings.general.padding,
                        fontSize: settings.general.fontSize,
                        fontFamily: settings.outline.fontFamily,
                        fontWeight: settings.outline.fontWeight,
                        borderRadius: settings.general.borderRadius,
                        borderWidth: settings.general.borderWidth,
                        borderStyle: "solid",
                      }}
                    >
                      {__("Click Me", "socius-block-manager")}
                    </button>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card className="socius-button-styles-actions">
            <CardBody>
              <div className="action-buttons">
                <Button
                  isPrimary
                  onClick={saveSettings}
                  isBusy={saving}
                  disabled={saving}
                >
                  {saving
                    ? __("Saving...", "socius-block-manager")
                    : __("Save Button Styles", "socius-block-manager")}
                </Button>

                <Button isSecondary onClick={resetToDefaults}>
                  {__("Reset to Defaults", "socius-block-manager")}
                </Button>
              </div>

              <p className="help-text">
                {__(
                  "Changes apply to all Hero and Showcase blocks.",
                  "socius-block-manager"
                )}
              </p>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ThemeSettingsPage;
