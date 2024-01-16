import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef,MatDialogContent
} from '@angular/material/dialog';
import { DialogData } from '../model';
import { DataService } from '../service/data.service';
@Component({
  selector: 'app-show-movie',
  templateUrl: './show-movie.component.html',
  styleUrls: ['./show-movie.component.css']
})

export class ShowMovieComponent {
  question: string = '';

  constructor(
    public dialogRef: MatDialogRef<ShowMovieComponent>,
    private questionService: DataService
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onOk(): void {
    this.questionService.addQuestion(this.question);
    this.dialogRef.close();
  }
}
