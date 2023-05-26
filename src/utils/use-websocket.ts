import { useEffect, useState } from "react";

export function useWebsocket<T = any>({
  url,
  preprocessData,
  showMax = 10,
}: {
  url: string;
  preprocessData?: (it: string) => T;
  showMax?: number;
}) {
  const [messages, setMessages] = useState<T[]>([]);
  const [error, setError] = useState<any>();
  const [opened, setOpened] = useState(false);
  useEffect(() => {
    const ws = new WebSocket(url);
    ws.onopen = () => {
      setOpened(true);
    };
    ws.onmessage = (e) => {
      setMessages((prev) =>
        [(preprocessData || JSON.parse)(e.data), ...prev].slice(0, showMax)
      );
    };
    ws.onerror = (e) => {
      setError(e);
    };
    ws.onclose = (e) => {
      setOpened(true);
    };
    return () => {
      ws.close();
    };
  }, [showMax, preprocessData, url]);
  return { messages, opened, error };
}
