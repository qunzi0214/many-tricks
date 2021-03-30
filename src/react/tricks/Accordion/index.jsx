import React, { useState } from 'react'

function AccordionItem (props) {
  const style = {
    collapsed: {
      display: 'none',
    },
    expanded: {
      display: 'block',
    },
    buttonStyle: {
      display: 'block',
      width: '100%',
    },
  }

  return (
    <div>
      <button style={style.buttonStyle} onClick={() => props.handleClick()}>
        {props.label}
      </button>
      <div className='collapse-content' style={props.isCollapsed ? style.collapsed : style.expanded} aria-expanded={props.isCollapsed}>
        {props.children}
      </div>
    </div>
  )
}

function Accordion (props) {
  const [bindIndex, setBindIndex] = useState(props.defaultIndex)

  const changeItem = itemIndex => {
    if (typeof props.handleItemClick === 'function') props.handleItemClick(itemIndex)
    if (itemIndex !== bindIndex) setBindIndex(itemIndex)
  }
  const items = props.children.filter(item => item.type.name === 'AccordionItem')

  return (
    <div className='wrapper'>
      {items.map(({ props }, i) => (
        <AccordionItem
          key={i}
          isCollapsed={bindIndex !== props.index}
          label={props.label}
          handleClick={() => changeItem(props.index)}
        >
          {props.children}
        </AccordionItem>
      ))}
    </div>
  )
}

export default {
  description: '手风琴组件',
  component: (
    <Accordion defaultIndex='1' handleItemClick={console.log}>
      <AccordionItem label='A' index='1'>
        Lorem ipsum
      </AccordionItem>
      <AccordionItem label='B' index='2'>
        Dolor sit amet
      </AccordionItem>
    </Accordion>
  ),
}
