import React, { Component } from 'react';
import { Row, Col, Layout, Button } from 'antd';
import { TheContent, TheHeader } from '../../components/layout';
import OficinasList from './OficinasList';
import OficinasForm from './OficinasForm';

export default class Oficinas extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    }
  }

  showModal = () => {
    this.setState({ modalVisible: true });
  }

  handleCancel = () => {
    this.setState({ modalVisible: false });
  }

  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ modalVisible: false });
    });
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  render() {
    return (
        <Layout>
          <TheHeader>
            <Col span={12}>
              <h2> Oficinas </h2>
            </Col>
            <Col span={12} align="right">
              <Button type="primary" onClick={this.showModal}> Nuevo </Button>
            </Col>
          </TheHeader>
          <TheContent>
              <OficinasList/>
              <OficinasForm visible={this.state.modalVisible} onCancel={this.handleCancel} onCreate={this.handleCreate} wrappedComponentRef={this.saveFormRef}/>
          </TheContent>
        </Layout>
    )
  }
}

