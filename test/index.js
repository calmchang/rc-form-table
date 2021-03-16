import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
// import './index.css';
import { Form, Select, Button, Input, Table } from "antd";
import RcFormTable from '../src/index.js';

class CDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      APPLY_LIST:[{id:1,name:'1'},
      // {id:2,name:'2'}
    ]
    }
  }


  createColumn = (option) => {
    const {
      form: { getFieldDecorator, getFieldValue },
    } = this.props;

    let ret = [
      {
        align: 'center',
        dataIndex: 'id',
        title: <span>id</span>,
        width: 110,
        render: (text, record, index) => {
          return (
            <div>
              <Form.Item>
                {getFieldDecorator(`APPLY_LIST[${index}].id`, {
                  initialValue: record.id || '',
                  onChange:()=>{this.updateTitle()}
                })(<Input type='text' />)}
              </Form.Item>
          </div>
          );
        },
      },

      {
        align: 'center',
        dataIndex: 'name',
        title: <span>name</span>,
        width: 110,
        render: (text, record, index) => {
          return (
            <div>
              <Form.Item>
                {getFieldDecorator(`APPLY_LIST[${index}].name`, {
                  initialValue: text || '',
                })(<Input type='text' />)}
              </Form.Item>
              <Form.Item style={{display:'none'}}>
                {getFieldDecorator(`APPLY_LIST[${index}]._rowKey`, {
                initialValue: record._rowKey || '',
                })(<Input type='hidden' />)}
              </Form.Item>
          </div>
          );
        },
      },
    ];
    ret.push({
      align: 'center',
      dataIndex: 'oper',
      title: '操作',
      width: 50,
      render: (text, record, index) => {
        return (
          <div>
          <a href='javascript:;' onClick={option.onDel.bind(this, record, index)} >
            删除
          </a>
          <a href='javascript:;' onClick={option.onCopy.bind(this, record, index)} style={{margin:'0 20px'}}>
            复制
          </a>
          <a href='javascript:;' onClick={option.onAdd.bind(this, record, index)} style={{margin:'0 20px'}}>
            添加
          </a>
          </div>
          
        );
      },
    });
  
    return ret;
  };
  
  btnAdd = () => {
    this._refApply.onAdd();
  };
  
  btnReset=()=>{
    this._refApply.onReset();
  }
  
  onTableChange=(data)=>{
    this.updateTitle();
  }
  
  updateTitle=()=>{
    const {getFieldValue,setFieldsValue } = this.props.form;
    let curFormData = getFieldValue('APPLY_LIST');
    if(curFormData&&curFormData[0]){
      setFieldsValue({TITLE:`${curFormData[0].id}-${curFormData[0].name}`})
    }
  }
  render() {
    const { getFieldDecorator, getFieldsValue,getFieldValue, resetFields } = this.props.form;
    const {APPLY_LIST} = this.state
    let curFormData = getFieldsValue();
    return (
      <section>
          <Button type='primary' onClick={()=>{
            const { getFieldDecorator, getFieldsValue, resetFields } = this.props.form;
            this.setState({log:JSON.stringify(getFieldsValue())});
          }} >
            获取数据
          </Button>

          <Button type='primary' style={{margin:'0 20px'}} onClick={this.btnAdd} >
            新增
          </Button>

          <Button type='primary' onClick={this.btnReset} >
            重置
          </Button>

        <p>curFormData:{JSON.stringify(curFormData)}</p>

        <Form>
          <Form.Item label='title'> 
            {getFieldDecorator(`TITLE`, {
              initialValue: '',
            })(<Input type='text' />)}
          </Form.Item>

          
          <RcFormTable
            initialValue={APPLY_LIST}
            ref={(_ref) => {
              this._refApply = _ref;
            }}
            form={this.props.form}
            formItemName='APPLY_LIST'
            antTableOptions={{ rowKey: '_rowKey', bordered: true, pagination: false }}
            newdata={{
              name: '',
              id:''
            }}
            columns={this.createColumn.bind(this)}
            onChange={this.onTableChange.bind(this)}
          /> 
          
        </Form>
        <div>{this.state.log}</div>
      </section>
    );
  }
}
const Demo = Form.create()(CDemo);

ReactDOM.render(<Demo />, document.getElementById("container"));
