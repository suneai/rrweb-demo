import React from 'react'


class ClassRefItem extends React.Component {
    constructor(props:any) {
        super(props);
        this.textInput = React.createRef()
        this.focus = this.focus.bind(this);
    }
    textInput : any
    focus() {
        // textInput是一个标准的DOM元素
        this.textInput.current.focus()
    }

    render() {
        return (
            <div>
                <input type="text" ref={this.textInput}/>
                <input type="button" value="选中class的ref" onClick={this.focus}/>
            </div>
        );
    }
}

export default ClassRefItem