import { Component, OnInit } from "@angular/core";
import { Http, Response } from "@angular/http";

@Component({
  selector: "my-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  public events: Array<Event>;
  public data: Object;
  public loading: boolean;

  constructor(
    public http: Http,
  ) { }

  public ngOnInit(): void {
    let stub: string;
    stub = "stub";
  }

  public makeRequest(): void {
    this.loading = true;
    this.http.get("http://jsonplaceholder.typicode.com/posts/1")
      .subscribe((res: Response) => {
        this.data = res.json();
        this.loading = false;
      });
  }
}
