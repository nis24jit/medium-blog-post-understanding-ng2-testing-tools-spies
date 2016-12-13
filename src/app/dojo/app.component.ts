import { Component } from "@angular/core";
// import "../../public/css/common.scss"; // moved "style" to seperate entry chunk called "style" to
// avoid chunk hash update collision with "app chunk". This collison happens when only style are changed
// but the app code is not changed but since style was embeded into app though require(common.css) it
// would cause the chunk hash value to change for app and the css file.

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
}
