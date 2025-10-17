import { useState, useEffect } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import {
  Button,
  Card,
  CardBody,
  ToggleControl,
  Notice,
  ColorPicker,
  TextControl,
  DateTimePicker,
  SelectControl,
  RangeControl,
} from "@wordpress/components";
import WysiwygEditor from "./WysiwygEditor";

const BugMeBarTab = () => {
  const [settings, setSettings] = useState({
    enabled: false,
    sticky: true,
    is_header_sticky: false,
    content: "",
    background_color: "#2271b1",
    text_color: "#ffffff",
    schedule_enabled: false,
    start_date: "",
    end_date: "",
    padding_top: 10,
    padding_bottom: 10,
    padding_left: 10,
    padding_right: 10,
    text_align: "center",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState(null);

  const { ajaxUrl, nonce } = window.sociusBlockManager || {};

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const formData = new FormData();
      formData.append("action", "get_bugme_bar_settings");
      formData.append("nonce", nonce);

      const response = await fetch(ajaxUrl, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success && result.data) {
        setSettings(result.data);
      }
    } catch (error) {
      console.error("Error loading BugMe Bar settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    setSaving(true);
    setNotice(null);

    try {
      const formData = new FormData();
      formData.append("action", "save_bugme_bar_settings");
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
            "BugMe Bar settings saved successfully!",
            "socius-block-manager"
          ),
        });
      } else {
        setNotice({
          type: "error",
          message:
            result.data ||
            __("Failed to save BugMe Bar settings", "socius-block-manager"),
        });
      }
    } catch (error) {
      setNotice({
        type: "error",
        message: __("Error saving BugMe Bar settings", "socius-block-manager"),
      });
    } finally {
      setSaving(false);
    }
  };

  const updateSetting = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
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
      }
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

  if (loading) {
    return (
      <div className="socius-loading">
        <p>{__("Loading BugMe Bar settings...", "socius-block-manager")}</p>
      </div>
    );
  }

  return (
    <div className="socius-bugme-bar-tab">
      {notice && (
        <Notice
          status={notice.type}
          onRemove={() => setNotice(null)}
          isDismissible
        >
          {notice.message}
        </Notice>
      )}

      <Card>
        <CardBody>
          <h2>{__("BugMe Bar Settings", "socius-block-manager")}</h2>
          <p>
            {__(
              "Configure a notification bar that appears at the top of your website.",
              "socius-block-manager"
            )}
          </p>

          <div className="bugme-bar-settings-section">
            <ToggleControl
              label={__("Enable BugMe Bar", "socius-block-manager")}
              checked={settings.enabled}
              onChange={(value) => updateSetting("enabled", value)}
              help={
                settings.enabled
                  ? __(
                      "BugMe Bar is currently enabled and will display on your site.",
                      "socius-block-manager"
                    )
                  : __(
                      "Enable to activate the BugMe Bar on your site.",
                      "socius-block-manager"
                    )
              }
            />

            {settings.enabled && (
              <>
                <div className="setting-divider"></div>

                <ToggleControl
                  label={__("Sticky Bar", "socius-block-manager")}
                  checked={settings.sticky}
                  onChange={(value) => updateSetting("sticky", value)}
                  help={
                    settings.sticky
                      ? __(
                          "Bar will remain fixed at the top when scrolling.",
                          "socius-block-manager"
                        )
                      : __(
                          "Bar will disappear when user scrolls down.",
                          "socius-block-manager"
                        )
                  }
                />

                <ToggleControl
                  label={__("Is Header Sticky?", "socius-block-manager")}
                  checked={settings.is_header_sticky}
                  onChange={(value) => updateSetting("is_header_sticky", value)}
                  help={__(
                    "Enable if your site has a sticky header that needs extra padding to accommodate the BugMe Bar.",
                    "socius-block-manager"
                  )}
                />

                <div className="setting-divider"></div>

                <div className="bugme-bar-content-editor">
                  <label className="components-base-control__label">
                    {__("Bar Content", "socius-block-manager")}
                  </label>
                  <p className="components-base-control__help">
                    {__(
                      "Enter the message to display in the BugMe Bar. Use the editor toolbar to format your content.",
                      "socius-block-manager"
                    )}
                  </p>
                  <WysiwygEditor
                    value={settings.content}
                    onChange={(value) => updateSetting("content", value)}
                    editorId="bugme-bar-wysiwyg-editor"
                  />
                </div>

                <div className="setting-divider"></div>

                <div className="bugme-bar-alignment">
                  <SelectControl
                    label={__("Text Alignment", "socius-block-manager")}
                    value={settings.text_align}
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
                    onChange={(value) => updateSetting("text_align", value)}
                    help={__(
                      "Choose how the content is aligned within the bar.",
                      "socius-block-manager"
                    )}
                  />
                </div>

                <div className="setting-divider"></div>

                <div className="bugme-bar-padding">
                  <h3>{__("Padding", "socius-block-manager")}</h3>
                  <p className="components-base-control__help">
                    {__(
                      "Control the spacing around the content inside the bar.",
                      "socius-block-manager"
                    )}
                  </p>

                  <div className="padding-controls-grid">
                    <RangeControl
                      label={__("Top", "socius-block-manager")}
                      value={settings.padding_top}
                      onChange={(value) => updateSetting("padding_top", value)}
                      min={0}
                      max={50}
                      step={1}
                      help={`${settings.padding_top}px`}
                    />

                    <RangeControl
                      label={__("Bottom", "socius-block-manager")}
                      value={settings.padding_bottom}
                      onChange={(value) =>
                        updateSetting("padding_bottom", value)
                      }
                      min={0}
                      max={50}
                      step={1}
                      help={`${settings.padding_bottom}px`}
                    />

                    <RangeControl
                      label={__("Left", "socius-block-manager")}
                      value={settings.padding_left}
                      onChange={(value) => updateSetting("padding_left", value)}
                      min={0}
                      max={100}
                      step={1}
                      help={`${settings.padding_left}px`}
                    />

                    <RangeControl
                      label={__("Right", "socius-block-manager")}
                      value={settings.padding_right}
                      onChange={(value) =>
                        updateSetting("padding_right", value)
                      }
                      min={0}
                      max={100}
                      step={1}
                      help={`${settings.padding_right}px`}
                    />
                  </div>

                  <Button
                    isSecondary
                    isSmall
                    onClick={() => {
                      updateSetting("padding_top", 10);
                      updateSetting("padding_bottom", 10);
                      updateSetting("padding_left", 10);
                      updateSetting("padding_right", 10);
                    }}
                    style={{ marginTop: "10px" }}
                  >
                    {__("Reset to Default (10px)", "socius-block-manager")}
                  </Button>
                </div>

                <div className="setting-divider"></div>

                <div className="bugme-bar-colors">
                  <div className="color-control-group">
                    <label className="components-base-control__label">
                      {__("Background Color", "socius-block-manager")}
                    </label>
                    <div className="color-picker-wrapper">
                      <ColorPicker
                        color={parseColor(settings.background_color)}
                        onChange={(color) =>
                          updateSetting("background_color", formatColor(color))
                        }
                        enableAlpha
                      />
                      <TextControl
                        value={settings.background_color}
                        onChange={(value) =>
                          updateSetting("background_color", value)
                        }
                      />
                    </div>
                  </div>

                  <div className="color-control-group">
                    <label className="components-base-control__label">
                      {__("Text Color", "socius-block-manager")}
                    </label>
                    <div className="color-picker-wrapper">
                      <ColorPicker
                        color={parseColor(settings.text_color)}
                        onChange={(color) =>
                          updateSetting("text_color", formatColor(color))
                        }
                        enableAlpha
                      />
                      <TextControl
                        value={settings.text_color}
                        onChange={(value) => updateSetting("text_color", value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="setting-divider"></div>

                <div className="bugme-bar-schedule">
                  <ToggleControl
                    label={__("Enable Schedule", "socius-block-manager")}
                    checked={settings.schedule_enabled}
                    onChange={(value) =>
                      updateSetting("schedule_enabled", value)
                    }
                    help={
                      settings.schedule_enabled
                        ? __(
                            "Schedule is enabled. Bar will only show within the date range below.",
                            "socius-block-manager"
                          )
                        : __(
                            "Schedule is disabled. Bar will always show when enabled (ignoring any dates below).",
                            "socius-block-manager"
                          )
                    }
                  />

                  {settings.schedule_enabled && (
                    <>
                      <div className="setting-divider"></div>

                      <h3>{__("Display Schedule", "socius-block-manager")}</h3>
                      <p className="components-base-control__help">
                        {__(
                          "Set specific dates when the BugMe Bar should be visible.",
                          "socius-block-manager"
                        )}
                      </p>

                      <div className="date-picker-group">
                        <div className="date-picker-field">
                          <label className="components-base-control__label">
                            {__("Start Date & Time", "socius-block-manager")}
                          </label>
                          <DateTimePicker
                            currentDate={settings.start_date || null}
                            onChange={(date) =>
                              updateSetting("start_date", date)
                            }
                            is12Hour={true}
                          />
                          {settings.start_date && (
                            <Button
                              isSmall
                              isDestructive
                              onClick={() => updateSetting("start_date", "")}
                              style={{ marginTop: "10px" }}
                            >
                              {__("Clear Start Date", "socius-block-manager")}
                            </Button>
                          )}
                        </div>

                        <div className="date-picker-field">
                          <label className="components-base-control__label">
                            {__("End Date & Time", "socius-block-manager")}
                          </label>
                          <DateTimePicker
                            currentDate={settings.end_date || null}
                            onChange={(date) => updateSetting("end_date", date)}
                            is12Hour={true}
                          />
                          {settings.end_date && (
                            <Button
                              isSmall
                              isDestructive
                              onClick={() => updateSetting("end_date", "")}
                              style={{ marginTop: "10px" }}
                            >
                              {__("Clear End Date", "socius-block-manager")}
                            </Button>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </CardBody>
      </Card>

      {settings.enabled && (
        <Card>
          <CardBody>
            <h3>{__("Preview", "socius-block-manager")}</h3>
            <div
              className="bugme-bar-preview"
              style={{
                backgroundColor: settings.background_color,
                color: settings.text_color,
                paddingTop: `${settings.padding_top}px`,
                paddingBottom: `${settings.padding_bottom}px`,
                paddingLeft: `${settings.padding_left}px`,
                paddingRight: `${settings.padding_right}px`,
                textAlign: settings.text_align,
                borderRadius: "4px",
                minHeight: "50px",
                display: "flex",
                alignItems: "center",
                justifyContent:
                  settings.text_align === "center"
                    ? "center"
                    : settings.text_align === "right"
                    ? "flex-end"
                    : "flex-start",
              }}
            >
              {settings.content ? (
                <div dangerouslySetInnerHTML={{ __html: settings.content }} />
              ) : (
                <span style={{ opacity: 0.5 }}>
                  {__(
                    "Your BugMe Bar content will appear here",
                    "socius-block-manager"
                  )}
                </span>
              )}
            </div>
          </CardBody>
        </Card>
      )}

      <Card className="socius-bugme-bar-actions">
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
                : __("Save BugMe Bar Settings", "socius-block-manager")}
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default BugMeBarTab;
