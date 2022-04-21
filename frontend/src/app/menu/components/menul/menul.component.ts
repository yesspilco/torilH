import { Tipo } from './../../../models/tipo';
import { Component, OnInit } from '@angular/core';
import {jquery} from 'jquery';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {EmpleadosService} from '../../../services/empleados.service'; 


declare var $: any;


@Component({
  selector: 'app-menul',
  templateUrl: './menul.component.html',
  styleUrls: ['./menul.component.css']
})
export class MenulComponent implements OnInit {

  tipo: any;

  constructor(public authService: AuthService,public empleadosService: EmpleadosService) { }

  ngOnInit(): void {
    $('.sidebar-dropdown > a').click(function() {
      $('.sidebar-submenu').slideUp(200);
      if (
        $(this)
          .parent()
          .hasClass('active')
      ) {
        $('.sidebar-dropdown').removeClass('active');
        $(this)
          .parent()
          .removeClass('active');
      } else {
        $('.sidebar-dropdown').removeClass('active');
        $(this)
          .next('.sidebar-submenu')
          .slideDown(200);
        $(this)
          .parent()
          .addClass('active');
      }
    });
    $('#close-sidebar').click(function() {
      $('.page-wrapper').removeClass('toggled');
    });
    $('#show-sidebar').click(function() {
      $('.page-wrapper').addClass('toggled');
    });

    this.tipo=this.authService.getTipo();
    console.log("tipo",this.tipo);

}
}
