import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { HttpEventType, HttpErrorResponse } from "@angular/common/http";
import { of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { UploadService } from "src/app/shared/services/upload.service";
import { TranslateService } from "src/app/shared/services/translate.service";

@Component({
  selector: "app-add-prices",
  templateUrl: "./add-prices.component.html",
  styleUrls: ["./add-prices.component.scss"],
})
export class AddPricesComponent implements OnInit {
  @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef;
  files = [];
  constructor(
    public translate: TranslateService,
    private uploadService: UploadService
  ) {}

  ngOnInit(): void {}

  uploadFile(file) {
    const formData = new FormData();
    formData.append("file", file.data);
    file.inProgress = true;
    this.uploadService
      .upload(formData)
      .pipe(
        map((event) => {
          console.log("event :>> ", event);
          switch (event.type) {
            case HttpEventType.UploadProgress:
              file.progress = Math.round((event.loaded * 100) / event.total);
              break;
            case HttpEventType.Response:
              return event;
          }
        }),
        catchError((error: HttpErrorResponse) => {
          file.inProgress = false;
          return of(`${file.data.name} upload failed.`);
        })
      )
      .subscribe((event: any) => {
        if (typeof event === "object") {
          console.log(event.body);
        }
      });
  }

  private uploadFiles() {
    this.fileUpload.nativeElement.value = "";
    this.files.forEach((file) => {
      this.uploadFile(file);
    });
  }

  onClick() {
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = () => {
      for (const index of this.files) {
        const file = fileUpload.files[index];
        this.files.push({ data: file, inProgress: false, progress: 0 });
      }
      this.uploadFiles();
    };
    fileUpload.click();
  }
  // addPrices(productForm: NgForm) {
  //   productForm.value["productId"] = "PROD_" + shortId.generate();
  //   productForm.value["productAdded"] = moment().unix();
  //   productForm.value["ratings"] = Math.floor(Math.random() * 5 + 1);
  //   if (productForm.value["productImageUrl"] === undefined) {
  //     productForm.value["productImageUrl"] =
  //       "http://via.placeholder.com/640x360/007bff/ffffff";
  //   }

  //   productForm.value["favourite"] = false;

  //   const date = productForm.value["productAdded"];

  //   // this.productService.createProduct(productForm.value);

  //   this.product = new Product();

  //   $("#priceModalLong").modal("hide");

  //   toastr.success(
  //     "product " + productForm.value["productName"] + "is added successfully",
  //     "Product Creation"
  //   );
  // }
}
