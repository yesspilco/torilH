"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ReservarsalonesComponent = void 0;
var core_1 = require("@angular/core");
var detalle_1 = require("../../models/detalle");
var forms_1 = require("@angular/forms");
var ReservarsalonesComponent = /** @class */ (function () {
    function ReservarsalonesComponent(empleadosService, authService, router, route, formBuilder) {
        this.empleadosService = empleadosService;
        this.authService = authService;
        this.router = router;
        this.route = route;
        this.formBuilder = formBuilder;
        this.h = 0;
        this.rep = 2;
        this.id = 0;
        this.slides = [[]];
    }
    ReservarsalonesComponent.prototype.chunk = function (dataSalones, chunkSize) {
        console.log("array", dataSalones);
        var R = [];
        for (var i = 0, len = dataSalones.length; i < len; i += chunkSize) {
            R.push(dataSalones.slice(i, i + chunkSize));
        }
        return R;
    };
    ReservarsalonesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.res = 0;
        this.FechaFin = new Date();
        this.FechaInicio = new Date();
        this.bandera = 0;
        this.tipo = this.authService.getTipo();
        this.bandera = 0;
        if (this.dataServicios != null) {
            this.val = 1;
        }
        else {
            this.val = 0;
        }
        this.empleadosService.eliminarReservaTemporal().subscribe(function (data) {
        });
        this.empleadosService.salonesDisponiblesActual().subscribe(function (data) {
            _this.dataSalones = data;
            console.log("salones", _this.dataSalones);
            _this.slides = _this.chunk(_this.dataSalones, 2);
            console.log("slides", _this.slides);
        });
        this.facturaform = new forms_1.FormGroup({
            Detalle: new forms_1.FormArray([
                this.initDetalle(),
            ])
        });
    };
    ReservarsalonesComponent.prototype.initDetalle = function () {
        return new forms_1.FormGroup({
            Descripcion: new forms_1.FormControl(null),
            Cantidad: new forms_1.FormControl(null),
            VUnitario: new forms_1.FormControl(null),
            VTotal: new forms_1.FormControl(null)
        });
    };
    ReservarsalonesComponent.prototype.addDetalle = function () {
        var control = this.facturaform.controls['Detalle'];
        control.push(this.initDetalle());
    };
    ReservarsalonesComponent.prototype.removeDetalle = function (i) {
        var control = this.facturaform.controls['Detalle'];
        control.removeAt(i);
    };
    ReservarsalonesComponent.prototype.getDetalle = function (form) {
        return form.get('Detalle').controls;
    };
    ReservarsalonesComponent.prototype.resetForm = function (form) {
        if (form) {
            form.reset();
            this.empleadosService.selectedDetalle = new detalle_1.Detalle();
        }
    };
    ReservarsalonesComponent.prototype.buscarCliente = function () {
        var _this = this;
        var num1 = (document.getElementById("cedula").value);
        console.log("cedula enviada", num1);
        this.authService.obtenerClienteCedula(num1).subscribe(function (data) {
            if (data.length != 0) {
                _this.dataCliente = data;
                console.log("datos del cliente", _this.dataCliente);
                _this.bandera = 1;
            }
        });
    };
    ReservarsalonesComponent.prototype.buscarPorFechas = function () {
        this.FechaInicio = (document.getElementById("fechai").value);
        this.FechaFin = (document.getElementById("fechaf").value);
        console.log("fecha inicio", this.FechaInicio);
        console.log("fecha fin", this.FechaFin);
    };
    ReservarsalonesComponent.prototype.AgregarServicio = function (idservicio, nombre, idsalon, precio, huespedes) {
        this.total = 0;
        var subtotal = 0;
        subtotal = precio;
        this.dataServicios = ({
            idservicio: idservicio,
            nombre: nombre,
            tipo: 1,
            precio: precio,
            huespedes: huespedes,
            subtotal: subtotal,
            idcabania: idsalon,
            idtipo: 1,
            dias: 1
        });
        console.log("servicios", this.dataServicios);
        this.verificarRepetido(this.dataServicios.idservicio);
    };
    ReservarsalonesComponent.prototype.verificarRepetido = function (id) {
        var _this = this;
        console.log("id servicio", id);
        this.empleadosService.verificarRepetido(id).subscribe(function (res) {
            if (res == null) {
                _this.Agregar(_this.dataServicios);
                _this.res = 1;
                _this.Calculartotal();
                _this.router.navigateByUrl('/reservaciones/reservarsalones#profile');
            }
            else {
                _this.msj1 = 'Salón ya seleccionado';
                _this.Calculartotal();
            }
        });
        return this.rep;
    };
    ReservarsalonesComponent.prototype.Agregar = function (data) {
        var _this = this;
        this.val = 0;
        this.empleadosService.reservaTemporal(data).subscribe(function (datan) {
            _this.router.navigateByUrl('/reservaciones/reservarsalones');
        });
    };
    ReservarsalonesComponent.prototype.eliminar = function (_id) {
        var _this = this;
        console.log("id a eliminar", _id);
        this.empleadosService.quitarReservaTemporal(_id).subscribe(function (data) {
            _this.val = 0;
            _this.empleadosService.eliminarReservaTemporal().subscribe(function (data) {
            });
            _this.Calculartotal();
            _this.router.navigateByUrl('/reservaciones/reservarsalones#profile');
        });
    };
    ReservarsalonesComponent.prototype.totales = function () {
        var item;
        var n;
        item = document.getElementsByClassName("itemTotalNeto");
        for (var i = 0; i < item.length; i++) {
            item[i].addEventListener('change', function () {
            });
            console.log("valor de n", n.value);
        }
    };
    ReservarsalonesComponent.prototype.Calculartotal = function () {
        var _this = this;
        this.total = 0;
        this.empleadosService.listaReservaTemporal().subscribe(function (data1) {
            if (data1.length > 0) {
                _this.dataReserva = data1; //this.facturaform.controls['Servicio'].setValue(data1.body.data.servicio);
                console.log("data Reserva", data1);
                for (var i = 0; i < data1.length; i++) {
                    _this.total = _this.total + data1[i].subtotal;
                    _this.personas = data1[i].huespedes;
                    _this.preciop = data1[i].precio;
                    _this.subt = data1[i].subtotal;
                    _this.dias = data1[i].dias;
                }
            }
        });
    };
    ReservarsalonesComponent.prototype.onSearchChangeP = function (searchValue) {
        var p = parseInt(searchValue);
        this.subt = p;
        this.total = this.subt;
    };
    ReservarsalonesComponent.prototype.onSearchChangeC = function (searchValue) {
        var c = parseInt(searchValue);
        console.log("Cantidad", c);
        this.cantidad = c;
        this.totaldetalle = 0;
    };
    ReservarsalonesComponent.prototype.onSearchChangeV = function (searchValue) {
        var p = parseInt(searchValue);
        console.log("valor unitario", p);
        this.vunitario = p;
        this.totaldetalle = this.cantidad * this.vunitario;
        console.log("valor total", this.totaldetalle);
        console.log("detalle");
        this.facturaform.setValue({ VTotal: this.totaldetalle });
        //const control = <FormArray>this.facturaform.controls['Detalle.VTotal'];
        //control.push(this.totaldetalle);
        //this.facturaform.controls['Detalle.VTotal'].setValue(this.totaldetalle);
        //this.facturaform.get('Detalle.VTotal').value(this.totaldetalle);
        //this.facturaform.get(['Detalle']['VTotal']).setValue(this.totaldetalle);
    };
    ReservarsalonesComponent.prototype.AddReservacion = function (form) {
        console.log(form.value);
        this.empleadosService.reservaTemporal(form.value)
            .subscribe(function (res) {
            //console.log(res);
        });
    };
    ReservarsalonesComponent.prototype.AddFactura = function (form) {
        var _this = this;
        console.log(form.value);
        this.empleadosService.reservaTemporal(form.value)
            .subscribe(function (res) {
            //console.log(res);
            _this.resetForm(form);
        });
    };
    ReservarsalonesComponent.prototype.Reservar = function () {
        var _this = this;
        var f = new Date();
        var idreserva;
        if (this.tipo == 1 || this.tipo == 2) {
            this.cliente = this.dataCliente[0]._id;
        }
        else if (this.tipo == 3) {
            this.cliente = this.authService.getId();
        }
        if (this.FechaFin == f && this.FechaInicio == f) {
            this.FechaFin = f;
            this.FechaInicio = f;
        }
        this.dataReservacion = ({
            cliente: this.cliente,
            fechaR: f,
            Finicio: this.FechaInicio,
            Ffin: this.FechaFin,
            total: this.total,
            dias: this.dias
        });
        console.log("datos de la reservacion", this.dataReservacion);
        this.empleadosService.reservar(this.dataReservacion).subscribe(function (res) {
            if (res != null) {
                console.log("devolucion id", res);
                idreserva = res;
                _this.empleadosService.listaReservaTemporal().subscribe(function (data1) {
                    _this.dataReserva = data1;
                    for (var i = 0; i < data1.length; i++) {
                        _this.dataDetalle = ({
                            reserva: res,
                            servicio: data1[i].idservicio,
                            vpersona: data1[i].precio,
                            cantidad: data1[i].huespedes,
                            subtotal: data1[i].subtotal
                        });
                        _this.empleadosService.detalleReserva(_this.dataDetalle).subscribe(function (res1) {
                            if (res1 != null) {
                                console.log("reservaRealizada", i);
                            }
                        });
                    }
                    _this.router.navigateByUrl('/inicio');
                });
            }
        });
    };
    ReservarsalonesComponent = __decorate([
        core_1.Component({
            selector: 'app-reservarsalones',
            templateUrl: './reservarsalones.component.html',
            styleUrls: ['./reservarsalones.component.css']
        })
    ], ReservarsalonesComponent);
    return ReservarsalonesComponent;
}());
exports.ReservarsalonesComponent = ReservarsalonesComponent;
