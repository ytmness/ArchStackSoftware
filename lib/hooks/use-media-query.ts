"use client";

import * as React from "react";

export function useMediaQuery(query: string) {
  const [matches, setMatches] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia(query);
    setMatches(mq.matches);

    const onChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}
