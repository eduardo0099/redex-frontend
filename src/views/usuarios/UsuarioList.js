import React from 'react';
import { Table, Menu, Dropdown, Icon,Modal} from 'antd';
import API from '../../Services/Api';

const { Column } = Table;

const confirm = Modal.confirm;
  
export default class UsuarioList extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      usuarios: [],
      loading: false,
    }

  }

  componentDidMount() {
    this.list();
  }

  list = () => {
    this.setState({...this.state, loading: true}, () => {
      API.get('usuarios')
        .then(response => {
          this.setState({...this.state, usuarios: response.data, loading: false});
      });
    });
  }

  showConfirmDesactivar=(record)=> {
    confirm({
      title: 'Usted desea desactivar a este usuario?',
      content: 'Si usted desactiva al usuario, este no tendra acceso al sistema',
      onCancel() {
        console.log('Cancelar');
      },
      onOk() {
        console.log('OK');
      },
    });
  }
  
  showConfirmActivar=(record)=> {
    confirm({
      title: 'Usted desea activar a este usuario?',
      content: 'Si usted activa al usuario, este tendra acceso al sistema',
      onCancel() {
        console.log('Cancelar');
      },
      onOk() {
        console.log('OK');
      },
    });
  }

  editarUsuario=(record)=>{

  }

    render(){
        return (
            <Table dataSource={this.state.usuarios} loading={this.state.loading}>
              <Column
                title="Nombres"
                key="nombres"
                render={record=>(
                  <div>
                  <span> { record.colaborador.persona.nombres } </span>
                  </div>
                )}
              />
              <Column
                title="Apellido"
                key="lastName"
                render={record=>(
                  <div>
                  <span> { record.colaborador.persona.paterno } </span>
                  </div>
                )}
              />
            <Column
              title="Doc Identidad"
              key="docId"
              render={record=>(
                <div>
                <span> { record.colaborador.persona.numeroDocumentoIdentidad } </span>
                </div>
              )}
            />
            <Column
              title="Oficina"
              key="office"
              render={record=>(
                <div>
                <span> { record.colaborador.oficina.codigo } </span>
                </div>
              )}
            />
            <Column
              title="Email"
              key="email"
              render={record=>(
                <div>
                <span> { record.colaborador.persona.email } </span>
                </div>
              )}
            />
            <Column
              width="50px"
              title=""
              key="action"
              render={ record => { 
                const menu = (
                  <Menu>
                    {
                      record.estado.name === 'ACTIVO' ? 
                      ( 
                        <Menu.Item>
                        <a target="_blank" rel="noopener noreferrer" onClick={this.showConfirmDesactivar.bind(this, record)}> Desactivar</a> 
                        </Menu.Item>
                       ) :
                      ( <Menu.Item>
                        <a target="_blank" rel="noopener noreferrer" onClick={this.showConfirmActivar.bind(this, record)}> Activar</a> 
                        </Menu.Item>)
                    }

                    {
                      record.estado.name === 'ACTIVO' ? 
                      ( 
                        <Menu.Item>
                        <a target="_blank" rel="noopener noreferrer" onClick={this.editarUsuario.bind(this, record)}> Editar</a> 
                        </Menu.Item>
                        ) :
                      ( null )
                    }

                  </Menu>
                );
                return (
                  <Dropdown overlay={menu}>
                  <a className="ant-dropdown-link" href="#">
                    <Icon type="setting" theme="outlined" />
                  </a>
                </Dropdown>
              )}}
            />
          </Table>
        )
    }
}

