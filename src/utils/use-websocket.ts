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
  const [error, setError] = useState<string | undefined>();
  const [opened, setOpened] = useState(false);
  useEffect(() => {
    const ws = new WebSocket(url);
    ws.onopen = () => {
      setOpened(true);
    };

    ws.onmessage = (e) => {
      console.log(e);
      // a message was received
      setMessages((prev) =>
        [(preprocessData || JSON.parse)(e.data), ...prev].slice(0, showMax)
      );
    };

    ws.onerror = (e) => {
      // @ts-ignore
      console.log(e.message as string);
    };

    ws.onclose = (e) => {
      // connection closed
      setOpened(true);
      console.log(e.code, e.reason);
    };
    return () => {
      ws.close();
    };
  }, [showMax, preprocessData, url]);
  return { messages, opened, error };
}
