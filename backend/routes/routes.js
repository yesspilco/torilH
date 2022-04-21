'use strict'

var express=require('express');

var EmpleadoController= require('../controllers/empleados-controllers');
var ClienteController= require('../controllers/clientes-controllers');
var AuthController= require('../controllers/auth-controllers');
var TipoController = require('../controllers/tipos-controllers');
var CabaniaController =require('../controllers/cabanias-controllers');
var ServicioController =require('../controllers/servicios-controllers');
var SalonesController= require('../controllers/salones-controllers');
var ReservacionDetalle= require('../controllers/reservacionDetalle-controllers');
var Reservacion= require('../controllers/reservacion-controllers');
var ReservTemp= require('../controllers/reservaTemp-controllers');
var Hosteria= require('../controllers/hosteria-controllers');
var Factura= require('../controllers/factura-controllers');
var Pago= require('../controllers/pago-controllers');
var OtroServicio= require('../controllers/otrosServicios-controllers');
var Provincia=require('../controllers/provincia-controllers')
var api=express.Router();


 api.post('/crearProvincia',Provincia.createProvincias);
 api.get('/listaProvincias',Provincia.listaProvincias);
 
api.post('/hosteria',Hosteria.crearHosteria);
api.get('/datosHosteria',Hosteria.datosHosteria);
api.get('/obtenerHosteria/:id',Hosteria.obtenerHosteria);
api.post('/modificarHosteria/:id',Hosteria.modificarHosteria);


//Rutas para empleados
api.post('/loginEmpleados',EmpleadoController.loginEmpleados);
api.post('/registroEmpleado',EmpleadoController.crearEmpleado);
api.post('/registroAdmin',EmpleadoController.registroAdmin);
api.get('/listaEmpleados',EmpleadoController.listarEmpleados);
api.get('/obtenerEmpleado/:id',EmpleadoController.obtenerEmpleado);
api.post('/modificarEmpleado/:id', EmpleadoController.modificarEmpleado);
api.get('/buscarEmpleado/:valor',EmpleadoController.buscarEmpleado);
api.get('/eliminarEmpleado/:id', EmpleadoController.eliminarEmpleado);
api.get('/empleadosInactivos', EmpleadoController.empleadosInactivos);
api.get('/activarEmpleado/:id', EmpleadoController.activarEmpleado);
api.get('/numeroEmpleados',EmpleadoController.numeroEmpleados);

//Rutas para clientes
api.post('/loginCliente',AuthController.loginCliente);//login del cliente
api.post('/registro',AuthController.crearCliente);
api.get('/listaClientes',ClienteController.listarClientes);
api.get('/obtenerCliente/:id',ClienteController.obtenerCliente)//obtiene un cliente dado su id
api.post('/modificarCliente/:id',ClienteController.modificarCliente);
api.get('/buscarCliente/:valor',ClienteController.buscarCliente);
api.get('/eliminarCliente/:id', ClienteController.eliminarCliente);
api.get('/clientesInactivos',ClienteController.clientesInactivos);
api.get('/activarCliente/:id',ClienteController.activarCliente);
api.get('/obtenerClienteCedula/:cedula',ClienteController.obtenerClienteCedula);
api.get('/verificarClienteEliminar/:id', ClienteController.verificarClienteEliminar);
api.get('/numeroClientes',ClienteController.numeroClientes);

//Rutas para el tipo de caba;a
api.post('/registroTipo',TipoController.registrarTipo);
api.get('/listarTipos',TipoController.listarTipos);
api.get('/obtenerTipo/:id', TipoController.obtenerTipo);
api.post('/modificarTipo/:id', TipoController.modificarTipo);
api.get('/eliminarTipo/:id',TipoController.eliminarTipo);
api.get('/listarTiposTodos',TipoController.listarTiposTodos);
api.get('/tiposyCabanias',TipoController.TiposyCabanias);
api.post('/crearImgTipo',TipoController.createImgTipo);

//Rutas para las cabanias
api.post('/registroCabania', CabaniaController.registrarCabania);
api.get('/listaCabanias', CabaniaController.listarCabanias);
api.get('/obtenerCabania/:id', CabaniaController.obtenerCabania);
api.post('/modificarCabania/:id', CabaniaController.modificarCabania);
api.get('/cabaniasDisponiblesActual', CabaniaController.cabaniasDisponiblesActual); //disponibles a la fecha actual
api.get('/cabaniasOcupadasActual',CabaniaController.cabaniasOcupadasActual);//ocupadas a la fecha actual
api.get('/cabaniasPorTipo',CabaniaController.cabaniasPorTipo);
api.get('/cabaniasInactivas', CabaniaController.cabaniasInactivas);
api.get('/cabaniasDisponiblesAhora',CabaniaController.cabaniasDisponiblesAhora);
api.get('/cabaniasDisponiblesFecha',CabaniaController.cabaniasDisponiblesFecha);

//Rutas para los servicio
api.post('/registroServicio', ServicioController.registrarServicio);
api.post('/modificarServicio/:id', ServicioController.modificarServicio);
api.get('/eliminarServicio/:id', ServicioController.eliminarServicio);
api.get('/activarServicio/:id', ServicioController.activarServicio);
api.get('/modificarServicioDisponible/:id',ServicioController.modificarServicioDisponible);
api.get('/modificarServicioOcupada/:id',ServicioController.modificarServicioOcupada);

//Rutas para los salones
api.post('/registroSalon',SalonesController.registrarSalones);
api.get('/listarSalones', SalonesController.listarSalones);
api.get('/obtenerSalon/:id', SalonesController.obtenerSalon);
api.post('/modificarSalon/:id', SalonesController.modificarSalon);
api.get('/salonesDisponiblesActual',SalonesController.salonesDisponiblesActual);//disponibles a la fecha actual
api.get('/salonesOcupadosActual',SalonesController.salonesOcupadosActual);//ocupados a la fecha actual
api.get('/salonesInactivos', SalonesController.salonesInactivos);


//otros servicios
api.post('/registroOtroServicio',OtroServicio.registrarOtroServicio);
api.get('/listarOtroServicio',OtroServicio.listarOtrosServicios);
api.get('/obtenerOtroServicio/:id', OtroServicio.obtenerOtroServicio);
api.post('/modificarOtroServicio/:id', OtroServicio.modificarOtroServicio);

//ReservaTemporal
api.post('/ReservaTemporal', ReservTemp.reservaTemp);
api.get('/listaReservaTemp', ReservTemp.listarReservaTemp);
api.get('/eliminarReservaTemp', ReservTemp.EliminarReservaTemp);
api.get('/quitarReservaTemp/:id',ReservTemp.quitarReservaTemp);
api.get('/verificarRepetido/:id', ReservTemp.verificarRepetido);



//Reservaciones
api.post('/reservar',Reservacion.crearReservacion);
api.get('/reservaPorId',Reservacion.reservaPorId);
api.get('/reservaPorCliente',Reservacion.reservaPorCliente);
api.get('/reservaClientePendiente/:id',Reservacion.reservaClientePendiente);
api.get('/reservaClienteAceptada/:id',Reservacion.reservaClienteAceptada);
api.get('/reservacionesPendientes',Reservacion.reservacionesPendientes);
api.get('/reservacionesAceptadas',Reservacion.reservacionesAceptadas);
api.get('/reservacionesCanceladas',Reservacion.reservacionesCanceladas);
api.get('/reservacionesRealizadas',Reservacion.reservacionesRealizadas);
api.get('/confirmarReservacion/:id',Reservacion.confirmarReserva);
api.get('/cancelarReservacion/:id',Reservacion.cancelarReserva);
api.get('/reservaHoy',Reservacion.ReservaHoy);
api.get('/cambiarEstadoRealizada/:id',Reservacion.cambiarEstadoRealizada);
api.get('/reservaPorFechas',Reservacion.ReservaPorFechas);
api.get('/listarReservaciones',Reservacion.listarReservaciones);
api.get('/reservaFuturo',Reservacion.ReservaFuturo);
api.get('/reservaProvincia',Reservacion.reservacionesProvincia);


//Detalle Reservaciones
api.post('/detalleReserva',ReservacionDetalle.crearReservacionDetalle);
api.post('/cambiarEstadoServicio', ReservacionDetalle.cambiarEstadoServicio);
api.get('/obtenerDetalleReservacion', ReservacionDetalle.obtenerDetalleReservacion);

//pago
api.post('/registrarPago',Pago.crearPago);
api.get('/obtenerPago',Pago.obtenerPago);

//Facturas
api.post('/crearFactura',Factura.crearFactura);
api.get('/listarFacturas',Factura.listarFacturas);
api.get('/listarFacturasPagadas',Factura.listarFacturasPagadas);
api.get('/facturasPorId',Factura.facturasPorId);
api.get('/facturasPorCliente',Factura.facturasPorCliente);
api.get('/ultimaFactura',Factura.ultimaFactura);
api.get('/facturasPorFechas',Factura.facturasPorFechas);

//reportes
api.get('/clientesReservaPendiente',Reservacion.clientesReservaPendiente);
api.get('/clientesReservaAceptada',Reservacion.clientesReservaAceptada);
api.get('/clientesReservaCancelada',Reservacion.clientesReservaCancelada);
api.get('/clientesReservaRealizada',Reservacion.clientesReservaRealizada);
api.get('/primeros20Clientes',ClienteController.primeros20Clientes);
api.get('/reporteClientes',ClienteController.reporteClientes);
api.get('/reporteClientesPendientes',ClienteController.reporteClientesPendientes);



async function verifyToken(req, res, next) {
	try {
		if (!req.headers.authorization) {
			return res.status(401).send('Unauhtorized Request');
		}
		let token = req.headers.authorization.split(' ')[1];
		if (token === 'null') {
			return res.status(401).send('Unauhtorized Request');
		}

		const payload = await jwt.verify(token, 'secretkey123456');
		if (!payload) {
			return res.status(401).send('Unauhtorized Request');
		}
		req.userId = payload._id;
		next();
	} catch(e) {
		//console.log(e)
		return res.status(401).send('Unauhtorized Request');
	}
}


module.exports=api;