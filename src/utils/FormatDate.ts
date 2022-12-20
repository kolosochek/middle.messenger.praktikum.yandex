
export class FormatDate {
    public static addZero<T>(num:T|string):T|string {
        if (Number(num) < 10) {num = "0" + num}
        return num;
      }
}
