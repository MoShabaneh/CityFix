import { useState, useEffect } from "react";
import "./style/notification.css";
export default function Notifications({ message, type, onClose }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 3000); // Auto-hide after 3 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!visible) return null;

  return (
    <div
      className={`alert alert-${type} top-0 end-0 m-3 `}
      style={{ position: "absolute" }}
      role="alert"
    >
      {message}
    </div>
  );
}
