import React from 'react'

const ForwardRefItem = React.forwardRef((props: any, ref: any) => {
    const focus = () => {
        // textInput是一个标准的DOM元素
        ref.current.focus()
    }
    return (
        <div>
            <input type="text" ref={ref} />
            <input type="button" value="选中无状态组件的ref" onClick={focus} />
        </div>
    )
})

export default ForwardRefItem