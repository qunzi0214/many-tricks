import React, { useState, useEffect, createRef } from 'react'

import styles from './index.less'

function FileDrop (props) {
  const [drag, setDrag] = useState(false)
  const [filename, setFilename] = useState('')
  const dropRef = createRef()
  let dragCounter = 0

  const handleDrag = e => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDragIn = e => {
    e.preventDefault()
    e.stopPropagation()
    dragCounter++
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) setDrag(true)
  }

  const handleDragOut = e => {
    e.preventDefault()
    e.stopPropagation()
    dragCounter--
    if (dragCounter === 0) setDrag(false)
  }

  const handleDrop = e => {
    e.preventDefault()
    e.stopPropagation()
    setDrag(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      props.handleDrop(e.dataTransfer.files[0])
      setFilename(e.dataTransfer.files[0].name)
      e.dataTransfer.clearData()
      dragCounter = 0
    }
  }

  useEffect(() => {
    const div = dropRef.current
    div.addEventListener('dragenter', handleDragIn)
    div.addEventListener('dragleave', handleDragOut)
    div.addEventListener('dragover', handleDrag)
    div.addEventListener('drop', handleDrop)
    return function cleanup () {
      div.removeEventListener('dragenter', handleDragIn)
      div.removeEventListener('dragleave', handleDragOut)
      div.removeEventListener('dragover', handleDrag)
      div.removeEventListener('drop', handleDrop)
    }
  })

  return (
    <div
      ref={dropRef} className={drag
        ? `${styles.filedrop} ${styles.drag}`
        : filename
          ? `${styles.filedrop} ${styles.ready}`
          : `${styles.filedrop}`}
    >
      {filename && !drag ? <div>{filename}</div> : <div>Drop files here!</div>}
    </div>
  )
}

export default {
  description: '拖拽上传文件组件',
  component: (
    <FileDrop handleDrop={console.log} />
  ),
}
