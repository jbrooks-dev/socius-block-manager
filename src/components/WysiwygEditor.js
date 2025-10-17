import { useEffect, useRef, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";

const WysiwygEditor = ({ value, onChange, editorId = "bugme-bar-editor" }) => {
  const editorRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState(null);
  const initAttempts = useRef(0);
  const maxAttempts = 50; // 5 seconds max wait time

  useEffect(() => {
    let mounted = true;
    let timeoutId = null;

    const checkAndInitialize = () => {
      initAttempts.current++;

      // Check if we've exceeded max attempts
      if (initAttempts.current > maxAttempts) {
        if (mounted) {
          setError(
            __(
              "Editor failed to load. Please refresh the page and try again.",
              "socius-block-manager"
            )
          );
        }
        return;
      }

      // Check if wp and wp.editor exist
      if (
        typeof window.wp === "undefined" ||
        typeof window.wp.editor === "undefined"
      ) {
        timeoutId = setTimeout(checkAndInitialize, 100);
        return;
      }

      // Initialize the editor
      try {
        window.wp.editor.initialize(editorId, {
          tinymce: {
            wpautop: true,
            plugins:
              "charmap colorpicker lists paste tabfocus textcolor fullscreen wordpress wpautoresize wplink",
            toolbar1:
              "formatselect bold italic underline | bullist numlist | blockquote | alignleft aligncenter alignright | link unlink | forecolor backcolor | removeformat | fullscreen",
            toolbar2: "",
            height: 250,
            setup: (editor) => {
              editor.on("change", () => {
                if (mounted) {
                  const content = editor.getContent();
                  onChange(content);
                }
              });
              editor.on("keyup", () => {
                if (mounted) {
                  const content = editor.getContent();
                  onChange(content);
                }
              });
              editor.on("init", () => {
                if (mounted) {
                  editor.setContent(value || "");
                  setIsReady(true);
                }
              });
            },
          },
          quicktags: true,
          mediaButtons: false,
        });
      } catch (err) {
        console.error("Error initializing editor:", err);
        if (mounted) {
          setError(
            __(
              "Error initializing editor. Please refresh the page.",
              "socius-block-manager"
            )
          );
        }
      }
    };

    // Start the initialization check
    checkAndInitialize();

    // Cleanup function
    return () => {
      mounted = false;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      // Remove the editor
      if (window.wp && window.wp.editor && window.tinymce) {
        const editor = window.tinymce.get(editorId);
        if (editor) {
          editor.remove();
        }
        window.wp.editor.remove(editorId);
      }
    };
  }, [editorId]);

  // Update editor content when value prop changes externally
  useEffect(() => {
    if (isReady && window.tinymce) {
      const editor = window.tinymce.get(editorId);
      if (editor) {
        const currentContent = editor.getContent();
        if (currentContent !== value) {
          editor.setContent(value || "");
        }
      }
    }
  }, [value, editorId, isReady]);

  if (error) {
    return (
      <div className="wysiwyg-editor-error">
        <p
          style={{
            color: "#d63638",
            padding: "10px",
            background: "#f8d7da",
            borderRadius: "4px",
          }}
        >
          {error}
        </p>
        <textarea
          className="bugme-bar-textarea-fallback"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          rows={8}
          placeholder={__("Enter your message here...", "socius-block-manager")}
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            fontFamily: "inherit",
            fontSize: "14px",
            lineHeight: "1.6",
            resize: "vertical",
            marginTop: "10px",
          }}
        />
      </div>
    );
  }

  return (
    <div className="wysiwyg-editor-wrapper">
      {!isReady && (
        <div style={{ padding: "20px", textAlign: "center", color: "#646970" }}>
          {__("Loading editor...", "socius-block-manager")}
        </div>
      )}
      <textarea
        ref={editorRef}
        id={editorId}
        className="wp-editor-area"
        defaultValue={value || ""}
        style={{ display: isReady ? "none" : "block" }}
      />
    </div>
  );
};

export default WysiwygEditor;
