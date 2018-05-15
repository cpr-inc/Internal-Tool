import { Component } from '@angular/core';
import { TodoTableDateList } from './shared/const/TodoTableData'
import { NotificationsList } from './shared/const/Notifications'
declare var $: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  NotificationsList = NotificationsList

  newdata = []

  TableDateList=TodoTableDateList

  constructor() { 
    //newバッチ暫定的に定義
    for(let i of this.TableDateList){
      this.newdata.push(false)
    }
    this.newdata[3]=true
    this.newdata[4]=true
    this.newdata[5]=true
  }

  SetNotifyClass(index: number){
    return 'icon-circle ' + this.NotificationsList[index].classname
  }

  // content: string = "故障情報一覧"
  content: string = "業務月報"


  LeftNavItems = [
    {name: '業務月報', icon: 'assignment', active: true},
    {name: '交通費精算', icon: 'train', active: false},
    {name: 'TODOリスト', icon: 'event_available', active: false},
    {name: 'ドキュメント', icon: 'get_app', active: false},
    // {name: 'ユーザ一覧', icon: 'people', active: false},
    // {name: 'ログインユーザ一覧', icon: 'airplay', active: false},
  ]

  SetContent(LeftNavItem_name: string, index: number){
    this.content = LeftNavItem_name;
    this.SetActiveMenu(LeftNavItem_name, index)
  }

  SetActiveMenu(LeftNavItem_name: string, index: number){
    for(let item of this.LeftNavItems){
      item.active = false
    }
    this.LeftNavItems[index].active = true
  }

  GetActive(index: number){
    return this.LeftNavItems[index].active
  }

  SetNew(index){
    return this.newdata[index]
  }

}
