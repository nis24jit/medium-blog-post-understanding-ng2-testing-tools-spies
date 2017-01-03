import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DataService } from "./services";

@Component({
  selector: "data-display",
  templateUrl: "./data-display.component.html",
  styleUrls: ["./data-display.component.scss"],
})
export class DataDisplayComponent implements OnInit {
  public dataConsumedByThisClass: Array<string>;

  constructor(
    public router: Router,
    public dataService: DataService,
  ) { }

  public ngOnInit(): void {
    // We do stuff to this data based on the components requirements such as displaying the data
    // in the html template and have other features such as paging of which we want to test different
    // cases such as getting 0,1,2+ data records and want to make sure the component displays
    // the data appropiatly based on the different cases. So we can use a spy on the "getData" method
    // of the "dataService" to simulate these different cases in our test.
    this.dataConsumedByThisClass = this.dataService.getData(0, "dataOption1");
  }

}
