import React from "react";
import { Table } from "antd";




class TableFormItem extends React.Component {
    constructor(props) {
        super(props);
        let initialValue = props.initialValue||[];
        initialValue=initialValue.map((item,idx)=>{item._rowKey=`${idx}`;return item});
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
    async onCopy(record, index, event) {
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
    }

    async onInsert(newdata,index){
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

    async onAdd(record, index, event){
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

    }

    async onDel(record, index, event){
      if (event) event.preventDefault();
      const {form, saveLast} = this.props;
      const { getFieldValue, setFieldsValue } = form;
      const {formName}= this.state;
      const formData = (getFieldValue(formName) || []);
      let isLast = formData.length === 1;
      formData.splice(index,1);
      await this.setState({value:[]});
      await setFieldsValue({[formName]:[]})
      await this.setState({value:formData});
      await setFieldsValue({[formName]:formData});
      this.onChange(formData);
      if (saveLast && isLast) {
        await this.onAdd(record, index, event)
      }
    };

    async onReset(initValue,event){
      if (event) event.preventDefault();
      const {form} = this.props;
      const {setFieldsValue } = form;
      const {formName}= this.state;
      const {initialValue} = this.props;
      
      initValue = initValue||initialValue;
      initValue=initValue.map((item,idx)=>{item._rowKey=`${idx}`;return item});

      await this.setState({value:[],initialValue:initValue});
      await setFieldsValue({[formName]:[]})

      await this.setState({value:initValue});
      await setFieldsValue({[formName]:initValue});
    }

    async onChange(value){
      if (this.props.onChange) {
          await this.props.onChange(value);
      }
      if (this.props.onRefresh) {
          this.props.onRefresh(value);
      }
    };

    render() {
        const { value } = this.state;
        const {saveLast} = this.props;
        return (
            <Table
                {...this.props.antTableOptions}
                dataSource={value}
                columns={this.props.columns({
                    onDel: this.onDel.bind(this),
                    onAdd: this.onAdd.bind(this),
                    onCopy: this.onCopy.bind(this),
                    onReset:this.onReset.bind(this)
                })}
            />
        );
    }
}
export default TableFormItem;
