import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import quizz_questions from "../../../assets/data/quizz_questions.json";

@Component({
  selector: 'app-quizz',
  standalone: true,
  imports: [CommonModule], // Aqui adicionamos o CommonModule
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {

  title: string = "";

  questions: any;
  questionSelected: any;

  answers: string[] = [];
  answerSelected: string = "";

  questionIndex: number = 0;
  questionMaxIndex: number = 0;

  finished: boolean = false;

  constructor() { }

  ngOnInit(): void {
    if (quizz_questions) {
      this.finished = false;
      this.title = quizz_questions.title;
  
      this.questions = quizz_questions.questions;
      
      // Adicionando logs para depuração
      console.log("JSON carregado:", quizz_questions);
      console.log("Estado inicial de finished:", this.finished);
      console.log("Perguntas carregadas:", this.questions);
  
      if (this.questions.length > 0) {
        this.questionSelected = this.questions[0]; // Garante que a primeira pergunta seja exibida
        console.log("Primeira pergunta selecionada:", this.questionSelected);
      } else {
        console.log("Erro: Nenhuma pergunta encontrada no JSON!");
      }
  
      this.questionIndex = 0;
      this.questionMaxIndex = this.questions.length;
    } else {
      console.log("Erro: O JSON não foi carregado corretamente!");
    }
  }

  playerChoose(alias: string): void {
    this.answers.push(alias);
    this.nextStep();
  }

  nextStep(): void {
    this.questionIndex++;

    if (this.questionIndex < this.questionMaxIndex) {
      this.questionSelected = this.questions[this.questionIndex];
    } else {
      this.checkResult();
    }
  }

  checkResult(): void {
    const result = this.answers.reduce((acc, curr) => {
      acc[curr] = (acc[curr] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    this.answerSelected = result["A"] > result["B"] 
      ? quizz_questions.results["A"] 
      : quizz_questions.results["B"];

    this.finished = true;
  }
}
