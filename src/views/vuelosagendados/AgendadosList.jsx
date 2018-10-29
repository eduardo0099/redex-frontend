import React from "react";
import { Table, Tag, Dropdown, Menu, Icon } from "antd";
import API from "../../Services/Api";
import CrimsonTable from "../../components/CrimsonTable";

const { Column } = Table;

export default class OficinasList extends React.Component {
  constructor(props) {
    super(props);
    this.listRef = React.createRef();
  }

  fetch = () => {
    this.listRef.current.fetch();
  };

  render() {
    const { updateAction } = this.props;
    return (
      <CrimsonTable url="/vuelosagendados" ref={this.listRef} pageSize={5}>
        <Column
          title="Origen"
          key="origen"
          width="25%"
          render={record => (
            <div>
              <span> {record.fechaInicioString} </span>
              <div>
                <b> {record.vuelo.oficinaOrigen.pais.nombre} </b>
              </div>
              <small> {record.vuelo.oficinaOrigen.codigo} </small>
            </div>
          )}
        />
         <Column
          title="Destino"
          key="destino"
          width="25%"
          render={record => (
            <div>
              <span> {record.fechaFinString} </span>
              <div>
                <b> {record.vuelo.oficinaDestino.pais.nombre} </b>
              </div>
              <small> {record.vuelo.oficinaDestino.codigo} </small>
            </div>
          )}
        />
        <Column
          title="Capacidad"
          key="capacidad"
          align="center"
          width="30%"
          render={record => (
            <span>
              {record.capacidadActual}/{record.capacidadMaxima}
            </span>
          )}
        />
        <Column
          title="Estado"
          dataIndex="estado"
          key="estado"
          width="20%"
          align="center"
          render={estado => {
            switch (estado.name) {
              case "CREADO":
                return <Tag color="geekblue"> Creado </Tag>;
              case "INACTIVO":
                return <Tag color="red"> Inactivo </Tag>;
              default:
                return null;
            }
          }}
        />
        <Column
          width="50px"
          title=""
          key="action"
          render={record => {
            const menu = (
              <Menu>
                <Menu.Item>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={updateAction.bind(this, record.id)}
                  >
                    Paquetes
                  </a>
                </Menu.Item>
              </Menu>
            );
            return (
              <Dropdown overlay={menu}>
                <a className="ant-dropdown-link" href="#">
                  <Icon type="setting" theme="outlined" />
                </a>
              </Dropdown>
            );
          }}
        />
      </CrimsonTable>
    );
  }
}
