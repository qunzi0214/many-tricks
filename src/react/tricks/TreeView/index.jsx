import React, { useState } from 'react'

import styles from './index.less'

const data = {
  lorem: {
    ipsum: 'dolor sit',
    amet: {
      consectetur: 'adipiscing',
      elit: [
        'duis',
        'vitae',
        {
          semper: 'orci',
        },
        {
          est: 'sed ornare',
        },
        'etiam',
        ['laoreet', 'tincidunt'],
        ['vestibulum', 'ante'],
      ],
    },
    ipsume: 'primis',
  },
}

function TreeView ({
  data,
  toggled = true,
  name = null,
  isLast = true,
  isChildElement = false,
  isParentToggled = true,
}) {
  const [isToggled, setIsToggled] = useState(toggled)

  return (
    <div
      style={{ marginLeft: isChildElement ? 16 : 4 + 'px' }}
      className={isParentToggled ? styles['tree-element'] : `${styles['tree-element']} ${styles.collapsed}`}
    >
      <span
        className={isToggled ? styles.toggler : `${styles.toggler} ${styles.closed}`}
        onClick={() => setIsToggled(!isToggled)}
      />
      {name ? <strong>&nbsp;&nbsp;{name}: </strong> : <span>&nbsp;&nbsp;</span>}
      {Array.isArray(data) ? '[' : '{'}
      {!isToggled && '...'}
      {Object.keys(data).map((v, i, a) =>
        typeof data[v] === 'object'
          ? (
            <TreeView
              data={data[v]}
              isLast={i === a.length - 1}
              name={Array.isArray(data) ? null : v}
              isChildElement
              isParentToggled={isParentToggled && isToggled}
              key={i}
            />
            )
          : (
            <p
              style={{ marginLeft: 16 + 'px' }}
              className={isToggled ? styles['tree-element'] : `${styles['tree-element']} ${styles.collapsed}`}
              key={i}
            >
              {Array.isArray(data) ? '' : <strong>{v}: </strong>}
              {data[v]}
              {i === a.length - 1 ? '' : ','}
            </p>
            ),
      )}
      {Array.isArray(data) ? ']' : '}'}
      {!isLast ? ',' : ''}
    </div>
  )
}
export default {
  description: '渲染可折叠有缩进的JSON数据',
  component: (
    <TreeView data={data} name='data' />
  ),
}
