
### 组件作用  
rc-form-table用于解决在antd2.x和antd3.x下，当使用Form表单处理数据遇上Table时的增删查改操作

### 预览图
![review.jpg](http://img.vuedata.cn/rc-form-table.jpg?imageView2/2/w/720)

### install  
`npm install rc-form-table`

### with Antd

```javascript
import React from "react";
import { Form } from "antd";
import RcFormTable from 'rc-form-table';

class _Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      LIST:[{id:1,name:'1'}]
    }
    this._refApply=null;
  }
  
  render() {
    const {LIST} = this.state
    return (
      <section>       
        <Form>
          <RcFormTable
            initialValue={LIST}
            ref={(_ref) => {
              this._refApply = _ref;
            }}
            form={this.props.form}
            formItemName='LIST'
            antTableOptions={{ rowKey: '_rowKey', bordered: true, pagination: false }}
            newdata={{
              name: '',
              id:''
            }}
            columns={this.createColumn.bind(this)}
          /> 
        </Form>
      </section>
    );
  }
  
  createColumn(option){
    const {form: { getFieldDecorator } } = this.props;

    let ret = [
      {
        dataIndex: 'id',
        title: 'id'
        render: (text, record, index) => {
          return (
            <div>
              <Form.Item>
                {getFieldDecorator(`LIST[${index}].id`, {
                  initialValue: record.id || '',
                })(<Input type='text' />)}
              </Form.Item>
              <Form.Item style={{display:'none'}}>
                {getFieldDecorator(`LIST[${index}]._rowKey`, {
                initialValue: record._rowKey || '',
                })(<Input type='hidden' />)}
              </Form.Item>
          </div>
          );
        },
      },

      {
        dataIndex: 'name',
        title: 'name',
        render: (text, record, index) => {
          return (
            <div>
              <Form.Item>
                {getFieldDecorator(`LIST[${index}].name`, {
                  initialValue: text || '',
                })(<Input type='text' />)}
              </Form.Item>
          </div>
          );
        },
      },
      {
        dataIndex: 'oper',
        title: '操作',
        render: (text, record, index) => {
          return (
            <div>
              <a href='javascript:;' onClick={option.onDel.bind(this, record, index)} >
                删除
              </a>
              <a href='javascript:;' onClick={option.onCopy.bind(this, record, index)} style={{margin:'0 20px'}}>
                复制
              </a>
              <a href='javascript:;' onClick={option.onAdd.bind(this, record, index)}>
                添加
              </a>
            </div>
            
          );
        },
      }
    ];
  
    return ret;
  }
}
const Demo = Form.create()(_Demo);
ReactDOM.render(<Demo />, document.getElementById("container"));
```