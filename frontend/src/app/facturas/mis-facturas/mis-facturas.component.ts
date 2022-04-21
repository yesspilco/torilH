import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from '../../services/empleados.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-mis-facturas',
  templateUrl: './mis-facturas.component.html',
  styleUrls: ['./mis-facturas.component.css']
})
export class MisFacturasComponent implements OnInit {

  msj1: any;
  msj: any;
  dataReserva: any;
  tipo: any;
  dataFactura: any;
  id: any;

  constructor(public empleadosService: EmpleadosService, public authService: AuthService, private router: Router, private route: ActivatedRoute, private modal: NgbModal) { }

  ngOnInit(): void {
    this.tipo = this.authService.getTipo();
    this.id = this.authService.getId();
    if (this.tipo == 3) {
      this.empleadosService.facturasPorCliente(this.id).subscribe(data1 => {
        this.dataFactura = data1;
        console.log("facturas", this.dataFactura);
      });

    } else {
      this.router.navigateByUrl('/inicio');
    }
  }
}

