import { Component, OnInit , OnDestroy, AfterViewInit} from '@angular/core';
import {Subject} from "rxjs";
import {Router} from "@angular/router";
import {DashboardService} from "../../core/services/dashboard/dashboard.service";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'waziupfront-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ],
})
export class DashboardComponent implements OnInit ,OnDestroy,AfterViewInit{

  userinfo:any;
  devices:any;
  projects:any;
  dasboard_loading=false;
  private unsubscribeAll = new Subject;

  constructor(
    private _dashboardService:DashboardService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.dasboard_loading=true;
    this.userinfo=JSON.parse(sessionStorage.getItem('useremail'));
    this.getAllProjects();

  }

  getAllProjects(){

    try {
      this._dashboardService.getprojects().pipe(takeUntil(this.unsubscribeAll)).subscribe(
        (res) => {

          if (res) {
            this.dasboard_loading=false;
            this.projects=res;
            console.log(res);

          }
        },
        (error) => {
          if (error) {

          }
        });
    }catch (e) {
      console.log(e)
    }


  }

  navigateprojectDetail(project_id){
    sessionStorage.setItem('projectId',project_id);
    this.router.navigate([ '/account/projects' ]);
  }

  ngOnDestroy() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  ngAfterViewInit(): void {
  }

}
