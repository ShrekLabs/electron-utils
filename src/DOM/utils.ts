/**
 * @category DOM
 */
export const q = (query: string, elem = "document") => `${elem}.querySelector('${query}')`;

/**
 * @category DOM
 */
export const qAll = (query: string, elem = "document") => `Array.from(${elem}.querySelectorAll('${query}'))`;

/**
 * @category DOM
 * @example
 * toHTMLlist(["somebody", "once", "told", "me"]) === "<ul><li>somebody</li><li>once</li><li>told</li><li>me</li></ul>"
 */
export function toHTMLList(arr: string[]): string {
  if (arr.length === 0) return "";
  return `<ul><li>${arr.join("</li><li>")}</li></ul>`;
}

/**
 * @category DOM
 * @example
 * toHTMLParagraphs(["somebody", "once", "told", "me"]) === "<p>somebody</p><p>once</p><p>told</p><p>me</p>"
 */
export function toHTMLParagraphs(arr: string[]): string {
  if (arr.length === 0) return "";
  return `<p>${arr.join("</p><p>")}</p>`;
}
