import React, { useState, useEffect, useCallback } from 'react'

const useCopyToClipboard = text => {
  const copyToClipboard = str => {
    const el = document.createElement('textarea')
    el.value = str
    el.setAttribute('readonly', '')
    el.style.position = 'absolute'
    el.style.left = '-9999px'
    document.body.appendChild(el)
    const selected = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false
    el.select()
    const success = document.execCommand('copy')
    document.body.removeChild(el)
    if (selected) {
      document.getSelection().removeAllRanges()
      document.getSelection().addRange(selected)
    }
    return success
  }

  const [copied, setCopied] = useState(false)

  const copy = useCallback(() => {
    if (!copied) setCopied(copyToClipboard(text))
  }, [text])
  useEffect(() => () => setCopied(false), [text])

  return [copied, copy]
}
const TextCopy = props => {
  const [copied, copy] = useCopyToClipboard('"这段文本将被拷贝"')
  return (
    <div>
      <p>传入值: "这段文本将被拷贝"</p>
      <button onClick={copy}>Click to copy</button>
      <span>{copied && '已拷贝!'}</span>
    </div>
  )
}
export default {
  description: '定义一个自定义hooks，拷贝传入值',
  component: (
    <TextCopy />
  ),
}
