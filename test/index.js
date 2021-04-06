import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
// import './index.css';
import { Form, Select, Button, Input, Table, Checkbox, Row, Col } from "antd";
import RcFormTable from '../src/index.js';

class CDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      APPLY_LIST:[{id:1,name:'name1',nation:'',city:''}],
      NATION_INFO:[
        {name:'中国',list:['上海','北京','广州']},
        {name:'日本',list:['东京','大阪','京都']},
        {name:'韩国',list:['釜山','首尔','济州']}
      ],
      saveLast: false
    }
  }

  renderCity(nation){
    let city = this.state.NATION_INFO.filter(item=>item.name===nation)[0];
    return (
      <Select>
        {
          city.map((item,idx)=>{
            return (
              <Select.Option value={item} key={idx}>{item}</Select.Option>
            )
          })
        }
      </Select>
    )
  }

  handleCheckbox(e) {
    const val = e.target.checked;
    this.setState({
      saveLast: val
    })
  }

  createColumn(option) {
    const {
      form: { getFieldDecorator, getFieldsValue, getFieldValue, setFieldsValue},
    } = this.props;
    let curData = getFieldsValue()['APPLY_LIST'];

    let ret = [
      {
        align: 'center',
        dataIndex: 'id',
        title: <span>id</span>,
        width: 60,
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
        width: 60,
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
      {
        align: 'center',
        dataIndex: 'nation',
        title: <span>目的国家</span>,
        width: 80,
        render: (text, record, index) => {
          return (
            <div>
              <Form.Item>
                {getFieldDecorator(`APPLY_LIST[${index}].nation`, {
                  initialValue: record.nation || '',
                  onChange:()=>{
                    setFieldsValue({[`APPLY_LIST[${index}].city`]:''})
                  }
                })(
                  <Select>
                    {
                      this.state.NATION_INFO.map((nation,idx)=>{
                        return (
                          <Select.Option value={nation.name} key={idx}>{nation.name}</Select.Option>
                        )
                      })
                    }
                  </Select>
                )}
              </Form.Item>
          </div>
          );
        },
      },
      {
        align: 'center',
        dataIndex: 'city',
        title: <span>城市</span>,
        width: 80,
        render: (text, record, index) => {
          let nation=[];
          if(curData&&curData[index].nation){
            nation = this.state.NATION_INFO.filter(item=>item.name===curData[index].nation)[0].list;
          }

          return (
            <div>
              <Form.Item>
                {getFieldDecorator(`APPLY_LIST[${index}].city`, {
                  initialValue: record.city || '',
                })(
                    <Select>
                      {
                        nation.map((item,idx)=>{
                          return (
                            <Select.Option value={item} key={idx}>{item}</Select.Option>
                          )
                        })
                      }
                    </Select>
                  )
                }
              </Form.Item>
          </div>
          );
        },
      }
    ];
    ret.push({
      align: 'center',
      dataIndex: 'oper',
      title: '操作',
      width: 120,
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
    });
  
    return ret;
  };
  
  btnAdd()  {
    this._refApply.onAdd();
  };
  
  btnReset(){
    this._refApply.onReset([{id:'重置后的id',name:'重置后的name'}]);
  }
  
  onTableChange(data){
    this.updateTitle();
  }
  
  updateTitle(){
  }
  componentDidMount(){
    this.updateLog(this.props);
  }
  updateLog(props){
    props=props||this.props;
    const { getFieldsValue } = props.form;
    let curFormData = getFieldsValue();
    let html = prettyPrintJson.toHtml(curFormData)
    this.setState({
      log:html
    })
  }
  componentWillReceiveProps(nextProps){
    // setTimeout(()=>{
      this.updateLog(nextProps)
    // },0)
    
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const {APPLY_LIST, saveLast} = this.state

    return (
      <section>
        
        <Button type='primary'  onClick={this.btnReset.bind(this)} >
          重置表单
        </Button>
        <Button type='primary' onClick={()=>{this._refApply.onAdd()}} >
          添加
        </Button>
         
        <Row>
          <Col span={8}>
            <Checkbox onChange={this.handleCheckbox.bind(this)} value={saveLast}>删除(保留最后一条)</Checkbox>
          </Col>
        </Row>

        <section style={{display:'flex',flexDirection:'row',marginTop:'20px'}}>
          <div style={{width:'300px',border:'1px solid black',marginRight:'20px'}}>
            <span>当前表单数据:</span>
            <pre dangerouslySetInnerHTML={{__html:this.state.log}}></pre>
          </div>

          <Form style={{width:'800px'}}>
            <Form.Item label='标题'> 
              {getFieldDecorator(`TITLE`, {
                initialValue: '默认标题',
              })(<Input type='text' />)}
            </Form.Item>
            
            
            <RcFormTable
              saveLast={saveLast}
              initialValue={APPLY_LIST}
              ref={(_ref) => {
                this._refApply = _ref;
              }}
              form={this.props.form}
              formItemName='APPLY_LIST'
              antTableOptions={{ rowKey: '_rowKey', bordered: true, pagination: false ,scroll:{x:true}}}
              newdata={{
                name: '',
                id:''
              }}
              columns={this.createColumn.bind(this)}
              onChange={this.onTableChange.bind(this)}
            /> 
            <Button type='primary' onClick={()=>{this._refApply.onAdd()}} >
            添加
            </Button>
          </Form>
          

        </section>
      </section>
    );
  }
}
const Demo = Form.create()(CDemo);

ReactDOM.render(<Demo />, document.getElementById("container"));
