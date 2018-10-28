import React from 'react';
import { Divider ,Col, Layout, Button,Form, Input,AutoComplete,Dropdown,Icon,Menu,message,Modal,Switch,Tooltip} from 'antd';
import { TheContent, TheHeader } from '../../components/layout';
import PaquetesCliente from './PaquetesCliente';

const FormItem = Form.Item;
const InputGroup = Input.Group;


function onSelect(value) {
    console.log('onSelect', value);
  }

  function handleButtonClick(e) {
    message.info('Click on left button.');
    console.log('click left button', e);
  }
  
  function handleMenuClick(e) {
    message.info('Click on menu item.');
    console.log('click', e);
  }

export default class PaquetesNuevo extends React.Component {

    constructor(props){
        super(props);
        this.state={
            dataSource: [],
            modalRegistro:false,
            modalResumen:false
        }
    }
    //Guardar button
    showModalResumen = () =>{
        this.setState({ modalResumen: true });
    }
    handleCancelResumen = ()=>{
        this.setState({ modalResumen: false });
    }
    handleCreateResumen =() =>{
        
        this.setState({ modalResumen: false });
    }
    //Plus button
    showModalRegistro = () =>{
        this.setState({ modalRegistro: true });
    };
    handleCancel = ()=>{
        this.setState({ modalRegistro: false });
    };
    handleCreate = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
          if (err) {
            return;
          }
          form.resetFields();
          this.setState({ modalRegistro: false });
        });
    };
    saveFormRef = formRef => {
        this.formRef = formRef;
    };

    render(){
        const menu = (
            <Menu onClick={handleMenuClick}>
              <Menu.Item key="1"><Icon type="user" />DNI</Menu.Item>
              <Menu.Item key="2"><Icon type="user" />Pasaporte</Menu.Item>
            </Menu>
        );
        
        return(
            <Layout>
            <TheHeader>
                <Col span={10}>
                <h1> Paquete Nuevo </h1>
                </Col>
            </TheHeader>
            <TheContent>
            <Form layout="vertical">
                <Divider orientation="left">Origen</Divider>
                <InputGroup size="large"> 
                    <Col span={4}>
                    <FormItem label="Pais">
                    </FormItem>
                    </Col>
                    <Col span={5}>
                    <FormItem>
                    <AutoComplete
                        dataSource={this.dataSource}
                        style={{ width: 200 }}
                        onSelect={onSelect}
                        onSearch={this.handleSearch}
                        placeholder="Ingrese el pais"
                    />
                    </FormItem>
                    </Col>
                    <Col span={5}>
                    <FormItem >
                        <Input disabled={true}></Input>
                    </FormItem>
                    </Col>
                </InputGroup>
                <InputGroup size="large"> 
                    <Col span={4}>
                    <FormItem label="Persona">
                    </FormItem>
                    </Col>
                    <Col span={5}>
                    <Dropdown.Button  onClick={handleButtonClick} overlay={menu}>
                        Tipo de Documento
                    </Dropdown.Button>
                    </Col>
                    <Col span={5}>
                    <FormItem>
                        <Input placeholder="N° Documento"></Input>
                    </FormItem>
                    </Col>
                    <Col span={1}>
                    <FormItem >
                        <Tooltip placement="top" title={"Buscar cliente"}>
                        <Button type="primary" shape="circle" icon="search" />
                        </Tooltip>
                    </FormItem>
                    </Col>
                    <Col span={1}>
                    <FormItem >
                        <Tooltip placement="top" title={"Añadir nuevo cliente"}>
                        <Button type="primary" shape="circle" icon="plus" onClick={this.showModalRegistro}/>
                        </Tooltip>
                    </FormItem>
                    </Col>
                </InputGroup>
                <InputGroup size="large">
                    <Col span={4}>
                    </Col>
                    <Col span={10}>
                    <FormItem >
                        <Input disabled={true}></Input>
                    </FormItem>
                    </Col>
                </InputGroup>
                <Divider orientation="left">Destino</Divider>
                <InputGroup size="large"> 
                    <Col span={4}>
                    <FormItem label="Pais">
                    </FormItem>
                    </Col>
                    <Col span={5}>
                    <FormItem>
                    <AutoComplete
                        dataSource={this.dataSource}
                        style={{ width: 200 }}
                        onSelect={onSelect}
                        onSearch={this.handleSearch}
                        placeholder="Ingrese el pais"
                    />
                    </FormItem>
                    </Col>
                    <Col span={5}>
                    <FormItem >
                        <Input disabled={true}></Input>
                    </FormItem>
                    </Col>
                </InputGroup>
                <InputGroup size="large"> 
                    <Col span={4}>
                    <FormItem label="Persona">
                    </FormItem>
                    </Col>
                    <Col span={5}>
                    <Dropdown.Button  onClick={handleButtonClick} overlay={menu}>
                        Tipo de Documento
                    </Dropdown.Button>
                    </Col>
                    <Col span={5}>
                    <FormItem>
                        <Input placeholder="N° Documento"></Input>
                    </FormItem>
                    </Col>
                    <Col span={1}>
                    <FormItem >
                        <Tooltip placement="top" title={"Buscar cliente"}>
                        <Button type="primary" shape="circle" icon="search" />
                        </Tooltip>
                    </FormItem>
                    </Col>
                    <Col span={1}>
                    <FormItem >
                        <Tooltip placement="top" title={"Añadir nuevo cliente"}>
                        <Button type="primary" shape="circle" icon="plus" onClick={this.showModalRegistro}/>
                        </Tooltip>
                    </FormItem>
                    </Col>
                </InputGroup>
                <InputGroup size="large">
                    <Col span={4}>
                    </Col>
                    <Col span={10}>
                    <FormItem >
                        <Input disabled={true}></Input>
                    </FormItem>
                    </Col>
                </InputGroup>
                <Divider orientation="left">Opciones de Notificaciones</Divider>
                    <InputGroup size="large">
                        <Col span={2}><Switch  checkedChildren="Si" unCheckedChildren="No"/></Col>
                        <Col span={10}><FormItem label="Notificar registro del paquete"></FormItem></Col>
                        <Col span={2}><Switch checkedChildren="Si" unCheckedChildren="No"/></Col>
                        <Col span={10}><FormItem label="Notificar llegada a destino del paquete"></FormItem></Col>
                    </InputGroup>
                    <InputGroup size="large">
                        <Col span={2}><Switch checkedChildren="Si" unCheckedChildren="No"/></Col>
                        <Col span={10}><FormItem label="Notificar vuelos abordados por el paquete"></FormItem></Col>
                        <Col span={2}><Switch checkedChildren="Si" unCheckedChildren="No"/></Col>
                        <Col span={10}><FormItem label="Notificar vuelos ?"></FormItem></Col>
                    </InputGroup>
                <Divider ></Divider>
                <Col span={2} align="right"><Button type="primary" onClick={this.showModalResumen}>Guardar</Button></Col>
                <Col span={-2} align="right"><Button >Cancelar</Button></Col>
            </Form>
            <PaquetesCliente
            visible={this.state.modalRegistro}
            onCancel={this.handleCancel}
            onOk={this.handleCreate}
            wrappedComponentRef={this.saveFormRef}
            />
            <Modal
            visible = {this.state.modalResumen}
            onCancel={this.handleCancelResumen}
            onOk={this.handleCreateResumen}
            title="Resumen de Registro de paquete"
            okText="ok"
            cancelText="Cancelar"
            ></Modal>
            </TheContent>
            </Layout>
        )
    }
    
}