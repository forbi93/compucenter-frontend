import {Injectable} from "@angular/core";

export interface Menu{
  state: string,
  name:string,
  type:string,
  icon:string,
  role:string
}

const MENUITEMS = [
  // {state:'dashboard',name:'Dashboard',type: 'link',icon: 'dashboard',role:''},
  // {state:'category',name:'Manage Category',type: 'link',icon: 'category',role:'admin'},
  {state:'customer',name:'Clientes',type: 'link',icon: 'category',role:''},
  {state:'product',name:'Productos',type: 'link',icon: 'category',role:''},
  // {state:'typeroom',name:'Tipo de Cuarto',type: 'link',icon: 'settings',role:''},
  // {state:'room',name:'Habitación',type: 'link',icon: 'settings',role:''},
  // {state:'reservation',name:'Reservación (Boleta)',type: 'link',icon: 'settings',role:''},
  // {state:'reservation-view',name:'Reservaciones (Boleta',type: 'link',icon: 'backup_table',role:''},
  // {state:'reservation-ruc',name:'Reservación (Factura)',type: 'link',icon: 'settings',role:''},
  // {state:'reservation-view-ruc',name:'Reservaciones (Factura)',type: 'link',icon: 'backup_table',role:''},
  // {state:'user',name:'Administrar Usuario',type: 'link',icon: 'people',role:''},
  {state:'sale',name:'Generar Venta',type: 'link',icon: 'people',role:''},
  {state:'view-sale',name:'Ventas',type: 'link',icon: 'people',role:''},


]

@Injectable()
export class MenuItems{
  getmenuItem():Menu[]{
    return MENUITEMS;
  }
}
