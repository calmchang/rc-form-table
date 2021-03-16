import React from "react";
import { Table } from "antd";




class TableFormItem extends React.Component {
    constructor(props) {
        super(props);
        let initialValue = props.initialValue.map((item,idx)=>{item._rowKey=`${idx}`;return item});
        this.state={
          initialValue:initialValue,
          value:initialValue,
          formName:props.formItemName,
        };
        this.counter = 1;
    }
    getNewId() {
        return `${Date.now()}_${this.counter++}`;
    }
    onCopy = async (record, index, event) => {
        if (event) event.preventDefault();
        const form = this.props.form;
        const {formName}= this.state;
        const { getFieldValue } = form;
        const formData = (getFieldValue(formName) || []);  

        let newdata = null;
        if(this.props.onCopy){
          newdata = this.props.onCopy(record,index);
          if(!newdata)return;
        }else{
          newdata = { ...this.props.newdata };
        }
        newdata = {...formData[index]};
        newdata._rowKey=this.getNewId();

        let newFormData = this.onInsert(newdata,index);
        this.onChange(newFormData);
    };

    onInsert=async (newdata,index)=>{
      const {form} = this.props;
      const { getFieldValue, setFieldsValue } = form;
      const {formName,value}= this.state
      const formData = (getFieldValue(formName) || []);

      if(index>=0){
        formData.splice(index+1,0,newdata);
      }else{
        formData.push(newdata);
      }
      await this.setState({value:[]});
      await setFieldsValue({[formName]:[]})
      await this.setState({value:formData});
      await setFieldsValue({[formName]:formData})
      return formData;
    }

    onAdd = async (record, index, event) => {
      if (event) event.preventDefault();
      
      let newdata = null;
      if(this.props.onAdd){
        newdata = this.props.onAdd(record,index);
        if(!newdata)return;
      }else{
        newdata = { ...this.props.newdata };
      }
      newdata._rowKey=this.getNewId();

      let formData= this.onInsert(newdata,index);
      
      
      this.onChange(formData);

    };

    onDel = async (record, index, event) => {
      if (event) event.preventDefault();
      const {form} = this.props;
      const { getFieldValue, setFieldsValue } = form;
      const {formName}= this.state;
      const formData = (getFieldValue(formName) || []);

      formData.splice(index,1);
      await this.setState({value:[]});
      await setFieldsValue({[formName]:[]})
      await this.setState({value:formData});
      await setFieldsValue({[formName]:formData});
      this.onChange(formData);

    };

    onReset=async(event)=>{
      if (event) event.preventDefault();
      const {form} = this.props;
      const {setFieldsValue } = form;
      const {formName,initialValue}= this.state;
      await this.setState({value:[]});
      await setFieldsValue({[formName]:[]})

      await this.setState({value:initialValue});
      await setFieldsValue({[formName]:initialValue});
    }

    onChange = async (value) => {
      if (this.props.onChange) {
          await this.props.onChange(value);
      }
      if (this.props.onRefresh) {
          this.props.onRefresh(value);
      }
    };

    render() {
        const { value } = this.state;
        return (
            <Table
                {...this.props.antTableOptions}
                dataSource={value}
                columns={this.props.columns({
                    onDel: this.onDel,
                    onAdd: this.onAdd,
                    onCopy: this.onCopy,
                    onReset:this.onReset
                })}
            />
        );
    }
}
export default TableFormItem;
