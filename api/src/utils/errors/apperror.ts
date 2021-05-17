export default abstract class AppError {
  abstract getStatusCode(): number;
  abstract getMessage(): unknown;
}
