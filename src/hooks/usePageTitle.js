import { useEffect } from "react";

export function usePageTitle(title) {
  useEffect(() => {
    document.title = `Warm Paws | ${title}`;
  }, [title]);
}
