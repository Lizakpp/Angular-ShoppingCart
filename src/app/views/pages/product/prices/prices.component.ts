import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/shared/services/auth.service";
import { ToastrService } from "src/app/shared/services/toastr.service";
import { TranslateService } from "src/app/shared/services/translate.service";

@Component({
  selector: "app-prices",
  templateUrl: "./prices.component.html",
  styleUrls: ["./prices.component.scss"],
})
export class PricesComponent implements OnInit {
  constructor(
    public authService: AuthService,
    private toastrService: ToastrService,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {}
}
