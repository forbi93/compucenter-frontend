import {Injectable} from "@angular/core";

export interface Menu{
  state: string,
  name:string,
  type:string,
  icon:string,
  role:string
}

const MENUITEMS = [
  {state:'dashboard',name:'Dashboard',type: 'link',icon: 'dashboard',role:''},
  // {state:'category',name:'Manage Category',type: 'link',icon: 'category',role:'admin'},
  {state:'customer',name:'Administrar Clientes',type: 'link',icon: 'category',role:'admin'},
  {state:'typeroom',name:'Tipo de Cuarto',type: 'link',icon: 'settings',role:'admin'},
  {state:'room',name:'Habitación',type: 'link',icon: 'settings',role:'admin'},
  {state:'reservation',name:'Reservación',type: 'link',icon: 'settings',role:''},
  {state:'reservation-view',name:'Administrar reservaciones',type: 'link',icon: 'backup_table',role:''},
  {state:'user',name:'Administrar Usuario',type: 'link',icon: 'people',role:'admin'},

]

@Injectable()
export class MenuItems{
  getmenuItem():Menu[]{
    return MENUITEMS;
  }
}
