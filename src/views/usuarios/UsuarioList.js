import React from "react";
import { Table, Menu, Dropdown, Icon, Modal, Tag, message } from "antd";
import API, { getFile } from "../../Services/Api";
import CrimsonTable from "../../components/CrimsonTable";
import notify from "../../utils/notify";
import MenuItem from "antd/lib/menu/MenuItem";

const { Column } = Table;

const confirm = Modal.confirm;

export default class UsuarioList extends React.Component {
  constructor(props) {
    super(props);
    this.listRef = React.createRef();
  }

  componentWillMount() {
    API.get("/usuarios/yo").then(response => {
      console.log(response.data);
      this.setState({
        ds: response.data
      });
    });
  }

  fetch = () => this.listRef.current.fetch();
  saveFormRef = listRef => {
    this.listRef = listRef;
  };
  showConfirmDesactivar = record => {
    confirm({
      title: "Usted desea desactivar a este usuario?",
      content:
        "Si usted desactiva al usuario, este no tendrá acceso al sistema",
      onCancel() {},
      onOk: () => {
        this.desactivar(record.id);
      }
    });
  };

  showConfirmActivar = record => {
    confirm({
      title: "Usted desea activar a este usuario?",
      content: "Si usted activa al usuario, este tendrá acceso al sistema",
      onCancel() {},
      onOk: () => {
        this.activar(record.id);
      }
    });
  };

  activar = id => {
    API.post(`/usuarios/${id}/activar`)
      .then(response => {
        notify.success({ message: "Se activo al usuario correctamente" });
        this.fetch();
      })
      .catch(eror => {
        notify.error({
          message: "No se pudo activar al usuario"
        });
      });
  };

  desactivar = id => {
    API.post(`/usuarios/${id}/desactivar`)
      .then(response => {
        notify.success({ message: "Se desactivo al usuario correctamente" });
        this.fetch();
      })
      .catch(error => {
        notify.error({
          message: "No se pudo desactivar al usuario"
        });
      });
  };

  emitirReporte = id => {
    const hide = message.loading('Generando archivo...', 0);
    API.get(`/reportes/paquetesXusuario`, {
      params: { idUsuario: id },
      responseType: "arraybuffer"
    })
      .then(response => {
        getFile(response);
        notify.success({
          message:
            "Se emitio el reporte de registro de paquetes del usuario correctamente"
        });
        hide();
      })
      .catch(error => {
        hide();
        notify.error({
          message:
            "No se pudo emitir el reporte de registro de paquetes del usuario"
        });
      });
  };

  render() {
    const { onDetalle } = this.props;
    return (
      <CrimsonTable url="/usuarios" ref={this.listRef}>
        <Column
          title="Persona"
          key="nombres"
          render={record => (
            <div>
              <div>
                <b> {record.colaborador.persona.nombreCompleto} </b>
              </div>
              <small>
                {" "}
                {record.colaborador.persona.tipoDocumentoIdentidad.simbolo}{" "}
                {record.colaborador.persona.numeroDocumentoIdentidad}{" "}
              </small>
            </div>
          )}
        />
        <Column
          title="Rol"
          key="rol"
          render={record => <span> {record.rol.nombre} </span>}
        />
        <Column
          title="Oficina"
          key="office"
          render={record => (
            <div>
              <div>
                <b> {record.colaborador.oficina.pais.nombre} </b>
              </div>
              <small> {record.colaborador.oficina.codigo}</small>
            </div>
          )}
        />
        <Column
          title="Email"
          key="email"
          render={record => (
            <div>
              <span> {record.colaborador.persona.email} </span>
            </div>
          )}
        />
        <Column
          title="Teléfono"
          key="telefono"
          render={record => (
            <div>
              <span> {record.colaborador.telefono} </span>
            </div>
          )}
        />
        <Column
          title="Estado"
          key="estado"
          render={record => {
            switch (record.estado.name) {
              case "ACTIVO":
                return <Tag color="green"> Activo </Tag>;
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
                {record.estado.name === "ACTIVO" ? (
                  <Menu.Item>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => onDetalle(record.id)}
                    >
                      {" "}
                      Editar
                    </a>
                  </Menu.Item>
                ) : null}
                {record.estado.name === "ACTIVO" ? (
                  <Menu.Item>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={this.showConfirmDesactivar.bind(this, record)}
                    >
                      {" "}
                      Desactivar
                    </a>
                  </Menu.Item>
                ) : (
                  <Menu.Item>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={this.showConfirmActivar.bind(this, record)}
                    >
                      {" "}
                      Activar
                    </a>
                  </Menu.Item>
                )}

                {record.estado.name === "ACTIVO" ? <Menu.Divider /> : null}
                {record.estado.name === "ACTIVO" ? (
                  <Menu.Item>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => this.emitirReporte(record.id)}
                    >
                      {" "}
                      Auditoría{" "}
                    </a>
                  </Menu.Item>
                ) : null}
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
