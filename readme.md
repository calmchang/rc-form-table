
![antd](https://img.shields.io/badge/ant--desigin-2.x~3.x-blue)
![node](https://img.shields.io/badge/node-%3E%3D8-green)
![npm](https://img.shields.io/badge/npm-%3E%3D6.14.5-orange)

### 开发者环境
node:10.15.0  
npm:6.14.5
### 组件作用  
rc-form-table用于解决在antd2.x和antd3.x下，当使用Form表单处理数据遇上Table时的增删查改操作  
另外如果你需要支持`antd4`版本的可以[点击这里获取](https://www.npmjs.com/package/antd-form-table)
### 预览图
![review.jpg](http://img.vuedata.cn/rc-form-table-review.gif)

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

### API

参数|说明|类型|默认值
:-|:-|:-|:-
initialValue|初始的表格数据源|Array|-
formItemName|字段名|String|-
form|父组件的props.form|Form|-
antTableOptions|antd Table组件的参数，参考antd文档|Object|-
newdata|新增一条数据的数据模板|Object|-
columns|同antd table的columns|Function({onDel,onCopy,onAdd})=>void|-
onChange|当数据发生变化时的回调|(value)=>void|-
onAdd|当触发添加事件时的消息拦截，返回的是被创建的新数据项，如果返回空则不添加数据|(record,index)=>object|-


### 组件内部可用方法，可以通过ref使用组件内部方法

参数|说明|类型|默认值
:-|:-|:-|:-
onReset|重置表单内数据|(arr?:object[])=>void|-


### 更新日志
* v1.1.0:增加了是否在无数据的情况下，自动添加一行空数据的属性