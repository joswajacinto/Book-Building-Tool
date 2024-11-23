import { convertPacktBook } from "./packt";
import { convertWileyBook } from "./wiley";
import { convertWileyDummyBook } from "./wiley_dummy";

export function htmlCleanup(content, publisher) {
  if (publisher === "packt") {
    return convertPacktBook(content);
  } else if (publisher === "wiley") {
    return convertWileyBook(content);
  } else if (publisher === "wiley-dummy") {
    return convertWileyDummyBook(content);
  }
}
