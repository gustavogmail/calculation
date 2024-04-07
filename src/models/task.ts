export default class Task {
  id: string;
  operation: string;
  left: number;
  right: number;

  constructor(id: string, operation: string, left: number, right: number) {
    this.id = id;
    this.operation = operation;
    this.left = left;
    this.right = right;
  }
}