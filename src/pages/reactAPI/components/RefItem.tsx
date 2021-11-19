import React from 'react'


class CustomTextInput extends React.Component {
    constructor(props:any) {
        super(props);
        this.focus = this.focus.bind(this);
    }
    textInput : any
    focus() {
        // textInput是一个标准的DOM元素
        this.textInput.focus()
    }

    render() {
        return (
            <div>
                <input type="text" ref={el => this.textInput = el}/>
                <input type="button" value="ref 回调" onClick={this.focus}/>
            </div>
        );
    }
}

export default CustomTextInput