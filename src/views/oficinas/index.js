import React, { Component } from 'react';
import { Layout } from 'antd';
import { TheContent, TheHeader } from '../../components/layout';

export default class Oficinas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
        <Layout>
          <TheHeader>
              <h2> Oficinas </h2>
          </TheHeader>
          <TheContent>
              <span> adssa </span>
          </TheContent>
        </Layout>
    )
  }
}
