import React, { Component } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'

const urlGet = 'https://evergreen-finance-back.herokuapp.com/eveergreen/fin/products/get-products'
const urlPost = 'https://evergreen-finance-back.herokuapp.com/eveergreen/fin/products/create-product'
const urlPut = 'https://evergreen-finance-back.herokuapp.com/eveergreen/fin/products/update-product/'
const urlDelete = 'https://evergreen-finance-back.herokuapp.com/eveergreen/fin/products/delete-product/' 

export default class HomePage extends Component {
  state={
    data:[],
    modalInsertar: false,
    modalEliminar: false,
    form:{
      _id: '',
      name: '',
      category: '',
      description: '',
      price: '',
      date: ''
    }
  }
  
  peticionGet=()=>{
  axios.get(urlGet).then(response=>{
    this.setState({data: response.data.body});
  }).catch(error=>{
    console.log(error.message);
  })
  }
  
  peticionPost=async()=>{
    delete this.state.form.id;
   await axios.post(urlPost,this.state.form).then(response=>{
      this.modalInsertar();
      this.peticionGet();
    }).catch(error=>{
      console.log(error.message);
    })
  }
  
  peticionPut=()=>{
    console.log(urlPut+this.state.form._id)
    axios.put(urlPut+this.state.form._id, this.state.form).then(response=>{
      this.modalInsertar();
      this.peticionGet();
    })
  }
  
  peticionDelete=()=>{
    axios.delete(urlDelete+this.state.form._id).then(response=>{
      this.setState({modalEliminar: false});
      this.peticionGet();
    })
  }
  
  modalInsertar=()=>{
    this.setState({modalInsertar: !this.state.modalInsertar});
  }
  
  seleccionarProducto=(product)=>{
    this.setState({
      tipoModal: 'actualizar',
      form: {
        _id: product._id,
        name: product.name,
        category: product.category,
        description: product.description,
        price: product.price,
        date: product.date
      }
    })
  }
  
  handleChange=async e=>{
  e.persist();
  await this.setState({
    form:{
      ...this.state.form,
      [e.target.name]: e.target.value
    }
  });
  console.log(this.state.form);
  }
  
    componentDidMount() {
      this.peticionGet();
    }
    
  
    render(){
      const {form}=this.state;
    return (
      <div className="HomePage">
      <br /><br /><br />
    <button className="btn btn-success" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Add Product</button>
    <br /><br />
      <table className="table ">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Description</th>
            <th>Price</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {this.state.data.map(product=>{
            return(
              <tr>
              <td>{product._id}</td> 
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.description}</td>
              <td>{new Intl.NumberFormat("en-EN").format(product.price)}</td>
              <td>{product.date}</td> 
            <td>
                  <button className="btn btn-primary" onClick={()=>{this.seleccionarProducto(product); this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                  {"   "}
                  <button className="btn btn-danger" onClick={()=>{this.seleccionarProducto(product); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
                  </td>
            </tr>
            )
          })}
        </tbody>
      </table>
  
  
  
      <Modal isOpen={this.state.modalInsertar}>
                  <ModalHeader style={{display: 'block'}}>
                    <span style={{float: 'right'}} onClick={()=>this.modalInsertar()}>x</span>
                  </ModalHeader>
                  <ModalBody>
                    <div className="form-group">
                      <label htmlFor="id">ID</label>
                      <input className="form-control" type="int" name="id" id="id" readOnly onChange={this.handleChange} value={form?form._id: this.state.data.length+1}/>
                      <br />
                      <label htmlFor="nombre">Name</label>
                      <input className="form-control" type="text" name="name" id="name" onChange={this.handleChange} value={form?form.name: ''}/>
                      <br />
                      <label htmlFor="nombre">Category</label>
                      <input className="form-control" type="text" name="category" id="category" onChange={this.handleChange} value={form?form.category: ''}/>
                      <br />
                      <label htmlFor="nombre">Description</label>
                      <input className="form-control" type="text" name="description" id="description" onChange={this.handleChange} value={form?form.description: ''}/>
                      <br />
                      <label htmlFor="capital_bursatil">Price</label>
                      <input className="form-control" type="text" name="price" id="price" onChange={this.handleChange} value={form?form.price:''}/>
                      <br />
                      <label htmlFor="nombre">date</label>
                      <input className="form-control" type="text" name="date" id="date" onChange={this.handleChange} value={form?form.date: ''}/>
                    </div>
                  </ModalBody>
  
                  <ModalFooter>
                    {this.state.tipoModal==='insertar'?
                      <button className="btn btn-success" onClick={()=>this.peticionPost()}>
                      Add
                    </button>: <button className="btn btn-primary" onClick={()=>this.peticionPut()}>
                      Update
                    </button>
    }
                      <button className="btn btn-danger" onClick={()=>this.modalInsertar()}>Cancel</button>
                  </ModalFooter>
            </Modal>
  
  
            <Modal isOpen={this.state.modalEliminar}>
              <ModalBody>
                Are you sure you want to delete the product {form && form.name} ?
              </ModalBody>
              <ModalFooter>
                <button className="btn btn-danger" onClick={()=>this.peticionDelete()}>Yeah baby</button>
                <button className="btn btn-secundary" onClick={()=>this.setState({modalEliminar: false})}>:p</button>
              </ModalFooter>
            </Modal>
    </div>
  
  
  
    );
  }
}