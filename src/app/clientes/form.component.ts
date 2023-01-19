import { ClienteService } from './cliente.service';
import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ActivatedRoute, Router } from '@angular/router';
import swal from "sweetalert2";
import { ThisReceiver } from '@angular/compiler';



@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
  
})
export class FormComponent implements OnInit{

public cliente:Cliente=new Cliente();

public titulo:string =" Crear Cliente"

constructor(private ClienteService:ClienteService,private router:Router, private activatedRoute:ActivatedRoute){}

  ngOnInit(){
    this.cargarCliente()
  }
  
  cargarCliente():void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.ClienteService.getCliente(id).subscribe((cliente) => this.cliente = cliente)
      }
    })

  }

public create():void{

  this.ClienteService.create(this.cliente).subscribe(
    cliente => 
    {
      this.router.navigate(['/clientes'])
      swal.fire('Nuevo Cliente', `Cliente ${this.cliente.nombre}  creado con exito`, 'success')
  }
  )
}

public update():void{

  this.ClienteService.update(this.cliente).subscribe(
    
    cliente =>{
    this.router.navigate(['/clientes'])
    swal.fire('Cliente actualizado',`Cliente ${this.cliente.nombre}actualizado con exito`, 'success')
}
)
}
}
