
export class FormatDate {
    public static addZero<T>(num:T):T {
        if (num < 10) {num = "0" + num}
        return num;
      }
}
