import { useEffect } from "react";

// Navbar (mobil alsó sáv Chat cellája) és AiChat két független, egymástól
// nem leszármazott kliens-komponens a layout.tsx-ben — ez a legkisebb
// közös nevező, hogy az egyik megnyithassa a másik panelét.
const OPEN_EVENT = "gbr:chat-open";

export function requestChatOpen() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function useChatOpenRequests(onOpen: () => void) {
  useEffect(() => {
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, [onOpen]);
}
