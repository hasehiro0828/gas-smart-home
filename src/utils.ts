class Utils {
  static getFormattedDate(date: Date): string {
    return Utilities.formatDate(date, "JST", "yyyy-MM-dd HH:mm:ss");
  }
}
export default Utils;
