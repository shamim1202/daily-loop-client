import { useEffect } from "react";

export function usePageTitle(title) {
  useEffect(() => {
    document.title = `Daily Loop | ${title}`;
  }, [title]);
}
