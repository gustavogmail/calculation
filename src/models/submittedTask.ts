export default class SubmittedTask {
  id: string;
  operation: string;
  left: number;
  right: number;
  result: string;

  constructor(id: string, operation: string, left: number, right: number, result: string) {
    this.id = id;
    this.operation = operation;
    this.left = left;
    this.right = right;
    this.result = result;
  }
}