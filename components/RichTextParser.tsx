import React from 'react'

export const RichTextParser = ({ content }: { content: any }) => {
  if (!content?.root?.children) return null

  return (
    <div className="rich-text">
      {content.root.children.map((node: any, i: number) => (
        <Node key={i} node={node} />
      ))}
    </div>
  )
}

const Node = ({ node }: { node: any }) => {
  if (node.type === 'text') {
    let text = <span dangerouslySetInnerHTML={{ __html: node.text }} />
    if (node.format & 1) text = <strong>{text}</strong>
    if (node.format & 2) text = <em>{text}</em>
    if (node.format & 8) text = <u>{text}</u>
    return text
  }

  if (node.type === 'link') {
    return (
      <a href={node.fields.url} target={node.fields.newTab ? '_blank' : undefined} className="text-blue-600 hover:underline">
        {node.children?.map((child: any, i: number) => (
          <Node key={i} node={child} />
        ))}
      </a>
    )
  }

  if (node.type === 'upload') {
    return (
      <img 
        src={node.value?.url} 
        alt={node.value?.alt || ''} 
        className="max-w-full h-auto my-4 rounded-lg shadow-md"
        width={node.value?.width}
        height={node.value?.height}
      />
    )
  }

  if (node.type === 'paragraph') {
    return (
      <p className="mb-4">
        {node.children?.map((child: any, i: number) => (
          <Node key={i} node={child} />
        ))}
      </p>
    )
  }

  if (node.type === 'heading') {
    const Tag = node.tag as React.ElementType
    return (
      <Tag className="font-bold mb-4 mt-6 text-2xl">
        {node.children?.map((child: any, i: number) => (
          <Node key={i} node={child} />
        ))}
      </Tag>
    )
  }
  
  if (node.type === 'list') {
     const Tag = (node.tag === 'ol' ? 'ol' : 'ul') as React.ElementType
     return (
       <Tag className="list-inside list-disc mb-4 ml-4">
         {node.children?.map((child: any, i: number) => (
            <Node key={i} node={child} />
         ))}
       </Tag>
     )
  }
  
  if (node.type === 'listitem') {
      return (
        <li className="mb-1">
          {node.children?.map((child: any, i: number) => (
             <Node key={i} node={child} />
          ))}
        </li>
      )
  }

  return null
}
