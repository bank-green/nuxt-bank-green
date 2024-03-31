/**
 * An util function to check for empty Prismic field, regardless of types
 */
import { RTEmbedNode, RTImageNode, RTNode, RTTextNode, RichTextNodeType } from '@prismicio/types';

function isRTNode (nodeObj: any): nodeObj is RTNode {
  return 'type' in nodeObj
}
function isEmptyRTNode (nodeObj: RTNode): boolean {
  return (nodeObj.type === RichTextNodeType.image && (nodeObj as RTImageNode).url.length > 0) ||
    (nodeObj.type === RichTextNodeType.embed && !!(nodeObj as RTEmbedNode).oembed) ||
    (nodeObj as RTTextNode).text.length > 0
}

export default function (fieldData: any): boolean {
  const isTextField = typeof fieldData === 'string'
  if (isTextField) {
    return fieldData.length === 0
  }
  const isRichTextField = Array.isArray(fieldData) && fieldData.every(isRTNode)
  if (isRichTextField) {
    return (
      fieldData.length > 0 && fieldData.some(node => !isEmptyRTNode(node))
    )
  }
  return false
}
