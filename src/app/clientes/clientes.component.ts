import { ClienteService } from './cliente.service';
import { Component } from '@angular/core';
import { Cliente } from './cliente';
import swal from "sweetalert2";


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent {

  clientes: Cliente[] | undefined;

constructor(private ClienteService: ClienteService){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.ClienteService.getClientes().subscribe(
    clientes => {this.clientes = clientes}

    );
  }

  delete(cliente:Cliente):void{
    swal.fire({
      title: 'Estas seguro de borrar',
      text: `Seguro que desea eliminar ${cliente.nombre} ${cliente.apellido}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ClienteService.delete(cliente.id).subscribe(
          response=>{
        this.clientes=this.clientes?.filter(cli => cli!== cliente)
        swal.fire(
          'Cliente Eliminado!',
          'Tu cliente ha sido eliminado',
          'success'
        )
      }
        )
    }
    })

  }

}
