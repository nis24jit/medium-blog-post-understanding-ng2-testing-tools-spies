import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "my-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  public events: Array<Event>;

  constructor(
    public router: Router,
  ) { }

  public ngOnInit(): void {
    let stub: string;
    stub = "stub";
  }

  public gotoDetail(event: Event): void {
    let link = ["/dashboard"];
    this.router.navigate(link);
  }
}
